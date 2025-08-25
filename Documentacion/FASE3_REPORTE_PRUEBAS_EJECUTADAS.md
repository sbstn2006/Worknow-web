# REPORTE DE PLAN DE PRUEBAS EJECUTADAS

Proyecto: WorkNow CV Reception App  
Versión: 1.0  
Fecha: 21/08/2025  
Responsable QA: [Nombre]  
Aprobación: [Firma]

---

## 1. Introducción
Este documento consolida los resultados de las pruebas aplicadas a la solución WorkNow, con el fin de mantener la trazabilidad del comportamiento del software y definir acciones correctivas. Se basa en el Plan de Pruebas (FASE3_PLAN_DE_PRUEBAS.md), en los Casos de Prueba (FASE3_CASOS_DE_PRUEBA.csv) y en las evidencias capturadas.

## 2. Alcance
- Módulos cubiertos: Login, UploadForm, MiHojaDeVida, Vacantes.  
- Niveles: Unidad, Integración, Sistema.  
- Entorno: Windows 10/11, Chrome/Edge, Node 18, React 19, MySQL 8.

## 3. Resumen de ejecución
- Total de casos definidos: 11  
- Casos ejecutados: [completar]  
- Aprobados: [completar]  
- En seguimiento: [completar]  
- Rechazados: [completar]

### 3.1 Métricas
- % Ejecución = ejecutados / definidos × 100  
- % Aprobación = aprobados / ejecutados × 100  
- Defectos por severidad: P1/P2/P3

## 4. Detalle de casos ejecutados
Adjuntar tabla resumida (extraída del CSV). Ejemplo:

| ID | Módulo | Propósito | Resultado esperado | Resultado obtenido | Estado | Evidencia |
|---|---|---|---|---|---|---|
| TC-LOGIN-001 | Login | Ingreso exitoso | Redirige a /home | Redirige a /home | Aprobado | evidencias/TC-LOGIN-001.png |
| TC-CV-001 | UploadForm | Guarda CV | Redirige a /mi-hoja-de-vida | [completar] | En seguimiento | evidencias/TC-CV-001.png |
| TC-VAC-001 | Vacantes | Buscar "React" | Filtra listado | [completar] | [estado] | evidencias/TC-VAC-001.png |

Nota: Ver documento `FASE3_EVIDENCIAS.md` para el listado completo de capturas.

## 5. Incidentes detectados
- ID: INC-001  
  - Caso: TC-VAC-005  
  - Severidad: Alto  
  - Descripción: Respuesta /postular intermitente.  
  - Evidencia: evidencias/TC-VAC-005.png  
  - Acción: Revisar validación de correo y manejar errores 5xx.

(Agregar más si aplica)

## 6. Conclusiones
- Criterios de salida: 0 incidentes P1 abiertos; ejecución de casos críticos completada.  
- Resultado general: [Aprobado/En seguimiento/Rechazado].

## 7. Recomendaciones
- Automatizar pruebas de regresión para Login y Vacantes.  
- Integrar reporte de cobertura.  
- Programar hardening del endpoint /postular.

## 8. Firmas
- QA Responsable: ______________________ Fecha: ____/____/____  
- Líder Técnico: _______________________ Fecha: ____/____/____

---
Anexos:
- `FASE3_CASOS_DE_PRUEBA.csv`  
- Carpeta `evidencias/`
