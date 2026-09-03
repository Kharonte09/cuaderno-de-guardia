---
titulo: Qué es la respuesta a incidentes
subtitulo: true
---

# Qué es la respuesta a incidentes

La **metodología que usa una organización para responder y gestionar un ciberataque**.

**Objetivo:** analizar, contener, erradicar y recuperar los sistemas lo más rápido posible.

**Características:**

- Enfoque **reactivo**: empieza cuando algo ya ha pasado.
- Alineado con la recuperación ante desastres.
- Reduce el tiempo y el coste de recuperación.
- Mejora la organización a futuro mediante las lecciones aprendidas.

## Evento e incidente

La distinción que lo ordena todo:

> Todos los **incidentes** son eventos.
> No todos los **eventos** llegan a ser incidentes.

### Evento de seguridad

- Cualquier actividad con **posibles implicaciones de seguridad**.
- **No hay daño confirmado**.
- Ocurren constantemente.
- Normalmente se bloquean automáticamente, se registran y se monitorizan.

### Incidente de seguridad

- Un evento que **sí causa daño real**.
- Con impacto en sistemas, datos u operaciones.

| | Evento | Incidente |
|---|---|---|
| **Frecuencia** | Constante | Ocasional |
| **Daño** | No confirmado | Real |
| **Quién lo lleva** | Analistas del SOC | Especialistas de IR |

> [!TIP]
> La frontera entre los dos la marca **una decisión de una persona**, no una herramienta. Declarar un incidente activa procesos, gente y a veces obligaciones legales de notificación, así que ese momento se documenta con hora y con quién lo decidió.

## El ciclo de vida NIST

Cuatro fases, y la última realimenta a la primera.

```text
   ┌──────────────────────────────────────────┐
   │                                          ▼
1. Preparación   2. Detección y   3. Contención,   4. Post-incidente
                    análisis         erradicación
                                     y recuperación
```

### 1. Preparación

La primera línea de defensa, y la fase donde más se decide el resultado. Es lo que hace posible prevenir y responder mejor.

### 2. Detección y análisis

Identificar los eventos activos y determinar cuáles son incidentes de verdad.

### 3. Contención, erradicación y recuperación

- **Contención** — limitar el daño.
- **Erradicación** — eliminar la causa.
- **Recuperación** — restaurar los sistemas.

### 4. Post-incidente

Mejorar procesos y defensas. Reconstruir qué pasó y cuándo.

> [!IMPORTANT]
> La fase 1 es la que más rinde y la que menos se hace, porque es la única que se trabaja cuando no hay urgencia. Todo lo que no esté preparado antes —contactos, permisos, herramientas, accesos— habrá que improvisarlo con el incidente encima.

## CERT y CSIRT

Equipos especializados en respuesta a incidentes. Surgieron por el volumen creciente de ataques.

Se encargan de **coordinar y gestionar** los incidentes de seguridad de TI, y de evaluar su impacto sobre la organización o sobre el gobierno del que dependen.
