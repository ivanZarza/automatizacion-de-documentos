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
 * Integra la lógica experta de certificados y navegación manual/asistida.
 */
export const runJuntaAutomation = async (payload) => {
  const datos = payload.datos;
  const formData = payload.flatFormData;
  console.log('--- Iniciando Automatización Junta de Andalucía (Modo Certificado/Asistido) ---')

  // Carpeta de perfil persistente para certificados/sesiones
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
  // [SECCIÓN 1] HELPERS ROBUSTOS
  // ==========================================

  const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function rellenar(locator, valor) {
    if (!valor) return;
    await esperar(1500);
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
        }, valor);
      } else {
        await locator.click({ timeout: 5000 }).catch(() => { });
        await locator.focus().catch(() => { });
        await locator.pressSequentially(valor, { delay: 50 });
        await locator.dispatchEvent('change').catch(() => { });
      }
    } catch (e) {
      console.log(`      [!] Error rellenando: ${e.message}`);
    }
  }

  async function seleccionar(locator, valor) {
    if (!valor) return;
    await esperar(1500);
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
      await locator.selectOption(valor);
    } catch (e) {
      console.log(`      [!] Error seleccionando: ${e.message}`);
    }
  }

  async function pulsar(locator) {
    await esperar(1000);
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
      await locator.click({ force: true });
    } catch (e) {
      console.log(`      [!] Error pulsando: ${e.message}`);
    }
  }

  async function marcar(locator) {
    await esperar(1000);
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
      await locator.check({ force: true }).catch(() => { });
    } catch (e) {
      console.log(`      [!] Error marcando: ${e.message}`);
    }
  }

  // Helper para buscar archivos en la carpeta de documentos del cliente
  const buscarArchivoAbsoluto = (prefijo) => {
    const dir = path.join(process.cwd(), formData?.apellidosNombre || 'Ivan Zarza Estevez')
    if (!fs.existsSync(dir)) return null;
    const archivos = fs.readdirSync(dir);
    const encontrado = archivos.find(x => x.startsWith(prefijo));
    return encontrado ? path.join(dir, encontrado) : null;
  }

  async function subirDocConPopup(targetFrame, selector, prefijo) {
    const ruta = buscarArchivoAbsoluto(prefijo);
    if (!ruta) {
      console.log(`   [!] Archivo con prefijo "${prefijo}" no encontrado.`);
      return;
    }
    console.log(`   -> Subiendo: ${path.basename(ruta)}`);
    try {
      const loc = (typeof selector === 'string' ? targetFrame.locator(selector) : selector);
      await loc.scrollIntoViewIfNeeded().catch(() => { });

      const popupPromise = context.waitForEvent('page', { timeout: 60000 });
      await loc.click({ force: true, delay: 500 }).catch(() => { });

      const popup = await popupPromise.catch(async () => {
        await loc.evaluate(n => n.dispatchEvent(new Event('click', { bubbles: true })));
        return context.waitForEvent('page', { timeout: 30000 }).catch(() => null);
      });

      if (!popup) return;
      await popup.waitForLoadState('load');

      const fileChooserPromise = popup.waitForEvent('filechooser');
      const btnSelect = popup.getByRole('button', { name: /Choose File|Seleccionar archivo/i });
      await btnSelect.click({ timeout: 5000 }).catch(() => btnSelect.evaluate(n => n.click()));

      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(ruta);

      await popup.evaluate(() => {
        const input = document.querySelector('input[type="file"]');
        if (input) input.dispatchEvent(new Event('change', { bubbles: true }));
      });

      await esperar(2000);
      popup.on('dialog', d => d.accept().catch(() => { }));
      await popup.getByRole('img', { name: 'Guardar' }).click();
      await esperar(3000);
      if (!popup.isClosed()) await popup.close().catch(() => { });
    } catch (e) {
      console.log(`      [!] Error crítico subiendo ${prefijo}:`, e.message);
    }
  }

  try {
    // ==========================================
    // [FASE 0] LOGIN Y CERTIFICADO
    // ==========================================
    console.log('[1/5] Navegando a la Bienvenida...');
    await page.goto('https://www.juntadeandalucia.es/empleoempresaycomercio/oficinavirtual/bienvenida.do');

    // Aceptar cookies
    const botonCookies = page.getByRole('button', { name: /Aceptar todas/i });
    if (await botonCookies.isVisible()) await botonCookies.click();

    await page.getByText('Habilitaciones').click();
    await esperar(2000);

    const estaLogueado = await page.getByRole('link', { name: /Cerrar sesión/i }).isVisible().catch(() => false);
    if (!estaLogueado) {
      console.log('   -> Solicitando Login con Certificado...');
      const botonCertificado = page.locator('#acceso-2').getByTitle('Acceso con certificado digital');
      await botonCertificado.click();

      console.log('\n🛑 PARADA: SELECCIÓN DE CERTIFICADO (Firma Manual)');
      console.log('1. Dale a "Abrir" en el aviso de xdg-open/AutoFirma.');
      console.log('2. Elige tu certificado en la ventana que aparecerá.');
      console.log('3. Cuando veas la pantalla de "Acceso a Comunicaciones", dale a Resume.');
      await page.pause();
    }

    // ==========================================
    // [FASE 1] NAVEGACIÓN INICIAL
    // ==========================================
    try {
      await page.getByRole('button', { name: /ACEPTAR/i }).click({ timeout: 5000 });
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

    // Domicilio Titular
    await seleccionar(page.locator('select[name="codigoTipoViaDomicilioInteresado"]'), datos.tipoVia);
    await rellenar(page.getByRole('textbox', { name: 'Debe inroducir el nombre de' }), datos.nombreVia);
    await seleccionar(page.locator('select[name="tipoNumeracionInteresado"]'), datos.tipoNumeracion);
    await rellenar(page.locator('input[name="numeroDomicilioInteresado"]'), datos.numero);
    if (datos.calificador) await rellenar(page.locator('input[name="calificadorNumeroInteresado"]'), datos.calificador);
    if (datos.bloque) await rellenar(page.locator('input[name="bloqueInteresado"]'), datos.bloque);
    if (datos.escalera) await rellenar(page.locator('input[name="escaleraDomicilioInteresado"]'), datos.escalera);
    if (datos.piso) await rellenar(page.locator('input[name="pisoDomicilioInteresado"]'), datos.piso);
    if (datos.puerta) await rellenar(page.locator('input[name="puertaDomicilioInteresado"]'), datos.puerta);

    const provRaw = datos.provincia || 'Sevilla';
    const provNorm = provRaw.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\b\w/g, c => c.toUpperCase());
    await seleccionar(page.locator('select[name="codigoProvinciaDomicilioInteresado"]'), PROVINCIAS[provNorm] || provRaw);

    // Buscador Municipio
    const popMunP = page.waitForEvent('popup');
    await page.locator('img[onclick*="codigoMunicipioDomicilioInteresado"]').click();
    const popM = await popMunP;
    await popM.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre || '');
    await popM.getByRole('img', { name: 'Buscar Municipio' }).click();
    await esperar(2000);
    await popM.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click();

    await rellenar(page.locator('input[name="poblacion"]'), datos.poblacion);
    await rellenar(page.locator('input[name="codigoPostalDomicilioInteresado"]'), datos.codigoPostal);
    await rellenar(page.locator('input[name="telefonoInteresado"]'), datos.telefono);
    await rellenar(page.locator('input[name="movil"]'), datos.movil);

    // Persona Autorizada
    if (datos.conPersonaAutorizada) {
      await seleccionar(page.locator('select[name="identificacionPersonaAutorizada"]'), datos.personaAutorizada.tipoDocumento);
      await rellenar(page.locator('input[name="nifPersonaAutorizada"]'), datos.personaAutorizada.nif);
      await seleccionar(page.locator('select[name="sexoPersonaAutorizada"]'), datos.personaAutorizada.sexo);
      await rellenar(page.locator('input[name="apellido1PersonaAutorizada"]'), datos.personaAutorizada.apellido1);
      await rellenar(page.locator('input[name="apellido2PersonaAutorizada"]'), datos.personaAutorizada.apellido2);
      await rellenar(page.locator('input[name="nombrePersonaAutorizada"]'), datos.personaAutorizada.nombre);
    }
    await rellenar(page.getByRole('textbox', { name: 'Introduzca una dirección de' }), datos.email).catch(() => { });

    // ==========================================
    // [FASE 3] OTROS DATOS Y FICHA
    // ==========================================
    console.log('[3/5] Navegando a Otros Datos...');
    await page.locator('#parteCentralPestana2').click();
    await esperar(3000);
    await marcar(page.getByRole('radio', { name: /Seleccione para crear una/i }));
    await pulsar(page.getByText('>>'));

    // Pestaña Otros datos
    await page.getByText('Otros datos', { exact: true }).click();
    await esperar(3000);

    const ccaaLoc = page.locator('select[name="codigoComunidadAutonoma"]');
    if (await ccaaLoc.isVisible()) await seleccionar(ccaaLoc, datos.codigoComunidadAutonoma || '01');

    await seleccionar(page.locator('select[name="otrosDatos75codigo"]'), datos.otrosDatos75codigo);
    await rellenar(page.getByRole('textbox', { name: 'Debe introducir el número de' }), datos.otrosDatosNumero);

    // Radios de validación
    await page.locator('input[name="otrosDatos72"][value="N"]').click().catch(() => { });
    await page.locator('input[name="otrosDatos73"][value="N"]').click().catch(() => { });

    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 8000 }),
        page.locator('input[name="otrosDatos741"][value="S"]').click()
      ]);
    } catch (e) {
      await page.locator('input[name="otrosDatos741"][value="S"]').click().catch(() => { });
    }
    await marcar(page.getByRole('checkbox').first());

    // ==========================================
    // [FASE 4] FICHA TÉCNICA (IFRAME)
    // ==========================================
    console.log('[4/5] Rellenando Ficha Técnica (Iframe)...');
    await page.locator('#parteCentralPestana4').click();
    await page.locator('li:nth-child(19) > #bloque2 > .checkbox').click();
    await pulsar(page.getByText('>>'));
    await page.getByRole('link', { name: 'Eléctricas de baja tensión' }).click();

    const iframeLocator = page.locator('#ficha');
    await iframeLocator.waitFor({ state: 'visible' });
    const frame = iframeLocator.contentFrame();

    await pulsar(frame.getByRole('button', { name: 'Continuar' }));
    await rellenar(frame.getByRole('textbox', { name: 'Debe indicar Potencia' }), datos.fichaTecnica.potencia);
    await rellenar(frame.getByRole('textbox', { name: 'Debe introducir el uso al que' }), datos.fichaTecnica.uso);
    await seleccionar(frame.locator('select[name="tipoSuministro"]'), datos.fichaTecnica.tipoSuministro);
    await rellenar(frame.getByRole('textbox', { name: 'Debe indicar la tensión de' }), datos.fichaTecnica.tension);

    if (datos.fichaTecnica.esAutoconsumo) {
      await marcar(frame.locator('#esAutoconsumoSi'));
      await rellenar(frame.getByRole('textbox', { name: 'Debe indicar el CAU' }), datos.fichaTecnica.cau);
      await marcar(frame.locator('#tipoConsumo1'));
      await marcar(frame.locator('#modalidadConexionGeneracion1'));
      await marcar(frame.locator('#modalidadAutoconsumo2'));
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

    // Tipo de instalación (radio codegen)
    await frame.locator('li:nth-child(5) > div > ul > li > .bloqueGrupo > .elemento_checkbox > .radio').first().check().catch(() => { });

    // Guardar Ficha
    page.on('dialog', d => d.accept().catch(() => { }));
    await frame.getByRole('img', { name: 'Guardar' }).click();

    console.log('   -> Ficha guardada. Esperando estabilización...');
    await esperar(5000); // Espera de seguridad tras el click de guardar

    // Esperar a que la capa de carga desaparezca si existe
    const capa = page.locator('#capa_fondo');
    if (await capa.count() > 0) {
      await capa.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => { });
    }

    // ==========================================
    // [FASE 5] ADJUNTOS Y PUNTO SUMINISTRO
    // ==========================================
    console.log('[5/5] Subiendo Adjuntos y Nuevo Usuario...');
    await page.getByText('Datos establecimiento').click(); // Para volver a la zona de adjuntos si es necesario

    await subirDocConPopup(frame, frame.getByRole('img', { name: 'Adjuntar Documento' }).nth(3), '1.-');
    await subirDocConPopup(frame, frame.getByRole('img', { name: 'Adjuntar Documento' }).nth(4), '2.-');
    await frame.getByText('7 Certificado de adecuación').click().catch(() => { });
    await subirDocConPopup(frame, frame.locator('li:nth-child(8) > .bloqueGrupo > .elemento_checkbox > img'), '7.-');

    // Nuevo Usuario
    const popUP = page.waitForEvent('popup');
    await frame.getByRole('button', { name: 'Nuevo Usuario' }).click();
    const pU = await popUP;
    await pU.waitForLoadState('networkidle');

    await rellenar(pU.getByRole('textbox', { name: 'Debe introducir el primer' }), datos.apellido1);
    await rellenar(pU.getByRole('textbox', { name: 'Introduzca el segundo apellido' }), datos.apellido2);
    await rellenar(pU.getByRole('textbox', { name: 'Debe introducir el nombre' }), datos.nombre);
    await seleccionar(pU.locator('#identificacionTitularPuntoSuministro'), datos.tipoDocumento);
    await rellenar(pU.getByRole('textbox', { name: 'Debe introducir un NIF/CIF/' }), datos.nif);

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
