---
titulo: Logs y telemetría
subtitulo: true
---

# Logs y telemetría

No se puede detectar lo que no se recoge. Antes de escribir una sola regla hay que responder a: **¿tengo el dato?** Esta página es la chuleta de qué eventos importan y de dónde salen.

## Windows: Event IDs esenciales

### Autenticación y cuentas (log *Security*)

| ID | Evento | Por qué importa |
|---|---|---|
| **4624** | Inicio de sesión correcto | El campo *Logon Type* lo es todo |
| **4625** | Inicio de sesión fallido | Fuerza bruta y *password spraying* |
| **4634 / 4647** | Cierre de sesión | Duración de la sesión |
| **4648** | Inicio de sesión con credenciales explícitas | Uso de *runas*, movimiento lateral |
| **4672** | Privilegios especiales asignados | Sesión con permisos administrativos |
| **4720** | Cuenta de usuario creada | Persistencia clásica |
| **4722 / 4725** | Cuenta habilitada / deshabilitada | Reactivación de cuentas viejas |
| **4726** | Cuenta borrada | Borrado de rastro |
| **4728 / 4732 / 4756** | Miembro añadido a grupo (global/local/universal) | Escalada de privilegios |
| **4738** | Cuenta modificada | Cambios de contraseña o de atributos |
| **4740** | Cuenta bloqueada | Consecuencia de fuerza bruta |
| **4768 / 4769 / 4771** | Kerberos: TGT, ticket de servicio, prefallo | Kerberoasting, AS-REP roasting |
| **4776** | Validación NTLM | Autenticación heredada |

**Logon Types del 4624**, que se preguntan siempre:

| Tipo | Significado | Nota |
|---|---|---|
| 2 | Interactivo | Alguien delante del teclado |
| 3 | Red | SMB, acceso a recursos compartidos |
| 4 | Batch | Tarea programada |
| 5 | Servicio | Arranque de servicio |
| 7 | Desbloqueo | Desbloqueo de pantalla |
| 8 | NetworkCleartext | Credencial en claro (IIS básico) |
| 9 | NewCredentials | `runas /netonly` |
| **10** | RemoteInteractive | **RDP** |
| 11 | CachedInteractive | Credenciales en caché, sin DC |

> [!TIP]
> `4625` + `Logon Type 3` + muchas cuentas distintas desde una IP = *password spraying*. `4625` con una sola cuenta y muchos intentos = fuerza bruta. Distinguirlos cambia la respuesta.

### Procesos y ejecución

| ID | Evento | Nota |
|---|---|---|
| **4688** | Proceso creado | **Hay que activar la línea de comandos por GPO**, no viene por defecto |
| **4689** | Proceso terminado | |
| **1102** | Log de seguridad borrado | Altísima fidelidad. Casi siempre es malo |
| **7045** | Servicio nuevo instalado (System) | PsExec, persistencia |
| **7034 / 7036** | Servicio caído / cambio de estado | |
| **4697** | Servicio instalado (Security) | |
| **4698 / 4702** | Tarea programada creada / modificada | Persistencia |
| **4657** | Valor de registro modificado | Requiere auditoría específica |

### PowerShell

| ID | Log | Qué da |
|---|---|---|
| **4103** | Microsoft-Windows-PowerShell/Operational | Registro de módulos y pipeline |
| **4104** | Microsoft-Windows-PowerShell/Operational | **Script Block Logging**: el código completo, ya desofuscado |
| **400 / 403** | Windows PowerShell | Inicio y fin del motor |

> [!IMPORTANT]
> El 4104 registra el bloque de script tal como se ejecuta, así que muestra el contenido aunque venga en Base64. Se activa por GPO: *Administrative Templates → Windows Components → Windows PowerShell → Turn on PowerShell Script Block Logging*.

### Sysmon

Sysmon no viene instalado y añade la telemetría que Windows no registra por defecto:

| ID | Evento | Uso principal |
|---|---|---|
| **1** | Creación de proceso | Línea de comandos, hash, **proceso padre** |
| **2** | Cambio de marca de tiempo de fichero | *Timestomping* |
| **3** | Conexión de red | Qué proceso hizo la conexión |
| **5** | Proceso terminado | |
| **6** | Driver cargado | Rootkits, BYOVD |
| **7** | Imagen (DLL) cargada | **DLL sideloading** |
| **8** | CreateRemoteThread | Inyección de procesos |
| **10** | Acceso a proceso | **Acceso a LSASS** = volcado de credenciales |
| **11** | Fichero creado | Payloads escritos a disco |
| **12/13/14** | Registro: clave/valor creado o modificado | Persistencia |
| **15** | Fichero creado con *stream* alternativo | **Mark of the Web**, descargas de internet |
| **17/18** | Named pipe creado / conectado | Cobalt Strike y frameworks C2 |
| **22** | Consulta DNS | Qué proceso resolvió qué dominio |
| **23/26** | Fichero borrado | Borrado de rastro |

> [!TIP]
> El evento **1 de Sysmon** con el proceso padre sostiene buena parte de las detecciones. `winword.exe` lanzando `powershell.exe` no tiene explicación legítima en casi ninguna organización.

## Linux

| Fuente | Qué contiene |
|---|---|
| `/var/log/auth.log` (Debian) · `/var/log/secure` (RHEL) | Autenticación, `sudo`, SSH |
| `/var/log/syslog` · `/var/log/messages` | General del sistema |
| `/var/log/audit/audit.log` | **auditd**: llamadas al sistema, la fuente rica |
| `journalctl` | Systemd, unificado |
| `~/.bash_history` | Comandos del usuario (fácil de manipular) |
| `/var/log/cron` | Tareas programadas |
| `last`, `lastb`, `/var/run/utmp` | Sesiones y accesos fallidos |

Consultas útiles:

```bash
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn
grep "Accepted publickey" /var/log/auth.log       # accesos con clave SSH
ausearch -k exec_cmd --start recent               # con auditd bien configurado
journalctl -u ssh --since "1 hour ago"
```

Persistencia a revisar en Linux: `crontab -l` de cada usuario, `/etc/cron.*`, unidades de systemd en `/etc/systemd/system`, `~/.bashrc` y `~/.profile`, `/etc/ld.so.preload`, claves en `~/.ssh/authorized_keys`.

## Red e identidad

| Fuente | Aporta |
|---|---|
| **Firewall** | Conexiones permitidas y denegadas, dirección y volumen |
| **Proxy web** | URL completa, user-agent, categoría, bytes |
| **DNS** | Qué dominios se resuelven. Barato de recoger y detecta C2 y exfiltración |
| **VPN** | Quién entra, desde dónde y con qué dispositivo |
| **Zeek** | `conn.log`, `dns.log`, `http.log`, `ssl.log`, `files.log` |
| **Suricata** | Alertas de firma y metadatos EVE JSON |
| **NetFlow** | Volumetría sin contenido, útil a gran escala |

En **identidad y nube** (Entra ID, Google Workspace, AWS): inicios de sesión, cambios de MFA, consentimientos OAuth, creación de claves de acceso, cambios de permisos, reglas de reenvío de correo. Hoy es donde ocurre la mitad de los incidentes.

## Qué recoger si el presupuesto es limitado

Por orden de relación coste/cobertura:

1. **Sysmon** (eventos 1, 3, 7, 8, 10, 11, 22) — gratis.
2. **PowerShell 4104** — gratis, por GPO.
3. **Security: 4624, 4625, 4672, 4720, 4728, 4732, 1102, 7045, 4698** — gratis.
4. **DNS** — barato y detecta C2 y exfiltración.
5. **Proxy / firewall de salida** — ya lo tienes, sólo hay que enviarlo.
6. **Identidad cloud** — suele venir incluido en la licencia.
7. EDR — el gasto grande, pero el que más cubre.

> [!WARNING]
> Los atacantes llevan de media semanas dentro antes de ser detectados: con 7 días de retención no se puede reconstruir el incidente. Mínimo razonable: 90 días en caliente y un año en frío para los logs principales.

## Higiene de la recolección

- **Sincroniza los relojes** (NTP) en toda la flota, o ninguna línea temporal será fiable.
- **Trabaja en UTC** y guarda la zona horaria de origen.
- **Normaliza** a un esquema común (ECS, OCSF o el del SIEM) para poder correlacionar entre fuentes.
- **Monitoriza la recolección misma**: una fuente que deja de enviar logs debe generar alerta. Apagar el agente es una técnica de evasión habitual.
