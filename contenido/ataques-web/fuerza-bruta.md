---
titulo: Fuerza bruta
subtitulo: true
---

# Fuerza bruta

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Probar credenciales de forma automatizada hasta dar con una válida. No es exclusivo de la web: se ataca igual un login web que RDP, SSH, la VPN o el correo. A diferencia de una inyección, **cada intento por separado es legítimo**: lo que delata el ataque es el **volumen y el patrón**.

## Online y offline

| Tipo | Contra qué | Qué rastro deja |
|---|---|---|
| **Online** | Un servicio activo: web, correo, SSH, RDP, VPN, bases de datos | Mucho: cada intento es un evento en los logs del servicio |
| **Offline** | Hashes o datos cifrados que el atacante ya tiene y ataca en su equipo | **Ninguno** en el servicio atacado |

Los hashes para un ataque offline se consiguen, por ejemplo, con una SQLi que vuelca la tabla de usuarios, copiando la SAM o el `NTDS.dit` de Windows, o capturando el handshake de una wifi.

### Métodos

- **Diccionario:** probar las palabras de una lista. Funciona porque mucha gente usa contraseñas comunes o predecibles.
- **Fuerza bruta pura:** todas las combinaciones dentro de un rango. Solo es viable para contraseñas cortas.
- **Rainbow tables:** tablas precalculadas que dan la contraseña a partir de su hash. Rápidas, pero se neutralizan con *salt*.

## Las variantes que importan (MITRE)

| Variante | Qué hace | Patrón en los logs |
|---|---|---|
| **Password guessing** (T1110.001) | Un usuario contra muchas contraseñas | Muchos fallos en **la misma cuenta** |
| **Password spraying** (T1110.003) | Pocas contraseñas contra muchos usuarios | Muchas cuentas con **uno o dos fallos cada una**. Esquiva el bloqueo de cuentas |
| **Credential stuffing** (T1110.004) | Pares usuario/contraseña filtrados de otros servicios | Muchas IPs, pocos intentos por cuenta y una tasa de éxito anormalmente alta |

La **enumeración de directorios** (*directory brute force*) usa la misma técnica pero no busca credenciales: busca rutas ocultas. Se ve como ráfagas de `404` desde una misma IP.

> [!IMPORTANT]
> Lo que convierte una alerta de fuerza bruta en un incidente es **un acceso correcto al final**. Una serie de fallos seguida de un éxito, desde la misma IP o contra la misma cuenta, significa que el atacante ha entrado.

## Cómo se ve en cada servicio

### SSH (Linux)

Se registra en `/var/log/auth.log`. Los intentos fallidos aparecen como `Failed password` y los correctos como `Accepted`:

```text
Failed password for root from 188.58.65.203 port 52114 ssh2
Failed password for invalid user admin from 188.58.65.203 port 52116 ssh2
Accepted password for soporte from 188.58.65.203 port 52190 ssh2
```

### Login web

Muchas peticiones `POST` al formulario de login desde la misma IP. La pista está en el **tamaño de la respuesta**: todos los fallos devuelven la misma página de error, con el mismo tamaño, y el intento correcto devuelve otra distinta. Ese cambio marca el momento en que el atacante acertó.

### Windows

En el log de **Seguridad**: el **4625** es el inicio de sesión fallido y el **4624** el correcto. El Logon Type dice por dónde: un **10** es RDP y un **3** es acceso por red. El detalle de cada evento está en [Artefactos de Windows](#/forense/artefactos-windows).

### Cómo se detecta en el SIEM

Con reglas que cuentan intentos fallidos en una ventana de tiempo: por cuenta (guessing), por IP origen contra muchas cuentas (spraying) y fallos seguidos de éxito. El ajuste de umbrales está en [Reglas de detección](#/siem/reglas).

## Prevención

- **MFA**, a ser posible resistente a phishing (FIDO2). El código por SMS o correo es el más débil.
- **Limitar intentos** por IP y por cuenta, con retrasos progresivos.
- **Bloqueo de cuentas**, con cuidado: frena el guessing pero no el spraying, y un atacante puede usarlo para bloquear a todo el mundo a propósito.
- **CAPTCHA** o detección de bots después de varios fallos.
- **Bloquear contraseñas comunes o filtradas** al crearlas.
- No obligar a cambiar la contraseña cada X meses sin motivo: NIST SP 800-63B lo desaconseja, porque lleva a contraseñas más predecibles.
