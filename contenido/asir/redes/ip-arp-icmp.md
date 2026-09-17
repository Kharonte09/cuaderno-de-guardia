---
titulo: IP, ARP e ICMP
subtitulo: true
---

# IP, ARP e ICMP

El protocolo que mueve los datos entre redes, el que traduce direcciones IP a direcciones físicas, y el que avisa cuando algo va mal.

## El datagrama IP

**IP** es el protocolo principal del nivel de red, y el **datagrama** es su unidad básica de transferencia entre origen y destino. Los mensajes se fragmentan en datagramas que viajan de forma **independiente**, cada uno con su dirección IP de destino, que es la que se usa para encaminarlos.

Dos características que definen su carácter:

- **No orientado a conexión**: no se establece nada previo. Cada datagrama se envía y se encamina por su cuenta, y dos datagramas del mismo mensaje pueden ir por caminos distintos y llegar desordenados.
- **No fiable**: si un datagrama se pierde, IP no lo reenvía ni avisa. Eso se lo deja a los niveles superiores.

Que sea "no fiable" no es un defecto: es una decisión de diseño. IP hace una sola cosa, moverse entre redes, y lo hace rápido. La fiabilidad la pone **TCP** encima cuando hace falta.

## Campos de la cabecera

Los que hay que conocer:

| Campo | Tamaño | Para qué |
|---|---|---|
| **TTL** (*time to live*) | 8 bits | Límite de vida del datagrama, para que no dé vueltas eternamente |
| **Suma de comprobación** | 16 bits | Detectar que la cabecera ha llegado corrupta |
| **Indicadores** (banderas) | 3 bits, 2 en uso | Controlan la fragmentación |
| **Identificador** | 16 bits | Marca a qué mensaje pertenece cada fragmento |
| **Desplazamiento** | 13 bits | En qué posición del original va ese fragmento |
| **Direcciones origen y destino** | 32 bits cada una | Quién envía y a quién |
| **Protocolo** | 8 bits | Qué viene dentro: TCP, UDP, ICMP |

### El TTL

El TTL se diseñó como segundos de vida, pero en la práctica **funciona como un contador de saltos**: cada router por el que pasa el datagrama le resta uno. Cuando llega a cero, el router lo **descarta** y devuelve al origen un mensaje de error.

Es lo que impide que un datagrama circule indefinidamente si hay un bucle de encaminamiento, y es también la base del comando `tracert`.

### La suma de comprobación

Cubre **solo la cabecera**, no los datos. Si al llegar a un router el cálculo no coincide, el datagrama se **descarta sin más**: IP no pide retransmisión, porque no es fiable. Quien detecta la pérdida y retransmite, si toca, es TCP en el nivel de transporte.

### Los indicadores

| Bit | Nombre | Qué hace |
|---|---|---|
| **DF** | *Don't Fragment* | A 1 prohíbe fragmentar el datagrama; a 0 lo permite |
| **MF** | *More Fragments* | A 1 indica que vienen más fragmentos detrás; a 0, que es el último |

La fragmentación ocurre cuando un datagrama es mayor que el tamaño máximo que admite el siguiente enlace. Si lleva **DF a 1** y no cabe, el router no lo trocea: lo descarta y avisa. Ese mecanismo es el que se usa para descubrir el tamaño máximo utilizable de un camino.

## ARP

IP encamina con direcciones IP, pero para entregar la trama en la red local hace falta la **dirección física (MAC)**. **ARP** es el protocolo que traduce una en la otra.

Cómo funciona:

1. El equipo necesita saber la MAC que corresponde a una IP de su red.
2. Envía una **pregunta ARP en difusión**, que incluye su propia IP y su propia MAC.
3. Solo el equipo que tiene esa IP responde, dando su dirección física.
4. Los dos apuntan la pareja IP–MAC en su **tabla ARP**.

A partir de ahí no hace falta preguntar otra vez: se consulta la tabla. Y cada entrada tiene un **tiempo de caducidad** de unos segundos o minutos; al agotarse, se borra. Eso evita incongruencias cuando un equipo cambia de tarjeta de red o una IP pasa a otra máquina.

```
arp -a            # ver la tabla ARP
arp -d            # borrarla
```

> [!WARNING]
> ARP no comprueba nada: se cree la primera respuesta que llega. De ahí el **envenenamiento ARP** (*ARP spoofing*), en el que un atacante responde diciendo que él es la puerta de enlace y consigue que el tráfico de la víctima pase por su equipo. Es la base del ataque de intermediario en una red local, y por eso una tabla ARP con dos IP apuntando a la misma MAC es una señal de alarma.

## ICMP

Como IP no es fiable —los datagramas se pierden, el destino no se alcanza, el TTL se agota—, hace falta alguna forma de **informar de los errores**. Ese es **ICMP**.

Sus mensajes van **dentro del campo de datos de un datagrama IP**, y tienen una regla importante: si un mensaje ICMP se pierde o se daña, **no se regenera**, se descarta. No hay avisos de los avisos.

### Tipos que hay que saberse

| Tipo | Mensaje | Cuándo aparece |
|---|---|---|
| **8** | Solicitud de eco | Al lanzar un `ping` |
| **0** | Respuesta de eco | La contestación al `ping` |
| **11** | Tiempo excedido | El TTL llegó a cero y un router descartó el datagrama |
| **3** | Destino inalcanzable | Un router avisa al origen de que no hay forma de llegar |

## El comando tracert

Aprovecha ICMP para **trazar la ruta** que siguen los datagramas hasta su destino, y es un ejemplo perfecto de cómo se combinan estas piezas:

1. Envía un datagrama con **TTL = 1**. El primer router lo recibe, le resta uno, queda a cero, lo descarta y devuelve un **ICMP tipo 11**. Con ese mensaje ya se sabe quién es el primer salto.
2. Envía otro con **TTL = 2**. Caduca en el segundo router, que devuelve otro tipo 11. Segundo salto identificado.
3. Y así sucesivamente, subiendo el TTL, hasta que uno llega al destino y responde con un **tipo 0**.

```
tracert ejemplo.es       # Windows
traceroute ejemplo.es    # Linux
```

> [!TIP]
> Si en la traza aparecen asteriscos en un salto intermedio y la traza continúa después, ese router simplemente no responde a ICMP: es habitual y no significa que haya un problema. Lo que sí importa es **dónde se corta del todo**, porque ahí está el punto donde deja de haber camino.
