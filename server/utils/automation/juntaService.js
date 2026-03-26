import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import os from 'os'

// Mapa de provincias de España (código INE oficial)
const PROVINCIAS = {
  'Almeria': '04', 'Cadiz': '11', 'Cordoba': '14', 'Granada': '18',
  'Huelva': '21', 'Jaen': '23', 'Malaga': '29', 'Sevilla': '41',
  'Huesca': '22', 'Teruel': '44', 'Zaragoza': '50',
  'Asturias': '33', 'Illes Balears': '07', 'Baleares': '07',
  'Las Palmas': '35', 'Santa Cruz de Tenerife': '38',
  'Cantabria': '39', 'Albacete': '02', 'Ciudad Real': '13',
  'Cuenca': '16', 'Guadalajara': '19', 'Toledo': '45',
  'Avila': '05', 'Burgos': '09', 'Leon': '24', 'Palencia': '34',
  'Salamanca': '37', 'Segovia': '40', 'Soria': '42', 'Valladolid': '47', 'Zamora': '49',
  'Barcelona': '08', 'Girona': '17', 'Lleida': '25', 'Tarragona': '43',
  'Alicante': '03', 'Castellon': '12', 'Valencia': '46',
  'Badajoz': '06', 'Caceres': '10', 'A Coruna': '15', 'Lugo': '27',
  'Ourense': '32', 'Pontevedra': '36', 'La Rioja': '26', 'Madrid': '28',
  'Murcia': '30', 'Navarra': '31', 'Alava': '01', 'Gipuzkoa': '20', 'Bizkaia': '48',
  'Ceuta': '51', 'Melilla': '52',
};

/**
 * Servicio de automatización para la Junta de Andalucía.
 * Versión "Blindada" basada íntegramente en la lógica funcional de main.js.
 */
export const runJuntaAutomation = async (payload) => {
  const datos = payload.datos;
  const formData = payload.flatFormData;
  console.log('--- Iniciando Automatización Junta de Andalucía (Modo Blindado/3s Delays) ---')

  // Carpeta de perfil persistente para certificados
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
  page.setDefaultTimeout(0); // Sin esperas infinitas para el usuario

  // ==========================================
  // [SECCIÓN 1] HELPERS ROBUSTOS (COPIADOS DE MAIN.JS)
  // ==========================================
  const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function rellenar(locator, valor) {
    if (!valor) return;
    await esperar(3000); // 3 segundos solicitado por robustez
    try {
      const isVisible = await locator.isVisible().catch(() => false);
      if (!isVisible) return;

      const isReadOnly = await locator.getAttribute('readonly').catch(() => null);
      if (isReadOnly !== null) {
        console.log(`      [!] Campo readonly. Forzando valor...`);
        await locator.evaluate((el, v) => {
          el.value = v;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          el.dispatchEvent(new Event('blur', { bubbles: true }));
        }, valor);
      } else {
        await locator.click({ timeout: 5000 }).catch(() => { });
        await locator.focus().catch(() => { });
        await esperar(500);
        await locator.pressSequentially(valor, { delay: 100 });
        await locator.dispatchEvent('change').catch(() => { });
        await locator.dispatchEvent('blur').catch(() => { });
      }
    } catch (e) {
      console.log(`      [!] Error rellenando: ${e.message}`);
    }
  }

  async function seleccionar(locator, valor) {
    if (!valor) return;
    await esperar(3000);
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
      await locator.click({ timeout: 3000 }).catch(() => { });
      await locator.selectOption(valor);
    } catch (e) {
      console.log(`      [!] Error seleccionando: ${e.message}`);
    }
  }

  async function pulsar(locator) {
    await esperar(3000);
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
      await locator.click({ force: true });
    } catch (e) {
      console.log(`      [!] Error pulsando: ${e.message}`);
    }
  }

  async function marcar(locator) {
    await esperar(3000);
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
      await locator.check({ force: true }).catch(() => { });
    } catch (e) {
      console.log(`      [!] Error marcando: ${e.message}`);
    }
  }

  // Búsqueda de archivos en directorio del cliente (o actual)
  const buscarArchivoAbsoluto = (prefijo) => {
    // En el proyecto, buscamos en la carpeta del cliente
    const clienteDir = formData?.apellidosNombre || 'Ivan Zarza Estevez';
    const dir = path.join(process.cwd(), clienteDir);

    if (!fs.existsSync(dir)) {
      // Fallback a subir_archivos si existe (como en main.js)
      const fallbackDir = path.join(process.cwd(), 'subir_archivos');
      if (fs.existsSync(fallbackDir)) {
        const archivosFallback = fs.readdirSync(fallbackDir);
        const encontradoFallback = archivosFallback.find(x => x.startsWith(prefijo));
        if (encontradoFallback) return path.join(fallbackDir, encontradoFallback);
      }
      return null;
    }

    const archivos = fs.readdirSync(dir);
    const encontrado = archivos.find(x => x.startsWith(prefijo));
    return encontrado ? path.join(dir, encontrado) : null;
  }

  async function subirDocConPopup(targetFrame, selector, prefijo) {
    const ruta = buscarArchivoAbsoluto(prefijo);
    if (!ruta) {
      console.log(`      [!] Archivo con prefijo "${prefijo}" no encontrado.`);
      return;
    }
    console.log(`      [v] Adjuntando (prefijo ${prefijo}): ${path.basename(ruta)}`);

    try {
      const loc = (typeof selector === 'string' ? targetFrame.locator(selector) : selector);
      await loc.scrollIntoViewIfNeeded().catch(() => { });
      await loc.waitFor({ state: 'visible', timeout: 10000 });

      // Captura secuencial del popup (estilo main.js)
      const popupPromise = context.waitForEvent('page', { timeout: 60000 });
      await loc.click({ force: true, delay: 500 }).catch(() => { });

      const popup = await popupPromise.catch(async () => {
        console.log(`      [!] Timeout popup ${prefijo}, reintentando con dispatch...`);
        await loc.evaluate(n => n.dispatchEvent(new Event('click', { bubbles: true })));
        return context.waitForEvent('page', { timeout: 30000 }).catch(() => null);
      });

      if (!popup) {
        console.log(`      [!] No se pudo abrir el popup para el prefijo ${prefijo}`);
        return;
      }

      await popup.waitForLoadState('load');
      const btnChoose = popup.getByRole('button', { name: /Choose File|Seleccionar archivo/i });
      await btnChoose.waitFor({ state: 'visible' }).catch(() => { });

      popup.on('dialog', d => d.accept().catch(() => { }));

      const fileChooserPromise = popup.waitForEvent('filechooser');
      await btnChoose.click().catch(() => btnChoose.evaluate(n => n.click()));
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(ruta);

      console.log('      ...esperando proceso de carga (3s)...');
      await esperar(3000);

      const btnGuardar = popup.getByRole('img', { name: 'Guardar' });
      await btnGuardar.waitFor({ state: 'visible' });
      await btnGuardar.click();

      console.log('      ...esperando guardado del adjunto (3s)...');
      await esperar(3000);

      if (!popup.isClosed()) await popup.close().catch(() => { });
      await esperar(3000);
    } catch (e) {
      console.log(`      [!] Error crítico subiendo ${prefijo}:`, e.message);
    }
  }

  // Ocultar huellas de automatización y desactivar autorrelleno
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    const disableAutofill = (root) => {
      const inputs = root.querySelectorAll ? root.querySelectorAll('input, select') : [];
      for (const input of inputs) {
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autofill', 'off');
      }
    };
    disableAutofill(document);
    new MutationObserver(muts => {
      for (const m of muts) for (const n of m.addedNodes) if (n.nodeType === 1) disableAutofill(n);
    }).observe(document.documentElement, { childList: true, subtree: true });
  });

  try {
    // ==========================================
    // [FASE 0] LOGIN Y CERTIFICADO
    // ==========================================
    console.log('[1/5] Navegando a la Bienvenida...');
    await page.goto('https://www.juntadeandalucia.es/empleoempresaycomercio/oficinavirtual/bienvenida.do');
    await esperar(3000);

    const estaLogueado = await page.getByRole('link', { name: /Cerrar sesión/i }).isVisible().catch(() => false);
    if (!estaLogueado) {
      const botonCookies = page.getByRole('button', { name: /Aceptar todas/i });
      if (await botonCookies.isVisible()) await botonCookies.click();

      await page.getByText('Habilitaciones').click();
      await esperar(3000);

      const botonCertificado = page.locator('#acceso-2').getByTitle('Acceso con certificado digital');
      await botonCertificado.click();

      console.log('\n🛑 PARADA: SELECCIÓN DE CERTIFICADO (AutoFirma)');
      await page.pause();
    }

    // ==========================================
    // [FASE 1] NAVEGACIÓN INICIAL
    // ==========================================
    try {
      await page.getByRole('button', { name: /ACEPTAR/i }).click({ timeout: 8000 });
    } catch (e) { }

    await page.getByRole('link', { name: /Acceso a Comunicaciones/i }).first().click();
    await page.getByRole('link', { name: 'Nueva comunicación' }).first().click();
    await page.waitForSelector('select[name="codDelegacion"]', { state: 'visible' });

    console.log('[1.5/5] Seleccionando delegación...');
    await seleccionar(page.locator('select[name="codDelegacion"]'), datos.delegacion);

    // ==========================================
    // [FASE 2] DATOS DEL TITULAR
    // ==========================================
    console.log('[2/5] Rellenando datos del titular...');
    await seleccionar(page.locator('select[name="identificacionInteresado"]'), datos.tipoDocumento);
    await rellenar(page.locator('#nifInteresado'), datos.nif);
    await seleccionar(page.locator('select[name="sexoInteresado"]'), datos.sexo);
    await rellenar(page.locator('input[name="nombreInteresado"]'), datos.nombre);
    await rellenar(page.locator('input[name="apellido1Interesado"]'), datos.apellido1);
    await rellenar(page.locator('input[name="apellido2Interesado"]'), datos.apellido2);

    await seleccionar(page.locator('select[name="codigoTipoViaDomicilioInteresado"]'), datos.tipoVia);
    await rellenar(page.getByRole('textbox', { name: 'Debe inroducir el nombre de' }), datos.nombreVia);
    await seleccionar(page.locator('select[name="tipoNumeracionInteresado"]'), datos.tipoNumeracion);
    await rellenar(page.locator('input[name="numeroDomicilioInteresado"]'), datos.numero);
    if (datos.calificador) await rellenar(page.locator('input[name="calificadorNumeroInteresado"]'), datos.calificador);
    if (datos.bloque) await rellenar(page.locator('input[name="bloqueInteresado"]'), datos.bloque);
    if (datos.escalera) await rellenar(page.locator('input[name="escaleraDomicilioInteresado"]'), datos.escalera);
    if (datos.piso) await rellenar(page.locator('input[name="pisoDomicilioInteresado"]'), datos.piso);
    if (datos.puerta) await rellenar(page.locator('input[name="puertaDomicilioInteresado"]'), datos.puerta);

    const provNorm = (datos.provincia || 'Sevilla').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\b\w/g, c => c.toUpperCase());
    await seleccionar(page.locator('select[name="codigoProvinciaDomicilioInteresado"]'), PROVINCIAS[provNorm] || datos.provincia);

    const popMunP = page.waitForEvent('popup');
    await page.locator('img[onclick*="codigoMunicipioDomicilioInteresado"]').click();
    const popM = await popMunP;
    await popM.locator('input[name="municipioBusqueda"]').pressSequentially(datos.municipioNombre || '', { delay: 150 });
    await popM.getByRole('img', { name: 'Buscar Municipio' }).click();
    await esperar(3000);
    await popM.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click();

    await rellenar(page.locator('input[name="poblacion"]'), datos.poblacion);
    await rellenar(page.locator('input[name="codigoPostalDomicilioInteresado"]'), datos.codigoPostal);
    await rellenar(page.locator('input[name="telefonoInteresado"]'), datos.telefono);
    await rellenar(page.locator('input[name="movil"]'), datos.movil);

    if (datos.conPersonaAutorizada) {
      await seleccionar(page.locator('select[name="identificacionPersonaAutorizada"]'), datos.personaAutorizada.tipoDocumento);
      await rellenar(page.locator('input[name="nifPersonaAutorizada"]'), datos.personaAutorizada.nif);
      await seleccionar(page.locator('select[name="sexoPersonaAutorizada"]'), datos.personaAutorizada.sexo);
      await rellenar(page.locator('input[name="apellido1PersonaAutorizada"]'), datos.personaAutorizada.apellido1);
      await rellenar(page.locator('input[name="apellido2PersonaAutorizada"]'), datos.personaAutorizada.apellido2);
      await rellenar(page.locator('input[name="nombrePersonaAutorizada"]'), datos.personaAutorizada.nombre);
    }
    await rellenar(page.getByRole('textbox', { name: 'Introduzca una dirección de' }), datos.email);

    // Transición Segura a Pestaña 2
    console.log('   -> Navegando a Pestaña 2...');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load', timeout: 20000 }),
      page.locator('#parteCentralPestana2').click()
    ]);
    await esperar(3000);

    // ==========================================
    // [FASE 3] OTROS DATOS Y FICHA
    // ==========================================
    console.log('[3/5] Rellenando Otros Datos...');
    await marcar(page.getByRole('radio', { name: /Seleccione para crear una/i }));
    await pulsar(page.getByText('>>'));
    await esperar(3000);

    // TÉCNICO INSTALADOR (Lo que faltaba en v1)
    if (datos.conPersonaAutorizada) {
      console.log('   -> Vinculando Técnico Instalador...');
      await seleccionar(page.locator('#tecnicoInstalador1'), 'TF');
      await rellenar(page.locator('input[name="tecnicoInstalador1nombre"]'), datos.personaAutorizada.nombre);
      await rellenar(page.locator('input[name="tecnicoInstalador1apellido1"]'), datos.personaAutorizada.apellido1);
      await rellenar(page.locator('input[name="tecnicoInstalador1apellido2"]'), datos.personaAutorizada.apellido2);
      await seleccionar(page.locator('select[name="tecnicoInstalador1documento"]'), datos.personaAutorizada.tipoDocumento);
      await rellenar(page.locator('#tecnicoInstalador1nif'), datos.personaAutorizada.nif);
    }

    // Navegar a Datos establecimiento
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load', timeout: 20000 }),
      page.getByText('Datos establecimiento').click()
    ]);
    await esperar(3000);

    // Rellenar establecimiento (Simplificado pero con navegación robusta)
    await seleccionar(page.locator('select[name="codigoTipoViaDomicilioEstablecimiento"]'), datos.tipoVia);
    await rellenar(page.locator('input[name="nombreDomicilioEstablecimiento"]'), datos.nombreVia);
    await seleccionar(page.locator('select[name="tipoNumeracionEstablecimiento"]'), datos.tipoNumeracion);
    await rellenar(page.locator('input[name="numeroDomicilioEstablecimiento"]'), datos.numero);

    const popupEstPromise = page.waitForEvent('popup');
    await page.locator('img[onclick*="codigoMunicipioDomicilioEstablecimiento"]').click();
    const popupEst = await popupEstPromise;
    await popupEst.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre);
    await popupEst.getByRole('img', { name: 'Buscar Municipio' }).click();
    await esperar(3000);
    await popupEst.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click();
    await esperar(3000);

    await rellenar(page.locator('input[name="poblacionEstablecimiento"]'), datos.poblacion);
    await rellenar(page.locator('input[name="codigoPostalDomicilioEstablecimiento"]'), datos.codigoPostal);
    await rellenar(page.locator('input[name="emailEstablecimiento"]'), datos.email);

    // Navegar a Otros Datos (Final)
    console.log('   -> Navegando a Otros Datos Final...');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load', timeout: 20000 }),
      page.getByText('Otros datos', { exact: true }).click()
    ]);
    await esperar(3000);

    // MANEJO CCAA BLINDADO (Inmediatamente tras navegación)
    const ccaaLoc = page.locator('select[name="codigoComunidadAutonoma"]');
    if (await ccaaLoc.count() > 0) {
      await ccaaLoc.evaluate((el, v) => {
        el.removeAttribute('disabled'); el.value = v;
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }, datos.codigoComunidadAutonoma || '01');
    }

    await seleccionar(page.locator('select[name="otrosDatos75codigo"]'), datos.otrosDatos75codigo);
    await rellenar(page.getByRole('textbox', { name: 'Debe introducir el número de' }), datos.otrosDatosNumero);

    await page.locator('input[name="otrosDatos72"][value="N"]').click();
    await page.locator('input[name="otrosDatos73"][value="N"]').click();

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load', timeout: 20000 }),
      page.locator('input[name="otrosDatos741"][value="S"]').click()
    ]);
    await marcar(page.getByRole('checkbox').first());

    // ==========================================
    // [FASE 4] FICHA TÉCNICA (IFRAME)
    // ==========================================
    console.log('[4/5] Rellenando Ficha Técnica (Iframe)...');
    await pulsar(page.locator('#parteCentralPestana4'));
    await page.locator('li:nth-child(19) > #bloque2 > .checkbox').click();
    await pulsar(page.getByText('>>'));
    await page.getByRole('link', { name: 'Eléctricas de baja tensión' }).click();
    await esperar(3000);

    const iframeLocator = page.locator('#ficha');
    const frame = iframeLocator.contentFrame();
    await frame.getByRole('button', { name: 'Continuar' }).click();
    await esperar(3000);

    await rellenar(frame.getByRole('textbox', { name: 'Debe indicar Potencia' }), datos.fichaTecnica.potencia);
    await rellenar(frame.getByRole('textbox', { name: 'Debe introducir el uso al que' }), datos.fichaTecnica.uso);
    await seleccionar(frame.locator('select[name="tipoSuministro"]'), datos.fichaTecnica.tipoSuministro);
    await rellenar(frame.getByRole('textbox', { name: 'Debe indicar la tensión de' }), datos.fichaTecnica.tension);

    if (datos.fichaTecnica.esAutoconsumo) {
      await pulsar(frame.locator('#esAutoconsumoSi'));
      await rellenar(frame.getByRole('textbox', { name: 'Debe indicar el CAU' }), datos.fichaTecnica.cau);
      await pulsar(frame.locator('#tipoConsumo1'));
      await pulsar(frame.locator('#modalidadConexionGeneracion1'));
      await pulsar(frame.locator('#modalidadAutoconsumo2'));
    }

    await rellenar(frame.getByRole('textbox', { name: 'Potencia instalada', exact: true }), datos.fichaTecnica.potenciaInstalada);
    if (datos.fichaTecnica.acumulacion) {
      await pulsar(frame.locator('#disponibleAcumulacionSi'));
      await rellenar(frame.getByRole('textbox', { name: 'Debe indicar la potencia' }), datos.fichaTecnica.potenciaAcumulacion);
      await rellenar(frame.getByRole('textbox', { name: 'Debe indicar la energía má' }), datos.fichaTecnica.energiaMaximaAlmacenada);
    }

    await rellenar(frame.getByRole('textbox', { name: 'Debe introducir el nombre de la empresa instaladora' }), datos.fichaTecnica.empresaInstaladora);
    await seleccionar(frame.locator('select[name="documentoIdentEmpresaInstaladora"]'), datos.fichaTecnica.empresaInstaladoraDocTipo);
    await rellenar(frame.getByRole('textbox', { name: 'Debe introducir un NIF/CIF/' }), datos.fichaTecnica.empresaInstaladoraDoc);
    await rellenar(frame.getByRole('textbox', { name: 'Debe introducir el nombre de la empresa distribuidora' }), datos.fichaTecnica.empresaDistribuidora);

    // Radio de tipo de instalación (selector específico codegen)
    await frame.locator('li:nth-child(5) > div > ul > li > .bloqueGrupo > .elemento_checkbox > .radio').first().check().catch(() => { });

    page.on('dialog', d => d.accept().catch(() => { }));
    await frame.getByRole('img', { name: 'Guardar' }).click();

    console.log('   -> Ficha guardada. Esperando estabilización (10s)...');
    await esperar(10000);

    // Re-sincronizar el iframe tras el guardado (pudo refrescarse)
    const frameActualizado = page.frameLocator('#ficha');
    console.log('   -> Esperando iconos de adjuntar...');
    await frameActualizado.getByRole('img', { name: 'Adjuntar Documento' }).first().waitFor({ state: 'visible', timeout: 30000 });

    // ==========================================
    // [FASE 5] ADJUNTOS Y PUNTO SUMINISTRO
    // ==========================================
    console.log('[5/5] Subiendo Adjuntos y Punto Suministro...');

    await subirDocConPopup(frameActualizado, frameActualizado.getByRole('img', { name: 'Adjuntar Documento' }).nth(3), '1.-');
    await subirDocConPopup(frameActualizado, frameActualizado.getByRole('img', { name: 'Adjuntar Documento' }).nth(4), '2.-');
    await subirDocConPopup(frameActualizado, frameActualizado.locator('li:nth-child(8) > .bloqueGrupo > .elemento_checkbox > img'), '7.-');

    // Nuevo Usuario (Punto Suministro)
    console.log('\n[5/6] Abriendo popup "Nuevo Usuario" (Punto de Suministro)...');
    const popUP = context.waitForEvent('page', { timeout: 60000 });
    await frameActualizado.getByRole('button', { name: 'Nuevo Usuario' }).click().catch(async () => {
      console.log('   [!] Falló click en Nuevo Usuario (frameActualizado), reintentando con page...');
      return page.getByRole('button', { name: 'Nuevo Usuario' }).click();
    });

    const pU = await popUP.catch(() => null);
    if (!pU) {
      throw new Error('No se pudo detectar la apertura del popup de Nuevo Usuario.');
    }
    await pU.waitForLoadState('networkidle');

    console.log('   -> Rellenando Datos del Titular del Punto...');
    await rellenar(pU.getByRole('textbox', { name: 'Debe introducir el primer' }), datos.apellido1 || '');
    await rellenar(pU.getByRole('textbox', { name: 'Introduzca el segundo apellido' }), datos.apellido2 || '');
    await rellenar(pU.getByRole('textbox', { name: 'Debe introducir el nombre' }), datos.nombre || '');
    await seleccionar(pU.locator('#identificacionTitularPuntoSuministro'), datos.tipoDocumento || 'NIF');
    await rellenar(pU.getByRole('textbox', { name: 'Debe introducir un NIF/CIF/' }), datos.nif || '');

    console.log('   -> Rellenando Domicilio Titular del Punto...');
    await seleccionar(pU.locator('#codigoTipoViaDomicilioTitularPuntoSuministro'), datos.tipoVia);
    await rellenar(pU.locator('#nombreDomicilioTitularPuntoSuministro'), datos.nombreVia);
    await seleccionar(pU.locator('#tipoNumeracionTitularPuntoSuministro'), datos.tipoNumeracion);
    await rellenar(pU.locator('#numeroDomicilioTitularPuntoSuministro'), datos.numero);
    if (datos.calificador) await rellenar(pU.locator('#calificadorNumeroTitularPuntoSuministro'), datos.calificador);
    if (datos.bloque) await rellenar(pU.locator('#bloqueTitularPuntoSuministro'), datos.bloque);
    if (datos.escalera) await rellenar(pU.locator('#escaleraDomicilioTitularPuntoSuministro'), datos.escalera);
    if (datos.piso) await rellenar(pU.locator('#pisoDomicilioTitularPuntoSuministro'), datos.piso);
    if (datos.puerta) await rellenar(pU.locator('#puertaDomicilioTitularPuntoSuministro'), datos.puerta);
    await seleccionar(pU.locator('#margen'), datos.margen).catch(() => { });

    const pU_provNorm = (datos.provincia || 'Sevilla').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\b\w/g, c => c.toUpperCase());
    await seleccionar(pU.locator('#codigoProvinciaDomicilioTitularPuntoSuministro'), PROVINCIAS[pU_provNorm] || datos.delegacion);

    // Buscador Municipio Titular Punto
    console.log('   -> Buscando municipio (Titular Punto)...');
    const popMunTitPromise = pU.waitForEvent('popup');
    await pU.getByRole('group', { name: 'Datos titular del punto de' }).getByRole('img').click();
    const popMunTit = await popMunTitPromise;
    await popMunTit.waitForLoadState('networkidle');
    await popMunTit.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre);
    await popMunTit.getByRole('img', { name: 'Buscar Municipio' }).click();
    await esperar(3000);
    await popMunTit.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click();
    await esperar(3000);

    await rellenar(pU.locator('#codigoPostalDomicilioTitularPuntoSuministro'), datos.codigoPostal);
    await rellenar(pU.getByRole('textbox', { name: 'Introduzca el teléfono' }), datos.telefono);
    await rellenar(pU.getByRole('textbox', { name: 'Introduzca el email' }), datos.email);

    // Domicilio Punto de Suministro (mismos datos o los que correspondan)
    console.log('   -> Rellenando Domicilio del Punto de Suministro...');
    await seleccionar(pU.locator('#codigoTipoViaDomicilioDatosPuntoSuministro'), datos.tipoVia);
    await rellenar(pU.locator('#nombreDomicilioDatosPuntoSuministro'), datos.nombreVia);
    await seleccionar(pU.locator('#tipoNumeracionDatosPuntoSuministro'), datos.tipoNumeracion);
    await rellenar(pU.locator('#numeroDomicilioDatosPuntoSuministro'), datos.numero);
    if (datos.calificador) await rellenar(pU.locator('#calificadorNumeroDatosPuntoSuministro'), datos.calificador);
    if (datos.bloque) await rellenar(pU.locator('#bloqueDatosPuntoSuministro'), datos.bloque);
    if (datos.escalera) await rellenar(pU.locator('#escaleraDomicilioDatosPuntoSuministro'), datos.escalera);
    if (datos.piso) await rellenar(pU.locator('#pisoDomicilioDatosPuntoSuministro'), datos.piso);
    if (datos.puerta) await rellenar(pU.locator('#puertaDomicilioDatosPuntoSuministro'), datos.puerta);
    await seleccionar(pU.locator('#codigoProvinciaDomicilioDatosPuntoSuministro'), PROVINCIAS[pU_provNorm] || datos.delegacion);

    // Buscador Municipio Punto
    console.log('   -> Buscando municipio (Punto Suministro)...');
    const popMunPuntoPromise = pU.waitForEvent('popup');
    await pU.getByRole('group', { name: 'Datos del punto de suministro' }).getByRole('img').click();
    const popMunPunto = await popMunPuntoPromise;
    await popMunPunto.waitForLoadState('networkidle');
    await popMunPunto.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre);
    await popMunPunto.getByRole('img', { name: 'Buscar Municipio' }).click();
    await esperar(3000);
    await popMunPunto.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click();
    await esperar(3000);

    await rellenar(pU.locator('#codigoPostalDomicilioDatosPuntoSuministro'), datos.codigoPostal);

    // Datos Técnicos del Suministro (CUPS + tensión)
    console.log('   -> Rellenando CUPS y tensión...');
    await rellenar(pU.getByRole('textbox', { name: 'Debe indicar el CUPS del' }), datos.fichaTecnica.cups);

    // TRUCO: Forzar eventos de CUPS para que la web lo valide correctamente
    await pU.locator('#cupsPuntoSuministro').evaluate((el, cupsVal) => {
      el.value = cupsVal;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.dispatchEvent(new Event('blur', { bubbles: true }));
    }, datos.fichaTecnica.cups).catch(() => { });

    const tensionMapeada = datos.fichaTecnica.tension === '230' ? '0,4' : datos.fichaTecnica.tension;
    await seleccionar(pU.locator('#tensionPuntoSuministro'), tensionMapeada);

    console.log('   -> Aceptando popup Nuevo Usuario...');
    pU.on('dialog', async d => { await d.accept().catch(() => { }); });
    await pU.getByRole('button', { name: 'Aceptar' }).click();
    await esperar(3000);

    // ==========================================
    // [FINAL] PRESENTACIÓN
    // ==========================================
    console.log('\n--- PROCESO CASI TERMINADO ---');
    console.log('🛑 PARADA FINAL: Revisa todo antes de PRESENTAR.');
    await page.pause();

    return { success: true }
  } catch (error) {
    console.error('❌ Error en automatización:', error.message);
    throw error;
  }
}
