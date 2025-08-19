# 🎨 DIAGRAMAS UML - WORKNOW CV RECEPTION APP

## 📅 **INFORMACIÓN DEL DOCUMENTO:**
- **Proyecto:** WorkNow - Sistema de Recepción de CVs
- **Versión:** 1.0.0
- **Fecha:** Diciembre 2024
- **Tipo:** Diagramas UML de Clases y Secuencia

## 🏗️ **DIAGRAMA UML DE CLASES:**

### **Frontend - Componentes React:**

```mermaid
classDiagram
    class App {
        +state: Object
        +render() Component
        +handleNavigation() void
    }

    class Home {
        +state: Object
        +render() Component
        +handleLogout() void
        +navigateToModule() void
    }

    class Login {
        +state: {email, password, isLoading, showPassword}
        +handleSubmit() void
        +togglePassword() void
        +render() Component
    }

    class Register {
        +state: {email, password, confirmPassword, isLoading, showPassword, showConfirmPassword}
        +handleSubmit() void
        +validatePasswords() boolean
        +render() Component
    }

    class Vacantes {
        +state: {vacantes, filteredVacantes, loading, searchTerm, selectedVacante, showModal, favorites, currentPage, itemsPerPage, sortBy, sortOrder, filters}
        +fetchVacantes() void
        +applyFiltersAndSearch() void
        +toggleFavorite() void
        +openVacanteDetail() void
        +handlePostular() void
        +render() Component
    }

    class UploadForm {
        +state: {formData, isLoading}
        +handleSubmit() void
        +handleChange() void
        +clearForm() void
        +render() Component
    }

    class MiHojaDeVida {
        +state: {cv, loading, error}
        +fetchCV() void
        +handleDelete() void
        +handleGoToUpload() void
        +render() Component
    }

    class PanelReclutadores {
        +state: {cvs, loading, filters}
        +fetchCVs() void
        +evaluateCV() void
        +render() Component
    }

    App --> Home
    App --> Login
    App --> Register
    App --> Vacantes
    App --> UploadForm
    App --> MiHojaDeVida
    App --> PanelReclutadores

    Home --> Login
    Home --> Vacantes
    Home --> UploadForm
    Home --> MiHojaDeVida
    Home --> PanelReclutadores
```

### **Backend - Servicios y Rutas:**

```mermaid
classDiagram
    class Server {
        +app: Express
        +PORT: number
        +start() void
        +configureMiddleware() void
        +setupRoutes() void
    }

    class DatabaseConnection {
        +connection: MySQL
        +connect() Promise
        +query() Promise
        +close() void
    }

    class AuthController {
        +register() void
        +login() void
        +validateToken() boolean
    }

    class CVController {
        +uploadCV() void
        +getCVByEmail() void
        +getAllCVs() void
        +deleteCV() void
        +updateCV() void
    }

    class VacantesController {
        +getAllVacantes() void
        +getVacanteById() void
        +createVacante() void
        +updateVacante() void
        +deleteVacante() void
        +searchVacantes() void
        +filterByCategory() void
    }

    class PostulacionesController {
        +createPostulacion() void
        +getPostulacionesByUser() void
        +getPostulacionesByVacante() void
        +updateEstado() void
    }

    Server --> DatabaseConnection
    Server --> AuthController
    Server --> CVController
    Server --> VacantesController
    Server --> PostulacionesController

    AuthController --> DatabaseConnection
    CVController --> DatabaseConnection
    VacantesController --> DatabaseConnection
    PostulacionesController --> DatabaseConnection
```

### **Base de Datos - Entidades:**

```mermaid
classDiagram
    class Usuario {
        +id: INT (PK)
        +correo: VARCHAR(255) (UK)
        +contrasena: VARCHAR(255)
        +fecha_registro: TIMESTAMP
        +rol: ENUM('candidato', 'reclutador', 'admin')
    }

    class HojaDeVida {
        +id: INT (PK)
        +usuario_id: INT (FK)
        +nombre_completo: VARCHAR(255)
        +correo: VARCHAR(255)
        +telefono: VARCHAR(50)
        +direccion: VARCHAR(255)
        +fecha_nacimiento: DATE
        +nivel_educativo: VARCHAR(255)
        +experiencia_anios: VARCHAR(50)
        +perfil: TEXT
        +archivo: VARCHAR(255)
        +fecha_creacion: TIMESTAMP
        +fecha_actualizacion: TIMESTAMP
    }

    class Vacante {
        +id: INT (PK)
        +empresa_id: INT (FK)
        +titulo: VARCHAR(255)
        +descripcion: TEXT
        +ubicacion: VARCHAR(255)
        +categoria: VARCHAR(255)
        +tipo_contrato: VARCHAR(255)
        +experiencia: VARCHAR(255)
        +salario: DECIMAL(10,2)
        +beneficios: JSON
        +requisitos: JSON
        +responsabilidades: JSON
        +fecha_publicacion: DATE
        +fecha_cierre: DATE
        +estado: ENUM('activa', 'cerrada', 'suspendida')
    }

    class Empresa {
        +id: INT (PK)
        +nombre: VARCHAR(255)
        +descripcion: TEXT
        +ubicacion: VARCHAR(255)
        +contacto: VARCHAR(255)
        +sitio_web: VARCHAR(255)
        +fecha_registro: TIMESTAMP
    }

    class Postulacion {
        +id: INT (PK)
        +vacante_id: INT (FK)
        +usuario_id: INT (FK)
        +fecha_postulacion: TIMESTAMP
        +estado: ENUM('pendiente', 'revisada', 'aceptada', 'rechazada')
        +comentarios: TEXT
        +fecha_evaluacion: TIMESTAMP
    }

    class VacanteFavorita {
        +id: INT (PK)
        +vacante_id: INT (FK)
        +usuario_id: INT (FK)
        +fecha_agregado: TIMESTAMP
    }

    class Notificacion {
        +id: INT (PK)
        +usuario_id: INT (FK)
        +tipo: ENUM('postulacion', 'evaluacion', 'sistema')
        +mensaje: TEXT
        +fecha_creacion: TIMESTAMP
        +leida: BOOLEAN
    }

    Usuario ||--o{ HojaDeVida : "tiene"
    Usuario ||--o{ Postulacion : "realiza"
    Usuario ||--o{ VacanteFavorita : "marca"
    Usuario ||--o{ Notificacion : "recibe"
    
    Vacante ||--o{ Postulacion : "recibe"
    Vacante ||--o{ VacanteFavorita : "es marcada"
    Vacante }o--|| Empresa : "pertenece a"
```

## 🔄 **DIAGRAMAS UML DE SECUENCIA:**

### **1. Flujo de Registro de Usuario:**

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant B as Backend
    participant DB as Base de Datos

    U->>F: Llenar formulario de registro
    F->>F: Validar campos
    F->>B: POST /api/register
    B->>B: Validar datos
    B->>B: Encriptar contraseña
    B->>DB: INSERT INTO usuarios
    DB-->>B: Confirmación
    B-->>F: Respuesta exitosa
    F-->>U: Redirección a login
```

### **2. Flujo de Subida de CV:**

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant B as Backend
    participant DB as Base de Datos
    participant FS as Sistema de Archivos

    U->>F: Llenar formulario de CV
    U->>F: Seleccionar archivo
    F->>F: Validar formulario
    F->>B: POST /api/upload (FormData)
    B->>B: Validar archivo
    B->>FS: Guardar archivo
    FS-->>B: Ruta del archivo
    B->>DB: INSERT INTO hojas_de_vida
    DB-->>B: ID del CV
    B-->>F: Respuesta exitosa
    F-->>U: Confirmación y redirección
```

### **3. Flujo de Búsqueda de Vacantes:**

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant B as Backend
    participant DB as Base de Datos

    U->>F: Ingresar criterios de búsqueda
    F->>F: Aplicar filtros
    F->>B: GET /api/vacantes (con parámetros)
    B->>DB: SELECT con filtros
    DB-->>B: Resultados
    B->>B: Procesar y formatear datos
    B-->>F: Lista de vacantes
    F->>F: Renderizar resultados
    F-->>U: Mostrar vacantes filtradas
```

### **4. Flujo de Aplicación a Vacante:**

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    participant B as Backend
    participant DB as Base de Datos

    U->>F: Hacer clic en "Aplicar"
    F->>F: Verificar sesión
    F->>B: POST /api/postular
    B->>B: Validar datos
    B->>DB: INSERT INTO postulaciones
    DB-->>B: Confirmación
    B->>DB: SELECT para obtener datos del usuario
    DB-->>B: Datos del usuario
    B->>B: Crear notificación
    B->>DB: INSERT INTO notificaciones
    B-->>F: Respuesta exitosa
    F-->>U: Confirmación de aplicación
```

### **5. Flujo de Evaluación de CV (Reclutador):**

```mermaid
sequenceDiagram
    participant R as Reclutador
    participant F as Frontend
    participant B as Backend
    participant DB as Base de Datos

    R->>F: Acceder al panel de reclutadores
    F->>B: GET /api/hojas-de-vida
    B->>DB: SELECT todas las hojas de vida
    DB-->>B: Lista de CVs
    B-->>F: Datos de los CVs
    F-->>R: Mostrar lista de candidatos
    R->>F: Seleccionar CV para evaluar
    F->>F: Mostrar detalles del CV
    R->>F: Calificar candidato
    F->>B: PUT /api/postulaciones/:id
    B->>DB: UPDATE estado y comentarios
    DB-->>B: Confirmación
    B->>DB: INSERT notificación para candidato
    B-->>F: Respuesta exitosa
    F-->>R: Confirmación de evaluación
```

## 📊 **DIAGRAMA UML DE COMPONENTES:**

```mermaid
componentDiagram
    component "Frontend (React)" {
        component "Componentes de UI"
        component "Gestión de Estado"
        component "Navegación"
        component "Formularios"
    }

    component "Backend (Node.js)" {
        component "API REST"
        component "Controladores"
        component "Middleware"
        component "Validaciones"
    }

    component "Base de Datos" {
        component "MySQL Server"
        component "Tablas"
        component "Índices"
        component "Procedimientos"
    }

    component "Sistema de Archivos" {
        component "Uploads"
        component "CVs"
        component "Documentos"
    }

    "Frontend (React)" --> "Backend (Node.js)" : HTTP/HTTPS
    "Backend (Node.js)" --> "Base de Datos" : MySQL Connection
    "Backend (Node.js)" --> "Sistema de Archivos" : File I/O
```

## 🔗 **DIAGRAMA UML DE DEPLOYMENT:**

```mermaid
deploymentDiagram
    deployment "Cliente Web" {
        node "Navegador" {
            component "React App"
        }
    }

    deployment "Servidor de Aplicación" {
        node "Node.js Server" {
            component "Express App"
            component "API Routes"
            component "Business Logic"
        }
    }

    deployment "Base de Datos" {
        node "MySQL Server" {
            component "Database Engine"
            component "Tables & Data"
        }
    }

    deployment "Sistema de Archivos" {
        node "File Storage" {
            component "Upload Directory"
            component "CV Files"
        }
    }

    "Cliente Web" --> "Servidor de Aplicación" : HTTP/HTTPS (Port 3001)
    "Servidor de Aplicación" --> "Base de Datos" : MySQL (Port 3306)
    "Servidor de Aplicación" --> "Sistema de Archivos" : Local File System
```

## 📋 **LEGENDA DE SÍMBOLOS UML:**

### **Relaciones:**
- **||--o{** : Uno a muchos (1:N)
- **||--||** : Uno a uno (1:1)
- **}o--o{** : Muchos a muchos (M:N)
- **-->** : Dependencia/Comunicación
- **-->>** : Respuesta/Retorno

### **Modificadores de Acceso:**
- **+** : Público
- **-** : Privado
- **#** : Protegido
- **~** : Paquete

### **Tipos de Datos:**
- **String/VARCHAR** : Texto
- **Integer/INT** : Número entero
- **Boolean/BOOLEAN** : Verdadero/Falso
- **Date/DATE** : Fecha
- **Timestamp/TIMESTAMP** : Fecha y hora
- **JSON** : Objeto JSON
- **Text/TEXT** : Texto largo

## 🎯 **OBJETIVOS DE LOS DIAGRAMAS:**

1. **Visualización Clara:** Mostrar la estructura del sistema de manera comprensible
2. **Documentación Técnica:** Proporcionar referencia para desarrolladores
3. **Análisis de Arquitectura:** Identificar dependencias y relaciones
4. **Planificación de Desarrollo:** Guiar la implementación de nuevas funcionalidades
5. **Mantenimiento:** Facilitar la comprensión del código existente

---

**Documento generado:** Diciembre 2024  
**Versión:** 1.0.0  
**Estado:** Finalizado
