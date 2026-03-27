const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Mapa de provincias de España (código INE oficial)
const PROVINCIAS = {
  'Almeria': '04', 'Cadiz': '11', 'Cordoba': '14', 'Granada': '18',
  'Huelva': '21', 'Jaen': '23', 'Malaga': '29', 'Sevilla': '41',
};

// ==========================================
// [SECCIÓN 1] CONFIGURACIÓN Y DATOS
// ==========================================
const datos = {
  // 1.1 Persona Titular
  tipoDocumento: 'NIF',
  nif: '12345678Z',
  nombre: 'PRUEBA_NOMBRE',
  apellido1: 'PRUEBA_APELLIDO1',
  apellido2: 'PRUEBA_APELLIDO2',
  sexo: 'M',
  delegacion: '41',

  // Domicilio Titular
  tipoVia: 'CL',
  nombreVia: 'Calle de Prueba',
  tipoNumeracion: 'NUM',
  numero: '1',
  calificador: '3',
  bloque: 'blo',
  escalera: 'esc',
  piso: 'pis',
  puerta: 'pue',
  margen: 'D',
  codigoPostal: '41900',
  provincia: 'Sevilla',
  municipioNombre: 'CAMAS',
  poblacion: 'CAMAS',
  telefono: '954000000',
  movil: '600000000',

  // 1.2 Representante Legal (Opcional)
  conRepresentante: false,
  representante: {
    tipoDocumento: 'NIF',
    nif: '98765432A',
    sexo: 'F',
    nombre: 'REP_NOMBRE',
    apellido1: 'REP_APELLIDO1',
    apellido2: 'REP_APELLIDO2',
  },

  // 1.3 Persona  Eduardo
  conPersonaAutorizada: true,
  personaAutorizada: {
    tipoDocumento: 'NIF',
    nif: '28818007L',
    sexo: 'M',
    nombre: 'eduardo',
    apellido1: 'rivera',
    apellido2: 'cabezas',
  },
  // 1.3 Persona  Miguel Angel
  // conPersonaAutorizada: true,
  // personaAutorizada: {
  //  tipoDocumento: 'NIF',
  //   nif: '28888418G',
  //   sexo: 'M',
  //   nombre: 'Miguel Angel',
  //   apellido1: 'Rivas',
  //   apellido2: 'Zapata',
  // },
  email: 'email@prueba.com',

  // FASE 3: Otros Datos y Ficha Técnica
  otrosDatos75codigo: 'T9820',
  otrosDatosNumero: '41045500',
  codigoComunidadAutonoma: '01',

  fichaTecnica: {
    potencia: '123',
    uso: 'produccion energia electrica',
    tipoSuministro: 'Monofásico',
    tension: '230',
    esAutoconsumo: true,
    cau: 'ES0276000000152516WA0FA000',
    potenciaInstalada: '123',
    acumulacion: true,
    potenciaAcumulacion: '666',
    energiaMaximaAlmacenada: '12345',
    empresaInstaladora: 'Solay Ingenieros s.l.',
    empresaInstaladoraDocTipo: 'CIF',
    empresaInstaladoraDoc: 'B09848912',
    empresaDistribuidora: 'endesa',
    cups: 'ES0276000000152516WA0F',
  }
};

// Helper para esperar un tiempo entre acciones
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: check rápido de si CCAA existe en DOM
let ccaaCheckCount = 0;
async function checkCCAA(page, label) {
  ccaaCheckCount++;
  const info = await page.evaluate(() => {
    const ccaa = document.querySelector('select[name="codigoComunidadAutonoma"]');
    const deleg = document.querySelector('select[name="codigoDelegacion"]');
    const html = document.documentElement.outerHTML;
    return {
      ccaa: ccaa ? { disabled: ccaa.disabled, value: ccaa.value, options: ccaa.options?.length, visible: getComputedStyle(ccaa).display !== 'none' } : false,
      deleg: deleg ? { disabled: deleg.disabled, value: deleg.value, options: deleg.options?.length } : false,
      htmlMentionsCCAA: html.includes('codigoComunidadAutonoma'),
      htmlMentionsComunidad: (html.match(/comunidad/gi) || []).length
    };
  }).catch(() => ({ error: true }));
  if (info.ccaa) {
    console.log(`   🔍 [CCAA #${ccaaCheckCount} ${label}] ⭐ EXISTE! disabled=${info.ccaa.disabled} value="${info.ccaa.value}" options=${info.ccaa.options} visible=${info.ccaa.visible}`);
  } else if (info.htmlMentionsCCAA) {
    console.log(`   🔍 [CCAA #${ccaaCheckCount} ${label}] En HTML pero NO en DOM (${info.htmlMentionsComunidad}x "comunidad")`);
  } else {
    // Solo loguear cada 5 checks para no saturar, excepto tras navegaciones
    if (ccaaCheckCount <= 5 || ccaaCheckCount % 5 === 0 || label.includes('POST') || label.includes('NAV') || label.includes('RADIO') || label.includes('RITE') || label.includes('NUM')) {
      console.log(`   🔍 [CCAA #${ccaaCheckCount} ${label}] ❌ No existe ("comunidad" en HTML: ${info.htmlMentionsComunidad}x)`);
    }
  }
  if (info.deleg) {
    console.log(`   🔍 [DELEG #${ccaaCheckCount} ${label}] ⭐ EXISTE! value="${info.deleg.value}" options=${info.deleg.options}`);
  }
  return info;
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
  }
}

async function seleccionar(locator, valor) {
  if (!valor) return;
  await esperar(3000); // 3 segundos por paso
  try {
    await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
    await locator.click({ timeout: 3000 }).catch(() => { });
    await locator.selectOption(valor);
  } catch (e) {
    console.log(`      [!] Error seleccionando: ${e.message}`);
  }
}

async function pulsar(locator) {
  await esperar(3000); // 3 segundos por paso
  try {
    await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
    await locator.click({ force: true });
  } catch (e) {
    console.log(`      [!] Error pulsando: ${e.message}`);
  }
}

async function marcar(locator) {
  await esperar(3000); // 3 segundos por paso
  try {
    await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
    await locator.check({ force: true }).catch(() => { });
  } catch (e) {
    console.log(`      [!] Error marcando: ${e.message}`);
  }
}

// Helper para subir archivos basado en el script original (Refactorizado para estabilidad y diagnóstico)
async function subirDoc(page, targetFrame, selector, prefijo) {
  const dir = path.join(__dirname, '..', 'subir_archivos');

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

(async () => {
  console.log('Iniciando script con pausas para capturar certificado...');

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
      '--disable-gpu'
    ]
  });
  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  // --- CAPTURA DE CONSOLA DEL NAVEGADOR A ARCHIVO ---
  const logFile = path.join(__dirname, 'errores_navegador.txt');
  fs.writeFileSync(logFile, `=== INICIO LOG ${new Date().toISOString()} ===\n`);

  page.on('console', msg => {
    const text = `[${msg.type()}] ${msg.text()}\n`;
    fs.appendFileSync(logFile, text);
    if (msg.type() === 'error') console.log(`   [BROWSER ERROR] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    fs.appendFileSync(logFile, `[CRASH] ${err.message}\n`);
    console.log(`   [BROWSER CRASH/ERR] ${err.message}`);
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

    // TRUCO: Desactivar autorrelleno en todos los inputs
    const disableAutofill = (root) => {
      const inputs = root.querySelectorAll ? root.querySelectorAll('input, select') : [];
      for (const input of inputs) {
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autofill', 'off');
      }
    };
    disableAutofill(document);
    const obs = new MutationObserver(muts => {
      for (const m of muts) for (const n of m.addedNodes) if (n.nodeType === 1) disableAutofill(n);
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
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
        await botonCertificado.click();
        await esperar(3000);

        console.log('🛑 PARADA: SELECCIÓN DE CERTIFICADO (AUTOFIRMA).');
        console.log('1. SE HABRÁ ABIERTO EL AVISO DE xdg-open. Dale a "Abrir".');
        console.log('2. Elige tu certificado en la ventana de AutoFirma.');
        console.log('3. Si sale "Alta de Interesado", rellénalo.');
        console.log('4. Cuando veas la pantalla de "Acceso a Comunicaciones", dale a Resume.');
        await page.pause();
      } catch (e) {
        console.log('   -> El botón de certificado no está o ya estamos dentro.');
      }
    } else {
      console.log('   -> Sesión ya activa, saltando login.');
    }

    console.log('   -> Continuando con los pasos capturados...');

    try {
      const botonAceptarModal = page.getByRole('button', { name: /ACEPTAR/i });
      await botonAceptarModal.waitFor({ state: 'visible' });
      await botonAceptarModal.click();
      console.log('   -> Botón ACEPTAR pulsado.');
    } catch (e) {
      console.log('   -> El botón ACEPTAR no apareció.');
    }

    console.log('   -> Esperando enlace "Acceso a Comunicaciones"...');
    const linkComunicaciones = page.getByRole('link', { name: /Acceso a Comunicaciones/i }).first();
    await linkComunicaciones.waitFor({ state: 'attached' });
    await linkComunicaciones.click();

    console.log('   -> Esperando botón "Nueva comunicación"...');
    const linkNuevaComu = page.getByRole('link', { name: 'Nueva comunicación' }).first();
    await linkNuevaComu.waitFor({ state: 'visible' });
    await linkNuevaComu.click();

    console.log('   -> Entrando en el formulario (Delegaciones)...');
    await page.waitForSelector('select[name="codDelegacion"]', { state: 'visible' });

    // Inyectar MutationObserver para CCAA desde el principio
    await page.evaluate(() => {
      if (window.__ccaaObs) return;
      window.__ccaaObs = true;
      const obs = new MutationObserver(muts => {
        for (const m of muts) {
          for (const n of m.addedNodes) {
            if (n.nodeType !== 1) continue;
            const els = [n, ...(n.querySelectorAll ? n.querySelectorAll('*') : [])];
            for (const el of els) {
              const nm = (el.getAttribute?.('name') || '').toLowerCase();
              if (nm.includes('comunidad') || nm === 'codigodelegacion') {
                console.log(`🔴 MUTATION: ADDED <${el.tagName} name="${el.getAttribute('name')}"> disabled=${el.disabled} options=${el.options?.length}`);
              }
            }
          }
          for (const n of m.removedNodes) {
            if (n.nodeType !== 1) continue;
            const els = [n, ...(n.querySelectorAll ? n.querySelectorAll('*') : [])];
            for (const el of els) {
              const nm = (el.getAttribute?.('name') || '').toLowerCase();
              if (nm.includes('comunidad') || nm === 'codigodelegacion') {
                console.log(`🔴 MUTATION: REMOVED <${el.tagName} name="${el.getAttribute('name')}">`);
              }
            }
          }
        }
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
    }).catch(() => { });

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
    // paso a copiar en pestaña datos establecimiento
    const provNorm = datos.provincia.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\b\w/g, c => c.toUpperCase());
    await seleccionar(page.locator('select[name="codigoProvinciaDomicilioInteresado"]'), PROVINCIAS[provNorm] || datos.provincia);

    const page1Promise = page.waitForEvent('popup');
    console.log('   -> Abriendo buscador de municipios (Titular)...');
    await page.locator('img[onclick*="codigoMunicipioDomicilioInteresado"]').click();
    const page1 = await page1Promise;
    await page1.waitForLoadState('networkidle');

    // MODO HUMANO EN POPUP: Rellenar letra a letra
    console.log('   -> Buscando municipio con ritmo humano...');
    const searchInput1 = page1.locator('input[name="municipioBusqueda"]');
    await searchInput1.click();
    await searchInput1.pressSequentially(datos.municipioNombre, { delay: 150 });
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

    await seleccionar(page.locator('select[name="codigoTipoViaDomicilioEstablecimiento"]'), datos.tipoVia);
    await rellenar(page.locator('input[name="nombreDomicilioEstablecimiento"]'), datos.nombreVia);
    await seleccionar(page.locator('select[name="tipoNumeracionEstablecimiento"]'), datos.tipoNumeracion);
    await rellenar(page.locator('input[name="numeroDomicilioEstablecimiento"]'), datos.numero);
    if (datos.calificador) await rellenar(page.locator('input[name="calificadorNumeroEstablecimiento"]'), datos.calificador);
    if (datos.bloque) await rellenar(page.locator('input[name="bloqueEstablecimiento"]'), datos.bloque);
    if (datos.escalera) await rellenar(page.locator('input[name="escaleraDomicilioEstablecimiento"]'), datos.escalera);
    if (datos.piso) await rellenar(page.locator('input[name="pisoDomicilioEstablecimiento"]'), datos.piso);
    if (datos.puerta) await rellenar(page.locator('input[name="puertaDomicilioEstablecimiento"]'), datos.puerta);
    if (datos.margen) await seleccionar(page.locator('select[name="margenEstablecimiento"]'), datos.margen);

    const popupEstPromise = page.waitForEvent('popup');
    console.log('   -> Abriendo buscador de municipios (Establecimiento)...');
    await page.locator('img[onclick*="codigoMunicipioDomicilioEstablecimiento"]').click();
    const popupEst = await popupEstPromise;
    await popupEst.waitForLoadState('load');
    await popupEst.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre);
    await popupEst.getByRole('img', { name: 'Buscar Municipio' }).click();
    console.log('   -> Buscando municipio (est.)... esperando 5s');
    await esperar(3000); // 5 segundos tras buscar municipio
    await popupEst.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click();
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
    await rellenar(fichaFrame.getByRole('textbox', { name: 'Debe introducir el nombre de la empresa distribuidora' }), datos.fichaTecnica.empresaDistribuidora);
    await esperar(3000);

    // page.locator('#ficha').contentFrame().locator('li:nth-child(5) > div > ul > li > .bloqueGrupo > .elemento_checkbox > .radio').first().check();

    // ⏸️ PARADA CODEGEN: Aquí el Inspector queda activo para capturar los pasos correctos.
    // Usa el Inspector/Pick selector para identificar los campos que necesitas.
    // Pulsa "▶ Resume" cuando hayas terminado de capturar.
    // console.log('\n⏸️ PARADA CODEGEN: Inspector activo. Captura los pasos del tipo de instalación.');
    // console.log('   -> Cuando termines, pulsa "▶ Resume" en el Inspector.');
    // await page.pause();

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
    //await page.pause();

    // Esperar mucho más tras guardar la ficha como pidió el usuario
    console.log('   -> Esperando procesamiento del guardado (10s)...');
    await esperar(5000);
    //await fichaFrame.getByRole('button', { name: 'Continuar' }).waitFor({ state: 'visible' }).catch(() => { });

    // Continuar (aparece tras guardar para validar)
    //console.log('   -> Pulsando Continuar...');
    //await fichaFrame.getByRole('button', { name: 'Continuar' }).click();
    //await esperar(3000);

    // ==========================================
    // [SECCIÓN 4] DOCUMENTACIÓN — PASOS CORRECTOS DEL CODEGEN
    // ==========================================
    console.log('\n[4/6] Subiendo documentos adjuntos...');

    // Re-acceder al iframe por si se recargó tras Continuar
    const iframeLoc2 = page.locator('#ficha');
    await iframeLoc2.waitFor({ state: 'visible' }).catch(() => { });
    const fichaFrame2 = iframeLoc2.contentFrame();
    // Esperar a que los botones de adjuntar estén disponibles en el iframe
    console.log('   -> Esperando botones de adjuntar (confirma que iframe está listo)...');
    await fichaFrame2.getByRole('img', { name: 'Adjuntar Documento' }).first().waitFor({ state: 'visible' });

    // Helper local robusto para subir un documento con popup buscando por prefijo
    const subirDocConPopup = async (abrirLocator, prefijo) => {
      const dir = path.join(__dirname, '..', '..', 'subir_archivos');
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
      console.log(`   -> Adjuntando (prefijo ${prefijo}): ${archivo}`);

      const popupPromise = context.waitForEvent('page', { timeout: 60000 });
      await (typeof abrirLocator === 'string' ? fichaFrame2.locator(abrirLocator) : abrirLocator).click();

      const popup = await popupPromise.catch(async () => {
        console.log(`      [!] Timeout popup ${prefijo}, reintentando con dispatch...`);
        const loc = (typeof abrirLocator === 'string' ? fichaFrame2.locator(abrirLocator) : abrirLocator);
        await loc.evaluate(n => n.dispatchEvent(new Event('click', { bubbles: true })));
        return context.waitForEvent('page', { timeout: 30000 }).catch(() => null);
      });

      if (!popup) {
        console.log(`      [!] No se pudo abrir el popup para el prefijo ${prefijo}`);
        return;
      }

      // Esperar a que el botón Choose File aparezca (confirma que el popup cargó)
      const btnChoose = popup.getByRole('button', { name: /Choose File|Seleccionar archivo/i });
      await btnChoose.waitFor({ state: 'visible' });

      // Capturar diálogos en el popup
      popup.on('dialog', d => { console.log(`   [DIÁLOGO popup] ${d.message()}`); d.accept().catch(() => { }); });

      // Seleccionar archivo via file chooser
      const fileChooserPromise = popup.waitForEvent('filechooser');
      await btnChoose.click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(rutaAbsoluta);

      // Esperar 3s después de cargar el archivo
      console.log('      ...esperando proceso de carga del archivo (3s)...');
      await esperar(3000);

      // Esperar a que el botón Guardar esté activo (confirma que el archivo se procesó)
      const btnGuardar = popup.getByRole('img', { name: 'Guardar' });
      await btnGuardar.waitFor({ state: 'visible' });
      await btnGuardar.click();

      // Esperar 3s tras guardar el documento
      console.log('      ...esperando guardado del adjunto (3s)...');
      await esperar(3000);

      // Esperar a que el popup cierre o se vacíe
      await popup.waitForEvent('close').catch(async () => {
        await btnGuardar.waitFor({ state: 'hidden' }).catch(() => { });
        if (!popup.isClosed()) await popup.close().catch(() => { });
      });

      // Esperar a que el iframe principal se actualice
      await esperar(3000);
      await fichaFrame2.getByRole('img', { name: 'Adjuntar Documento' }).first().waitFor({ state: 'visible' }).catch(() => { });
    };

    // DOC 1: Autorización de Representación
    await subirDocConPopup(
      fichaFrame2.getByRole('img', { name: 'Adjuntar Documento' }).nth(3),
      '1.-'
    );

    // DOC 2 (o el que corresponda al segundo): Buscando por prefijo "2.-"
    await subirDocConPopup(
      fichaFrame2.getByRole('img', { name: 'Adjuntar Documento' }).nth(4),
      '2.-'
    );

    // DOC 3: Certificado de solidez — Buscando por prefijo "7.-"
    await subirDocConPopup(
      fichaFrame2.locator('li:nth-child(8) > .bloqueGrupo > .elemento_checkbox > img'),
      '7.-'
    );

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
    await popMunTit.waitForLoadState('networkidle');
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
    await popMunPunto.waitForLoadState('networkidle');
    await popMunPunto.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre);
    await popMunPunto.getByRole('img', { name: 'Buscar Municipio' }).click();
    await esperar(3000);
    await popMunPunto.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click();
    await esperar(3000);

    await rellenar(popupUser.locator('#codigoPostalDomicilioDatosPuntoSuministro'), datos.codigoPostal);

    // Datos Técnicos del Suministro (CUPS + tensión)
    console.log('   -> Rellenando CUPS y tensión...');
    await rellenar(popupUser.getByRole('textbox', { name: 'Debe indicar el CUPS del' }), datos.fichaTecnica.cups);

    // TRUCO: Forzar eventos de CUPS para que la web lo valide correctamente
    await popupUser.locator('#cupsPuntoSuministro').evaluate((el, cupsVal) => {
      el.value = cupsVal;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.dispatchEvent(new Event('blur', { bubbles: true }));
    }, datos.fichaTecnica.cups).catch(() => { });

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




    console.log('   -> Pulsando Presentar...');
    await fichaFrame3.getByRole('img', { name: 'Presentar' }).click().catch(() => {
      return page.getByRole('img', { name: 'Presentar' }).click();
    });
    await esperar(3000);

    console.log('🛑 PARADA: Verificar antes de presentar. Pulsa "Resume" en Playwright Inspector para continuar.');
    await page.pause();

    // Segundo clic en Presentar (confirmación)
    console.log('   -> Confirmando Presentar...');
    await fichaFrame3.getByRole('img', { name: 'Presentar' }).click().catch(() => {
      return page.getByRole('img', { name: 'Presentar' }).click().catch(() => { });
    });

    console.log('✅ PROCESO COMPLETADO.');
    await page.pause();

  } catch (error) {
    console.error('❌ Error General:', error.message);
  }
})();
