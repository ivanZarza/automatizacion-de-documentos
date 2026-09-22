/**
 * Script de extracción de municipios de la web de la Junta de Andalucía.
 * 
 * Navega al formulario de la Junta, y para cada provincia andaluza,
 * abre el popup de búsqueda de municipios y extrae TODOS los nombres
 * exactamente como aparecen en la web.
 * 
 * Uso: node scripts/extraer_municipios.js
 * 
 * NOTA: Requiere certificado digital instalado. El autoclicker se encargará
 * del diálogo de seguridad de Windows.
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROVINCIAS = [
  { code: '04', name: 'ALMERÍA' },
  { code: '11', name: 'CÁDIZ' },
  { code: '14', name: 'CÓRDOBA' },
  { code: '18', name: 'GRANADA' },
  { code: '21', name: 'HUELVA' },
  { code: '23', name: 'JAÉN' },
  { code: '29', name: 'MÁLAGA' },
  { code: '41', name: 'SEVILLA' },
];

const URL_JUNTA = 'https://www.juntadeandalucia.es/industria/oficinavirtual/acceso.xhtml';

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function extraerMunicipios() {
  console.log('🚀 Iniciando extracción de municipios de la Junta de Andalucía...\n');

  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--start-maximized'],
  });

  const context = await browser.newContext({
    viewport: null,
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();
  const resultado = {};

  try {
    // --- PASO 1: Navegar y hacer login ---
    console.log('📌 Navegando a la Oficina Virtual...');
    await page.goto(URL_JUNTA, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await esperar(3000);

    // Buscar enlace de acceso con certificado
    console.log('📌 Buscando acceso con certificado digital...');
    const linkCert = page.getByRole('link', { name: /certificado/i }).first();
    await linkCert.waitFor({ state: 'visible', timeout: 30000 });
    await linkCert.click();
    await esperar(5000);

    // Esperar a que el usuario resuelva el diálogo del certificado
    console.log('⏳ Esperando selección de certificado (hasta 60s)...');
    console.log('   💡 Si aparece el diálogo de seguridad de Windows, selecciona tu certificado.');
    
    // Esperar a que cambie la URL (login exitoso)
    await page.waitForURL(/.*(?:listado|acceso|inicio).*/, { timeout: 120000 }).catch(() => {
      console.log('   [!] Timeout esperando login. Continuando de todos modos...');
    });
    await esperar(5000);

    // Cerrar modal de bienvenida si aparece
    const btnAceptar = page.getByRole('button', { name: /aceptar/i }).first();
    if (await btnAceptar.isVisible().catch(() => false)) {
      await btnAceptar.click();
      await esperar(2000);
    }

    // --- PASO 2: Navegar al formulario ---
    console.log('📌 Navegando al formulario de nueva comunicación...');
    
    // Buscar "Acceso a Comunicaciones"
    const linkComuni = page.getByRole('link', { name: /Acceso a Comunicaciones/i }).first();
    await linkComuni.waitFor({ state: 'visible', timeout: 60000 }).catch(() => {});
    if (await linkComuni.isVisible().catch(() => false)) {
      await linkComuni.click();
      await esperar(5000);
    }

    // Buscar "Nueva comunicación"
    const linkNueva = page.getByRole('link', { name: /Nueva comunicaci/i }).first();
    await linkNueva.waitFor({ state: 'visible', timeout: 180000 });
    await linkNueva.click();
    await esperar(5000);

    // Esperar formulario
    await page.waitForSelector('select[name="codDelegacion"]', { state: 'visible', timeout: 30000 });
    console.log('✅ Formulario cargado correctamente.\n');

    // --- PASO 3: Para cada provincia, extraer municipios ---
    for (const prov of PROVINCIAS) {
      console.log(`\n🔄 [${prov.code}] Extrayendo municipios de ${prov.name}...`);

      // Seleccionar la delegación/provincia
      await page.locator('select[name="codDelegacion"]').selectOption(prov.code);
      await esperar(3000);

      // Seleccionar la provincia en el domicilio
      await page.locator('select[name="codigoProvinciaDomicilioInteresado"]').selectOption(prov.code);
      await esperar(3000);

      // Abrir popup de búsqueda de municipios
      const popupPromise = page.waitForEvent('popup');
      await page.locator('img[onclick*="codigoMunicipioDomicilioInteresado"]').click();
      const popup = await popupPromise;
      await popup.waitForLoadState('networkidle');
      await esperar(2000);

      // Buscar con texto vacío para obtener TODOS los municipios
      const searchInput = popup.locator('input[name="municipioBusqueda"]');
      await searchInput.click();
      await searchInput.fill(''); // vacío = todos
      await popup.getByRole('img', { name: /Buscar/i }).click();
      await esperar(5000);

      // Esperar la tabla de resultados
      await popup.locator('table.listado').waitFor({ state: 'visible', timeout: 30000 }).catch(() => {
        console.log(`   [!] No apareció tabla de resultados para ${prov.name}. Intentando con "a"...`);
      });

      // Extraer todos los municipios de la tabla
      let municipios = await popup.evaluate(() => {
        const links = Array.from(document.querySelectorAll('table.listado a'));
        return links.map(a => a.textContent.trim()).filter(Boolean);
      }).catch(() => []);

      // Si no encontró nada con vacío, intentar letra por letra
      if (municipios.length === 0) {
        console.log(`   📝 Búsqueda vacía no funcionó. Intentando con letras del abecedario...`);
        const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const todosEncontrados = new Set();

        for (const letra of letras) {
          await searchInput.fill(letra);
          await popup.getByRole('img', { name: /Buscar/i }).click();
          await esperar(3000);

          const parcial = await popup.evaluate(() => {
            const links = Array.from(document.querySelectorAll('table.listado a'));
            return links.map(a => a.textContent.trim()).filter(Boolean);
          }).catch(() => []);

          parcial.forEach(m => todosEncontrados.add(m));
          
          if (parcial.length > 0) {
            process.stdout.write(`   ${letra}: ${parcial.length} | `);
          }
        }
        console.log('');
        municipios = Array.from(todosEncontrados).sort();
      }

      resultado[prov.code] = {
        nombre: prov.name,
        municipios: municipios.sort(),
      };

      console.log(`   ✅ ${municipios.length} municipios encontrados para ${prov.name}`);
      if (municipios.length > 0) {
        console.log(`   📋 Primeros 5: ${municipios.slice(0, 5).join(', ')}...`);
      }

      // Cerrar popup
      await popup.close().catch(() => {});
      await esperar(2000);
    }

    // --- PASO 4: Guardar resultados ---
    const outputPath = path.join(__dirname, '..', 'app', 'config', 'municipiosOptions.js');
    
    let jsContent = `// Auto-generado por scripts/extraer_municipios.js\n`;
    jsContent += `// Fecha de extracción: ${new Date().toISOString()}\n`;
    jsContent += `// Fuente: Oficina Virtual de la Junta de Andalucía\n\n`;
    jsContent += `export const municipiosPorProvincia = {\n`;
    
    for (const prov of PROVINCIAS) {
      const data = resultado[prov.code];
      if (!data) continue;
      jsContent += `  // ${data.nombre}\n`;
      jsContent += `  '${prov.code}': [\n`;
      for (const m of data.municipios) {
        jsContent += `    '${m.replace(/'/g, "\\'")}',\n`;
      }
      jsContent += `  ],\n\n`;
    }
    
    jsContent += `};\n`;

    fs.writeFileSync(outputPath, jsContent, 'utf-8');
    console.log(`\n\n✅ ARCHIVO GUARDADO: ${outputPath}`);

    // También guardar JSON raw por si acaso
    const jsonPath = path.join(__dirname, '..', 'app', 'config', 'municipiosOptions.json');
    fs.writeFileSync(jsonPath, JSON.stringify(resultado, null, 2), 'utf-8');
    console.log(`✅ JSON DE RESPALDO: ${jsonPath}`);

    // Resumen
    console.log('\n📊 RESUMEN:');
    let total = 0;
    for (const prov of PROVINCIAS) {
      const data = resultado[prov.code];
      if (data) {
        console.log(`   ${data.nombre}: ${data.municipios.length} municipios`);
        total += data.municipios.length;
      }
    }
    console.log(`   TOTAL: ${total} municipios\n`);

  } catch (error) {
    console.error('❌ Error durante la extracción:', error.message);
    
    // Guardar lo que tengamos hasta ahora
    if (Object.keys(resultado).length > 0) {
      const partialPath = path.join(__dirname, 'municipios_parcial.json');
      fs.writeFileSync(partialPath, JSON.stringify(resultado, null, 2), 'utf-8');
      console.log(`💾 Datos parciales guardados en: ${partialPath}`);
    }
  } finally {
    console.log('🔒 Cerrando navegador...');
    await browser.close();
  }
}

extraerMunicipios();
