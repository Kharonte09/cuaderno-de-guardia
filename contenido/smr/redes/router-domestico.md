---
titulo: El router doméstico
subtitulo: true
---

# El router doméstico

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

El router de casa es, en un solo aparato, todo lo que en una red grande son cuatro cajas distintas. Saber recorrer su configuración es la práctica más rentable del módulo.

## Qué lleva dentro

Un router de operador hace de:

- **Router** — une tu red con la del proveedor y encamina el tráfico entre las dos.
- **Switch** — los puertos RJ-45 de detrás, para los equipos por cable.
- **Punto de acceso** — la red inalámbrica, normalmente en 2,4 y 5 GHz.
- **Servidor DHCP** — reparte direcciones a todo lo que se conecta.
- **Cortafuegos y NAT** — traduce las direcciones privadas de casa a la única pública que da el operador.

## Su dirección privada

Es la **puerta de enlace** de tu red: la dirección a la que envían los equipos todo lo que no es local. Se saca de la consola:

```
ipconfig
```

En Linux o macOS:

```
ip route | grep default
```

La que aparece como *Puerta de enlace predeterminada* es el router. Suele ser la primera dirección útil de la red: `192.168.1.1`, `192.168.0.1` o `10.0.0.1`, según el fabricante.

## Su dirección pública

Esa no la sabe tu equipo: la tiene el router en el lado del operador. Dos formas de verla:

- En la propia configuración del router, en la sección de estado o de conexión a internet.
- Abriendo cualquier página de las que dicen "cuál es mi IP", que ve la dirección desde fuera.

> [!NOTE]
> La pública puede cambiar cada vez que el router se reinicia, salvo que el operador te dé una IP fija. Todos los equipos de tu casa salen a internet con esa misma dirección: eso es el NAT.

## Entrar en la configuración

Se pone la dirección privada del router en el navegador (`http://192.168.1.1`) y pide usuario y contraseña. Por defecto suele ser `admin` y una contraseña impresa en la pegatina de debajo del aparato.

> [!WARNING]
> Lo primero que hay que hacer en un router nuevo es cambiar esa contraseña, en **Configuración avanzada → Administración** o equivalente. Muchos modelos no permiten cambiar el nombre de usuario, solo la contraseña. Las credenciales por defecto de cada modelo están publicadas en internet, así que un router con las de fábrica está abierto a cualquiera que entre en la red.

## Lo que se configura

### Características físicas

Merece la pena mirar la parte de atrás antes de tocar nada. Un router de fibra típico tiene:

| Elemento | Para qué |
|---|---|
| Conector de fibra | La acometida del operador |
| 4 × RJ-45 | El switch interno, para equipos por cable |
| 2 × RJ-11 | Telefonía fija |
| Puerto USB | Compartir un disco o una impresora en la red |
| Botón WPS | Emparejado rápido sin escribir la contraseña |
| Botón de reset | Volver a la configuración de fábrica |

### DHCP

En **Configuración de red → DHCP**. Se puede activar o desactivar, y ajustar:

- El **rango** de direcciones que reparte (por ejemplo de la `.100` a la `.200`).
- La **máscara** y la **puerta de enlace** que entrega junto a cada dirección.
- Las **reservas**: fijar siempre la misma dirección a un equipo concreto por su MAC. Es lo que se hace con impresoras, NAS y cámaras.

> [!TIP]
> Dejar el rango del DHCP desde la `.100` en adelante libera las direcciones bajas para los equipos con IP fija. Así no se solapan nunca.

### Red inalámbrica

- **SSID** — el nombre de la red. Ocultar su difusión no es seguridad real: la red se sigue detectando.
- **Banda** — 2,4 GHz llega más lejos y atraviesa mejor las paredes; 5 GHz va más rápido y tiene menos interferencias, pero menos alcance.
- **Canal** — en 2,4 GHz los que no se solapan son el 1, el 6 y el 11. Si hay muchas redes vecinas, elegir uno de esos a mano suele ir mejor que el automático.
- **Seguridad** — WPA2 como mínimo, WPA3 si el router lo trae. WEP y WPA están roídos y se rompen en minutos.

### Modo de conexión

En la sección de estado o de internet se ve cómo sale el router: la tecnología de acceso, si la dirección la recibe por DHCP del operador o es fija, y si hay PPPoE con usuario y contraseña del proveedor.

## Reset y guardado

Para volver a fábrica hay dos caminos: el **botón de reset** físico, pulsado unos cinco segundos con el router encendido, o la opción correspondiente dentro de la configuración. Las dos borran todo, incluidos el SSID y la contraseña personalizados.

> [!WARNING]
> En la mayoría de estos routers **no hay un guardado global**: cada pestaña se guarda por separado. Si cambias algo en cortafuegos y te vas a otra sección sin pulsar guardar, ese cambio se pierde.
