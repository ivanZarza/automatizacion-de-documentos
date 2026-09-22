/**
 * Script que descarga los municipios de España desde GitHub (frontid/ComunidadesProvinciasPoblaciones)
 * y genera un archivo JS con solo los municipios de Andalucía agrupados por código de provincia.
 * 
 * Normaliza los nombres moviendo artículos al inicio:
 *   "Barrios, Los" → "Los Barrios"
 *   "Línea de la Concepción, La" → "La Línea de la Concepción"
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const URL_DATA = 'https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/poblaciones.json';

const PROVINCIAS_ANDALUCIA = {
  '04': 'ALMERÍA',
  '11': 'CÁDIZ',
  '14': 'CÓRDOBA',
  '18': 'GRANADA',
  '21': 'HUELVA',
  '23': 'JAÉN',
  '29': 'MÁLAGA',
  '41': 'SEVILLA',
};

/**
 * Normaliza nombres de municipio del formato INE al formato natural.
 * "Barrios, Los" → "Los Barrios"
 * "Línea de la Concepción, La" → "La Línea de la Concepción"
 * "Palma del Condado, La" → "La Palma del Condado"
 */
function normalizarNombre(nombre) {
  // Patrón: "NombrePrincipal, Artículo" → "Artículo NombrePrincipal"
  const match = nombre.match(/^(.+),\s*(El|La|Los|Las|L')$/i);
  if (match) {
    const principal = match[1].trim();
    const articulo = match[2].trim();
    // Caso especial: L' se pega al nombre
    if (articulo === "L'") {
      return `${articulo}${principal}`;
    }
    return `${articulo} ${principal}`;
  }
  return nombre;
}

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  console.log('📥 Descargando datos de municipios desde GitHub...');
  const todos = await fetchJSON(URL_DATA);
  console.log(`   Total municipios España: ${todos.length}`);

  const resultado = {};
  const cambios = [];

  for (const [code, nombre] of Object.entries(PROVINCIAS_ANDALUCIA)) {
    const municipios = todos
      .filter(m => m.parent_code === code)
      .map(m => {
        const original = m.label;
        const normalizado = normalizarNombre(original);
        if (original !== normalizado) {
          cambios.push(`   ${original} → ${normalizado}`);
        }
        return normalizado;
      })
      .sort((a, b) => a.localeCompare(b, 'es'));

    resultado[code] = municipios;
    console.log(`   ${nombre} (${code}): ${municipios.length} municipios`);
  }

  if (cambios.length > 0) {
    console.log(`\n📝 Nombres normalizados (${cambios.length}):`);
    cambios.forEach(c => console.log(c));
  }

  // Generar archivo JS
  const outputPath = path.join(__dirname, '..', 'app', 'config', 'municipiosOptions.js');

  let js = `// Auto-generado por scripts/generar_municipios.js\n`;
  js += `// Fuente: INE (via github.com/frontid/ComunidadesProvinciasPoblaciones)\n`;
  js += `// Fecha: ${new Date().toISOString()}\n`;
  js += `// Nombres normalizados: artículos movidos al inicio (ej: "Barrios, Los" → "Los Barrios")\n`;
  js += `//\n`;
  js += `// Mapa: código provincia INE -> array de nombres de municipios\n\n`;
  js += `export const municipiosPorProvincia = {\n`;

  for (const [code, nombre] of Object.entries(PROVINCIAS_ANDALUCIA)) {
    const municipios = resultado[code];
    js += `  // ${nombre} (${municipios.length} municipios)\n`;
    js += `  '${code}': [\n`;
    for (const m of municipios) {
      js += `    '${m.replace(/'/g, "\\'")}',\n`;
    }
    js += `  ],\n\n`;
  }

  js += `};\n`;

  fs.writeFileSync(outputPath, js, 'utf-8');
  console.log(`\n✅ Archivo generado: ${outputPath}`);

  // También JSON
  const jsonPath = path.join(__dirname, '..', 'app', 'config', 'municipiosOptions.json');
  fs.writeFileSync(jsonPath, JSON.stringify(resultado, null, 2), 'utf-8');
  console.log(`✅ JSON de respaldo: ${jsonPath}`);

  // Resumen
  let total = 0;
  for (const arr of Object.values(resultado)) total += arr.length;
  console.log(`\n📊 Total municipios Andalucía: ${total}`);
}

main().catch(e => console.error('❌ Error:', e));
