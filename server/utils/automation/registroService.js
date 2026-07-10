import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import os from 'os'

export async function runRegistroAutomation(payload) {
  // payload.datos viene del componente Vue
  const formData = payload.datos || {}
  
  console.log('[RegistroService] Datos recibidos del formulario:', Object.keys(formData).length, 'campos')
  
  // Aquí es donde convertiremos las variables del formulario a los datosPrueba
  // Ejemplo:
  const datosRegistro = {
    tramite: formData.registro_tramite || 'Inscripción', // 'Inscripción', 'Modificación', 'Actualización'
    numInscripcionAnterior: formData.registro_num_inscripcion || '',
    
    t1: {
      subgrupo: formData.registro_t1_subgrupo || 'resi',
      uso: formData.registro_t1_uso || 'edif'
    },
    t3: {
      tipoVia: formData.registro_t3_tipoVia || 'CL',
      nombreVia: formData.registro_t3_nombreVia || '',
      tipoNumeracion: formData.registro_t3_tipoNumeracion || 'NUM',
      numero: formData.registro_t3_numero || '',
      bloque: formData.registro_t3_bloque || '',
      portal: formData.registro_t3_portal || '',
      letra: formData.registro_t3_letra || '',
      escalera: formData.registro_t3_escalera || '',
      piso: formData.registro_t3_piso || '',
      puerta: formData.registro_t3_puerta || '',
      cPostal: formData.registro_t3_cPostal || '',
      provincia: formData.registro_t3_provincia || '',
      localidad: formData.registro_t3_localidad || '',
      entPoblacion: formData.registro_t3_entPoblacion || '',
      superficie: formData.registro_t3_superficie || '',
      plantas: formData.registro_t3_plantas || '',
      altura: formData.registro_t3_altura || '',
      anioConstruccion: formData.registro_t3_anioConstruccion || ''
    },
    t5: {
      nif: formData.registro_t5_nif || '',
      apellidosNombre: formData.registro_t5_nombre || ''
    },
    t17: {
      correo: formData.registro_t17_correo || '',
      movil: formData.registro_t17_movil || ''
    },
    t6: {
      calidad: formData.registro_t6_calidad || 'proFirmCertificado',
      titulacion: formData.registro_t6_titulacion || '',
      colegio: formData.registro_t6_colegio || '',
      numColegiado: formData.registro_t6_numColegiado || ''
    },
    t8: {
      fecha: formData.registro_t8_fecha || '' // Formato YYYY-MM-DD
    },
    t9: {
      edificacion: formData.registro_t9_edificacion || 'cte', // cte, nbe, cte_2013
      instalacion: formData.registro_t9_instalacion || 'rite98' // rite98, rite07
    },
    t10: {
      procedimiento: formData.registro_t10_procedimiento || 'reconocido',
      docReconocido: formData.registro_t10_docReconocido || 'HULC'
    },
    t11: {
      calefaccionTipo: formData.registro_t11_calefaccionTipo || 'distrito',
      calefaccionEq: formData.registro_t11_calefaccionEq || 'EQ_AU_EX_DI_AG_AI',
      refrigeracionTipo: formData.registro_t11_refrigeracionTipo || 'distrito',
      refrigeracionEq: formData.registro_t11_refrigeracionEq || 'EQ_AUT_EXP_DIR_AI_AI_CRV',
      acsTipo: formData.registro_t11_acsTipo || 'distrito',
      acsEq: formData.registro_t11_acsEq || 'EQ_AU_EX_DI_AI_AI',
      potenciaElectrica: formData.registro_t11_potenciaElectrica || ''
    },
    t19: {
      lugarFirma: formData.registro_t19_lugarFirma || 'Sevilla'
    },
    t20: {
      numLiquidacion: formData.registro_t20_numLiquidacion || ''
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
    console.log(`\n🔔 [POPUP DETECTADO] Mensaje: "${dialog.message()}" -> ACEPTANDO.`);
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

    await page.locator('#idConvocatoria').waitFor({ state: 'visible', timeout: 0 }).catch(()=>{});
    await page.locator('#idConvocatoria').selectOption('237').catch(()=>{});

    console.log('-> 👤 Entrando como SOLICITANTE...');
    await page.getByRole('link', { name: ' SOLICITANTE' }).click({ force: true }).catch(()=>{});

    console.log('-> 📄 Esperando a que cargue la bandeja...');
    const btnNuevaSol = page.getByRole('link', { name: 'Nueva Solicitud' }).first();
    await btnNuevaSol.waitFor({ state: 'visible', timeout: 0 }).catch(()=>{});
    await btnNuevaSol.click().catch(()=>{});
    await page.waitForTimeout(2000);

    // Helpers IS-EDITABLE
    const checkIsEditable = async (locatorStr) => {
      try {
        const loc = page.locator(locatorStr).first();
        if (!(await loc.isVisible())) return false;
        return !(await loc.isDisabled()) && (await loc.isEditable());
      } catch (e) { return false; }
    };

    const fillF = async (id, val) => {
      if (!val) return;
      const locStr = `[id="${id}"]:not([type="hidden"])`;
      if (await checkIsEditable(locStr)) {
        await page.locator(locStr).first().fill(val, { timeout: 2000 }).catch(() => { });
      } else {
        console.log(`      [INFO] Input ${id} bloqueado. Ignorando...`);
      }
    };

    const selF = async (id, val) => {
      if (!val) return;
      const locStr = `select[id="${id}"]`;
      try {
        const loc = page.locator(locStr).first();
        if (await loc.isVisible() && !(await loc.isDisabled())) {
          await loc.selectOption(val, { timeout: 2000 }).catch(() => { });
        } else {
          console.log(`      [INFO] Select ${id} bloqueado. Ignorando...`);
        }
      } catch (e) { }
    };

    const chkF = async (id) => {
      const locStr = `[id="${id}"]:not([type="hidden"])`;
      try {
        const loc = page.locator(locStr).first();
        if (await loc.isVisible() && !(await loc.isDisabled())) {
          await loc.check({ timeout: 2000 }).catch(() => { });
        } else {
          console.log(`      [INFO] Checkbox ${id} bloqueado. Ignorando...`);
        }
      } catch (e) { }
    };

    // --- PESTAÑA 1 ---
    console.log('\n-> ⬆️ Subiendo archivo XML...');
    if (archivosPaths.xml) {
      await page.locator('#ficheroXML').setInputFiles(archivosPaths.xml).catch(()=>console.log('[!] Error subiendo XML'));
      console.log('-> 🔍 Clic en Verificar XML y esperando carga...');
      await page.getByRole('img', { name: 'Verificar' }).click().catch(() => { });
      await page.waitForTimeout(3000);
    }

    console.log('-> ✍️ Rellenando Fechas e Intro...');
    // Tramite
    if (datosRegistro.tramite === 'Inscripción' || datosRegistro.tramite === 'Nueva') {
      await chkF('check_inscripcion');
    } else {
      await chkF('check_modificacion');
      await fillF('intro_numInscripcion', datosRegistro.numInscripcionAnterior);
    }

    console.log('-> ✍️ Rellenando T1 (Tipología)...');
    await selF('t1_selec_subgrupo', datosRegistro.t1.subgrupo);
    await selF('t1_selec_uso', datosRegistro.t1.uso);

    console.log('-> ✍️ Rellenando T3 (Dirección Técnica)...');
    await selF('t3_selec_tipoVia', datosRegistro.t3.tipoVia);
    await fillF('t3_nombreVia', datosRegistro.t3.nombreVia);
    await selF('t3_selec_tipoNumeracion', datosRegistro.t3.tipoNumeracion);
    await fillF('t3_numKmVia', datosRegistro.t3.numero);
    await fillF('t3_bloque', datosRegistro.t3.bloque);
    await fillF('t3_portal', datosRegistro.t3.portal);
    await fillF('t3_letra', datosRegistro.t3.letra);
    await fillF('t3_escalera', datosRegistro.t3.escalera);
    await fillF('t3_piso', datosRegistro.t3.piso);
    await fillF('t3_puerta', datosRegistro.t3.puerta);
    await fillF('t3_cPostal', datosRegistro.t3.cPostal);

    await selF('t3_selec_provincia', datosRegistro.t3.provincia);
    await page.waitForTimeout(2000); // Esperar carga de municipios
    await selF('t3_selec_localidad', datosRegistro.t3.localidad);

    await fillF('t3_entPoblacion_notif', datosRegistro.t3.entPoblacion);
    await fillF('t3_superficie', datosRegistro.t3.superficie);
    await fillF('t3_plantas', datosRegistro.t3.plantas);
    await fillF('t3_altura', datosRegistro.t3.altura);
    await fillF('t3_anioConstruccion', datosRegistro.t3.anioConstruccion);

    console.log('-> ✍️ Rellenando T5 (Promotor)...');
    await fillF('t5_apellidosNombre', datosRegistro.t5.apellidosNombre);
    await fillF('t5_nif', datosRegistro.t5.nif);

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
    await selF('t6_selec_calidad', datosRegistro.t6.calidad);
    await selF('t6_selec_titulacion', datosRegistro.t6.titulacion);
    await fillF('t6_colegio', datosRegistro.t6.colegio);
    await fillF('t6_numColegiado', datosRegistro.t6.numColegiado);

    console.log('-> ✍️ Rellenando T8 (Fecha)...');
    // Transformar fecha YYYY-MM-DD a DD/MM/YYYY si hace falta, o inyectar directo si la web lo coge
    await fillF('t8_fecha', datosRegistro.t8.fecha);

    console.log('-> ✍️ Rellenando T9 (Normativas de Edificación)...');
    if (datosRegistro.t9.edificacion === 'cte') await chkF('t9_check_cte');
    else if (datosRegistro.t9.edificacion === 'nbe') await chkF('t9_check_nbe');
    else if (datosRegistro.t9.edificacion === 'cte_2013') await chkF('t9_check_cte_2013');

    if (datosRegistro.t9.instalacion === 'rite98') await chkF('t9_check_rite98');
    else if (datosRegistro.t9.instalacion === 'rite07') await chkF('t9_check_rite07');

    console.log('-> ✍️ Rellenando T10 (Procedimiento)...');
    if (datosRegistro.t10.procedimiento === 'reconocido') {
      await chkF('t10_check_doc_reconocido');
      await selF('t10_select_doc_reconocido', datosRegistro.t10.docReconocido);
    } else {
      await chkF('t10_check_otros');
    }

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
    console.log('-> 💾 Guardando Pestaña 3 y pasando a Solicitud de Registro/Firma...');
    await page.getByRole('img', { name: 'Guardar' }).click().catch(() => { });
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Solicitud de Registro/Firma' }).click().catch(() => { });
    await page.waitForTimeout(2000);

    // --- PESTAÑA 4 ---
    console.log('\n-> ✍️ Rellenando T20 (Tasas)...');
    await fillF('t20_num2', datosRegistro.t20.numLiquidacion);

    console.log('-> ✍️ Rellenando T19 (Lugar de Firma)...');
    await fillF('t19_en', datosRegistro.t19.lugarFirma);

    console.log('-> 💾 Guardando Pestaña 4 y pasando a Anexos...');
    await page.getByRole('img', { name: 'Tramitar' }).click().catch(() => { });
    await page.waitForTimeout(3000);

    // --- ANEXOS ---
    console.log('\n-> 📎 Subiendo Documentación Adjunta (Anexos temporales)...');
    const subirAnexoTemp = async (locatorStr, absolutePath) => {
      if (!absolutePath || !fs.existsSync(absolutePath)) return;
      console.log(`   -> Subiendo: ${absolutePath}`);
      try {
        const popupPromise = page.waitForEvent('popup');
        await page.locator(locatorStr).first().check({ force: true }).catch(async () => {
          await page.locator(locatorStr).first().click({ force: true }).catch(() => { });
        });
        const popup = await popupPromise;
        await popup.waitForLoadState('domcontentloaded');
        await popup.locator('input[type="file"]').setInputFiles(absolutePath);
        await popup.getByRole('img', { name: 'Aceptar' }).click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
      } catch (e) {
        console.log(`      [!] Error subiendo anexo ${locatorStr}:`, e.message);
      }
    };

    // Localizadores de ejemplo (estos pueden variar, habría que afinarlos)
    await subirAnexoTemp('input[name="doc_1834591"]', archivosPaths.xml);
    await subirAnexoTemp('input[name="doc_1906404"]', archivosPaths.pdf);
    await subirAnexoTemp('input[name="doc_1834601"]', archivosPaths.zip);
    await subirAnexoTemp('input[name="doc_1834598"]', archivosPaths.mejoras);
    await subirAnexoTemp('input[name="doc_1834618"]', archivosPaths.autorizacion);
    await subirAnexoTemp('tr:nth-child(16) > td', archivosPaths.tasa);

    console.log('-> ⏳ Esperando 5 segundos para asimilar documentos...');
    await page.waitForTimeout(5000);

    console.log('-> ✍️ Iniciando firma (AutoFirma)...');
    // await page.getByRole('img', { name: 'Iniciar Firma' }).click().catch(() => { });
    
    console.log('\n======================================================');
    console.log('🚀 ¡BINGO! TODAS LAS PESTAÑAS COMPLETADAS.');
    console.log('El robot queda pausado para que firmes y termines manualmente.');
    console.log('======================================================\n');

    await page.pause();

    // Limpieza de temporales al cerrar
    try {
      tempFiles.forEach(f => { if (fs.existsSync(f)) fs.unlinkSync(f); });
    } catch(e){}

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
