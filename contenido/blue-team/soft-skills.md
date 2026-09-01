---
titulo: Soft skills
subtitulo: true
---

# Soft skills

Las habilidades que no son técnicas pero deciden buena parte del trabajo en un SOC: cómo investigas, cómo explicas lo que has encontrado y cómo funcionas dentro de un equipo a turnos.

## Hard skills y soft skills

| | Hard skills | Soft skills |
|---|---|---|
| **Qué son** | Conocimiento técnico concreto | Forma de trabajar y de relacionarse |
| **Cómo se aprenden** | Cursos, laboratorio, documentación | Práctica, repetición y corrección |
| **Cómo se demuestran** | Certificación, examen, prueba técnica | Observando cómo trabajas |
| **Caducan** | Sí, con las versiones y las herramientas | No |
| **Ejemplos** | Sigma, Wireshark, KQL, Volatility, AD | Comunicación escrita, criterio, trabajo en equipo |

Las hard skills abren la puerta: sin ellas no pasas la prueba técnica. Las soft skills deciden lo que pasa después, y son lo que se cita cuando alguien no supera el periodo de prueba o no promociona.

> [!NOTE]
> No son excluyentes ni opuestas. Un analista con buen método y mala base técnica se atasca; uno con buena base y sin método investiga mucho y concluye poco.

## Cuáles importan en un SOC

### Comunicación escrita

Es la que más se usa y la que menos se practica. La mitad del trabajo consiste en dejar por escrito qué pasó, qué comprobaste y qué recomiendas.

**Qué se espera:**
- Un ticket que otra persona pueda entender sin preguntarte nada.
- Separar hecho de hipótesis: *"la IP figura en AbuseIPDB"* frente a *"parece un ataque dirigido"*.
- Adaptar el nivel: al cliente no se le escribe igual que al L3.
- Escribir en el momento, no al final del turno.

**Cómo se entrena:** escribe el informe de cada reto de laboratorio como si fuera un ticket real, con evidencias y conclusión.

### Pensamiento crítico

Distinguir lo que sabes de lo que supones, y no dejar que la primera hipótesis cierre la investigación.

**Qué se espera:**
- Buscar la evidencia que **contradice** tu hipótesis, no sólo la que la confirma.
- Preguntarte qué otra explicación encaja con los mismos datos.
- No dar por bueno un veredicto automático sin comprobarlo.
- Reconocer cuándo la información es insuficiente para concluir.

### Gestión del tiempo y priorización

Siempre hay más alertas que horas. Saber qué mirar primero es una habilidad en sí.

**Qué se espera:**
- Priorizar por activo e impacto, no por antigüedad de la alerta.
- Marcar un límite de tiempo por alerta y escalar al llegar a él.
- Distinguir lo urgente de lo importante.

### Trabajo en equipo y relevo

Un SOC funciona 24×7, así que tu trabajo siempre lo continúa otra persona.

**Qué se espera:**
- Dejar el traspaso por escrito, con lo pendiente y lo que ya descartaste.
- Pedir ayuda pronto en vez de atascarte tres horas.
- Compartir lo aprendido: si resolviste algo raro, documéntalo para el resto.

### Saber decir "no lo sé"

En seguridad, inventarse una respuesta tiene consecuencias reales. Reconocer el límite de tu conocimiento y escalar es una señal de criterio, no de debilidad.

### Aguante y gestión del estrés

Turnos de noche, incidentes que se alargan, y mucha rutina entre medias.

**Qué se espera:**
- Mantener el método cuando hay presión, que es justo cuando se cometen los errores.
- No arrastrar el cansancio a las conclusiones: si estás fundido, se traspasa, no se cierra.
- Aceptar que la mayoría de los turnos son tranquilos, y que eso es buena señal.

### Curiosidad y aprendizaje continuo

Las técnicas cambian; lo que aprendiste hace dos años se queda corto.

**Qué se espera:** seguir fuentes, montar cosas por tu cuenta, entender por qué funcionó un ataque y no sólo bloquearlo.

### Empatía con el usuario

El usuario que hizo clic no es tonto: cayó en un correo diseñado para engañarle. Tratarlo como culpable hace que la próxima vez no lo reporte, y eso cuesta detección.

### Discreción

Se manejan datos de personas y de clientes. No se comentan casos fuera del equipo, ni se publican capturas, ni se sube nada de un cliente a un servicio público.

## Cómo se evalúan en la entrevista

No las preguntan de frente; las deducen de cómo respondes a lo demás:

| Lo que preguntan | Lo que están midiendo |
|---|---|
| "Cuéntame cómo investigarías esta alerta" | Método y pensamiento estructurado |
| "¿Qué haces si no sabes resolverla?" | Autoconocimiento y criterio para escalar |
| "Explícame un incidente que hayas visto" | Comunicación y capacidad de sintetizar |
| "¿Qué haces para estar al día?" | Curiosidad real, no declarada |
| "Cuéntame un error que hayas cometido" | Honestidad y aprendizaje |
| "Tienes 20 alertas y una hora" | Priorización |

En las preguntas situacionales, pensar en voz alta puntúa más que acertar. Lo que buscan es ver cómo razonas.

## Cómo se entrenan

- **Escribiendo.** Cada reto de laboratorio, con su informe. Es lo que más rápido se nota.
- **Explicando en voz alta.** Cuéntale a alguien no técnico un ataque que hayas entendido. Si no puedes, no lo entendiste del todo.
- **Repasando tus propios cierres.** Vuelve a un ticket tuyo de hace un mes: ¿se entiende?
- **Poniendo límites de tiempo.** Cronometra los retos y escala mentalmente al llegar al límite.
- **Pidiendo revisión.** Que alguien lea tus informes y te diga qué no se entiende.

> [!TIP]
> Si estás buscando el primer puesto, un repositorio con tus informes de retos de laboratorio demuestra a la vez las hard skills y las soft: se ve lo que sabes hacer y cómo lo cuentas.
