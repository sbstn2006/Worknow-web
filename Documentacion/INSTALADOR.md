  INSTRUCTIVO DE INSTALACIÓN - WORKNOW CV RECEPTION APP

  TABLA DE CONTENIDO

 1. INTRODUCCIÓN
- [¿Qué es este Instructivo?](qué-es-este-instructivo)
- [Objetivos de la Instalación](objetivos-de-la-instalación)
- [Público Objetivo](público-objetivo)

 2. PREREQUISITOS
- [Software Requerido](software-requerido)
- [Requisitos del Sistema](requisitos-del-sistema)
- [Verificación de Prerequisitos](verificación-de-prerequisitos)

 3. INSTALACIÓN PASO A PASO
- [Paso 1: Instalar Node.js](paso-1-instalar-nodejs)
- [Paso 2: Instalar MySQL](paso-2-instalar-mysql)
- [Paso 3: Instalar MySQL Workbench](paso-3-instalar-mysql-workbench)
- [Paso 4: Clonar el Proyecto](paso-4-clonar-el-proyecto)
- [Paso 5: Configurar Base de Datos](paso-5-configurar-base-de-datos)
- [Paso 6: Configurar Backend](paso-6-configurar-backend)
- [Paso 7: Configurar Frontend](paso-7-configurar-frontend)

 4. COMANDOS DE INSTALACIÓN
- [Comandos para Backend](comandos-para-backend)
- [Comandos para Frontend](comandos-para-frontend)
- [Comandos de Verificación](comandos-de-verificación)

 5. VERIFICACIÓN DE INSTALACIÓN
- [Verificar Backend](verificar-backend)
- [Verificar Frontend](verificar-frontend)
- [Verificar Base de Datos](verificar-base-de-datos)
- [Pruebas de Funcionamiento](pruebas-de-funcionamiento)

 6. ACCESO A LA APLICACIÓN
- [URLs de Acceso](urls-de-acceso)
- [Credenciales por Defecto](credenciales-por-defecto)
- [Primer Acceso](primer-acceso)

 7. EJECUCIÓN DE PRUEBAS
- [Pruebas Unitarias](pruebas-unitarias)
- [Pruebas de Integración](pruebas-de-integración)
- [Reportes de Cobertura](reportes-de-cobertura)

 8. CONSTRUCCIÓN PARA PRODUCCIÓN
- [Build del Frontend](build-del-frontend)
- [Empaquetado con Electron](empaquetado-con-electron)
- [Creación de Instalador](creación-de-instalador)

 9. SOLUCIÓN DE PROBLEMAS
- [Errores Comunes](errores-comunes)
- [Problemas de Conexión](problemas-de-conexión)
- [Problemas de Dependencias](problemas-de-dependencias)
- [Contacto de Soporte](contacto-de-soporte)

---

  ¿QUÉ ES ESTE INSTRUCTIVO?

  Requisitos Previos

 1. Node.js
- Versión requerida: 18.0.0 o superior
- Descarga: https://nodejs.org/
- Verificación: node --version

 2. MySQL
- Versión: 8.0.0 o superior
- Descarga: https://dev.mysql.com/downloads/mysql/
- Alternativa: XAMPP (incluye MySQL + phpMyAdmin)

 3. MySQL Workbench (Opcional pero recomendado)
- Descarga: https://dev.mysql.com/downloads/workbench/

  Instalación Paso a Paso

 Paso 1: Clonar el Proyecto
bash
git clone https://github.com/tu-usuario/worknow-cv-app.git
cd worknow-cv-reception-app


 Paso 2: Instalar Dependencias
bash
 Instalar dependencias del proyecto principal
npm install

 Instalar dependencias del backend
cd backend
npm install

 Instalar dependencias del frontend
cd ../frontend
npm install

 Volver al directorio raíz
cd ..


 Paso 3: Configurar Base de Datos
1. Iniciar MySQL (servicio o XAMPP)
2. Crear base de datos:
   sql
   CREATE DATABASE cv_reception;
   USE cv_reception;
   
3. Ejecutar script de esquema:
   - Abrir backend/database_schema_update.sql en MySQL Workbench
   - Ejecutar todo el script

 Paso 4: Configurar Variables de Entorno
1. Crear archivo backend/.env:
   env
   DB_HOST=localhost
   DB_USER=tu_usuario_mysql
   DB_PASSWORD=tu_password_mysql
   DB_NAME=cv_reception
   PORT=3001
   

 Paso 5: Ejecutar la Aplicación
bash
 Terminal 1: Backend
cd backend
npm start

 Terminal 2: Frontend
cd frontend
npm start


  Acceso a la Aplicación
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Base de datos: localhost:3306

  Ejecutar Pruebas
bash
 Pruebas unitarias
npm test

 Pruebas con cobertura
npm run test:coverage


  Construir para Producción
bash
 Construir frontend
npm run build

 Empaquetar aplicación (requiere configuración adicional)
npm run package


