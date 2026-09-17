---
titulo: Windows Server y DHCP
subtitulo: true
---

# Windows Server y DHCP

Montar un servidor Windows en una máquina virtual y darle su primer papel: repartir direcciones a la red.

## Conseguir el sistema

Microsoft publica **versiones de evaluación** de Windows Server, gratuitas y funcionales durante un periodo limitado (normalmente 180 días). Se descargan del centro de evaluación de su web: se elige el formato (ISO o VHD), se rellena el formulario y se obtiene la imagen.

Es la forma legal de practicar con un servidor sin licencia de producción, y suficiente para todo un curso.

## Requisitos

| Recurso | Mínimo |
|---|---|
| **Procesador** | 64 bits a 1,4 GHz |
| **Memoria** | 512 MB, o 2 GB si se instala con entorno de escritorio |
| **Disco** | 32 GB |
| **Red** | Adaptador Ethernet de al menos 1 Gbit/s |

> [!NOTE]
> Los mínimos oficiales son los de la instalación **Core**, sin interfaz gráfica. Para practicar con el escritorio conviene darle a la máquina virtual 4 GB y un par de núcleos: funciona con menos, pero se hace incómodo.

## Instalarlo en una máquina virtual

1. **Crear la máquina** en VirtualBox, indicando el tipo de sistema, la memoria y el disco.
2. **Montar la ISO** en la unidad óptica virtual.
3. **Arrancar** y seguir el instalador: idioma, edición (con o sin escritorio), disco y contraseña del administrador.
4. **Instalar las Guest Additions**, que mejoran el vídeo, permiten el portapapeles compartido y ajustan la resolución. Requieren un reinicio.
5. **Configurar la red de la máquina virtual** según lo que se vaya a practicar.

### Los modos de red de la máquina virtual

Es lo que más confusión genera al principio, y de lo que depende que los ejercicios funcionen:

| Modo | Qué permite |
|---|---|
| **NAT** | La máquina sale a internet, pero nadie la ve desde fuera |
| **Adaptador puente** | La máquina aparece en la red real como un equipo más |
| **Red interna** | Las máquinas virtuales se ven **entre ellas** y con nadie más |
| **Solo anfitrión** | La máquina virtual y el equipo anfitrión se ven entre sí |

Para montar un servidor y sus clientes, **red interna** es lo adecuado: es una red de laboratorio aislada donde se puede repartir direcciones sin molestar al router de casa.

> [!WARNING]
> Un servidor DHCP en modo puente reparte direcciones **en la red real** y entra en conflicto con el router. Es la forma rápida de dejar sin internet a toda la casa. En red interna no puede pasar.

## Direccionamiento del laboratorio

Al servidor se le pone **IP fija**, siempre: un servidor que cambia de dirección no sirve de nada para los clientes que lo buscan.

Con una red de ejemplo `192.168.80.0/28`:

| Dato | Valor |
|---|---|
| Máscara | 255.255.255.240 (/28) |
| Direcciones totales | 16 |
| Útiles | 14 |
| Rango útil | 192.168.80.1 – 192.168.80.14 |
| Broadcast | 192.168.80.15 |

Una /28 da catorce direcciones: de sobra para un laboratorio y un buen recordatorio de por qué conviene saber calcular [subredes](#/smr/redes/subredes).

## Instalar el rol de DHCP

En Windows Server las funciones se añaden como **roles**, desde el Administrador del servidor:

1. **Administrar → Agregar roles y características**.
2. Elegir instalación basada en características, y el propio servidor como destino.
3. Marcar **Servidor DHCP** y aceptar las características que arrastra.
4. Instalar y, al terminar, **completar la configuración de DHCP**, que autoriza el servicio en el dominio si lo hay.

## Configurar el ámbito

El **ámbito** es el rango de direcciones que el servidor va a repartir:

1. Abrir la consola de DHCP y crear un **ámbito nuevo**.
2. Darle nombre.
3. Definir el **rango** a repartir: por ejemplo de `192.168.80.10` a `192.168.80.14`, dejando las primeras para equipos con IP fija.
4. Indicar la **máscara** (/28).
5. Añadir **exclusiones**, si alguna dirección del rango no debe entregarse.
6. Fijar la **duración de la concesión**: cuánto tiempo conserva un cliente su dirección.
7. Configurar las **opciones**: puerta de enlace, servidores DNS y dominio.
8. **Activar** el ámbito.

### Comprobarlo desde un cliente

En un Windows cliente en la misma red interna, con la tarjeta en modo automático:

```
ipconfig /release
ipconfig /renew
ipconfig /all
```

Si el servidor funciona, el cliente aparece con una dirección del rango (la primera libre, `192.168.80.10` en el ejemplo) y con el servidor DHCP indicado en `ipconfig /all`.

> [!TIP]
> Si el cliente se queda con una dirección `169.254.x.x`, el DHCP **no le ha respondido**: repasa que las dos máquinas estén en la misma red interna, que el ámbito esté activado y que el cortafuegos del servidor no esté bloqueando el servicio. Esa dirección es la [APIPA](#/smr/redes/direccionamiento-ipv4) que se pone el propio cliente al no recibir respuesta.

## Ver los equipos entre sí

Para que los clientes vean los recursos compartidos del servidor hay que activar la **detección de redes** y el **uso compartido de archivos e impresoras** en el perfil de red correspondiente. Windows los desactiva por defecto en redes públicas, y es la causa habitual de que "el servidor no aparece" aunque responda al ping.
