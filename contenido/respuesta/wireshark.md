---
titulo: Wireshark
subtitulo: true
---

# Wireshark

Análisis de paquetes: cómo quedarse solo con lo que importa de una captura y qué ventanas de estadísticas delatan una exfiltración.

## Filtros de visualización

Permiten mostrar solo los paquetes relevantes, separando el tráfico importante del ruido.

### Por protocolo o cabecera

```text
udp                 → solo paquetes UDP
http.request        → solo peticiones HTTP
```

### Por valor de campo

```text
tcp.port == 80
tcp.window_size_value >= 8000
```

### Operadores lógicos

`&&` (and), `||` (or), `!` (not).

```text
ip.dst_host == 192.168.1.7 && tcp    → TCP hacia esa IP
ntp || udp.port == 20000             → NTP o UDP en el 20000
!ftp                                 → todo excepto FTP
```

Se pueden agrupar condiciones con paréntesis para combinaciones complejas.

> [!TIP]
> No confundas los **filtros de visualización** con los **de captura**. El de visualización oculta paquetes que ya tienes guardados y se puede cambiar mil veces; el de captura decide qué se graba, y lo que descartas ahí no vuelve.

## Seguir la transmisión

Para analizar una comunicación completa sin ir paquete por paquete:

1. Clic derecho en un paquete → **Seguir → Transmisión TCP / UDP / HTTP / SSL**.
2. Wireshark aplica el filtro y abre una ventana con toda la conversación.

**Ventaja:** ves peticiones y respuestas juntas —peticiones en rojo, respuestas en azul— incluyendo cabeceras y contenido de ficheros.

Es la forma más rápida de leer qué se dijeron realmente dos máquinas.

## Columnas personalizadas

Muestra valores concretos de cabecera directamente en la lista de paquetes.

**Cómo:** clic derecho sobre un campo de la cabecera → **Aplicar como columna**.

Así identificas los paquetes con el valor que buscas sin tener que abrirlos uno a uno.

## Estadísticas

Tres ventanas que sirven para encontrar patrones y anomalías sin saber de antemano qué buscas.

### Jerarquía de protocolos

Muestra el **porcentaje de paquetes y bytes por protocolo**, de capa 2 a capa 7.

Sirve para identificar protocolos **inusuales** que podrían indicar exfiltración o tráfico no esperado. Clic derecho → **Aplicar como filtro** para aislar o excluir uno.

> Un 0,1 % de tráfico FTP en una red que no usa FTP es sospechoso.

Ese ejemplo resume bien la técnica: no buscas volumen, buscas **lo que no debería estar ahí en absoluto**.

### Conversaciones

Muestra **quién habla con quién**: por IP o MAC, con puertos y volumen.

Útil para detectar exfiltración o conexiones sospechosas:

> Mucho tráfico **hacia** una IP desconocida sin recibir apenas nada de vuelta → posible exfiltración.

La asimetría es la señal. Una navegación normal recibe mucho más de lo que envía; una exfiltración hace justo lo contrario.

### Endpoints

Lista todos los hosts de la captura con paquetes y bytes enviados y recibidos.

Permite clasificar por actividad:

| Patrón | Interpretación probable |
|---|---|
| Recibe mucho más de lo que envía | Descarga |
| Envía mucho más de lo que recibe | Subida, copia de seguridad… o exfiltración |

Se puede ordenar por protocolo (TCP, UDP) o por dirección MAC, y aplicar filtro sobre un host concreto con clic derecho.
