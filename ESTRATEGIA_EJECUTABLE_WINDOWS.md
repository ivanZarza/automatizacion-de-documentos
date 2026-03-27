# 📦 Guía: Creación de Ejecutable Windows (.exe) para el Robot

Para convertir este proyecto Nuxt en una aplicación de escritorio que funcione en Windows sin necesidad de abrir una terminal, la mejor opción es usar **Electron**.

---

## 🚀 1. ¿Por qué Electron?
Electron permite "envolver" tu aplicación web (Nuxt) dentro de una ventana nativa de Windows. 
- **Ventaja**: El usuario solo hace doble clic en el `.exe`.
- **Certificados**: Al ser una aplicación local, Chrome/Electron puede acceder a los certificados del sistema de Windows (AutoFirma).
- **Offline**: No necesitas desplegar el código en la nube si lo usas solo en la oficina.

---

## 🛠️ 2. Herramientas Necesarias
1. **Node.js** (instalado en el Windows de destino).
2. **`electron`**: El motor para la ventana.
3. **`electron-builder`**: La herramienta que genera el archivo `.exe`.
4. **`nuxt-electron`**: Un módulo que facilita la integración.

---

## 📝 3. Pasos para la Conversión

### Paso 1: Preparar Nuxt para modo estático
Nuxt debe generar archivos que Electron pueda leer localmente:
- Configurar `ssr: false` en `nuxt.config.ts`.
- Usar `nitro: { preset: 'service-worker' }` o similar para que el backend funcione dentro de Electron.

### Paso 2: Configurar el proceso principal de Electron
Se crea un archivo `electron/main.js` que se encarga de:
- Abrir la ventana.
- **Importante**: Exponer el servicio `juntaService.js` para que la UI pueda llamarlo.

### Paso 3: Empaquetar Playwright
Este es el mayor desafío técnico. Playwright necesita descargar navegadores (Chrome). Tienes dos opciones:
1.  **Incluir Chrome en el .exe**: Hace que el archivo pese mucho (+200MB) pero es más fiable.
2.  **Usar el Chrome instalado en Windows**: El `.exe` pesa poco, pero el PC debe tener Chrome instalado. *Esta es la opción recomendada para tu caso.*

---

## 🏗️ 4. Proceso de Compilación (Build)
Desde el ordenador Windows, se ejecutaría:
```bash
npm run build
npx electron-builder build --win
```
Esto generará una carpeta `dist` con un archivo `Instalador_Robot_Junta.exe`.

---

## ⚠️ 5. Consideraciones Críticas en Windows
- **Antivirus**: Los archivos `.exe` nuevos a veces son bloqueados por Windows Defender. Hay que marcarlos como seguros.
- **Rutas de archivos**: En Windows, las rutas usan barra invertida `\` (ej: `C:\Clientes\`). El código de `juntaService.js` ya usa `path.join()`, por lo que detectará el sistema operativo automáticamente y funcionará bien.

---
> [!IMPORTANT]
> Para generar el `.exe` con éxito, lo ideal es realizar el proceso de *build* directamente en una máquina Windows, ya que la compilación cruzada desde Linux suele dar problemas con los binarios de Playwright.
