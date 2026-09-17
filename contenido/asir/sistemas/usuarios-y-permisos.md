---
titulo: Usuarios y permisos en Linux
subtitulo: true
---

# Usuarios y permisos en Linux

Quién es cada uno, a qué grupo pertenece y qué puede hacer con cada fichero. Es la base de la administración, y lo que se pregunta en cualquier examen práctico.

## Cómo se leen los permisos

```
$ ls -l
-rw-r--r--  1 usuario  grupo1  1024  nota.txt
drwxr-x---  2 usuario  grupo1  4096  privado/
```

La primera columna son diez caracteres:

```
- rw- r-- r--
│  │   │   └── otros: los demás usuarios del sistema
│  │   └────── grupo: los miembros del grupo del fichero
│  └────────── propietario: el dueño
└───────────── tipo: - fichero, d directorio, l enlace
```

| Permiso | En un fichero | En un directorio |
|---|---|---|
| **r** (lectura) | Ver su contenido | Listar lo que hay dentro |
| **w** (escritura) | Modificarlo | Crear y borrar ficheros dentro |
| **x** (ejecución) | Ejecutarlo | **Entrar** en él |

> [!IMPORTANT]
> En directorios, la `x` es lo que la mayoría confunde: sin ella no se puede entrar ni acceder a nada de dentro, aunque haya permiso de lectura. Y la `w` en un directorio permite **borrar** ficheros de dentro aunque no se tenga permiso sobre esos ficheros.

## La notación octal

Cada permiso vale un número, y se suman por cada grupo:

| Permiso | Valor |
|---|---|
| r (lectura) | 4 |
| w (escritura) | 2 |
| x (ejecución) | 1 |

| Octal | Equivale a | Significa |
|---|---|---|
| **7** | rwx | Todo |
| **6** | rw- | Leer y escribir |
| **5** | r-x | Leer y ejecutar |
| **4** | r-- | Solo leer |
| **0** | --- | Nada |

Así que tres dígitos definen los permisos completos: propietario, grupo y otros.

| Modo | Lectura | Uso típico |
|---|---|---|
| **644** | rw-r--r-- | Un fichero normal: el dueño escribe, los demás leen |
| **600** | rw------- | Un fichero privado: solo el dueño |
| **755** | rwxr-xr-x | Un directorio, o un script ejecutable |
| **700** | rwx------ | Un directorio privado |
| **777** | rwxrwxrwx | **Todos pueden todo** |

## Cambiar permisos: chmod

```bash
chmod 644 nota.txt              # notación octal
chmod 755 script.sh
chmod u+x script.sh             # añadir ejecución al propietario
chmod go-w nota.txt             # quitar escritura a grupo y otros
chmod -R 755 carpeta/           # recursivo, sobre todo el contenido
```

En la notación simbólica: `u` propietario, `g` grupo, `o` otros, `a` todos; con `+` se añade, con `-` se quita y con `=` se fija exactamente.

> [!WARNING]
> **`chmod 777` no es "arreglarlo", es rendirse.** Deja que cualquier usuario del sistema lea, modifique y ejecute ese fichero. Aparece en todos los foros como solución rápida a un problema de permisos y es la forma de convertir un problema pequeño en un agujero de seguridad. Lo correcto es averiguar **qué usuario** necesita el acceso y dárselo a ese.

## Cambiar dueño y grupo

```bash
sudo chown usuario nota.txt              # cambiar propietario
sudo chgrp grupo1 nota.txt               # cambiar grupo
sudo chown usuario:grupo1 nota.txt       # los dos de una vez
sudo chown -R usuario:grupo1 carpeta/    # recursivo
```

Estos comandos necesitan `sudo`: un usuario normal no puede regalar un fichero ni cambiarle el grupo a su antojo.

## Usuarios

```bash
sudo adduser usuario            # crear usuario (interactivo, crea su /home)
sudo useradd -m usuario         # versión de bajo nivel
sudo passwd usuario             # cambiar su contraseña
sudo usermod -aG grupo1 usuario # añadirlo a un grupo, sin sacarlo de los que ya tiene
sudo deluser usuario            # borrarlo
id usuario                      # ver su uid, gid y grupos
whoami                          # con qué usuario estoy trabajando
```

> [!TIP]
> En `usermod -aG` la `-a` es obligatoria: sin ella, `-G` **reemplaza** la lista de grupos del usuario en lugar de añadir, y se queda fuera de todos los demás. Es un error clásico que deja a alguien sin `sudo` de un día para otro.

## Grupos

```bash
sudo addgroup grupo1            # crear grupo
sudo adduser usuario grupo1     # añadir usuario al grupo
sudo delgroup grupo1            # borrar grupo
groups usuario                  # ver a qué grupos pertenece
```

Los grupos son la forma de dar permiso a **varias personas a la vez** sin tocar los permisos de cada fichero: se pone el fichero con el grupo adecuado y se mete en ese grupo a quien deba acceder. Es la diferencia entre administrar diez usuarios y administrar mil.

## Dónde vive todo esto

| Fichero | Contiene |
|---|---|
| `/etc/passwd` | Los usuarios: nombre, uid, gid, directorio personal y shell |
| `/etc/shadow` | Las contraseñas cifradas. Solo root lo lee |
| `/etc/group` | Los grupos y sus miembros |
| `/etc/sudoers` | Quién puede usar `sudo` y para qué |

`/etc/passwd` es legible por todos, y aun así no es un problema: las contraseñas no están ahí, sino en `/etc/shadow`, al que solo accede root. Esa separación se hizo precisamente por eso.

> [!NOTE]
> `/etc/sudoers` no se edita con un editor cualquiera, sino con **`visudo`**: comprueba la sintaxis antes de guardar. Un error de sintaxis ahí puede dejar el sistema sin ninguna forma de escalar privilegios, y entonces hay que arrancar en modo de recuperación para arreglarlo.

## root y sudo

`root` es el superusuario: puede todo y no le afectan los permisos. Por eso no se trabaja con él.

`sudo` permite a un usuario autorizado ejecutar **una orden concreta** con privilegios de root, pidiendo su propia contraseña y **dejando registro** de lo que ha hecho. Es mejor por las tres cosas: se limita el alcance, se sabe quién hizo qué y no hay una contraseña de root compartida por media oficina.
