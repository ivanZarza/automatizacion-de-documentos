import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { fork } from 'child_process';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let serverProcess;

function createMenu() {
  const template = [
    {
      label: 'Archivo',
      submenu: [
        { label: 'Salir', role: 'quit' }
      ]
    },
    {
      label: 'Edición',
      submenu: [
        { label: 'Deshacer', role: 'undo' },
        { label: 'Rehacer', role: 'redo' },
        { type: 'separator' },
        { label: 'Cortar', role: 'cut' },
        { label: 'Copiar', role: 'copy' },
        { label: 'Pegar', role: 'paste' },
        { label: 'Seleccionar todo', role: 'selectAll' }
      ]
    },
    {
      label: 'Ver',
      submenu: [
        { label: 'Recargar', role: 'reload' },
        { label: 'Forzar recarga', role: 'forceReload' },
        { label: 'Herramientas de desarrollo', role: 'toggleDevTools' },
        { type: 'separator' },
        { label: 'Pantalla completa', role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Ventana',
      submenu: [
        { label: 'Minimizar', role: 'minimize' },
        { label: 'Cerrar', role: 'close' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createWindow() {
  createMenu();

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    icon: path.join(__dirname, '../public/logo-solay.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    title: "Generación de Documentación - Solay"
  });

  const isDev = process.env.NODE_ENV === 'development';

  if (!isDev) {
    // Modo Producción: Arrancar el servidor Nitro compilado
    // Nota: __dirname apunta a la carpeta electron/ dentro del paquete asar
    const serverPath = path.join(__dirname, '../.output/server/index.mjs');
    
    serverProcess = fork(serverPath, [], {
      env: { 
        ...process.env, 
        PORT: 3333, 
        NODE_ENV: 'production',
        DATABASE_HOST: '51.91.159.188',
        DATABASE_PORT: '5433',
        DATABASE_USER: 'postgres',
        DATABASE_NAME: 'postgres',
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'yLDXHfdOBe3u9o3q19eyDm9EiXSWTuaI2shMDNkp22QjY6qTCoXD4NvtlFRdHGlG'
      }
    });

    serverProcess.on('error', (err) => {
      console.error('Error crítico arrancando servidor Nitro:', err);
    });
  }

  const port = isDev ? 3000 : 3333;
  const url = `http://localhost:${port}`;

  const waitAndLoad = () => {
    const request = http.request(url, { method: 'HEAD' }, (res) => {
      mainWindow.loadURL(url);
    });

    request.on('error', () => {
      setTimeout(waitAndLoad, 500);
    });

    request.end();
  };

  waitAndLoad();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (serverProcess) serverProcess.kill();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
