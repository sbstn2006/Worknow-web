# 👥 MANUAL DE USUARIO - WORKNOW CV RECEPTION APP

## 📅 **INFORMACIÓN DEL MANUAL:**
- **Aplicación:** WorkNow - Sistema de Recepción de CVs
- **Versión:** 1.0.0
- **Fecha:** Diciembre 2024
- **Audiencia:** Usuarios finales y reclutadores

## 🎯 **OBJETIVO DEL MANUAL:**
Este manual proporciona instrucciones detalladas para que los usuarios puedan utilizar todas las funcionalidades de la aplicación WorkNow de manera eficiente y efectiva.

## 🚀 **INICIO DE SESIÓN Y REGISTRO:**

### **Registro de Usuario Nuevo:**
1. **Acceder a la aplicación:** Abrir el navegador y ir a `http://localhost:3000`
2. **Ir al registro:** Hacer clic en "Register here" o navegar a `/register`
3. **Completar formulario:**
   - **Email:** Ingresar correo electrónico válido
   - **Contraseña:** Crear contraseña segura (mínimo 6 caracteres)
   - **Confirmar Contraseña:** Repetir la contraseña
4. **Enviar:** Hacer clic en "Register" o presionar Enter
5. **Confirmación:** El sistema mostrará mensaje de éxito y redirigirá al login

### **Inicio de Sesión:**
1. **Acceder al login:** Navegar a `/login` o hacer clic en "Login"
2. **Ingresar credenciales:**
   - **Email:** Correo electrónico registrado
   - **Contraseña:** Contraseña creada durante el registro
3. **Iniciar sesión:** Hacer clic en "Login" o presionar Enter
4. **Acceso:** El sistema redirigirá al dashboard principal (`/home`)

## 🏠 **DASHBOARD PRINCIPAL (HOME):**

### **Navegación Principal:**
El dashboard muestra las siguientes opciones principales:

#### **Para Candidatos:**
- **📝 Subir CV:** Acceso al formulario de subida de hoja de vida
- **👤 Mi Perfil:** Ver y gestionar CV personal
- **💼 Ver Vacantes:** Explorar ofertas laborales disponibles
- **🔍 Búsqueda y Filtros:** Herramientas avanzadas de búsqueda
- **📋 Mis CVs:** Lista de hojas de vida subidas

#### **Para Reclutadores:**
- **🎯 Panel de Reclutadores:** Gestión de candidatos y CVs
- **📊 Estadísticas:** Métricas de postulaciones y candidatos

#### **General:**
- **ℹ️ Quiénes Somos:** Información sobre la empresa
- **🔔 Notificaciones:** Sistema de alertas y mensajes
- **🚪 Cerrar Sesión:** Salir de la aplicación

## 📝 **MÓDULO: SUBIR CV (UPLOAD FORM):**

### **Proceso de Subida:**
1. **Acceder:** Desde el dashboard, hacer clic en "📝 Subir CV"
2. **Completar información personal:**
   - **Nombre Completo:** Nombre y apellidos
   - **Email:** Correo electrónico (debe coincidir con el de registro)
   - **Teléfono:** Número de contacto
   - **Dirección:** Dirección completa
   - **Fecha de Nacimiento:** Seleccionar del calendario
   - **Nivel Educativo:** Seleccionar opción del menú desplegable
   - **Años de Experiencia:** Número de años en el campo
   - **Perfil Profesional:** Descripción personal y objetivos
3. **Adjuntar archivo:**
   - **Seleccionar archivo:** Hacer clic en "Choose File"
   - **Formato:** PDF, DOC, DOCX (máximo 5MB)
   - **Nombre:** El archivo debe tener un nombre descriptivo
4. **Enviar:** Hacer clic en "Enviar"
5. **Confirmación:** El sistema mostrará mensaje de éxito y redirigirá a "Mi Perfil"

### **Funciones Adicionales:**
- **🔄 Limpiar Formulario:** Borrar todos los campos
- **← Volver al Inicio:** Regresar al dashboard principal

## 👤 **MÓDULO: MI PERFIL (MI HOJA DE VIDA):**

### **Visualización del CV:**
1. **Acceder:** Desde el dashboard, hacer clic en "👤 Mi Perfil"
2. **Ver información:** El sistema mostrará todos los datos del CV subido
3. **Información visible:**
   - Datos personales completos
   - Archivo adjunto (con opción de descarga)
   - Fecha de última actualización

### **Funciones Disponibles:**
- **🔄 Refrescar:** Actualizar la información del CV
- **🗑️ Eliminar CV:** Borrar la hoja de vida actual
- **📝 Editar:** Modificar información existente
- **← Volver al Inicio:** Regresar al dashboard

### **Solución de Problemas:**
- **CV no aparece:** Verificar que el email coincida con el de registro
- **Error de carga:** Hacer clic en "Refrescar" o verificar conexión
- **Datos desactualizados:** Usar botón "Refrescar"

## 💼 **MÓDULO: VACANTES DISPONIBLES:**

### **Exploración de Vacantes:**
1. **Acceder:** Desde el dashboard, hacer clic en "💼 Ver Vacantes"
2. **Vista general:** Se muestran todas las vacantes disponibles en formato de tarjetas

### **Búsqueda y Filtros:**
1. **Búsqueda por texto:**
   - **Campo de búsqueda:** Escribir palabras clave
   - **Búsqueda automática:** Los resultados se filtran en tiempo real
2. **Filtros avanzados:**
   - **Categoría:** Seleccionar área profesional
   - **Ubicación:** Filtrar por ciudad o región
   - **Tipo de Contrato:** Tiempo completo, parcial, freelance
   - **Experiencia:** Nivel requerido
   - **Rango Salarial:** Salario mínimo y máximo
   - **Empresa:** Filtrar por empresa específica
3. **Limpiar filtros:** Hacer clic en "Limpiar Filtros" para resetear

### **Ordenamiento:**
- **Por fecha:** Más recientes primero
- **Por salario:** Mayor a menor o viceversa
- **Por título:** Orden alfabético
- **Por empresa:** Orden alfabético

### **Funciones de Vacantes:**
- **❤️ Favoritos:** Agregar/remover de favoritos
- **📋 Aplicar:** Enviar postulación a la vacante
- **👁️ Ver Detalles:** Abrir modal con información completa

### **Vista Detallada:**
Al hacer clic en "Ver Detalles" se abre un modal con:
- Descripción completa del puesto
- Requisitos detallados
- Beneficios ofrecidos
- Responsabilidades
- Información de la empresa
- Fecha de cierre
- Botón de aplicación

### **Paginación:**
- **Navegación:** Usar botones de página anterior/siguiente
- **Elementos por página:** Seleccionar cantidad (10, 20, 50)
- **Información:** Mostrar página actual y total de páginas

## 🎯 **MÓDULO: PANEL DE RECLUTADORES:**

### **Acceso:**
1. **Navegar:** Desde el dashboard, hacer clic en "🎯 Panel de Reclutadores"
2. **Permisos:** Solo usuarios con rol de reclutador pueden acceder

### **Funcionalidades:**
- **📋 Lista de CVs:** Ver todas las hojas de vida recibidas
- **🔍 Filtros:** Buscar por nombre, email, experiencia
- **📊 Evaluación:** Calificar candidatos
- **📧 Contacto:** Enviar mensajes a candidatos
- **📈 Estadísticas:** Métricas de postulaciones

## 🔍 **MÓDULO: BÚSQUEDA Y FILTROS:**

### **Búsqueda Avanzada:**
1. **Acceder:** Desde el dashboard, hacer clic en "🔍 Búsqueda y Filtros"
2. **Criterios de búsqueda:**
   - **Palabras clave:** Términos específicos del puesto
   - **Ubicación:** Ciudad o región
   - **Categoría:** Área profesional
   - **Experiencia:** Nivel requerido
   - **Salario:** Rango salarial
3. **Aplicar filtros:** Hacer clic en "Buscar"
4. **Resultados:** Se muestran vacantes que coinciden con los criterios

## ℹ️ **MÓDULO: QUIÉNES SOMOS:**

### **Información de la Empresa:**
1. **Acceder:** Desde el dashboard, hacer clic en "ℹ️ Quiénes Somos"
2. **Contenido disponible:**
   - Historia de la empresa
   - Misión y visión
   - Valores corporativos
   - Equipo de trabajo
   - Información de contacto

## 🔔 **MÓDULO: NOTIFICACIONES:**

### **Sistema de Alertas:**
1. **Acceder:** Desde el dashboard, hacer clic en "🔔 Notificaciones"
2. **Tipos de notificaciones:**
   - **Postulaciones:** Confirmación de aplicación a vacante
   - **Actualizaciones:** Cambios en estado de postulación
   - **Mensajes:** Comunicaciones de reclutadores
   - **Recordatorios:** Fechas importantes

### **Gestión de Notificaciones:**
- **📖 Marcar como leída:** Hacer clic en la notificación
- **🗑️ Eliminar:** Borrar notificaciones antiguas
- **📧 Responder:** Contestar mensajes directamente

## 🚪 **CERRAR SESIÓN:**

### **Proceso de Salida:**
1. **Acceder:** Desde cualquier módulo, hacer clic en "🚪 Cerrar Sesión"
2. **Confirmación:** El sistema cerrará la sesión
3. **Redirección:** Se regresa a la página de login
4. **Seguridad:** Se eliminan los datos de sesión del navegador

## 🔧 **SOLUCIÓN DE PROBLEMAS COMUNES:**

### **Error de Login:**
- **Verificar credenciales:** Email y contraseña correctos
- **Revisar conexión:** Verificar conexión a internet
- **Limpiar caché:** Borrar datos del navegador

### **CV no se sube:**
- **Verificar formato:** Solo PDF, DOC, DOCX
- **Tamaño del archivo:** Máximo 5MB
- **Conexión:** Verificar estabilidad de internet
- **Permisos:** Verificar permisos del navegador

### **Vacantes no cargan:**
- **Refrescar página:** Usar F5 o botón de recarga
- **Verificar servidor:** Contactar al administrador
- **Limpiar filtros:** Resetear criterios de búsqueda

### **Error de navegación:**
- **Verificar URL:** Asegurar que la ruta sea correcta
- **Volver al inicio:** Usar botón "← Volver al Inicio"
- **Reiniciar sesión:** Cerrar y volver a iniciar sesión

## 📱 **USO EN DISPOSITIVOS MÓVILES:**

### **Características Responsivas:**
- **Adaptación automática:** La interfaz se ajusta al tamaño de pantalla
- **Navegación táctil:** Optimizada para dispositivos touch
- **Menús colapsables:** Se adaptan a pantallas pequeñas
- **Formularios móviles:** Campos optimizados para móviles

### **Recomendaciones:**
- **Orientación:** Usar orientación vertical para mejor experiencia
- **Zoom:** Evitar hacer zoom excesivo
- **Navegador:** Usar navegadores actualizados

## 🔒 **SEGURIDAD Y PRIVACIDAD:**

### **Protección de Datos:**
- **Sesiones seguras:** Las sesiones se cierran automáticamente
- **Datos personales:** Solo visibles para el usuario y reclutadores autorizados
- **Archivos:** Los CVs se almacenan de forma segura
- **Comunicación:** Las comunicaciones están encriptadas

### **Recomendaciones del Usuario:**
- **Contraseña segura:** Usar contraseñas complejas
- **Cerrar sesión:** Siempre cerrar sesión al terminar
- **No compartir credenciales:** Mantener credenciales privadas
- **Verificar URL:** Asegurar que esté en el sitio correcto

## 📞 **CONTACTO Y SOPORTE:**

### **Canales de Ayuda:**
- **📧 Email de soporte:** soporte@worknow.com
- **📱 Teléfono:** +1-800-WORKNOW
- **💬 Chat en vivo:** Disponible en horario laboral
- **📚 Base de conocimientos:** Documentación online

### **Horarios de Atención:**
- **Lunes a Viernes:** 8:00 AM - 6:00 PM
- **Sábados:** 9:00 AM - 2:00 PM
- **Domingos:** Cerrado

---

**Manual generado:** Diciembre 2024  
**Versión:** 1.0.0  
**Estado:** Finalizado
