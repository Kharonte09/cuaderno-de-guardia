---
titulo: Detección y reglas
subtitulo: true
---

# Detección y reglas

Consumir reglas de otros está bien; escribirlas es lo que convierte a un analista en ingeniero de detección. Los tres lenguajes que hay que conocer son **Sigma** (logs), **YARA** (ficheros y memoria) y **Suricata** (red).

## Sigma — reglas para SIEM

Sigma es un formato **agnóstico**: escribes la regla una vez en YAML y la conviertes a la sintaxis de tu SIEM (Splunk, Elastic, Sentinel, QRadar…). Es el "YARA de los logs".

📎 [github.com/SigmaHQ/sigma](https://github.com/SigmaHQ/sigma)

### Anatomía de una regla

```yaml
title: PowerShell codificado lanzado desde Office
id: 8f2b1c4e-3a7d-4e91-b8c2-1d5f6a9e0b3c
status: experimental
description: Detecta un proceso de Office que lanza PowerShell con comando codificado
references:
  - https://attack.mitre.org/techniques/T1059/001/
author: David
date: 2026/09/01
tags:
  - attack.execution
  - attack.t1059.001
logsource:
  category: process_creation
  product: windows
detection:
  selection_padre:
    ParentImage|endswith:
      - '\WINWORD.EXE'
      - '\EXCEL.EXE'
      - '\POWERPNT.EXE'
      - '\OUTLOOK.EXE'
  selection_hijo:
    Image|endswith: '\powershell.exe'
    CommandLine|contains:
      - '-enc'
      - '-EncodedCommand'
      - 'FromBase64String'
  filtro_conocido:
    CommandLine|contains: 'C:\Program Files\MiHerramienta\'
  condition: selection_padre and selection_hijo and not filtro_conocido
falsepositives:
  - Complementos de Office corporativos que usan PowerShell
level: high
```

**Claves de la sintaxis:**
- `logsource` define de dónde salen los datos (`category`, `product`, `service`).
- Dentro de `detection`, cada bloque es una condición; `condition` los combina.
- Modificadores útiles: `|contains`, `|startswith`, `|endswith`, `|re` (regex), `|all` (todos los valores, no cualquiera), `|base64offset|contains`.
- Los filtros de exclusión se nombran aparte y se restan con `not` en la condición.

### Convertir la regla

```bash
pip install sigma-cli
sigma convert -t splunk regla.yml
sigma convert -t lucene -p ecs_windows regla.yml     # Elastic
sigma convert -t kusto regla.yml                      # Sentinel / Defender
```

> [!TIP]
> Aunque no uses Sigma en producción, **escribe la regla primero en Sigma**. Obliga a pensar en la lógica en vez de en la sintaxis del SIEM, y la regla sobrevive a un cambio de plataforma.

## YARA — reglas para ficheros y memoria

YARA identifica ficheros por patrones. Se usa sobre muestras, sobre disco y sobre volcados de memoria.

📎 [yara.readthedocs.io](https://yara.readthedocs.io/)

### Anatomía de una regla

```yara
rule Stealer_Generico_Config
{
    meta:
        description = "Detecta cadenas de configuración de un stealer"
        author      = "David"
        date        = "2026-09-01"
        reference   = "Incidente INC-1234"
        hash        = "ab12cd34..."

    strings:
        $mutex  = "Global\\SoftwareUpdateMtx" ascii wide
        $ua     = "Mozilla/5.0 (Windows NT 6.1) Custom" ascii
        $uri    = "/api/gate.php" ascii
        $pdb    = "C:\\Users\\dev\\source\\repos\\" ascii nocase
        $hex    = { 6A 40 68 00 30 00 00 6A 14 8D 91 }

    condition:
        uint16(0) == 0x5A4D and          // es un PE (MZ)
        filesize < 2MB and
        (2 of ($mutex, $ua, $uri) or $hex)
}
```

**Puntos importantes:**
- `ascii wide` cubre las dos codificaciones de cadena de Windows; olvidarlo hace fallar la mitad de las reglas.
- `uint16(0) == 0x5A4D` y un `filesize` acotado hacen la regla **mucho más rápida** sobre una flota entera.
- Pide **varias cadenas** (`2 of`), no una sola: una cadena aislada genera falsos positivos.
- Evita cadenas genéricas (`http://`, `kernel32.dll`) y prefiere lo único de la muestra: mutex, rutas PDB del desarrollador, claves de cifrado, URIs concretas.

```bash
yara -r reglas.yar C:\ruta\                # escanear una carpeta
yara -s reglas.yar muestra.exe             # mostrar qué cadenas casaron
```

> [!TIP]
> Repositorios de referencia para aprender: las reglas de **Florian Roth** (Neo23x0/signature-base) son el mejor material de estudio que existe sobre cómo se escribe una regla YARA seria.

## Suricata — reglas de red

```
alert http $HOME_NET any -> $EXTERNAL_NET any ( \
    msg:"C2 stealer - peticion a gate.php con UA anomalo"; \
    flow:established,to_server; \
    http.method; content:"POST"; \
    http.uri; content:"/api/gate.php"; \
    http.user_agent; content:"Custom"; \
    classtype:trojan-activity; \
    sid:1000001; rev:1; \
    metadata:created_at 2026_09_01; )
```

**Estructura:** acción · protocolo · origen · puerto · dirección · destino · puerto · (opciones).

- `sid` por encima de 1000000 para reglas propias, para no chocar con las de Emerging Threats.
- `flow:established,to_server` evita evaluar tráfico irrelevante y mejora mucho el rendimiento.
- Usa los *sticky buffers* modernos (`http.uri`, `http.user_agent`, `tls.sni`) en vez de `content` a pelo.

## Cómo se construye una detección buena

1. **Parte de un comportamiento, no de un IOC.** Pregunta: *"¿qué tiene que hacer el atacante sí o sí para conseguir su objetivo?"*.
2. **Comprueba que tienes el dato.** ¿Recoges líneas de comando? ¿Proceso padre? Si no, la regla no puede existir.
3. **Escríbela lo más específica que puedas sin atarla a un artefacto desechable.**
4. **Mídela contra datos históricos** antes de activarla: si sobre 30 días genera 4.000 aciertos, no está lista.
5. **Documenta los falsos positivos esperados** dentro de la propia regla.
6. **Pruébala de verdad** con [Atomic Red Team](#/herramientas/siem-edr-y-labs) — que la técnica salte, no que "debería saltar".
7. **Escribe el playbook a la vez que la regla.** Una alerta sin instrucciones de qué hacer es una alerta que se cerrará mal.
8. **Revísala periódicamente.** Las detecciones caducan: cambian las versiones, los productos y los atacantes.

> [!IMPORTANT]
> La pregunta de la [Pirámide del Dolor](#/fundamentos/piramide-del-dolor) aplicada a cada regla: *"si el atacante cambia de servidor y recompila, ¿esta regla sigue funcionando?"*. Si la respuesta es no, no es una detección, es un bloqueo temporal.

## Caza de amenazas (threat hunting)

Cazar es buscar lo que **no** ha generado alerta. Siempre parte de una **hipótesis**:

> *"Si un atacante estuviera usando DLL sideloading para persistir, existiría un binario firmado ejecutándose desde una carpeta de usuario y cargando una DLL de esa misma carpeta."*

El ciclo:

1. **Hipótesis** — basada en CTI, en ATT&CK o en el conocimiento del entorno.
2. **Datos** — ¿dónde lo vería? ¿Sysmon 7? ¿`conn.log`?
3. **Búsqueda** — consulta amplia, sin filtrar de más al principio.
4. **Análisis** — separar lo normal de lo anómalo. Aquí es donde importa conocer tu entorno.
5. **Resultado** — o encuentras algo (→ incidente), o no (→ igualmente valioso: ahora sabes que ahí no está).
6. **Automatizar** — toda caza que valga la pena repetirse se convierte en una regla.

**Hipótesis de caza para empezar:**

- Binarios ejecutándose desde `%TEMP%`, `%APPDATA%` o `C:\Users\Public`.
- Procesos con nombre de sistema fuera de `System32`.
- Consultas DNS a dominios registrados en los últimos 30 días.
- Conexiones salientes de larga duración y volumen constante (beaconing).
- Cuentas de servicio con inicios de sesión interactivos.
- Herramientas de acceso remoto no corporativas instaladas.
- Ejecutables sin firmar cargados por procesos firmados.
- Cuentas que se autentican contra un número inusual de equipos.

> [!TIP]
> El mejor recurso gratuito para aprender a cazar es leer los informes de **The DFIR Report**: cada uno trae los comandos exactos del atacante y las reglas Sigma correspondientes. Coge uno, y busca en tu entorno lo que describe.
