const { chromium } = require('playwright');

// Mapa de provincias de España (código INE oficial)
// Acepta nombre o código numérico como string: provincia: 'Sevilla' o provincia: '41'
const PROVINCIAS = {
  // Andalucía
  'Almeria': '04', 'Cadiz': '11', 'Cordoba': '14', 'Granada': '18',
  'Huelva': '21', 'Jaen': '23', 'Malaga': '29', 'Sevilla': '41',
  // Aragón
  'Huesca': '22', 'Teruel': '44', 'Zaragoza': '50',
  // Asturias
  'Asturias': '33',
  // Baleares
  'Illes Balears': '07', 'Baleares': '07',
  // Canarias
  'Las Palmas': '35', 'Santa Cruz de Tenerife': '38',
  // Cantabria
  'Cantabria': '39',
  // Castilla-La Mancha
  'Albacete': '02', 'Ciudad Real': '13', 'Cuenca': '16',
  'Guadalajara': '19', 'Toledo': '45',
  // Castilla y León
  'Avila': '05', 'Burgos': '09', 'Leon': '24', 'Palencia': '34',
  'Salamanca': '37', 'Segovia': '40', 'Soria': '42', 'Valladolid': '47', 'Zamora': '49',
  // Cataluña
  'Barcelona': '08', 'Girona': '17', 'Lleida': '25', 'Tarragona': '43',
  // Comunitat Valenciana
  'Alicante': '03', 'Castellon': '12', 'Valencia': '46',
  // Extremadura
  'Badajoz': '06', 'Caceres': '10',
  // Galicia
  'A Coruna': '15', 'Lugo': '27', 'Ourense': '32', 'Pontevedra': '36',
  // La Rioja
  'La Rioja': '26',
  // Madrid
  'Madrid': '28',
  // Murcia
  'Murcia': '30',
  // Navarra
  'Navarra': '31',
  // País Vasco
  'Alava': '01', 'Gipuzkoa': '20', 'Bizkaia': '48',
  // Ceuta y Melilla
  'Ceuta': '51', 'Melilla': '52',
  // También acepta directamente el código: '41', '28', etc.
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

  // 1.3 Persona Autorizada (Opcional) - Pasa a firmar si no es el titular/rep
  conPersonaAutorizada: true,
  personaAutorizada: {
    tipoDocumento: 'NIF',
    nif: '28818007L',
    sexo: 'M',
    nombre: 'Eduardo',
    apellido1: 'Rivera',
    apellido2: 'Cabezas',
  },

  email: 'email@prueba.com',

  // FASE 3: Otros Datos y Ficha Técnica
  otrosDatos75codigo: 'T9820',
  otrosDatosNumero: '41045500',
  codigoComunidadAutonoma: '01',

  fichaTecnica: {
    potencia: '123',
    uso: 'PRODUCCIÓN ENERGÍA ELÉCTRICA',
    tipoSuministro: 'Monofásico', // Monofásico, Trifásico
    tension: '230', // 230V o 400V
    esAutoconsumo: true,
    cau: 'ES0276000000152516WA0FA000',
    potenciaInstalada: '123',
    acumulacion: true,
    potenciaAcumulacion: '666',
    energiaMaximaAlmacenada: '12345',
    empresaInstaladora: 'Solay Ingenieros S.L.',
    empresaInstaladoraDocTipo: 'CIF',
    empresaInstaladoraDoc: 'B09848912',
    empresaDistribuidora: 'endesa',
    cups: 'ES0276000000152516WA0F',
  }
};

(async () => {
  console.log('Iniciando prueba de autorrelleno completa...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // ==========================================
    // [SECCIÓN 2] NAVEGACIÓN Y ACCESO
    // ==========================================
    console.log('[1/5] Navegando a la Bienvenida...');
    await page.goto('https://www.juntadeandalucia.es/empleoempresaycomercio/oficinavirtual/bienvenida.do');
    await page.getByRole('button', { name: 'Aceptar todas' }).click();
    await page.getByText('Habilitaciones').click();
    await page.locator('#acceso-2').getByTitle('Acceso sin certificado digital').click();
    await page.getByRole('link', { name: /Acceso a Comunicaciones/ }).click();
    await page.waitForSelector('select[name="codDelegacion"]');

    // --- DELEGACIÓN ---
    console.log('[1.5/5] Seleccionando delegación...');
    await page.locator('select[name="codDelegacion"]').selectOption(datos.delegacion);

    // ==========================================
    // [SECCIÓN 3] FASE 1: IDENTIFICACIÓN (Pestaña 1)
    // ==========================================
    console.log('[2/5] Rellenando datos de identificación...');
    await page.locator('select[name="identificacionInteresado"]').selectOption(datos.tipoDocumento);
    await page.locator('#nifInteresado').fill(datos.nif);
    await page.locator('select[name="sexoInteresado"]').selectOption(datos.sexo);
    await page.locator('input[name="nombreInteresado"]').fill(datos.nombre);
    await page.locator('input[name="apellido1Interesado"]').fill(datos.apellido1);
    await page.locator('input[name="apellido2Interesado"]').fill(datos.apellido2);

    // ==========================================
    // [SECCIÓN 4] FASE 1: DOMICILIO (Pestaña 1)
    // ==========================================
    console.log('[3/5] Rellenando domicilio...');
    await page.locator('select[name="codigoTipoViaDomicilioInteresado"]').selectOption(datos.tipoVia);
    await page.getByRole('textbox', { name: 'Debe inroducir el nombre de' }).fill(datos.nombreVia);
    await page.locator('select[name="tipoNumeracionInteresado"]').selectOption(datos.tipoNumeracion);
    await page.locator('input[name="numeroDomicilioInteresado"]').fill(datos.numero);
    if (datos.calificador) await page.locator('input[name="calificadorNumeroInteresado"]').fill(datos.calificador);
    if (datos.bloque) await page.locator('input[name="bloqueInteresado"]').fill(datos.bloque);
    if (datos.escalera) await page.locator('input[name="escaleraDomicilioInteresado"]').fill(datos.escalera);
    if (datos.piso) await page.locator('input[name="pisoDomicilioInteresado"]').fill(datos.piso);
    if (datos.puerta) await page.locator('input[name="puertaDomicilioInteresado"]').fill(datos.puerta);

    // Provincia → abre popup para seleccionar municipio
    // Normaliza: quita tildes/diéresis y aplica Title Case para buscar en el mapa
    const provNorm = datos.provincia
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quitar tildes y ñ→n
      .replace(/\b\w/g, c => c.toUpperCase());           // Title Case
    await page.locator('select[name="codigoProvinciaDomicilioInteresado"]').selectOption(PROVINCIAS[provNorm] || PROVINCIAS[datos.provincia] || datos.provincia);

    console.log('   -> Abriendo buscador de municipios...');
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('group', { name: '1.1 Persona titular' }).getByRole('img').click();
    const page1 = await page1Promise;

    // Esperar a que la ventana emergente esté lista
    await page1.waitForLoadState('networkidle');
    await page1.waitForSelector('input[name="municipioBusqueda"]');

    console.log(`   -> Buscando municipio: ${datos.municipioNombre}`);
    await page1.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre);
    await page1.waitForTimeout(500); // Pausa visual corta

    await page1.getByRole('img', { name: 'Buscar Municipio' }).click();

    // Esperar a que aparezca el enlace del municipio
    const municipioLink = page1.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first();
    await municipioLink.waitFor({ state: 'visible' });
    await page1.waitForTimeout(500); // Pausa visual corta

    await municipioLink.click();
    console.log('   -> Municipio seleccionado.');

    await page.locator('input[name="poblacion"]').fill(datos.poblacion);
    await page.locator('input[name="codigoPostalDomicilioInteresado"]').fill(datos.codigoPostal);

    // ==========================================
    // [SECCIÓN 5] FASE 1: CONTACTO Y REPRESENTACIÓN
    // ==========================================
    console.log('[4/5] Rellenando datos de contacto...');
    if (datos.telefono) await page.locator('input[name="telefonoInteresado"]').fill(datos.telefono);
    if (datos.movil) await page.locator('input[name="movil"]').fill(datos.movil);

    // --- 1.2 REPRESENTANTE LEGAL (opcional) ---
    if (datos.conRepresentante) {
      console.log('[5/6] Rellenando datos del Representante Legal (1.2)...');
      await page.locator('select[name="identificacionRepresentante"]').selectOption(datos.representante.tipoDocumento);
      await page.locator('input[name="nifRepresentante"]').fill(datos.representante.nif);
      await page.locator('select[name="sexoRepresentante"]').selectOption(datos.representante.sexo);
      await page.locator('input[name="nombreRepresentante"]').fill(datos.representante.nombre);
      await page.locator('input[name="apellido1Representante"]').fill(datos.representante.apellido1);
      await page.locator('input[name="apellido2Representante"]').fill(datos.representante.apellido2);
    }

    // --- 1.3 PERSONA AUTORIZADA (opcional) ---
    if (datos.conPersonaAutorizada) {
      console.log('[6/6] Rellenando datos de la Persona Autorizada (1.3)...');
      await page.locator('select[name="identificacionPersonaAutorizada"]').selectOption(datos.personaAutorizada.tipoDocumento);
      await page.locator('input[name="nifPersonaAutorizada"]').fill(datos.personaAutorizada.nif);
      await page.locator('select[name="sexoPersonaAutorizada"]').selectOption(datos.personaAutorizada.sexo);
      await page.locator('input[name="nombrePersonaAutorizada"]').fill(datos.personaAutorizada.nombre);
      await page.locator('input[name="apellido1PersonaAutorizada"]').fill(datos.personaAutorizada.apellido1);
      await page.locator('input[name="apellido2PersonaAutorizada"]').fill(datos.personaAutorizada.apellido2);
    }

    // Email titular (necesario para que el servidor renderice CCAA en "Otros datos")
    await page.getByRole('textbox', { name: 'Introduzca una dirección de' }).fill(datos.email).catch(() => { });

    console.log('✅ ¡Fase 1 completa!');

    // ==========================================
    // [SECCIÓN 6] FASE 2: MODALIDADES (Pestaña 2)
    // ==========================================
    console.log('\n[6/6] Iniciando FASE 2: Modalidades...');

    // 1. Ir a la pestaña 2 (dispara POST - hay que esperar navegación)
    console.log('   -> Cliquerando en pestaña de Modalidades...');
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
        page.locator('#parteCentralPestana2').click()
      ]);
    } catch (e) {
      await page.locator('#parteCentralPestana2').click();
    }
    await page.waitForLoadState('networkidle').catch(() => { });
    await page.waitForTimeout(3000);

    // Esperar a que el selector de modalidad esté visible
    const radioModalidad = page.getByRole('radio', { name: /Seleccione para crear una/i });
    await radioModalidad.waitFor({ state: 'visible', timeout: 10000 });

    // 2. Selección de modalidad (Crear nueva)
    console.log('   -> Seleccionando modalidad...');
    await radioModalidad.check();
    await page.getByText('>>').click();
    await page.waitForTimeout(1000); // Dar tiempo a que se desplieguen los campos dinámicos

    // ==========================================
    // [SECCIÓN 7] FASE 2: DATOS DEL TÉCNICO
    // ==========================================
    console.log('   -> Rellenando Datos del Técnico (reusando 1.3)...');
    if (datos.conPersonaAutorizada) {
      await page.locator('#tecnicoInstalador1').selectOption('TF');
      await page.locator('input[name="tecnicoInstalador1nombre"]').fill(datos.personaAutorizada.nombre);
      await page.locator('input[name="tecnicoInstalador1apellido1"]').fill(datos.personaAutorizada.apellido1);
      await page.locator('input[name="tecnicoInstalador1apellido2"]').fill(datos.personaAutorizada.apellido2);
      await page.locator('select[name="tecnicoInstalador1documento"]').selectOption(datos.personaAutorizada.tipoDocumento);
      await page.locator('#tecnicoInstalador1nif').fill(datos.personaAutorizada.nif);
    }

    // ==========================================
    // [SECCIÓN 8] FASE 2: DATOS DEL ESTABLECIMIENTO
    // ==========================================
    console.log('   -> Rellenando Datos del Establecimiento (reusando domicilio)...');
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
        page.getByText('Datos establecimiento').click()
      ]);
    } catch (e) {
      await page.getByText('Datos establecimiento').click();
    }
    await page.waitForLoadState('networkidle').catch(() => { });
    await page.waitForTimeout(3000);

    await page.locator('select[name="codigoTipoViaDomicilioEstablecimiento"]').selectOption(datos.tipoVia);
    await page.locator('input[name="nombreDomicilioEstablecimiento"]').fill(datos.nombreVia);
    await page.locator('select[name="tipoNumeracionEstablecimiento"]').selectOption(datos.tipoNumeracion);
    await page.locator('input[name="numeroDomicilioEstablecimiento"]').fill(datos.numero);

    if (datos.calificador) await page.locator('input[name="calificadorNumeroEstablecimiento"]').fill(datos.calificador);
    if (datos.bloque) await page.locator('input[name="bloqueEstablecimiento"]').fill(datos.bloque);
    if (datos.escalera) await page.locator('input[name="escaleraDomicilioEstablecimiento"]').fill(datos.escalera);
    if (datos.piso) await page.locator('input[name="pisoDomicilioEstablecimiento"]').fill(datos.piso);
    if (datos.puerta) await page.locator('input[name="puertaDomicilioEstablecimiento"]').fill(datos.puerta);
    if (datos.margen) await page.locator('select[name="margenEstablecimiento"]').selectOption(datos.margen);

    // Buscador de Municipio de Establecimiento (mismo proceso que el anterior)
    console.log('   -> Abriendo buscador de municipio para Establecimiento...');
    const popupEstPromise = page.waitForEvent('popup');
    await page.getByRole('group', { name: 'Cumplimentar sólo en el caso' }).getByRole('img').click();
    const popupEst = await popupEstPromise;

    await popupEst.waitForLoadState('networkidle');
    await popupEst.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre);
    await popupEst.getByRole('img', { name: 'Buscar Municipio' }).click();
    await popupEst.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click();

    // Rellenado final de contacto del establecimiento
    await page.locator('input[name="poblacionEstablecimiento"]').fill(datos.poblacion);
    await page.locator('input[name="codigoPostalDomicilioEstablecimiento"]').fill(datos.codigoPostal);
    await page.locator('input[name="telefonoEstablecimiento"]').fill(datos.telefono);
    await page.locator('input[name="movilEstablecimiento"]').fill(datos.movil);
    // Email: como en tu captura pusiste uno genérico, lo pongo directo o lo sacamos del titular si quieres
    await page.locator('input[name="emailEstablecimiento"]').fill('correo@electronico.com');

    // ==========================================
    // [SECCIÓN 9] FASE 3: DOCUMENTACIÓN / OTROS DATOS (Basado en Codegen)
    // ==========================================
    console.log('\n[X/X] Iniciando FASE 3: Otros datos y Ficha Técnica...');

    // Navegar a "Otros datos" con waitForNavigation (POST #4)
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
        page.getByText('Otros datos', { exact: true }).click()
      ]);
    } catch (e) {
      await page.getByText('Otros datos', { exact: true }).click();
    }
    await page.waitForLoadState('networkidle').catch(() => { });
    await page.waitForTimeout(3000);

    // 1. CCAA PRIMERO (existe inmediatamente tras POST #4)
    console.log('   -> Seleccionando CCAA (inmediatamente tras POST #4)...');
    const ccaaLocAR = page.locator('select[name="codigoComunidadAutonoma"]');
    const ccaaCountAR = await ccaaLocAR.count();
    if (ccaaCountAR > 0) {
      const ccaaDisabledAR = await ccaaLocAR.isDisabled().catch(() => false);
      if (ccaaDisabledAR) {
        await ccaaLocAR.evaluate((el, val) => {
          el.removeAttribute('disabled'); el.value = val;
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }, datos.codigoComunidadAutonoma);
      } else {
        await ccaaLocAR.selectOption(datos.codigoComunidadAutonoma);
      }
      console.log('   -> ✓ CCAA seleccionada.');
    } else {
      console.log('   [!] CCAA no existe en el DOM');
    }
    await page.waitForTimeout(2000);

    // 2. RITE
    console.log('   -> Seleccionando RITE...');
    await page.locator('select[name="otrosDatos75codigo"]').selectOption(datos.otrosDatos75codigo).catch(() => { });
    await page.waitForTimeout(1000);
    await page.evaluate((val) => {
      const el = document.querySelector('select[name="otrosDatos75codigo"]');
      if (!el) return;
      el.value = val;
      const handlerStr = el.getAttribute('onchange');
      if (handlerStr) { try { new Function(handlerStr).call(el); } catch (e) { } }
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.dispatchEvent(new Event('blur', { bubbles: true }));
    }, datos.otrosDatos75codigo);
    console.log('   -> Esperando 10s para onchange (posible AJAX)...');
    await page.waitForTimeout(10000);

    // 3. Número de empresa instaladora
    const numEmpLoc = page.getByRole('textbox', { name: 'Debe introducir el número de' });
    const numDisabled = await numEmpLoc.isDisabled().catch(() => false);
    if (numDisabled) {
      await numEmpLoc.evaluate((el, v) => {
        el.removeAttribute('readonly'); el.removeAttribute('disabled');
        el.value = v;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }, datos.otrosDatosNumero);
    } else {
      await numEmpLoc.fill(datos.otrosDatosNumero);
    }
    await page.locator('#bloque1 > div:nth-child(4)').click().catch(() => {
      return page.locator('body').click({ position: { x: 10, y: 10 } }).catch(() => { });
    });
    await page.keyboard.press('Tab').catch(() => { });
    await page.waitForTimeout(5000);

    // 4. Radios DESPUÉS de CCAA/RITE/número
    await page.getByRole('radio').nth(1).click();
    await page.waitForTimeout(2000);
    await page.getByRole('radio').nth(3).click();
    await page.waitForTimeout(2000);
    await page.getByRole('radio').nth(4).click();
    await page.waitForTimeout(2000);

    await page.getByRole('checkbox').first().check();

    console.log('   -> Entrando a Pestaña 4 y Ficha Técnica...');
    await page.locator('#parteCentralPestana4').click();
    await page.locator('li:nth-child(19) > #bloque2 > .checkbox').click({ delay: 100 });
    await page.waitForTimeout(1000);
    await page.getByText('>>').click();
    await page.waitForTimeout(1500);

    console.log('   -> Entrando en la Ficha Técnica...');
    await page.getByRole('link', { name: 'Eléctricas de baja tensión' }).click();

    const iframeLocator = page.locator('#ficha');
    await iframeLocator.waitFor({ state: 'visible', timeout: 15000 });
    const frame = iframeLocator.contentFrame();

    console.log('   -> Rellenando Ficha Técnica técnica (Iframe)...');
    const btnContinuar = frame.getByRole('button', { name: 'Continuar' });
    await btnContinuar.waitFor({ state: 'visible', timeout: 10000 });
    await btnContinuar.click();

    await frame.getByRole('textbox', { name: 'Debe indicar Potencia' }).fill(datos.fichaTecnica.potencia);
    await frame.getByRole('textbox', { name: 'Debe introducir el uso al que' }).fill(datos.fichaTecnica.uso);
    await frame.locator('select[name="tipoSuministro"]').selectOption(datos.fichaTecnica.tipoSuministro);
    await frame.getByRole('textbox', { name: 'Debe indicar la tensión de' }).fill(datos.fichaTecnica.tension);

    if (datos.fichaTecnica.esAutoconsumo) {
      await frame.locator('#esAutoconsumoSi').check();
      await frame.getByRole('textbox', { name: 'Debe indicar el CAU' }).fill(datos.fichaTecnica.cau);
      await frame.locator('input[name="cau"], #cau').evaluate((el, cauVal) => {
        el.value = cauVal;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.dispatchEvent(new Event('blur', { bubbles: true }));
      }, datos.fichaTecnica.cau);
      page.once('dialog', dialog => dialog.dismiss().catch(() => { }));
      await frame.locator('#tipoConsumo1').check();
      await frame.locator('#modalidadConexionGeneracion1').check();
      await frame.locator('#modalidadAutoconsumo2').check();
    }

    await frame.getByRole('textbox', { name: 'Potencia instalada', exact: true }).fill(datos.fichaTecnica.potenciaInstalada);

    // --- ALMACENAMIENTO (ACUMULACIÓN) ---
    console.log('   -> Marcando disponibilidad de almacenamiento...');
    if (datos.fichaTecnica.acumulacion) {
      await frame.locator('#disponibleAcumulacionSi').click({ force: true });
      await frame.getByRole('textbox', { name: 'Debe indicar la potencia' }).fill(datos.fichaTecnica.potenciaAcumulacion);
      await frame.getByRole('textbox', { name: 'Debe indicar la energía má' }).fill(datos.fichaTecnica.energiaMaximaAlmacenada || '12345');
    } else {
      await frame.locator('#disponibleAcumulacionNo').click({ force: true });
    }

    await frame.getByRole('textbox', { name: 'Debe introducir el nombre de la empresa instaladora' }).fill(datos.fichaTecnica.empresaInstaladora);
    await frame.locator('select[name="documentoIdentEmpresaInstaladora"]').selectOption(datos.fichaTecnica.empresaInstaladoraDocTipo);
    await frame.getByRole('textbox', { name: 'Debe introducir un NIF/CIF/' }).fill(datos.fichaTecnica.empresaInstaladoraDoc);
    await frame.getByRole('textbox', { name: 'Debe introducir el nombre de la empresa distribuidora' }).fill(datos.fichaTecnica.empresaDistribuidora);
    await frame.locator('li:nth-child(5) > div > ul > li > .bloqueGrupo > .elemento_checkbox > .radio').first().check();

    page.on('dialog', async d => {
      console.log('   [!] Diálogo:', d.message());
      await d.accept().catch(() => { });
    });

    await frame.getByRole('img', { name: 'Guardar' }).click();
    await page.waitForTimeout(4000);

    console.log('   -> Regresando a Pestaña 3 (Documentación)...');
    try {
      const btnVolver = frame.locator('input[value="Volver"], button:has-text("Volver"), img[alt*="Volver"]');
      if (await btnVolver.count() > 0) await btnVolver.first().click();
      await page.waitForTimeout(1000);
      await page.evaluate(() => document.querySelector('#parteCentralPestana3')?.click());
      await page.waitForTimeout(2000);
    } catch (e) { console.log('   [!] Error volviendo a pestaña 3:', e.message); }

    console.log('\n[X/X] Iniciando FASE 4: Subida de Documentos (Persistencia Forzada)...');

    // Función de búsqueda dinámica incluida en el bundle
    const fs = require('fs');
    const path = require('path');
    const buscarArchivo = (p) => {
      const dir = path.join(__dirname, '..', 'subir_archivos');
      const archivos = fs.readdirSync(dir);
      const f = archivos.find(x => x.startsWith(p));
      return f ? path.join(dir, f) : null;
    };

    const subirDoc = async (sel, pref) => {
      const ruta = buscarArchivo(pref);
      if (!ruta) return console.log(`   [!] No hay archivo "${pref}" en subir_archivos/`);
      console.log(`   -> Subiendo: ${path.basename(ruta)}`);

      try {
        const pPromise = page.waitForEvent('popup');
        await (typeof sel === 'string' ? frame.locator(sel) : sel).click();
        const p = await pPromise;
        await p.waitForLoadState('networkidle');

        const fChooserPromise = p.waitForEvent('filechooser');
        await p.getByRole('button', { name: 'Choose File' }).click();
        const fChooser = await fChooserPromise;
        await fChooser.setFiles(ruta);

        await p.evaluate(() => {
          const i = document.querySelector('input[type="file"]');
          if (i) {
            i.dispatchEvent(new Event('change', { bubbles: true }));
            i.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
        await page.waitForTimeout(2000);

        p.on('dialog', d => { console.log('      [!] Popup:', d.message()); d.accept().catch(() => { }); });
        await p.getByRole('img', { name: 'Guardar' }).click();
        await page.waitForTimeout(3000);
        if (!p.isClosed()) await p.close();
      } catch (e) { console.log('      [!] Error:', e.message); }
    };

    await subirDoc(frame.getByRole('img', { name: 'Adjuntar Documento' }).nth(3), '1.-');
    await subirDoc(frame.getByRole('img', { name: 'Adjuntar Documento' }).nth(4), '9.-');
    await frame.getByText('7 Certificado de adecuación').click();
    await subirDoc(frame.locator('li:nth-child(8) > .bloqueGrupo > .elemento_checkbox > img'), '7.-');

    // ==========================================
    // [SECCIÓN 10] FASE 5: PUNTO DE SUMINISTRO (Popup Nuevo Usuario)
    // ==========================================
    console.log('\n[X/X] Iniciando FASE 5: Punto de Suministro (Nuevo Usuario)...');

    const popupUserPromise = page.waitForEvent('popup');
    await frame.getByRole('button', { name: 'Nuevo Usuario' }).click();
    const popupUser = await popupUserPromise;
    await popupUser.waitForLoadState('networkidle');

    console.log('   -> Rellenando Datos del Titular del Punto (en Popup)...');
    await popupUser.getByRole('textbox', { name: 'Debe introducir el primer' }).fill(datos.apellido1);
    await popupUser.getByRole('textbox', { name: 'Introduzca el segundo apellido' }).fill(datos.apellido2);
    await popupUser.getByRole('textbox', { name: 'Debe introducir el nombre' }).fill(datos.nombre);
    await popupUser.locator('#identificacionTitularPuntoSuministro').selectOption(datos.tipoDocumento);
    await popupUser.getByRole('textbox', { name: 'Debe introducir un NIF/CIF/' }).fill(datos.nif);

    console.log('   -> Rellenando Domicilio del Titular del Punto...');
    await popupUser.locator('#codigoTipoViaDomicilioTitularPuntoSuministro').selectOption(datos.tipoVia);
    await popupUser.locator('#nombreDomicilioTitularPuntoSuministro').fill(datos.nombreVia);
    await popupUser.locator('#tipoNumeracionTitularPuntoSuministro').selectOption(datos.tipoNumeracion);
    await popupUser.locator('#numeroDomicilioTitularPuntoSuministro').fill(datos.numero);
    if (datos.calificador) await popupUser.locator('#calificadorNumeroTitularPuntoSuministro').fill(datos.calificador);
    if (datos.bloque) await popupUser.locator('#bloqueTitularPuntoSuministro').fill(datos.bloque);
    if (datos.escalera) await popupUser.locator('#escaleraDomicilioTitularPuntoSuministro').fill(datos.escalera);
    if (datos.piso) await popupUser.locator('#pisoDomicilioTitularPuntoSuministro').fill(datos.piso);
    if (datos.puerta) await popupUser.locator('#puertaDomicilioTitularPuntoSuministro').fill(datos.puerta);
    await popupUser.locator('#margen').selectOption(datos.margen);
    await popupUser.locator('#codigoProvinciaDomicilioTitularPuntoSuministro').selectOption(PROVINCIAS[provNorm] || datos.delegacion);

    // Buscador Municipio Titular Punto
    console.log('   -> Buscando municipio para titular del punto...');
    const popMunTitPromise = popupUser.waitForEvent('popup');
    await popupUser.getByRole('group', { name: 'Datos titular del punto de' }).getByRole('img').click();
    const popMunTit = await popMunTitPromise;
    await popMunTit.waitForLoadState('networkidle');
    await popMunTit.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre);
    await popMunTit.getByRole('img', { name: 'Buscar Municipio' }).click();
    await popMunTit.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click();

    await popupUser.locator('#codigoPostalDomicilioTitularPuntoSuministro').fill(datos.codigoPostal);
    await popupUser.getByRole('textbox', { name: 'Introduzca el teléfono' }).fill(datos.telefono);
    await popupUser.getByRole('textbox', { name: 'Introduzca el email' }).fill(datos.email);

    // Domicilio Punto (mismos datos)
    await popupUser.locator('#codigoTipoViaDomicilioDatosPuntoSuministro').selectOption(datos.tipoVia);
    await popupUser.locator('#nombreDomicilioDatosPuntoSuministro').fill(datos.nombreVia);
    await popupUser.locator('#tipoNumeracionDatosPuntoSuministro').selectOption(datos.tipoNumeracion);
    await popupUser.locator('#numeroDomicilioDatosPuntoSuministro').fill(datos.numero);
    if (datos.calificador) await popupUser.locator('#calificadorNumeroDatosPuntoSuministro').fill(datos.calificador);
    if (datos.bloque) await popupUser.locator('#bloqueDatosPuntoSuministro').fill(datos.bloque);
    if (datos.escalera) await popupUser.locator('#escaleraDomicilioDatosPuntoSuministro').fill(datos.escalera);
    if (datos.piso) await popupUser.locator('#pisoDomicilioDatosPuntoSuministro').fill(datos.piso);
    if (datos.puerta) await popupUser.locator('#puertaDomicilioDatosPuntoSuministro').fill(datos.puerta);
    await popupUser.locator('#codigoProvinciaDomicilioDatosPuntoSuministro').selectOption(PROVINCIAS[provNorm] || datos.delegacion);

    // Buscador Municipio Punto
    const popMunPuntoPromise = popupUser.waitForEvent('popup');
    await popupUser.getByRole('group', { name: 'Datos del punto de suministro' }).getByRole('img').click();
    const popMunPunto = await popMunPuntoPromise;
    await popMunPunto.waitForLoadState('networkidle');
    await popMunPunto.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre);
    await popMunPunto.getByRole('img', { name: 'Buscar Municipio' }).click();
    await popMunPunto.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click();

    await popupUser.locator('#codigoPostalDomicilioDatosPuntoSuministro').fill(datos.codigoPostal);

    console.log('   -> Rellenando Datos Técnicos del Suministro (CUPS con Persistencia)...');
    await popupUser.getByRole('textbox', { name: 'Debe indicar el CUPS del' }).fill(datos.fichaTecnica.cups);
    await popupUser.locator('#cupsPuntoSuministro').evaluate((el, cupsVal) => {
      el.value = cupsVal;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.dispatchEvent(new Event('blur', { bubbles: true }));
    }, datos.fichaTecnica.cups);

    // Mapeo de tensión: 230 -> 0,4 (según codegen)
    const tensionMapeada = datos.fichaTecnica.tension === '230' ? '0,4' : datos.fichaTecnica.tension;
    await popupUser.locator('#tensionPuntoSuministro').selectOption(tensionMapeada);

    await popupUser.locator('#codigoPostalDomicilioDatosPuntoSuministro').fill(datos.codigoPostal);

    console.log('   -> Aceptando popup Nuevo Usuario...');
    await popupUser.getByRole('button', { name: 'Aceptar' }).click();
    await page.waitForTimeout(2000);

    // ==========================================
    // [SECCIÓN 11] FINALIZACIÓN: GUARDAR Y PRESENTAR
    // ==========================================
    console.log('\n[X/X] Iniciando FINALIZACIÓN: Guardar y Presentar...');

    // Aseguramos manejadores de diálogos para los pasos finales
    page.on('dialog', async d => {
      console.log('   [!] Diálogo Final:', d.message());
      await d.accept().catch(() => { });
    });

    await frame.getByRole('img', { name: 'Guardar' }).click();
    await page.waitForTimeout(3000);

    console.log('   -> Click en Presentar (v1)...');
    await frame.getByRole('img', { name: 'Presentar' }).click();
    await page.waitForTimeout(2000);

    console.log('   -> Click en Presentar (v2 confirmación)...');
    await frame.getByRole('img', { name: 'Presentar' }).click();

    console.log('\n✅ PROCESO COMPLETADO CON ÉXITO.');
    await page.pause();

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    // browser.close();
  }
})();
