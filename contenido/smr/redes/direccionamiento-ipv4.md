---
titulo: Direccionamiento IPv4
subtitulo: true
---

# Direccionamiento IPv4

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Una IPv4 son 32 bits en cuatro octetos. Lo que cambia de una dirección a otra es dónde se parte: cuánto es red y cuánto es host.

## Cómo se lee una dirección

Los 32 bits se escriben en cuatro números decimales de 0 a 255 separados por puntos, y cada uno son 8 bits:

```
192.168.1.30
11000000 10101000 00000001 00011110
```

La dirección se divide siempre en dos partes:

- **Parte de red** — identifica la red. Es igual en todos los equipos de esa red.
- **Parte de host** — identifica el equipo dentro de ella. Es distinta en cada uno.

En el direccionamiento **con clase** (el clásico, antes de CIDR) el corte lo decide el primer octeto.

## Las clases

| Clase | Primer octeto | Empieza por | Red / host | Máscara | CIDR |
|---|---|---|---|---|---|
| **A** | 1 – 126 | `0xxxxxxx` | 8 / 24 | 255.0.0.0 | /8 |
| **B** | 128 – 191 | `10xxxxxx` | 16 / 16 | 255.255.0.0 | /16 |
| **C** | 192 – 223 | `110xxxxx` | 24 / 8 | 255.255.255.0 | /24 |
| **D** | 224 – 239 | `1110xxxx` | multicast | — | — |
| **E** | 240 – 255 | `1111xxxx` | experimental | — | — |

Para identificar la clase basta el primer número:

| Dirección | Clase | Por qué |
|---|---|---|
| 10.250.1.1 | A | Primer octeto 10, entre 1 y 126 |
| 126.8.156.0 | A | 126 sigue siendo clase A |
| 148.17.9.1 | B | 148 está entre 128 y 191 |
| 177.100.18.4 | B | 177 está entre 128 y 191 |
| 192.14.2.0 | C | 192 está entre 192 y 223 |
| 220.200.23.1 | C | 220 está entre 192 y 223 |
| 230.230.45.58 | D | 230 está entre 224 y 239: multicast |

> [!NOTE]
> El 127 no aparece en ninguna clase útil: `127.0.0.0/8` es **loopback**, la propia máquina (`127.0.0.1`). Y el 0 está reservado.

Marcando con `R` los octetos de red y con `H` los de host se ve de un golpe:

| Dirección | Clase | Estructura |
|---|---|---|
| 110.255.255.255 | A | `R.H.H.H` |
| 130.43.3.125 | B | `R.R.H.H` |
| 193.10.5.30 | C | `R.R.R.H` |

## Dirección de red y de broadcast

Dos direcciones de cada red no se pueden asignar a ningún equipo:

- **Dirección de red** — la parte de host **toda a 0**. Nombra a la red entera.
- **Dirección de broadcast** — la parte de host **toda a 1**. Envía a todos los equipos de la red a la vez.

| Dirección | Clase | Red | Broadcast | Rango útil |
|---|---|---|---|---|
| 110.255.255.255 | A | 110.0.0.0 | 110.255.255.255 | 110.0.0.1 – 110.255.255.254 |
| 130.43.3.125 | B | 130.43.0.0 | 130.43.255.255 | 130.43.0.1 – 130.43.255.254 |
| 193.10.5.30 | C | 193.10.5.0 | 193.10.5.255 | 193.10.5.1 – 193.10.5.254 |

De ahí sale el número de equipos que caben: **2<sup>bits de host</sup> − 2**. En una clase C, 2⁸ − 2 = **254**.

## La máscara de red

La máscara marca con unos los bits de red y con ceros los de host. Puesta debajo de la IP, dice dónde está el corte:

```
IP       192.168.1.30     11000000 10101000 00000001 00011110
Máscara  255.255.255.0    11111111 11111111 11111111 00000000
                          └────── red ──────────────┘└─ host ─┘
```

La notación **CIDR** es lo mismo contando unos: `/24` son 24 bits de red, o sea `255.255.255.0`.

## Privadas y públicas

Las privadas son los rangos reservados para redes internas. No se enrutan por internet, así que se repiten en millones de casas y oficinas:

| Rango | CIDR | Clase de origen |
|---|---|---|
| 10.0.0.0 – 10.255.255.255 | /8 | A |
| 172.16.0.0 – 172.31.255.255 | /12 | B |
| 192.168.0.0 – 192.168.255.255 | /16 | C |

Todo lo demás es **pública**: direccionable desde internet y asignada por un registro, no elegida por ti.

Aparte va **APIPA**, `169.254.0.0/16`: la dirección que se pone Windows a sí mismo cuando pide una por DHCP y no hay quien se la dé. Si un equipo aparece con una `169.254.x.x`, el DHCP no le está respondiendo.

> [!TIP]
> Ver una `192.168.x.x` o una `10.x.x.x` en un log no dice nada del exterior: son direcciones internas. Para saber quién habló de verdad hace falta el registro del NAT.
