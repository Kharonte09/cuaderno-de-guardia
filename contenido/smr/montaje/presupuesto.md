---
titulo: Elegir componentes y presupuestar
subtitulo: true
---

# Elegir componentes y presupuestar

Montar un equipo a medida es sobre todo un problema de compatibilidades y de reparto del dinero. El orden en que se eligen las piezas importa.

## El orden de decisión

1. **Para qué es el equipo.** Ofimática, edición, juegos o servidor. Todo lo demás sale de aquí.
2. **Procesador.** Marca el socket, y por tanto la placa.
3. **Placa base** compatible con ese socket, con el chipset que dé las funciones que hagan falta.
4. **Memoria**, del tipo y la velocidad que admitan placa y procesador.
5. **Almacenamiento**, según las ranuras M.2 y los puertos SATA disponibles.
6. **Tarjeta gráfica**, si el uso la pide y el procesador no trae una suficiente.
7. **Refrigeración** que cubra el TDP del procesador y quepa en la caja.
8. **Fuente** con potencia para el conjunto, y con los conectores que pide la gráfica.
9. **Caja** del factor de forma de la placa, con hueco para el disipador y los discos.
10. **Periféricos**: monitor, teclado y ratón.

> [!IMPORTANT]
> La fuente y la caja se eligen **al final** porque dependen de todo lo anterior, y son justo las dos piezas donde más se recorta por desconocimiento. Una fuente mala pone en riesgo el resto del equipo.

## La lista de compatibilidades

Antes de pagar, cada punto de esta lista se comprueba explícitamente:

| Comprobación | Contra qué |
|---|---|
| Socket del procesador | Socket de la placa base |
| Chipset de la placa | Si hace falta overclocking, o número de líneas PCIe |
| Tipo y frecuencia de la RAM | Lo que admite la placa (DDR4, DDR5 y su velocidad máxima) |
| Número de módulos | Ranuras de la placa y canales que soporta |
| SSD M.2 | Que la ranura sea del tipo correcto, SATA o NVMe |
| Anclaje de la refrigeración | Que soporte ese socket, y su TDP máximo |
| Altura del disipador | Ancho interior de la caja |
| Longitud de la gráfica | Espacio libre de la caja |
| Factor de forma de la placa | Lo que admite la caja (ATX, micro-ATX, mini-ITX) |
| Conectores de la fuente | Los que piden placa y gráfica |

## Cómo se presenta un presupuesto

Una tabla con una línea por componente, el modelo exacto, las unidades y el precio, y el **total** abajo. Con modelo exacto, no "un SSD de 500 GB": el presupuesto tiene que ser verificable y repetible por otra persona.

Merece la pena separar **equipo** de **periféricos**, porque el cliente suele tener ya monitor y teclado y así ve las dos cifras por separado.

## En qué se va el dinero

Un montaje de gama alta de hace unos años, con su reparto real del gasto. Los precios cambian; **las proporciones se mantienen bastante bien**, y son lo que hay que interiorizar:

| Componente | % del total |
|---|---|
| Procesador | 21 % |
| Tarjeta gráfica | 18 % |
| Placa base | 14 % |
| Teclado mecánico | 10 % |
| Monitor | 9 % |
| Disco duro de 4 TB | 6 % |
| Fuente de alimentación | 5 % |
| SSD NVMe de 500 GB | 5 % |
| Memoria RAM 16 GB | 4 % |
| Caja | 4 % |
| Refrigeración líquida | 3 % |
| Ratón | 2 % |

Lo que se aprende de ahí:

- **Procesador y gráfica se llevan cerca del 40 %.** Ahí es donde bajar o subir de gama cambia el presupuesto de verdad.
- **Los periféricos se comen más de lo que parece**: un 21 % entre monitor, teclado y ratón, más que la placa base.
- **RAM, caja y fuente juntas son poco más del 13 %.** Ahorrar ahí a costa de la calidad es un mal negocio.

> [!TIP]
> Las páginas de configuradores comprueban las compatibilidades por ti y avisan si una pieza no encaja con otra. Está bien para validar, pero conviene saber por qué se queja: el examen y el cliente preguntan el motivo.

## Una configuración de ejemplo

Para ver qué se anota de cada componente al justificar la elección:

| Componente | Lo que se documenta |
|---|---|
| **Procesador** | 8 núcleos / 16 hilos, 3,6 GHz hasta 5 GHz, 16 MB de L3, 95 W, socket LGA 1151 |
| **Placa base** | Chipset Z390, 4 ranuras DDR4 (máx. 64 GB, dual channel), 3 PCIe x16, 3 M.2, 6 SATA, ATX |
| **Memoria** | 16 GB DDR4 (2 × 8 GB) a 3000 MHz, CL15, en dual channel |
| **Almacenamiento** | SSD NVMe M.2 de 500 GB para el sistema, HDD de 4 TB a 5400 RPM para datos |
| **Refrigeración** | Líquida de 240 mm (2 ventiladores de 120), hasta 200 W de TDP |
| **Gráfica** | 6 GB GDDR6 |
| **Fuente** | 650 W, 80 Plus Gold, modular |
| **Monitor** | 24,5", 1920 × 1080, 165 Hz, 1 ms, panel TN |

Y la justificación de compatibilidad, que es la parte que puntúa: el procesador es LGA 1151 y la placa también; la refrigeración trae anclaje para ese socket y cubre sus 95 W de sobra; el SSD M.2 es del tipo que acepta esa ranura; y placa y caja son las dos ATX.
