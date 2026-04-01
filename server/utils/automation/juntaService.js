import { chromium } from 'playwright'
import { autoClicker } from './windowsAutoClicker.js'
import path from 'path'
import fs from 'fs'
import os from 'os'
import { fileURLToPath } from 'url'
import { distribuidoraOptions } from './distribuidoraOptions.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Mapa de provincias de España (código INE oficial)
const PROVINCIAS = {
  'Almeria': '04', 'Cadiz': '11', 'Cordoba': '14', 'Granada': '18',
  'Huelva': '21', 'Jaen': '23', 'Malaga': '29', 'Sevilla': '41',
};

const isWindows = os.platform() === 'win32';

/**
 * Servicio de automatización para la Junta de Andalucía.
 * Replica exacta de main.js adaptada a ES Modules para Nuxt/Nitro.
 */
export const runJuntaAutomation = async (payload) => {
  const datos = payload.datos;
  const apellidosNombre = (payload.flatFormData?.apellidosNombre || '').trim();

  // [ROBUSTEZ] Buscar carpeta del cliente de forma flexible (ignora espacios, comas y acentos)
  let carpetaCliente = 'subir_archivos';
  try {
    const normalize = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\s,]+/g, ' ').trim().toLowerCase();
    const listado = fs.readdirSync(process.cwd());
    const targetNorm = normalize(apellidosNombre);
    const match = listado.find(f => {
      if (f === '.git' || f === 'node_modules') return false;
      const stats = fs.statSync(path.join(process.cwd(), f));
      if (!stats.isDirectory()) return false;
      return normalize(f) === targetNorm;
    });
    if (match) {
      carpetaCliente = match;
      console.log(`   [ROBUSTEZ] Carpeta encontrada: "${match}"`);
    } else {
      console.log(`   [ROBUSTEZ] No se encontró carpeta para "${apellidosNombre}", usando "${carpetaCliente}"`);
    }
  } catch (err) {
    console.log('   [!] Error buscando carpeta cliente:', err.message);
  }

  // [ROBUSTEZ] Crear carpeta temporal para archivos recibidos por Base64
  const tempDocsDir = path.join(os.tmpdir(), `robot_docs_${Date.now()}`);
  if (!fs.existsSync(tempDocsDir)) fs.mkdirSync(tempDocsDir, { recursive: true });

  const mapProtocolFiles = {
    'doc_autorizacion_rep': '1.-',
    'doc_adicional_2': '2.-',
    'doc_certificado_solidez': '7.-'
  };

  for (const [field, prefix] of Object.entries(mapProtocolFiles)) {
    const base64 = payload.flatFormData?.[field];
    if (base64 && base64.startsWith('data:')) {
      try {
        const matches = base64.match(/^data:(.+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const ext = matches[1].includes('pdf') ? 'pdf' : 'jpg';
          const buffer = Buffer.from(matches[2], 'base64');
          const fileName = `${prefix}documento_manual.${ext}`;
          fs.writeFileSync(path.join(tempDocsDir, fileName), buffer);
          console.log(`   [ROBUSTEZ] Archivo manual recibido para ${prefix}: ${fileName}`);
        }
      } catch (e) {
        console.log(`   [!] Error procesando Base64 para ${prefix}:`, e.message);
      }
    }
  }

  // Helper para esperar un tiempo entre acciones
  const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Helper: check rápido de si CCAA existe en DOM
  let ccaaCheckCount = 0;
  async function checkCCAA(page, label) {
    ccaaCheckCount++;
    const info = await page.evaluate(() => {
      try {
        const ccaa = document.querySelector('select[name="codigoComunidadAutonoma"]');
        const deleg = document.querySelector('select[name="codigoDelegacion"]');
        const html = document.documentElement.outerHTML;
        return {
          ccaa: ccaa ? { disabled: ccaa.disabled, value: ccaa.value || '', options: ccaa.options?.length || 0, visible: getComputedStyle(ccaa).display !== 'none' } : false,
          deleg: deleg ? { disabled: deleg.disabled, value: deleg.value || '', options: deleg.options?.length || 0 } : false,
          htmlMentionsCCAA: html.includes('codigoComunidadAutonoma'),
          htmlMentionsComunidad: (html.match(/comunidad/gi) || []).length
        };
      } catch (e) {
        return { error: e.message };
      }
    }).catch(e => ({ error: e.message }));

    if (info && info.ccaa) {
      console.log(`   🔍 [CCAA #${ccaaCheckCount} ${label}] ⭐ EXISTE! disabled=${info.ccaa.disabled} value="${info.ccaa.value}" options=${info.ccaa.options} visible=${info.ccaa.visible}`);
    } else if (info && info.htmlMentionsCCAA) {
      console.log(`   🔍 [CCAA #${ccaaCheckCount} ${label}] En HTML pero NO en DOM (${info.htmlMentionsComunidad}x "comunidad")`);
    } else {
      if (ccaaCheckCount <= 5 || ccaaCheckCount % 5 === 0 || label.includes('POST') || label.includes('NAV') || label.includes('RADIO')) {
        console.log(`   🔍 [CCAA #${ccaaCheckCount} ${label}] ❌ No existe ("comunidad" en HTML: ${info?.htmlMentionsComunidad || 0}x)`);
      }
    }
    
    if (info && info.deleg) {
      console.log(`   🔍 [DELEG #${ccaaCheckCount} ${label}] ⭐ EXISTE! value="${info.deleg.value}" options=${info.deleg.options}`);
    }
    return info || { error: 'No info' };
  }

  // Helper para rellenar campos gestionando automáticamente si son readonly
  async function rellenar(locator, valor) {
    if (!valor) return;
    await esperar(3000); // 3 segundos por paso (ajustado de 5s)

    try {
      const isVisible = await locator.isVisible().catch(() => false);
      if (!isVisible) return;

      const isReadOnly = await locator.getAttribute('readonly').catch(() => null);

      if (isReadOnly !== null) {
        console.log(`      [!] Campo bloqueado (readonly) detectado. Forzando valor técnico...`);
        await locator.evaluate((el, v) => {
          el.value = v;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          el.dispatchEvent(new Event('blur', { bubbles: true }));
        }, valor);
      } else {
        // MODO HUMANO REFORZADO
        await locator.click({ timeout: 5000 }).catch(() => { });
        await locator.focus().catch(() => { });
        await esperar(500); // Pequeña pausa tras el clic

        // Simula escritura humana: letra a letra con retardo
        await locator.pressSequentially(valor, { delay: 100 }).catch(async () => {
          console.log('      [!] Falló pressSequentially, usando método alternativo...');
          await locator.fill(valor).catch(async () => {
            await locator.evaluate((el, v) => {
              el.value = v;
              el.dispatchEvent(new Event('input', { bubbles: true }));
              el.dispatchEvent(new Event('change', { bubbles: true }));
            }, valor);
          });
        });

        // Aseguramos que la web detecte que hemos terminado de escribir
        await locator.dispatchEvent('change').catch(() => { });
        await locator.dispatchEvent('blur').catch(() => { });
      }
    } catch (e) {
      console.log(`      [!] Error rellenando campo: ${e.message}`);
      throw e; // Propagar para que el catch global pause el robot
    }
  }

  async function seleccionar(locator, valor) {
    if (!valor) return;
    await esperar(3000); // 3 segundos por paso
    try {
      await locator.waitFor({ state: 'visible', timeout: 10000 });
      await locator.click({ timeout: 5000 }).catch(() => { });
      await locator.selectOption(valor);
    } catch (e) {
      console.log(`      [!] Error seleccionando [${valor}]: ${e.message}`);
      throw e; // Propagar para que el catch global pause el robot
    }
  }

  async function pulsar(locator) {
    await esperar(3000); // 3 segundos por paso
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
      await locator.click({ force: true });
    } catch (e) {
      console.log(`      [!] Error pulsando: ${e.message}`);
      throw e; // Propagar para que el catch global pause el robot
    }
  }

  async function marcar(locator) {
    await esperar(3000); // 3 segundos por paso
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
      await locator.check({ force: true }).catch(() => { });
    } catch (e) {
      console.log(`      [!] Error marcando: ${e.message}`);
      throw e; // Propagar para que el catch global pause el robot
    }
  }

  // Helper para subir archivos basado en el script original (Refactorizado para estabilidad y diagnóstico)
  async function subirDoc(page, targetFrame, selector, prefijo) {
    const dir = path.join(process.cwd(), carpetaCliente);

    if (!fs.existsSync(dir)) {
      console.log(`   [!] Carpeta de adjuntos no encontrada: ${dir}`);
      return;
    }

    const archivos = fs.readdirSync(dir);
    const archivo = archivos.find(x => x.startsWith(prefijo));

    if (!archivo) {
      console.log(`   [!] No hay archivo que empiece por "${prefijo}" en subir_archivos/`);
      return;
    }

    const rutaAbsoluta = path.join(dir, archivo);
    console.log(`   -> Subiendo adjunto: ${archivo}`);

    try {
      const loc = (typeof selector === 'string' ? targetFrame.locator(selector) : selector);
      // Aseguramos visibilidad y scroll para que el clic sea efectivo
      await loc.scrollIntoViewIfNeeded().catch(() => { });
      await loc.waitFor({ state: 'visible', timeout: 10000 });
      await esperar(1500); // Pausa de asentamiento mayor para la subida

      // Captura secuencial del popup con diagnóstico de clic
      console.log(`      [?] Intentando abrir popup para ${prefijo}... (Timeout 1min)`);
      const popupPromise = page.waitForEvent('popup', { timeout: 60000 }); // 1 minuto solicitado

      // Clic reforzado
      await loc.click({ force: true, delay: 500 }).catch(err => {
        console.log(`      [!] Clic normal falló, reintentando con dispatch...`);
      });

      const popup = await popupPromise.catch(async () => {
        console.log(`      [!] Timeout 60s esperando popup. Probando dispatchEvent directo...`);
        await loc.evaluate(node => node.dispatchEvent(new Event('click', { bubbles: true })));
        return page.waitForEvent('popup', { timeout: 60000 });
      });

      console.log(`      [v] Popup detectado.`);
      await popup.waitForLoadState('load');

      const fileChooserPromise = popup.waitForEvent('filechooser', { timeout: 60000 });
      const btnSelect = popup.getByRole('button', { name: /Choose File|Seleccionar archivo/i });
      await btnSelect.click({ timeout: 5000 }).catch(() => btnSelect.evaluate(n => n.click()));

      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(rutaAbsoluta);

      await popup.evaluate(() => {
        const input = document.querySelector('input[type="file"]');
        if (input) {
          input.dispatchEvent(new Event('change', { bubbles: true }));
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });

      await esperar(2000);
      popup.removeAllListeners('dialog');
      popup.on('dialog', d => d.accept().catch(() => { }));

      await popup.getByRole('img', { name: 'Guardar' }).click();
      console.log(`      [v] Guardado pulsado.`);
      await esperar(3000);

      if (!popup.isClosed()) {
        await popup.close().catch(() => { });
      }
    } catch (e) {
      console.log(`      [!] Error crítico subiendo ${prefijo}:`, e.message);
    }
  }


  // Usamos una carpeta temporal del sistema para el perfil (evita fallos de bloqueo en pendrives FAT32/exFAT)
  const userDataDir = path.join(os.tmpdir(), 'playwright_junta_profile');
  if (!fs.existsSync(userDataDir)) fs.mkdirSync(userDataDir, { recursive: true });

  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: 'chrome',
    headless: false,
    ignoreHTTPSErrors: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-popup-blocking',
      '--disable-gpu',
      '--auto-select-certificate-for-urls=["*"]'
    ]
  });
  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  // --- CAPTURA DE CONSOLA DEL NAVEGADOR A ARCHIVO ---
  const logFile = path.join(__dirname, 'errores_navegador.txt');
  fs.writeFileSync(logFile, `=== INICIO LOG ${new Date().toISOString()} ===\n`);

  page.on('console', msg => {
    const text = `[${msg.type()}] ${msg.text()}\n`;
    fs.appendFileSync(logFile, text);
    // if (msg.type() === 'error') console.log(`   [BROWSER ERROR] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    fs.appendFileSync(logFile, `[CRASH] ${err.message}\n`);
    // Los errores de 'codigoInst' son bugs propios de los desarrolladores del portal de la Junta 
    // y siempre los escupen al navegador aunque funcione. Los silenciamos para no alarmar.
  });

  // Monitor global de TODOS los POST al servidor
  let postCount = 0;
  page.on('request', req => {
    if (req.method() === 'POST' && req.url().includes('nuevaSolicitud')) {
      postCount++;
      const data = req.postData() || '';
      const params = new URLSearchParams(data);
      const hasCCAA = params.has('codigoComunidadAutonoma');
      console.log(`   [POST #${postCount}] opcion=${params.get('opcion')}, pestana=${params.get('pestanaActiva')}, nombre=${params.get('nombrePestana')}, keys=${Array.from(params.keys()).length}, CCAA=${hasCCAA ? '"' + params.get('codigoComunidadAutonoma') + '"' : 'NO'}`);
      // POST #4 = transición a Otros datos. Dump completo para diagnóstico.
      if (postCount === 4) {
        console.log('   [POST #4 DUMP] Campos con valor:');
        for (const [key, val] of params.entries()) {
          if (val && val.trim()) console.log(`      ${key}=${val.substring(0, 80)}`);
        }
      }
    }
  });

  // Ocultar huellas de automatización y desactivar autorrelleno
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  // Quitar límites de tiempo (esperar para siempre)
  page.setDefaultTimeout(0);

  try {
    // = [SECCIÓN 2] NAVEGACIÓN AUTOMÁTICA HASTA CERTIFICADO =
    console.log('[1/5] Navegando a la Bienvenida...');

    await page.goto('https://www.juntadeandalucia.es/empleoempresaycomercio/oficinavirtual/bienvenida.do');
    await esperar(3000);

    // Comprobar si ya estamos logueados
    const estaLogueado = await page.getByRole('link', { name: /Cerrar sesión/i }).isVisible().catch(() => false);

    if (!estaLogueado) {
      // Aceptar cookies automáticamente
      const botonCookies = page.getByRole('button', { name: /Aceptar todas/i });
      if (await botonCookies.isVisible()) {
        await botonCookies.click();
        await esperar(3000);
      }

      await page.getByText('Habilitaciones').click();
      await esperar(3000);

      console.log('   -> Intentando pinchar en Certificado Digital...');
      try {
        const botonCertificado = page.locator('#acceso-2').getByTitle('Acceso con certificado digital');
        await botonCertificado.waitFor({ state: 'visible', timeout: 5000 });

        console.log('   -> Activando Autoclicker Inteligente para Login (DESACTIVADO MANUALMENTE)...');
        // autoClicker.start();

        await botonCertificado.click();

        // Pausa obligatoria para selección manual de certificado en CUALQUIER SISTEMA
        console.log('\n🛑 PARADA MANUAL: Selecciona el certificado y escribe la contraseña si te la pide.');
        console.log('   Una vez hayas entrado en la Pestaña "Acceso a Comunicaciones", pulsa Resume en el Inspector.');
        await page.pause();

        await esperar(3000);

        // --- RESPALDO MANUAL (Comentado por Autoclicker Inteligente) ---
        /*
        console.log('🛑 PARADA: SELECCIÓN DE CERTIFICADO (AUTOFIRMA).');
        console.log('1. SE HABRÁ ABIERTO EL AVISO DE xdg-open. Dale a "Abrir".');
        console.log('2. Elige tu certificado en la ventana de AutoFirma.');
        console.log('3. Si sale "Alta de Interesado", rellénalo.');
        console.log('4. Cuando veas la pantalla de "Acceso a Comunicaciones", dale a Resume.');
        await page.pause(); 
        */

        console.log('   -> Esperando carga de página post-firma...');
        // Esperamos a que la página cambie (éxito de firma)
        await page.waitForLoadState('load', { timeout: 30000 }).catch(() => { });
        await esperar(5000);

        console.log('✅ LOGIN COMPLETADO. Asegurando parada de autoclicker...');
        autoClicker.stop();

        console.log('🔍 [DIAGNÓSTICO] Esperando (hasta 5s) a ver si aparece el modal de Bienvenida...');
        try {
          const botonAceptarModal = page.getByRole('button', { name: /ACEPTAR/i });
          await botonAceptarModal.waitFor({ state: 'visible', timeout: 8000 });
          console.log('   [v] Modal detectado. Pulsando ACEPTAR...');
          await botonAceptarModal.click();
        } catch (error) {
          console.log('   [x] El botón ACEPTAR no apareció en el tiempo límite.');
        }
      } catch (e) {
        console.log('   -> Error en el proceso de Login/Certificado:', e.message);
        autoClicker.stop();
      }
    } else {
      console.log('   -> Sesión ya activa, saltando login.');
    }

    console.log('   -> Continuando con los pasos capturados...');

    // Verificación final del estado antes de Comunicaciones
    const title = await page.title().catch(() => 'N/A');
    console.log(`🔍 [DIAGNÓSTICO] Título actual de la página: "${title}"`);

    try {
      // Verificación extra en caso de latencia severa (si no saltó antes, le damos 3s ahora)
      const botonAceptarModal = page.getByRole('button', { name: /ACEPTAR/i });
      await botonAceptarModal.waitFor({ state: 'visible', timeout: 3000 });
      await botonAceptarModal.click();
      console.log('   -> Botón ACEPTAR pulsado (verificación secundaria).');
    } catch (e) {
      // Ignorar tranquilamente si no aparece
    }

    console.log('   -> Comprobando si necesitamos entrar en "Acceso a Comunicaciones"...');
    console.log('   -> Esperando carga de panel post-login y enlaces...');
    const linkComunicaciones = page.getByRole('link', { name: /Acceso a Comunicaciones/i }).first();
    await linkComunicaciones.waitFor({ state: 'visible', timeout: 15000 }).catch(() => { });
    
    if (await linkComunicaciones.isVisible()) {
      console.log('   -> Enlace "Acceso a Comunicaciones" detectado. Pulsando...');
      await linkComunicaciones.click();
    } else {
      console.log('   -> "Acceso a Comunicaciones" no detectado tras espera. Suponiendo caché de Listado...');
    }

    console.log('   -> Esperando botón "Nueva comunicación"...');
    const linkNuevaComu = page.getByRole('link', { name: /Nueva comunicaci/i }).first();
    // Aquí sí esperamos un tiempo más largo porque ya tiene que estar
    await linkNuevaComu.waitFor({ state: 'visible', timeout: 20000 }).catch(async (e) => {
      console.log('   [!] "Nueva comunicación" no apareció. Título actual:', await page.title());
      throw e; 
    });
    await linkNuevaComu.click();

    console.log('   -> Entrando en el formulario (Delegaciones)...');
    await page.waitForSelector('select[name="codDelegacion"]', { state: 'visible' });

    // Observer eliminado por causar errores de Node en algunos navegadores

    await checkCCAA(page, 'FORMULARIO_INICIAL');

    // --- DELEGACIÓN ---
    console.log('[1.5/5] Seleccionando delegación...');
    await seleccionar(page.locator('select[name="codDelegacion"]'), datos.delegacion);
    await checkCCAA(page, 'post-delegacion');

    // ==========================================
    // [SECCIÓN 3] DATOS DEL TITULAR
    // ==========================================
    console.log('[2/5] Rellenando datos del titular...');
    // Rellenando datos de identificación (con precaución si vienen del certificado)
    await seleccionar(page.locator('select[name="identificacionInteresado"]'), datos.tipoDocumento);

    const nifLoc = page.locator('#nifInteresado');
    await rellenar(nifLoc, datos.nif);

    await seleccionar(page.locator('select[name="sexoInteresado"]'), datos.sexo);
    await checkCCAA(page, 'post-sexo');

    const nomLoc = page.locator('input[name="nombreInteresado"]');
    await rellenar(nomLoc, datos.nombre);

    const ap1Loc = page.locator('input[name="apellido1Interesado"]');
    await rellenar(ap1Loc, datos.apellido1);

    const ap2Loc = page.locator('input[name="apellido2Interesado"]');
    await rellenar(ap2Loc, datos.apellido2);

    await seleccionar(page.locator('select[name="codigoTipoViaDomicilioInteresado"]'), datos.tipoVia);
    await rellenar(page.getByRole('textbox', { name: 'Debe inroducir el nombre de' }), datos.nombreVia);
    await seleccionar(page.locator('select[name="tipoNumeracionInteresado"]'), datos.tipoNumeracion);
    await rellenar(page.locator('input[name="numeroDomicilioInteresado"]'), datos.numero);
    if (datos.calificador) await rellenar(page.locator('input[name="calificadorNumeroInteresado"]'), datos.calificador);
    if (datos.bloque) await rellenar(page.locator('input[name="bloqueInteresado"]'), datos.bloque);
    if (datos.escalera) await rellenar(page.locator('input[name="escaleraDomicilioInteresado"]'), datos.escalera);
    if (datos.piso) await rellenar(page.locator('input[name="pisoDomicilioInteresado"]'), datos.piso);
    if (datos.puerta) await rellenar(page.locator('input[name="puertaDomicilioInteresado"]'), datos.puerta);

    const provNorm = (datos.provincia || '').trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    await seleccionar(page.locator('select[name="codigoProvinciaDomicilioInteresado"]'), PROVINCIAS[provNorm] || datos.provincia);

    // [MARGEN ROBUSTO] Identificar el selector de margen buscando por opciones en el DOM
    if (datos.margen) {
      const mVal = (datos.margen || '').trim();
      console.log(`   -> Buscando selector de margen dinámicamente...`);
      const selName = await page.evaluate(() => {
        const select = Array.from(document.querySelectorAll('select')).find(s => {
          const text = s.innerText || '';
          return text.includes('Derecho') && text.includes('Izquierdo');
        });
        return select ? select.name : null;
      }).catch(() => null);

      if (selName) {
        console.log(`      -> Encontrado selector: "${selName}". Asignando: ${mVal}`);
        const locMargen = page.locator(`select[name="${selName}"]`);
        await locMargen.selectOption(mVal).catch(async () => {
          const label = mVal === 'D' ? /Derech/i : /Izquier/i;
          await locMargen.selectOption({ label }).catch(() => { });
        });
      } else {
        console.log('      [!] No se detectó desplegable de Margen (Derecho/Izquierdo) en esta pestaña.');
      }
    }

    const page1Promise = page.waitForEvent('popup');
    console.log('   -> Abriendo buscador de municipios (Titular)...');
    await page.locator('img[onclick*="codigoMunicipioDomicilioInteresado"]').click();
    const page1 = await page1Promise;
    await page1.waitForLoadState('networkidle');

    // MODO HUMANO EN POPUP: Rellenar letra a letra
    console.log('   -> Buscando municipio con ritmo humano...');
    const searchInput1 = page1.locator('input[name="municipioBusqueda"]');
    await searchInput1.click();
    await searchInput1.pressSequentially((datos.municipioNombre || '').trim(), { delay: 150 });
    await page1.getByRole('img', { name: 'Buscar Municipio' }).click();
    await esperar(3000);

    // Esperar a que los resultados de búsqueda aparezcan (confirma carga del popup)
    await page1.locator('table.listado').waitFor({ state: 'visible' }).catch(() => { });
    await page1.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click();
    console.log('   -> Municipio seleccionado.');
    await esperar(3000);

    await rellenar(page.locator('input[name="poblacion"]'), datos.poblacion);
    await rellenar(page.locator('input[name="codigoPostalDomicilioInteresado"]'), datos.codigoPostal);
    await rellenar(page.locator('input[name="telefonoInteresado"]'), datos.telefono);
    await rellenar(page.locator('input[name="movil"]'), datos.movil);

    // Persona autorizada (NECESARIO: el servidor decide si mostrar CCAA según estos datos)
    if (datos.conPersonaAutorizada) {
      console.log('   -> Rellenando persona autorizada...');
      await seleccionar(page.locator('select[name="identificacionPersonaAutorizada"]'), datos.personaAutorizada.tipoDocumento);
      await rellenar(page.locator('input[name="nifPersonaAutorizada"]'), datos.personaAutorizada.nif);
      await seleccionar(page.locator('select[name="sexoPersonaAutorizada"]'), datos.personaAutorizada.sexo);
      await rellenar(page.locator('input[name="apellido1PersonaAutorizada"]'), datos.personaAutorizada.apellido1);
      await rellenar(page.locator('input[name="apellido2PersonaAutorizada"]'), datos.personaAutorizada.apellido2);
      await rellenar(page.locator('input[name="nombrePersonaAutorizada"]'), datos.personaAutorizada.nombre);
    }

    // Email (NECESARIO: el diagnóstico lo rellena y el CCAA aparece)
    await rellenar(page.getByRole('textbox', { name: 'Introduzca una dirección de' }), datos.email);

    await checkCCAA(page, 'post-titular-completo');

    // === TRANSICIÓN A PESTAÑA 2 (equivale a POST #1 manual) ===
    console.log('   -> Navegando a Pestaña 2 (guarda datos titular)...');
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
        page.locator('#parteCentralPestana2').click()
      ]);
      console.log('   -> ✓ POST #1: Pestaña 2 disparó navegación');
    } catch (e) {
      console.log('   -> [!] Pestaña 2 no navegó, forzando submit...');
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
        page.evaluate(() => document.forms[0].submit())
      ]).catch(e2 => console.log('   -> [!] Fallo submit:', e2.message));
    }
    await page.waitForLoadState('networkidle').catch(() => { });
    await esperar(3000);
    await checkCCAA(page, 'NAV post-POST#1-pestana2');

    const radioModalidad = page.getByRole('radio', { name: /Seleccione para crear una/i });
    await radioModalidad.waitFor({ state: 'visible' });
    await pulsar(radioModalidad);
    await pulsar(page.getByText('>>'));
    await esperar(2000);

    // Datos Técnico e Instalación
    if (datos.conPersonaAutorizada) {
      await seleccionar(page.locator('#tecnicoInstalador1'), 'TF');
      await rellenar(page.locator('input[name="tecnicoInstalador1nombre"]'), datos.personaAutorizada.nombre);
      await rellenar(page.locator('input[name="tecnicoInstalador1apellido1"]'), datos.personaAutorizada.apellido1);
      await rellenar(page.locator('input[name="tecnicoInstalador1apellido2"]'), datos.personaAutorizada.apellido2);
      await seleccionar(page.locator('select[name="tecnicoInstalador1documento"]'), datos.personaAutorizada.tipoDocumento);
      await rellenar(page.locator('#tecnicoInstalador1nif'), datos.personaAutorizada.nif);
    }
    await checkCCAA(page, 'post-tecnico-completo');

    // === TRANSICIÓN A DATOS ESTABLECIMIENTO (equivale a POST #3 manual) ===
    console.log('   -> Navegando a "Datos establecimiento" (guarda datos técnico)...');
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
        page.getByText('Datos establecimiento').click()
      ]);
      console.log('   -> ✓ POST #3: Datos establecimiento disparó navegación');
    } catch (e) {
      console.log('   -> [!] "Datos establecimiento" no navegó, forzando submit...');
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
        page.evaluate(() => document.forms[0].submit())
      ]).catch(e2 => console.log('   -> [!] Fallo submit:', e2.message));
    }
    await page.waitForLoadState('networkidle').catch(() => { });
    await esperar(3000);
    await checkCCAA(page, 'NAV post-POST#3-datos-estab');

    await seleccionar(page.locator('select[name="codigoTipoViaDomicilioEstablecimiento"]'), (datos.tipoVia || '').trim());
    await rellenar(page.locator('input[name="nombreDomicilioEstablecimiento"]'), (datos.nombreVia || '').trim());
    await seleccionar(page.locator('select[name="tipoNumeracionEstablecimiento"]'), datos.tipoNumeracion);
    await rellenar(page.locator('input[name="numeroDomicilioEstablecimiento"]'), datos.numero);
    if (datos.calificador) await rellenar(page.locator('input[name="calificadorNumeroEstablecimiento"]'), datos.calificador);
    if (datos.bloque) await rellenar(page.locator('input[name="bloqueEstablecimiento"]'), datos.bloque);
    if (datos.escalera) await rellenar(page.locator('input[name="escaleraDomicilioEstablecimiento"]'), datos.escalera);
    if (datos.piso) await rellenar(page.locator('input[name="pisoDomicilioEstablecimiento"]'), datos.piso);
    if (datos.puerta) await rellenar(page.locator('input[name="puertaDomicilioEstablecimiento"]'), datos.puerta);
    console.log(`   -> Margen recibido: "${datos.margen}"`);
    if (datos.margen) {
      const mVal = (datos.margen || '').trim();
      await seleccionar(page.locator('select[name="margenEstablecimiento"]'), mVal).catch(async () => {
        // Fallback por texto si el valor 'D'/'I' no funciona
        const label = mVal === 'D' ? /Derech/i : /Izquier/i;
        await page.locator('select[name="margenEstablecimiento"]').selectOption({ label }).catch(() => { });
      });
    } else {
      console.log('   [!] El campo margen llegó vacío desde el formulario.');
    }

    const popupEstPromise = page.waitForEvent('popup');
    console.log('   -> Abriendo buscador de municipios (Establecimiento)...');
    await page.locator('img[onclick*="codigoMunicipioDomicilioEstablecimiento"]').click();
    const popupEst = await popupEstPromise;
    await popupEst.waitForLoadState('load').catch(() => console.log('      [!] Aviso: Timeout en load de popup est, forzando continuación...'));
    await popupEst.locator('input[name="municipioBusqueda"]').fill((datos.municipioNombre || '').trim());
    await popupEst.getByRole('img', { name: 'Buscar Municipio' }).click();
    console.log('   -> Buscando municipio (est.)... esperando 5s');
    await esperar(3000); // 5 segundos tras buscar municipio
    await popupEst.getByRole('link', { name: new RegExp((datos.municipioNombre || '').trim(), 'i') }).first().click();
    console.log('   -> Municipio (est.) seleccionado... esperando 5s');
    await esperar(3000); // 5 segundos tras seleccionar municipio

    await rellenar(page.locator('input[name="poblacionEstablecimiento"]'), datos.poblacion);
    await rellenar(page.locator('input[name="codigoPostalDomicilioEstablecimiento"]'), datos.codigoPostal);
    await rellenar(page.locator('input[name="telefonoEstablecimiento"]'), datos.telefono);
    await rellenar(page.locator('input[name="movilEstablecimiento"]'), datos.movil);
    await rellenar(page.locator('input[name="emailEstablecimiento"]'), datos.email);
    await checkCCAA(page, 'post-establecimiento-completo');

    // Se ha eliminado el botón Continuar de aquí por no existir en la vista
    await esperar(3000);

    // === TRANSICIÓN A OTROS DATOS (equivale a POST #4 manual) ===
    console.log('[3/5] Rellenando Otros Datos...');
    console.log('   -> Navegando a "Otros datos" (guarda datos establecimiento)...');
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
        page.getByText('Otros datos', { exact: true }).click()
      ]);
      console.log('   -> ✓ POST #4: Otros datos disparó navegación');
    } catch (e) {
      console.log('   -> [!] "Otros datos" no navegó, forzando submit...');
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
        page.evaluate(() => document.forms[0].submit())
      ]).catch(e2 => console.log('   -> [!] Fallo submit:', e2.message));
    }
    await page.waitForLoadState('networkidle').catch(() => { });
    await esperar(3000);
    await checkCCAA(page, 'NAV post-POST#4-otros-datos');

    // Capturar todos los selects y divs ocultos en esta página
    const otrosDatosInfo = await page.evaluate(() => {
      const allSelects = Array.from(document.querySelectorAll('select')).map(s => ({
        name: s.name, id: s.id, disabled: s.disabled, options: s.options?.length,
        visible: getComputedStyle(s).display !== 'none'
      })).filter(s => s.name);
      const divsCheck = ['div73d', 'div74', 'div741', 'div742', 'div75', 'divReiaE', 'divReiaC'];
      const divs = {};
      for (const d of divsCheck) {
        const el = document.getElementById(d);
        if (el) divs[d] = { display: getComputedStyle(el).display, html_len: el.innerHTML.length };
      }
      return { selects: allSelects, divs };
    }).catch(() => ({}));
    console.log('   -> [OTROS DATOS] Selects:', JSON.stringify(otrosDatosInfo.selects));
    console.log('   -> [OTROS DATOS] Divs:', JSON.stringify(otrosDatosInfo.divs));
    // NO clicar "Otros datos" de nuevo: el POST #4 ya nos dejó en esa sección.

    // ========== RELLENAR OTROS DATOS ANTES DEL POST de radio 741 ==========
    // HALLAZGO 17/03/2026: CCAA existe INMEDIATAMENTE tras POST #4.
    // Hay que seleccionarla ANTES de tocar radios (que podrían destruir el DOM).

    // 1. CCAA PRIMERO (antes de cualquier radio)
    console.log('   -> Seleccionando Comunidad Autónoma (INMEDIATAMENTE tras POST #4)...');
    const ccaaLoc = page.locator('select[name="codigoComunidadAutonoma"]');
    const ccaaCount = await ccaaLoc.count();
    if (ccaaCount > 0) {
      const ccaaDisabled = await ccaaLoc.isDisabled().catch(() => false);
      if (ccaaDisabled) {
        console.log('   -> CCAA deshabilitada, forzando valor...');
        await ccaaLoc.evaluate((el, val) => {
          el.removeAttribute('disabled'); el.value = val;
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }, datos.codigoComunidadAutonoma);
      } else {
        await ccaaLoc.selectOption(datos.codigoComunidadAutonoma);
      }
      console.log('   -> ✓ Comunidad Autónoma seleccionada.');
      await esperar(3000); // Esperar a que se carguen las delegaciones (estándar 3s)
    } else {
      console.log('      [!] CCAA no existe en el DOM tras POST #4');
    }
    await checkCCAA(page, 'CCAA post-select-inmediato');

    // 2. Delegación Provincial
    console.log('   -> Seleccionando Delegación Provincial...');
    const delegacionLoc = page.locator('select[name="codigoDelegacion"]');
    if (await delegacionLoc.count() > 0) {
      const delDis = await delegacionLoc.isDisabled().catch(() => false);
      if (delDis) {
        await delegacionLoc.evaluate((el, val) => {
          el.removeAttribute('disabled'); el.value = val;
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }, datos.delegacion);
      } else {
        await delegacionLoc.selectOption(datos.delegacion);
      }
      console.log('   -> ✓ Delegación seleccionada.');
    } else {
      console.log('      [!] Delegación no encontrada');
    }
    await esperar(2000);

    // 3. Seleccionar CNAE/RITE
    console.log(`   -> Seleccionando CNAE/RITE (${datos.otrosDatos75codigo})...`);
    const riteLoc = page.locator('select[name="otrosDatos75codigo"]');
    await riteLoc.waitFor({ state: 'visible', timeout: 10000 }).catch(() => { });
    await riteLoc.selectOption(datos.otrosDatos75codigo).catch(() => { });
    await page.getByRole('textbox', { name: 'Debe introducir el número de' }).waitFor({ state: 'visible' }).catch(() => { });
    await checkCCAA(page, 'RITE post-select-T9820');

    // 4. Número de empresa instaladora
    console.log('   -> Rellenando número de empresa instaladora...');
    const numEmpresaLoc = page.getByRole('textbox', { name: 'Debe introducir el número de' });
    const numReadonly = await numEmpresaLoc.getAttribute('readonly').catch(() => null);
    if (numReadonly !== null) {
      console.log('   -> Número es readonly, quitando atributo...');
      await numEmpresaLoc.evaluate(el => el.removeAttribute('readonly'));
    }
    await numEmpresaLoc.click().catch(() => { });
    await numEmpresaLoc.fill(datos.otrosDatosNumero).catch(() => { });
    await esperar(1000);
    await page.locator('#bloque1 > div:nth-child(4)').click().catch(() =>
      page.locator('body').click({ position: { x: 10, y: 10 } }).catch(() => { })
    );
    // Esperar a que el CCAA se actualice tras el número de empresa
    await esperar(3000);
    await checkCCAA(page, 'NUM post-empresa-blur');

    // 5. Radios simples (sin POST) - DESPUÉS de CCAA/RITE/número
    console.log('   -> Radio otrosDatos72=N...');
    await page.locator('input[name="otrosDatos72"][value="N"]').click();
    await esperar(2000);
    await checkCCAA(page, 'RADIO post-72=N');

    console.log('   -> Radio otrosDatos73=N...');
    await page.locator('input[name="otrosDatos73"][value="N"]').click();
    await esperar(2000);
    await checkCCAA(page, 'RADIO post-73=N');

    // ========== RADIO 741 = S → dispara POST #5 (con CCAA rellenada) ==========
    console.log('   -> Radio otrosDatos741=S (esperando navegación)...');
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
        page.locator('input[name="otrosDatos741"][value="S"]').click()
      ]);
      console.log('   -> ✓ otrosDatos741=S disparó navegación');
    } catch (e) {
      console.log('   -> otrosDatos741 no disparó nav, intentando submit manual...');
      try {
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'load', timeout: 20000 }),
          page.evaluate(() => {
            if (typeof dispatch === 'function') dispatch(document.forms[0].opcion.value);
            else document.forms[0].submit();
          })
        ]);
        console.log('   -> ✓ Navegación forzada');
      } catch (e2) {
        console.log('   -> [!] Error forzando POST:', e2.message);
      }
    }

    await page.waitForLoadState('networkidle').catch(() => { });
    await esperar(3000);

    // Verificar estado POST-741
    const postCheck = await page.evaluate(() => {
      const ccaa = document.querySelector('select[name="codigoComunidadAutonoma"]');
      const deleg = document.querySelector('select[name="codigoDelegacion"]');
      const num = document.querySelector('input[name="numeroEmpresaInstaladora"]');
      return {
        ccaaExiste: !!ccaa, ccaaDisabled: ccaa?.disabled, ccaaOptions: ccaa?.options?.length,
        ccaaValue: ccaa?.value,
        delegExiste: !!deleg, delegValue: deleg?.value,
        numExiste: !!num, numReadonly: num?.readOnly, numValue: num?.value
      };
    });
    console.log('   -> [POST-741 CHECK]', JSON.stringify(postCheck));

    // Si CCAA no existía antes pero ahora sí, rellenarla
    if (postCheck.ccaaExiste && !postCheck.ccaaValue) {
      console.log('   -> CCAA apareció tras radio 741, rellenando...');
      const ccaaLoc2 = page.locator('select[name="codigoComunidadAutonoma"]');
      const ccaaDis2 = await ccaaLoc2.isDisabled().catch(() => false);
      if (ccaaDis2) {
        await ccaaLoc2.evaluate((el, val) => {
          el.removeAttribute('disabled'); el.value = val;
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }, datos.codigoComunidadAutonoma);
      } else {
        await ccaaLoc2.selectOption(datos.codigoComunidadAutonoma);
      }
      console.log('   -> ✓ CCAA rellenada post-741.');
    }

    // [ROBUSTEZ] Espera extra por codigoInst antes de interacciones críticas
    await esperar(3000);

    if (postCheck.delegExiste && !postCheck.delegValue) {
      console.log('   -> Delegación apareció tras radio 741, rellenando...');
      const delLoc2 = page.locator('select[name="codigoDelegacion"]');
      await delLoc2.selectOption(datos.delegacion).catch(() => {
        delLoc2.evaluate((el, val) => {
          el.removeAttribute('disabled'); el.value = val;
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }, datos.delegacion);
      });
      console.log('   -> ✓ Delegación rellenada post-741.');
    }
    await page.locator('select[name="otrosDatos75codigo"]').waitFor({ state: 'visible' }).catch(() => { });
    await esperar(3000);

    // Check 7.1
    console.log('   -> Marcando check 7.1...');
    await marcar(page.getByRole('checkbox').first());
    await esperar(3000);

    // Se han eliminado los botones "Continuar" de Otras Datos y Pestaña 2 por no existir en la vista

    // Pestaña 4: Ficha Técnica
    console.log('[4/5] Entrando en Pestaña 4 y Ficha Técnica...');
    await pulsar(page.locator('#parteCentralPestana4'));

    await pulsar(page.locator('li:nth-child(19) > #bloque2 > .checkbox'));
    await pulsar(page.getByText('>>'));
    await esperar(1500);

    console.log('   -> Seleccionando Actividad: Eléctricas de baja tensión...');
    const linkActividad = page.getByRole('link', { name: 'Eléctricas de baja tensión' });
    await linkActividad.waitFor({ state: 'visible' });
    await linkActividad.click();
    await esperar(3000);

    // --- ACCESO AL IFRAME DE FORMA ROBUSTA ---
    const iframeLoc = page.locator('#ficha');
    await iframeLoc.waitFor({ state: 'visible', timeout: 15000 });
    const fichaFrame = iframeLoc.contentFrame();

    // Blindaje crítico: El iframe de Ficha carga un gran JS que declara 'codigoInst'. Si intentamos
    // rellenar los inputs antes de que eso termine, el portal lanza un error de consola y crashea su estado.
    console.log('   -> Esperando inicialización interna del portal (codigoInst)...');
    await fichaFrame.locator('body').evaluate((el) => {
      return new Promise(resolve => {
        let r = 0;
        const c = () => {
          if (typeof window.codigoInst !== 'undefined' || typeof codigoInst !== 'undefined' || r > 30) resolve(true);
          else { r++; setTimeout(c, 500); }
        };
        c();
      });
    }).catch(() => { });

    console.log('   -> Rellenando Ficha Técnica técnica (Iframe)...');
    const btnContinuar = fichaFrame.getByRole('button', { name: 'Continuar' });
    await btnContinuar.waitFor({ state: 'visible', timeout: 10000 });
    await btnContinuar.click();
    await esperar(3000);

    await rellenar(fichaFrame.getByRole('textbox', { name: 'Debe indicar Potencia' }), datos.fichaTecnica.potencia);
    await esperar(3000);
    await rellenar(fichaFrame.getByRole('textbox', { name: 'Debe introducir el uso al que' }), datos.fichaTecnica.uso);
    await esperar(3000);
    await seleccionar(fichaFrame.locator('select[name="tipoSuministro"]'), datos.fichaTecnica.tipoSuministro);
    await esperar(3000);
    await rellenar(fichaFrame.getByRole('textbox', { name: 'Debe indicar la tensión de' }), datos.fichaTecnica.tension);
    await esperar(3000);

    if (datos.fichaTecnica.esAutoconsumo) {
      await pulsar(fichaFrame.locator('#esAutoconsumoSi'));
      await esperar(3000);
      await rellenar(fichaFrame.getByRole('textbox', { name: 'Debe indicar el CAU' }), datos.fichaTecnica.cau);
      await esperar(3000);
      await pulsar(fichaFrame.locator('#tipoConsumo1'));
      await esperar(3000);
      await pulsar(fichaFrame.locator('#modalidadConexionGeneracion1'));
      await esperar(3000);
      await pulsar(fichaFrame.locator('#modalidadAutoconsumo2'));
      await esperar(3000);
    }

    await rellenar(fichaFrame.getByRole('textbox', { name: 'Potencia instalada', exact: true }), datos.fichaTecnica.potenciaInstalada);
    await esperar(3000);

    if (datos.fichaTecnica.acumulacion) {
      await pulsar(fichaFrame.locator('#disponibleAcumulacionSi'));
      await esperar(3000);
      await rellenar(fichaFrame.getByRole('textbox', { name: 'Debe indicar la potencia' }), datos.fichaTecnica.potenciaAcumulacion);
      await esperar(3000);
      await rellenar(fichaFrame.getByRole('textbox', { name: 'Debe indicar la energía má' }), datos.fichaTecnica.energiaMaximaAlmacenada);
      await esperar(3000);
    }

    await rellenar(fichaFrame.getByRole('textbox', { name: 'Debe introducir el nombre de la empresa instaladora' }), datos.fichaTecnica.empresaInstaladora);
    await esperar(3000);
    await seleccionar(fichaFrame.locator('select[name="documentoIdentEmpresaInstaladora"]'), datos.fichaTecnica.empresaInstaladoraDocTipo);
    await esperar(3000);
    await rellenar(fichaFrame.getByRole('textbox', { name: 'Debe introducir un NIF/CIF/' }), datos.fichaTecnica.empresaInstaladoraDoc);
    await esperar(3000);
    // Resolver el nombre de la distribuidora a partir del código (ps_distribuidora)
    const distId = datos.ps_distribuidora || '';
    const distOption = distribuidoraOptions.find(o => o.value === distId);
    const nombreDistribuidora = distOption ? distOption.label : (datos.fichaTecnica.empresaDistribuidora || '');

    await rellenar(fichaFrame.getByRole('textbox', { name: 'Debe introducir el nombre de la empresa distribuidora' }), nombreDistribuidora);
    await esperar(3000);

    // ✅ RADIO TIPO INSTALACIÓN (capturado por codegen 19/03/2026)
    // SELECTOR CORRECTO: li:nth-child(5) > div > ul > li > .bloqueGrupo > .elemento_checkbox > .radio
    console.log('   -> Marcando tipo de instalación (radio correcto codegen)...');
    await fichaFrame.locator('li:nth-child(5) > div > ul > li > .bloqueGrupo > .elemento_checkbox > .radio').first().check().catch(() => { });
    await esperar(2000);

    console.log('   -> Guardando ficha (1er guardar)...');
    page.once('dialog', d => d.accept().catch(() => { }));
    await fichaFrame.getByRole('img', { name: 'Guardar' }).click();

    // *** PARADA: AutoFirma puede pedir firma al guardar la ficha ***
    console.log('\n🛑 PARADA: Si AutoFirma pide que firmes la ficha, hazlo ahora.');
    console.log('   Cuando hayas terminado de guardar y la web se refresque, pulsa Resume.');

    // Pausa obligatoria en Linux para firmar con AutoFirma
    if (!isWindows) {
      await page.pause();
    }

    // Esperar mucho más tras guardar la ficha como pidió el usuario
    console.log('   -> Esperando procesamiento del guardado (10s)...');
    await esperar(5000);

    // ==========================================
    // [SECCIÓN 4] DOCUMENTACIÓN — PASOS CORRECTOS DEL CODEGEN
    // ==========================================
    console.log('\n[4/6] Subiendo documentos adjuntos...');

    // Re-acceder al iframe por si se recargó tras Continuar
    const iframeLoc2 = page.locator('#ficha');
    await esperar(3000); 
    await iframeLoc2.waitFor({ state: 'visible' }).catch(() => { });
    
    const fichaFrame2 = iframeLoc2.contentFrame();

    // Blindaje contra errores de scripts internos del portal (codigoInst)
    console.log('   -> Esperando inicialización de scripts del portal (#ficha)...');
    await fichaFrame2.locator('body').evaluate((el) => {
      return new Promise(resolve => {
        let r = 0;
        const c = () => {
          if (typeof window.codigoInst !== 'undefined' || typeof codigoInst !== 'undefined' || r > 30) resolve(true);
          else { r++; setTimeout(c, 500); }
        };
        c();
      });
    }).catch(() => { });
    // Esperar a que los botones de adjuntar estén disponibles en el iframe
    console.log('   -> Esperando botones de adjuntar (confirma que iframe está listo)...');
    await fichaFrame2.getByRole('img', { name: 'Adjuntar Documento' }).first().waitFor({ state: 'visible' });

    // Helper local robusto para subir un documento con popup buscando por prefijo
    const subirDocConPopup = async (prefijo, index = null, locatorString = null) => {
      // Re-adquirir el iframe
      const currentFicha = page.locator('#ficha').contentFrame();
      
      let rutaAbsoluta = '';
      let origen = '';
      
      const buscarEn = (dir) => {
        if (!fs.existsSync(dir)) return null;
        const archivos = fs.readdirSync(dir);
        const match = archivos.find(x => x.startsWith(prefijo));
        return match ? path.join(dir, match) : null;
      };

      // 1. Prioridad: Formulario
      rutaAbsoluta = buscarEn(tempDocsDir);
      if (rutaAbsoluta) origen = 'FORMULARIO';

      // 2. Fallback: Carpeta Cliente
      if (!rutaAbsoluta) {
        const dirCliente = path.join(process.cwd(), carpetaCliente);
        rutaAbsoluta = buscarEn(dirCliente);
        if (rutaAbsoluta) origen = 'CARPETA CLIENTE';
      }

      if (!rutaAbsoluta) {
        console.log(`   [!] No hay archivo que empiece por "${prefijo}" en ninguna ruta.`);
        return;
      }

      console.log(`   -> Adjuntando (prefijo ${prefijo}) [ORIGEN: ${origen}]: ${path.basename(rutaAbsoluta)}`);

      let targetLocator;
      if (locatorString) {
        targetLocator = currentFicha.locator(locatorString);
      } else {
        targetLocator = currentFicha.getByRole('img', { name: 'Adjuntar Documento' }).nth(index);
      }

      // Esperar a que el icono sea visible (Sincronización con main.js)
      await targetLocator.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {
        console.log(`      [!] Aviso: El icono de adjuntar para ${prefijo} no parece visible.`);
      });

      const popupPromise = context.waitForEvent('page', { timeout: 60000 });
      
      // Click robusto como en main.js
      await targetLocator.click().catch(async () => {
        console.log(`      [!] Click fallido en ${prefijo}, reintentando con dispatch...`);
        await targetLocator.evaluate(n => n.dispatchEvent(new Event('click', { bubbles: true })));
      });

      const popup = await popupPromise.catch(() => null);
      if (!popup) {
        console.log(`   [!] No se pudo abrir el popup para ${prefijo}`);
        return;
      }

      await popup.waitForLoadState('load');
      
      const btnChoose = popup.getByRole('button', { name: /Choose File|Seleccionar archivo/i });
      await btnChoose.waitFor({ state: 'visible' });

      popup.on('dialog', d => { d.accept().catch(() => { }); });

      const fileChooserPromise = popup.waitForEvent('filechooser');
      await btnChoose.click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(rutaAbsoluta);

      console.log('      ...esperando carga (8s)...');
      await esperar(8000);

      const btnGuardar = popup.getByRole('img', { name: 'Guardar' });
      await btnGuardar.waitFor({ state: 'visible' });
      await btnGuardar.click();

      // Espera de guardado post-popup (Sincronización con main.js)
      console.log('      ...esperando guardado post-popup (5s)...');
      await esperar(5000);
      if (!popup.isClosed()) await popup.close().catch(() => { });

      // IMPORTANTE: Esperar a que el iframe se actualice y el primer botón vuelva a ser visible
      await esperar(3000);
      const fichaFinal = page.locator('#ficha').contentFrame();
      await fichaFinal.getByRole('img', { name: 'Adjuntar Documento' }).first().waitFor({ state: 'visible' }).catch(() => { });
    };

    // DOC 1: Autorización de Representación
    await subirDocConPopup('1.-', 3);

    // DOC 2 (o el que corresponda al segundo): Buscando por prefijo "2.-"
    await subirDocConPopup('2.-', 4);

    // DOC 3: Certificado de solidez — Buscando por prefijo "7.-"
    await subirDocConPopup('7.-', null, 'li:nth-child(8) > .bloqueGrupo > .elemento_checkbox > img');

    // ==========================================
    // [SECCIÓN 5] PUNTO DE SUMINISTRO (Popup Nuevo Usuario)
    // ==========================================
    console.log('\n[5/6] Abriendo popup "Nuevo Usuario" (Punto de Suministro)...');
    const popupUserPromise = context.waitForEvent('page', { timeout: 60000 });
    await fichaFrame2.getByRole('button', { name: 'Nuevo Usuario' }).click().catch(() => {
      return page.getByRole('button', { name: 'Nuevo Usuario' }).click();
    });

    const popupUser = await popupUserPromise.catch(() => null);
      if (!popupUser) {
        throw new Error('No se pudo detectar la apertura del popup de Nuevo Usuario.');
      }
      await popupUser.waitForLoadState('networkidle');

      console.log('   -> Rellenando Datos del Titular del Punto...');
      await rellenar(popupUser.getByRole('textbox', { name: 'Debe introducir el primer' }), datos.apellido1);
      await rellenar(popupUser.getByRole('textbox', { name: 'Introduzca el segundo apellido' }), datos.apellido2);
      await rellenar(popupUser.getByRole('textbox', { name: 'Debe introducir el nombre' }), datos.nombre);
      await seleccionar(popupUser.locator('#identificacionTitularPuntoSuministro'), datos.tipoDocumento);
      await rellenar(popupUser.getByRole('textbox', { name: 'Debe introducir un NIF/CIF/' }), datos.nif);

      // Blindaje contra errores de scripts internos del portal (codigoInst) en el popup
      console.log('   -> Esperando inicialización de scripts en popup...');
      await popupUser.evaluate(() => {
        return new Promise(resolve => {
          let r = 0;
          const c = () => {
            if (typeof window.codigoInst !== 'undefined' || r > 20) resolve(true);
            else { r++; setTimeout(c, 500); }
          };
          c();
        });
      }).catch(() => { });

      console.log('   -> Rellenando Domicilio Titular del Punto...');
      await seleccionar(popupUser.locator('#codigoTipoViaDomicilioTitularPuntoSuministro'), datos.tipoVia);
      await rellenar(popupUser.locator('#nombreDomicilioTitularPuntoSuministro'), datos.nombreVia);
      await seleccionar(popupUser.locator('#tipoNumeracionTitularPuntoSuministro'), datos.tipoNumeracion);
      await rellenar(popupUser.locator('#numeroDomicilioTitularPuntoSuministro'), datos.numero);
      if (datos.calificador) await rellenar(popupUser.locator('#calificadorNumeroTitularPuntoSuministro'), datos.calificador);
      if (datos.bloque) await rellenar(popupUser.locator('#bloqueTitularPuntoSuministro'), datos.bloque);
      if (datos.escalera) await rellenar(popupUser.locator('#escaleraDomicilioTitularPuntoSuministro'), datos.escalera);
      if (datos.piso) await rellenar(popupUser.locator('#pisoDomicilioTitularPuntoSuministro'), datos.piso);
      if (datos.puerta) await rellenar(popupUser.locator('#puertaDomicilioTitularPuntoSuministro'), datos.puerta);
      await seleccionar(popupUser.locator('#margen'), datos.margen).catch(() => { });
      await seleccionar(popupUser.locator('#codigoProvinciaDomicilioTitularPuntoSuministro'), PROVINCIAS[provNorm] || datos.delegacion);

      // Buscador Municipio Titular Punto
      console.log('   -> Buscando municipio (Titular Punto)...');
      const popMunTitPromise = popupUser.waitForEvent('popup');
      await popupUser.getByRole('group', { name: 'Datos titular del punto de' }).getByRole('img').click();
      const popMunTit = await popMunTitPromise;
      await popMunTit.waitForLoadState('networkidle').catch(() => { });
      await popMunTit.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre);
      await popMunTit.getByRole('img', { name: 'Buscar Municipio' }).click();
      await esperar(3000);
      await popMunTit.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click();
      await esperar(3000);

      await rellenar(popupUser.locator('#codigoPostalDomicilioTitularPuntoSuministro'), datos.codigoPostal);
      await rellenar(popupUser.getByRole('textbox', { name: 'Introduzca el teléfono' }), datos.telefono);
      await rellenar(popupUser.getByRole('textbox', { name: 'Introduzca el email' }), datos.email);

      // Domicilio Punto de Suministro (mismos datos)
      console.log('   -> Rellenando Domicilio del Punto de Suministro...');
      await seleccionar(popupUser.locator('#codigoTipoViaDomicilioDatosPuntoSuministro'), datos.tipoVia);
      await rellenar(popupUser.locator('#nombreDomicilioDatosPuntoSuministro'), datos.nombreVia);
      await seleccionar(popupUser.locator('#tipoNumeracionDatosPuntoSuministro'), datos.tipoNumeracion);
      await rellenar(popupUser.locator('#numeroDomicilioDatosPuntoSuministro'), datos.numero);
      if (datos.calificador) await rellenar(popupUser.locator('#calificadorNumeroDatosPuntoSuministro'), datos.calificador);
      if (datos.bloque) await rellenar(popupUser.locator('#bloqueDatosPuntoSuministro'), datos.bloque);
      if (datos.escalera) await rellenar(popupUser.locator('#escaleraDomicilioDatosPuntoSuministro'), datos.escalera);
      if (datos.piso) await rellenar(popupUser.locator('#pisoDomicilioDatosPuntoSuministro'), datos.piso);
      if (datos.puerta) await rellenar(popupUser.locator('#puertaDomicilioDatosPuntoSuministro'), datos.puerta);
      await seleccionar(popupUser.locator('#codigoProvinciaDomicilioDatosPuntoSuministro'), PROVINCIAS[provNorm] || datos.delegacion);

      // Buscador Municipio Punto
      console.log('   -> Buscando municipio (Punto Suministro)...');
      const popMunPuntoPromise = popupUser.waitForEvent('popup');
      await popupUser.getByRole('group', { name: 'Datos del punto de suministro' }).getByRole('img').click();
      const popMunPunto = await popMunPuntoPromise;
      await popMunPunto.waitForLoadState('networkidle').catch(() => { });
      await popMunPunto.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre);
      await popMunPunto.getByRole('img', { name: 'Buscar Municipio' }).click();
      await esperar(3000);
      await popMunPunto.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click();
      await esperar(3000);

      await rellenar(popupUser.locator('#codigoPostalDomicilioDatosPuntoSuministro'), datos.codigoPostal);

      // Datos Técnicos del Suministro (CUPS + tensión)
      console.log('   -> Rellenando CUPS y tensión...');
      const cupsLimpio = (datos.fichaTecnica.cups || '').replace(/\s+/g, '').trim();
      await rellenar(popupUser.getByRole('textbox', { name: 'Debe indicar el CUPS del' }), cupsLimpio);

      // TRUCO: Forzar eventos de CUPS para que la web lo valide correctamente
      await popupUser.locator('#cupsPuntoSuministro').evaluate((el, cupsVal) => {
        el.value = cupsVal;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.dispatchEvent(new Event('blur', { bubbles: true }));
      }, datos.fichaTecnica.cups).catch(() => { });

      // Seleccionar distribuidora en el popup por texto visible (el portal usa sus propios IDs internos)
      if (nombreDistribuidora) {
        console.log(`   -> Seleccionando distribuidora en popup por nombre: "${nombreDistribuidora}"...`);
        const selDist = popupUser.locator('select[name*="distribuidora"], select[id*="distribuidora"]').first();
        await selDist.selectOption({ label: nombreDistribuidora }).catch(async () => {
          console.log(`      [!] Selección exacta fallida. Probando coincidencia parcial...`);
          // Fallback: buscar la opción cuyo texto contenga el nombre de la distribuidora
          await selDist.evaluate((el, nombre) => {
            const option = Array.from(el.options).find(o => o.text.includes(nombre.substring(0, 20)));
            if (option) { el.value = option.value; el.dispatchEvent(new Event('change', { bubbles: true })); }
          }, nombreDistribuidora).catch(() => { });
        });
      }

      const tensionMapeada = datos.fichaTecnica.tension === '230' ? '0,4' : datos.fichaTecnica.tension;
      await seleccionar(popupUser.locator('#tensionPuntoSuministro'), tensionMapeada);

      console.log('   -> Aceptando popup Nuevo Usuario...');
      popupUser.on('dialog', async d => { await d.accept().catch(() => { }); });
      await popupUser.getByRole('button', { name: 'Aceptar' }).click();
      await esperar(3000);

    // ==========================================
    // [SECCIÓN 6] FINALIZACIÓN: GUARDAR Y PRESENTAR
    // ==========================================
    console.log('\n[6/6] Iniciando PRESENTACIÓN FINAL...');
    page.on('dialog', async d => {
      console.log('   [!] Diálogo Final:', d.message());
      await d.accept().catch(() => { });
    });

    // Re-acceder al iframe por si se recargó
    const iframeLoc3 = page.locator('#ficha');
    const fichaFrame3 = iframeLoc3.contentFrame();

    console.log('   -> Pulsando Guardar global...');
    await fichaFrame3.getByRole('img', { name: 'Guardar' }).click().catch(() => {
      return page.getByRole('img', { name: 'Guardar' }).click();
    });
    await esperar(4000);

    console.log('   -> Pulsando Presentar (Abriendo borrador/vista previa)...');
    await fichaFrame3.getByRole('img', { name: 'Presentar' }).click().catch(() => {
      return page.getByRole('img', { name: 'Presentar' }).click();
    });
    await esperar(3000);

    // PAUSA SOLICITADA POR EL USUARIO PARA LEER DATOS ANTES DE INSTALAR (SEGUNDA FIRMA)
    console.log('\n🛑 PARADA OBLIGATORIA: Revisa la vista previa generada por el primer "Presentar".');
    console.log('   -> Pulsa "Resume" en el Inspector de Playwright para lanzar la firma definitiva e instalar.');
    await page.pause();

    console.log('   -> Activando Autoclicker Inteligente para firma final (DESACTIVADO MANUALMENTE)...');
    // autoClicker.start();

    // Diálogo post-firma/selección (preventivo)
    page.once('dialog', d => d.accept().catch(() => { }));

    console.log('   -> Confirmando Presentar (Lanzando AutoFirma)...');
    await fichaFrame3.getByRole('img', { name: 'Presentar' }).click().catch(() => {
      return page.getByRole('img', { name: 'Presentar' }).click().catch(() => { });
    });
    
    // Pausa para firma manual
    console.log('\n🛑 PARADA MANUAL (AutoFirma): Firma el documento manualmente en la ventana de Windows.');
    console.log('   Espera a que se complete y pulsa Resume cuando termines.');
    await page.pause();
    console.log('✅ PRESENTACIÓN FINALIZADA. Asegurando parada de autoclicker...');
    autoClicker.stop();

    console.log('✅ PROCESO COMPLETADO. Asegurando parada de autoclicker...');
    autoClicker.stop();
  } catch (error) {
    console.error('❌ Error General:', error.message);
    autoClicker.stop();
    console.log('🛑 ERROR DETECTADO: El navegador permanecerá abierto para inspección.');
    throw error;
  } finally {
    // [ROBUSTEZ] Limpieza de archivos temporales recibidos por el formulario
    try {
      if (typeof tempDocsDir !== 'undefined' && fs.existsSync(tempDocsDir)) {
        fs.rmSync(tempDocsDir, { recursive: true, force: true });
        console.log(`   [LIMPIEZA] Carpeta temporal eliminada: ${tempDocsDir}`);
      }
    } catch (e) {
      console.log('   [!] Error limpiando temporales:', e.message);
    }
  }
}
