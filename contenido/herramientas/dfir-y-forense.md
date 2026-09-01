---
titulo: DFIR y forense
subtitulo: true
tarjetas: true
---

# Herramientas de DFIR y forense

DFIR = *Digital Forensics and Incident Response*. Adquirir evidencia sin alterarla, extraer los artefactos que cuentan qué pasó y ordenarlos en una línea temporal.

> [!IMPORTANT]
> **Orden de volatilidad** (RFC 3227): se recoge de lo más volátil a lo menos. Registros y caché → memoria RAM → estado de red y procesos → disco → logs remotos → soportes de copia. Si apagas el equipo antes de volcar la memoria, pierdes la mitad del caso.

## Adquisición

### FTK Imager
`Imagen` `Gratis` [exterro.com/digital-forensics-software/ftk-imager](https://www.exterro.com/digital-forensics-software/ftk-imager)

**Para qué sirve:** crear imágenes forenses de disco (E01, dd) y volcados de memoria, con cálculo automático de hash para la cadena de custodia. También permite explorar la imagen y extraer ficheros sueltos.

**Uso básico:** *File → Create Disk Image* → elige origen físico → formato **E01** (comprime y guarda metadatos del caso) → verifica que los hashes MD5/SHA1 coinciden al terminar.

### WinPMEM / DumpIt / Belkasoft RAM Capturer
`Memoria` `Gratis` [github.com/Velocidex/WinPmem](https://github.com/Velocidex/WinPmem)

**Para qué sirve:** volcar la memoria RAM de un Windows encendido. Es el primer paso de cualquier incidente en un equipo vivo.

```bash
winpmem.exe -o memoria.raw
```

### KAPE
`Triaje` `Gratis (uso no comercial)` [kroll.com/kape](https://www.kroll.com/en/services/cyber/incident-response-litigation-support/kroll-artifact-parser-extractor-kape)

**Para qué sirve:** recolección **selectiva y rapidísima** de artefactos. En lugar de una imagen de 500 GB, recoge en 2 minutos los ficheros que importan (MFT, registro, EVTX, prefetch, navegadores) y opcionalmente los procesa.

**Uso básico:**
```
kape.exe --tsource C: --tdest C:\triaje --target !SANS_Triage --mdest C:\salida --module !EZParser
```
`--target` recoge, `--module` procesa. `!SANS_Triage` es el conjunto de artefactos de referencia.

### Velociraptor
`Recolección remota` `Open source` [docs.velociraptor.app](https://docs.velociraptor.app/)

**Para qué sirve:** desplegar un agente en toda la flota y **consultar los endpoints como si fueran una base de datos** con su lenguaje VQL. Permite hacer *hunts* masivos ("¿en qué equipos existe este fichero?") y recoger artefactos remotos en un incidente.

> [!TIP]
> Velociraptor cubre EDR ligero, caza y recolección forense en una sola herramienta libre, sin licencias.

### Guymager / dd / dcfldd
`Imagen Linux` `Open source` [guymager.sourceforge.io](https://guymager.sourceforge.io/)

**Para qué sirve:** adquisición desde Linux, típicamente arrancando el equipo con una distro forense en modo sólo lectura.

```bash
dd if=/dev/sda of=/mnt/evidencia/disco.dd bs=4M status=progress conv=noerror,sync
sha256sum /dev/sda /mnt/evidencia/disco.dd   # deben coincidir
```

## Análisis de memoria

### Volatility 3
`Memoria` `Open source` [github.com/volatilityfoundation/volatility3](https://github.com/volatilityfoundation/volatility3)

**Para qué sirve:** analizar volcados de RAM: procesos ocultos, conexiones de red, código inyectado, comandos ejecutados y credenciales en memoria.

**Plugins que se usan siempre:**
```bash
vol -f memoria.raw windows.pstree        # árbol de procesos
vol -f memoria.raw windows.netscan       # conexiones y puertos
vol -f memoria.raw windows.malfind       # regiones de memoria con código inyectado
vol -f memoria.raw windows.cmdline       # línea de comandos de cada proceso
vol -f memoria.raw windows.dlllist       # DLLs cargadas
vol -f memoria.raw windows.filescan      # ficheros referenciados en memoria
```

**Cómo leerlo:** en `pstree` busca lo que no encaja — `svchost.exe` colgando de `winword.exe`, un `powershell.exe` hijo de Excel, un proceso con nombre legítimo pero ruta en `%TEMP%`.

### MemProcFS
`Memoria` `Open source` [github.com/ufrisk/MemProcFS](https://github.com/ufrisk/MemProcFS)

**Para qué sirve:** monta el volcado de memoria **como si fuera una unidad de disco**, para navegar procesos y ficheros con el explorador. Mucho más intuitivo que la línea de comandos para empezar.

## Artefactos de Windows

### Eric Zimmerman Tools
`Artefactos` `Gratis` [ericzimmerman.github.io](https://ericzimmerman.github.io/)

**Para qué sirve:** colección de utilidades para parsear artefactos de Windows. Cada herramienta saca un artefacto y todas exportan a CSV para Timeline Explorer.

| Herramienta | Artefacto | Qué demuestra |
|---|---|---|
| `MFTECmd` | $MFT, $J | Creación/borrado de ficheros, con marcas de tiempo |
| `EvtxECmd` | Registros EVTX | Eventos de seguridad y sistema, normalizados |
| `RECmd` / Registry Explorer | Registro | Persistencia, dispositivos USB, configuración |
| `PECmd` | Prefetch | **Ejecución** de programas y cuántas veces |
| `LECmd` / `JLECmd` | LNK y Jump Lists | Ficheros y rutas abiertas por el usuario |
| `AmcacheParser` | Amcache.hve | Programas presentes en el sistema, con hash SHA1 |
| `SBECmd` | ShellBags | Carpetas navegadas, incluso ya borradas |
| `Timeline Explorer` | CSV | Visor de tablas que aguanta millones de filas |

### Autopsy
`Suite` `Open source` [autopsy.com](https://www.autopsy.com/)

**Para qué sirve:** entorno gráfico completo sobre The Sleuth Kit: monta la imagen, recupera ficheros borrados, analiza navegadores, correo y saca una línea temporal. Es la opción libre frente a EnCase/FTK.

### Plaso / log2timeline
`Supertimeline` `Open source` [github.com/log2timeline/plaso](https://github.com/log2timeline/plaso)

**Para qué sirve:** construir una **supertimeline**: fusiona todas las marcas de tiempo de todos los artefactos en una sola línea ordenada. Es lo que responde a "qué pasó exactamente entre las 14:02 y las 14:09".

```bash
log2timeline.py --storage_file caso.plaso imagen.E01
psort.py -o l2tcsv -w caso.csv caso.plaso
```

### Hayabusa
`EVTX` `Open source` [github.com/Yamato-Security/hayabusa](https://github.com/Yamato-Security/hayabusa)

**Para qué sirve:** analizar logs EVTX contra reglas **Sigma** y producir una línea temporal de hallazgos priorizados. En minutos te dice qué eventos merecen atención de entre millones.

```bash
hayabusa.exe csv-timeline -d .\Logs -o resultados.csv -p super-verbose
```

### Chainsaw
`EVTX` `Open source` [github.com/WithSecureLabs/chainsaw](https://github.com/WithSecureLabs/chainsaw)

**Para qué sirve:** lo mismo que Hayabusa con otro enfoque: búsqueda rápida por palabra clave y caza con reglas Sigma sobre EVTX y MFT.

```bash
chainsaw hunt ./Logs -s sigma/ --mapping mappings/sigma-event-logs-all.yml
```

### DeepBlueCLI
`EVTX` `Open source` [github.com/sans-blue-team/DeepBlueCLI](https://github.com/sans-blue-team/DeepBlueCLI)

**Para qué sirve:** script de PowerShell que revisa logs de eventos buscando patrones concretos de ataque (PowerShell ofuscado, creación de usuarios, fuerza bruta). Muy rápido de aplicar en un triaje.

### Registry Explorer + RegRipper
`Registro` `Gratis` [github.com/keydet89/RegRipper3.0](https://github.com/keydet89/RegRipper3.0)

**Para qué sirve:** extraer de las colmenas del registro los valores relevantes para el caso: claves de ejecución, servicios, USB conectados, redes wifi, cuentas.

## Escáneres de compromiso

### Loki
`IOC scanner` `Open source` [github.com/Neo23x0/Loki](https://github.com/Neo23x0/Loki)

**Para qué sirve:** escanear un equipo contra reglas YARA e IOC conocidos para detectar compromiso. Versión gratuita reducida de THOR.

### THOR Lite
`IOC scanner` `Gratis (Lite)` [nextron-systems.com/thor-lite](https://www.nextron-systems.com/thor-lite/)

**Para qué sirve:** escáner de compromiso profesional con miles de reglas de detección propias. La versión Lite es gratuita para uso no comercial.

### Sysinternals Suite
`Diagnóstico` `Gratis` [learn.microsoft.com/sysinternals](https://learn.microsoft.com/en-us/sysinternals/)

**Para qué sirve:** utilidades de diagnóstico para Windows. Las cuatro que más se usan en incidente:
- **Autoruns**: todos los puntos de arranque automático. Filtra por *Hide Microsoft entries* y aparece la persistencia.
- **Process Explorer**: árbol de procesos con verificación de firma y consulta a VirusTotal integrada.
- **TCPView**: conexiones activas por proceso.
- **Sigcheck**: verifica firmas digitales y consulta hashes en VirusTotal.

## Cadena de custodia: lo mínimo innegociable

1. **Documenta antes de tocar**: fecha, hora (con zona horaria), quién, qué equipo, número de serie, estado (encendido/apagado).
2. **Hash de todo** lo adquirido, antes y después de copiar. Anótalo.
3. **Trabaja siempre sobre copias**, nunca sobre la evidencia original.
4. **Bloqueador de escritura** (hardware o software) al conectar discos originales.
5. **Registro de traspasos**: cada vez que la evidencia cambia de manos, se firma.
6. **Zona horaria en UTC** en todos los informes, y consistente entre fuentes.

> [!CAUTION]
> Si el incidente puede acabar en denuncia o en juzgado, consulta con alguien con experiencia forense antes de tocar nada: un volcado mal hecho puede invalidar la prueba.
