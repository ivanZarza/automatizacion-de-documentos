import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

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
 * Trasplante 1:1 de la lógica experta del usuario.
 */
export const runJuntaAutomation = async (payload) => {
  const datos = payload.datos;
  const formData = payload.flatFormData;
  console.log('--- Iniciando Automatización Junta de Andalucía (Modo Trasplante Exacto) ---')

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false
  })
  const context = await browser.newContext()
  const page = await context.newPage()

  // Helper para buscar archivos en la carpeta de documentos del cliente
  const buscarArchivo = (prefijo) => {
    // Busca en la carpeta del cliente o cae a Ivan Zarza Estevez para la prueba
    const dir = path.join(process.cwd(), formData?.apellidosNombre || 'Ivan Zarza Estevez')
    if (!fs.existsSync(dir)) {
      console.log(`[!] Carpeta de cliente no encontrada: ${dir}`)
      return null
    }
    const archivos = fs.readdirSync(dir)
    const encontrado = archivos.find(x => x.startsWith(prefijo))
    return encontrado ? path.join(dir, encontrado) : null
  }

  // Helper para subir documentos en popups
  const subirDoc = async (frame, selector, prefijo) => {
    const ruta = buscarArchivo(prefijo)
    const dirName = formData?.apellidosNombre || 'Ivan Zarza Estevez'
    if (!ruta) {
      console.log(`   [!] Archivo con prefijo "${prefijo}" no encontrado en la carpeta /${dirName}`)
      return
    }
    console.log(`   -> Subiendo: ${path.basename(ruta)}`)
    try {
      const popupPromise = page.waitForEvent('popup')
      await (typeof selector === 'string' ? frame.locator(selector) : selector).click()
      const popup = await popupPromise
      await popup.waitForLoadState('networkidle')

      const fileChooserPromise = popup.waitForEvent('filechooser')
      await popup.getByRole('button', { name: 'Choose File' }).click()
      const fileChooser = await fileChooserPromise
      await fileChooser.setFiles(ruta)

      await popup.evaluate(() => {
        const input = document.querySelector('input[type="file"]')
        if (input) {
          input.dispatchEvent(new Event('change', { bubbles: true }))
          input.dispatchEvent(new Event('input', { bubbles: true }))
        }
      })
      await page.waitForTimeout(2000)

      popup.on('dialog', d => {
        console.log('      [!] Popup Documento:', d.message())
        d.accept().catch(() => { })
      })

      await popup.getByRole('img', { name: 'Guardar' }).click()
      await page.waitForTimeout(3000)
      if (!popup.isClosed()) await popup.close()
    } catch (e) {
      console.error(`      [!] Error subiendo documento ${prefijo}:`, e.message)
      try {
        await page.screenshot({ path: `/home/ivan/.gemini/antigravity/brain/3ef04538-e82d-4b86-a43d-2e9fa66282ec/debug_popup_${prefijo.replace('.-', '')}.png`, fullPage: true })
        console.log(`      [i] Pantallazo de error guardado en artifacts como debug_popup_${prefijo.replace('.-', '')}.png`)
      } catch (screenshotError) {
        console.error('      [!] No se pudo tomar pantallazo:', screenshotError.message)
      }
    }
  }

  try {
    // FASE 1: NAVEGACIÓN Y ACCESO
    console.log('[1/5] Navegando a la Bienvenida...')
    await page.goto('https://www.juntadeandalucia.es/empleoempresaycomercio/oficinavirtual/bienvenida.do')
    await page.getByRole('button', { name: 'Aceptar todas' }).click()
    await page.getByText('Habilitaciones').click()
    await page.locator('#acceso-2').getByTitle('Acceso sin certificado digital').click()
    await page.getByRole('link', { name: /Acceso a Comunicaciones/ }).click()
    await page.waitForSelector('select[name="codDelegacion"]')

    // SELECCIÓN DE DELEGACIÓN
    console.log('[1.5/5] Seleccionando delegación...')
    await page.locator('select[name="codDelegacion"]').selectOption(datos.delegacion || '41')

    // FASE 1: IDENTIFICACIÓN (Pestaña 1)
    console.log('[2/5] Rellenando datos de identificación...')
    await page.locator('select[name="identificacionInteresado"]').selectOption(datos.tipoDocumento || 'NIF')
    await page.locator('#nifInteresado').fill(datos.nif || '')

    // Debug: Ver opciones de sexo
    const options = await page.locator('select[name="sexoInteresado"]').evaluate(el =>
      Array.from(el.options).map(opt => ({ value: opt.value, text: opt.text }))
    )
    console.log('   -> Opciones sexoInteresado disponibles:', JSON.stringify(options))

    await page.locator('select[name="sexoInteresado"]').selectOption(datos.sexo || 'V')
    await page.locator('input[name="nombreInteresado"]').fill(datos.nombre || '')
    await page.locator('input[name="apellido1Interesado"]').fill(datos.apellido1 || '')
    await page.locator('input[name="apellido2Interesado"]').fill(datos.apellido2 || '')

    // FASE 1: DOMICILIO (Pestaña 1)
    console.log('[3/5] Rellenando domicilio...')
    await page.locator('select[name="codigoTipoViaDomicilioInteresado"]').selectOption(datos.tipoVia || 'CL')
    await page.getByRole('textbox', { name: 'Debe inroducir el nombre de' }).fill(datos.nombreVia || '')
    await page.locator('select[name="tipoNumeracionInteresado"]').selectOption(datos.tipoNumeracion || 'NUM')
    await page.locator('input[name="numeroDomicilioInteresado"]').fill(datos.numero || '')

    if (datos.calificador) await page.locator('input[name="calificadorNumeroInteresado"]').fill(datos.calificador)
    if (datos.bloque) await page.locator('input[name="bloqueInteresado"]').fill(datos.bloque)
    if (datos.escalera) await page.locator('input[name="escaleraDomicilioInteresado"]').fill(datos.escalera)
    if (datos.piso) await page.locator('input[name="pisoDomicilioInteresado"]').fill(datos.piso)
    if (datos.puerta) await page.locator('input[name="puertaDomicilioInteresado"]').fill(datos.puerta)

    // PROVINCIA Y MUNICIPIO (POPUP)
    const provRaw = datos.provincia || 'Sevilla'
    const provNorm = provRaw.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\b\w/g, c => c.toUpperCase())
    await page.locator('select[name="codigoProvinciaDomicilioInteresado"]').selectOption(PROVINCIAS[provNorm] || PROVINCIAS[provRaw] || provRaw)

    console.log('   -> Abriendo buscador de municipios...')
    const popMunPromise = page.waitForEvent('popup')
    await page.getByRole('group', { name: '1.1 Persona titular' }).getByRole('img').click()
    const popMun = await popMunPromise

    await popMun.waitForLoadState('networkidle')
    await popMun.waitForSelector('input[name="municipioBusqueda"]')
    await popMun.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre || '')
    await popMun.waitForTimeout(500)
    await popMun.getByRole('img', { name: 'Buscar Municipio' }).click()

    const munLink = popMun.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first()
    await munLink.waitFor({ state: 'visible' })
    await munLink.click()
    console.log('   -> Municipio seleccionado.')

    await page.locator('input[name="poblacion"]').fill(datos.poblacion || '')
    await page.locator('input[name="codigoPostalDomicilioInteresado"]').fill(datos.codigoPostal || '')

    // FASE 1: CONTACTO Y REPRESENTACIÓN
    console.log('[4/5] Rellenando datos de contacto...')
    if (datos.telefono) await page.locator('input[name="telefonoInteresado"]').fill(datos.telefono)
    if (datos.movil) await page.locator('input[name="movil"]').fill(datos.movil)

    // REPRESENTANTE LEGAL
    if (datos.conRepresentante) {
      console.log('   -> Rellenando Representante Legal...')
      await page.locator('select[name="identificacionRepresentante"]').selectOption(datos.representante.tipoDocumento || 'NIF')
      await page.locator('input[name="nifRepresentante"]').fill(datos.representante.nif || '')
      await page.locator('select[name="sexoRepresentante"]').selectOption(datos.representante.sexo || 'V')
      await page.locator('input[name="nombreRepresentante"]').fill(datos.representante.nombre || '')
      await page.locator('input[name="apellido1Representante"]').fill(datos.representante.apellido1 || '')
      await page.locator('input[name="apellido2Representante"]').fill(datos.representante.apellido2 || '')
    }

    // PERSONA AUTORIZADA
    if (datos.conPersonaAutorizada) {
      console.log('   -> Rellenando Persona Autorizada...')
      await page.locator('select[name="identificacionPersonaAutorizada"]').selectOption(datos.personaAutorizada.tipoDocumento || 'NIF')
      await page.locator('input[name="nifPersonaAutorizada"]').fill(datos.personaAutorizada.nif || '')
      await page.locator('select[name="sexoPersonaAutorizada"]').selectOption(datos.personaAutorizada.sexo || 'V')
      await page.locator('input[name="nombrePersonaAutorizada"]').fill(datos.personaAutorizada.nombre || '')
      await page.locator('input[name="apellido1PersonaAutorizada"]').fill(datos.personaAutorizada.apellido1 || '')
      await page.locator('input[name="apellido2PersonaAutorizada"]').fill(datos.personaAutorizada.apellido1 || '')
    }

    await page.getByRole('textbox', { name: 'Introduzca una dirección de' }).fill(datos.email || '').catch(() => { })

    // FASE 2: MODALIDADES
    console.log('[5/5] Iniciando FASE 2: Modalidades...')
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
        page.locator('#parteCentralPestana2').click()
      ])
    } catch (e) {
      await page.locator('#parteCentralPestana2').click()
    }
    await page.waitForTimeout(3000)

    const radioModalidad = page.getByRole('radio', { name: /Seleccione para crear una/i })
    await radioModalidad.waitFor({ state: 'visible' })
    await radioModalidad.check()
    await page.getByText('>>').click()
    await page.waitForTimeout(1000)

    // DATOS DEL TÉCNICO (Reusando persona autorizada si existe)
    if (datos.conPersonaAutorizada) {
      console.log('   -> Rellenando Datos del Técnico...')
      await page.locator('#tecnicoInstalador1').selectOption('TF')
      await page.locator('input[name="tecnicoInstalador1nombre"]').fill(datos.personaAutorizada.nombre)
      await page.locator('input[name="tecnicoInstalador1apellido1"]').fill(datos.personaAutorizada.apellido1)
      await page.locator('input[name="tecnicoInstalador1apellido2"]').fill(datos.personaAutorizada.apellido2)
      await page.locator('select[name="tecnicoInstalador1documento"]').selectOption(datos.personaAutorizada.tipoDocumento)
      await page.locator('#tecnicoInstalador1nif').fill(datos.personaAutorizada.nif)
    }

    // DATOS DEL ESTABLECIMIENTO
    console.log('   -> Pulsando en [Datos establecimiento]...')
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }).catch(() => console.log('      (Aviso: timeout en navegación de establecimiento)')),
        page.getByText('Datos establecimiento').click()
      ])
    } catch (e) {
      console.log('      (Reintentando clic en Datos establecimiento...)')
      await page.getByText('Datos establecimiento').click()
    }
    await page.waitForTimeout(3000)
    console.log('   -> Sección Datos Establecimiento cargada.')

    await page.locator('select[name="codigoTipoViaDomicilioEstablecimiento"]').selectOption(datos.tipoVia || 'CL')
    await page.locator('input[name="nombreDomicilioEstablecimiento"]').fill(datos.nombreVia || '')
    await page.locator('select[name="tipoNumeracionEstablecimiento"]').selectOption(datos.tipoNumeracion || 'NUM')
    await page.locator('input[name="numeroDomicilioEstablecimiento"]').fill(datos.numero || '')

    if (datos.calificador) await page.locator('input[name="calificadorNumeroEstablecimiento"]').fill(datos.calificador)
    if (datos.bloque) await page.locator('input[name="bloqueEstablecimiento"]').fill(datos.bloque)
    if (datos.escalera) await page.locator('input[name="escaleraDomicilioEstablecimiento"]').fill(datos.escalera)
    if (datos.piso) await page.locator('input[name="pisoDomicilioEstablecimiento"]').fill(datos.piso)
    if (datos.puerta) await page.locator('input[name="puertaDomicilioEstablecimiento"]').fill(datos.puerta)
    if (datos.margen) await page.locator('select[name="margenEstablecimiento"]').selectOption(datos.margen)

    // Buscador Municipio Establecimiento
    const popEstPromise = page.waitForEvent('popup')
    await page.getByRole('group', { name: 'Cumplimentar sólo en el caso' }).getByRole('img').click()
    const popEst = await popEstPromise
    await popEst.waitForLoadState('networkidle')
    await popEst.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre || '')
    await popEst.getByRole('img', { name: 'Buscar Municipio' }).click()
    await popEst.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click()

    await page.locator('input[name="poblacionEstablecimiento"]').fill(datos.poblacion || '')
    await page.locator('input[name="codigoPostalDomicilioEstablecimiento"]').fill(datos.codigoPostal || '')
    await page.locator('input[name="telefonoEstablecimiento"]').fill(datos.telefono || '')
    await page.locator('input[name="movilEstablecimiento"]').fill(datos.movil || '')
    await page.locator('input[name="emailEstablecimiento"]').fill(datos.email || '')

    // FASE 3: OTROS DATOS Y FICHA TÉCNICA
    console.log('\n[X/X] Iniciando FASE 3: Otros datos y Ficha Técnica...')
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
        page.getByText('Otros datos', { exact: true }).click()
      ])
    } catch (e) {
      await page.getByText('Otros datos', { exact: true }).click()
    }
    await page.waitForTimeout(3000)

    // CCAA e Instalación
    const ccaaLoc = page.locator('select[name="codigoComunidadAutonoma"]')
    if (await ccaaLoc.count() > 0) {
      await ccaaLoc.selectOption(datos.codigoComunidadAutonoma || '01')
    }
    await page.waitForTimeout(2000)

    await page.locator('select[name="otrosDatos75codigo"]').selectOption(datos.otrosDatos75codigo || '').catch(() => { })
    await page.waitForTimeout(2000)

    const numEmpLoc = page.getByRole('textbox', { name: 'Debe introducir el número de' })
    if (await numEmpLoc.count() > 0) {
      await numEmpLoc.fill(datos.otrosDatosNumero || '')
    }
    await page.waitForTimeout(5000)

    // Radios obligatorios (Vehículos, estaciones de servicio, instalaciones existentes)
    console.log('   -> Radio otrosDatos72=N (Instalaciones en servicio antes RITE)...')
    await page.locator('input[name="otrosDatos72"][value="N"]').click().catch(() => { })
    await page.waitForTimeout(1000)

    console.log('   -> Radio otrosDatos73=N (Infraestructura de recarga VE)...')
    await page.locator('input[name="otrosDatos73"][value="N"]').click().catch(() => { })
    await page.waitForTimeout(1000)

    console.log('   -> Radio otrosDatos741=S (C3.1 - Locales)...')
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 8000 }),
        page.locator('input[name="otrosDatos741"][value="S"]').click()
      ])
    } catch (e) {
      await page.locator('input[name="otrosDatos741"][value="S"]').click().catch(() => { })
    }
    await page.waitForTimeout(2000)

    // Check 7.1
    await page.getByRole('checkbox').first().check().catch(() => { })
    await page.waitForTimeout(2000)

    // FICHA TÉCNICA (IFRAME)
    console.log('   -> Entrando en la Ficha Técnica...')
    await page.locator('#parteCentralPestana4').click()
    await page.locator('li:nth-child(19) > #bloque2 > .checkbox').click()
    await page.waitForTimeout(1000)
    await page.getByText('>>').click()
    await page.waitForTimeout(2000)
    await page.getByRole('link', { name: 'Eléctricas de baja tensión' }).click()

    const iframeLocator = page.locator('#ficha')
    await iframeLocator.waitFor({ state: 'visible' })
    const frame = iframeLocator.contentFrame()

    await frame.getByRole('button', { name: 'Continuar' }).click()
    await frame.getByRole('textbox', { name: 'Debe indicar Potencia' }).fill(datos.fichaTecnica.potencia || '')
    await frame.getByRole('textbox', { name: 'Debe introducir el uso al que' }).fill(datos.fichaTecnica.uso || 'vivienda')
    await frame.locator('select[name="tipoSuministro"]').selectOption(datos.fichaTecnica.tipoSuministro || 'Monofásico')
    await frame.getByRole('textbox', { name: 'Debe indicar la tensión de' }).fill(datos.fichaTecnica.tension || '230')

    if (datos.fichaTecnica.esAutoconsumo) {
      await frame.locator('#esAutoconsumoSi').check()
      await frame.getByRole('textbox', { name: 'Debe indicar el CAU' }).fill(datos.fichaTecnica.cau || '')
      await frame.locator('#tipoConsumo1').check()
      await frame.locator('#modalidadConexionGeneracion1').check()
      await frame.locator('#modalidadAutoconsumo2').check()
    }

    await frame.getByRole('textbox', { name: 'Potencia instalada', exact: true }).fill(datos.fichaTecnica.potenciaInstalada || '')

    // ACUMULACIÓN
    if (datos.fichaTecnica.acumulacion) {
      await frame.locator('#disponibleAcumulacionSi').click({ force: true })
      await frame.getByRole('textbox', { name: 'Debe indicar la potencia' }).fill(datos.fichaTecnica.potenciaAcumulacion || '')
      await frame.getByRole('textbox', { name: 'Debe indicar la energía má' }).fill(datos.fichaTecnica.energiaMaximaAlmacenada || '')
    } else {
      await frame.locator('#disponibleAcumulacionNo').click({ force: true })
    }

    await frame.getByRole('textbox', { name: 'Debe introducir el nombre de la empresa instaladora' }).fill(datos.fichaTecnica.empresaInstaladora || '')
    await frame.locator('select[name="documentoIdentEmpresaInstaladora"]').selectOption(datos.fichaTecnica.empresaInstaladoraDocTipo || 'CIF')
    await frame.getByRole('textbox', { name: 'Debe introducir un NIF/CIF/' }).fill(datos.fichaTecnica.empresaInstaladoraDoc || '')
    await frame.getByRole('textbox', { name: 'Debe introducir el nombre de la empresa distribuidora' }).fill(datos.fichaTecnica.empresaDistribuidora || '')

    // Seleccionar tipo de instalación
    console.log('   -> Marcando tipo de instalación (radio correcto codegen)...')
    await frame.locator('li:nth-child(5) > div > ul > li > .bloqueGrupo > .elemento_checkbox > .radio').first().check().catch(() => { })
    await page.waitForTimeout(2000)

    // GUARDAR FICHA
    page.on('dialog', async d => { d.accept().catch(() => { }) })
    await frame.getByRole('img', { name: 'Guardar' }).click()
    await page.waitForTimeout(4000)

    // VOLVER A DOCUMENTACIÓN
    const btnVolver = frame.locator('input[value="Volver"]')
    if (await btnVolver.count() > 0) await btnVolver.click()
    await page.waitForTimeout(1000)
    await page.evaluate(() => document.querySelector('#parteCentralPestana3')?.click())
    await page.waitForTimeout(2000)

    // FASE 4: SUBIDA DE DOCUMENTOS
    console.log('\n[X/X] Iniciando FASE 4: Subida de Documentos...')
    await subirDoc(frame, frame.getByRole('img', { name: 'Adjuntar Documento' }).nth(3), '1.-')
    await subirDoc(frame, frame.getByRole('img', { name: 'Adjuntar Documento' }).nth(4), '2.-')
    await frame.getByText('7 Certificado de adecuación').click().catch(() => { })
    await subirDoc(frame, frame.locator('li:nth-child(8) > .bloqueGrupo > .elemento_checkbox > img'), '7.-')

    // FASE 5: NUEVO USUARIO (SUMINISTRO)
    console.log('\n[X/X] Iniciando FASE 5: Punto de Suministro (Nuevo Usuario)...')
    await page.waitForTimeout(2000)
    const popUserPromise = page.waitForEvent('popup')
    await frame.getByRole('button', { name: 'Nuevo Usuario' }).click()
    const popUser = await popUserPromise
    await popUser.waitForLoadState('networkidle')

    await popUser.getByRole('textbox', { name: 'Debe introducir el primer' }).fill(datos.apellido1 || '')
    await popUser.getByRole('textbox', { name: 'Introduzca el segundo apellido' }).fill(datos.apellido2 || '')
    await popUser.getByRole('textbox', { name: 'Debe introducir el nombre' }).fill(datos.nombre || '')
    await popUser.locator('#identificacionTitularPuntoSuministro').selectOption(datos.tipoDocumento || 'NIF')
    await popUser.getByRole('textbox', { name: 'Debe introducir un NIF/CIF/' }).fill(datos.nif || '')

    await popUser.locator('#codigoTipoViaDomicilioTitularPuntoSuministro').selectOption(datos.tipoVia || 'CL')
    await popUser.locator('#nombreDomicilioTitularPuntoSuministro').fill(datos.nombreVia || '')
    await popUser.locator('#tipoNumeracionTitularPuntoSuministro').selectOption(datos.tipoNumeracion || 'NUM')
    await popUser.locator('#numeroDomicilioTitularPuntoSuministro').fill(datos.numero || '')
    await popUser.locator('#codigoProvinciaDomicilioTitularPuntoSuministro').selectOption(PROVINCIAS[provNorm] || datos.delegacion)

    // Buscador Municipio Suministro
    const popMunUserPromise = popUser.waitForEvent('popup')
    await popUser.getByRole('group', { name: 'Datos titular del punto de' }).getByRole('img').click()
    const popMunUser = await popMunUserPromise
    await popMunUser.waitForLoadState('networkidle')
    await popMunUser.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre || '')
    await popMunUser.getByRole('img', { name: 'Buscar Municipio' }).click()
    await popMunUser.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click()

    await popUser.locator('#codigoPostalDomicilioTitularPuntoSuministro').fill(datos.codigoPostal || '')
    await popUser.getByRole('textbox', { name: 'Introduzca el teléfono' }).fill(datos.telefono || '')
    await popUser.getByRole('textbox', { name: 'Introduzca el email' }).fill(datos.email || '')

    // Datos del punto (reusando)
    await popUser.locator('#codigoTipoViaDomicilioDatosPuntoSuministro').selectOption(datos.tipoVia || 'CL')
    await popUser.locator('#nombreDomicilioDatosPuntoSuministro').fill(datos.nombreVia || '')
    await popUser.locator('#tipoNumeracionDatosPuntoSuministro').selectOption(datos.tipoNumeracion || 'NUM')
    await popUser.locator('#numeroDomicilioDatosPuntoSuministro').fill(datos.numero || '')
    await popUser.locator('#codigoProvinciaDomicilioDatosPuntoSuministro').selectOption(PROVINCIAS[provNorm] || datos.delegacion)

    const popMunPuntoPromise = popUser.waitForEvent('popup')
    await popUser.getByRole('group', { name: 'Datos del punto de suministro' }).getByRole('img').click()
    const popMunPunto = await popMunPuntoPromise
    await popMunPunto.waitForLoadState('networkidle')
    await popMunPunto.locator('input[name="municipioBusqueda"]').fill(datos.municipioNombre || '')
    await popMunPunto.getByRole('img', { name: 'Buscar Municipio' }).click()
    await popMunPunto.getByRole('link', { name: new RegExp(datos.municipioNombre, 'i') }).first().click()

    await popUser.locator('#codigoPostalDomicilioDatosPuntoSuministro').fill(datos.codigoPostal || '')
    await popUser.getByRole('textbox', { name: 'Debe indicar el CUPS del' }).fill(datos.fichaTecnica.cups || '')

    const tensionMap = datos.fichaTecnica.tension === '230' ? '0,4' : datos.fichaTecnica.tension
    await popUser.locator('#tensionPuntoSuministro').selectOption(tensionMap)

    await popUser.getByRole('button', { name: 'Aceptar' }).click()
    await page.waitForTimeout(2000)

    // FINALIZACIÓN
    console.log('\n[X/X] Iniciando FINALIZACIÓN: Guardar y Presentar...')

    const capaFondo = page.locator('#capa_fondo')

    await frame.getByRole('img', { name: 'Guardar' }).click()
    console.log('   -> Guardando... Esperando a que desaparezca la capa de carga.')

    if (await capaFondo.count() > 0) {
      await capaFondo.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => { })
    }
    await page.waitForTimeout(3000)

    console.log('   -> Pulsando Presentar...')
    await frame.getByRole('img', { name: 'Presentar' }).click({ force: true })

    if (await capaFondo.count() > 0) {
      await capaFondo.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => { })
    }
    await page.waitForTimeout(2000)

    console.log('   -> Confirmando Presentar...')
    await frame.getByRole('img', { name: 'Presentar' }).click({ force: true }).catch(() => { })

    console.log('🛑 PARADA: Revisa todos los datos en el navegador...')
    console.log('   -> Pulsa "Resume" en el cajetín de Playwright Inspector para finalizar y cerrar.')
    await page.pause()

    console.log('✅ ¡Proceso de automatización finalizado correctamente!')
    return { success: true }

  } catch (error) {
    console.error('❌ Error en el proceso de automatización:', error.message)
    throw error
  } finally {
    // browser.close()
  }
}
