---
titulo: Por dónde empezar
subtitulo: true
---

# Por dónde empezar

Guía para quien quiere entrar en ciberseguridad defensiva y no sabe por dónde. De cero al primer puesto de analista de SOC: qué estudiar, en qué orden, dónde practicar y qué se espera de ti en la entrevista.

> [!NOTE]
> No hay atajos, pero tampoco hace falta un máster de 8.000 €. Lo que hace falta es **base técnica sólida, práctica real y constancia**. Con eso se entra.

## Primero: qué hace de verdad un analista de SOC

Antes de invertir meses, conviene saber a qué te apuntas.

**Lo que sí es:**
- Mirar alertas todo el día y decidir cuáles importan.
- Investigar: ¿esta IP es mala? ¿este PowerShell es del administrador o de un atacante? ¿este correo es phishing?
- Escribir. Mucho. Tickets, informes, justificaciones de por qué cierras algo.
- Trabajar en turnos, a veces de noche o en fin de semana.
- Preguntar sin miedo cuando no sabes algo.

**Lo que no es:**
- Hackear. Eso es el otro lado, y es un porcentaje pequeño del sector.
- Pantallas de matrix y hoodies.
- Un incidente emocionante cada día. La mayoría de los turnos son rutina, y eso es buena señal.

Si al leer esto te sigue apeteciendo, sigue.

## La base que no te puedes saltar

Este es el error número uno: querer aprender seguridad sin saber cómo funciona lo que hay que proteger. **No se puede detectar un proceso anómalo si no sabes qué procesos son normales.**

Antes de tocar nada de seguridad, necesitas soltura en:

| Área | Qué hay que saber | Cómo se nota que lo sabes |
|---|---|---|
| **Redes** | Modelo TCP/IP, DNS, DHCP, HTTP/HTTPS, NAT, VLAN, firewall | Sabes explicar qué pasa desde que escribes una URL hasta que se pinta la página |
| **Windows** | Procesos, servicios, registro, permisos, tareas programadas, visor de eventos | Reconoces qué procesos son normales en un arranque limpio |
| **Active Directory** | Usuarios, grupos, GPO, autenticación Kerberos y NTLM | Entiendes qué es un DC y por qué comprometerlo lo es todo |
| **Linux** | Terminal, permisos, procesos, systemd, logs en `/var/log`, `grep`/`awk` | Te mueves sin interfaz gráfica sin agobiarte |
| **Scripting** | PowerShell y algo de Python o Bash | Puedes automatizar una tarea repetitiva en vez de hacerla 50 veces |
| **Virtualización** | VirtualBox o VMware, instantáneas, redes virtuales | Montas y rompes máquinas sin miedo |

> [!IMPORTANT]
> Si vienes de un FP de ASIR o de DAM, o de trabajar en sistemas o soporte, **ya tienes la mitad hecha**. Ese es el camino más común y el más rápido: sistemas → SOC.

## Ruta por fases

Los plazos son orientativos para alguien que le dedique unas 10-15 horas semanales. Ve a tu ritmo; lo importante es el orden, no el calendario.

### Fase 0 · Base de IT (2-3 meses, o cero si ya la tienes)

Monta un laboratorio con dos máquinas virtuales (un Windows y un Ubuntu) y **rómpelas**. Instala servicios, mira logs, configura un firewall, haz que se vean entre ellas.

Recursos gratuitos: los módulos de *Pre Security* y *Network Fundamentals* de TryHackMe, y Professor Messer para la teoría de redes.

### Fase 1 · Fundamentos de seguridad (1-2 meses)

Aquí ya entras en materia, y es justo lo que hay en estos apuntes:

1. [Conceptos básicos](#/fundamentos/conceptos-basicos) — vocabulario. CIA, IOC vs IOA, tipos de malware, quién es quién.
2. [Cyber Kill Chain](#/fundamentos/cyber-kill-chain) — cómo se estructura un ataque.
3. [MITRE ATT&CK](#/fundamentos/mitre-attack) — el lenguaje común del sector. **El más importante de todos.**
4. [Pirámide del Dolor](#/fundamentos/piramide-del-dolor) — por qué unas detecciones valen más que otras.
5. [Modelo del Diamante](#/fundamentos/modelo-diamante) — cómo se relacionan los indicadores de una investigación.
6. [Qué es un SOC](#/blue-team/que-es-un-soc) — cómo es el trabajo por dentro.

No memorices. Entiende para qué sirve cada modelo y cuándo se usa.

### Fase 2 · Práctica guiada (2-3 meses)

Es donde de verdad se aprende. Teoría sin práctica no sirve para nada en este oficio.

| Plataforma | Qué aporta | Coste |
|---|---|---|
| **TryHackMe** — ruta *SOC Level 1* | El mejor punto de partida. Guiado, ordenado y con máquinas ya montadas | Freemium |
| **LetsDefend** | Simula una consola de SOC con alertas reales que hay que triar | Freemium |
| **Blue Team Labs Online** | Retos exclusivamente defensivos, muy parecidos al trabajo real | Freemium |
| **CyberDefenders** | Retos DFIR con evidencias reales: PCAP, memoria, discos | Freemium |
| **Malware-Traffic-Analysis.net** | Capturas de infecciones reales con ejercicios y soluciones | Gratis |

En paralelo, ve leyendo las páginas de [herramientas](#/herramientas/threat-intelligence) según te las vayas encontrando. No intentes aprenderlas todas de golpe: aprende la que necesitas para el reto que tienes delante.

> [!TIP]
> Practica en este orden, que es el orden en que aparecen en el trabajo real: **phishing → logs de Windows → tráfico de red → memoria y forense**. El phishing es lo más frecuente y lo más fácil de empezar.

### Fase 3 · Laboratorio propio (1-2 meses)

Montar tu propio laboratorio es lo que más te va a diferenciar en una entrevista, porque demuestra que entiendes cómo encajan las piezas.

Lo mínimo que merece la pena:

```
+------------------+     +------------------+
|  Windows Server  |     |  Windows 10/11   |
|  Domain Controller|<-->|  cliente unido   |
|  Active Directory |     |  al dominio      |
+--------+---------+     +--------+---------+
         |    Sysmon + reenvío de logs      |
         v                                  v
    +------------------------------------------+
    |   Wazuh (o Splunk Free) recogiendo todo  |
    +------------------------------------------+
                       ^
                       |  ataca desde aquí
              +--------+--------+
              |      Kali       |
              +-----------------+
```

Y luego, el ejercicio que lo enseña todo: **atacas desde Kali y buscas tu propio ataque en los logs**. Lanza una fuerza bruta por RDP y encuentra los 4625. Ejecuta PowerShell codificado y encuéntralo en el 4104. Haz un `net user /add` y localiza el 4720.

Ese bucle — ataco, miro, detecto — es exactamente el trabajo.

Recursos: [Atomic Red Team](https://github.com/redcanaryco/atomic-red-team) para pruebas por técnica de ATT&CK, y la configuración de Sysmon de SwiftOnSecurity u Olaf Hartong.

### Fase 4 · Certificación y búsqueda (1-3 meses)

Certifícate **al final**, no al principio. La certificación acredita lo que ya sabes; no te lo enseña.

## Certificaciones: cuáles valen la pena

Ordenadas por lo que aportan a un perfil que empieza en blue team:

| Certificación | Para qué sirve | Coste aprox. |
|---|---|---|
| **BTL1** (Security Blue Team) | **La mejor primera certificación defensiva.** Examen 100 % práctico de 24 h: analizas un phishing real, logs, tráfico, memoria y forense. Lo que se hace en ella es literalmente el trabajo de un L1 | ~400 £ |
| **CompTIA Security+** | Teórica y generalista, pero es la que filtran muchos departamentos de RR. HH. y la que piden en licitaciones públicas | ~400 € |
| **Microsoft SC-200** | Muy útil si el SOC al que aspiras trabaja con Sentinel y Defender, que son mayoría en España | ~165 € |
| **Splunk Core Certified User** | Barata y directa: SPL aparece en muchísimas ofertas | ~130 € |
| **CompTIA CySA+** | El siguiente escalón tras Security+, ya centrado en análisis y detección | ~450 € |
| **BTL2 / GCIH / GCIA** | Para más adelante, cuando ya lleves tiempo. Las GIAC son excelentes y carísimas | 800 £ – 8.000 $ |

> [!TIP]
> Si sólo puedes pagar una y quieres trabajar en blue team, la **BTL1** es la que mejor relación calidad/precio tiene y la que más se nota en la entrevista, porque el examen es práctico: cuando cuentas cómo lo resolviste, se ve que sabes hacerlo, no sólo contarlo.

Lo que **no** necesitas para empezar: CISSP (pide 5 años de experiencia), OSCP (es ofensiva, otro camino), ni un máster caro antes de haber tocado una terminal.

## La entrevista de L1

Lo que preguntan casi siempre:

**Técnicas de base**
- Explícame qué pasa cuando escribes una URL en el navegador.
- Diferencia entre TCP y UDP. ¿Para qué se usa cada uno?
- ¿Qué es un puerto? Dime cinco puertos y su servicio.
- ¿Qué diferencia hay entre cifrado y hash?
- ¿Qué es una VPN y qué protege exactamente?

**De seguridad**
- ¿Qué es la tríada CIA?
- Diferencia entre amenaza, vulnerabilidad y riesgo.
- ¿Qué es MITRE ATT&CK y para qué se usa?
- ¿Qué es un IOC? Dame ejemplos.
- Diferencia entre IDS e IPS. Entre EDR y antivirus.
- ¿Qué es el phishing? ¿Cómo analizarías un correo sospechoso?

**Situacionales — las que de verdad deciden**
- Salta una alerta de PowerShell codificado en un equipo. ¿Qué haces?
- Un usuario dice que ha hecho clic en un enlace raro. ¿Cuáles son tus pasos?
- ¿Cómo distingues un falso positivo de un positivo real?
- ¿Qué harías si no sabes resolver una alerta?

> [!IMPORTANT]
> En las situacionales no buscan la respuesta perfecta: buscan **método**. Piensa en voz alta, di qué comprobarías y en qué orden, y admite lo que no sabes. "No lo sé, pero lo buscaría aquí y preguntaría a un L2" es una respuesta excelente. Inventarse una respuesta es la peor.

**Y una que hacen siempre:** *¿qué haces para estar al día?* Ten preparada una respuesta real: qué blogs lees, qué laboratorio tienes montado, qué reto hiciste la semana pasada.

## Cómo mantenerse al día

| Fuente | Qué aporta |
|---|---|
| **The DFIR Report** | Incidentes reales completos, con comandos, IOC y reglas Sigma. Lo mejor que hay, y es gratis |
| **INCIBE-CERT** y **CCN-CERT** | Avisos y guías en español |
| **Red Canary Threat Detection Report** | Informe anual con las técnicas más vistas en la práctica |
| **Blogs de Talos, Mandiant, ESET, Microsoft MSTIC** | Análisis de campañas y actores |
| **r/blueteamsec**, comunidades de Discord de las plataformas de práctica | Ambiente y preguntas |

Leer un informe entero de The DFIR Report al mes, y buscar en tu laboratorio lo que describe, enseña más que muchos cursos.

## Errores comunes

1. **Empezar por la seguridad sin base de sistemas y redes.** Es el error que más gente atasca.
2. **Coleccionar cursos sin practicar.** Diez cursos vistos valen menos que un laboratorio montado.
3. **Perseguir la certificación cara del principio.** Certifícate cuando ya sepas.
4. **Querer hacer reversing de malware en el mes dos.** Es fascinante y es un nicho muy pequeño; el trabajo está en el triaje.
5. **No escribir nada.** El oficio es 50 % investigar y 50 % explicar lo que investigaste. Escribe tus casos, aunque sean de laboratorio.
6. **Rendirse en la búsqueda.** El primer puesto es el difícil. A partir de ahí, todo cambia.

## Cuánto se tarda de verdad

Con base previa de IT: **6-9 meses** de estudio serio.
Empezando de cero: **12-18 meses**.

Y una vía que casi nadie considera y funciona muy bien: entrar en **soporte o en sistemas** en una empresa que tenga SOC, hacerlo bien un año, y moverte internamente. Se contrata mucho más fácil a alguien de dentro que ya conoce el entorno.

---

Si estás empezando y algo de estos apuntes no se entiende, es un fallo mío, no tuyo. Están escritos para el que llega, no para lucirse.
