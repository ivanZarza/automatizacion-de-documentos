import fs from 'fs'
import path from 'path'
import os from 'os'

export async function runRegistroAutomation(payload) {
  const { chromium } = await import('playwright')

  // payload.datos viene del componente Vue
  const formData = payload.datos || {}

  console.log('======================================================')
  console.log('[RegistroService] 📦 DIAGNÓSTICO DE DATOS RECIBIDOS:')
  console.log(' - Total campos en payload:', Object.keys(formData).length)
  console.log(' - Fechas BOJA recibidas:', {
    dia: formData.intro_dia, mes: formData.intro_mes, anio: formData.intro_anio,
    fechaBoja: formData.intro_fechaBoja, numBoja: formData.intro_numBoja
  })
  console.log(' - Adjuntos Base64 recibidos:', {
    xml: formData.registro_doc_xml ? `PRESENTE (${formData.registro_doc_xml.length} chars)` : '❌ VACÍO',
    pdf: formData.registro_doc_cee_pdf ? `PRESENTE (${formData.registro_doc_cee_pdf.length} chars)` : '❌ VACÍO',
    zip: formData.registro_doc_cee_zip ? `PRESENTE (${formData.registro_doc_cee_zip.length} chars)` : '❌ VACÍO',
    mejoras: formData.registro_doc_mejoras ? `PRESENTE (${formData.registro_doc_mejoras.length} chars)` : '❌ VACÍO',
    tasa: formData.registro_doc_tasa ? `PRESENTE (${formData.registro_doc_tasa.length} chars)` : '❌ VACÍO',
    autorizacion: formData.registro_doc_autorizacion ? `PRESENTE (${formData.registro_doc_autorizacion.length} chars)` : '❌ VACÍO'
  })
  console.log(' - Firma / Técnico recibidos:', {
    nombre: formData.registro_t6_nombre || formData.nombre_tecnico,
    nif: formData.registro_t6_nif || formData.nif_tecnico,
    calidadFirmante: formData.registro_t17_calidad_firmante || formData.calidadFirmante
  })
  console.log('======================================================')

  const datosRegistro = {
    tramite: formData.registro_tramite || formData.tramite || 'inscripcion',
    numInscripcionAnterior: formData.intro_numInscripcion || formData.numInscripcionAnterior || '',
    numExpedienteAnterior: formData.intro_numExpediente || formData.numExpedienteAnterior || '',
    causas: formData.intro_causas || formData.causas || '',
    diaBoja: formData.intro_dia || '09',
    mesBoja: formData.intro_mes || '12',
    anioBoja: formData.intro_anio || '2014',
    numBoja: formData.intro_numBoja || '244',
    fechaBoja: formData.intro_fechaBoja || '16/12/2014',

    t1: {
      subgrupo: formData.registro_t1_subgrupo || formData.subgrupo || 'resi',
      uso: formData.registro_t1_uso || formData.uso_instalacion || formData.uso || 'edif'
    },
    t3: {
      tipoVia: formData.registro_t3_tipoVia || formData.tipo_via_presentador || formData.tipoVia || 'CL',
      nombreVia: formData.registro_t3_nombreVia || formData.nombre_via_presentador || formData.nombreVia || '',
      tipoNumeracion: formData.registro_t3_tipoNumeracion || formData.tipo_numeracion_presentador || formData.tipoNumeracion || 'NUM',
      numero: formData.registro_t3_numero || formData.numero_presentador || formData.numero || '',
      calificadorNumero: formData.registro_t3_calificadorNumero || '',
      bloque: formData.registro_t3_bloque || formData.bloque_presentador || formData.bloque || '',
      portal: formData.registro_t3_portal || formData.portal || '',
      letra: formData.registro_t3_letra || formData.letra || '',
      escalera: formData.registro_t3_escalera || formData.escalera_presentador || formData.escalera || '',
      piso: formData.registro_t3_piso || formData.piso_presentador || formData.piso || '',
      puerta: formData.registro_t3_puerta || formData.puerta_presentador || formData.puerta || '',
      pais: formData.registro_t3_pais || 'ES',
      cPostal: formData.registro_t3_cPostal || formData.cp_presentador || formData.codigoPostal || formData.cPostal || '',
      provincia: formData.registro_t3_provincia || formData.provincia_presentador || formData.provincia || '',
      localidad: formData.registro_t3_localidad || formData.municipio_presentador || formData.localidad || '',
      entPoblacion: formData.registro_t3_entPoblacion || formData.poblacion_presentador || formData.entPoblacion || '',
      superficie: formData.registro_t3_superficie || formData.superficie_instalacion || formData.superficie || '',
      plantas: formData.registro_t3_plantas || formData.plantas || '',
      altura: formData.registro_t3_altura || formData.altura || '',
      anioConstruccion: formData.registro_t3_anioConstruccion || formData.anioConstruccion || '',
      refCatastral: formData.registro_t3_refCatastral || formData.ref_catastral || formData.refCatastral || formData.referenciaCatastral || ''
    },
    t5: {
      nif: formData.registro_t5_nif || formData.nif_presentador || formData.nif || '',
      apellidosNombre: formData.registro_t5_nombre || formData.nombre_presentador || formData.apellidosNombre || '',
      tipoIdentificacion: formData.t5_select_tipoIdentificacion || formData.tipo_documento_presentador || 'TIPO_NIF',
      sexo: formData.registro_t5_sexo || formData.sexo_presentador || 'varon'
    },
    t16: {
      mejora1: formData.registro_t16_mejora1 || formData.mejora1 || 'Instalaciones'
    },
    t17: {
      correo: formData.registro_t17_correo || formData.email_presentador || formData.email || '',
      movil: formData.registro_t17_movil || formData.movil_presentador || formData.telefono_presentador || formData.movil || '',
      calidadFirmante: formData.registro_t17_calidad_firmante || formData.calidadFirmante || 'REPLEGAL'
    },
    t6: {
      apellidosNombre: formData.registro_t6_nombre || formData.nombre_tecnico || 'Miguel Ángel Rivas Zapata',
      nif: formData.registro_t6_nif || formData.nif_tecnico || '28888418G',
      calidad: formData.registro_t6_calidad || formData.calidad || 'proFirmCertificado',
      titulacion: formData.registro_t6_titulacion || formData.titulacion || 'Ingeniero Industrial',
      colegio: formData.registro_t6_colegio || formData.colegio || 'COIIOC',
      numColegiado: formData.registro_t6_numColegiado || formData.numColegiado || '4671',
      sexo: formData.registro_t6_sexo || 'H'
    },
    t8: {
      fecha: formData.registro_t8_fecha || formData.fecha_emision_cee || formData.fecha || '',
      fechaValidez: formData.registro_t8_validez || formData.fecha_validez_cee || formData.validez || ''
    },
    t9: {
      edificacion: formData.registro_t9_edificacion || formData.edificacion || 'cte',
      otroEdif: formData.registro_t9_otro_edif || '',
      instalacion: formData.registro_t9_instalacion || formData.instalacion || 'rite98',
      otroInst: formData.registro_t9_otro_inst || ''
    },
    t10: {
      procedimiento: formData.registro_t10_procedimiento || formData.procedimiento || 'reconocido',
      docReconocido: formData.registro_t10_docReconocido || formData.docReconocido || 'HULC',
      otrosProgramas: formData.registro_t10_otros_programas || formData.otrosProgramas || '',
      version: formData.registro_t10_version || formData.version || 'V2.3'
    },
    t11: {
      calefaccionTipo: formData.registro_t11_calefaccionTipo || formData.calefaccionTipo || 'distrito',
      calefaccionEq: formData.registro_t11_calefaccionEq || formData.calefaccionEq || 'EQ_AU_EX_DI_AG_AI',
      refrigeracionTipo: formData.registro_t11_refrigeracionTipo || formData.refrigeracionTipo || 'distrito',
      refrigeracionEq: formData.registro_t11_refrigeracionEq || formData.refrigeracionEq || 'EQ_AUT_EXP_DIR_AI_AI_CRV',
      acsTipo: formData.registro_t11_acsTipo || formData.acsTipo || 'distrito',
      acsEq: formData.registro_t11_acsEq || formData.acsEq || 'EQ_AU_EX_DI_AI_AI',
      potenciaElectrica: formData.registro_t11_potenciaElectrica || formData.potencia_instalacion || formData.potenciaElectrica || ''
    },
    t19: {
      lugarFirma: formData.registro_t19_lugar || formData.registro_t19_lugarFirma || formData.lugar_firma || formData.lugarFirma || 'Sevilla',
      fdo: formData.registro_t6_nombre || formData.nombre_tecnico || 'Miguel Ángel Rivas Zapata',
      nif: formData.registro_t6_nif || formData.nif_tecnico || '28888418G'
    },
    t20: {
      numLiquidacion: formData.registro_t20_numLiquidacion || formData.numLiquidacion || ''
    },
    archivos: {
      xml: formData.registro_doc_xml, // Base64
      pdf: formData.registro_doc_cee_pdf, // Base64
      zip: formData.registro_doc_cee_zip, // Base64
      mejoras: formData.registro_doc_mejoras, // Base64
      tasa: formData.registro_doc_tasa, // Base64
      autorizacion: formData.registro_doc_autorizacion // Base64
    }
  }

  const tempFiles = [];
  const saveTempFile = (base64String, extension) => {
    if (!base64String) return null;
    try {
      const base64Data = base64String.replace(/^data:.*?;base64,/, "");
      const tempPath = path.join(os.tmpdir(), `registro_temp_${Date.now()}_${Math.random().toString(36).substring(7)}.${extension}`);
      fs.writeFileSync(tempPath, base64Data, 'base64');
      tempFiles.push(tempPath);
      return tempPath;
    } catch (e) {
      console.error('Error guardando archivo temporal:', e);
      return null;
    }
  };

  const archivosPaths = {
    xml: saveTempFile(formData.registro_doc_xml, 'xml'),
    pdf: saveTempFile(formData.registro_doc_cee_pdf, 'pdf'),
    zip: saveTempFile(formData.registro_doc_cee_zip, 'zip'),
    mejoras: saveTempFile(formData.registro_doc_mejoras, 'pdf'),
    tasa: saveTempFile(formData.registro_doc_tasa, 'pdf'),
    autorizacion: saveTempFile(formData.registro_doc_autorizacion, 'pdf')
  };

  console.log('🚀 Iniciando servicio backend Registro CEE...');

  const userDataDir = path.join(os.tmpdir(), 'playwright_almudena_profile');
  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: 'chrome', headless: false, ignoreHTTPSErrors: true,
    args: ['--auto-select-certificate-for-urls=["*"]']
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  page.setDefaultTimeout(0);
  page.setDefaultNavigationTimeout(0);

  page.on('dialog', async dialog => {
    console.log(`\n🔔 [POPUP DETECTADO] Mensaje: "${dialog.message()}"`);
    console.log(`-> 🛑 PAUSA AUTOMÁTICA: Revisa en el navegador qué campo falta. Luego dale a "Resume".`);
    await page.pause();
    await dialog.accept().catch(() => { });
  });

  try {
    console.log('-> 🌐 Navegando al portal...');
    await page.goto('https://www.juntadeandalucia.es/empleoempresaycomercio/oficinavirtual/bienvenida.do');
    await page.waitForTimeout(2000);

    console.log('-> 📂 Entrando en Registros...');
    await page.getByText('Registros', { exact: true }).waitFor({ state: 'visible', timeout: 10000 }).catch(() => { });
    await page.getByText('Registros', { exact: true }).click().catch(() => { });
    await page.waitForTimeout(2000);

    console.log('-> 📂 Clic en acceso con certificado...');
    await page.locator('#acceso-3').getByRole('link').first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => { });
    await page.locator('#acceso-3').getByRole('link').first().click();

    console.log('-> 🛑 PAUSA ACTIVA: Realiza el login, selecciona la convocatoria (237) en la web si es necesario.');
    console.log('-> Una vez veas la pantalla de Nueva Solicitud, dale a "Resume" en el Inspector de Playwright.');
    await page.pause();

    console.log('-> 📋 Aceptando posibles modales y seleccionando convocatoria (237)...');
    await page.getByRole('button', { name: 'ACEPTAR' }).click().catch(() => { });

    await page.locator('#idConvocatoria').waitFor({ state: 'visible', timeout: 0 }).catch(() => { });
    await page.locator('#idConvocatoria').selectOption('237').catch(() => { });

    console.log('-> 👤 Entrando como SOLICITANTE...');
    await page.getByRole('link', { name: ' SOLICITANTE' }).click({ force: true }).catch(() => { });

    console.log('-> 📄 Esperando a que cargue la bandeja...');
    const btnNuevaSol = page.getByRole('link', { name: 'Nueva Solicitud' }).first();
    await btnNuevaSol.waitFor({ state: 'visible', timeout: 0 }).catch(() => { });
    await btnNuevaSol.click().catch(() => { });
    await page.waitForTimeout(2000);

    // Helpers IS-EDITABLE
    const checkIsEditable = async (locatorStr) => {
      try {
        const loc = page.locator(locatorStr).first();
        if (!(await loc.isVisible())) return false;
        return !(await loc.isDisabled()) && (await loc.isEditable());
      } catch (e) { return false; }
    };

    const fillF = async (id, val, forceOverwrite = true) => {
      if (!val) return;
      const cleanVal = typeof val === 'string' ? val.trim() : val;
      const locStr = `[id="${id}"]:not([type="hidden"])`;
      if (await checkIsEditable(locStr)) {
        const loc = page.locator(locStr).first();
        if (!forceOverwrite) {
          const currentVal = await loc.inputValue().catch(() => '');
          if (currentVal && currentVal.trim() !== '') {
            console.log(`      [INFO] ${id} ya tiene valor (${currentVal}). Respetando XML...`);
            return;
          }
        }
        await loc.fill('', { timeout: 1000 }).catch(() => { });
        await loc.fill(cleanVal, { timeout: 2000 }).catch(() => { });
        await loc.dispatchEvent('input').catch(() => { });
        await loc.dispatchEvent('change').catch(() => { });
      } else {
        console.log(`      [INFO] Input ${id} bloqueado. Ignorando...`);
      }
    };

    const normalizeStr = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase() : "";

    const selF = async (id, val, forceOverwrite = true) => {
      if (!val) return;
      const locStr = `select[id="${id}"]`;
      try {
        const loc = page.locator(locStr).first();
        if (await loc.isVisible() && !(await loc.isDisabled())) {
          if (!forceOverwrite) {
            const currentVal = await loc.inputValue().catch(() => '');
            if (currentVal && currentVal !== '-1' && currentVal !== '') {
              console.log(`      [INFO] Select ${id} ya tiene valor (${currentVal}). Respetando XML...`);
              return;
            }
          }
          try {
            // Buscamos el value exacto o coincidencia bidireccional/normalizada
            const targetClean = normalizeStr(val);
            const firstWord = targetClean.split(' ')[0]; // ej. "conil", "chiclana"

            const optionValue = await loc.evaluate((select, { targetClean, firstWord }) => {
              const norm = (s) => s ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase() : "";

              // 1. Coincidencia exacta por texto o value
              for (let opt of select.options) {
                if (norm(opt.text) === targetClean || norm(opt.value) === targetClean) return opt.value;
              }
              // 2. Coincidencia bidireccional (target incluye opt o opt incluye target)
              for (let opt of select.options) {
                const optClean = norm(opt.text);
                const optValClean = norm(opt.value);
                if (optClean && targetClean && (targetClean.includes(optClean) || optClean.includes(targetClean))) return opt.value;
                if (optValClean && targetClean && (targetClean.includes(optValClean) || optValClean.includes(targetClean))) return opt.value;
              }
              // 3. Coincidencia por primera palabra relevante (ej. "conil", "chiclana", "arcos")
              if (firstWord && firstWord.length >= 3) {
                for (let opt of select.options) {
                  const optClean = norm(opt.text);
                  if (optClean.startsWith(firstWord) || optClean.includes(firstWord)) return opt.value;
                }
              }
              return null;
            }, { targetClean, firstWord });

            if (optionValue) {
              console.log(`      [OK] Select ${id}: encontrado "${val}" -> opción "${optionValue}"`);
              await loc.selectOption(optionValue, { timeout: 2000 });
            } else {
              console.log(`      [WARN] Select ${id}: no se encontró coincidencia directa para "${val}". Probando valor raw.`);
              await loc.selectOption(val, { timeout: 2000 });
            }
            await loc.dispatchEvent('change').catch(() => { });
          } catch (e) {
            await loc.selectOption(val, { timeout: 2000 }).catch(() => { });
          }

          await page.waitForLoadState('networkidle').catch(() => { });
          await page.waitForTimeout(500);
        } else {
          console.log(`      [INFO] Select ${id} bloqueado. Ignorando...`);
        }
      } catch (e) { }
    };

    const chkF = async (id, forceOverwrite = false) => {
      const locStr = `[id="${id}"]:not([type="hidden"])`;
      try {
        const loc = page.locator(locStr).first();
        if (await loc.isVisible() && !(await loc.isDisabled())) {
          if (!forceOverwrite) {
            const isChecked = await loc.isChecked().catch(() => false);
            if (isChecked) return;
          }
          await loc.check({ timeout: 2000 }).catch(() => { });
          await loc.dispatchEvent('change').catch(() => { });
        } else {
          console.log(`      [INFO] Checkbox ${id} bloqueado/no visible.`);
        }
      } catch (e) { }
    };

    // --- PESTAÑA 1 ---
    console.log('\n-> ⬆️ Subiendo archivo XML...');
    if (archivosPaths.xml) {
      await page.locator('#ficheroXML').setInputFiles(archivosPaths.xml).catch(() => console.log('[!] Error subiendo XML'));
      console.log('-> 🔍 Clic en Verificar XML y esperando carga...');
      await page.getByRole('img', { name: 'Verificar' }).click().catch(() => { });
      await page.waitForLoadState('networkidle').catch(() => { });
      await page.waitForTimeout(3000); // Espera extra para que el portal procese el XML y llene los campos
    }

    console.log('-> ✍️ Rellenando Fechas e Intro (BOJA)...');
    await selF('intro_selec_dia', datosRegistro.diaBoja);
    await selF('intro_selec_mes', datosRegistro.mesBoja);
    await fillF('intro_anio', datosRegistro.anioBoja);
    await fillF('intro_numBoja', datosRegistro.numBoja);
    await fillF('intro_fechaBoja', datosRegistro.fechaBoja);

    // Tramite
    const t = datosRegistro.tramite || 'inscripcion';
    console.log(`-> ✍️ Configurando tipo de trámite: ${t}`);

    // El portal tiene checkboxes como check_inscripcion, check_modificacion...
    await chkF('check_inscripcion'); // Por defecto asumimos nueva inscripción

    console.log('-> ✍️ Rellenando T1 (Tipología)...');
    await chkF('t1_check_cert_voluntaria_rd');
    await chkF('t1_check_cee_existente');
    await selF('t1_selec_subgrupo', datosRegistro.t1.subgrupo);
    await selF('t1_selec_uso', datosRegistro.t1.uso);

    console.log('-> ✍️ Rellenando T3 (Dirección Técnica)...');
    await selF('t3_selec_tipoVia', datosRegistro.t3.tipoVia);
    await fillF('t3_nombreVia', datosRegistro.t3.nombreVia);
    await selF('t3_selec_tipoNumeracion', datosRegistro.t3.tipoNumeracion);
    await fillF('t3_numKmVia', datosRegistro.t3.numero);
    await fillF('t3_calificadorNumero', datosRegistro.t3.calificadorNumero);
    await fillF('t3_bloque', datosRegistro.t3.bloque);
    await fillF('t3_portal', datosRegistro.t3.portal);
    await fillF('t3_letra', datosRegistro.t3.letra);
    await fillF('t3_escalera', datosRegistro.t3.escalera);
    await fillF('t3_piso', datosRegistro.t3.piso);
    await fillF('t3_puerta', datosRegistro.t3.puerta);

    // Selección del PAÍS (Sección 2 - Edificio). 
    const paisT3 = datosRegistro.t3.pais || 'ES';
    try {
      const paisLoc = page.locator('select[name="t5_selec_pais_promotora"]').first();
      if (await paisLoc.isVisible()) {
        await paisLoc.selectOption(paisT3, { timeout: 2000 });
      }
    } catch (e) {
      console.log('      [WARN] No se pudo seleccionar el país del edificio (T3).');
    }

    await fillF('t3_cPostal', datosRegistro.t3.cPostal);

    console.log(`-> ✍️ Seleccionando Provincia (${datosRegistro.t3.provincia || 'CÁDIZ'}) y esperando recarga de municipios...`);
    await selF('t3_selec_provincia', datosRegistro.t3.provincia || 'CÁDIZ', true);

    // Espera activa del postback AJAX de la Junta para que la lista t3_selec_localidad tenga más de 1 opción
    await page.waitForFunction(() => {
      const selectLoc = document.querySelector('select[id="t3_selec_localidad"]');
      return selectLoc && selectLoc.options && selectLoc.options.length > 1;
    }, { timeout: 10000 }).catch(() => console.log('      [WARN] Timeout esperando recarga de opciones en t3_selec_localidad'));

    await page.waitForTimeout(1000);

    console.log(`-> ✍️ Seleccionando Municipio (${datosRegistro.t3.localidad || 'CONIL'})...`);
    await selF('t3_selec_localidad', datosRegistro.t3.localidad || 'CONIL', true);

    await fillF('t3_entPoblacion_notif', datosRegistro.t3.entPoblacion);
    await fillF('t3_superficie', datosRegistro.t3.superficie);
    await fillF('t3_plantas', datosRegistro.t3.plantas);
    await fillF('t3_altura', datosRegistro.t3.altura);
    await fillF('t3_anioConstruccion', datosRegistro.t3.anioConstruccion);
    await fillF('t3_refCatastral', datosRegistro.t3.refCatastral);

    console.log('-> ✍️ Rellenando T5 (Promotor)...');
    await selF('t5_select_tipoIdentificacion', datosRegistro.t5.tipoIdentificacion);
    await fillF('t5_apellidosNombre', datosRegistro.t5.apellidosNombre);
    await fillF('t5_nif', datosRegistro.t5.nif);
    if (datosRegistro.t5.sexo === 'varon') {
      await chkF('t5_checkVaron');
    } else if (datosRegistro.t5.sexo === 'mujer') {
      await chkF('t5_checkMujer');
    }
    await chkF('t5_check_privada');

    console.log('-> ✍️ Rellenando Notificaciones (T17)...');
    await chkF('t17_check_autorizo_email');
    await fillF('t17_correo', datosRegistro.t17.correo);
    await fillF('t17_movil', datosRegistro.t17.movil);

    console.log('-> 💾 Guardando Pestaña 1 y pasando a Pestaña 2...');
    await page.getByRole('img', { name: 'Guardar' }).click().catch(() => { });
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Datos energéticos del edificio' }).click().catch(() => { });
    await page.waitForTimeout(2000);

    // --- PESTAÑA 2 ---
    console.log('\n-> ✍️ Rellenando T6 (Técnico Certificador)...');
    await fillF('t6_apellidosNombre', datosRegistro.t6.apellidosNombre);
    await fillF('t6_nif', datosRegistro.t6.nif);
    if (datosRegistro.t6.sexo === 'H') {
      await chkF('t6_checkVaron');
    } else if (datosRegistro.t6.sexo === 'M') {
      await chkF('t6_checkMujer');
    }
    await selF('t6_selec_calidad', datosRegistro.t6.calidad);
    await selF('t6_selec_titulacion', datosRegistro.t6.titulacion);
    await fillF('t6_colegio', datosRegistro.t6.colegio);
    await fillF('t6_numColegiado', datosRegistro.t6.numColegiado);

    console.log('-> ✍️ Rellenando T8 (Fecha)...');
    let fechaFinal = datosRegistro.t8.fecha;
    if (fechaFinal) {
      const partes = fechaFinal.split('-');
      if (partes.length === 3) fechaFinal = `${partes[2]}/${partes[1]}/${partes[0]}`;
    } else {
      const hoy = new Date();
      const dd = String(hoy.getDate()).padStart(2, '0');
      const mm = String(hoy.getMonth() + 1).padStart(2, '0');
      const yyyy = hoy.getFullYear();
      fechaFinal = `${dd}/${mm}/${yyyy}`;
    }
    await fillF('t8_fecha', fechaFinal);

    let fVal = datosRegistro.t8.fechaValidez;
    if (fVal) {
      const p = fVal.split('-');
      if (p.length === 3) fVal = `${p[2]}/${p[1]}/${p[0]}`;
    } else {
      const partesFirma = fechaFinal.split('/');
      if (partesFirma.length === 3) {
        const dateValidez = new Date(parseInt(partesFirma[2]), parseInt(partesFirma[1]) - 1, parseInt(partesFirma[0]));
        dateValidez.setFullYear(dateValidez.getFullYear() + 9);
        dateValidez.setMonth(dateValidez.getMonth() + 10);

        const ddVal = String(dateValidez.getDate()).padStart(2, '0');
        const mmVal = String(dateValidez.getMonth() + 1).padStart(2, '0');
        const yyyyVal = dateValidez.getFullYear();
        fVal = `${ddVal}/${mmVal}/${yyyyVal}`;
      }
    }
    if (fVal) {
      await fillF('t8_fechaValidez', fVal, true);
    }

    console.log('-> ✍️ Rellenando T9 (Normativas de Edificación)...');
    if (datosRegistro.t9.edificacion === 'cte') await chkF('t9_check_cte');
    else if (datosRegistro.t9.edificacion === 'nbe') await chkF('t9_check_nbe');
    else if (datosRegistro.t9.edificacion === 'cte_2013') await chkF('t9_check_cte_2013');
    else if (datosRegistro.t9.edificacion === 'otro') {
      await chkF('t9_check_otro_edificacion');
      if (datosRegistro.t9.otroEdif) await fillF('t9_otro_edif', datosRegistro.t9.otroEdif);
    }

    if (datosRegistro.t9.instalacion === 'rite98') await chkF('t9_check_rite98');
    else if (datosRegistro.t9.instalacion === 'rite07') await chkF('t9_check_rite07');
    else if (datosRegistro.t9.instalacion === 'otro') {
      await chkF('t9_check_otro_instalacion');
      if (datosRegistro.t9.otroInst) await fillF('t9_otro_instalacion', datosRegistro.t9.otroInst);
    }

    console.log('-> ✍️ Rellenando T10 (Procedimiento)...');
    await chkF('t10_check_doc_reconocido');
    await selF('t10_select_doc_reconocido', datosRegistro.t10.docReconocido);
    await fillF('t10_version', datosRegistro.t10.version);

    console.log('-> ✍️ Rellenando T11 (Potencia Eléctrica y Equipos)...');
    const aplicarCheck = async (seccion, tipo) => {
      await chkF(`t11_check_${seccion}_${tipo}`);
    };

    await aplicarCheck('calef', datosRegistro.t11.calefaccionTipo);
    await selF('t11_selec_calef_eqPrinc', datosRegistro.t11.calefaccionEq);

    await aplicarCheck('refrig', datosRegistro.t11.refrigeracionTipo);
    await selF('t11_selec_refrig_eqPrinc', datosRegistro.t11.refrigeracionEq);

    await aplicarCheck('acs', datosRegistro.t11.acsTipo);
    await selF('t11_selec_acs_eqPrinc', datosRegistro.t11.acsEq);

    await chkF('t11_check_electricas');
    await fillF('t11_elec_potenciaTotal', datosRegistro.t11.potenciaElectrica);

    console.log('-> 💾 Guardando Pestaña 2 y pasando a Calificación energética...');
    await page.getByRole('img', { name: 'Guardar' }).click().catch(() => { });
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Calificación energética/' }).click().catch(() => { });
    await page.waitForTimeout(2000);

    // --- PESTAÑA 3 ---
    console.log('-> ✍️ Rellenando T16 (Calificación Energética/Mejoras)...');
    await chkF('t16_check_mejora1');
    await selF('t16_selec_mejora1', datosRegistro.t16.mejora1);

    console.log('-> 💾 Guardando Pestaña 3 y pasando a Solicitud de Registro/Firma...');
    await page.getByRole('img', { name: 'Guardar' }).click().catch(() => { });
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Solicitud de Registro/Firma' }).click().catch(() => { });
    await page.waitForTimeout(2000);

    // --- PESTAÑA 4 ---
    console.log('\n-> ✍️ Rellenando T20 (Tasas)...');
    await fillF('t20_num2', datosRegistro.t20.numLiquidacion);

    console.log('-> ✍️ Rellenando T19 (Lugar, Fecha y Firma)...');
    await selF('t19_tipo_firmante', datosRegistro.t17.calidadFirmante);
    await fillF('t19_en', datosRegistro.t19.lugarFirma);

    const hoyT19 = new Date();
    const dia = String(hoyT19.getDate());
    const mesIndex = hoyT19.getMonth();
    const anio = String(hoyT19.getFullYear());
    const mesesStr = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mesStr = mesesStr[mesIndex];

    await fillF('t19_a_fecha_dia', dia);
    await selF('t19_a_fecha_mes', mesStr);
    await fillF('t19_a_fecha_anio', anio);
    await fillF('t19_fdo1', datosRegistro.t19.fdo);
    await fillF('t19_nif_firmante', datosRegistro.t19.nif);

    console.log('\n-> ✍️ Rellenando T18 (Documentación Adjunta - Múltiples checks)...');
    if (archivosPaths.xml) await chkF('t18_check_xml');
    if (archivosPaths.pdf) await chkF('t18_check_cert_firmado');
    if (archivosPaths.zip) await chkF('t18_check_fic_comprimido');
    if (archivosPaths.mejoras) await chkF('t18_check_doc_recomendaciones');
    if (archivosPaths.autorizacion) await chkF('t18_check_otros_documentos_seccion1');
    if (archivosPaths.tasa) await chkF('t18_check_just_pago');

    console.log('-> 💾 Guardando Pestaña 4 y pasando a Anexos...');
    if (datosRegistro.t17.calidadFirmante) {
      try {
        await page.evaluate((val) => {
          const selects = document.querySelectorAll('select');
          for (let s of selects) {
            if (s.parentElement && s.parentElement.textContent.includes('La persona abajo firmante en')) {
              s.value = val;
              s.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }
        }, datosRegistro.t17.calidadFirmante);
      } catch (e) {
        console.log('      [ERROR] No se pudo seleccionar la calidad del firmante (T17)');
      }
    }

    console.log('-> 💾 Guardando Pestaña 4 y pasando a Anexos...');
    await page.getByRole('img', { name: 'Tramitar' }).click().catch(() => { });
    await page.waitForTimeout(3000);

    // --- ANEXOS ---
    console.log('\n-> 📎 Subiendo Documentación Adjunta (Anexos temporales)...');
    const subirAnexo = async (locatorStr, absolutePath) => {
      if (!absolutePath || !fs.existsSync(absolutePath)) return;
      if (page.isClosed()) {
        console.log(`      [!] Página cerrada. Cancelando subida de anexo "${locatorStr}".`);
        return;
      }
      console.log(`   -> Subiendo: ${path.basename(absolutePath)} en ${locatorStr}...`);
      try {
        await page.waitForLoadState('networkidle').catch(() => { });
        const targetElement = page.locator(locatorStr).first();
        await targetElement.waitFor({ state: 'attached', timeout: 7000 }).catch(() => { });
        if ((await targetElement.count().catch(() => 0)) === 0) {
          console.log(`      [!] No existe el elemento "${locatorStr}" en la página actual. Omitiendo...`);
          return;
        }

        const popupPromise = page.waitForEvent('popup', { timeout: 12000 }).catch(() => null);
        await targetElement.check({ force: true }).catch(async () => {
          await targetElement.click({ force: true }).catch(() => { });
        });

        const popup = await popupPromise;
        if (!popup) {
          console.log(`      [!] No saltó la ventana popup de adjuntos para "${locatorStr}".`);
          return;
        }
        await popup.waitForLoadState('domcontentloaded').catch(() => { });
        await popup.locator('input[type="file"]').setInputFiles(absolutePath).catch(() => { });
        await popup.getByRole('img', { name: 'Aceptar' }).click().catch(() => popup.getByRole('button', { name: 'Aceptar' }).click());
        
        // Espera activa a que la página principal recargue y asiente la subida
        await page.waitForLoadState('networkidle').catch(() => { });
        await page.waitForTimeout(3500);
      } catch (e) {
        console.log(`      [!] Error subiendo anexo en "${locatorStr}":`, e.message);
      }
    };

    await subirAnexo('input[name="doc_1834591"]', archivosPaths.xml);
    await subirAnexo('input[name="doc_1906404"]', archivosPaths.pdf);
    await subirAnexo('input[name="doc_1834601"]', archivosPaths.zip);
    await subirAnexo('input[name="doc_1834598"]', archivosPaths.mejoras);
    await subirAnexo('input[name="doc_1834618"]', archivosPaths.autorizacion);
    await subirAnexo('tr:nth-child(16) > td', archivosPaths.tasa);

    console.log('-> ⏳ Esperando 5 segundos para asimilar documentos...');
    await page.waitForTimeout(5000);

    console.log('-> ✍️ Iniciando firma (AutoFirma)...');
    await page.getByRole('img', { name: 'Iniciar Firma' }).click().catch(() => { });

    console.log('\n======================================================');
    console.log('🚀 ¡BINGO! TODAS LAS PESTAÑAS COMPLETADAS.');
    console.log('El robot queda pausado para que firmes y termines manualmente.');
    console.log('======================================================\n');

    await page.pause();

    try {
      tempFiles.forEach(f => { if (fs.existsSync(f)) fs.unlinkSync(f); });
    } catch (e) { }

    return {
      status: 'success',
      message: 'Robot ejecutado correctamente. Por favor revise el navegador.'
    }

  } catch (err) {
    console.error('❌ Error general Playwright:', err);
    await page.pause();
    return {
      status: 'error',
      message: err.message
    }
  }
}
