---
titulo: Subredes
subtitulo: true
---

# Subredes

Dividir una red en trozos más pequeños es robarle bits a la parte de host para dárselos a la parte de red. Todo el cálculo sale de ahí.

## El método, en cuatro pasos

Partimos de la red **172.28.0.0/16** (16 bits de red, 16 de host) y hacen falta **6 subredes**.

### 1. Cuántos bits hay que robar

Se busca el menor `n` que cumpla **2<sup>n</sup> ≥ número de subredes**:

| n | 2ⁿ | ¿Sirve para 6? |
|---|---|---|
| 1 | 2 | No |
| 2 | 4 | No |
| **3** | **8** | **Sí** |

Con `n = 3` la red pasa de `/16` a `/19`: **19 bits de red y 13 de host**. Sobran dos subredes de las ocho, que quedan libres para crecer.

### 2. La máscara nueva

Se ponen a 1 los tres bits robados del tercer octeto:

```
11111111 11111111 11100000 00000000
   255      255      224       0
```

Máscara **255.255.224.0**, o **/19**.

### 3. El salto entre subredes

El último bit de red vale 32 en el tercer octeto (128 + 64 + 32 = 224), así que las subredes van **de 32 en 32** en ese octeto: 0, 32, 64, 96, 128, 160, 192, 224.

> [!TIP]
> El salto es siempre **256 − el número de la máscara** en el octeto donde cae el corte. Con /19 → 256 − 224 = 32. Sirve para cualquier máscara sin tener que pasar a binario.

### 4. Cuántos equipos caben

Quedan 13 bits de host: **2¹³ − 2 = 8190** equipos por subred.

## Tabla de las 8 subredes

| Subred | Dirección de subred | Broadcast | Rango útil | Equipos |
|---|---|---|---|---|
| 0 | 172.28.0.0/19 | 172.28.31.255 | 172.28.0.1 – 172.28.31.254 | 8190 |
| 1 | 172.28.32.0/19 | 172.28.63.255 | 172.28.32.1 – 172.28.63.254 | 8190 |
| 2 | 172.28.64.0/19 | 172.28.95.255 | 172.28.64.1 – 172.28.95.254 | 8190 |
| 3 | 172.28.96.0/19 | 172.28.127.255 | 172.28.96.1 – 172.28.127.254 | 8190 |
| 4 | 172.28.128.0/19 | 172.28.159.255 | 172.28.128.1 – 172.28.159.254 | 8190 |
| 5 | 172.28.160.0/19 | 172.28.191.255 | 172.28.160.1 – 172.28.191.254 | 8190 |
| 6 | 172.28.192.0/19 | 172.28.223.255 | 172.28.192.1 – 172.28.223.254 | 8190 |
| 7 | 172.28.224.0/19 | 172.28.255.255 | 172.28.224.1 – 172.28.255.254 | 8190 |

La **puerta de enlace** se suele poner en la primera IP útil de cada subred (`172.28.32.1` en la subred 1), o en la última por convenio de la casa. Lo importante es que sea la misma norma en toda la red.

En binario se ve por qué el salto es 32: los tres bits robados son los que cambian.

```
Subred 0   10101100 00011100 000 00000 00000000   172.28.0.0
Subred 1   10101100 00011100 001 00000 00000000   172.28.32.0
Subred 2   10101100 00011100 010 00000 00000000   172.28.64.0
                             ↑↑↑
                       bits robados al host
```

## Subdividir una subred

Una subred se puede volver a partir, robando más bits de lo que le queda de host. Es el mismo método, empezando por donde lo dejamos.

**La subred 1 (172.28.32.0/19) en 2 trozos:** `2¹ = 2`, así que un bit más → **/20**, salto de 16.

| Subred | Dirección | Broadcast | Rango útil | Equipos |
|---|---|---|---|---|
| 1.0 | 172.28.32.0/20 | 172.28.47.255 | 172.28.32.1 – 172.28.47.254 | 4094 |
| 1.1 | 172.28.48.0/20 | 172.28.63.255 | 172.28.48.1 – 172.28.63.254 | 4094 |

**La subred 5 (172.28.160.0/19) en 4 trozos:** `2² = 4`, dos bits más → **/21**, salto de 8.

| Subred | Dirección | Broadcast | Rango útil | Equipos |
|---|---|---|---|---|
| 5.0 | 172.28.160.0/21 | 172.28.167.255 | 172.28.160.1 – 172.28.167.254 | 2046 |
| 5.1 | 172.28.168.0/21 | 172.28.175.255 | 172.28.168.1 – 172.28.175.254 | 2046 |
| 5.2 | 172.28.176.0/21 | 172.28.183.255 | 172.28.176.1 – 172.28.183.254 | 2046 |
| 5.3 | 172.28.184.0/21 | 172.28.191.255 | 172.28.184.1 – 172.28.191.254 | 2046 |

Cada trozo se queda **dentro** del rango de su subred padre: las cuatro de arriba caben en 172.28.160.0 – 172.28.191.255, que es exactamente la subred 5. Si al terminar un cálculo una subred hija se sale de ese rango, el cálculo está mal.

## Chuleta de máscaras

| CIDR | Máscara | Salto | Hosts útiles |
|---|---|---|---|
| /24 | 255.255.255.0 | 1 (tercer octeto) | 254 |
| /25 | 255.255.255.128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 14 |
| /29 | 255.255.255.248 | 8 | 6 |
| /30 | 255.255.255.252 | 4 | 2 |

> [!NOTE]
> La `/30` es la de los enlaces punto a punto entre routers: dos IPs útiles, justo las que hacen falta.
