---
titulo: Cableado estructurado
subtitulo: true
---

# Cableado estructurado

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Cablear un edificio no es tirar cables de un sitio a otro: es un sistema con partes normalizadas, pensado para que dentro de diez años alguien pueda cambiar un puesto sin abrir la pared.

## Las partes del sistema

| Parte | Qué es |
|---|---|
| **Cableado horizontal** | Del armario de la planta a cada puesto de trabajo. Es el que más metros lleva. |
| **Cableado vertical** o troncal | Une los armarios de las distintas plantas entre sí. |
| **Armario de comunicaciones** | El rack donde acaba todo: paneles, switches y electrónica. |
| **Puesto de trabajo** | La roseta de la pared y el latiguillo que va de ahí al equipo. |

El principio es que el cable fijo **no se toca nunca**: va de la roseta al panel de parcheo y se queda ahí. Lo que se cambia son los latiguillos, que son cortos, baratos y accesibles.

## Elementos pasivos

Pasivos porque no llevan electrónica ni alimentación: solo conducen o sujetan.

| Elemento | Para qué |
|---|---|
| **Cable de par trenzado** | Se compra en rollo (los de 305 m son el formato típico) y se corta a medida. |
| **Conectores RJ-45** | Las puntas de los latiguillos, en bolsas de 100. |
| **Cubreconectores** | Capuchón de plástico que protege el crimpado y evita que el cable se doble en la punta. |
| **Rosetas de red** | La toma de la pared, de una o dos bocas. |
| **Panel de parcheo** | La placa del armario donde terminan todos los cables horizontales, normalmente de 24 tomas. |
| **Canaletas** | El canal de plástico por el que va el cable a la vista, en varias capacidades. |
| **Bridas** | Para peinar y sujetar los cables por detrás del panel. |
| **Etiquetas** | Identifican cada extremo. No son opcionales. |

## El armario

Los armarios se miden en **U** (unidades de rack): 1 U son 4,45 cm de alto. Un panel de parcheo ocupa 1 U, un switch pequeño otra.

- **Armario mural** — se cuelga de la pared. Para pocas U, en un cuarto pequeño o una oficina.
- **Armario de suelo** — de pie, mucha más capacidad. Para el CPD o el cuarto de comunicaciones.

Dentro, aparte de los paneles y los switches, va la **PDU**: la regleta del rack, con sus tomas (ocho en las habituales), que ocupa 1 U y reparte la alimentación a todo lo demás.

## Montar el cableado horizontal

Con un tablón que hace de pared se ve el proceso completo:

1. **Fijar el panel de parcheo** al soporte con tornillos, a la altura donde iría en el armario.
2. **Colocar las rosetas** en los puntos que hacen de puestos de trabajo.
3. **Tirar el cable** de cada roseta al panel, con holgura suficiente para poder trabajar después.
4. **Impactar** los hilos, en la roseta y en el panel.
5. **Peinar los cables** por detrás con bridas, aprovechando las hendiduras del propio panel.
6. **Etiquetar** los dos extremos de cada tirada.

### La impactadora

Es la única herramienta que hace falta para esta parte. En las rosetas y en los paneles no se crimpa: cada hilo se mete en su ranura de color y se **impacta**, y la herramienta lo empuja al fondo, lo corta a ras y hace el contacto en un solo golpe. De ahí el nombre.

> [!TIP]
> El código de colores de la roseta viene impreso en la propia pieza. Si la roseta va en TIA-568B, el panel va también en B: mezclar normas entre los dos extremos de la misma tirada deja el cable cruzado sin querer.

## El etiquetado

Es la parte que todo el mundo se salta y la que se echa en falta el primer día que algo falla. Una tirada mal etiquetada es una tirada que hay que rastrear a mano.

La norma mínima es que **los dos extremos lleven la misma etiqueta** y que el código diga dónde está el otro lado. Un esquema que funciona:

```
P1-02-A     planta 1, puesto 02, toma A
```

Y que la etiqueta del panel sea exactamente la misma que la de la roseta. Con eso, encontrar el cable de un puesto en un armario de 24 tomas es mirar, no probar.
