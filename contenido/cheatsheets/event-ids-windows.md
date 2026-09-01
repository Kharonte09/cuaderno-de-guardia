---
titulo: Event IDs de Windows
subtitulo: true
---

# Event IDs de Windows

Chuleta de consulta rápida. La explicación de qué es cada cosa y cómo se activa está en [Logs y telemetría](#/blue-team/logs-y-telemetria); esta página es sólo para tener la tabla a mano.

## Autenticación (log Security)

| ID | Evento |
|---|---|
| 4624 | Inicio de sesión correcto |
| 4625 | Inicio de sesión fallido |
| 4634 / 4647 | Cierre de sesión |
| 4648 | Sesión con credenciales explícitas (`runas`) |
| 4672 | Privilegios especiales asignados (sesión admin) |
| 4740 | Cuenta bloqueada |
| 4768 | Kerberos: TGT solicitado |
| 4769 | Kerberos: ticket de servicio (Kerberoasting) |
| 4771 | Kerberos: prefallo de autenticación |
| 4776 | Validación de credenciales NTLM |

### Logon Types del 4624 / 4625

| Tipo | Significado |
|---|---|
| 2 | Interactivo (teclado) |
| 3 | Red (SMB, recursos compartidos) |
| 4 | Batch (tarea programada) |
| 5 | Servicio |
| 7 | Desbloqueo de pantalla |
| 8 | NetworkCleartext (credencial en claro) |
| 9 | NewCredentials (`runas /netonly`) |
| **10** | **RemoteInteractive (RDP)** |
| 11 | CachedInteractive (sin DC) |

## Cuentas y grupos

| ID | Evento |
|---|---|
| 4720 | Cuenta de usuario creada |
| 4722 | Cuenta habilitada |
| 4725 | Cuenta deshabilitada |
| 4726 | Cuenta borrada |
| 4738 | Cuenta modificada |
| 4728 | Miembro añadido a grupo global |
| 4732 | Miembro añadido a grupo local |
| 4756 | Miembro añadido a grupo universal |
| 4767 | Cuenta desbloqueada |

## Procesos, servicios y tareas

| ID | Log | Evento |
|---|---|---|
| 4688 | Security | Proceso creado (activar línea de comandos por GPO) |
| 4689 | Security | Proceso terminado |
| 4697 | Security | Servicio instalado |
| 7045 | System | Servicio instalado (PsExec, persistencia) |
| 7034 | System | Servicio terminado inesperadamente |
| 7036 | System | Cambio de estado de servicio |
| 4698 | Security | Tarea programada creada |
| 4699 | Security | Tarea programada borrada |
| 4702 | Security | Tarea programada modificada |
| 4657 | Security | Valor de registro modificado |

## Borrado de rastro

| ID | Log | Evento |
|---|---|---|
| **1102** | Security | **Log de seguridad borrado** |
| 104 | System | Log del sistema borrado |
| 4719 | Security | Política de auditoría cambiada |

## PowerShell

| ID | Log | Qué da |
|---|---|---|
| **4104** | PowerShell/Operational | **Script Block Logging: el código completo, desofuscado** |
| 4103 | PowerShell/Operational | Registro de módulo y pipeline |
| 400 | Windows PowerShell | Motor iniciado |
| 403 | Windows PowerShell | Motor detenido |

## Sysmon

| ID | Evento |
|---|---|
| 1 | Creación de proceso (línea de comandos, hash, **padre**) |
| 2 | Marca de tiempo de fichero cambiada (*timestomping*) |
| 3 | Conexión de red, con el proceso que la hace |
| 5 | Proceso terminado |
| 6 | Driver cargado |
| 7 | Imagen (DLL) cargada — *sideloading* |
| 8 | CreateRemoteThread — inyección |
| 9 | RawAccessRead |
| **10** | **Acceso a proceso — LSASS = volcado de credenciales** |
| 11 | Fichero creado |
| 12 / 13 / 14 | Registro: clave o valor creado, modificado, renombrado |
| 15 | Fichero creado con *stream* alternativo (Mark of the Web) |
| 17 / 18 | Named pipe creado / conectado |
| 22 | Consulta DNS, con el proceso que la hace |
| 23 / 26 | Fichero borrado |
| 25 | Proceso manipulado (*process hollowing*) |

## Combinaciones que valen como alerta

| Patrón | Qué sugiere |
|---|---|
| 4625 · muchas cuentas · una IP | *Password spraying* |
| 4625 · una cuenta · muchos intentos | Fuerza bruta |
| 4624 tipo 10 desde IP externa | RDP expuesto |
| 4720 + 4728/4732 en minutos | Creación de admin por el atacante |
| 7045 con binario en `%TEMP%` | PsExec o persistencia |
| Sysmon 1 con padre Office | Macro maliciosa |
| Sysmon 10 sobre `lsass.exe` | Volcado de credenciales |
| 1102 sin cambio programado | Borrado de rastro |
| 4104 con `-enc` / `FromBase64String` | PowerShell ofuscado |

## Consultas rápidas

```powershell
# Últimos 50 inicios de sesión fallidos
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4625} -MaxEvents 50 |
  Select-Object TimeCreated, @{n='Cuenta';e={$_.Properties[5].Value}}, @{n='IP';e={$_.Properties[19].Value}}

# Servicios instalados en las últimas 24 h
Get-WinEvent -FilterHashtable @{LogName='System'; ID=7045; StartTime=(Get-Date).AddDays(-1)}

# Bloques de PowerShell registrados
Get-WinEvent -LogName 'Microsoft-Windows-PowerShell/Operational' |
  Where-Object Id -eq 4104 | Select-Object -First 20 TimeCreated, Message

# ¿Se ha borrado el log de seguridad alguna vez?
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=1102}
```

> [!TIP]
> `wevtutil qe Security /q:"*[System[(EventID=4625)]]" /f:text /c:20` hace lo mismo desde `cmd`, sin PowerShell, cuando estás en un equipo donde no quieres dejar rastro de PowerShell.
