---
titulo: La memoria RAM
subtitulo: true
---

# La memoria RAM

La memoria de trabajo del equipo: rápida, volátil y la ampliación más rentable que existe cuando un ordenador va justo.

## Qué es y qué hace

La RAM (*Random Access Memory*, memoria de acceso aleatorio) guarda lo que el equipo está usando **ahora mismo**: el sistema operativo, los programas abiertos y los datos con los que trabajan. El procesador lee y escribe en ella constantemente, porque el disco es demasiado lento para ese ritmo.

Es **volátil**: sin corriente se borra. Por eso al apagar el ordenador se pierde lo que no se haya guardado, y por eso el sistema tarda en arrancar: hay que volver a cargarlo todo desde el disco a la memoria.

> [!NOTE]
> "Acceso aleatorio" significa que se puede leer cualquier posición directamente, sin recorrer las anteriores. Es lo contrario de una cinta, donde para llegar al final hay que pasar por todo lo de antes.

## Qué pasa cuando se queda corta

Cuando no cabe todo en la RAM, el sistema empieza a usar el disco como memoria de emergencia: el **archivo de paginación** en Windows, la **partición de intercambio** (*swap*) en Linux. Funciona, pero el disco es órdenes de magnitud más lento, así que el equipo se arrastra.

Ese es el síntoma clásico de falta de memoria: el ordenador va bien con dos programas y se vuelve insufrible al abrir el quinto, con el disco trabajando sin parar.

## La jerarquía de memoria

La RAM no está sola: es un escalón de una pirámide que va de lo diminuto y rapidísimo a lo enorme y lento.

| Nivel | Tamaño típico | Velocidad |
|---|---|---|
| **Registros** del procesador | Unos pocos bytes | Inmediata |
| **Caché L1** | Decenas de KB por núcleo | Poquísimos ciclos |
| **Caché L2** | Cientos de KB o pocos MB | Muy rápida |
| **Caché L3** | Varios MB, compartida | Rápida |
| **Memoria RAM** | Varios GB | Rápida |
| **SSD o disco duro** | Cientos de GB o TB | Lenta |

Cada nivel guarda una copia de lo que más se usa del nivel inferior. La **caché** hace con la RAM lo que la RAM hace con el disco: adelantarse y tener a mano lo que probablemente se va a pedir. Cuando acierta (y acierta casi siempre), el procesador no espera.

## Tipos de módulo

| Módulo | Dónde va |
|---|---|
| **DIMM** | Sobremesa y servidor. El módulo largo de siempre |
| **SO-DIMM** | Portátiles y mini-PC. La versión corta |

Y por generación, que es lo que hay que mirar al comprar:

| Generación | Notas |
|---|---|
| **DDR2** | Equipos de mediados de los 2000 |
| **DDR3** | Muy extendida durante años |
| **DDR4** | El estándar de la última década |
| **DDR5** | La actual, más ancho de banda |

> [!WARNING]
> Las generaciones **no son compatibles entre sí**: la muesca del módulo está en otro sitio y no entra físicamente en una ranura de otra generación. Antes de comprar RAM hay que saber qué admite la placa base, no solo cuántos gigas quieres.

## Los números de la ficha

- **Capacidad** — los gigabytes del módulo (8 GB, 16 GB, 32 GB).
- **Frecuencia** — en MHz o MT/s (2666, 3000, 3200…). Cuanto más alta, más datos por segundo, siempre que la placa y el procesador la admitan.
- **Latencia (CL)** — los ciclos que tarda en responder. Aquí **menos es mejor**: un CL15 responde antes que un CL16 a la misma frecuencia.
- **Voltaje** — lo que consume. Importa en portátiles y en overclocking.

Frecuencia y latencia se leen juntas: subir mucho la frecuencia empeorando mucho el CL puede dejarte igual o peor que antes.

## Los canales

La placa puede hablar con varios módulos a la vez, y eso multiplica el ancho de banda:

- **Dual channel** — dos módulos en paralelo. Es lo normal y lo que hay que buscar.
- **Triple channel** — tres, en plataformas antiguas de gama alta.
- **Quad channel** — cuatro, en equipos de gama alta y servidores. Exige que los cuatro módulos sean **idénticos** en capacidad y velocidad, y en las ranuras correctas.

> [!TIP]
> **Dos módulos de 8 GB rinden más que uno de 16 GB**, aunque sumen lo mismo, porque activan el dual channel. Y las ranuras no son intercambiables: el manual de la placa dice qué par usar (casi siempre la 2 y la 4). Si van en las ranuras equivocadas, la memoria funciona en canal simple y pierdes rendimiento sin enterarte.

## Las partes de un módulo

| Parte | Qué es |
|---|---|
| **Chips de memoria** | Los integrados negros donde están las celdas. Es la memoria en sí |
| **Chip SPD** | Guarda la ficha del módulo: capacidad, tipo, frecuencia y latencias, para que la placa lo configure solo al arrancar |
| **Placa de circuito** | El soporte que une todo |
| **Contactos** | La hilera de conectores dorados que encaja en la ranura |
| **Muesca** | El corte que impide meterlo al revés o en una generación equivocada |

Muchos módulos llevan además **disipador**: una carcasa metálica que ayuda a evacuar el calor. En módulos de alto rendimiento tiene sentido; en los normales es sobre todo estético, y hay kits con refrigeración líquida que son ya puro lujo.

**Fabricantes habituales:** Kingston, Corsair, G.Skill, Crucial, ADATA y Gigabyte, entre otros.

## Ampliar la memoria de un equipo

1. **Mirar qué hay puesto y qué cabe**: generación, frecuencia, cuántas ranuras hay y cuántas libres. Con AIDA64 o CPU-Z se ve sin abrir el equipo.
2. **Consultar el máximo** que admite la placa, tanto por módulo como en total.
3. **Comprar el mismo tipo** que lo instalado, e idealmente igual de capacidad y frecuencia.
4. **Colocarlo en la ranura correcta** para que trabaje en dual channel.
5. **Comprobar en la BIOS** que se reconoce toda la memoria y a qué frecuencia va.

> [!IMPORTANT]
> Si mezclas módulos de frecuencias distintas, **todos funcionan a la velocidad del más lento**. Comprar un módulo rápido para ponerlo junto a uno lento es tirar el dinero de la diferencia.
