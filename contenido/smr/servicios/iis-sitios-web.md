---
titulo: Publicar sitios web con IIS
subtitulo: true
---

# Publicar sitios web con IIS

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Levantar varios sitios en el mismo servidor, cada uno en su puerto, uno con HTTPS y otro protegido con usuario y contraseña.

## Instalar el servidor web

**IIS** (*Internet Information Services*) es el servidor web de Windows, y se añade como un rol más:

1. **Administrar → Agregar roles y características**.
2. Marcar **Servidor web (IIS)**.
3. Añadir las características que se vayan a necesitar: autenticación básica, FTP, certificados.
4. Instalar.

Para comprobar que está en marcha, se abre `http://localhost` en el propio servidor: debe salir la página de bienvenida de IIS.

## Crear un sitio

Desde el **Administrador de IIS**, en *Sitios → Agregar sitio web*:

| Campo | Qué se pone |
|---|---|
| **Nombre del sitio** | Un nombre descriptivo, solo para identificarlo en la consola |
| **Ruta de acceso física** | La carpeta del disco donde están los ficheros del sitio |
| **Tipo** | HTTP o HTTPS |
| **Dirección IP** | La del servidor, o todas las disponibles |
| **Puerto** | 80 para el primero, otro para los demás |
| **Nombre de host** | Opcional, si se van a distinguir por nombre en vez de por puerto |

En la carpeta se pone el `index.html` del sitio, y con eso ya responde.

## Varios sitios en un servidor

Dos sitios no pueden escuchar en el mismo puerto de la misma IP. Hay tres formas de separarlos:

- **Por puerto** — el primero en el 80 y los demás en puertos libres (8080, 88, 85…). Es lo más sencillo en un laboratorio, y obliga a escribir el puerto en la URL: `http://192.168.80.5:88`.
- **Por nombre de host** — todos en el 80, y IIS decide según el nombre con el que se le llame. Es lo que se hace en producción.
- **Por dirección IP** — cada sitio en su propia IP, si el servidor tiene varias.

> [!IMPORTANT]
> Cambiar el puerto en IIS no basta: el **cortafuegos de Windows** bloquea por defecto lo que no conoce. Hay que crear una **regla de entrada** para ese puerto, o el sitio funcionará solo desde el propio servidor y dará tiempo de espera agotado desde cualquier otro equipo.

### Crear la regla en el cortafuegos

1. Abrir el **Firewall de Windows Defender con seguridad avanzada**.
2. **Reglas de entrada → Nueva regla**.
3. Tipo **Puerto**, protocolo **TCP**, y el número del puerto.
4. **Permitir la conexión**.
5. Elegir en qué perfiles se aplica (dominio, privado, público).
6. Darle un nombre reconocible.

## HTTPS

Para servir por HTTPS hace falta un **certificado**. En un laboratorio se usa uno **autofirmado**, que se crea desde IIS mismo: *Certificados de servidor → Crear un certificado autofirmado*.

Después, al crear o editar el sitio, se elige tipo **https**, puerto **443** y ese certificado.

> [!NOTE]
> Un certificado autofirmado cifra igual de bien que uno comprado: la diferencia es que **nadie lo avala**. El navegador avisará de que el certificado no es de confianza, porque no lo emite una autoridad reconocida. Para un entorno de pruebas se acepta la advertencia y se sigue; para un sitio público hace falta un certificado emitido por una autoridad de certificación.

## Proteger un sitio con usuario y contraseña

La **autenticación básica** pide credenciales antes de mostrar el contenido:

1. Instalar la característica **Autenticación básica** de IIS, si no está.
2. Crear en el servidor un **usuario local** para ese acceso.
3. En el sitio o la carpeta a proteger, abrir **Autenticación**: desactivar la *anónima* y activar la *básica*.
4. En los **permisos** de la carpeta, dar acceso a ese usuario.

Al entrar, el navegador pedirá usuario y contraseña.

> [!WARNING]
> La autenticación básica envía las credenciales **codificadas en base64, no cifradas**. Sobre HTTP van en claro y cualquiera que capture el tráfico las lee. Solo tiene sentido **sobre HTTPS**. Es un ejercicio perfecto para ver esto con un analizador de tráfico: se captura el acceso y ahí está el usuario y la contraseña, legibles.

## Probarlo desde un cliente

Desde otra máquina de la misma red interna se comprueba cada sitio:

| Prueba | URL | Qué debe pasar |
|---|---|---|
| Sitio principal | `http://192.168.80.5` | Carga directo |
| Segundo sitio | `http://192.168.80.5:88` | Carga, si la regla del cortafuegos está |
| Sitio con HTTPS | `https://192.168.80.5` | Avisa del certificado y luego carga |
| Sitio protegido | `http://192.168.80.5/privado` | Pide usuario y contraseña |

### Si no carga

1. **Ping** al servidor: si no responde, el problema es de red, no del sitio.
2. Desde el servidor, `http://localhost:puerto`: si ahí funciona, es el cortafuegos.
3. `netstat -an | findstr :88` en el servidor, para ver si algo está escuchando en ese puerto.
4. Revisar que el sitio esté **iniciado** en la consola de IIS.
5. Comprobar que las dos máquinas están en la **misma red interna** y en el mismo rango.
