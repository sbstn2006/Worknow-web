 CONFIGURACIÓN DE EMPAQUETADO - WORKNOW CV RECEPTION APP

 Objetivo
Crear un instalador ejecutable (.exe) para Windows que permita a los usuarios instalar y ejecutar la aplicación sin necesidad de conocimientos técnicos.

 Herramientas Necesarias

1. Electron (Para crear aplicación de escritorio)
bash
npm install --save-dev electron electron-builder


2. Configuración en package.json
json
{
  "main": "electron/main.js",
  "scripts": {
    "electron": "electron .",
    "build-electron": "electron-builder",
    "dist": "npm run build && electron-builder --publish=never"
  },
  "build": {
    "appId": "com.worknow.cvreception",
    "productName": "WorkNow CV Reception App",
    "directories": {
      "output": "dist"
    },
    "files": [
      "electron//*",
      "frontend/build//*",
      "backend//*",
      "node_modules//*"
    ],
    "win": {
      "target": "nsis",
      "icon": "assets/icon.ico"
    }
  }
}


 Estructura de Archivos para Empaquetado

1. Crear directorio electron/

electron/
├── main.js           Proceso principal de Electron
├── preload.js        Script de precarga
└── assets/
    └── icon.ico      Icono de la aplicación


2. Archivo electron/main.js
javascript
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let backendProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.ico')
  });

  // Iniciar backend
  startBackend();
  
  // Cargar frontend
  mainWindow.loadURL('http://localhost:3000');
  
  // Abrir DevTools en desarrollo
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

function startBackend() {
  const backendPath = path.join(__dirname, '../backend/server.js');
  backendProcess = spawn('node', [backendPath], {
    cwd: path.join(__dirname, '../backend')
  });
  
  backendProcess.stdout.on('data', (data) => {
    console.log('Backend:', data.toString());
  });
  
  backendProcess.stderr.on('data', (data) => {
    console.error('Backend Error:', data.toString());
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});


 Proceso de Empaquetado

1. Construir Frontend
bash
cd frontend
npm run build
cd ..


2. Crear Ejecutable
bash
npm run dist


3. Resultado
Se creará un archivo .exe en la carpeta dist/ que incluye:
-  Aplicación completa
-  Backend integrado
-  Base de datos (requiere MySQL instalado)
-  Instalador automático




