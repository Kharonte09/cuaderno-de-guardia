---
titulo: El equipo por dentro
subtitulo: true
---

# El equipo por dentro

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Abrir un ordenador y saber nombrar lo que hay dentro, para qué sirve cada pieza y con qué se conecta a las demás.

## Las piezas

| Componente | Qué hace |
|---|---|
| **Carcasa** o chasis | Sujeta y protege todo lo demás, y dirige el flujo de aire. |
| **Fuente de alimentación** | Convierte los 230 V de la red en las tensiones que usan los componentes. |
| **Placa base** | El circuito que une todo y por donde se comunican entre sí. |
| **Procesador** y disipador | Ejecuta las instrucciones. Nunca va sin refrigeración. |
| **Memoria RAM** | La memoria de trabajo, volátil: se borra al apagar. |
| **Almacenamiento** | Disco duro o SSD, donde vive el sistema y los datos. |
| **Unidad óptica** | Lector de CD o DVD. Cada vez menos habitual. |
| **Tarjeta gráfica** | Genera la imagen. Puede ir integrada en el procesador o aparte. |

## La carcasa

Más allá de la chapa, lo que importa de una caja es:

- **El factor de forma** que admite (ATX, micro-ATX, mini-ITX): tiene que coincidir con el de la placa base.
- **Los huecos** de 3,5" para discos duros y de 2,5" para SSD, y las bahías de 5,25" para unidades ópticas.
- **La ventilación**: posiciones para ventiladores y por dónde entra y sale el aire.
- **Los conectores del panel frontal**, que hay que llevar a la placa: botón de encendido, botón de reset, leds de actividad, USB y audio.

## La fuente de alimentación

De la etiqueta se leen tres cosas:

- **Entrada**: 230 V de la red eléctrica.
- **Potencia total**: los vatios que puede dar, por ejemplo 500 W.
- **Amperaje de la línea de 12 V**: la que alimenta procesador y gráfica, y por tanto la que de verdad manda. 16 A en la línea de 12 V son unos 192 W disponibles para esa línea.

### Sus conectores

| Conector | A dónde va |
|---|---|
| **ATX de 20/24 pines** | La alimentación principal de la placa base |
| **ATX 12 V** (4+4 u 8 pines) | Alimentación específica del procesador |
| **PCIe** (6+2 pines) | Tarjeta gráfica, si la necesita |
| **SATA** | Discos duros, SSD y unidades ópticas modernas |
| **Molex** | Conector antiguo de 4 pines, para discos IDE y ventiladores |
| **Berg** | El pequeño de la disquetera. Solo en equipos viejos |

> [!TIP]
> Una fuente **modular** permite quitar los cables que no se usan, así que dentro de la caja queda mucho menos revoltijo y el aire circula mejor. Las certificaciones 80 Plus (Bronze, Gold…) miden su eficiencia, no su potencia.

## La placa base

Es el elemento que decide con qué es compatible el resto del equipo:

- **El socket**, el zócalo del procesador. Determina qué CPU acepta.
- **El chipset**, que fija qué funciones hay disponibles (overclocking, número de líneas PCIe, USB).
- **Las ranuras de memoria**, normalmente dos o cuatro, y los canales que admite.
- **Las ranuras de expansión** PCIe, para gráfica y tarjetas.
- **Los conectores M.2** para SSD, y los puertos SATA para discos.
- **El factor de forma**, que tiene que caber en la caja.

Detrás lleva el **panel de conectores**: USB de varias generaciones, vídeo (HDMI, DisplayPort, DVI), red RJ-45 y audio.

> [!NOTE]
> El **manual de la placa** es el documento más útil del montaje. Dice qué ranura usar primero para la RAM, dónde va cada cable del panel frontal y qué significa cada led o pitido de error. Todos los fabricantes lo publican en PDF en la web del modelo.

## Un equipo real, pieza a pieza

Las especificaciones de un equipo de sobremesa de hace unos años, para ver qué se anota de cada componente:

| Componente | Especificaciones |
|---|---|
| Fuente | 500 W, 230 V de entrada, 16 A en la línea de 12 V |
| Memoria RAM | 2 GB, 800 MHz, CL16 |
| Disco duro | 80 GB, SATA 3 Gbit/s, 7200 RPM |
| Tarjeta gráfica | 1 GB GDDR2, gama de entrada de su época |
| Unidad óptica | Lector de CD |

Comparar esa máquina con cualquier equipo actual explica solo qué ha cambiado: la capacidad y la velocidad, no las piezas ni cómo se conectan entre sí.
