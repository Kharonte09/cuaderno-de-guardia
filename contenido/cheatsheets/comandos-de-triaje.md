---
titulo: Comandos de triaje
subtitulo: true
---

# Comandos de triaje

Lo que se teclea en un equipo sospechoso para hacerse una idea rápida. Contexto y metodología en [Triaje de alertas](#/blue-team/triaje-de-alertas) y [DFIR y forense](#/herramientas/dfir-y-forense).

> [!CAUTION]
> Todo lo que ejecutes en el equipo **modifica el equipo**. Si el caso puede acabar en informe formal o en juzgado, volca la memoria antes de tocar nada y anota cada comando con su hora.

## Windows · PowerShell

### Procesos

```powershell
Get-Process | Sort-Object CPU -Descending | Select-Object -First 15

# Procesos ejecutando desde rutas sospechosas
Get-Process | Where-Object { $_.Path -match '\\Temp\\|\\AppData\\|\\Public\\' } |
  Select-Object Name, Id, Path

# Árbol de procesos con línea de comandos
Get-CimInstance Win32_Process |
  Select-Object ProcessId, ParentProcessId, Name, CommandLine |
  Format-Table -AutoSize

# Ejecutables sin firma digital
Get-Process | ForEach-Object {
  if ($_.Path) { Get-AuthenticodeSignature $_.Path } } |
  Where-Object Status -ne 'Valid' | Select-Object Path, Status
```

### Red

```powershell
Get-NetTCPConnection -State Established |
  Select-Object LocalAddress, LocalPort, RemoteAddress, RemotePort, OwningProcess

# Conexiones con el nombre del proceso
Get-NetTCPConnection -State Established | ForEach-Object {
  [PSCustomObject]@{
    Remoto  = "$($_.RemoteAddress):$($_.RemotePort)"
    Proceso = (Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue).ProcessName
  }
} | Sort-Object Remoto -Unique

netstat -anob            # clásico, requiere administrador
Get-DnsClientCache | Select-Object Entry, Data
```

### Persistencia

```powershell
# Claves de ejecución automática
Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run'
Get-ItemProperty 'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run'
Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce'

# Tareas programadas no deshabilitadas y ajenas a Microsoft
Get-ScheduledTask | Where-Object { $_.State -ne 'Disabled' -and $_.TaskPath -notlike '\Microsoft\*' } |
  Select-Object TaskName, TaskPath, State

# Servicios cuyo binario no está en System32
Get-CimInstance Win32_Service |
  Where-Object { $_.PathName -notmatch 'System32' } |
  Select-Object Name, State, PathName

# Carpetas de inicio
Get-ChildItem "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup"
Get-ChildItem "$env:ProgramData\Microsoft\Windows\Start Menu\Programs\Startup"

# WMI (persistencia silenciosa)
Get-WmiObject -Namespace root\Subscription -Class __EventFilter
Get-WmiObject -Namespace root\Subscription -Class __EventConsumer
```

### Usuarios y accesos

```powershell
Get-LocalUser | Select-Object Name, Enabled, LastLogon
Get-LocalGroupMember -Group 'Administradores'    # 'Administrators' en inglés
query user                                       # sesiones activas
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4624} -MaxEvents 20
```

### Ficheros

```powershell
Get-FileHash -Algorithm SHA256 sospechoso.exe

# Ficheros creados en las últimas 24 h en rutas de usuario
Get-ChildItem $env:APPDATA, $env:TEMP -Recurse -File -ErrorAction SilentlyContinue |
  Where-Object CreationTime -gt (Get-Date).AddDays(-1) |
  Select-Object FullName, CreationTime, Length

# Ficheros descargados de internet (Mark of the Web)
Get-ChildItem $env:USERPROFILE\Downloads -Recurse |
  ForEach-Object { Get-Item $_.FullName -Stream Zone.Identifier -ErrorAction SilentlyContinue }
```

## Windows · cmd rápido

```
whoami /all
net user
net localgroup administradores
net share
tasklist /v
tasklist /svc
schtasks /query /fo LIST /v
wmic startup get caption,command
ipconfig /displaydns
arp -a
```

## Linux

### Procesos y red

```bash
ps auxf                              # árbol de procesos
ps aux --sort=-%cpu | head -15
ss -tulpn                            # puertos abiertos y su proceso
lsof -i -P -n                        # conexiones por proceso
lsof -p <PID>                        # ficheros abiertos por un proceso

# Procesos cuyo binario ya no existe en disco (muy sospechoso)
ls -l /proc/*/exe 2>/dev/null | grep deleted

# Ver el binario y el cwd real de un proceso
ls -l /proc/<PID>/exe /proc/<PID>/cwd
cat /proc/<PID>/cmdline | tr '\0' ' '
```

### Persistencia

```bash
crontab -l                           # del usuario actual
for u in $(cut -f1 -d: /etc/passwd); do echo "== $u"; crontab -l -u $u 2>/dev/null; done
ls -la /etc/cron.*  /etc/cron.d/
systemctl list-units --type=service --state=running
ls -la /etc/systemd/system/ /lib/systemd/system/
cat ~/.bashrc ~/.bash_profile /etc/profile
cat /etc/ld.so.preload 2>/dev/null    # debería estar vacío
cat ~/.ssh/authorized_keys
```

### Usuarios y accesos

```bash
last -a | head -20                   # últimos accesos
lastb | head -20                     # accesos fallidos
w                                    # quién está conectado ahora
awk -F: '$3 == 0 {print $1}' /etc/passwd      # cuentas con UID 0
grep -v '/nologin\|/false' /etc/passwd        # cuentas con shell
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn
grep "Accepted" /var/log/auth.log | tail -20
```

### Ficheros

```bash
find / -mtime -1 -type f 2>/dev/null                 # modificados en 24 h
find / -perm -4000 -type f 2>/dev/null               # binarios SUID
find /tmp /dev/shm /var/tmp -type f 2>/dev/null      # rutas favoritas del malware
sha256sum sospechoso
stat sospechoso                                       # las cuatro marcas de tiempo
strings -n 8 sospechoso | head -50
file sospechoso
```

## Volatility 3 (memoria)

```bash
vol -f memoria.raw windows.info          # perfil y datos del volcado
vol -f memoria.raw windows.pstree        # árbol de procesos
vol -f memoria.raw windows.pslist
vol -f memoria.raw windows.cmdline       # línea de comandos de cada proceso
vol -f memoria.raw windows.netscan       # conexiones y puertos
vol -f memoria.raw windows.malfind       # memoria con código inyectado
vol -f memoria.raw windows.dlllist --pid 1234
vol -f memoria.raw windows.filescan | grep -i temp
vol -f memoria.raw windows.dumpfiles --pid 1234
vol -f memoria.raw windows.registry.printkey --key "Software\Microsoft\Windows\CurrentVersion\Run"
```

## Adquisición rápida

```powershell
# Memoria (Windows)
winpmem.exe -o C:\evidencia\memoria.raw

# Triaje de artefactos con KAPE
kape.exe --tsource C: --tdest C:\triaje --target !SANS_Triage --mdest C:\salida --module !EZParser
```

```bash
# Imagen de disco (Linux, con el sistema montado en sólo lectura)
dd if=/dev/sda of=/mnt/ev/disco.dd bs=4M status=progress conv=noerror,sync
sha256sum /dev/sda /mnt/ev/disco.dd    # deben coincidir
```

## Orden de volatilidad (RFC 3227)

De lo que antes se pierde a lo que más aguanta:

1. Registros de CPU y caché
2. **Memoria RAM**
3. Estado de red y procesos en ejecución
4. Ficheros temporales
5. Disco
6. Logs remotos y de monitorización
7. Configuración física y topología
8. Soportes de copia de seguridad
