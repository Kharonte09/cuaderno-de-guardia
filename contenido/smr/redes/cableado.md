---
titulo: Par trenzado y latiguillos
subtitulo: true
---

# Par trenzado y latiguillos

El cable de red de toda la vida: ocho hilos en cuatro pares, un código de colores y dos normas que hay que saberse de memoria.

## Por qué va trenzado

Dentro del cable hay **cuatro pares** de hilos, y cada par va retorcido sobre sí mismo. El trenzado no es decorativo: los dos hilos de un par llevan la misma señal en polaridad opuesta, así que la interferencia que entra les afecta igual a los dos y se cancela al restarlos en el otro extremo. Cuantas más vueltas por metro, menos ruido.

| Tipo | Apantallamiento | Dónde se usa |
|---|---|---|
| **UTP** | Ninguno | Lo normal en oficinas y casas |
| **FTP** | Lámina global | Tiradas con interferencias cercanas |
| **STP** | Malla por par | Entornos industriales, motores, maquinaria |

## Categorías

| Categoría | Velocidad | Distancia máxima |
|---|---|---|
| **Cat 5e** | 1 Gbit/s | 100 m |
| **Cat 6** | 1 Gbit/s (10 Gbit/s hasta 55 m) | 100 m |
| **Cat 6a** | 10 Gbit/s | 100 m |
| **Cat 7** | 10 Gbit/s | 100 m |

Los **100 metros** son el límite del tramo, ruta completa incluida: si hay que ir más lejos, toca meter un switch por el camino o pasar a fibra.

## Las dos normas de colores

El orden de los ocho hilos en el conector RJ-45 lo fijan dos normas. Cambia el sitio de dos pares, el verde y el naranja:

| Pin | TIA-568**A** | TIA-568**B** |
|---|---|---|
| 1 | Blanco-verde | Blanco-naranja |
| 2 | Verde | Naranja |
| 3 | Blanco-naranja | Blanco-verde |
| 4 | Azul | Azul |
| 5 | Blanco-azul | Blanco-azul |
| 6 | Naranja | Verde |
| 7 | Blanco-marrón | Blanco-marrón |
| 8 | Marrón | Marrón |

> [!TIP]
> Los pares azul y marrón van en los pines 4, 5, 7 y 8 en las dos normas. Solo hay que recordar dónde van verde y naranja.

## Recto y cruzado

Lo que decide el tipo de cable es qué norma se pone en cada punta:

- **Latiguillo recto** — la misma norma en los dos extremos (B y B, lo habitual). Conecta equipos **distintos**: PC a switch, switch a router.
- **Latiguillo cruzado** — una norma en cada extremo (**A en uno, B en el otro**). Conecta equipos **iguales**: PC a PC, switch a switch.

> [!NOTE]
> Hoy casi cualquier equipo lleva **Auto-MDI/X** y detecta el cruce por sí solo, así que un recto funciona en casi todo. El cruzado sigue apareciendo en equipos antiguos y en los exámenes, y saber por qué existe explica el resto.

## Construir un latiguillo

**Materiales:** cable de par trenzado, dos conectores RJ-45 y, si se quiere, cubreconectores.
**Herramientas:** pelacables, crimpadora y tester de red.

1. **Pelar** unos 3 cm del recubrimiento exterior, sin dañar los hilos de dentro.
2. **Separar y destrenzar** los cuatro pares, dejando los ocho hilos individuales y rectos.
3. **Ordenar** los hilos según la norma que toque, bien pegados y en paralelo.
4. **Cortar en recto** dejando algo más de un centímetro: lo justo para que los hilos lleguen al fondo del conector y el recubrimiento entre dentro.
5. **Introducir** los ocho hilos en el RJ-45 comprobando que cada uno llega al final de su canal y que el orden no se ha movido.
6. **Crimpar** con la herramienta hasta oír el clic. Los pines bajan y perforan cada hilo.
7. **Repetir** en el otro extremo, con la misma norma si el cable es recto o con la otra si es cruzado.

<figure class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/Ap4azeSQqZE"
          title="Cómo crimpar o engastar un conector RJ45 macho CAT 5 y CAT6 UTP / FTP"
          loading="lazy" allowfullscreen
          referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <figcaption>
    Vídeo de <a href="https://www.youtube.com/@gtlantelecomunicaciones">GTLAN Soluciones en Telecomunicaciones</a>:
    <a href="https://www.youtube.com/watch?v=Ap4azeSQqZE">Cómo crimpar o engastar un conector RJ45 macho CAT 5 y CAT6 UTP / FTP</a>.
  </figcaption>
</figure>

## Comprobarlo

El **tester** se conecta a los dos extremos y enciende un led por hilo, en orden, del 1 al 8:

- **Los ocho en orden** — cable correcto.
- **Uno apagado** — ese hilo no hace contacto: mal crimpado o cortado.
- **Dos intercambiados** — pares cruzados por error al ordenar.
- **Ninguno enciende** — no hay continuidad; probablemente el recubrimiento quedó fuera del conector y los hilos no llegan a los pines.

En un cruzado los leds **no** se encienden en el mismo orden en los dos extremos: se intercambian el 1-3 y el 2-6. Eso es justo la señal de que el cruce está bien hecho.
