**Playwright — Archivos y configuración (Resumen para el equipo)**

**Propósito:**: Resumen de carpetas y archivos que participan en la automatización de presentación con Playwright dentro de este proyecto.

**Dependencias:**: [package.json](package.json#L62) — `playwright` declarado; confirma instalación en [package-lock.json](package-lock.json#L23).

**Motor principal (backend):**: [server/utils/automation/juntaService.js](server/utils/automation/juntaService.js#L1) — orquesta la navegación (import `chromium`, `launchPersistentContext`), uso de perfiles (`playwright_junta_profile`) y puntos de depuración (`await page.pause()`).

**Backups / historial del motor:**: [_backups/juntaService_backup.js](_backups/juntaService_backup.js#L1) — copia con historial de cambios y comentarios útiles.

**Entradas / scripts raíz:**: [main.js](main.js#L1) y [main.js.backup](main.js.backup#L1) — scripts que usan `chromium` y/o actúan como ejecutores del robot.

**Scripts de prueba / autoclick:**: [prueba-autorrelleno.js](prueba-autorrelleno.js#L1) — script de pruebas con `chromium`; [server/utils/automation/windowsAutoClicker.js](server/utils/automation/windowsAutoClicker.js#L1) — herramientas auxiliares (autoclick) para casos donde Playwright no puede interactuar.

**API que lanza la automatización:**: [server/api/automation/junta.post.js](server/api/automation/junta.post.js#L1) — endpoint que invoca el servicio Playwright desde el backend.

**Documentación operativa:**: [documentacion/01_MANUAL_TECNICO_ROBOT.md](documentacion/01_MANUAL_TECNICO_ROBOT.md#L47) — instrucciones de instalación y uso (`npm install`, `npx playwright install chrome`), y [documentacion/historial/ESTADO_ACTUAL_Y_HANDOVER.md](documentacion/historial/ESTADO_ACTUAL_Y_HANDOVER.md#L15) — notas de depuración y comportamiento (perfil, pausas, inspector).

**Archivos con pausas/depuración:**: [resumen_cambios_margen.md](resumen_cambios_margen.md#L27), [robot_output.txt](robot_output.txt#L19) y [documentacion/historial/RESUMEN_SESION_Y_ENTREGA.md](documentacion/historial/RESUMEN_SESION_Y_ENTREGA.md#L9) — referencias a `await page.pause()` y flujos de depuración.

**Comandos útiles para preparar entorno:**

```bash
npm install
npx playwright install chrome
```

**Notas rápidas / recomendaciones:**
- **Perfil de usuario:**: El contexto persistente se crea en `os.tmpdir() + '/playwright_junta_profile'`. Si necesitas usar otro certificado borra o sustituye esa carpeta.
- **Modo depuración:**: El proyecto usa `headless: false` y `page.pause()` en puntos críticos (login, firma); útil para intervención manual con Playwright Inspector.
- **Autoclick:**: En Windows puede usarse `windowsAutoClicker.js`; en Linux/macOS suele preferirse modo pausa inteligente.

Si quieres, puedo extraer y pegar los fragmentos de código clave (`launchPersistentContext`, creación de `userDataDir`, y los puntos `page.pause()`) en este mismo archivo para referencia rápida. ¿Lo incluyo ahora?

---

**Fragmentos de código útiles**

1) Lanzamiento de navegador con contexto persistente y perfil de usuario (ejemplo tomado de `server/utils/automation/juntaService.js`):

```javascript
import os from 'os'
import path from 'path'
import { chromium } from 'playwright'

const userDataDir = path.join(os.tmpdir(), 'playwright_junta_profile')

const context = await chromium.launchPersistentContext(userDataDir, {
	headless: false,
	args: ['--start-maximized'],
	viewport: null,
})

const page = await context.newPage()
await page.goto('https://...')
```

2) Puntos de pausa / depuración (útiles en login y firma):

```javascript
// Detener ejecución y abrir Playwright Inspector
await page.pause()

// En bloque catch, para inspección en caso de error
try {
	// pasos...
} catch (err) {
	console.error('Error en ejecución Playwright:', err)
	await page.pause()
}
```

3) Leer y escribir en inputs — ejemplos prácticos para capturar datos mientras se escribe:

```javascript
// Rellenar y leer valor final
await page.fill('#selector', 'Texto completo')
const valor = await page.inputValue('#selector')

// Escribir con simulación de tecleo (por carácter)
await page.type('#selector', 'Texto a escribir', { delay: 100 })
const final = await page.inputValue('#selector')

// Capturar cada cambio mediante listener en la página
await page.exposeFunction('onInputValue', value => {
	console.log('valor intermedio:', value)
})

await page.evaluate((sel) => {
	const el = document.querySelector(sel)
	if (!el) return
	el.addEventListener('input', e => window.onInputValue(e.target.value))
}, '#selector')

await page.type('#selector', 'Texto a escribir', { delay: 80 })

// Alternativa: leer desde Node tras cada carácter
for (const ch of 'Texto a escribir') {
	await page.keyboard.type(ch)
	const v = await page.inputValue('#selector')
	console.log('intermedio:', v)
}
```

4) Test local que ejecuta el flujo con datos mock:

- Archivo: [test_junta_local.js](test_junta_local.js#L1) — ejecuta `runJuntaAutomation(robotPayload)` con datos de ejemplo para validar el robot sin interacción web directa.

---

Si quieres, formateo la sección con más ejemplos de selectores concretos (tomados de `juntaService.js`) o incluyo los extractos reales del archivo. Dime si lo dejo tal cual o añado esos fragments.
 
---

**Extractos reales de `server/utils/automation/juntaService.js`**

1) Creación de `userDataDir` y lanzamiento persistente del contexto (perfil usado para certificados):

```javascript
// Usamos una carpeta temporal del sistema para el perfil
const userDataDir = path.join(os.tmpdir(), 'playwright_junta_profile');
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
		'--disable-gpu',
		'--auto-select-certificate-for-urls=["*"]'
	]
});
const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
```

2) Captura de consola y monitor de requests (útil para diagnóstico y para ver los POSTs que envía la página):

```javascript
const logFile = path.join(os.tmpdir(), 'errores_navegador_junta.txt');
fs.writeFileSync(logFile, `=== INICIO LOG ${new Date().toISOString()} ===\n`);

page.on('console', msg => fs.appendFileSync(logFile, `[${msg.type()}] ${msg.text()}\n`));

page.on('request', req => {
	if (req.method() === 'POST' && req.url().includes('nuevaSolicitud')) {
		const data = req.postData() || '';
		const params = new URLSearchParams(data);
		console.log(`[POST] opcion=${params.get('opcion')}, keys=${Array.from(params.keys()).length}`);
	}
});
```

3) Función `rellenar(locator, valor)` — modo robusto humano/automático para insertar texto (usa `pressSequentially` con fallback):

```javascript
async function rellenar(locator, valor) {
	if (!valor) return;
	await esperar(3000);
	try {
		const isVisible = await locator.isVisible().catch(() => false);
		if (!isVisible) return;

		const isReadOnly = await locator.getAttribute('readonly').catch(() => null);
		if (isReadOnly !== null) {
			await locator.evaluate((el, v) => {
				el.value = v;
				el.dispatchEvent(new Event('input', { bubbles: true }));
				el.dispatchEvent(new Event('change', { bubbles: true }));
				el.dispatchEvent(new Event('blur', { bubbles: true }));
			}, valor);
		} else {
			await locator.click({ timeout: 5000 }).catch(() => { });
			await locator.focus().catch(() => { });
			await esperar(500);
			await locator.pressSequentially(valor, { delay: 100 }).catch(async () => {
				await locator.fill(valor).catch(async () => {
					await locator.evaluate((el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); }, valor);
				});
			});
			await locator.dispatchEvent('change').catch(() => { });
			await locator.dispatchEvent('blur').catch(() => { });
		}
	} catch (e) {
		console.log(`Error rellenando campo: ${e.message}`);
		throw e;
	}
}
```

4) Puntos `page.pause()` usados en flujo real (pausas para AutoFirma / inspección manual):

```javascript
// Pausa tras guardar ficha si no es Windows (AutoFirma requiere intervención)
if (!isWindows) {
	await page.pause();
}

// Pausa obligatoria tras 'Presentar' antes de pulsar 'Firmar'
console.log('🛑 PARADA: Verifica el estado tras Presentar. Pulsa "Resume" para continuar con el botón Firmar.');
await page.pause();
```

5) Selectores y ejemplos concretos usados en el script (útiles para construir `page.locator`):

- `#nifInteresado`
- `input[name="nombreInteresado"]`
- `input[name="apellido1Interesado"]`
- `select[name="codDelegacion"]` / `select[name="codigoDelegacion"]`
- `select[name="codigoComunidadAutonoma"]`
- `page.getByRole('textbox', { name: 'Debe indicar Potencia' })` (iframes — usar `contentFrame()`)
- `#ficha` (iframe que contiene la ficha técnica)
- `getByRole('img', { name: 'Adjuntar Documento' })` (botones de adjuntar)

6) Subida de documentos con popup (extracto simplificado):

```javascript
const popupPromise = context.waitForEvent('page', { timeout: 60000 });
await targetLocator.click().catch(async () => targetLocator.evaluate(n => n.dispatchEvent(new Event('click', { bubbles: true }))));
const popup = await popupPromise;
await popup.waitForLoadState('load');
const fileChooserPromise = popup.waitForEvent('filechooser');
await popup.getByRole('button', { name: /Choose File|Seleccionar archivo/i }).click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(rutaAbsoluta);
await popup.getByRole('img', { name: 'Guardar' }).click();
```

---

Estos extractos son literales del archivo `server/utils/automation/juntaService.js` y muestran cómo se maneja el perfil, la depuración, la extracción de requests, la escritura robusta en inputs y la subida de ficheros mediante popups.

Si quieres, puedo añadir además los selectores completos en formato tabla o incrustar fragmentos adicionales (por ejemplo, `subirDocConPopup` entero). ¿Lo añado?
