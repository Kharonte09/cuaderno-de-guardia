---
titulo: Dispositivos de interconexión
subtitulo: true
---

# Dispositivos de interconexión

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Los equipos que trabajan en el nivel de enlace: leen las tramas, entienden direcciones MAC y deciden por dónde sale cada cosa.

## Qué significa "de enlace"

Un dispositivo de interconexión de **nivel de enlace** es capaz de interpretar las **tramas** dentro de la señal que transmite. Eso le permite identificar los equipos por su **dirección MAC** y dirigir el tráfico en consecuencia.

La diferencia con un dispositivo de nivel físico (un simple repetidor o un concentrador) es exactamente esa: el de enlace **entiende** lo que transporta; el físico solo repite señal.

## El switch

Permite interconectar equipos **segmentando** la red, y con eso aumenta su rendimiento.

Su funcionamiento es simple de describir: lee la **MAC de destino** de la trama que le llega y la reenvía **solo por el puerto** donde está ese destino. Para eso mantiene una **tabla de direcciones MAC** que asocia cada dirección con uno de sus puertos.

### Cómo construye la tabla

Con **inundación** (*flooding*). Cuando no sabe dónde está una MAC, envía la trama por **todos** los puertos. El equipo al que iba responde, y al hacerlo el switch aprende por qué puerto le llegó esa respuesta y apunta la asociación.

A partir de ahí ya no necesita inundar para ese destino: va directo. Las entradas tienen un **tiempo de vida**, y si una MAC no se ve durante un rato se borra, para que la tabla no se quede con información antigua cuando un equipo cambia de sitio.

> [!NOTE]
> Ese aprendizaje es también la razón de que la primera trama hacia un destino nuevo se comporte distinto de las siguientes, y algo a tener en cuenta al capturar tráfico: lo que se ve al principio de una captura no siempre es lo que se ve después.

## Los puntos de acceso

Crean la **red inalámbrica** y centralizan los dispositivos que se conectan a ella, dentro de un alcance limitado. Hacen de puente entre la parte inalámbrica y la cableada, así que un portátil por wifi y un sobremesa por cable quedan en la misma red.

Se pueden **conectar varios puntos de acceso entre sí** para cubrir más superficie, que es cómo se monta el wifi de un edificio.

## Puertos MDI y MDIX

Al conectar un equipo a un switch se usa cable **directo**. Entre dos switches, en principio, hace falta cable **cruzado**.

| Puerto | Qué hace |
|---|---|
| **MDI** | El puerto normal: no cruza los pares |
| **MDIX** | Cruza internamente los pares, de modo que se puede unir dos switches con un cable **directo** |

Es el motivo por el que en los switches antiguos había un puerto marcado como *uplink*. Hoy casi todos llevan **Auto-MDI/X** y detectan solos qué hace falta, así que la distinción sobrevive sobre todo en los exámenes y en los equipos viejos. La teoría del cruce está en [par trenzado y latiguillos](#/smr/redes/cableado).

## Configurar un switch

Un switch gestionable se administra de dos formas:

- **Interfaz web**: se accede escribiendo la IP del switch en el navegador.
- **Línea de comandos**: por el puerto de consola con un cable específico, o en remoto por la red (SSH, o Telnet en equipos antiguos).

La consola es la que hay que saber: es la que funciona cuando el equipo está recién sacado de la caja o mal configurado, y la única que permite recuperarlo si se ha perdido el acceso por red.

## Dominio de colisión y dominio de difusión

Dos conceptos que se confunden y que explican para qué sirve cada dispositivo.

### Dominio de colisión

Es el **segmento físico** de red donde pueden producirse colisiones: cuando varios dispositivos acceden al medio a la vez para transmitir, sus señales chocan. En Ethernet lo resuelve el protocolo **CSMA/CD**, detectando la colisión y reintentando.

Cuantos más equipos hay en el mismo dominio de colisión, más probabilidad de choque y menos eficiencia.

**Cada puerto de un switch es un dominio de colisión independiente.** Eso es precisamente lo que hace el switch al segmentar, y por lo que sustituyó a los concentradores: en un concentrador todos los equipos compartían un único dominio de colisión.

### Dominio de difusión

Es el **área lógica** en la que una trama de difusión llega a todos los dispositivos. La trama de difusión lleva como destino la MAC `FF:FF:FF:FF:FF:FF`, que no identifica a ningún equipo concreto: es administrativa, y se duplica para que la reciban todos.

Los equipos de un mismo dominio de difusión **no necesitan encaminamiento** para hablarse: se alcanzan directamente en el nivel de enlace.

### La diferencia que importa

| Dispositivo | Dominios de colisión | Dominios de difusión |
|---|---|---|
| **Concentrador** (*hub*) | Uno para todos | Uno |
| **Switch** | Uno por puerto | Uno (todos sus puertos) |
| **Router** | Uno por interfaz | **Uno por interfaz** |

> [!IMPORTANT]
> Un switch divide dominios de **colisión**, pero no de **difusión**: una trama de difusión sale por todos sus puertos. Para dividir dominios de difusión hace falta un **router** o, sin cambiar de cableado, [VLANs](#/asir/redes/vlan-y-stp). Esta frase resume media asignatura.
