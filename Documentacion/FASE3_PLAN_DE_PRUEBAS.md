# FASE 3 - PLAN DE PRUEBAS DE SOFTWARE (WorkNow)

## 1. Información administrativa
- Proyecto: WorkNow CV Reception App
- Versión del plan: 1.0
- Responsable QA: [Nombre]
- Equipo de desarrollo: [Nombres]
- Fecha de elaboración: 21/08/2025
- Aprobación: [Nombre y firma]

## 2. Alcance y objetivos
- Objetivo general: Validar que los módulos cumplan requerimientos y criterios de aceptación.
- Objetivos específicos:
  - Verificar funcionalidades críticas (Login, Subida de CV, Vacantes).
  - Asegurar integridad de datos en MySQL.
  - Validar integración Frontend–Backend.

## 3. Nivel y tipos de prueba
- Niveles: Unidad, Integración, Sistema.
- Tipos: Funcionales, No funcionales (usabilidad básica), Regresión selectiva.

## 4. Entorno de prueba
- SO: Windows 10/11
- Navegadores: Chrome 124+, Edge 124+
- Backend: Node.js 18, Express 5, puerto 3001
- Frontend: React 19, puerto 3000
- BD: MySQL 8, schema `cv_reception`

## 5. Gestión de datos de prueba
- Usuario demo: test@worknow.com / ********
- Vacantes semilla: ver `backend/database_schema_update.sql`.
- Limpieza: reiniciar tablas con script SQL si es necesario.

## 6. Riesgos y supuestos
- Riesgo: backend no iniciado → Mitigación: checklist previo.
- Riesgo: módulos en desarrollo → Mitigación: scope congelado para Fase 3.

## 7. Criterios
- Inicio: Ambiente operativo, datos de prueba cargados.
- Suspensión: Incidentes bloqueantes P1.
- Salida/aceptación: 0 P1, ≤2 P2 abiertos con plan, 100% casos críticos ejecutados.

## 8. Matriz de trazabilidad (resumen)
| Requisito | Módulo | Caso | Criterio |
|---|---|---|---|
| R-LOGIN-01 | Login | TC-LOGIN-001 | Ingreso exitoso |
| R-CV-01 | UploadForm | TC-CV-001 | Guarda y redirige |
| R-VAC-01 | Vacantes | TC-VAC-001 | Filtra por texto |

## 9. Plan de ejecución
- Orden: Login → Subida de CV → Vacantes → MisCVs → MiHojaDeVida.
- Evidencias: capturas de pantalla y videos cortos.

## 10. Reporte y métricas
- Métricas: %ejecución, %aprobación, defectos por severidad.
- Formato de reporte: PDF “Reporte de plan de pruebas ejecutadas”.

## 11. Plantilla de caso de prueba (referencia)
Campos obligatorios por caso:
- Información administrativa: Proyecto, Módulo probado, Responsable, Autor, Fecha y hora.
- Nivel de prueba.
- Propósito (factor que se prueba).
- Descripción de la prueba.
- Instrucciones paso a paso.
- Precondiciones.
- Datos de prueba.
- Criterios de aceptación.
- Resultado esperado.
- Resultado obtenido.
- Evidencia (captura o ruta al archivo).
- Estado: Aprobado / En seguimiento / Rechazado.
- Severidad si falla: Alto/Medio/Bajo.

## 12. Checklist previo a ejecución
- [ ] Backend en 3001 operativo
- [ ] Frontend en 3000 operativo
- [ ] BD accesible y con schema actualizado
- [ ] Credenciales demo disponibles

---
Este plan sigue la estructura de ISO 29119 adaptada al alcance del proyecto.
