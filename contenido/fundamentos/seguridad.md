---
titulo: Fundamentos de seguridad
subtitulo: true
---

# Fundamentos de seguridad

La base que se da por sabida antes de entrar en cualquier disciplina defensiva: qué tipos de control existen, cómo se organizan y el mínimo de redes que hace falta para leer un log sin perderse.

## Tipos de control de seguridad

Los controles se agrupan según **dónde** actúan. Casi cualquier medida que te encuentres cae en una de estas cinco familias.

| Familia | Qué protege | Ejemplos |
|---|---|---|
| **Física** | El acceso al edificio y al hardware | Disuasorios, control de acceso, videovigilancia |
| **Endpoint** | El equipo del usuario y el servidor | HIPS, HIDS, EDR, antivirus, análisis de compliance |
| **Correo** | El buzón, que es la vía de entrada más usada | Filtros de spam, DLP, análisis de correo |
| **Red** | El tráfico entre sistemas | Firewalls, NIPS, NIDS, NAC |
| **AAA** | Quién entra, qué puede hacer y qué queda registrado | Autenticación, autorización, accounting |

El SIEM aparece en varias familias a la vez porque no protege: **recoge y correlaciona** lo que las demás generan.

### AAA en una frase cada una

- **Authentication** — demostrar que eres quien dices. Contraseña, MFA, certificado.
- **Authorization** — qué te dejan hacer una vez dentro. Permisos, roles, mínimo privilegio.
- **Accounting** — el rastro de lo que hiciste. Es lo que hace posible una investigación posterior.

> [!NOTE]
> Las tres se confunden constantemente. Un usuario que entra con credenciales robadas pasa la autenticación perfectamente: el fallo no está ahí, está en que la autorización le dejaba llegar demasiado lejos y en que el accounting no lo detectó a tiempo.

## Networking 101

### Rangos privados

Direcciones que no se enrutan por Internet. Si ves una de estas como origen de una conexión, viene de dentro.

| Rango | Direcciones | Máscara |
|---|---|---|
| `10.0.0.0` – `10.255.255.255` | 16.777.216 | /8 |
| `172.16.0.0` – `172.31.255.255` | 1.048.576 | /12 |
| `192.168.0.0` – `192.168.255.255` | 65.536 | /16 |

Ojo con el rango de 172: **no** es todo el `172.x`, solo del 16 al 31. Es el error más común al leer una IP a ojo.

### Puertos que salen todo el rato

| Puerto | Servicio | Por qué te importa |
|---|---|---|
| 22 | SSH | Acceso remoto a Linux. Fuerza bruta constante si está expuesto |
| 25 | SMTP | Envío de correo entre servidores |
| 53 | DNS | Resolución de nombres. Muy usado para exfiltrar y para C2 |
| 80 / 443 | HTTP / HTTPS | Web. El 443 es donde se esconde casi todo el C2 moderno |
| 88 | Kerberos | Autenticación en dominio Windows |
| 135 / 139 / 445 | RPC / NetBIOS / SMB | Movimiento lateral en Windows |
| 389 / 636 | LDAP / LDAPS | Consultas al directorio activo |
| 514 | Syslog (UDP) | Envío de logs al SIEM |
| 3389 | RDP | Escritorio remoto. Objetivo clásico de ransomware |

### Syslog

Un servidor Syslog escucha en el **puerto 514 UDP** las notificaciones que le mandan los sistemas remotos configurados para reenviarle información.

Es la forma habitual de que dispositivos de red, servidores Linux y appliances hagan llegar sus eventos a una plataforma SIEM, para que puedan monitorizarse desde un único sitio.

> [!TIP]
> Al ser UDP, Syslog **no garantiza la entrega**: si un paquete se pierde, ese evento no llega y nadie se entera. Por eso muchos entornos usan syslog sobre TCP o un agente propio para las fuentes críticas.

## Las soft skills también son fundamento

Las que el temario coloca aquí desde el principio, y con razón:

- Comunicación
- Trabajo en equipo
- Resolución de problemas
- Gestión del tiempo
- Motivación
- Salud mental

No son relleno. Están al mismo nivel que lo técnico porque un análisis correcto mal comunicado, o hecho por alguien quemado, acaba igual de mal que un análisis incorrecto.
