---
titulo: MITRE ATT&CK
subtitulo: true
---

# MITRE ATT&CK

*Adversarial Tactics, Techniques and Common Knowledge*. Una base de conocimiento pública, mantenida por MITRE desde 2013, con el comportamiento real observado de adversarios, organizado y con identificador único.

Es **el lenguaje común** de la ciberseguridad defensiva actual: cuando alguien dice "hemos visto T1059.001", todo el mundo sabe exactamente de qué habla.

📎 [attack.mitre.org](https://attack.mitre.org/)

## Cómo está estructurado

```
Táctica (el porqué)      →  TA0003 · Persistencia
  Técnica (el cómo)      →  T1053  · Scheduled Task/Job
    Subtécnica (detalle) →  T1053.005 · Scheduled Task
      Procedimiento      →  "APT29 crea una tarea llamada X que ejecuta Y"
```

Cada ficha de técnica incluye: descripción, plataformas afectadas, **grupos que la usan**, software conocido, **fuentes de datos** para detectarla y mitigaciones recomendadas.

## Las matrices

- **Enterprise** — Windows, Linux, macOS, Cloud, Red, Contenedores. Es la que se usa el 90 % del tiempo.
- **Mobile** — Android e iOS.
- **ICS** — sistemas de control industrial.

## Las 14 tácticas de Enterprise

En orden aproximado de un ataque, aunque **no es una secuencia obligatoria**:

| # | Táctica | Objetivo del adversario | Ejemplo de técnica |
|---|---|---|---|
| TA0043 | Reconnaissance | Recopilar información previa | Buscar correos de empleados (T1589) |
| TA0042 | Resource Development | Preparar infraestructura | Registrar dominios (T1583.001) |
| TA0001 | Initial Access | Entrar | Phishing con adjunto (T1566.001) |
| TA0002 | Execution | Ejecutar código | PowerShell (T1059.001) |
| TA0003 | Persistence | Sobrevivir a reinicios | Tarea programada (T1053.005) |
| TA0004 | Privilege Escalation | Obtener más permisos | Bypass de UAC (T1548.002) |
| TA0005 | Defense Evasion | No ser detectado | Ofuscación (T1027), borrar logs (T1070) |
| TA0006 | Credential Access | Robar credenciales | Volcado de LSASS (T1003.001) |
| TA0007 | Discovery | Entender el entorno | Enumerar el dominio (T1087) |
| TA0008 | Lateral Movement | Moverse a otros equipos | RDP (T1021.001), SMB (T1021.002) |
| TA0009 | Collection | Reunir lo que se va a robar | Datos de unidades de red (T1039) |
| TA0011 | Command and Control | Controlar el implante | Protocolo web (T1071.001) |
| TA0010 | Exfiltration | Sacar los datos | Exfiltración por C2 (T1041) |
| TA0040 | Impact | Causar daño | Cifrado de datos (T1486) |

> [!TIP]
> Si tienes que memorizar diez técnicas, que sean éstas: **T1566** (Phishing), **T1059** (Intérpretes de comandos), **T1053** (Tareas programadas), **T1003** (Volcado de credenciales), **T1021** (Servicios remotos), **T1027** (Ofuscación), **T1070** (Borrado de indicadores), **T1547** (Autoarranque), **T1486** (Cifrado para impacto), **T1071** (C2 sobre protocolo de aplicación). Cubren la mayoría de incidentes reales.

## Para qué se usa en el día a día

**1. Documentar incidentes.** En el informe, cada acción del atacante se etiqueta con su técnica. Eso hace comparables incidentes distintos y permite estadísticas.

**2. Medir cobertura de detección.** Con [ATT&CK Navigator](https://mitre-attack.github.io/attack-navigator/) se pinta la matriz: verde lo que detectas, rojo lo que no. El mapa de calor resultante es el argumento para pedir presupuesto.

**3. Priorizar.** No se pueden cubrir 600 técnicas. Se priorizan las que usan los actores que atacan a tu sector, cruzando ATT&CK con inteligencia.

**4. Escribir detecciones.** Cada técnica lista sus *Data Sources*: qué telemetría hace falta. Si dice "Process Monitoring: Command-line parameters" y tú no recoges líneas de comando, tienes un hueco de visibilidad antes que de detección.

**5. Emular.** [Atomic Red Team](https://github.com/redcanaryco/atomic-red-team) tiene pruebas indexadas por identificador ATT&CK: ejecutas T1053.005 y compruebas si tu SIEM salta.

## Proyectos relacionados de MITRE

| Proyecto | Para qué |
|---|---|
| **ATT&CK Navigator** | Pintar matrices de cobertura o de un actor |
| **D3FEND** | Contrapartida defensiva: contramedidas mapeadas a técnicas ofensivas |
| **CAR** (Cyber Analytics Repository) | Analíticas de detección ya escritas y probadas |
| **ENGAGE** | Marco de engaño y decepción al adversario |
| **CALDERA** | Emulación automatizada de adversarios |
| **ATT&CK Groups** | Fichas de actores (APT29, FIN7, Lazarus) con sus técnicas y herramientas |

## Ejemplo de mapeo real

Un incidente típico de ransomware, contado en ATT&CK:

1. Correo con adjunto ISO → **T1566.001** (Spearphishing Attachment)
2. La víctima abre un LNK dentro → **T1204.002** (Malicious File)
3. El LNK lanza PowerShell ofuscado → **T1059.001** + **T1027**
4. Se crea tarea programada de persistencia → **T1053.005**
5. Se vuelca LSASS con comsvcs.dll → **T1003.001**
6. Enumeración del dominio con AdFind → **T1087.002**
7. Movimiento lateral por SMB con PsExec → **T1021.002**
8. Se borran las instantáneas → **T1490** (Inhibit System Recovery)
9. Exfiltración a Mega.nz → **T1567.002**
10. Cifrado de ficheros → **T1486**

Escrito así, cualquier analista del mundo entiende el incidente sin leer las 12 páginas del informe.

> [!NOTE]
> Fíjate en el paso 8: `vssadmin delete shadows` es una de las mejores alertas de alta fidelidad que existen. Casi nada legítimo borra las instantáneas de volumen, y ocurre **minutos antes** del cifrado. Si sólo puedes tener una regla de ransomware, que sea ésa.

## Errores comunes al usar ATT&CK

- **Perseguir el 100 % de cobertura.** Es imposible y no es el objetivo. Muchas técnicas no aplican a tu entorno.
- **Confundir "tengo un log" con "tengo detección".** Recoger el evento no es alertar sobre él.
- **Mapear a la táctica en vez de a la técnica.** "Persistence" no dice nada; "T1547.001" sí.
- **Olvidar que ATT&CK describe lo observado**, no todo lo posible. Un ataque nuevo puede no estar en la matriz.
