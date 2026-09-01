---
titulo: Conceptos básicos
subtitulo: true
---

# Conceptos básicos

El vocabulario mínimo. Casi todo lo demás de estos apuntes se apoya en estas definiciones, y en una entrevista técnica son exactamente las preguntas de los primeros diez minutos.

## La tríada CIA

Los tres objetivos que persigue cualquier medida de seguridad:

| Principio | Qué protege | Se rompe cuando… | Se defiende con… |
|---|---|---|---|
| **Confidencialidad** | Que sólo acceda quien debe | Fuga de datos, credencial robada | Cifrado, control de acceso, mínimo privilegio |
| **Integridad** | Que el dato no se altere | Ransomware, manipulación de registros | Hashes, firmas, control de versiones, WORM |
| **Disponibilidad** | Que el servicio esté cuando se necesita | DDoS, cifrado por ransomware, caída | Redundancia, copias, capacidad, DRP |

Se suele añadir **autenticidad** (el emisor es quien dice ser) y **no repudio** (no puede negar haberlo hecho), que dan pie a las firmas digitales y al valor probatorio de los logs.

## Amenaza, vulnerabilidad, riesgo

Se confunden constantemente y no son lo mismo:

- **Activo**: lo que tiene valor (un servidor, una base de datos, la reputación).
- **Vulnerabilidad**: una debilidad. *El servidor no tiene el parche de mayo.*
- **Amenaza**: algo o alguien capaz de aprovechar esa debilidad. *Un grupo de ransomware que explota ese CVE.*
- **Exploit**: el medio concreto para aprovecharla. *El PoC publicado en GitHub.*
- **Riesgo**: la combinación de probabilidad e impacto. *Alta probabilidad de cifrado del ERP: riesgo crítico.*

> Riesgo ≈ Amenaza × Vulnerabilidad × Impacto

Y las cuatro respuestas posibles ante un riesgo: **mitigar** (poner controles), **transferir** (seguro, proveedor), **evitar** (dejar de hacer la actividad) o **aceptar** (documentándolo y con firma de quien lo acepta).

## IOC vs. IOA

Distinción clave en detección:

- **IOC** (*Indicator of Compromise*): un rastro concreto de que algo ya pasó. Un hash, una IP, un dominio, una clave de registro. Es **retrospectivo** y fácil de cambiar por el atacante.
- **IOA** (*Indicator of Attack*): un comportamiento que indica que un ataque está ocurriendo, independientemente de las herramientas. "Word lanza PowerShell que descarga un fichero" es un IOA; da igual qué dominio use hoy.

Detectar por IOA es más caro y más valioso. Es exactamente lo que dice la [Pirámide del Dolor](#/fundamentos/piramide-del-dolor).

## TTP

**Tácticas, Técnicas y Procedimientos**: cómo opera un adversario.

- **Táctica**: el *porqué*, el objetivo de la fase. *Persistencia.*
- **Técnica**: el *cómo* general. *Crear una tarea programada.*
- **Procedimiento**: la implementación concreta de un actor. *Crea una tarea llamada `WindowsUpdateCheck` que lanza un `.js` desde `%APPDATA%` cada 30 minutos.*

Es la estructura sobre la que se construye [MITRE ATT&CK](#/fundamentos/mitre-attack).

## Tipos de malware

| Tipo | Qué hace | Ejemplo típico |
|---|---|---|
| **Virus** | Se inserta en ficheros y necesita que se ejecuten | Prácticamente histórico |
| **Gusano** | Se propaga solo por la red sin interacción | WannaCry, Conficker |
| **Troyano** | Se hace pasar por software legítimo | Falso instalador de una app |
| **RAT** | Acceso remoto completo al equipo | AsyncRAT, Remcos |
| **Stealer** | Roba credenciales, cookies y carteras | RedLine, Lumma, Vidar |
| **Ransomware** | Cifra datos y extorsiona | LockBit, BlackCat, Akira |
| **Loader / Dropper** | Sólo sirve para descargar el siguiente | Emotet, IcedID, Bumblebee |
| **Rootkit / Bootkit** | Se oculta en el sistema o antes del arranque | Difícil de detectar sin forense |
| **Wiper** | Destruye datos sin pedir rescate | NotPetya, HermeticWiper |
| **Cryptominer** | Usa recursos para minar | Rendimiento degradado sin más síntoma |
| **Botnet** | Convierte el equipo en nodo controlado | Mirai, Qakbot |

> [!NOTE]
> El ransomware moderno es de **doble extorsión**: primero exfiltra los datos, luego cifra. Aunque tengas copias perfectas, siguen teniendo tus datos. Por eso la detección temprana de exfiltración importa tanto como el backup.

## Vectores de entrada más comunes

1. **Phishing y correo** — sigue siendo el número uno con diferencia.
2. **Credenciales válidas** — compradas, filtradas o por *password spraying*. Cada vez más frecuente que la explotación técnica.
3. **Explotación de servicios expuestos** — VPN, firewalls, servidores sin parchear.
4. **Cadena de suministro** — proveedor comprometido, actualización maliciosa.
5. **Dispositivos extraíbles** — aún vivo en entornos industriales.
6. **Ingeniería social directa** — llamada al helpdesk para resetear un MFA.

## Autenticación: AAA y MFA

- **Autenticación**: demostrar quién eres.
- **Autorización**: qué puedes hacer una vez dentro.
- **Accounting / Auditoría**: registro de lo que hiciste.

Los tres factores clásicos: **algo que sabes** (contraseña), **algo que tienes** (token, móvil), **algo que eres** (biometría).

> [!TIP]
> No todo el MFA es igual. El SMS es suplantable por SIM swapping; el push es vulnerable a *MFA fatigue* (bombardear al usuario hasta que acepta); TOTP es suplantable por proxy inverso tipo Evilginx. Sólo **FIDO2 / claves de acceso** resisten el phishing, porque están vinculadas al dominio real.

## Principios de defensa

- **Defensa en profundidad**: capas. Que fallar un control no signifique perderlo todo.
- **Mínimo privilegio**: cada cuenta con lo justo y nada más. La cuenta de servicio no necesita ser Domain Admin.
- **Segmentación**: que el equipo de contabilidad no llegue a los servidores de producción por SMB.
- **Confianza cero (Zero Trust)**: no fiarse por estar dentro de la red. Verificar identidad, dispositivo y contexto en cada acceso.
- **Superficie de ataque mínima**: lo que no está expuesto no se ataca. Cerrar, desinstalar, deshabilitar.
- **Fallar de forma segura**: si el control se cae, que deniegue, no que permita.

## Equipos: rojo, azul, morado

| Equipo | Función |
|---|---|
| **Red Team** | Simula al adversario para probar la detección y respuesta reales |
| **Blue Team** | Defiende: monitoriza, detecta, responde y endurece |
| **Purple Team** | Ejercicio conjunto: el rojo ataca mientras el azul mira y ajusta detecciones en directo |
| **White Team** | Coordina el ejercicio y arbitra |
| **Pentester** | Busca y demuestra vulnerabilidades, con alcance y tiempo acotados |
| **Threat Hunter** | Busca proactivamente lo que ha pasado desapercibido, partiendo de hipótesis |

> [!IMPORTANT]
> Diferencia que se pregunta mucho: un **pentest** busca *cuántas* vulnerabilidades hay; un ejercicio de **Red Team** busca alcanzar un objetivo concreto sin ser detectado, y mide al Blue Team, no al sistema.

## Algunas siglas que aparecen todo el rato

| Sigla | Significado | En una frase |
|---|---|---|
| SOC | Security Operations Center | El equipo que vigila 24/7 |
| SIEM | Security Information and Event Management | Donde se centralizan y correlacionan los logs |
| SOAR | Security Orchestration, Automation and Response | Automatiza tareas repetitivas del SOC |
| EDR / XDR | Endpoint / Extended Detection and Response | Antivirus con telemetría, caza y contención |
| IDS / IPS | Intrusion Detection / Prevention System | Detecta o bloquea en red |
| DLP | Data Loss Prevention | Evita que salgan datos sensibles |
| CASB | Cloud Access Security Broker | Control de uso de servicios cloud |
| IAM / PAM | Identity / Privileged Access Management | Gestión de identidades y de cuentas privilegiadas |
| CTI | Cyber Threat Intelligence | Inteligencia sobre amenazas |
| IR | Incident Response | Respuesta a incidentes |
| DFIR | Digital Forensics and Incident Response | Forense + respuesta |
| MTTD / MTTR | Mean Time To Detect / Respond | Métricas de rapidez del SOC |
| RTO / RPO | Recovery Time / Point Objective | Cuánto tiempo y cuántos datos puedo perder |
| C2 / C&C | Command and Control | El servidor que controla el malware |
| APT | Advanced Persistent Threat | Actor sofisticado y persistente, normalmente estatal |
| TLP | Traffic Light Protocol | Cómo de compartible es una información |
