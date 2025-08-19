# 🚀 INSTRUCTIVO DE INSTALACIÓN - WORKNOW CV RECEPTION APP

## 📋 Requisitos Previos

### 1. Node.js
- **Versión requerida**: 18.0.0 o superior
- **Descarga**: https://nodejs.org/
- **Verificación**: `node --version`

### 2. MySQL
- **Versión**: 8.0.0 o superior
- **Descarga**: https://dev.mysql.com/downloads/mysql/
- **Alternativa**: XAMPP (incluye MySQL + phpMyAdmin)

### 3. MySQL Workbench (Opcional pero recomendado)
- **Descarga**: https://dev.mysql.com/downloads/workbench/

## 🔧 Instalación Paso a Paso

### Paso 1: Clonar el Proyecto
```bash
git clone [URL_DE_TU_REPOSITORIO]
cd worknow-cv-reception-app
```

### Paso 2: Instalar Dependencias
```bash
# Instalar dependencias del proyecto principal
npm install

# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install

# Volver al directorio raíz
cd ..
```

### Paso 3: Configurar Base de Datos
1. **Iniciar MySQL** (servicio o XAMPP)
2. **Crear base de datos**:
   ```sql
   CREATE DATABASE cv_reception;
   USE cv_reception;
   ```
3. **Ejecutar script de esquema**:
   - Abrir `backend/database_schema_update.sql` en MySQL Workbench
   - Ejecutar todo el script

### Paso 4: Configurar Variables de Entorno
1. **Crear archivo** `backend/.env`:
   ```env
   DB_HOST=localhost
   DB_USER=tu_usuario_mysql
   DB_PASSWORD=tu_password_mysql
   DB_NAME=cv_reception
   PORT=3001
   ```

### Paso 5: Ejecutar la Aplicación
```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd frontend
npm start
```

## 🌐 Acceso a la Aplicación
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Base de datos**: localhost:3306

## 🧪 Ejecutar Pruebas
```bash
# Pruebas unitarias
npm test

# Pruebas con cobertura
npm run test:coverage
```

## 📦 Construir para Producción
```bash
# Construir frontend
npm run build

# Empaquetar aplicación (requiere configuración adicional)
npm run package
```

## 🔍 Solución de Problemas Comunes

### Error: "Cannot find module"
- Ejecutar `npm install` en cada directorio (backend, frontend)

### Error: "Access denied for user"
- Verificar credenciales de MySQL en `backend/.env`

### Error: "Port already in use"
- Cambiar puerto en `backend/.env` o detener otros servicios

### Error: "Database connection failed"
- Verificar que MySQL esté ejecutándose
- Verificar credenciales y nombre de base de datos

## 📞 Soporte
Si encuentras problemas, revisa:
1. **Logs del backend** en la terminal
2. **Console del navegador** (F12)
3. **Estado de MySQL** (servicio activo)

---

**¡Tu aplicación WorkNow CV Reception App está lista para usar! 🎉**
