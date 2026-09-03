---
titulo: Por dónde empezar
subtitulo: true
---

# Por dónde empezar

Si has llegado hasta aquí porque quieres empezar en ciberseguridad y no sabes muy bien por dónde tirar, esta parte es para ti.

No necesitas aprenderlo todo antes de empezar. De hecho, probablemente te vas a encontrar muchas veces con algo que no sabes. Es normal.

La idea es que tengas una **ruta orientativa** para saber qué aprender, practicar y consultar según vayas avanzando.

> [!NOTE]
> Ten en cuenta una cosa: esto es mi cuaderno de notas, no un temario cerrado. Y como yo me dedico a la parte defensiva, casi todo lo que vas a encontrar aquí tira hacia el **Blue Team**: detección, análisis de alertas, respuesta a incidentes, threat hunting y forense. Un SOC es el sitio más común donde se hace todo eso, pero ni es el único ni hace falta estar en uno.
>
> La ruta de aquí abajo te vale para cualquier camino que elijas, pero a partir del punto 2 los ejemplos y las herramientas son sobre todo de ese lado.

---

## 1. Antes de meterte en ciberseguridad

Primero necesitas una base de informática.

No hace falta que seas administrador de sistemas, pero sí que entiendas qué está pasando cuando un equipo se conecta a una red, levanta un servicio o genera un log.

Una buena forma de practicar es montar un pequeño laboratorio:

- Una máquina virtual con **Windows**.
- Una máquina virtual con **Ubuntu**.
- Que ambas máquinas puedan comunicarse.
- **DNS**
- **DHCP**
- Un servidor web: **IIS** o **Apache**.
- **SMB** para compartir carpetas.
- **SSH**
- Un servidor de correo, si te apetece complicarlo un poco más.
- Un firewall.

La idea no es montar una infraestructura perfecta. Es **romper cosas, configurarlas de nuevo y mirar qué ocurre**.

Para redes puedes utilizar:

- **Cisco Packet Tracer**
- **GNS3**

Con ellos puedes montar routers, switches, VLANs y diferentes topologías sin necesidad de comprar hardware.

---

## 2. Ahora sí: empieza con seguridad

Una vez tengas una base de IT, empieza a entender cómo funcionan los ataques y cómo se detectan.

En esta Wiki tienes algunos conceptos que te recomiendo conocer:

1. [Fundamentos de seguridad](#/fundamentos/seguridad)
2. Cyber Kill Chain — [Inteligencia operacional](#/threat-intel/operacional)
3. [MITRE ATT&CK](#/respuesta/mitre-attack)
4. Pirámide del Dolor — [Inteligencia operacional](#/threat-intel/operacional)
5. [Qué es la respuesta a incidentes](#/respuesta/introduccion)

No hace falta que memorices cada modelo ni que seas capaz de recitarlos.

Lo importante es que empieces a entender **cómo piensa un atacante, qué evidencias deja y cómo puede detectarlo un equipo defensivo**.

---

## 3. Deja la teoría y empieza a tocar cosas

Aquí es donde empieza lo interesante.

Hay muchas plataformas donde puedes practicar sin tener que montar todo desde cero:

| Plataforma | Coste |
|---|---|
| **TryHackMe — SOC Level 1** | Freemium |
| **LetsDefend** | Freemium |
| **Blue Team Labs Online** | Freemium |
| **CyberDefenders** | Freemium |
| **Malware-Traffic-Analysis.net** | Gratis |

No necesitas hacerlas todas.

Puedes empezar por **TryHackMe SOC Level 1** y después ir probando otras plataformas.

Una progresión bastante lógica sería:

**Phishing → Logs de Windows → Tráfico de red → Análisis de memoria → Forense**

Ahí empezarás a encontrarte con herramientas, logs y conceptos que seguramente al principio no conozcas.

Es normal.

Cuando eso ocurra, vuelve a la Wiki, busca la herramienta o concepto que necesites y continúa.

---

## 4. Empieza a cacharrear

Leer sobre esto está bien, pero no se te queda hasta que no lo tocas con las manos.

Aquí tienes dos laboratorios que puedes hacer hoy mismo, sin montar nada raro y sin gastar un euro. Van de menos a más.

| Lab | Nivel | Tiempo | Qué vas a tocar |
|---|---|---|---|
| **1. El hash de un fichero** | 🟢 Muy fácil | 10 min | Hashes, VirusTotal, IOCs |
| **2. Ábrele las tripas a un correo** | 🟡 Fácil | 30 min | Cabeceras, SPF/DKIM/DMARC, reputación de IPs |

Hazlos en orden. Y si algo no te sale, ya sabes: Google.

---

### 🟢 Lab 1 — El hash de un fichero

**La idea:** entender qué es un hash tocándolo, no leyéndolo.

1. Crea un fichero de prueba y sácale el hash:

**Windows · PowerShell**

```powershell
"hola" | Out-File prueba.txt
Get-FileHash .\prueba.txt -Algorithm SHA256
```

**Linux**

```bash
echo "hola" > prueba.txt
sha256sum prueba.txt
```

2. Abre `prueba.txt`, cambia la `h` por una `H`, guarda y vuelve a lanzar el mismo comando.

El hash no cambia un poco. **Cambia entero.** Un byte distinto y ya es otro fichero para el mundo.

Y si haces el lab en los dos sistemas, verás que el mismo `hola` te da hashes distintos en cada uno: el fichero no es idéntico byte a byte, porque cambian la codificación y el salto de línea. La misma idea que acabas de ver.

3. Ahora saca el hash de un ejecutable que tengas por ahí, un instalador cualquiera de tus descargas:

**Windows · PowerShell**

```powershell
Get-FileHash "C:\Users\David\Downloads\ChromeSetup.exe" -Algorithm SHA256
```

**Linux**

```bash
sha256sum /home/david/Descargas/google-chrome-stable_current_amd64.deb
```

4. Copia ese hash y pégalo en el buscador de [VirusTotal](https://www.virustotal.com/). Si alguien lo analizó antes, tienes el veredicto de decenas de motores de antivirus **sin haber subido el fichero**.

5. Repite con los otros algoritmos y fíjate en cómo cambia la longitud:

**Windows · PowerShell**

```powershell
Get-FileHash .\prueba.txt -Algorithm MD5
Get-FileHash .\prueba.txt -Algorithm SHA1
```

**Linux**

```bash
md5sum prueba.txt
sha1sum prueba.txt
```

> [!WARNING]
> En el trabajo se busca el hash, **no se sube el fichero**. Lo que subes a VirusTotal queda ahí y es descargable por quien pague la API. Subir un documento de tu empresa es una fuga de datos con muy buena intención.

**Lo que sacas de aquí:**

- Un hash identifica un fichero exacto, no una familia de malware.
- Cambiar el hash le cuesta al atacante un byte, y por eso los hashes están en la base de la [Pirámide del Dolor](#/threat-intel/operacional).
- Acabas de usar tu primer IOC.

---

### 🟡 Lab 2 — Ábrele las tripas a un correo

**La idea:** ver de dónde viene de verdad un correo, en vez de fiarte del nombre que pone arriba.

Coge un correo **tuyo**, de publicidad o de una newsletter. No uses correo del trabajo.

1. En Gmail: los tres puntos del correo → **Mostrar original**. En Outlook: Archivo → Propiedades → Encabezados de Internet.
2. Busca las líneas `Received:` y léelas **de abajo hacia arriba**. La de más abajo es el primer salto: ahí tienes la IP que envió el correo de verdad.
3. Busca `spf=`, `dkim=` y `dmarc=`. ¿Ponen `pass` o `fail`?
4. Compara el `From:` con el `Return-Path:`. ¿Es el mismo dominio? Cuando no lo es, empieza lo divertido.
5. Coge la IP de origen y mírala en [AbuseIPDB](https://www.abuseipdb.com/) y en VirusTotal. ¿De quién es? ¿Es un servidor de correo legítimo o una IP residencial de la otra punta del mundo?
6. Cuando tengas tu conclusión, pega la cabecera entera en el [Header Analyzer de MXToolbox](https://mxtoolbox.com/EmailHeaders.aspx) y compara lo que has leído tú con lo que dice la herramienta.

Repítelo con tres o cuatro correos distintos: uno de tu banco, una newsletter y el spam más cutre que encuentres. La diferencia se ve enseguida.

**Lo que sacas de aquí:**

- Buena parte del triaje de phishing es exactamente esto, repetido cien veces.
- Aprendes a no fiarte del campo `From:`, que es tan de fiar como el remitente escrito a mano en un sobre.
- Tienes el detalle en [Tipos de phishing](#/phishing/tipos) y [Tácticas y técnicas](#/phishing/tacticas).

---

## 5. No intentes aprender todas las herramientas

Este es probablemente uno de los errores más comunes cuando empiezas.

No necesitas saber utilizar 50 herramientas.

Aprende **qué problema resuelve cada una** y profundiza en ellas cuando realmente las necesites.

Por ejemplo:

> "Tengo que analizar una alerta de Windows."

Buscas qué logs necesitas, qué herramienta puedes utilizar y cómo analizarlos.

> "Tengo una IP sospechosa."

Buscas cómo obtener información sobre ella, qué IOCs puedes sacar y cómo comprobar si aparece en otros sistemas.


### Google es tu gran aliado

Y esto lo digo completamente en serio: **saber buscar es una habilidad técnica**, y de las que más se nota quién la tiene.

Nadie se sabe los cientos de Event IDs de Windows de memoria, ni todos los campos de todos los logs. Lo que sí sabe es encontrarlos en dos minutos y distinguir cuál de los resultados sirve.

Cosas que ayudan:

- Empieza por la pregunta tonta, tal cual la pensarías: `qué puerto usa RDP`, `cómo veo las conexiones abiertas en windows`, `qué es un hash`. La búsqueda no tiene que sonar profesional, tiene que funcionar.
- Si quieres el resultado exacto, ponlo entre comillas: `"acceso denegado" 0x80070005`.
- Añade al final de dónde lo quieres: `netstat site:learn.microsoft.com`.
- Si te aparece un dominio, una IP o un nombre de fichero raro en una alerta, búscalo tal cual. Muchas veces ya hay un informe publicado sobre esa campaña.
- Cuando una herramienta te escupa un error, pégalo entero. Probablemente alguien lo tuvo antes que tú.
- Y lo más importante: **contrasta**. El primer resultado no siempre tiene razón, y en seguridad hay mucho blog copiado de otro blog.

Con la IA es exactamente igual, pero con más cuidado: te da una respuesta muy convincente en diez segundos y la escribe igual de segura tanto si acierta como si se la inventa. Compruébala antes de meterla en un informe, porque quien firma eres tú.

Buscar no es hacer trampa. Es parte del trabajo.

---

## 6. ¿Y después qué?

Cuando empieces a tener una base, probablemente descubras que alguna parte de la ciberseguridad te interesa más que otra.

Puedes tirar hacia:

**🔴 Red Team**
Pentesting, explotación, adversary emulation, etc.

**🔵 Blue Team**
SOC, detección, respuesta a incidentes, threat hunting, DFIR, etc.

**🟣 Purple Team**
Trabajar entre ofensiva y defensiva para mejorar las detecciones y la respuesta.

**⚪ White Team**
Coordinación y gobierno de ejercicios de seguridad.

**🟢 GRC**
Gobierno, riesgos, cumplimiento, auditorías, políticas y controles.

No tienes que decidirlo ahora.

Empieza por aprender las bases, prueba diferentes cosas y deja que sea la práctica la que te diga qué camino te interesa más.

---

### Una última cosa

**No te obsesiones con avanzar rápido.**

En ciberseguridad vas a encontrarte constantemente con conceptos que no conoces. Incluso después de años.

La diferencia está en saber **buscar, entender y aplicar lo que necesitas en cada momento**.

Esta Wiki pretende servir precisamente para eso.
