---
titulo: Ficheros y accesos
subtitulo: true
---

# Ficheros y accesos

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Ataques en los que la aplicación se fía de un **identificador, una ruta o una URL que controla el usuario**. A diferencia de las [inyecciones](#/ataques-web/inyecciones), muchas veces la petición no lleva nada que parezca código: solo cambia un valor.

## IDOR (Insecure Direct Object Reference)

La aplicación da acceso a un objeto (datos, ficheros, registros) a partir de un identificador que manda el usuario, **sin comprobar si ese usuario tiene permiso** sobre él. Es un caso de Broken Access Control, la A01 del OWASP Top 10.

```text
/factura?id=1041   →  mi factura (legítimo)
/factura?id=1042   →  la factura de otro cliente (IDOR)
```

- **Horizontal:** datos de otro usuario del mismo nivel.
- **Vertical:** funciones o datos de un rol superior, como el administrador.

**Cómo se ve en los logs:** es el más difícil de detectar, porque cada petición es válida. Lo que lo delata es el patrón: **un mismo usuario o IP recorriendo identificadores consecutivos**, todos con `200`.

**Prevención:** comprobar la autorización en el servidor en cada acceso; sacar la identidad de la sesión, no de un parámetro; denegar por defecto. Usar identificadores no predecibles (UUID) dificulta la enumeración, pero **no arregla** el fallo.

## Path traversal y LFI/RFI

Dos fallos parecidos que conviene distinguir:

| Fallo | Qué hace la aplicación con la ruta | Qué consigue el atacante |
|---|---|---|
| **Path traversal** | **Lee** el fichero y lo devuelve | Leer ficheros de fuera del directorio previsto |
| **LFI** (Local File Inclusion) | **Incluye y ejecuta** un fichero local (`include()` en PHP) | Leer ficheros y, con algo más, ejecutar código |
| **RFI** (Remote File Inclusion) | Incluye un fichero **de un servidor externo** | Ejecutar directamente el código del atacante |

```text
/imagen.php?nombre=foto1.jpg               →  el fichero previsto
/imagen.php?nombre=../../../etc/passwd     →  un fichero del sistema
```

Cada `../` sube un directorio; se repiten hasta llegar a la raíz.

### De LFI a ejecución de código

Leer ficheros es solo el caso básico. Una LFI se convierte en ejecución de código si el atacante consigue que el fichero incluido contenga código suyo:

- **Log poisoning:** mete código PHP en un campo que se registra (el `User-Agent`) y luego incluye el log del servidor, que se ejecuta.
- **Ficheros subidos:** sube una "imagen" con PHP dentro y la incluye.
- **Wrappers de PHP:** `php://filter/convert.base64-encode/resource=config.php` para leer el código fuente; `data://` o `php://input` para ejecutar código.

Un traversal con **escritura** (al subir ficheros con `../` en el nombre, o al descomprimir un ZIP preparado, el *Zip Slip*) también acaba en ejecución si permite dejar una webshell.

**Cómo se ve en los logs:** `../` y sus variantes codificadas (`%2e%2e%2f`, `..%2f`, `....//`), rutas de sistema (`/etc/passwd`, `win.ini`, `web.config`, `.env`), `php://` y URLs completas (`http://...`) en parámetros que deberían llevar un nombre de fichero.

> [!TIP]
> Si en una respuesta aparece el contenido de `/etc/shadow`, eso ya es un hallazgo aparte: solo `root` puede leerlo, así que el servicio web está corriendo como `root`.

**Prevención:** no pasar entrada del usuario a funciones de ficheros o de inclusión; usar una lista blanca de valores que el servidor traduce a ficheros fijos; canonicalizar la ruta (`realpath()`) y comprobar que sigue dentro del directorio base. Filtrar `../` a mano no funciona: `....//` se convierte en `../` después del filtro.

## Redirección abierta (open redirect)

La aplicación redirige a una URL que viene en un parámetro **sin validar el destino**. El servidor no queda comprometido: hace de trampolín.

```text
/login?next=/panel                →  redirección interna (legítimo)
/login?next=https://evil.example  →  redirección externa (open redirect)
```

Su uso principal es el **phishing con un dominio de confianza**: el enlace empieza por el dominio real de la empresa, así que el usuario se fía y la reputación de URL de la pasarela de correo lo deja pasar. También sirve para robar tokens OAuth si el `redirect_uri` se valida mal.

**Cómo se ve en los logs:** parámetros como `next`, `url`, `redirect`, `return` o `continue` con una URL externa, seguidos de un `302` o `301`. Si la redirección se hace en el navegador (con JavaScript), el log solo muestra la petición inicial.

**Prevención:** lista blanca de destinos comparando el host una vez parseada la URL; permitir solo rutas relativas (y rechazar `//evil.example` y `/\evil.example`); o que el parámetro sea un ID que el servidor traduce a una URL fija.
