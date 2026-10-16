---
titulo: Inyecciones
subtitulo: true
---

# Inyecciones

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Todas comparten la misma raíz: la aplicación mete **la entrada del usuario** dentro de algo que luego se interpreta (una consulta SQL, una página HTML, un comando del sistema, un XML) **sin separarla del código**. El atacante escribe código donde la aplicación esperaba datos.

## Inyección SQL (SQLi)

La aplicación **concatena la entrada del usuario en una consulta SQL** sin parametrizarla.

Consulta legítima de un login:

```sql
SELECT * FROM users WHERE username = 'USUARIO' AND password = 'CONTRASEÑA'
```

Si el atacante escribe `' OR 1=1 -- -` como usuario:

```sql
SELECT * FROM users WHERE username = '' OR 1=1 -- -' AND password = '...'
```

`1=1` siempre es verdadero y `--` comenta el resto, así que la consulta devuelve todas las filas. La aplicación suele quedarse con la primera, que a menudo es el administrador.

| Tipo | Cómo obtiene la respuesta |
|---|---|
| **In-band** | Por el mismo canal: el resultado aparece en la página (error-based, UNION-based). La más fácil |
| **Blind** | No ve el resultado; lo deduce de si la página cambia (boolean-based) o de cuánto tarda (time-based) |
| **Out-of-band** | Por otro canal, por ejemplo una consulta DNS a un servidor suyo |

**Impacto:** saltarse el login, leer o modificar la base de datos entera y, según el motor y los permisos, ejecutar comandos.

**Cómo se ve en los logs:** comillas (`'`, `%27`), `OR 1=1`, `UNION SELECT`, `ORDER BY` con números crecientes, comentarios (`--`, `#`, `/*`), `SLEEP(` o `WAITFOR DELAY` en las blind por tiempo, y respuestas que tardan justo esos segundos.

**Prevención:** **consultas parametrizadas** (*prepared statements*), que es la que funciona de verdad; mínimo privilegio para la cuenta de base de datos de la aplicación; no mostrar errores de base de datos al usuario.

## Cross-Site Scripting (XSS)

La aplicación **devuelve la entrada del usuario en la página sin codificarla**, y el navegador de la víctima la ejecuta como JavaScript.

| Tipo | Cómo funciona |
|---|---|
| **Reflejado** | El payload va en la petición (normalmente un enlace) y se refleja en la respuesta. Hay que conseguir que la víctima lo pulse. El más común |
| **Almacenado** | El payload se guarda (un comentario, un perfil) y se ejecuta a cada usuario que visita la página. El más peligroso |
| **DOM** | Lo procesa el propio JavaScript de la página en el navegador. Puede no llegar nunca al servidor, y entonces **no aparece en sus logs** |

**Impacto:** robo de cookies de sesión (si no tienen `HttpOnly`), formularios falsos para capturar credenciales, redirección a phishing, acciones en nombre de la víctima.

**Cómo se ve en los logs:** `<script>`, `%3Cscript%3E`, manejadores de eventos (`onerror=`, `onload=`), `javascript:`, `alert(`, `document.cookie`.

**Prevención:** **codificar la salida según el contexto** (HTML, atributo, JavaScript, URL); una Content Security Policy que limite qué scripts se pueden ejecutar; cookies con `HttpOnly` y `Secure`.

## Inyección de comandos (command injection)

La aplicación **pasa la entrada del usuario a la shell del sistema**. Los comandos se ejecutan con los privilegios del servicio web (`www-data`, `apache`, el AppPool de IIS); si el servicio corre como `root` o `SYSTEM`, el atacante tiene el servidor.

Una aplicación que copia el fichero subido a `/tmp`:

```bash
cp <nombre_fichero> /tmp
```

Si el fichero se llama `informe;ls;.txt`, la shell ejecuta `cp informe` (falla), `ls` (el comando del atacante) y `.txt /tmp` (error).

**Separadores habituales:** `;` `&&` `||` `|` `&`, salto de línea (`%0a`), `` `comando` `` y `$(comando)`.

Si el atacante no ve la salida (inyección ciega), confirma la ejecución por **tiempo** (`sleep 10`), **fuera de banda** (un `nslookup` o `curl` a un servidor suyo) o escribiendo la salida en un fichero accesible desde la web.

**Cómo se ve en los logs:** esos separadores en parámetros que no deberían llevarlos, y comandos como `whoami`, `id`, `uname`, `cat /etc/passwd`, `wget`, `curl`. En el servidor, el servicio web lanzando una shell como proceso hijo.

**Prevención:** no llamar a la shell con entrada del usuario y usar las funciones propias del lenguaje; si es inevitable, pasar los argumentos como lista y validar con lista blanca; mínimo privilegio y aislamiento del servicio.

## XXE (XML External Entity)

Aquí no se abusa de la lógica de la aplicación sino de una **funcionalidad legítima del estándar XML**: si el parser procesa entidades externas, el atacante define una que apunta a un fichero o a una URL, y el parser la resuelve.

```xml
<?xml version="1.0"?>
<!DOCTYPE data [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
<data>&xxe;</data>
```

El parser sustituye `&xxe;` por el contenido de `/etc/passwd`, y si la aplicación devuelve ese valor, el atacante lo lee.

| Variante | Qué consigue |
|---|---|
| **Clásica** | El contenido del fichero aparece en la respuesta |
| **Ciega / fuera de banda** | Carga un DTD externo del atacante y saca los datos por HTTP o DNS |
| **SSRF** | `SYSTEM "http://169.254.169.254/..."` hace que el servidor pida recursos internos, como los metadatos de la nube |
| **Billion Laughs** | Entidades anidadas que se expanden hasta agotar la memoria: denegación de servicio |

**Cómo se ve en los logs:** `<!DOCTYPE` y `<!ENTITY` con `SYSTEM` en peticiones que envían XML. Como suele ir en el cuerpo de un POST, el log de acceso normal **no lo muestra**: lo ve el WAF.

**Prevención:** deshabilitar los DTD y las entidades externas en el parser; si la aplicación no necesita XML, usar JSON.
