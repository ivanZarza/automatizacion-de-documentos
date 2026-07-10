import { chromium } from 'playwright';
import os from 'os';
import path from 'path';
import fs from 'fs';

const logFile = 'captura_scout.txt';
fs.appendFileSync(logFile, `\n\n=== NUEVA CAPTURA ${new Date().toISOString()} ===\n`);
const originalLog = console.log;
console.log = (...args) => {
  const text = args.join(' ');
  fs.appendFileSync(logFile, text + '\n');
  originalLog.apply(console, args);
};

(async () => {
  console.log('🚀 Iniciando Analizador Scout de Playwright...');

  // Carpeta aislada para no interferir con las cookies del robot de producción
  const userDataDir = path.join(os.tmpdir(), 'playwright_analizador_profile');
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
      '--auto-select-certificate-for-urls=["*"]' 
    ]
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  page.on('dialog', async dialog => {
    console.log(`\n🔔 [POPUP/ALERT DETECTADO] Mensaje: "${dialog.message()}" -> ACEPTANDO automáticamente.`);
    await dialog.accept().catch(() => {});
  });

  // ==========================================
  // 1. MONITOR DE RED (Peticiones POST y Payload)
  // ==========================================
  page.on('request', req => {
    if (req.method() === 'POST') {
      console.log(`\n📡 [POST DETECTADO] URL: ${req.url()}`);
      const data = req.postData() || '';
      if (data) {
        try {
          const params = new URLSearchParams(data);
          console.log(`   📦 [PAYLOAD ENVIADO] (${Array.from(params.keys()).length} campos):`);
          for (const [key, val] of params.entries()) {
             if (val && val.trim() !== '') {
               console.log(`      -> ${key} = ${val.substring(0, 150)}`);
             }
          }
        } catch (e) {
          console.log(`   📦 [PAYLOAD RAW]: ${data.substring(0, 200)}...`);
        }
      }
    }
  });

  page.on('response', async res => {
    if (res.request().method() === 'POST' && res.status() >= 400) {
       console.log(`❌ [ERROR DEL SERVIDOR] El POST a ${res.url()} respondió con estado ${res.status()}`);
    }
  });

  // ==========================================
  // 2. MONITOR DE CONSOLA Y EXCEPCIONES WEB
  // ==========================================
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`🔴 [CONSOLA WEB ERROR]: ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    console.log(`💥 [EXCEPCIÓN JS EN PÁGINA]: ${err.message}`);
  });

  // ==========================================
  // 3. OBSERVADOR DE INPUTS (Bridge Navegador -> Node)
  // ==========================================
  await page.exposeFunction('onFormChangeNode', (datosCampo) => {
    console.log(`📝 [INPUT MODIFICADO] <${datosCampo.tagName}> name="${datosCampo.name}" id="${datosCampo.id}" | Valor: "${datosCampo.value}"`);
  });

  // Se inyecta en cada página que cargue el navegador
  await page.addInitScript(() => {
    // Captura cuando se abandona el foco del campo (change)
    document.addEventListener('change', (e) => {
      const target = e.target;
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) {
        window.onFormChangeNode({
          tagName: target.tagName,
          name: target.name || 'SIN_NAME',
          id: target.id || 'SIN_ID',
          value: target.value || ''
        }).catch(() => {});
      }
    }, { capture: true });
  });

  // ==========================================
  // 4. EXTRACTOR DE CAMPOS OCULTOS Y ESTRUCTURA
  // ==========================================
  await page.exposeFunction('logInfoNode', (info) => console.log(info));
  await page.addInitScript(() => {
    // Función disponible en la consola del navegador
    window.extraerFormularios = () => {
      const forms = document.querySelectorAll('form');
      let logStr = `\n🕵️ [ANÁLISIS DE FORMULARIOS: ${forms.length} encontrados]\n`;
      forms.forEach((f, i) => {
        logStr += `\n--- Formulario ${i + 1} (Name: ${f.name || 'N/A'}, Action: ${f.action || 'N/A'}) ---\n`;
        const inputs = f.querySelectorAll('input, select, textarea');
        inputs.forEach(inp => {
           const type = inp.type || inp.tagName;
           if (type.toLowerCase() === 'hidden') {
             logStr += `   [OCULTO] Name: ${inp.name} | Value: ${inp.value}\n`;
           }
        });
      });
      window.logInfoNode(logStr);
      return "Análisis enviado a la terminal de Node.";
    };
  });

  try {
    console.log('\n🌐 Navegando a la página objetivo...');
    await page.goto('https://www.juntadeandalucia.es/empleoempresaycomercio/oficinavirtual/bienvenida.do');
    
    console.log('\n======================================================');
    console.log('✅ ANALIZADOR LISTO Y A LA ESCUCHA.');
    console.log('1. Ve al navegador que se acaba de abrir.');
    console.log('2. Navega con normalidad (selecciona certificados si lo pide).');
    console.log('3. Escribe los nombres conceptuales dentro de los inputs.');
    console.log('4. Si necesitas ver los campos ocultos de la página actual,');
    console.log('   abre la consola del navegador (F12) y escribe: window.extraerFormularios()');
    console.log('======================================================\n');
    
    // Pausa infinita para permitir la interacción humana
    await page.pause();

  } catch (error) {
    console.error('❌ Error fatal en el Analizador:', error.message);
  }
})();
