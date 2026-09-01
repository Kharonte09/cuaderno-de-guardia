---
titulo: Por dónde empezar
subtitulo: true
---

# Por dónde empezar

Ruta para entrar en ciberseguridad defensiva: qué estudiar, en qué orden, dónde practicar y qué se pregunta en la entrevista de analista de SOC.

## Qué hace un analista de SOC

- Revisar alertas y decidir cuáles importan.
- Investigar: si una IP es maliciosa, si un PowerShell es del administrador o de un atacante, si un correo es phishing.
- Escribir tickets e informes justificando cada conclusión.
- Trabajar a turnos, incluidas noches y fines de semana.

No es un puesto ofensivo: eso es pentesting, otro camino distinto.

## Base previa

No se puede detectar un proceso anómalo sin saber qué procesos son normales. Antes de la parte de seguridad:

| Área | Qué hay que saber |
|---|---|
| **Redes** | TCP/IP, DNS, DHCP, HTTP/HTTPS, NAT, VLAN, firewall |
| **Windows** | Procesos, servicios, registro, permisos, tareas programadas, visor de eventos |
| **Active Directory** | Usuarios, grupos, GPO, autenticación Kerberos y NTLM |
| **Linux** | Terminal, permisos, procesos, systemd, logs en `/var/log`, `grep` y `awk` |
| **Scripting** | PowerShell, y algo de Python o Bash |
| **Virtualización** | VirtualBox o VMware, instantáneas, redes virtuales |

Con un FP de ASIR o DAM, o con experiencia en sistemas o soporte, esta parte ya está cubierta.

## Ruta por fases

Plazos orientativos para unas 10-15 horas semanales.

### Fase 0 · Base de IT (2-3 meses, o ninguno si ya la tienes)

Dos máquinas virtuales, un Windows y un Ubuntu. Instalar servicios, mirar logs, configurar un firewall, hacer que se vean entre ellas.

Gratis: módulos *Pre Security* y *Network Fundamentals* de TryHackMe, y Professor Messer para la teoría de redes.

### Fase 1 · Fundamentos de seguridad (1-2 meses)

En este orden:

1. [Conceptos básicos](#/fundamentos/conceptos-basicos) — CIA, IOC vs IOA, tipos de malware, vocabulario.
2. [Cyber Kill Chain](#/fundamentos/cyber-kill-chain) — las fases de un ataque.
3. [MITRE ATT&CK](#/fundamentos/mitre-attack) — el lenguaje común del sector.
4. [Pirámide del Dolor](#/fundamentos/piramide-del-dolor) — qué detecciones aguantan y cuáles caducan.
5. [Modelo del Diamante](#/fundamentos/modelo-diamante) — cómo se relacionan los indicadores.
6. [Qué es un SOC](#/blue-team/que-es-un-soc) — cómo está organizado el trabajo.

### Fase 2 · Práctica guiada (2-3 meses)

| Plataforma | Qué es | Coste |
|---|---|---|
| **TryHackMe** — ruta *SOC Level 1* | Recorrido guiado con máquinas ya montadas | Freemium |
| **LetsDefend** | Simulador de consola de SOC con alertas que hay que triar | Freemium |
| **Blue Team Labs Online** | Retos defensivos: phishing, PCAP, memoria, incidentes | Freemium |
| **CyberDefenders** | Retos DFIR con evidencias reales | Freemium |
| **Malware-Traffic-Analysis.net** | Capturas de infecciones reales con ejercicios y soluciones | Gratis |

Orden recomendado, que es el orden en que aparecen en el trabajo: **phishing → logs de Windows → tráfico de red → memoria y forense**.

Las páginas de [herramientas](#/herramientas/threat-intelligence) se leen según hagan falta, no de golpe.

### Fase 3 · Laboratorio propio (1-2 meses)

```text
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

El ejercicio: atacar desde Kali y buscar el ataque en los logs. Fuerza bruta por RDP → encontrar los 4625. PowerShell codificado → encontrarlo en el 4104. `net user /add` → localizar el 4720.

Herramientas: [Atomic Red Team](https://github.com/redcanaryco/atomic-red-team) para lanzar técnicas por identificador de ATT&CK, y la configuración de Sysmon de SwiftOnSecurity u Olaf Hartong.

### Fase 4 · Certificación y búsqueda (1-3 meses)

La certificación acredita lo que ya sabes; no lo enseña. Va al final.

## Certificaciones

| Certificación | Qué es | Coste aprox. |
|---|---|---|
| **BTL1** (Security Blue Team) | Examen práctico de 24 h: phishing, logs, tráfico, memoria y forense sobre evidencias reales | ~400 £ |
| **CompTIA Security+** | Teórica y generalista. La piden muchos departamentos de RR. HH. y las licitaciones públicas | ~400 € |
| **Microsoft SC-200** | Sentinel y Defender. Útil si el SOC trabaja con el ecosistema Microsoft | ~165 € |
| **Splunk Core Certified User** | SPL, que aparece en bastantes ofertas | ~130 € |
| **CompTIA CySA+** | Siguiente escalón tras Security+, centrada en análisis y detección | ~450 € |
| **BTL2 / GCIH / GCIA** | Para más adelante. Las GIAC son caras | 800 £ – 8.000 $ |

No hacen falta para empezar: CISSP (exige 5 años de experiencia) ni OSCP (es ofensiva).

## La entrevista de L1

**Base técnica**
- Qué pasa cuando escribes una URL en el navegador.
- Diferencia entre TCP y UDP.
- Qué es un puerto. Cinco puertos y su servicio.
- Diferencia entre cifrado y hash.
- Qué es una VPN y qué protege.

**Seguridad**
- La tríada CIA.
- Diferencia entre amenaza, vulnerabilidad y riesgo.
- Qué es MITRE ATT&CK y para qué se usa.
- Qué es un IOC, con ejemplos.
- Diferencia entre IDS e IPS, y entre EDR y antivirus.
- Cómo analizarías un correo sospechoso.

**Situacionales**
- Salta una alerta de PowerShell codificado en un equipo. ¿Qué haces?
- Un usuario ha hecho clic en un enlace raro. ¿Cuáles son tus pasos?
- Cómo distingues un falso positivo de un positivo real.
- Qué haces si no sabes resolver una alerta.

En las situacionales se evalúa el método, no la respuesta exacta: qué comprobarías y en qué orden. "No lo sé, lo buscaría aquí y lo escalaría" es una respuesta válida; inventarse una no.

Preguntan casi siempre qué haces para estar al día. Conviene tener una respuesta concreta: qué lees, qué laboratorio tienes montado, qué reto hiciste hace poco.

## Mantenerse al día

| Fuente | Qué publica |
|---|---|
| **The DFIR Report** | Incidentes reales completos, con comandos, IOC y reglas Sigma |
| **INCIBE-CERT** y **CCN-CERT** | Avisos y guías en español |
| **Red Canary Threat Detection Report** | Informe anual de las técnicas más observadas |
| **Talos, Mandiant, ESET, Microsoft MSTIC** | Análisis de campañas y actores |
| **r/blueteamsec** y los Discord de las plataformas de práctica | Preguntas y comunidad |

## Errores comunes

1. Empezar por seguridad sin base de sistemas y redes.
2. Acumular cursos sin practicar.
3. Sacarse una certificación cara antes de tener el nivel.
4. Enfocarse en reversing de malware: es un nicho pequeño, el trabajo está en el triaje.
5. No escribir. Media jornada consiste en explicar por escrito lo investigado.

## Plazos

Con base previa de IT: 6-9 meses de estudio. Empezando de cero: 12-18 meses.

Otra vía: entrar en soporte o sistemas en una empresa que tenga SOC y moverse internamente al cabo de un tiempo.
