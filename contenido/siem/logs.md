---
titulo: Logs y agregación
subtitulo: true
---

# Logs y agregación

Los **logs** registran lo que pasa en un sistema: usuarios, red, errores. Sirven para detectar ataques porque muestran lo que se sale de lo normal — muchos intentos de inicio de sesión seguidos, un escaneo de puertos.

> [!IMPORTANT]
> No se mandan **todos** los logs al SIEM. Solo los que aportan. Ingerirlo todo genera ruido, dispara el coste de licencia y de almacenamiento, y entierra lo que importa.

## Syslog

Protocolo estándar (RFC 5424) que centraliza los eventos de muchos dispositivos en un servidor. Funciona en Linux y Unix, en equipos de red y, con herramientas adicionales, en Windows.

| Puerto | Uso |
|---|---|
| **UDP 514** | Por defecto |
| **TCP 514** | Cuando hace falta fiabilidad en la entrega |
| **TCP 6514** | Syslog sobre TLS |

Por sí mismo **no incluye cifrado ni autenticación**, y de ahí el 6514.

### Estructura del mensaje

| Parte | Contenido |
|---|---|
| **PRI** | `(código de instalación × 8) + gravedad` |
| **Cabecera** | Fecha, host, aplicación, ID |
| **Mensaje** | Etiquetas de función y gravedad, más la acción |

## Windows Event Logs

Ficheros `.evtx` que almacenan localmente los eventos del sistema, de las aplicaciones y de seguridad.

### Dónde están

| Versión | Ruta |
|---|---|
| Windows 2000 – XP / Server 2003 | `%WinDir%\system32\Config\*.evt` |
| Vista – 10 / Server 2008 – 2019 | `%WinDir%\system32\Winevt\Logs\*.evtx` |

### Categorías

| Registro | Qué guarda |
|---|---|
| **Aplicación** | Eventos de aplicaciones |
| **Sistema** | Eventos del sistema operativo |
| **Seguridad** | Inicios y cierres de sesión, permisos, uso de recursos |
| **Servicio de directorios** | Active Directory — solo en controladores de dominio |
| **Servidor DNS** | Eventos del servicio DNS |
| **Replicación de ficheros** | Replicación entre controladores |

### Los cuatro Event IDs de sesión

| ID | Qué significa |
|---|---|
| **4624** | Inicio de sesión correcto |
| **4672** | Inicio de sesión especial (privilegios de administrador) |
| **4634** | Cierre de sesión |
| **4647** | Cierre de sesión iniciado por el usuario |

Un **4624 seguido inmediatamente de un 4672** significa que quien acaba de entrar tiene privilegios administrativos. Es la pareja que más se vigila.

### Event Viewer y vistas personalizadas

Se consultan con **Event Viewer**. El panel central muestra los eventos recientes y el izquierdo los clasifica por registro.

Las **vistas personalizadas** permiten filtrar por fecha, nivel, registro, fuente, Event ID, palabras clave o usuario. Ejemplo típico: una vista con 4624, 4672, 4647 y 4634 para seguir toda la actividad de sesión, y detectar inicios fuera de horario o uso indebido de cuentas de administrador.

## Agregación

Reunir logs de muchos sistemas distintos, analizarlos y convertirlos a un **formato común** que se pueda buscar desde el SIEM.

### Las cuatro formas de agregar

1. **Syslog** — los equipos envían sus logs a un servidor central y el agregador los procesa.
2. **Transmisión de eventos** — **SNMP**, **NetFlow** o **IPFIX** envían información del funcionamiento de los dispositivos.
3. **Recolectores (agentes)** — programas instalados en el equipo que capturan, procesan y envían.
4. **Acceso directo** — el agregador se conecta por API o protocolo específico. Suele requerir integración a medida.

### Estructurados y no estructurados

**Datos estructurados** — logs de Apache, IIS, eventos de Windows, equipos Cisco. Vienen con campos claros como `src_ip`, lo que facilita normalizarlos.

**Datos no estructurados** — normalmente de aplicaciones propias. Cada mensaje puede ser distinto, incluso ocupar varias líneas sin inicio ni fin definidos.

Y aquí está el problema: **el no estructurado es el tipo más común que llega a un SIEM**. Por eso el trabajo de normalización nunca se acaba.
