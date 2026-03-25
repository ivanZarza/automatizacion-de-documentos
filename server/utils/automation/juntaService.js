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
export const runJuntaAutomation = async (formData) => {
  console.log('--- Iniciando Automatización Junta de Andalucía (Modo Trasplante Exacto) ---')

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false
  })
  const context = await browser.newContext()
  const page = await context.newPage()

  // Helper para buscar archivos en la carpeta de documentos
  const buscarArchivo = (prefijo) => {
    const dir = path.join(process.cwd(), 'documentos')
    if (!fs.existsSync(dir)) return null
    const archivos = fs.readdirSync(dir)
    const encontrado = archivos.find(x => x.startsWith(prefijo))
    return encontrado ? path.join(dir, encontrado) : null
  }

  // Helper para subir documentos en popups
  const subirDoc = async (frame, selector, prefijo) => {
    const ruta = buscarArchivo(prefijo)
    if (!ruta) {
      console.log(`   [!] Archivo con prefijo "${prefijo}" no encontrado en /documentos`)
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
    await page.locator('select[name="codDelegacion"]').selectOption(formData.cod_delegacion || '41')

    // FASE 1: IDENTIFICACIÓN (Pestaña 1)
    console.log('[2/5] Rellenando datos de identificación...')
    await page.locator('select[name="identificacionInteresado"]').selectOption(formData.tipo_documento_presentador || 'NIF')
    await page.locator('#nifInteresado').fill(formData.nif_presentador || '')

    // Debug: Ver opciones de sexo
    const options = await page.locator('select[name="sexoInteresado"]').evaluate(el =>
      Array.from(el.options).map(opt => ({ value: opt.value, text: opt.text }))
    )
    console.log('   -> Opciones sexoInteresado disponibles:', JSON.stringify(options))

    await page.locator('select[name="sexoInteresado"]').selectOption(formData.sexo_presentador || 'V')
    await page.locator('input[name="nombreInteresado"]').fill(formData.nombre_presentador || '')
    await page.locator('input[name="apellido1Interesado"]').fill(formData.apellido1_presentador || '')
    await page.locator('input[name="apellido2Interesado"]').fill(formData.apellido2_presentador || '')

    // FASE 1: DOMICILIO (Pestaña 1)
    console.log('[3/5] Rellenando domicilio...')
    await page.locator('select[name="codigoTipoViaDomicilioInteresado"]').selectOption(formData.tipo_via_presentador || 'CL')
    await page.getByRole('textbox', { name: 'Debe inroducir el nombre de' }).fill(formData.nombre_via_presentador || '')
    await page.locator('select[name="tipoNumeracionInteresado"]').selectOption(formData.tipo_numeracion_presentador || 'NUM')
    await page.locator('input[name="numeroDomicilioInteresado"]').fill(formData.numero_presentador || '')

    if (formData.calificador_numero_presentador) await page.locator('input[name="calificadorNumeroInteresado"]').fill(formData.calificador_numero_presentador)
    if (formData.bloque_presentador) await page.locator('input[name="bloqueInteresado"]').fill(formData.bloque_presentador)
    if (formData.escalera_presentador) await page.locator('input[name="escaleraDomicilioInteresado"]').fill(formData.escalera_presentador)
    if (formData.piso_presentador) await page.locator('input[name="pisoDomicilioInteresado"]').fill(formData.piso_presentador)
    if (formData.puerta_presentador) await page.locator('input[name="puertaDomicilioInteresado"]').fill(formData.puerta_presentador)

    // PROVINCIA Y MUNICIPIO (POPUP)
    const provRaw = formData.provincia_presentador || 'Sevilla'
    const provNorm = provRaw.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\b\w/g, c => c.toUpperCase())
    await page.locator('select[name="codigoProvinciaDomicilioInteresado"]').selectOption(PROVINCIAS[provNorm] || PROVINCIAS[provRaw] || provRaw)

    console.log('   -> Abriendo buscador de municipios...')
    const popMunPromise = page.waitForEvent('popup')
    await page.getByRole('group', { name: '1.1 Persona titular' }).getByRole('img').click()
    const popMun = await popMunPromise

    await popMun.waitForLoadState('networkidle')
    await popMun.waitForSelector('input[name="municipioBusqueda"]')
    await popMun.locator('input[name="municipioBusqueda"]').fill(formData.municipio_presentador || '')
    await popMun.waitForTimeout(500)
    await popMun.getByRole('img', { name: 'Buscar Municipio' }).click()

    const munLink = popMun.getByRole('link', { name: new RegExp(formData.municipio_presentador, 'i') }).first()
    await munLink.waitFor({ state: 'visible' })
    await munLink.click()
    console.log('   -> Municipio seleccionado.')

    await page.locator('input[name="poblacion"]').fill(formData.poblacion_presentador || '')
    await page.locator('input[name="codigoPostalDomicilioInteresado"]').fill(formData.cp_presentador || '')

    // FASE 1: CONTACTO Y REPRESENTACIÓN
    console.log('[4/5] Rellenando datos de contacto...')
    if (formData.telefono_presentador) await page.locator('input[name="telefonoInteresado"]').fill(formData.telefono_presentador)
    if (formData.movil_presentador) await page.locator('input[name="movil"]').fill(formData.movil_presentador)

    // REPRESENTANTE LEGAL
    if (formData.con_representante_legal) {
      console.log('   -> Rellenando Representante Legal...')
      await page.locator('select[name="identificacionRepresentante"]').selectOption(formData.rep_leg_tipo_documento || 'NIF')
      await page.locator('input[name="nifRepresentante"]').fill(formData.rep_leg_nif || '')
      await page.locator('select[name="sexoRepresentante"]').selectOption(formData.rep_leg_sexo || 'V')
      await page.locator('input[name="nombreRepresentante"]').fill(formData.rep_leg_nombre || '')
      await page.locator('input[name="apellido1Representante"]').fill(formData.rep_leg_apellido1 || '')
      await page.locator('input[name="apellido2Representante"]').fill(formData.rep_leg_apellido2 || '')
    }

    // PERSONA AUTORIZADA
    if (formData.con_persona_autorizada) {
      console.log('   -> Rellenando Persona Autorizada...')
      await page.locator('select[name="identificacionPersonaAutorizada"]').selectOption(formData.per_aut_tipo_documento || 'NIF')
      await page.locator('input[name="nifPersonaAutorizada"]').fill(formData.per_aut_nif || '')
      await page.locator('select[name="sexoPersonaAutorizada"]').selectOption(formData.per_aut_sexo || 'V')
      await page.locator('input[name="nombrePersonaAutorizada"]').fill(formData.per_aut_nombre || '')
      await page.locator('input[name="apellido1PersonaAutorizada"]').fill(formData.per_aut_apellido1 || '')
      await page.locator('input[name="apellido2PersonaAutorizada"]').fill(formData.per_aut_apellido1 || '')
    }

    await page.getByRole('textbox', { name: 'Introduzca una dirección de' }).fill(formData.email_presentador || '').catch(() => { })

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
    if (formData.con_persona_autorizada) {
      console.log('   -> Rellenando Datos del Técnico...')
      await page.locator('#tecnicoInstalador1').selectOption('TF')
      await page.locator('input[name="tecnicoInstalador1nombre"]').fill(formData.per_aut_nombre)
      await page.locator('input[name="tecnicoInstalador1apellido1"]').fill(formData.per_aut_apellido1)
      await page.locator('input[name="tecnicoInstalador1apellido2"]').fill(formData.per_aut_apellido2)
      await page.locator('select[name="tecnicoInstalador1documento"]').selectOption(formData.per_aut_tipo_documento)
      await page.locator('#tecnicoInstalador1nif').fill(formData.per_aut_nif)
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

    await page.locator('select[name="codigoTipoViaDomicilioEstablecimiento"]').selectOption(formData.tipo_via_presentador || 'CL')
    await page.locator('input[name="nombreDomicilioEstablecimiento"]').fill(formData.nombre_via_presentador || '')
    await page.locator('select[name="tipoNumeracionEstablecimiento"]').selectOption(formData.tipo_numeracion_presentador || 'NUM')
    await page.locator('input[name="numeroDomicilioEstablecimiento"]').fill(formData.numero_presentador || '')

    if (formData.calificador_numero_presentador) await page.locator('input[name="calificadorNumeroEstablecimiento"]').fill(formData.calificador_numero_presentador)
    if (formData.bloque_presentador) await page.locator('input[name="bloqueEstablecimiento"]').fill(formData.bloque_presentador)
    if (formData.escalera_presentador) await page.locator('input[name="escaleraDomicilioEstablecimiento"]').fill(formData.escalera_presentador)
    if (formData.piso_presentador) await page.locator('input[name="pisoDomicilioEstablecimiento"]').fill(formData.piso_presentador)
    if (formData.puerta_presentador) await page.locator('input[name="puertaDomicilioEstablecimiento"]').fill(formData.puerta_presentador)
    if (formData.margen_presentador) await page.locator('select[name="margenEstablecimiento"]').selectOption(formData.margen_presentador)

    // Buscador Municipio Establecimiento
    const popEstPromise = page.waitForEvent('popup')
    await page.getByRole('group', { name: 'Cumplimentar sólo en el caso' }).getByRole('img').click()
    const popEst = await popEstPromise
    await popEst.waitForLoadState('networkidle')
    await popEst.locator('input[name="municipioBusqueda"]').fill(formData.municipio_presentador || '')
    await popEst.getByRole('img', { name: 'Buscar Municipio' }).click()
    await popEst.getByRole('link', { name: new RegExp(formData.municipio_presentador, 'i') }).first().click()

    await page.locator('input[name="poblacionEstablecimiento"]').fill(formData.poblacion_presentador || '')
    await page.locator('input[name="codigoPostalDomicilioEstablecimiento"]').fill(formData.cp_presentador || '')
    await page.locator('input[name="telefonoEstablecimiento"]').fill(formData.telefono_presentador || '')
    await page.locator('input[name="movilEstablecimiento"]').fill(formData.movil_presentador || '')
    await page.locator('input[name="emailEstablecimiento"]').fill(formData.email_presentador || '')

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
      await ccaaLoc.selectOption(formData.codigo_ccaa || '01')
    }
    await page.waitForTimeout(2000)

    await page.locator('select[name="otrosDatos75codigo"]').selectOption(formData.cnae_rite || '').catch(() => { })
    await page.waitForTimeout(2000)

    const numEmpLoc = page.getByRole('textbox', { name: 'Debe introducir el número de' })
    if (await numEmpLoc.count() > 0) {
      await numEmpLoc.fill(formData.numero_empresa_instaladora || '')
    }
    await page.waitForTimeout(5000)

    // Radios obligatorios
    await page.getByRole('radio').nth(1).click()
    await page.waitForTimeout(1000)
    await page.getByRole('radio').nth(3).click()
    await page.waitForTimeout(1000)
    await page.getByRole('radio').nth(4).click()
    await page.waitForTimeout(1000)
    await page.getByRole('checkbox').first().check()

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
    await frame.getByRole('textbox', { name: 'Debe indicar Potencia' }).fill(formData.potencia_instalacion || '')
    await frame.getByRole('textbox', { name: 'Debe introducir el uso al que' }).fill(formData.uso_instalacion || 'vivienda')
    await frame.locator('select[name="tipoSuministro"]').selectOption(formData.tipo_suministro || 'Monofásico')
    await frame.getByRole('textbox', { name: 'Debe indicar la tensión de' }).fill(formData.tension_red || '230')

    if (formData.es_autoconsumo) {
      await frame.locator('#esAutoconsumoSi').check()
      await frame.getByRole('textbox', { name: 'Debe indicar el CAU' }).fill(formData.cau_presentador || '')
      await frame.locator('#tipoConsumo1').check()
      await frame.locator('#modalidadConexionGeneracion1').check()
      await frame.locator('#modalidadAutoconsumo2').check()
    }

    await frame.getByRole('textbox', { name: 'Potencia instalada', exact: true }).fill(formData.potencia_instalada_ficha || '')

    // ACUMULACIÓN
    if (formData.tiene_acumulacion) {
      await frame.locator('#disponibleAcumulacionSi').click({ force: true })
      await frame.getByRole('textbox', { name: 'Debe indicar la potencia' }).fill(formData.potencia_acumulacion || '')
      await frame.getByRole('textbox', { name: 'Debe indicar la energía má' }).fill(formData.energia_almacenada || '')
    } else {
      await frame.locator('#disponibleAcumulacionNo').click({ force: true })
    }

    await frame.getByRole('textbox', { name: 'Debe introducir el nombre de la empresa instaladora' }).fill(formData.nombre_empresa_instaladora || '')
    await frame.locator('select[name="documentoIdentEmpresaInstaladora"]').selectOption(formData.empresa_instaladora_doc_tipo || 'CIF')
    await frame.getByRole('textbox', { name: 'Debe introducir un NIF/CIF/' }).fill(formData.empresa_instaladora_doc || '')
    await frame.getByRole('textbox', { name: 'Debe introducir el nombre de la empresa distribuidora' }).fill(formData.empresa_distribuidora || '')
    await frame.locator('input[type="radio"]').first().check()

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
    await subirDoc(frame, frame.getByRole('img', { name: 'Adjuntar Documento' }).nth(4), '9.-')
    await frame.getByText('7 Certificado de adecuación').click()
    await subirDoc(frame, frame.locator('li:nth-child(8) > .bloqueGrupo > .elemento_checkbox > img'), '7.-')

    // FASE 5: NUEVO USUARIO (SUMINISTRO)
    console.log('\n[X/X] Iniciando FASE 5: Punto de Suministro (Nuevo Usuario)...')
    await page.waitForTimeout(2000)
    const popUserPromise = page.waitForEvent('popup')
    await frame.getByRole('button', { name: 'Nuevo Usuario' }).click()
    const popUser = await popUserPromise
    await popUser.waitForLoadState('networkidle')

    await popUser.getByRole('textbox', { name: 'Debe introducir el primer' }).fill(formData.apellido1_presentador || '')
    await popUser.getByRole('textbox', { name: 'Introduzca el segundo apellido' }).fill(formData.apellido2_presentador || '')
    await popUser.getByRole('textbox', { name: 'Debe introducir el nombre' }).fill(formData.nombre_presentador || '')
    await popUser.locator('#identificacionTitularPuntoSuministro').selectOption(formData.tipo_documento_presentador || 'NIF')
    await popUser.getByRole('textbox', { name: 'Debe introducir un NIF/CIF/' }).fill(formData.nif_presentador || '')

    await popUser.locator('#codigoTipoViaDomicilioTitularPuntoSuministro').selectOption(formData.tipo_via_presentador || 'CL')
    await popUser.locator('#nombreDomicilioTitularPuntoSuministro').fill(formData.nombre_via_presentador || '')
    await popUser.locator('#tipoNumeracionTitularPuntoSuministro').selectOption(formData.tipo_numeracion_presentador || 'NUM')
    await popUser.locator('#numeroDomicilioTitularPuntoSuministro').fill(formData.numero_presentador || '')
    await popUser.locator('#codigoProvinciaDomicilioTitularPuntoSuministro').selectOption(PROVINCIAS[provNorm] || formData.cod_delegacion)

    // Buscador Municipio Suministro
    const popMunUserPromise = popUser.waitForEvent('popup')
    await popUser.getByRole('group', { name: 'Datos titular del punto de' }).getByRole('img').click()
    const popMunUser = await popMunUserPromise
    await popMunUser.waitForLoadState('networkidle')
    await popMunUser.locator('input[name="municipioBusqueda"]').fill(formData.municipio_presentador || '')
    await popMunUser.getByRole('img', { name: 'Buscar Municipio' }).click()
    await popMunUser.getByRole('link', { name: new RegExp(formData.municipio_presentador, 'i') }).first().click()

    await popUser.locator('#codigoPostalDomicilioTitularPuntoSuministro').fill(formData.cp_presentador || '')
    await popUser.getByRole('textbox', { name: 'Introduzca el teléfono' }).fill(formData.telefono_presentador || '')
    await popUser.getByRole('textbox', { name: 'Introduzca el email' }).fill(formData.email_presentador || '')

    // Datos del punto (reusando)
    await popUser.locator('#codigoTipoViaDomicilioDatosPuntoSuministro').selectOption(formData.tipo_via_presentador || 'CL')
    await popUser.locator('#nombreDomicilioDatosPuntoSuministro').fill(formData.nombre_via_presentador || '')
    await popUser.locator('#tipoNumeracionDatosPuntoSuministro').selectOption(formData.tipo_numeracion_presentador || 'NUM')
    await popUser.locator('#numeroDomicilioDatosPuntoSuministro').fill(formData.numero_presentador || '')
    await popUser.locator('#codigoProvinciaDomicilioDatosPuntoSuministro').selectOption(PROVINCIAS[provNorm] || formData.cod_delegacion)

    const popMunPuntoPromise = popUser.waitForEvent('popup')
    await popUser.getByRole('group', { name: 'Datos del punto de suministro' }).getByRole('img').click()
    const popMunPunto = await popMunPuntoPromise
    await popMunPunto.waitForLoadState('networkidle')
    await popMunPunto.locator('input[name="municipioBusqueda"]').fill(formData.municipio_presentador || '')
    await popMunPunto.getByRole('img', { name: 'Buscar Municipio' }).click()
    await popMunPunto.getByRole('link', { name: new RegExp(formData.municipio_presentador, 'i') }).first().click()

    await popUser.locator('#codigoPostalDomicilioDatosPuntoSuministro').fill(formData.cp_presentador || '')
    await popUser.getByRole('textbox', { name: 'Debe indicar el CUPS del' }).fill(formData.cups_presentador || '')

    const tensionMap = formData.tension_red === '230' ? '0,4' : formData.tension_red
    await popUser.locator('#tensionPuntoSuministro').selectOption(tensionMap)

    await popUser.getByRole('button', { name: 'Aceptar' }).click()
    await page.waitForTimeout(2000)

    // FINALIZACIÓN
    console.log('\n[X/X] Iniciando FINALIZACIÓN: Guardar y Presentar...')
    await frame.getByRole('img', { name: 'Guardar' }).click()
    await page.waitForTimeout(3000)
    await frame.getByRole('img', { name: 'Presentar' }).click()
    await page.waitForTimeout(2000)
    await frame.getByRole('img', { name: 'Presentar' }).click()

    console.log('✅ ¡Proceso de automatización finalizado correctamente!')
    return { success: true }

  } catch (error) {
    console.error('❌ Error en el proceso de automatización:', error.message)
    throw error
  } finally {
    // browser.close()
  }
}
