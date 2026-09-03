---
titulo: Triaje en vivo con CMD y PowerShell
subtitulo: true
---

# Triaje en vivo con CMD y PowerShell

Lo que se ejecuta en una máquina sospechosa para hacerse una idea rápida de qué está pasando, sin instalar nada.

> [!WARNING]
> Todo lo que ejecutes en la máquina **modifica su estado**: crea entradas de Prefetch, escribe en el registro y toca la memoria. Si el caso puede acabar en un peritaje, el volcado de memoria se toma **antes** de ponerse a lanzar comandos.

---

# CMD

La interfaz de línea de comandos clásica de Windows. Permite ejecutar comandos rápido y sacar información del sistema sin depender de la interfaz gráfica. Para respuesta a incidentes sirve para consultar usuarios, procesos, red, servicios y puertos de forma directa.

## Red

```cmd
ipconfig /all
netstat -ab
```

`netstat -ab` es el que más rinde: muestra las conexiones **y el ejecutable que las abrió**. Requiere consola de administrador.

## Procesos

```cmd
tasklist
wmic process get description, executablepath
```

El segundo es clave: `tasklist` te da el nombre, pero **la ruta es lo que delata**. Un `svchost.exe` legítimo vive en `System32`; uno en `AppData\Roaming` no lo es.

## Usuarios y grupos

```cmd
net user
net localgroup administrators
net localgroup
```

## Servicios

```cmd
sc query | more
```

---

# PowerShell

Entorno de automatización y scripting más avanzado que CMD, y **orientado a objetos**: puedes filtrar, encadenar y quedarte con los campos que quieras en vez de recortar texto.

## Red

```powershell
Get-NetIPConfiguration
Get-NetIPAddress
```

## Usuarios

```powershell
Get-LocalUser
Get-LocalUser -Name <usuario> | Select *
```

## Servicios

```powershell
Get-Service | Where-Object Status -eq "Running" | Out-GridView
```

`Out-GridView` abre una ventana con filtros y ordenación. Muy cómodo para revisar listas largas sin salir de la consola.

## Procesos

```powershell
Get-Process | Format-Table -View Priority
Get-Process -Id <id> | Select *
```

## Persistencia

```powershell
Get-ScheduledTask
Get-ScheduledTask -TaskName "<nombre>" | Select *
```

Las tareas programadas son uno de los mecanismos de persistencia más usados, así que este par de comandos entra en casi todos los triajes.

---

# DeepBlueCLI

Script de **PowerShell creado por SANS** para investigar y clasificar registros de eventos de Windows y detectar actividad sospechosa automáticamente.

## Qué hace

Analiza:

- Ficheros `.evtx` **exportados**
- Registros locales de un sistema en ejecución

Se apoya en los logs de Windows y en los de **Sysmon**, si están disponibles. Usa firmas y patrones conocidos para identificar comportamientos maliciosos **sin tener que revisar el Visor de eventos a mano**.

## Qué detecta

- Creación de usuarios
- Usuarios añadidos a grupos
- Adivinación de contraseñas (*password guessing*)
- Pulverización de contraseñas (*password spraying*)
- Uso de **BloodHound**
- Comandos ofuscados
- PowerShell descargando ficheros remotos
- Creación de servicios sospechosos
- Uso de **Mimikatz** para volcar `LSASS.exe`

## Uso

**Preparación:**

1. Descargar la carpeta de DeepBlueCLI desde GitHub.
2. Tener los `.evtx` a analizar.
3. Abrir **PowerShell como administrador**.
4. Navegar hasta la carpeta.

**Política de ejecución.** El script no está firmado, así que hay que permitir su ejecución:

```powershell
Set-ExecutionPolicy Bypass -Scope CurrentUser
```

**Analizar los registros locales:**

```powershell
.\DeepBlue.ps1 -log security
.\DeepBlue.ps1 -log system
```

> [!TIP]
> `-Scope CurrentUser` es lo correcto aquí: cambia la política solo para tu usuario y no para toda la máquina. Conviene devolverla a su valor original al terminar, sobre todo si estás en un equipo que no es tuyo.
