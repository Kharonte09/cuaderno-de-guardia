---
titulo: Cómo funciona la web
subtitulo: true
---

# Cómo funciona la web

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Lo que pasa entre escribir una dirección y ver la página. Entenderlo es la diferencia entre arreglar un problema y probar cosas al azar.

## Internet no es la web

Son dos cosas distintas, y se usan como sinónimos:

- **Internet** es la red de redes: la infraestructura que conecta ordenadores de todo el mundo.
- **La web** es *un* servicio que funciona sobre internet, el de las páginas enlazadas entre sí.

Sobre internet van muchos más servicios: correo, mensajería, DNS, transferencia de ficheros, videollamadas, juegos. La web es el más visible, no el único.

## Cliente y servidor

Casi todo en internet funciona con este reparto:

- El **cliente** pide. En la web, el navegador.
- El **servidor** responde. Una máquina que está encendida esperando peticiones.

El cliente siempre empieza la conversación. El servidor no llama a tu navegador: espera.

## Qué pasa al escribir una dirección

1. **Se interpreta la URL** y se separa en sus partes.
2. **Se resuelve el nombre** por DNS: el navegador necesita la dirección IP del servidor, porque `ejemplo.es` no le sirve para conectarse.
3. **Se abre la conexión** TCP con esa IP, al puerto 80 (HTTP) o 443 (HTTPS). Si es HTTPS, además se negocia el cifrado TLS.
4. **Se envía la petición** HTTP: "dame este recurso".
5. **El servidor responde** con un código de estado y el contenido.
6. **El navegador interpreta** el HTML, y va pidiendo lo que falta: hojas de estilo, imágenes, scripts. Cada una es otra petición.
7. **Se dibuja la página.**

Todo eso, unas cuantas veces, en menos de un segundo.

## Las partes de una URL

```
https://www.ejemplo.es:443/apuntes/redes.html?tema=ipv4#subredes
└─┬─┘   └──────┬──────┘└┬┘└────────┬────────┘└────┬────┘└───┬──┘
protocolo    dominio  puerto     ruta         parámetros  fragmento
```

| Parte | Qué es |
|---|---|
| **Protocolo** | Cómo se habla: `http`, `https`, `ftp` |
| **Dominio** | El nombre del servidor, que el DNS traduce a una IP |
| **Puerto** | Dónde escucha. Se omite cuando es el habitual del protocolo |
| **Ruta** | Qué recurso se pide dentro del servidor |
| **Parámetros** | Datos que se envían en la propia dirección, tras `?` |
| **Fragmento** | A qué parte de la página ir, tras `#`. **No se envía al servidor** |

> [!WARNING]
> Lo que va en los parámetros de la URL queda en el historial del navegador, en los registros del servidor y en los de cualquier intermediario. Por eso **nunca se manda una contraseña ni un dato personal en la URL**, ni aunque la conexión sea HTTPS.

## El DNS

El **DNS** es la agenda de internet: traduce nombres en direcciones IP. Sin él habría que memorizar direcciones numéricas.

Cuando el navegador pide un nombre, la consulta va pasando por varios sitios hasta que alguien lo sabe: la caché del propio equipo, el servidor DNS configurado (normalmente el del router o el del operador), y de ahí a los servidores que tienen autoridad sobre ese dominio.

```
nslookup ejemplo.es
ping ejemplo.es
```

> [!TIP]
> Es la primera comprobación cuando "no va internet": si `ping 8.8.8.8` funciona pero `ping google.es` no, hay conexión y el problema es el **DNS**, no la red. Se arregla cambiando el servidor DNS, no reiniciando el router.

## HTTP y HTTPS

**HTTP** es el protocolo de la web. Funciona por peticiones y respuestas, y es **sin estado**: cada petición es independiente y el servidor no recuerda la anterior. Lo que da continuidad son las *cookies* y las sesiones.

**HTTPS** es lo mismo dentro de un túnel cifrado con TLS. Aporta tres cosas: que nadie por el camino pueda **leer** el contenido, que nadie pueda **modificarlo** y la **garantía** de estar hablando con quien dice ser, gracias al certificado del servidor.

### Métodos

| Método | Para qué |
|---|---|
| `GET` | Pedir un recurso |
| `POST` | Enviar datos, como un formulario |
| `PUT` | Crear o reemplazar |
| `DELETE` | Borrar |
| `HEAD` | Pedir solo las cabeceras, sin el contenido |

### Códigos de estado

| Familia | Significa | Ejemplos habituales |
|---|---|---|
| **2xx** | Ha ido bien | `200 OK` |
| **3xx** | Redirección | `301` permanente, `302` temporal |
| **4xx** | Error del cliente | `400` mal formada, `401` sin autenticar, `403` prohibido, **`404` no existe** |
| **5xx** | Error del servidor | `500` error interno, `502` pasarela incorrecta, `503` no disponible |

> [!IMPORTANT]
> La familia del código dice **de quién es el problema**, y eso ahorra muchísimo tiempo: un `404` o un `403` es cosa de lo que se pidió o de los permisos; un `500` es que el servidor se ha roto por dentro y hay que mirar sus registros.

## Indexación: cómo llega tu web al buscador

Los buscadores usan programas automáticos, las **arañas**, que recorren la web siguiendo enlaces. De lo que encuentran, guardan una copia en su **índice**, y cuando alguien busca algo consultan ese índice y ordenan los resultados.

Así que para aparecer hacen falta tres cosas, en este orden:

1. Que la araña **pueda llegar** a tu página: que haya enlaces hacia ella y que `robots.txt` no la excluya.
2. Que **pueda entenderla**: HTML bien construido, con títulos y texto de verdad.
3. Que **merezca aparecer** por delante de las demás.

De eso último va el [SEO](#/smr/web/seo).
