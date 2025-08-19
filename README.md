# 🚀 WORKNOW - Sistema de Recepción de CVs

## 📋 **DESCRIPCIÓN DEL PROYECTO**

**WorkNow** es una aplicación web completa desarrollada para la gestión y recepción de hojas de vida (CVs) que permite a los usuarios subir, gestionar y aplicar a vacantes laborales, y a los reclutadores evaluar candidatos de manera eficiente.

## 🎯 **OBJETIVOS DEL PROYECTO**

### **Objetivo Principal:**
Desarrollar una aplicación web completa para la gestión y recepción de hojas de vida (CVs) que permita a los usuarios subir, gestionar y aplicar a vacantes laborales, y a los reclutadores evaluar candidatos de manera eficiente.

### **Objetivos Específicos:**
1. **Gestión de Usuarios:** Sistema de registro, login y autenticación seguro
2. **Gestión de CVs:** Subida, almacenamiento y visualización de hojas de vida
3. **Sistema de Vacantes:** Publicación, búsqueda y aplicación a ofertas laborales
4. **Panel de Reclutadores:** Herramientas para evaluar y gestionar candidatos
5. **Sistema de Notificaciones:** Comunicación entre usuarios y reclutadores
6. **Interfaz Responsiva:** Diseño moderno y adaptable a diferentes dispositivos

## 🏗️ **ARQUITECTURA DEL SISTEMA**

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

## 📁 **ESTRUCTURA DEL PROYECTO**

```
worknow-cv-app/
├── 📁 frontend/                    # Aplicación React
│   ├── 📁 public/                  # Archivos públicos
│   ├── 📁 src/                     # Código fuente
│   │   ├── 📁 components/          # Componentes React
│   │   │   ├── 🏠 Home.jsx         # Dashboard principal
│   │   │   ├── 🔐 Login.jsx        # Formulario de login
│   │   │   ├── 📝 Register.jsx     # Formulario de registro
│   │   │   ├── 💼 Vacantes.jsx     # Módulo de vacantes
│   │   │   ├── 📤 UploadForm.jsx   # Subida de CV
│   │   │   ├── 👤 MiHojaDeVida.jsx # Perfil del usuario
│   │   │   ├── 🎯 PanelReclutadores.jsx # Panel de reclutadores
│   │   │   └── ...                 # Otros componentes
│   │   ├── 📁 __tests__/           # Pruebas unitarias
│   │   ├── 🚀 App.js               # Componente principal
│   │   └── 📄 index.js             # Punto de entrada
│   ├── 📦 package.json             # Dependencias del frontend
│   └── 📚 README.md                # Documentación del frontend
├── 📁 backend/                     # Servidor Node.js
│   ├── 📁 config/                  # Configuración
│   │   └── 🗄️ db.js               # Conexión a base de datos
│   ├── 📁 routes/                  # Rutas de la API
│   │   ├── 🔐 authRoutes.js        # Autenticación
│   │   ├── 📄 cvRoutes.js          # Gestión de CVs
│   │   └── 💼 vacantesRoutes.js    # Gestión de vacantes
│   ├── 📁 uploads/                 # Archivos subidos
│   ├── 📁 database/                # Scripts de base de datos
│   ├── 🚀 server.js                # Servidor principal
│   └── 🗄️ database_schema_update.sql # Esquema de BD
├── 📋 MANUAL_TECNICO.md            # Manual técnico completo
├── 👥 MANUAL_USUARIO.md            # Manual de usuario
├── ⚙️ MANUAL_INSTALACION.md        # Manual de instalación
├── 🎨 DIAGRAMAS_UML.md             # Diagramas UML del sistema
├── 📦 package.json                 # Dependencias del proyecto
└── 📚 README.md                    # Este archivo
```

## 🚀 **INSTALACIÓN Y CONFIGURACIÓN**

### **Requisitos Previos:**
- **Node.js:** Versión 18.0.0 o superior
- **MySQL:** Versión 8.0.0 o superior
- **NPM:** Versión 8.0.0 o superior

### **Pasos de Instalación:**

#### **1. Clonar el Repositorio:**
```bash
git clone https://github.com/tu-usuario/worknow-cv-app.git
cd worknow-cv-app
```

#### **2. Configurar Base de Datos:**
```bash
# Abrir MySQL Workbench
# Ejecutar el script: backend/database_schema_update.sql
```

#### **3. Configurar Backend:**
```bash
cd backend
npm install
# Editar config/db.js con tus credenciales de MySQL
node server.js
```

#### **4. Configurar Frontend:**
```bash
cd frontend
npm install
npm start
```

### **URLs de Acceso:**
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001
- **Base de Datos:** localhost:3306

## 🧪 **PRUEBAS UNITARIAS**

### **Ejecutar Pruebas:**
```bash
cd frontend
npm test
```

### **Componentes con Pruebas:**
1. **Login.test.js** - Pruebas del componente de login
2. **Vacantes.test.js** - Pruebas del módulo de vacantes
3. **UploadForm.test.js** - Pruebas del formulario de subida

### **Cobertura de Pruebas:**
- ✅ Renderizado de componentes
- ✅ Funcionalidad de formularios
- ✅ Validaciones de entrada
- ✅ Interacciones de usuario
- ✅ Estados de carga
- ✅ Navegación entre módulos

## 🔌 **APIs Y ENDPOINTS**

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

## 🗄️ **MODELO DE BASE DE DATOS**

### **Tablas Principales:**
- **usuarios** - Información de usuarios del sistema
- **hojas_de_vida** - CVs de los candidatos
- **vacantes** - Ofertas laborales disponibles
- **empresas** - Información de empresas
- **postulaciones** - Aplicaciones a vacantes
- **vacantes_favoritas** - Vacantes marcadas como favoritas
- **notificaciones** - Sistema de alertas y mensajes

### **Relaciones:**
- Usuarios ↔ Hojas de Vida (1:N)
- Usuarios ↔ Postulaciones (1:N)
- Vacantes ↔ Postulaciones (1:N)
- Vacantes ↔ Empresas (N:1)
- Usuarios ↔ Vacantes Favoritas (1:N)
- Usuarios ↔ Notificaciones (1:N)

## 🎨 **CARACTERÍSTICAS DE LA INTERFAZ**

### **Diseño Responsivo:**
- ✅ Adaptable a dispositivos móviles
- ✅ Diseño moderno con glassmorphism
- ✅ Animaciones y transiciones suaves
- ✅ Paleta de colores profesional

### **Componentes Principales:**
- **Dashboard:** Navegación centralizada
- **Formularios:** Validación en tiempo real
- **Modales:** Vistas detalladas de información
- **Filtros:** Búsqueda avanzada y filtrado
- **Paginación:** Navegación eficiente de resultados

## 🔒 **SEGURIDAD Y VALIDACIÓN**

### **Medidas Implementadas:**
- ✅ Validación de entrada en frontend y backend
- ✅ Sanitización de datos
- ✅ CORS configurado
- ✅ Autenticación basada en sesiones
- ✅ Almacenamiento seguro de contraseñas

### **Validaciones:**
- ✅ Formato de email
- ✅ Contraseñas seguras
- ✅ Tipos de archivo permitidos
- ✅ Tamaño máximo de archivos
- ✅ Campos obligatorios

## 📱 **FUNCIONALIDADES POR MÓDULO**

### **🏠 Dashboard Principal:**
- Navegación a todos los módulos
- Botón de cerrar sesión
- Información del usuario

### **🔐 Autenticación:**
- Registro de usuarios nuevos
- Login con validación
- Recuperación de contraseña (futuro)

### **📤 Subida de CV:**
- Formulario completo de información personal
- Subida de archivos (PDF, DOC, DOCX)
- Validación de campos
- Botón de limpiar formulario

### **👤 Mi Perfil:**
- Visualización del CV subido
- Opción de editar información
- Botón de eliminar CV
- Botón de refrescar datos

### **💼 Vacantes Disponibles:**
- Lista de todas las vacantes
- Búsqueda por texto
- Filtros avanzados (categoría, ubicación, contrato, experiencia, salario)
- Ordenamiento por diferentes criterios
- Vista detallada en modal
- Sistema de favoritos
- Aplicación directa a vacantes
- Paginación de resultados

### **🎯 Panel de Reclutadores:**
- Lista de todos los CVs recibidos
- Filtros por candidato
- Evaluación de candidatos
- Sistema de comentarios

### **🔍 Búsqueda y Filtros:**
- Búsqueda avanzada por múltiples criterios
- Filtros combinados
- Resultados en tiempo real

## 🚀 **DESPLIEGUE Y PRODUCCIÓN**

### **Build de Producción:**
```bash
cd frontend
npm run build
```

### **Configuración de Servidor:**
```bash
# Instalar PM2
npm install -g pm2

# Iniciar backend
cd backend
pm2 start server.js --name "worknow-backend"

# Configurar inicio automático
pm2 startup
pm2 save
```

### **Variables de Entorno:**
```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=cv_reception
NODE_ENV=production
```

## 📊 **MÉTRICAS Y MONITOREO**

### **Indicadores de Rendimiento:**
- Tiempo de respuesta de APIs
- Tiempo de carga de páginas
- Uso de memoria y CPU
- Conexiones concurrentes a la base de datos

### **Logs y Debugging:**
- Logs de errores del servidor
- Logs de acceso a APIs
- Logs de operaciones de base de datos

## 🔄 **MANTENIMIENTO Y ACTUALIZACIONES**

### **Actualizar Dependencias:**
```bash
# Backend
cd backend
npm update

# Frontend
cd frontend
npm update
```

### **Backup de Base de Datos:**
```bash
# Crear backup
mysqldump -u root -p cv_reception > backup_$(date +%Y%m%d).sql

# Restaurar backup
mysql -u root -p cv_reception < backup_20241201.sql
```

## 📚 **DOCUMENTACIÓN ADICIONAL**

### **Manuales Disponibles:**
- 📋 **MANUAL_TECNICO.md** - Documentación técnica completa
- 👥 **MANUAL_USUARIO.md** - Guía de usuario final
- ⚙️ **MANUAL_INSTALACION.md** - Instrucciones de instalación
- 🎨 **DIAGRAMAS_UML.md** - Diagramas UML del sistema

### **Contenido de los Manuales:**
- Arquitectura del sistema
- Modelo entidad-relación
- APIs y endpoints
- Configuración del sistema
- Solución de problemas
- Diagramas UML completos

## 🐛 **SOLUCIÓN DE PROBLEMAS COMUNES**

### **Error: "Cannot find module":**
```bash
# Solución: Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### **Error: "Port already in use":**
```bash
# Cambiar puerto en .env
PORT=3002

# O matar proceso en puerto 3001
lsof -ti:3001 | xargs kill -9
```

### **Error: "Access denied for user":**
```sql
-- Verificar permisos MySQL
GRANT ALL PRIVILEGES ON cv_reception.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### **CV no aparece en "Mi Perfil":**
- Verificar que el email coincida con el de registro
- Usar botón "Refrescar"
- Verificar conexión a la base de datos

## 🤝 **CONTRIBUCIÓN AL PROYECTO**

### **Cómo Contribuir:**
1. Fork del repositorio
2. Crear rama para nueva funcionalidad
3. Implementar cambios
4. Agregar pruebas unitarias
5. Crear Pull Request

### **Estándares de Código:**
- Usar ESLint y Prettier
- Seguir convenciones de React
- Documentar funciones complejas
- Mantener cobertura de pruebas

## 📞 **SOPORTE Y CONTACTO**

### **Recursos de Ayuda:**
- 📚 **Documentación:** Manuales técnicos incluidos
- 🐛 **Issues:** Reportar bugs en GitHub
- 💬 **Comunidad:** Foros de desarrollo
- 📧 **Email:** soporte@worknow.com

### **Horarios de Soporte:**
- **Lunes a Viernes:** 8:00 AM - 6:00 PM
- **Sábados:** 9:00 AM - 2:00 PM
- **Domingos:** Cerrado

## 📈 **ROADMAP FUTURO**

### **Funcionalidades Planificadas:**
- 🔐 **JWT Tokens** - Autenticación más segura
- 📧 **Notificaciones por Email** - Sistema de alertas
- 📊 **Dashboard de Estadísticas** - Métricas avanzadas
- 🔍 **Búsqueda Semántica** - IA para búsquedas
- 📱 **App Móvil** - Versión nativa para móviles
- 🌐 **Multiidioma** - Soporte para múltiples idiomas
- 🔗 **Integración con LinkedIn** - Importar perfiles
- 📈 **Analytics Avanzado** - Métricas de rendimiento

## 📄 **LICENCIA**

Este proyecto está bajo la licencia **MIT**. Ver el archivo `LICENSE` para más detalles.

## 👥 **AUTORES Y AGRADECIMIENTOS**

### **Equipo de Desarrollo:**
- **Desarrollador Principal:** [Tu Nombre]
- **Diseñador UI/UX:** [Nombre del Diseñador]
- **Tester:** [Nombre del Tester]

### **Tecnologías Utilizadas:**
- **React** - Framework de frontend
- **Node.js** - Runtime de backend
- **Express** - Framework web
- **MySQL** - Base de datos
- **Jest** - Framework de testing

---

## 🎯 **ESTADO DEL PROYECTO**

- ✅ **Versión:** 1.0.0
- ✅ **Estado:** Completamente funcional
- ✅ **Pruebas:** Implementadas y funcionando
- ✅ **Documentación:** Completa y actualizada
- ✅ **Manuales:** Técnico, Usuario e Instalación
- ✅ **Diagramas UML:** Completos y detallados
- ✅ **Git:** Inicializado y configurado

**¡El proyecto WorkNow está listo para producción!** 🚀

---

**Última actualización:** Diciembre 2024  
**Versión del README:** 1.0.0
