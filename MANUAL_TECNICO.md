# 📋 MANUAL TÉCNICO - WORKNOW CV RECEPTION APP

## 📅 **INFORMACIÓN DEL PROYECTO:**
- **Nombre:** WorkNow - Sistema de Recepción de CVs
- **Versión:** 1.0.0
- **Fecha de Creación:** Diciembre 2024
- **Desarrollador:** Equipo de Desarrollo
- **Lenguaje Principal:** JavaScript (Node.js + React)

## 🎯 **OBJETIVOS DEL PROYECTO:**

### **Objetivo Principal:**
Desarrollar una aplicación web completa para la gestión y recepción de hojas de vida (CVs) que permita a los usuarios subir, gestionar y aplicar a vacantes laborales, y a los reclutadores evaluar candidatos de manera eficiente.

### **Objetivos Específicos:**
1. **Gestión de Usuarios:** Sistema de registro, login y autenticación seguro
2. **Gestión de CVs:** Subida, almacenamiento y visualización de hojas de vida
3. **Sistema de Vacantes:** Publicación, búsqueda y aplicación a ofertas laborales
4. **Panel de Reclutadores:** Herramientas para evaluar y gestionar candidatos
5. **Sistema de Notificaciones:** Comunicación entre usuarios y reclutadores
6. **Interfaz Responsiva:** Diseño moderno y adaptable a diferentes dispositivos

## 🏗️ **ARQUITECTURA DEL SISTEMA:**

### **Arquitectura General:**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   FRONTEND      │    │    BACKEND      │    │   BASE DE       │
│   (React)       │◄──►│   (Node.js)     │◄──►│   DATOS         │
│                 │    │   (Express)     │    │   (MySQL)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Stack Tecnológico:**

#### **Frontend:**
- **Framework:** React 19.1.0
- **Routing:** React Router DOM 7.6.3
- **HTTP Client:** Axios 1.10.0
- **Testing:** Jest + React Testing Library
- **Estilos:** CSS3 con animaciones y responsive design

#### **Backend:**
- **Runtime:** Node.js
- **Framework:** Express.js 5.1.0
- **Middleware:** CORS, Multer (file uploads)
- **Base de Datos:** MySQL2 3.14.1
- **Puerto:** 3001

#### **Base de Datos:**
- **Sistema:** MySQL
- **Herramienta:** MySQL Workbench
- **Nombre:** cv_reception

## 🗄️ **MODELO ENTIDAD-RELACIÓN:**

### **Diagrama ER:**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    USUARIOS     │    │  HOJAS_DE_VIDA  │    │    VACANTES     │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ id (PK)         │    │ id (PK)         │    │ id (PK)         │
│ correo (UK)     │◄──►│ correo (FK)     │    │ titulo          │
│ contrasena      │    │ nombre_completo │    │ descripcion     │
└─────────────────┘    │ telefono        │    │ fecha_publicacion│
                       │ direccion       │    │ empresa_id (FK) │
                       │ fecha_nacimiento│    │ ubicacion       │
                       │ nivel_educativo │    │ categoria       │
                       │ experiencia_anios│    │ tipo_contrato   │
                       │ perfil          │    │ experiencia     │
                       │ archivo         │    │ salario         │
                       └─────────────────┘    │ beneficios      │
                                              │ requisitos      │
                                              │ responsabilidades│
                                              │ fecha_cierre    │
                                              │ estado          │
                                              └─────────────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │   EMPRESAS      │
                                              ├─────────────────┤
                                              │ id (PK)         │
                                              │ nombre          │
                                              │ descripcion     │
                                              │ ubicacion       │
                                              │ contacto        │
                                              └─────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  POSTULACIONES  │    │VACANTES_FAVORITAS│    │ NOTIFICACIONES  │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ id (PK)         │    │ id (PK)         │    │ id (PK)         │
│ vacante_id (FK) │    │ vacante_id (FK) │    │ usuario_id (FK) │
│ correo (FK)     │    │ correo (FK)     │    │ tipo            │
│ fecha_postulacion│   │ fecha_agregado  │    │ mensaje         │
│ estado          │    └─────────────────┘    │ fecha_creacion  │
│ comentarios     │                           │ leida           │
└─────────────────┘                           └─────────────────┘
```

### **Relaciones:**
- **USUARIOS** ↔ **HOJAS_DE_VIDA** (1:N)
- **USUARIOS** ↔ **POSTULACIONES** (1:N)
- **VACANTES** ↔ **POSTULACIONES** (1:N)
- **VACANTES** ↔ **EMPRESAS** (N:1)
- **USUARIOS** ↔ **VACANTES_FAVORITAS** (1:N)
- **USUARIOS** ↔ **NOTIFICACIONES** (1:N)

## 🔧 **CONFIGURACIÓN DEL SISTEMA:**

### **Variables de Entorno:**
```bash
# Backend
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=cv_reception

# Frontend
REACT_APP_API_URL=http://localhost:3001/api
```

### **Puertos Utilizados:**
- **Frontend:** 3000 (React)
- **Backend:** 3001 (Node.js/Express)
- **Base de Datos:** 3306 (MySQL)

## 📁 **ESTRUCTURA DE ARCHIVOS:**

```
worknow-cv-app/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Vacantes.jsx
│   │   │   ├── UploadForm.jsx
│   │   │   ├── MiHojaDeVida.jsx
│   │   │   ├── PanelReclutadores.jsx
│   │   │   └── ...
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cvRoutes.js
│   │   └── vacantesRoutes.js
│   ├── uploads/
│   ├── server.js
│   └── database_schema_update.sql
└── package.json
```

## 🔌 **APIs Y ENDPOINTS:**

### **Autenticación:**
- `POST /api/register` - Registro de usuario
- `POST /api/login` - Login de usuario

### **CVs:**
- `POST /api/upload` - Subir CV
- `GET /api/hojas-de-vida/:correo` - Obtener CV por email
- `GET /api/hojas-de-vida` - Listar todos los CVs
- `DELETE /api/hojas-de-vida/:id` - Eliminar CV

### **Vacantes:**
- `GET /api/vacantes` - Listar todas las vacantes
- `GET /api/vacantes/:id` - Obtener vacante específica
- `POST /api/vacantes` - Crear nueva vacante
- `PUT /api/vacantes/:id` - Actualizar vacante
- `DELETE /api/vacantes/:id` - Eliminar vacante
- `GET /api/vacantes/buscar/:termino` - Buscar vacantes
- `GET /api/vacantes/categoria/:categoria` - Filtrar por categoría

### **Postulaciones:**
- `POST /api/postular` - Aplicar a vacante
- `GET /api/user-stats/:userId` - Estadísticas del usuario

## 🧪 **ESTRATEGIA DE TESTING:**

### **Tipos de Pruebas:**
1. **Pruebas Unitarias:** Componentes React individuales
2. **Pruebas de Integración:** APIs y base de datos
3. **Pruebas End-to-End:** Flujos completos de usuario

### **Herramientas de Testing:**
- **Jest:** Framework de testing
- **React Testing Library:** Testing de componentes React
- **Supertest:** Testing de APIs Express

## 🚀 **DESPLIEGUE Y PRODUCCIÓN:**

### **Requisitos del Sistema:**
- **Node.js:** v18.0.0 o superior
- **MySQL:** v8.0.0 o superior
- **NPM:** v8.0.0 o superior

### **Comandos de Despliegue:**
```bash
# Backend
cd backend
npm install
node server.js

# Frontend
cd frontend
npm install
npm start
```

## 📊 **MÉTRICAS Y MONITOREO:**

### **Indicadores de Rendimiento:**
- Tiempo de respuesta de APIs
- Tiempo de carga de páginas
- Uso de memoria y CPU
- Conexiones concurrentes a la base de datos

### **Logs y Debugging:**
- Logs de errores del servidor
- Logs de acceso a APIs
- Logs de operaciones de base de datos

## 🔒 **SEGURIDAD:**

### **Medidas Implementadas:**
- Validación de entrada en frontend y backend
- Sanitización de datos
- CORS configurado
- Autenticación basada en sesiones
- Almacenamiento seguro de contraseñas

### **Recomendaciones de Seguridad:**
- Implementar HTTPS en producción
- Agregar rate limiting
- Implementar JWT tokens
- Agregar validación de archivos
- Implementar auditoría de logs

## 📈 **ESCALABILIDAD:**

### **Consideraciones Futuras:**
- Implementar caché con Redis
- Agregar balanceador de carga
- Implementar microservicios
- Agregar CDN para archivos estáticos
- Implementar base de datos distribuida

---

**Documento generado:** Diciembre 2024  
**Versión:** 1.0.0  
**Estado:** Finalizado
