---
titulo: Línea de comandos de Linux
subtitulo: true
---

# Línea de comandos de Linux

Moverse por el sistema de ficheros, ver qué hay y entender de dónde sale la información de los usuarios. Es lo que se pide en cualquier examen práctico y lo que se usa a diario en un servidor.

## Rutas absolutas y relativas

| Tipo | Empieza por | Significa |
|---|---|---|
| **Absoluta** | `/` | Desde la raíz del sistema. Vale desde cualquier sitio |
| **Relativa** | Cualquier otra cosa | Desde el directorio en el que estás ahora |

| Ruta | Tipo |
|---|---|
| `/home/usuario/Descargas` | Absoluta |
| `../Informes` | Relativa |
| `/var` | Absoluta |
| `docs` | Relativa |
| `/` | Absoluta: la propia raíz |

Los atajos que aparecen en las rutas relativas:

| Símbolo | Es |
|---|---|
| `.` | El directorio actual |
| `..` | El directorio padre |
| `~` | Tu directorio personal |
| `-` | El directorio anterior, con `cd -` |

> [!TIP]
> La forma rápida de distinguirlas: **si empieza por `/` es absoluta**. Y la pregunta de examen "escriba el comando más corto posible" casi siempre busca una ruta relativa o uno de estos atajos: desde `/`, para ir a `lost+found` dentro de `home`, lo más corto es `cd home/lost+found`, sin la barra inicial.

## Moverse y mirar

```bash
pwd                  # en qué directorio estoy
ls                   # listar
ls -l                # con detalle: permisos, dueño, tamaño, fecha
ls -a                # incluir los ocultos (los que empiezan por punto)
ls -la               # las dos cosas
ls -lh               # tamaños legibles (K, M, G)
cd /var/log          # ir a un directorio
cd ..                # subir uno
cd                   # ir a mi directorio personal
tree -F              # ver el árbol; con -F los directorios acaban en /
```

`ls -a` muestra además dos entradas que siempre están: **`.` y `..`**. Es la respuesta a la pregunta clásica de por qué `ls -a` en un directorio vacío no sale vacío.

## Ficheros y directorios

```bash
mkdir carpeta              # crear directorio
mkdir -p uno/dos/tres      # crear toda la ruta de una vez
touch fichero.txt          # crear vacío, o actualizar su fecha
cp origen destino          # copiar
cp -r carpeta/ destino/    # copiar directorios, recursivo
mv origen destino          # mover o renombrar
rm fichero                 # borrar
rm -r carpeta/             # borrar directorio con su contenido
rmdir carpeta              # borrar directorio, solo si está vacío
```

> [!WARNING]
> `rm` no tiene papelera: lo que se borra, se ha ido. `rm -rf /` o un `rm -rf $VARIABLE` con la variable vacía arrasan el sistema. Antes de un `rm -r`, ejecutar el mismo patrón con `ls` para ver exactamente qué va a desaparecer.

## Ver el contenido

```bash
cat fichero              # volcarlo entero
less fichero             # verlo paginado (q para salir, / para buscar)
head -20 fichero         # las 20 primeras líneas
tail -20 fichero         # las 20 últimas
tail -f /var/log/syslog  # seguirlo en vivo
wc -l fichero            # contar líneas
```

`tail -f` sobre un registro es lo que se deja abierto en una ventana mientras se reproduce un problema: los mensajes aparecen en el momento en que ocurren.

## Buscar

```bash
grep "texto" fichero             # buscar en un fichero
grep -i "texto" fichero          # sin distinguir mayúsculas
grep -r "texto" /etc             # recursivo por un directorio
grep -n "texto" fichero          # con número de línea
grep -v "texto" fichero          # las líneas que NO lo contienen

find /home -name "*.conf"        # por nombre
find / -type d -name "log"       # solo directorios
find /var -size +100M            # por tamaño
which python3                    # dónde está un ejecutable
```

## Leer la ficha de un usuario

De `/etc/passwd`, con `grep`, sale una línea como esta:

```
emma:x:1001:1001:Emma, departamento de sistemas:/home/emma:/bin/bash
```

Son **siete campos separados por dos puntos**, y saberlos de memoria es puntuable:

| Posición | Campo | En el ejemplo |
|---|---|---|
| 1 | **Nombre de usuario** | `emma` |
| 2 | **Contraseña** | `x`: está en `/etc/shadow`, no aquí |
| 3 | **UID** (identificador de usuario) | `1001` |
| 4 | **GID primario** (grupo principal) | `1001` |
| 5 | **GECOS** (información complementaria) | `Emma, departamento de sistemas` |
| 6 | **Directorio personal** | `/home/emma` |
| 7 | **Intérprete de órdenes** | `/bin/bash` |

> [!NOTE]
> La `x` del segundo campo es la pista de que el sistema usa contraseñas **en la sombra**: el hash está en `/etc/shadow`, que solo lee root. Un usuario con `/usr/sbin/nologin` o `/bin/false` en el último campo es una **cuenta de servicio**: existe para que un programa corra con ella, y no puede iniciar sesión.

## Crear un usuario con parámetros concretos

El ejercicio típico: crear un usuario indicando intérprete, directorio personal, información complementaria y grupo primario ya existente.

```bash
sudo useradd -s /bin/bash \
             -d /home/ejercicios -m \
             -c "alumno de ASIR" \
             -g primeroasir \
             alumno
```

| Opción | Qué indica |
|---|---|
| `-s` | El intérprete por defecto |
| `-d` | El directorio personal |
| `-m` | Que lo **cree** (sin esto se declara pero no existe) |
| `-c` | El campo GECOS, la información complementaria |
| `-g` | El **grupo primario**, que debe existir ya |
| `-G` | Grupos **secundarios**, separados por comas |

Y después, la contraseña y la comprobación:

```bash
sudo passwd alumno
grep alumno /etc/passwd
id alumno
```

> [!IMPORTANT]
> Distinguir `-g` de `-G` es lo que más se falla: **`-g` minúscula es el grupo primario** (uno solo) y **`-G` mayúscula son los secundarios** (varios). Y el grupo primario tiene que existir antes, o el comando falla.

El detalle de permisos y grupos está en [usuarios y permisos](#/asir/sistemas/usuarios-y-permisos).

## Tuberías y redirecciones

Lo que convierte comandos sueltos en herramientas:

```bash
comando > fichero        # redirigir la salida, sobreescribiendo
comando >> fichero       # añadir al final
comando 2> errores.txt   # redirigir solo los errores
comando | otro           # pasar la salida al siguiente comando

cat /etc/passwd | grep bash | wc -l      # cuántos usuarios usan bash
ls -l /var/log | sort -k5 -n | tail -5   # los cinco ficheros más grandes
```

> [!TIP]
> `>` **borra** el contenido previo del fichero; `>>` añade. Confundirlos con un fichero de configuración o un registro es un clásico, y no hay deshacer.
