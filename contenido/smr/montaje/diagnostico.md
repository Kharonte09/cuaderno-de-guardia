---
titulo: Diagnóstico y herramientas
subtitulo: true
---

# Diagnóstico y herramientas

Cuando un equipo va mal, lo primero es saber **qué** pieza falla. Estas son las herramientas para inventariar el hardware y para probar memoria y discos.

## Inventariar el equipo

### AIDA64

Programa de información y diagnóstico: enseña todo lo que hay dentro de la máquina y hace pruebas de estrés y *benchmark*.

**No es gratuito**, pero tiene versión de prueba de 30 días. Se distribuye en varias ediciones (Extreme para usuario, Engineer, Business y Network Auditor para gestión de parque), cada una con sus funciones. Se descarga de la [web oficial](https://www.aida64.com/downloads); la versión portable llega en un comprimido y se ejecuta sin instalar.

Lo que se saca de cada apartado:

| Apartado | Datos |
|---|---|
| **Procesador** | Marca, modelo, frecuencia de reloj, caché, temperaturas |
| **Memoria** | Capacidad, tipo, frecuencia, latencias y ranuras ocupadas |
| **Placa base** | Modelo, chipset, versión de BIOS |
| **Almacenamiento** | Cada disco con su modelo, tamaño e interfaz |
| **Monitor** | Modelo, resolución nativa y frecuencia |
| **Red** | Adaptadores y direcciones |

> [!TIP]
> Antes de comprar una ampliación de RAM, AIDA64 dice el tipo exacto, la frecuencia y **cuántas ranuras quedan libres**. Es la forma de no comprar un módulo que no encaja o que hará bajar de velocidad a los que ya hay.

## Probar la memoria RAM

Los fallos de memoria dan cuelgues aleatorios, pantallazos azules sin patrón y corrupción de datos. Son de los síntomas más confusos, y por eso conviene descartarla pronto.

### Diagnóstico de memoria de Windows

Viene con el sistema y para un primer descarte va bien:

1. Buscar **Diagnóstico de memoria de Windows** en el menú de inicio.
2. Elegir entre reiniciar y comprobar ahora, o comprobar en el siguiente arranque.
3. El equipo reinicia y hace la prueba **fuera del sistema**, con una pantalla de progreso propia.
4. Al terminar vuelve a Windows y muestra el resultado.

Tiene que ser así porque la memoria no se puede probar entera mientras el sistema operativo la está usando.

### MemTest86

La herramienta seria para esto. Arranca desde USB, sin sistema operativo por medio, y recorre la memoria **segmento a segmento** con varios patrones de escritura y lectura:

1. Descargar la herramienta de [memtest86.com](https://www.memtest86.com/) (de PassMark; la edición gratuita sirve de sobra, las de pago solo añaden informes y despliegue por red).
2. Con la utilidad que trae el propio paquete, preparar un USB arrancable.
3. Arrancar el equipo desde ese USB.
4. Configurar el número de **pasadas** e iniciar.

> [!NOTE]
> Una sola pasada limpia no descarta nada: los fallos intermitentes aparecen a la tercera o la cuarta, y a veces solo con la memoria caliente. Lo habitual es dejarlo toda la noche. Y si aparece un error, se repite la prueba **con un módulo a la vez** para saber cuál de ellos es.

## Probar los discos

Dos programas del mismo autor, portables los dos, que se descargan de [crystalmark.info](https://crystalmark.info/en/):

### CrystalDiskInfo — la salud

Lee los atributos **SMART** que el propio disco lleva contando y los resume en un estado: bueno, precaución o malo. Lo que interesa:

- **Temperatura** de trabajo.
- **Horas de funcionamiento** y **número de arranques**.
- **Sectores reasignados** o pendientes: los que el disco ha dado por malos.
- En SSD, el **porcentaje de vida** consumido.

> [!WARNING]
> Un aviso en **precaución** por sectores reasignados es la señal para copiar los datos **ya**. Un disco que empieza a reasignar sectores no se arregla, y el aviso suele llegar con poco margen.

### CrystalDiskMark — la velocidad

Mide lectura y escritura secuencial y aleatoria. Se pulsa **All** y al acabar da la tabla de resultados en MB/s.

Sirve para comprobar que un disco rinde lo que debería: un SSD SATA por debajo de 200 MB/s secuenciales, o un NVMe dando cifras de SATA, apunta a que está conectado en el puerto equivocado, a que la ranura M.2 comparte líneas con otra, o a que el disco está lleno o degradado.

Los dos programas guardan gráficas históricas, útiles para ver la evolución de un disco con el tiempo.

## Un orden para diagnosticar

1. **Escuchar y mirar**: pitidos, leds, olores, ventiladores parados.
2. **Inventariar** con AIDA64 y comprobar que el sistema ve todo lo que hay instalado.
3. **Temperaturas** en reposo y bajo carga.
4. **Memoria**, con MemTest86 si hay cuelgues sin patrón.
5. **Discos**, con CrystalDiskInfo: SMART primero, velocidad después.
6. **Sustituir por descarte**: probar con un módulo, un disco o una fuente que se sepan buenos.
