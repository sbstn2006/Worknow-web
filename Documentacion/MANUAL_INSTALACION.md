  MANUAL DE INSTALACIÓN - WORKNOW CV RECEPTION APP

  TABLA DE CONTENIDO

 1. INTRODUCCIÓN
- [¿Qué es este Manual?](qué-es-este-manual)
- [Objetivos de la Instalación](objetivos-de-la-instalación)
- [Público Objetivo](público-objetivo)

 2. REQUISITOS DEL SISTEMA
- [Requisitos Mínimos](requisitos-mínimos)
- [Requisitos Recomendados](requisitos-recomendados)
- [Sistemas Operativos Soportados](sistemas-operativos-soportados)

 3. INSTALACIÓN DE SOFTWARE REQUERIDO
- [Instalación de Node.js](instalación-de-nodejs)
- [Instalación de MySQL](instalación-de-mysql)
- [Instalación de MySQL Workbench](instalación-de-mysql-workbench)
- [Verificación de Instalaciones](verificación-de-instalaciones)

 4. CONFIGURACIÓN DEL PROYECTO
- [Descarga del Código Fuente](descarga-del-código-fuente)
- [Estructura de Archivos](estructura-de-archivos)
- [Configuración de Variables de Entorno](configuración-de-variables-de-entorno)

 5. CONFIGURACIÓN DE BASE DE DATOS
- [Creación de la Base de Datos](creación-de-la-base-de-datos)
- [Ejecución de Scripts SQL](ejecución-de-scripts-sql)
- [Verificación de Tablas](verificación-de-tablas)
- [Configuración de Usuarios](configuración-de-usuarios)

 6. CONFIGURACIÓN DEL BACKEND
- [Instalación de Dependencias](instalación-de-dependencias)
- [Configuración del Servidor](configuración-del-servidor)
- [Pruebas de Conexión](pruebas-de-conexión)
- [Configuración de Puertos](configuración-de-puertos)

 7. CONFIGURACIÓN DEL FRONTEND
- [Instalación de Dependencias](instalación-de-dependencias-1)
- [Configuración de Variables](configuración-de-variables)
- [Compilación del Proyecto](compilación-del-proyecto)
- [Pruebas de Funcionamiento](pruebas-de-funcionamiento)

 8. DESPLIEGUE EN PRODUCCIÓN
- [Configuración de Producción](configuración-de-producción)
- [Variables de Entorno de Producción](variables-de-entorno-de-producción)
- [Optimizaciones de Rendimiento](optimizaciones-de-rendimiento)
- [Configuración de Seguridad](configuración-de-seguridad)

 9. CONFIGURACIÓN AVANZADA
- [Configuración de Logs](configuración-de-logs)
- [Configuración de Backup](configuración-de-backup)
- [Configuración de Monitoreo](configuración-de-monitoreo)
- [Configuración de SSL](configuración-de-ssl)

 10. EMPAQUETADO Y DISTRIBUCIÓN
- [Configuración de Electron](configuración-de-electron)
- [Creación de Instalador](creación-de-instalador)
- [Distribución de la Aplicación](distribución-de-la-aplicación)

 11. SOLUCIÓN DE PROBLEMAS
- [Problemas Comunes](problemas-comunes)
- [Errores de Instalación](errores-de-instalación)
- [Problemas de Conexión](problemas-de-conexión)
- [Contacto de Soporte](contacto-de-soporte)

 12. MANTENIMIENTO Y ACTUALIZACIONES
- [Procedimientos de Backup](procedimientos-de-backup)
- [Actualización de Dependencias](actualización-de-dependencias)
- [Mantenimiento de Base de Datos](mantenimiento-de-base-de-datos)
- [Monitoreo del Sistema](monitoreo-del-sistema)

---

  ¿QUÉ ES ESTE MANUAL?

  MANUAL DE INSTALACIÓN Y CONFIGURACIÓN - WORKNOW CV RECEPTION APP

  INFORMACIÓN DEL MANUAL:
- Aplicación: WorkNow - Sistema de Recepción de CVs
- Audiencia: Desarrolladores y administradores de sistemas

  OBJETIVO DEL MANUAL:
Este manual proporciona instrucciones paso a paso para instalar, configurar y desplegar la aplicación WorkNow en un entorno de desarrollo o producción.

  REQUISITOS PREVIOS:

 Requisitos del Sistema:
- Sistema Operativo: Windows 10/11, macOS 10.15+, Ubuntu 18.04+
- Memoria RAM: Mínimo 4GB, recomendado 8GB
- Espacio en Disco: Mínimo 2GB de espacio libre
- Procesador: Intel i3 o AMD equivalente (mínimo)

 Software Requerido:
- Node.js: Versión 18.0.0 o superior
- NPM: Versión 8.0.0 o superior (incluido con Node.js)
- MySQL: Versión 8.0.0 o superior
- Git: Versión 2.30.0 o superior (opcional, para versionamiento)

 Navegadores Soportados:
- Chrome: Versión 90+
- Firefox: Versión 88+
- Safari: Versión 14+
- Edge: Versión 90+

  INSTALACIÓN DEL SOFTWARE BASE:

 1. Instalar Node.js:
1. Descargar: Ir a [nodejs.org](https://nodejs.org/)
2. Seleccionar versión: Descargar la versión LTS (Long Term Support)
3. Ejecutar instalador: Hacer doble clic en el archivo descargado
4. Seguir wizard: Aceptar términos y condiciones
5. Verificar instalación: Abrir terminal y ejecutar:
   bash
   node --version
   npm --version
   

 2. Instalar MySQL:
1. Descargar: Ir a [mysql.com](https://dev.mysql.com/downloads/)
2. Seleccionar versión: MySQL Community Server 8.0+
3. Ejecutar instalador: Seguir el wizard de instalación
4. Configurar root: Establecer contraseña para usuario root
5. Verificar instalación: Abrir MySQL Workbench o terminal

 3. Instalar MySQL Workbench (Recomendado):
1. Descargar: Desde la misma página de MySQL
2. Instalar: Ejecutar el instalador
3. Configurar conexión: Conectar con la base de datos local

  DESCARGA Y PREPARACIÓN DEL PROYECTO:

 1. Clonar o Descargar Proyecto:
bash
 Opción 1: Clonar con Git
git clone https://github.com/tu-usuario/worknow-cv-app.git
cd worknow-cv-app

 Opción 2: Descargar ZIP
 Descomprimir el archivo ZIP en la carpeta deseada
cd worknow-cv-app


 2. Verificar Estructura:
bash
 La estructura debe ser:
worknow-cv-app/
├── frontend/
├── backend/
├── package.json
└── README.md


  CONFIGURACIÓN DE LA BASE DE DATOS:

 1. Crear Base de Datos:
1. Abrir MySQL Workbench
2. Conectar al servidor local
3. Ejecutar script de creación:
   sql
   CREATE DATABASE IF NOT EXISTS cv_reception;
   USE cv_reception;
   

 2. Ejecutar Script de Esquema:
1. Abrir archivo: backend/database_schema_update.sql
2. Copiar contenido completo
3. Pegar en MySQL Workbench
4. Ejecutar script: Hacer clic en el rayo 
5. Verificar tablas creadas:
   sql
   SHOW TABLES;
   

 3. Verificar Estructura de Tablas:
sql
-- Verificar tabla usuarios
DESCRIBE usuarios;

-- Verificar tabla hojas_de_vida
DESCRIBE hojas_de_vida;

-- Verificar tabla vacantes
DESCRIBE vacantes;

-- Verificar tabla empresas
DESCRIBE empresas;


  CONFIGURACIÓN DEL BACKEND:

 1. Instalar Dependencias:
bash
 Navegar al directorio backend
cd backend

 Instalar dependencias
npm install


 2. Configurar Base de Datos:
1. Editar archivo: backend/config/db.js
2. Configurar conexión:
   javascript
   const dbConfig = {
     host: 'localhost',
     user: 'root',
     password: 'tu_password_mysql',
     database: 'cv_reception',
     port: 3306
   };
   

 3. Crear Archivo de Variables de Entorno:
bash
 Crear archivo .env en backend/
touch .env


Contenido del archivo .env:
env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password_mysql
DB_NAME=cv_reception
NODE_ENV=development


 4. Verificar Configuración:
bash
 Verificar que el archivo server.js existe
ls -la server.js

 Verificar que las rutas están configuradas
ls -la routes/


  CONFIGURACIÓN DEL FRONTEND:

 1. Instalar Dependencias:
bash
 Navegar al directorio frontend
cd frontend

 Instalar dependencias
npm install


 2. Verificar Configuración:
1. Verificar package.json: Debe contener React y dependencias
2. Verificar estructura de componentes:
   bash
   ls -la src/components/
   

 3. Configurar URL de API:
1. Editar archivo: frontend/src/components/ (componentes que usan API)
2. Verificar URLs: Asegurar que apunten a http://localhost:3001/api

  DESPLIEGUE Y PRUEBAS:

 1. Iniciar Backend:
bash
 Terminal 1: Backend
cd backend
node server.js

 Debería mostrar:
  Servidor backend escuchando en el puerto 3001


 2. Iniciar Frontend:
bash
 Terminal 2: Frontend
cd frontend
npm start

 Debería abrir automáticamente en http://localhost:3000


 3. Verificar Funcionamiento:
1. Frontend: Debe cargar en http://localhost:3000
2. Backend: Debe responder en http://localhost:3001
3. Base de datos: Debe estar conectada y funcionando

  PRUEBAS DE INSTALACIÓN:

 1. Prueba de Conexión a Base de Datos:
bash
 En MySQL Workbench
SELECT  FROM usuarios LIMIT 1;


 2. Prueba de API Backend:
bash
 En terminal o Postman
curl http://localhost:3001/api/hojas-de-vida


 3. Prueba de Frontend:
- Abrir http://localhost:3000
- Verificar que cargue la página de login
- Verificar que no haya errores en consola del navegador

  CONFIGURACIÓN AVANZADA:

 1. Configurar Puerto Personalizado:
bash
 Backend - Editar .env
PORT=3001

 Frontend - Editar package.json scripts
"start": "PORT=3000 react-scripts start"


 2. Configurar Base de Datos Remota:
javascript
// backend/config/db.js
const dbConfig = {
  host: 'tu-servidor-remoto.com',
  user: 'usuario_remoto',
  password: 'password_remoto',
  database: 'cv_reception',
  port: 3306
};


 3. Configurar CORS:
javascript
// backend/server.js
app.use(cors({
  origin: ['http://localhost:3000', 'https://tu-dominio.com'],
  credentials: true
}));


  EMPAQUETADO PARA PRODUCCIÓN:

 1. Build del Frontend:
bash
cd frontend
npm run build

 Se creará la carpeta build/ con archivos optimizados


 2. Configurar Servidor de Producción:
bash
 Instalar PM2 para gestión de procesos
npm install -g pm2

 Iniciar backend con PM2
cd backend
pm2 start server.js --name "worknow-backend"

 Configurar PM2 para inicio automático
pm2 startup
pm2 save


 3. Configurar Nginx (Opcional):
nginx
server {
    listen 80;
    server_name tu-dominio.com;
    
    location / {
        root /ruta/a/frontend/build;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


  SOLUCIÓN DE PROBLEMAS COMUNES:

 Error: "Cannot find module":
bash
 Solución: Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install


 Error: "Port already in use":
bash
 Solución: Cambiar puerto o matar proceso
 Cambiar puerto en .env
PORT=3002

 O matar proceso en puerto 3001
lsof -ti:3001 | xargs kill -9


 Error: "Access denied for user":
sql
-- Solución: Verificar permisos MySQL
GRANT ALL PRIVILEGES ON cv_reception. TO 'root'@'localhost';
FLUSH PRIVILEGES;


 Error: "Module not found" en Frontend:
bash
 Solución: Verificar imports y reinstalar
cd frontend
npm install
npm start


  VERIFICACIÓN FINAL:

 Checklist de Instalación:
- [ ] Node.js instalado y funcionando
- [ ] MySQL instalado y funcionando
- [ ] Base de datos creada y configurada
- [ ] Backend iniciado en puerto 3001
- [ ] Frontend iniciado en puerto 3000
- [ ] API respondiendo correctamente
- [ ] Frontend cargando sin errores
- [ ] Base de datos conectada
- [ ] Todas las dependencias instaladas

 Comandos de Verificación:
bash
 Verificar versiones
node --version
npm --version
mysql --version

 Verificar puertos
netstat -an | grep :3000
netstat -an | grep :3001

 Verificar procesos
ps aux | grep node


  ACTUALIZACIONES Y MANTENIMIENTO:

 1. Actualizar Dependencias:
bash
 Backend
cd backend
npm update

 Frontend
cd frontend
npm update


 2. Backup de Base de Datos:
bash
 Crear backup
mysqldump -u root -p cv_reception > backup_$(date +%Y%m%d).sql

 Restaurar backup
mysql -u root -p cv_reception < backup_20241201.sql


 3. Logs y Monitoreo:
bash
 Ver logs del backend
pm2 logs worknow-backend

 Ver logs de MySQL
tail -f /var/log/mysql/error.log


