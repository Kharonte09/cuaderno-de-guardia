---
titulo: Discos duros y SSD
subtitulo: true
---

# Discos duros y SSD

Las dos tecnologías de almacenamiento que convives con ellas: una mecánica y barata por gigabyte, otra electrónica y mucho más rápida.

## El disco duro mecánico (HDD)

Un dispositivo de almacenamiento **no volátil**: mantiene los datos sin corriente.

Dentro de una caja metálica sellada hay **uno o varios platos rígidos** unidos por un mismo eje, girando a gran velocidad. Sobre cada cara se sitúa un **cabezal de lectura y escritura** que no toca el plato: flota sobre una lámina de aire finísima que genera la propia rotación. Por eso un golpe con el disco en marcha puede hacer que el cabezal roce la superficie y se lleve los datos por delante.

### Sus partes

| Parte | Función |
|---|---|
| **Platos** | Los discos magnéticos donde se graban los datos |
| **Eje y motor** | Hacen girar los platos a velocidad constante |
| **Cabezales** | Leen y escriben el campo magnético de cada sector |
| **Brazo actuador** | Mueve los cabezales al radio que toca |
| **Placa controladora** | Traduce las órdenes del equipo en movimiento y señal |

### Qué mirar al comprar uno

- **Capacidad** — los gigabytes o terabytes, lo primero que mira todo el mundo.
- **RPM** — a cuántas revoluciones por minuto giran los platos. Los de **7200 RPM** son más rápidos; los de **5400 RPM**, más silenciosos, frescos y baratos, buenos para almacenar datos.
- **Formato** — 3,5" para sobremesa, 2,5" para portátil.
- **Interfaz** — hoy SATA; en equipos viejos, IDE.
- **Caché** — la memoria intermedia del propio disco.

**Fabricantes habituales:** Seagate, Western Digital, Toshiba y Samsung, más marcas históricas como Maxtor que ya no existen como tales.

## El SSD

No tiene piezas móviles: los datos van en **memoria flash**. De ahí todas sus ventajas: arranca y abre programas mucho más rápido, no hace ruido, consume menos, aguanta golpes y no le afecta la fragmentación.

A cambio cuesta más por gigabyte, y las celdas tienen un número limitado de escrituras (aunque para un uso normal la vida útil sobra).

### Formatos y conexiones

| Formato | Interfaz | Velocidad aproximada |
|---|---|---|
| **SSD de 2,5"** | SATA III (6 Gbit/s) | Hasta ~550 MB/s |
| **SSD M.2 SATA** | SATA por ranura M.2 | Igual que el anterior |
| **SSD M.2 NVMe** | PCIe | Varios GB/s |

> [!IMPORTANT]
> Las ranuras **M.2** son un formato físico, no una velocidad: por la misma ranura puede ir un SSD SATA (rápido) o uno NVMe (mucho más rápido). El manual de la placa dice qué admite cada una de sus ranuras M.2.

## Cuál poner

Lo normal en un equipo actual es **los dos**:

- Un **SSD NVMe** de 500 GB o 1 TB para el sistema operativo y los programas, que es donde se nota.
- Un **HDD** de varios terabytes para archivo, copias y datos que no necesitan velocidad.

Ese reparto es el que mejor aprovecha el presupuesto: la velocidad donde se usa y los gigabytes donde hacen falta.

## Interfaces y conectores

| Conector | Notas |
|---|---|
| **SATA** | El estándar. Cable de datos en L y alimentación propia. SATA II son 3 Gbit/s, SATA III son 6 |
| **IDE / PATA** | El cable plano ancho de los equipos antiguos. Alimentación Molex |
| **M.2** | Ranura directa en la placa, sin cables |
| **SAS** | Variante de servidor, con más fiabilidad y coste |

> [!NOTE]
> Un disco SATA III en un puerto SATA II funciona: negocia a la velocidad menor. Eso permite meter un SSD en un equipo viejo y ganar mucho, aunque no todo lo que el SSD daría.
