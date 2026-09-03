---
titulo: Inteligencia táctica
subtitulo: true
---

# Inteligencia táctica

La parte técnica e inmediata: los indicadores que entran en tus herramientas y las comprobaciones que se hacen con ellos.

## Threat exposure checks

Usar el **SIEM** y el **EDR** para buscar si algún IOC reciente —IPs, dominios, hashes— aparece ya en tu red.

Es una tarea táctica porque no basta con lanzar la búsqueda: hay que **revisar los resultados y valorar si hay riesgo real**. Que una IP aparezca en tus logs puede significar un compromiso, o que alguien visitó una web que la tenía embebida.

## Watchlists y monitorización de IOCs

Vigilancia **continua** de la presencia de IOCs o precursores en la red, con SIEM o EDR.

- Detecta actividad maliciosa automáticamente, sin que un analista tenga que buscar a mano.
- Se crean listas de vigilancia con IPs, dominios, hashes u otros indicadores, que **generan alerta al detectarse**.

La diferencia con el punto anterior: el *exposure check* es una búsqueda puntual hacia atrás; la watchlist es permanente y hacia delante.

> [!WARNING]
> Toda watchlist necesita fecha de caducidad. Un indicador táctico se pudre en días, y una lista que nadie revisa acaba generando alertas por IPs que ahora pertenecen a un CDN legítimo. Eso quema al equipo más que no tener la lista.

## Public exposure checks

Buscar **qué información de la empresa está disponible online** y podría explotarse.

Qué se revisa:

- Redes sociales y **metadatos de imágenes**.
- Información filtrada dentro de fotos o documentos publicados.
- Señales de amenaza interna en lo que publican los empleados.
- **Suplantación de marca** y dominios de phishing parecidos al tuyo.
- Filtraciones de datos y de credenciales.

Es OSINT aplicado contra uno mismo: mirar tu propia empresa con los ojos con los que la miraría el atacante antes de preparar un spear phishing.

## Threat Intelligence Platform (TIP)

Una plataforma que **centraliza, organiza y distribuye** toda la inteligencia de la organización. Permite agregar fuentes, normalizar los datos, analizarlos y **enviarlos a las herramientas de seguridad**: firewalls, EDR, SIEM.

Da servicio a la vez al SOC, al equipo de threat intel y a la dirección.

| TIP | Característica |
|---|---|
| **MISP** | Código abierto, muy extendido, pensado para compartir |
| **ThreatConnect** | Ingesta automatizada y playbooks |
| **Anomali** | Permite crear tu propio ISAC y añadir integraciones desde su tienda |
| **ThreatQ** | Orientado a operaciones; también cubre vulnerabilidades, spear phishing, IR y threat hunting |

## MISP

Plataforma **gratuita y de código abierto** para recopilar, almacenar y compartir IOCs. Creada por la comunidad y pensada para analistas de incidentes, de malware y de threat intel. Su objetivo es facilitar el **intercambio estructurado** entre organizaciones.

### Qué hace

- Guarda información técnica y no técnica de malware, ataques e incidentes.
- Crea **relaciones automáticas** entre atributos, de modo que un IOC te lleva a los relacionados.
- Usa formato estructurado para integrarse con NIDS, HIDS o SIEM.
- **Genera reglas IDS** para Snort, Suricata y Zeek.
- Comparte IOCs con otras organizaciones o comunidades.
- Evita esfuerzos duplicados y mejora la detección colectiva.
- Mantiene copia local de la información de otras instancias, para preservar la privacidad.

### Cómo funciona

Se accede por **web** o por **API REST**. Está diseñado para recoger, madurar y distribuir inteligencia sin fricción.

Cada evento tiene un **nivel de distribución** que tú decides:

| Nivel | Quién lo ve |
|---|---|
| Organización | Solo tu organización |
| Comunidad | Solo tu comunidad |
| Conectadas | Las comunidades conectadas |
| Público | Todo el mundo |

> [!TIP]
> El nivel de distribución es lo primero que hay que mirar antes de subir nada. Un IOC que incluya un nombre de fichero interno, una ruta con el nombre de un cliente o una IP de tu red se convierte en una filtración en cuanto lo publicas.
