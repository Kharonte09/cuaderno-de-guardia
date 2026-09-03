---
titulo: Lecciones aprendidas e informes
subtitulo: true
---

# Lecciones aprendidas e informes

La fase posterior a la recuperación. El objetivo es analizar **qué salió bien, qué se puede mejorar** y cómo reforzar los controles y los procesos para la próxima vez.

## La reunión post-incidente

Todas las partes implicadas se reúnen para revisar el incidente **de principio a fin**.

### ¿Qué se hizo bien?

Se empieza por aquí, y no es cortesía: si solo se enumeran fallos, la gente deja de participar y las reuniones se vacían.

### ¿Qué podría mejorarse?

Identificar las debilidades permite prepararse mejor y reducir el impacto de futuros ataques. Se analizan los problemas que hubo: fallos en la recopilación de pruebas, falta de recursos, accesos que no se tenían, contactos que no aparecían.

> [!TIP]
> La reunión funciona si se habla de **procesos y no de personas**. "No teníamos permiso para aislar el endpoint" es accionable. "Fulano tardó en aislarlo" no lo es, y además garantiza que nadie cuente lo que de verdad pasó en la siguiente.

## Documentación

Mantener actualizados el **plan de respuesta a incidentes (IRP)** y los **playbooks** es lo que permite actuar rápido.

Registrar cada incidente en detalle permite que los analistas consulten casos anteriores y se guíen por ellos. Eso incluye:

- Actualizar las notas de investigación.
- Adjuntar los artefactos relevantes: ficheros, logs, correos.
- Guardar cualquier información crítica del incidente.

## Métricas

Valores numéricos para evaluación cuantitativa, que permiten evaluar, comparar y seguir el rendimiento. En respuesta a incidentes destacan las áreas donde el equipo respondió bien o mal.

### De impacto

| Métrica | Qué mide |
|---|---|
| **SLA** — Service Level Agreement | El compromiso acordado con el cliente o el negocio: en cuánto tiempo hay que responder |
| **SLO** — Service Level Objective | El objetivo interno que el equipo se marca, normalmente más exigente que el SLA |
| **Tasa de escalamiento** | Qué proporción de casos hay que subir a un nivel superior |

### Basadas en tiempo

| Métrica | Qué mide |
|---|---|
| **MTTD** — Mean Time To Detect | Cuánto se tarda de media en detectar |
| **MTTR** — Mean Time To Respond | Cuánto se tarda de media en responder |
| **Incidentes a lo largo del tiempo** | La tendencia: si suben, bajan o cambian de tipo |
| **Tiempo de remediación** | Cuánto se tarda en dejarlo resuelto del todo |

### Por tipo de incidente

| Métrica | Qué mide |
|---|---|
| **Incidentes acumulados por tipo** | Dónde se concentra el problema |
| **Alertas creadas por incidente** | Cuánto ruido genera cada caso real |
| **IPC** — coste por incidente | Lo que cuesta de media gestionar uno |

> [!WARNING]
> Toda métrica que se convierte en objetivo se puede maquillar. Si al equipo se le mide solo por MTTR, la forma más rápida de mejorarla es cerrar casos antes de tiempo. Las métricas se leen juntas, nunca de una en una.

---

# El informe de incidente

No hay un formato estándar, pero suele tener **cuatro secciones**:

## 1. Resumen ejecutivo

Visión de alto nivel para dirección. Destaca el **impacto en el negocio**, los costes y cómo el equipo de seguridad mitigó el daño.

Breve, claro y **sin jerga técnica**.

## 2. Cronología

Fecha, hora y eventos clave, en orden cronológico. Es lo que permite entender el caso sin haberlo vivido.

## 3. Investigación

Paso a paso: detección, análisis, contención, erradicación, recuperación y actividad posterior. Aquí se identifican también las lecciones y las necesidades de mejora.

Va dirigida a **personal técnico**, así que aquí sí hay detalle completo y lenguaje especializado.

## 4. Apéndice

Información voluminosa que respalda la investigación: tablas, gráficos, listas largas de indicadores.

## Cómo escribirlo

**Piensa en la audiencia de cada sección.** El resumen ejecutivo y la investigación se leen por gente distinta y con objetivos distintos. Escribirlos igual falla con las dos.

**Sigue el patrón "observación → evidencia".** Cada afirmación va respaldada por su prueba: capturas de pantalla, registros del SIEM, documentos maliciosos, referencia a la técnica de **MITRE ATT&CK** cuando corresponda.

**Las capturas llevan pie de foto.** Un subtítulo breve que resuma qué se está viendo, para que lo entienda alguien que no conoce esa herramienta. Una captura sin explicar no es evidencia, es decoración.
