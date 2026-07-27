import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  console.log('🚀 Iniciando script de captura de municipios...');
  // Volvemos a usar el perfil de almudena que ya tiene la sesión
  const userDataDir = path.join(os.tmpdir(), 'playwright_almudena_profile');
  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: 'chrome', headless: false, ignoreHTTPSErrors: true,
    args: ['--auto-select-certificate-for-urls=["*"]']
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
  page.setDefaultTimeout(0);
  page.setDefaultNavigationTimeout(0);

  // Mantenemos el auto-aceptar de popups por si acaso
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

    console.log('-> 🛑 PAUSA ACTIVA: Si te pide seleccionar certificado, hazlo.');
    console.log('-> En cuanto veas la pantalla de Convocatorias, dale a "Resume" en el Inspector (Play).');
    await page.pause();

    console.log('-> 📋 Aceptando posibles modales y seleccionando convocatoria (237)...');
    await page.getByRole('button', { name: 'ACEPTAR' }).click().catch(() => { });

    await page.locator('#idConvocatoria').waitFor({ state: 'visible', timeout: 10000 }).catch(()=>{});
    await page.locator('#idConvocatoria').selectOption('237').catch(()=>{});

    console.log('-> 👤 Entrando como SOLICITANTE...');
    await page.getByRole('link', { name: ' SOLICITANTE' }).click({ force: true }).catch(()=>{});

    console.log('-> 📄 Entrando en Nueva Solicitud...');
    const btnNuevaSol = page.getByRole('link', { name: 'Nueva Solicitud' }).first();
    await btnNuevaSol.waitFor({ state: 'visible', timeout: 10000 }).catch(()=>{});
    await btnNuevaSol.click().catch(()=>{});

    console.log('-> ⬆️ Subiendo archivo XML temporal para desbloquear el formulario...');
    const xmlPath = path.resolve(__dirname, 'capturas-almudena/CEE Previo (1).xml');
    await page.locator('#ficheroXML').waitFor({ state: 'visible', timeout: 10000 }).catch(()=>{});
    await page.locator('#ficheroXML').setInputFiles(xmlPath).catch(()=>{});
    
    console.log('-> 🔍 Clic en Verificar XML y esperando carga...');
    await page.getByRole('img', { name: 'Verificar' }).click().catch(() => { });
    await page.waitForTimeout(3000);

    console.log('-> ⏳ Esperando a que el formulario cargue...');
    await page.locator('select[id="t3_selec_provincia"]').first().waitFor({ state: 'visible', timeout: 60000 });
    
    // Pausa extra para asegurar Ajax de la Junta
    await page.waitForTimeout(2000);

    console.log('-> 🟢 Iniciando extracción masiva de municipios...');

    const provincias = ['04', '11', '14', '18', '21', '23', '29', '41'];
    const municipiosResult = {};

    for (const prov of provincias) {
      console.log(`-> Extrayendo provincia: ${prov}`);
      // Hacemos que sea robusto como en test_almudena
      await page.locator('select[id="t3_selec_provincia"]').first().selectOption(prov, { timeout: 2000 }).catch(()=>{});
      
      // La Junta necesita unos segundos para rellenar el siguiente select via AJAX
      await page.waitForTimeout(3000);
      
      const opciones = await page.locator('select[id="t3_selec_localidad"] option').evaluateAll(opts => 
        opts.filter(o => o.value && o.value !== '-1').map(o => ({ value: o.value, label: o.textContent.trim() }))
      );
      
      municipiosResult[prov] = opciones;
      console.log(`   ✅ Extraídos ${opciones.length} municipios para la provincia ${prov}.`);
    }

    const jsonPath = path.join(__dirname, 'app', 'config', 'municipiosAndalucia.json');
    fs.writeFileSync(jsonPath, JSON.stringify(municipiosResult, null, 2), 'utf-8');
    
    console.log(`\n🎉 ¡ÉXITO! Diccionario guardado en: ${jsonPath}`);
    await page.waitForTimeout(2000);
    await context.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    await page.pause();
    await context.close();
    process.exit(1);
  }
})();
