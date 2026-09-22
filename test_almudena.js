import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFile = 'captura_scout.txt';
fs.appendFileSync(logFile, `\n\n=== CONTINUACIÓN SCOUT (MATRIZ) ${new Date().toISOString()} ===\n`);
const originalLog = console.log;
console.log = (...args) => {
  const text = args.join(' ');
  fs.appendFileSync(logFile, text + '\n');
  originalLog.apply(console, args);
};

// ==========================================
// 1. DATOS DE PRUEBA (Válidos para pasar validaciones)
// ==========================================
const datosPrueba = {
  xmlPath: path.resolve(__dirname, 'capturas-almudena/CEE Previo (1).xml'),
  idConvocatoria: '237',
  intro: {
    dia: '09', mes: '12', anio: '2014',
    numBoja: '244', fechaBoja: '16/12/2014',
    numInscripcion: '123456'
  },
  t1: { subgrupo: 'resi', uso: 'edif' },
  t3: {
    tipoVia: 'CL', nombreVia: 'CALLE MAYOR', tipoNumeracion: 'NUM',
    numKmVia: '8', bloque: '1', portal: '2', letra: 'A',
    escalera: '1', piso: '1', puerta: 'A', cPostal: '41001',
    provincia: '41', localidad: '007', entPoblacion: 'SEVILLA',
    superficie: '120', plantas: '2', altura: '6', anioConstruccion: '2015'
  },
  t5: {
    apellidosNombre: 'ZARZA ESTEVEZ IVAN',
    tipoIdentificacion: 'TIPO_NIF',
    nif: '47357954B'
  },
  t17: {
    correo: 'correo@prueba.com',
    movil: '666666666'
  },
  t6: {
    calidad: 'proFirmCertificado',
    titulacion: 'Ingeniero Industrial',
    colegio: 'sevilla',
    numColegiado: '12345'
  },
  t8: { fecha: '25/10/2027' },
  t9: { otrasOrdenanzas: 'Ninguna ordenanza adicional' },
  t10: {
    tipoDoc: 'reconocido', docReconocido: 'HULC', otrosProgramas: 'otros programas', version: 'version'
  },
  t11: {
    calefaccionTipo: 'distrito', calefaccionEq: 'EQ_AU_EX_DI_AG_AI',
    refrigeracionTipo: 'distrito', refrigeracionEq: 'EQ_AUT_EXP_DIR_AI_AI_CRV',
    acsTipo: 'distrito', acsEq: 'EQ_AU_EX_DI_AI_AI',
    potenciaElectrica: '45.5'
  },
  t16: { mejora1: 'Instalaciones' },
  t20: { numLiquidacion: '0461234567890' },
  t18: { docRecomendaciones: false, xml: true, certFirmado: true, ficComprimido: true, otrosDocumentos: true, justPago: true },
  t19: { tipoFirmante: 'PROMOTOR', en: 'Sevilla', dia: '5', mes: 'Julio', anio: '2026', fdo: 'ZARZA ESTEVEZ IVAN', nif: '47357954B' }
};

// Array de combinaciones para testar lógicas excluyentes en la Pestaña 2
const combinacionesExcluyentes = [
  { edificacion: 'cte', instalacion: 'rite98', nombre: 'Prueba 1: CTE + RITE 98' },
  { edificacion: 'nbe', instalacion: 'rite07', nombre: 'Prueba 2: NBE + RITE 07' },
  { edificacion: 'cte_2013', instalacion: 'otro', nombre: 'Prueba 3: CTE 2013 + Otros', otroInst: 'Test Inst' },
  { edificacion: 'otro', instalacion: 'rite07', nombre: 'Prueba 4: Otros + RITE 07', otroEdif: 'Test Edif' }
];

(async () => {
  console.log('🚀 Iniciando test automático Almudena (Fase 1 y 2 - Matriz)...');

  const userDataDir = path.join(os.tmpdir(), 'playwright_almudena_profile');
  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: 'chrome', headless: false, ignoreHTTPSErrors: true,
    args: ['--auto-select-certificate-for-urls=["*"]']
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  // Desactivar timeouts globales para que espere infinitamente si hace falta
  page.setDefaultTimeout(0);
  page.setDefaultNavigationTimeout(0);

  // Mantenemos el auto-aceptar de popups
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

    console.log('-> 🛑 PAUSA ACTIVA: Realiza el login, haz clic en el botón intermedio si lo hay.');
    console.log('-> Una vez veas la pantalla de Convocatorias, dale a "Resume" en el Inspector.');
    await page.pause();

    console.log('-> 📋 Aceptando posibles modales y seleccionando convocatoria (237)...');
    await page.getByRole('button', { name: 'ACEPTAR' }).click().catch(() => { });

    await page.locator('#idConvocatoria').waitFor({ state: 'visible', timeout: 0 });
    await page.locator('#idConvocatoria').selectOption(datosPrueba.idConvocatoria);

    console.log('-> 👤 Entrando como SOLICITANTE...');
    await page.getByRole('link', { name: ' SOLICITANTE' }).click({ force: true });

    console.log('-> 📄 Esperando a que cargue la bandeja (sin límite de tiempo)...');
    const btnNuevaSol = page.getByRole('link', { name: 'Nueva Solicitud' }).first();
    await btnNuevaSol.waitFor({ state: 'visible', timeout: 0 });
    await btnNuevaSol.click();
    await page.waitForTimeout(2000);

    // ==========================================
    // HELPERS CON IS-EDITABLE (Opción 1)
    // ==========================================
    const checkIsEditable = async (locatorStr) => {
      try {
        const loc = page.locator(locatorStr).first();
        const isVisible = await loc.isVisible();
        if (!isVisible) return false;

        // Un campo bloqueado por la Junta puede estar disabled o readonly
        const isDisabled = await loc.isDisabled();
        const isEditable = await loc.isEditable(); // true si está enabled y no es readonly

        return !isDisabled && isEditable;
      } catch (e) { return false; }
    };

    const fillF = async (id, val) => {
      const locStr = `[id="${id}"]:not([type="hidden"])`;
      if (await checkIsEditable(locStr)) {
        await page.locator(locStr).first().fill(val, { timeout: 2000 }).catch(() => { });
      } else {
        console.log(`      [INFO] Input ${id} bloqueado (Autorrelleno). Ignorando...`);
      }
    };

    const selF = async (id, val) => {
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

    // Para desmarcar si está en false
    const unchkF = async (id) => {
      const locStr = `[id="${id}"]:not([type="hidden"])`;
      try {
        const loc = page.locator(locStr).first();
        if (await loc.isVisible() && !(await loc.isDisabled())) {
          await loc.uncheck({ timeout: 2000 }).catch(() => { });
        }
      } catch (e) { }
    };

    // ==========================================
    // RELLENAR PESTAÑA 1
    // ==========================================
    console.log('\n-> ⬆️ Subiendo archivo XML...');
    await page.locator('#ficheroXML').setInputFiles(datosPrueba.xmlPath);

    console.log('-> 🔍 Clic en Verificar XML y esperando carga...');
    await page.getByRole('img', { name: 'Verificar' }).click().catch(() => { });
    await page.waitForTimeout(3000);

    console.log('-> ✍️ Rellenando Fechas e Intro...');
    await selF('intro_selec_dia', datosPrueba.intro.dia);
    await selF('intro_selec_mes', datosPrueba.intro.mes);
    await fillF('intro_anio', datosPrueba.intro.anio);
    await fillF('intro_numBoja', datosPrueba.intro.numBoja);
    await fillF('intro_fechaBoja', datosPrueba.intro.fechaBoja);

    const esInscripcionNueva = false;
    if (esInscripcionNueva) {
      await chkF('check_inscripcion');
      console.log('    -> Trámite: Inscripción (Se omiten los campos de certificado anterior)');
    } else {
      await chkF('check_correccion');
      await fillF('intro_numInscripcion', datosPrueba.intro.numInscripcion);
      await fillF('intro_causas', 'Corrección de referencia catastral solicitada por registro');
      await fillF('intro_numExpediente', 'EXP-987654321');
    }

    console.log('-> ✍️ Rellenando T1 (Tipología)...');
    await chkF('t1_check_cert_voluntaria_rd');
    await selF('t1_selec_subgrupo', datosPrueba.t1.subgrupo);
    await selF('t1_selec_uso', datosPrueba.t1.uso);
    await chkF('t1_check_cee_existente');

    console.log('-> ✍️ Rellenando T3 (Dirección Técnica)...');
    await selF('t3_selec_tipoVia', datosPrueba.t3.tipoVia);
    await fillF('t3_nombreVia', datosPrueba.t3.nombreVia);
    await selF('t3_selec_tipoNumeracion', datosPrueba.t3.tipoNumeracion);
    await fillF('t3_numKmVia', datosPrueba.t3.numKmVia);
    await fillF('t3_bloque', datosPrueba.t3.bloque);
    await fillF('t3_portal', datosPrueba.t3.portal);
    await fillF('t3_letra', datosPrueba.t3.letra);
    await fillF('t3_escalera', datosPrueba.t3.escalera);
    await fillF('t3_piso', datosPrueba.t3.piso);
    await fillF('t3_puerta', datosPrueba.t3.puerta);
    await fillF('t3_cPostal', datosPrueba.t3.cPostal);

    await selF('t3_selec_provincia', datosPrueba.t3.provincia);
    await page.waitForTimeout(2000); // Esperar carga de municipios
    await selF('t3_selec_localidad', datosPrueba.t3.localidad);

    await fillF('t3_entPoblacion_notif', datosPrueba.t3.entPoblacion);
    await fillF('t3_superficie', datosPrueba.t3.superficie);
    await fillF('t3_plantas', datosPrueba.t3.plantas);
    await fillF('t3_altura', datosPrueba.t3.altura);
    await fillF('t3_anioConstruccion', datosPrueba.t3.anioConstruccion);

    console.log('-> ✍️ Rellenando T5 (Promotor)...');
    await selF('t5_selec_pais_promotora', 'ES');
    await fillF('t5_apellidosNombre', datosPrueba.t5.apellidosNombre);
    await selF('t5_select_tipoIdentificacion', datosPrueba.t5.tipoIdentificacion);
    await fillF('t5_nif', datosPrueba.t5.nif);
    await chkF('t5_checkVaron');
    await chkF('t5_check_privada');

    console.log('-> ✍️ Rellenando Notificaciones (T17)...');
    await chkF('t17_check_autorizo_email');
    await fillF('t17_correo', datosPrueba.t17.correo);
    await fillF('t17_movil', datosPrueba.t17.movil);

    console.log('-> 💾 Guardando Pestaña 1 y pasando a Pestaña 2...');
    await page.getByRole('img', { name: 'Guardar' }).click().catch(() => { });
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Datos energéticos del edificio' }).click().catch(() => { });
    await page.waitForTimeout(2000);

    // ==========================================
    // RELLENAR PESTAÑA 2
    // ==========================================
    console.log('\n-> ✍️ Rellenando T6 (Técnico Certificador)...');
    await selF('t6_selec_calidad', datosPrueba.t6.calidad);
    await selF('t6_selec_titulacion', datosPrueba.t6.titulacion);
    await fillF('t6_colegio', datosPrueba.t6.colegio);
    await fillF('t6_numColegiado', datosPrueba.t6.numColegiado);
    await chkF('t6_checkVaron');

    console.log('-> ✍️ Rellenando T8 (Fecha)...');
    await fillF('t8_fecha', datosPrueba.t8.fecha);

    console.log('\n======================================================');
    console.log('🔄 INICIANDO MATRIZ DE CROSS-TESTING EN PESTAÑA 2 (Normativa)');
    console.log('======================================================');

    for (const combo of combinacionesExcluyentes) {
      console.log(`\n  >> Ejecutando: ${combo.nombre}`);

      // Lógica Exclusiva Edificación
      if (combo.edificacion === 'cte') await chkF('t9_check_cte');
      else if (combo.edificacion === 'nbe') await chkF('t9_check_nbe');
      else if (combo.edificacion === 'cte_2013') await chkF('t9_check_cte_2013');
      else if (combo.edificacion === 'otro') {
        await chkF('t9_check_otro_edificacion');
        await fillF('t9_otro_edif', combo.otroEdif);
      }

      // Lógica Exclusiva Instalaciones
      if (combo.instalacion === 'rite98') await chkF('t9_check_rite98');
      else if (combo.instalacion === 'rite07') await chkF('t9_check_rite07');
      else if (combo.instalacion === 'otro') {
        await chkF('t9_check_otro_instalacion');
        await fillF('t9_otro_instalacion', combo.otroInst);
      }

      await fillF('t9_otras_edif', datosPrueba.t9.otrasOrdenanzas);

      console.log(`  << Fin de ${combo.nombre}. Esperando 2 segundos para ver visualmente el cambio...`);
      await page.waitForTimeout(2000);
    }

    console.log('\n-> ✍️ Rellenando T10 (Procedimiento)...');
    if (datosPrueba.t10.tipoDoc === 'reconocido') {
      await chkF('t10_check_doc_reconocido');
      await selF('t10_select_doc_reconocido', datosPrueba.t10.docReconocido);
    } else {
      await chkF('t10_check_otros');
      await fillF('t10_otros_programas', datosPrueba.t10.otrosProgramas);
    }
    await fillF('t10_version', datosPrueba.t10.version);

    console.log('-> ✍️ Rellenando T11 (Instalaciones Térmicas)...');
    const aplicarCheck = async (seccion, tipo) => {
      await chkF(`t11_check_${seccion}_${tipo}`);
    };

    await aplicarCheck('calef', datosPrueba.t11.calefaccionTipo);
    await selF('t11_selec_calef_eqPrinc', datosPrueba.t11.calefaccionEq);

    await aplicarCheck('refrig', datosPrueba.t11.refrigeracionTipo);
    await selF('t11_selec_refrig_eqPrinc', datosPrueba.t11.refrigeracionEq);

    await aplicarCheck('acs', datosPrueba.t11.acsTipo);
    await selF('t11_selec_acs_eqPrinc', datosPrueba.t11.acsEq);

    await chkF('t11_check_electricas');
    await fillF('t11_elec_potenciaTotal', datosPrueba.t11.potenciaElectrica);

    console.log('\n======================================================');
    console.log('✅ PESTAÑAS 1 Y 2 COMPLETADAS.');

    console.log('-> 💾 Guardando Pestaña 2 y pasando a Calificación energética...');
    await page.getByRole('img', { name: 'Guardar' }).click().catch(() => { });
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Calificación energética/' }).click().catch(() => { });
    await page.waitForTimeout(2000);

    // ==========================================
    // RELLENAR PESTAÑA 3
    // ==========================================
    console.log('\n-> ✍️ Rellenando T16 (Calificación Energética)...');
    await selF('t16_selec_mejora1', datosPrueba.t16.mejora1);

    console.log('-> 💾 Guardando Pestaña 3 y pasando a Solicitud de Registro/Firma...');
    await page.getByRole('img', { name: 'Guardar' }).click().catch(() => { });
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Solicitud de Registro/Firma' }).click().catch(() => { });
    await page.waitForTimeout(2000);

    // ==========================================
    // RELLENAR PESTAÑA 4
    // ==========================================
    console.log('\n-> ✍️ Rellenando T20 (Tasas)...');
    await fillF('t20_num2', datosPrueba.t20.numLiquidacion);

    console.log('-> ✍️ Rellenando T18 (Documentación Adjunta - Múltiples checks)...');
    if (datosPrueba.t18.docRecomendaciones) await chkF('t18_check_doc_recomendaciones'); else await unchkF('t18_check_doc_recomendaciones');
    if (datosPrueba.t18.xml) await chkF('t18_check_xml'); else await unchkF('t18_check_xml');
    if (datosPrueba.t18.certFirmado) await chkF('t18_check_cert_firmado'); else await unchkF('t18_check_cert_firmado');
    if (datosPrueba.t18.ficComprimido) await chkF('t18_check_fic_comprimido'); else await unchkF('t18_check_fic_comprimido');
    if (datosPrueba.t18.otrosDocumentos) await chkF('t18_check_otros_documentos_seccion1'); else await unchkF('t18_check_otros_documentos_seccion1');
    if (datosPrueba.t18.justPago) await chkF('t18_check_just_pago'); else await unchkF('t18_check_just_pago');

    console.log('-> ✍️ Rellenando T19 (Firma)...');
    await selF('t19_tipo_firmante', datosPrueba.t19.tipoFirmante);
    await fillF('t19_en', datosPrueba.t19.en);
    await fillF('t19_a_fecha_dia', datosPrueba.t19.dia);
    await selF('t19_a_fecha_mes', datosPrueba.t19.mes);
    await fillF('t19_a_fecha_anio', datosPrueba.t19.anio);
    await fillF('t19_fdo1', datosPrueba.t19.fdo);
    await fillF('t19_nif_firmante', datosPrueba.t19.nif);

    console.log('-> 💾 Guardando Pestaña 4 y pasando a Anexos...');
    await page.getByRole('img', { name: 'Tramitar' }).click().catch(() => { });
    await page.waitForTimeout(3000);

    // ==========================================
    // SUBIR ANEXOS (DOCUMENTACIÓN)
    // ==========================================
    console.log('\n-> 📎 Subiendo Documentación Adjunta (Anexos)...');
    const basePath = '/home/ivan/dev/trabajo/GeneracionDocumentacion/capturas-almudena/';

    const subirAnexo = async (locatorStr, filename) => {
      console.log(`   -> Subiendo: ${filename}...`);
      const popupPromise = page.waitForEvent('popup');
      await page.locator(locatorStr).first().check({ force: true }).catch(async () => {
        await page.locator(locatorStr).first().click({ force: true }).catch(() => { });
      });

      const popup = await popupPromise;
      await popup.waitForLoadState('domcontentloaded');
      await popup.locator('input[type="file"]').setInputFiles(basePath + filename);
      await popup.getByRole('img', { name: 'Aceptar' }).click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
    };

    await subirAnexo('input[name="doc_1834591"]', 'CEE Previo (1).xml');
    await subirAnexo('input[name="doc_1906404"]', 'CEE Previo.pdf');
    await subirAnexo('input[name="doc_1834601"]', 'CEE Previo.zip');
    await subirAnexo('input[name="doc_1834598"]', 'CEE Previo_informeMedidasMejora.pdf');
    await subirAnexo('input[name="doc_1834618"]', 'Autorización de Representación REG CEE.doc (1) (2).pdf');
    await subirAnexo('tr:nth-child(16) > td', 'Tasa CEE Previo - 0463005015760.pdf');

    console.log('-> ⏳ Esperando 5 segundos para asimilar documentos...');
    await page.waitForTimeout(5000);

    // === ESCÁNER DE CAMPOS OBLIGATORIOS (ROJOS) PARA IVAN ===
    console.log('-> 🕵️ Escaneando todo el formulario en busca de campos obligatorios (rojos/requeridos)...');
    const obligatorios = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
      const results = [];
      for (const el of inputs) {
        if (!el.name && !el.id) continue; // Ignorar si no tiene nombre
        
        const isRequiredAttr = el.hasAttribute('required') || el.getAttribute('aria-required') === 'true';
        const hasObligatorioClass = el.className && typeof el.className === 'string' && (el.className.includes('requerid') || el.className.includes('obligatorio') || el.className.includes('rojo'));
        
        // Comprobar si tiene algún asterisco rojo cerca o un estilo en línea rojo
        let hasRedLabel = false;
        if (el.labels && el.labels.length > 0) {
          const labelHtml = el.labels[0].innerHTML || '';
          if (labelHtml.includes('rojo') || labelHtml.includes('red') || labelHtml.includes('*')) {
            hasRedLabel = true;
          }
        }
        
        const style = window.getComputedStyle(el);
        const hasRedBorder = style.borderColor === 'rgb(255, 0, 0)' || style.borderColor === 'red';

        if (isRequiredAttr || hasObligatorioClass || hasRedLabel || hasRedBorder) {
          results.push(`📌 CAMPO OBLIGATORIO DETECTADO: Name: "${el.name}" | ID: "${el.id}" | Tipo: ${el.tagName} | Motivo: [Attr: ${isRequiredAttr}, Class: ${hasObligatorioClass}, Label: ${hasRedLabel}, Borde: ${hasRedBorder}]`);
        }
      }
      return results.join('\n');
    });

    if (obligatorios) {
      console.log('\n=== LISTA DE CAMPOS OBLIGATORIOS ENCONTRADOS ===\n' + obligatorios);
      fs.appendFileSync(logFile, `\n\n=== CAMPOS OBLIGATORIOS ===\n${obligatorios}\n=========================\n`);
    } else {
      console.log('No se detectó ningún campo obligatorio automáticamente.');
    }

    console.log('-> ✍️ Iniciando firma (AutoFirma)...');
    await page.getByRole('img', { name: 'Iniciar Firma' }).click().catch(() => { });

    console.log('\n======================================================');
    console.log('🚀 ¡BINGO! TODAS LAS PESTAÑAS Y ANEXOS COMPLETADOS.');
    console.log('======================================================\n');

    await page.pause();

  } catch (err) {
    console.error('❌ Error:', err);
    await page.pause();
  }
})();
