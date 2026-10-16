---
titulo: El ciclo de vida de una alerta
subtitulo: true
---

# El ciclo de vida de una alerta

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Una regla salta y aparece una alerta en la cola. Lo que pasa desde ese momento hasta que se cierra es casi todo el trabajo de un analista N1.

```text
Triaje ──► Asignación ──► Caso ──► Playbook ──► Veredicto ──► Documentación ──► Cierre
```

| Paso | Qué se hace |
|---|---|
| **Triaje** | Leer la alerta y decidir si merece investigarse ya, según su severidad y el activo afectado |
| **Asignación** | Alguien se la queda. Evita que dos analistas trabajen la misma alerta y deja claro quién responde de ella |
| **Caso** | Si va en serio, se abre un caso en la herramienta de gestión ([Detección y análisis](#/respuesta/deteccion)) para reunir evidencias |
| **Playbook** | Se siguen los pasos estándar para ese tipo de alerta |
| **Veredicto** | Se decide qué era de verdad |
| **Documentación** | Qué se miró, qué se encontró y por qué se concluye lo que se concluye |
| **Cierre** | O se escala a respuesta a incidentes, o se cierra con su veredicto |

> [!TIP]
> Antes de correlacionar, pasa todas las horas a **UTC**. Mezclar zonas horarias entre el SIEM, el EDR y el correo es una fuente clásica de líneas temporales equivocadas.

## El veredicto

Hay más casos que "verdadero" y "falso":

| Veredicto | Qué significa | Qué se hace |
|---|---|---|
| **True Positive** | Actividad maliciosa real | Responder |
| **Benign True Positive** | La regla acierta, pero la actividad está autorizada: un pentest, un administrador usando PsExec, un escaneo interno programado | Cerrar y, si se repite, excluirla de la regla |
| **False Positive** | La regla salta por algo que no es lo que busca | Ajustar la regla |
| **False Negative** | Hubo ataque y la regla no saltó | No lo verás en la cola: sale en *threat hunting* o en el análisis posterior a un incidente |

El Benign True Positive es el más frecuente en muchos SOC, y es el que alimenta el ajuste de las reglas: cada uno que se repite sin excluir es ruido que esconde las alertas buenas. Cómo se reduce está en [Reglas de detección](#/siem/reglas).

> [!IMPORTANT]
> Cerrar una alerta como falso positivo sin haberlo comprobado es la forma más directa de convertirla en un false negative. Si no estás seguro, se documenta qué falta por mirar y se escala.

## Playbook y runbook

Un **playbook** es el flujo estándar para un tipo de alerta: qué se mira, en qué orden y qué decisión se toma en cada punto. No es solo una ayuda para juniors:

- Da **consistencia**: dos analistas ante la misma alerta llegan a la misma conclusión.
- Deja **trazabilidad** para auditoría.
- Es la base para **automatizar** con un SOAR.

Algunos equipos distinguen el *playbook* (el proceso de alto nivel, con sus decisiones) del *runbook* (los pasos técnicos concretos de cada punto). No todo el mundo usa esa distinción.
