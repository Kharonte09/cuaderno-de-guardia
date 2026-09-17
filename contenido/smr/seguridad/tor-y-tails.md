---
titulo: Tor y Tails
subtitulo: true
---

# Tor y Tails

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Dos herramientas de anonimato que se confunden constantemente. Una es una red, la otra es un sistema operativo entero, y hacen cosas distintas.

## Tor

**Tor** es una red de comunicaciones montada por encima de internet en la que el camino que recorre un mensaje no revela quién lo envía. El tráfico va cifrado en capas y salta por al menos tres nodos voluntarios:

1. **Nodo de entrada** — sabe quién eres, pero no a dónde vas.
2. **Nodo intermedio** — no sabe ninguna de las dos cosas.
3. **Nodo de salida** — sabe a dónde va el tráfico, pero no de quién viene.

Ningún nodo tiene las dos mitades de la información, y de ahí sale el anonimato. El **Navegador Tor** es un Firefox preparado para usar esa red y para no delatarte por otras vías (sin identificadores persistentes, con todos los usuarios pareciéndose entre sí).

### Los dominios .onion

Dentro de la red Tor existen **servicios ocultos**, con direcciones que acaban en `.onion` en lugar de `.com` o `.es`. No son nombres legibles, sino una cadena larga de letras y números, porque **la dirección se deriva de la clave criptográfica del servicio**. Eso hace que no haga falta registrar un dominio ni confiar en un DNS: la dirección *es* la identidad del servidor.

### Deep web y dark web

Son dos cosas distintas y se mezclan todo el rato:

| Término | Qué es |
|---|---|
| **Web profunda** (*deep web*) | Todo lo que los buscadores no indexan: tu correo, la intranet del trabajo, una base de datos tras un formulario. Es la mayor parte de internet y es completamente normal |
| **Web oscura** (*dark web*) | Lo que solo es accesible por redes como Tor. Es una porción pequeñísima |

Que algo esté en la deep web no tiene nada de siniestro: esta misma frase, si estuviera tras un inicio de sesión, estaría ahí.

## Tails

**Tails** es un sistema operativo **en vivo** (*live*): arranca desde un USB o un DVD, se ejecuta en memoria y **no se instala**. Dos consecuencias:

- **No deja rastro** en el equipo donde se usa: al apagar, la memoria se borra y el disco del ordenador no se ha tocado.
- **Empieza siempre limpio**, desde el mismo punto, sin arrastrar nada de la sesión anterior.

Además, todo su tráfico de red sale **forzosamente por Tor**: no hay forma de que una aplicación se conecte por fuera por descuido.

### Qué trae dentro

- El **Navegador Tor**.
- Cliente de **correo** y de **mensajería** cifrada.
- Herramientas de **cifrado** de ficheros y de gestión de claves.
- Un **monedero** de criptomonedas.
- Utilidades de borrado seguro y de gestión de la persistencia.

### Probarlo

Se descarga la imagen de la web oficial del proyecto y se puede arrancar de dos formas:

- **En una máquina virtual** (VirtualBox), que es lo cómodo para verlo por dentro.
- **En un USB**, que es su uso real.

El arranque pide idioma y teclado, y luego ofrece elegir el nivel de ajustes: el modo estándar ya sale por Tor, y hay opciones adicionales para redes que censuran o bloquean Tor, usando **puentes** (*bridges*) y proxies.

> [!NOTE]
> En una máquina virtual, Tails avisa de que el anfitrión podría estar comprometido y que por tanto no puede garantizar lo que promete. Para aprender está bien; para usarlo de verdad, USB.

## La diferencia, en una tabla

| | Tor | Tails |
|---|---|---|
| **Qué es** | Una red, y un navegador que la usa | Un sistema operativo completo |
| **Se instala** | Sí, como un programa más | No: arranca desde USB |
| **Qué anonimiza** | Lo que pase por el navegador | Todo el tráfico del sistema |
| **Rastro en el equipo** | Deja el programa y su configuración | Ninguno |
| **Incluye Tor** | Es Tor | Sí, y lo usa para todo |

Resumido: **Tor anonimiza tu navegación; Tails anonimiza toda tu sesión de trabajo** y no deja huella en la máquina.

## Qué protege y qué no

> [!WARNING]
> El anonimato de red no protege contra lo que tú mismo cuentes. Iniciar sesión en tu cuenta de siempre a través de Tor te identifica igual de bien que sin Tor. Y el **nodo de salida** ve el tráfico que no va cifrado de extremo a extremo, así que HTTPS sigue siendo imprescindible.

Estas herramientas son legales y su razón de existir es legítima: periodistas, investigadores y personas en países con censura las usan a diario. Que también las use quien no debería no cambia para qué están hechas.

En el trabajo defensivo se estudian por el otro lado: saber que un tráfico sale por nodos de Tor conocidos, o reconocer el arranque de un sistema en vivo en un equipo corporativo, son señales que aparecen en la investigación de un incidente.
