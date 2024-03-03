# 🛒 Nodepop

> 👤 Marta Vilaseca Foradada  
> 💻 XVI Bootcamp Full Stack Web  
> 📅 3 Marzo 2024

Desarrollar el API que se ejecutará en el servidor de un servicio de venta de artículos de segunda mano llamado **Nodepop**.

- [Instalación e inicialización](#instalación-e-inicialización)
- [Guía de uso: Website](#website)
- [Guía de uso: API](#api)
- [Anexo: listado de tags válidos](#tags-válidos)
- [Anexo: formatos de imagen permitidos](#formatos-de-imagen-válidos)
- [Anexo: requisitos práctica según enunciado](#requisitos)

---

# 📄 Documentación App

## Instalación e inicialización

⏬ **Clonamos el repositorio** en nuestro sistema

```sh
git clone git@github.com:marta-vilaseca/keepcoding-intro-node-pra.git
```

:open_file_folder: Cambiamos al directorio del repositorio e **instalamos las dependencias** necesarias:

```sh
cd nodepop
npm install
```

✅ Nos aseguramos que tenemos el **servidor de MongoDB** instalado y ejecutándose en nuestro sistema
✅ Cargamos los **anuncios por defecto** con que vienen incluídos en el archivo `initDB.js` que se proporciona en la carpeta del proyecto.

> [!CAUTION]  
> Ejecutar y confirmar este comando provocará el borrado de todo el contenido actual de la base de datos

> [!NOTE]  
> El comando solo se ejecutará con éxito si respondemos 'si' a la pregunta que se nos formula

```sh
node initDB.js
```

:arrow_forward: Una vez tenemos nuestra base de datos lista, ya podemos **inicializar nuestra aplicación**

💻 **`npm run dev`** para inicializar en **modo desarrollo**, en el cual:

- _nodemon_ irá monitorizando los cambios que se produzcan en la app y reiniciando el servidor automáticamente según sea necesario
- podremos ver información de los **errores** que se puedan ir produciendo, tanto en la API como en el website

🌍 **`npm start`** para inicializar en **modo producción**

---

## Guía de uso

A partir de aquí podremos :

- acceder al **website de NodePop** con nuestro navegador a través de la URL **`http://localhost:3000/`** e interactuar con él mediante distintos filtros (detallados en la sección [website](#website))
- **interactuar con el API** directamente mediante API requests (detalladas en la sección [API](#api)), usando el propio navegador o (en el caso de los endpoints utilizando los métodos POST, PATCH o DELETE) herramientas como [Postman](https://www.postman.com/).

---

### Website

:small_blue_diamond: Para ver el **listado de anuncios completo** visitaremos en nuestro navegador la ruta base del website:

```
http://localhost:3000/
```

:small_blue_diamond: Para **ver un anuncio específico** usaremos la ruta base seguida de la ID del mismo:

```
http://localhost:3000/:id
```

➜ Ejemplo: `http://localhost:3000/65e07cd8a31092a089d1f0fd`

:small_blue_diamond: Para ver el **listado de los distintos tags** que hay en la base de datos usaremos:

```
http://localhost:3000/tags/
```

#### Parámetros para filtrar

:small_blue_diamond: Para obtener **un listado de anuncios filtrados por título**, de manera que el nombre o título del anuncio empiece por la `:cadena` de caracteres especificada:

```
http://localhost:3000/?nombre=:cadena
```

➜ Ejemplo: `http://localhost:3000/?nombre=vi` mostrará todos los anuncios cuyo título empiece por `vi`

:small_blue_diamond: Para obtener listado de anuncios **bajo un tag determinado**:

```
http://localhost:3000/?tags=:tag
```

➜ Ejemplo: `http://localhost:3000/?tags=mobile` mostrará todos los anuncios bajo el tag `mobile`

:small_blue_diamond: Para obtener listado de anuncios **sólo de artículos en venta** o **sólo de artículos en búsqueda**:

```
http://localhost:3000/?tipo=venta
http://localhost:3000/?tipo=busqueda
```

:small_blue_diamond: Para obtener **listado de anuncios filtrado por (rango de) precio**:

- Productos cuyo precio sea `n` o más: `/api/anuncios?precio=:n-`
  ➜ Ejemplo: `http://localhost:3000/?precio=50-`
- Productos cuyo precio sea menor a `n`: `/api/anuncios?precio=-:n`
  ➜ Ejemplo: `http://localhost:3000/?precio=-100`
- Productos cuyo precio esté entre `n` y `n1` `/api/anuncios?precio=:n-:n1`
  ➜ Ejemplo: `http://localhost:3000/?precio=50-100`
- Productos cuyo precio sea _exactamente_ `n` `/api/anuncios?precio=n`
  ➜ Ejemplo: `http://localhost:3000/?precio=150`

:small_blue_diamond: Para aplicar **paginación** podemos utilizar:

- `skip` para saltar hasta un elemento determinado
  ➜ Ejemplo: `http://localhost:3000/?skip=2` empezará la lista desde el elemento número 3
- `limit` para determinar cuantos elementos queremos ver de una vez (por página)
  ➜ Ejemplo: `http://localhost:3000/?limit=5` nos mostrará solo 5 elementos de una vez (por página)

:small\*blue_diamond: Para **ordenar** los resultados de acuerdo a un campo determinado. Podemos incluir **más de un campo** separándolos por espacios, o añadir un **'-'** como modificador para indicar orden descendiente.

➜ Ejemplo: `http://localhost:3000/?sort=-precio` ordenamos por precio DESC
➜ Ejemplo: `http://localhost:3000/?sort=-precio%20nombre` ordenamos por precio DESC y luego nombre ASC

#### :small_blue_diamond: **Ejemplo encadenando varios parámetros:**

```
http://localhost:3000/?tags=lifestyle&limit=12&precio=100-&sort=-precio%20nombre
```

---

### API

#### :large_orange_diamond: Para obtener anuncios (usando el método GET)

A través del **endpoint** `/api/anuncios` _(ruta completa `http://localhost:3000/api/anuncios`)_ podemos obtener:

- Un **listado general** de todos los anuncios
- Un listado **filtrado de acuerdo a distintos criterios** (nombre, status de venta, precio, tags) y que opcionalmente además podremos:
  - paginar
  - ordenar por uno o más de los campos existentes, en orden ascendente o descendente

:small_orange_diamond: Para obtener el **listado de anuncios completo**:

```
/api/anuncios/
```

:small_orange_diamond: Para obtener **un anuncio específico** usaremos la ruta base seguida de la ID del mismo:

```
/api/anuncios/:id
```

➜ Ejemplo: `http://localhost:3000/api/anuncios/65e07cd8a31092a089d1f0fd`

:small_orange_diamond: Para ver el **listado de los distintos tags** que hay en la base de datos usaremos:

```
/api/tags/
```

#### Parámetros para filtrar

:small_orange_diamond: Para obtener **un listado de anuncios filtrados por título**, de manera que el nombre o título del anuncio empiece por la `:cadena` de caracteres especificada:

```
/api/anuncios?nombre=:cadena
```

➜ Ejemplo: `http://localhost:3000/api/anuncios?nombre=vi` mostrará todos los anuncios cuyo título empiece por `vi`

:small_orange_diamond: Para obtener listado de anuncios **de un tag determinado**:

```
/api/anuncios?tags=:tag
```

➜ Ejemplo: `http://localhost:3000/api/anuncios?tags=mobile` mostrará todos los anuncios bajo el tag `mobile`

:small_orange_diamond: Para obtener listado de anuncios **en función de su status de venta**:

➜ Ejemplo: `http://localhost:3000/api/anuncios?tipo=venta` muestra los anuncios de productos en venta
➜ Ejemplo: `http://localhost:3000/api/anuncios?tipo=busqueda` muestra los anuncios de productos que alguien esté buscando encontrar

:small_orange_diamond: Para obtener **listado de anuncios filtrado por (rango de) precio**:

- Productos cuyo precio sea `n` o más: `/api/anuncios?precio=:n-`
  ➜ Ejemplo: `http://localhost:3000/api/anuncios?precio=50-`
- Productos cuyo precio sea menor a `n`: `/api/anuncios?precio=-:n`
  ➜ Ejemplo: `http://localhost:3000/api/anuncios?precio=-100`
- Productos cuyo precio esté entre `n` y `n1` `/api/anuncios?precio=:n-:n1`
  ➜ Ejemplo: `http://localhost:3000/api/anuncios?precio=50-100`
- Productos cuyo precio sea _exactamente_ `n` `/api/anuncios?precio=n`
  ➜ Ejemplo: `http://localhost:3000/api/anuncios?precio=150`

:small_orange_diamond: Para aplicar **paginación** podemos utilizar:

- `skip` para saltar hasta un elemento determinado
  ➜ Ejemplo: `http://localhost:3000/api/anuncios?skip=2` empezará la lista desde el elemento número 3
- `limit` para determinar cuantos elementos queremos ver de una vez (por página)
  ➜ Ejemplo: `http://localhost:3000/api/anuncios?limit=5` nos mostrará solo 5 elementos de una vez (por página)

:small*orange_diamond: Para **ordenar** los resultados de acuerdo a un campo determinado. Podemos incluir **más de un campo** separándolos por espacios, o añadir un *'-'\_ como modificador para indicar orden descendiente.

➜ Ejemplo: `http://localhost:3000/api/anuncios?sort=-precio` ordenamos por precio DESC
➜ Ejemplo: `http://localhost:3000/api/anuncios?sort=-precio%20nombre` ordenamos por precio DESC y luego nombre ASC

#### :small_orange_diamond: **Ejemplo encadenando varios parámetros:**

```
http://localhost:3000/api/anuncios?tags=lifestyle&limit=12&precio=100-&sort=-precio%20nombre
```

#### :large_orange_diamond: Para añadir un anuncio nuevo (usando el método POST)

Desde Postman o equivalente, crearemos una **POST request** apuntando a `http://localhost:3000/api/anuncios`

A través del apartado **Body > x-www-form-urlencoded** podemos añadir un nuevo anuncio con los siguientes pares de key/value:

| Key             | Value      | Requerido |                                                                                                                                                                                                     |
| --------------- | ---------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **nombre**      | [String]   | ✔         |                                                                                                                                                                                                     |
| **tipo**        | [Boolean]  | ✔         | `true` para anuncio de venta, `false` para anuncio de búsqueda                                                                                                                                      |
| **precio**      | [Numérico] | ✔         |                                                                                                                                                                                                     |
| **tags**        | [String]   | ✔         | repetiremos el par key: `tags` / value: `cadena` para cada tag que queramos añadir. Tener en cuenta que **solo aceptará los [tags válidos](#tags-válidos)**                                         |
| **descripcion** | [String]   |           | opcional y solo visible en la vista de anuncio individual, podemos añadir un texto para el anuncio. Si no ponemos nada nos rellenará el espacio con un texto _lorem ipsum_ especificado por defecto |

> [!NOTE]  
> Opcionalmente podemos añadir también un campo **foto** con un string en formato `nombre.ext` (siendo `ext` cualquiera de los [formatos de imagen válidos](#formatos-de-imagen-válidos)). No es estrictamente necesario, ya que se ha previsto que **si no se facilita una referencia a una foto de la forma correcta**, se guarda el anuncio con una **imagen por defecto o _placeholder_**. Esto es sólo a modo de prueba, ya que por el momento **no hay una funcionalidad de subida de imágenes** así que solo podemos hacer referencia a alguna otra imagen de las que ya estén subidas en en proyecto (en la carpeta `/public/images`)

Tras mandarlo y si todo valida correctamente, recibiremos una respuesta en este formato (en este ejemplo hemos mandado _foto_ vacío, así que nos ha guardado el anuncio con el _placeholder_ `no-photo.png`):

```json
{
  "result": {
    "nombre": "Rice cooker",
    "tipo": false,
    "precio": 110,
    "foto": "no-photo.png",
    "tags": ["home", "lifestyle"],
    "descripcion": "Prueba de descripción de producto. Puede ser tan larga como necesitemos.",
    "_id": "65e3c5a2b330409bef4afbdf",
    "__v": 0
  }
}
```

#### :large_orange_diamond: Para modificar un anuncio existente (usando el método PATCH)

Desde Postman o equivalente, crearemos una **PATCH request** apuntando a `http://localhost:3000/api/anuncios/:id`, donde reemplazaremos id por el identificador del anuncio que queremos modificar

A través del apartado **Body > x-www-form-urlencoded** podemos modificar el anuncio de forma similar a como haríamos para crear uno nuevo, **pero solo incluyendo los campos cuyo contenido vamos a cambiar.**

Por ejemplo en caso de querer modificar el **precio** de un anuncio:
| Key | Value |
| ---------- | ---------- |
| **precio** | Nuevo precio, en formato _[Numérico]_ |

Al enviar y si todo valida correctamente, recibiremos una respuesta en este formato (con el anuncio entero actualizado, en este caso con nuevo precio de `200`):

```json
{
  "result": {
    "_id": "65e3c5a2b330409bef4afbdf",
    "nombre": "Rice cooker",
    "venta": false,
    "precio": 200,
    "foto": "no-photo.png",
    "tags": ["home", "lifestyle"],
    "__v": 0
  }
}
```

#### :large_orange_diamond: Para eliminar un anuncio existente (usando el método DELETE)

Desde Postman o equivalente, crearemos una **DELETE request** apuntando a `http://localhost:3000/api/anuncios/:id`, donde reemplazaremos id por el identificador del anuncio que queremos eliminar.

No tenemos que introducir más parámetros.

> [!CAUTION]  
> No nos pedirá confirmación de ningún tipo, si ejecutamos la petición y la id proporcionada es correcta borrará el anuncio automáticamente

Si no ha habido ningún error, recibiremos esta respuesta:

```json
{
  "message": "Document successfully deleted."
}
```

---

## Anexo

### Tags válidos

- collectibles
- electronics
- fashion
- games
- home
- lifestyle
- mobile
- motor
- outdoors
- work

### Formatos de imagen válidos

> [!NOTE]  
> La funcionalidad de poder subir imágenes aún no está implementada, pero para hacer pruebas se ha facilitado la posibilidad de, al añadir un anuncio nuevo, poder poner en el apartado foto un string en formato `nombre.ext`. Estas son las extensiones/formatos permitidos con este sistema

- `.jpg`, `.jpeg`
- `png`
- `gif`
- `webp`

### Requisitos

Según especificado en el enunciado o _briefing_, el servicio mantiene anuncios de compra o venta de artículos y permite tanto buscar como poner filtros por varios criterios, por tanto la API a desarrollar deberá proveer los métodos necesarios para esto.

Los sistemas donde se utilizará la API utilizan **bases de datos MongoDB**

Además del desarrollo de la API, es necesario que el site tenga una página frontend que muestre la lista de anuncios con los filtros que correspondan, según la URL introducida.

#### Datos de cada anuncio:

- **Nombre** del artículo/anuncio
- Si el artículo está en **Venta** o bien el anuncio es porque alguien está buscando ese producto
- **Precio** del artículo (de venta o de cuánto está dispuesto a pagar el anunciante, en caso de estarlo buscando)
- **Foto** del artículo
- **Tags**, conteniendo siempre uno o varios de estos cuatro: `work`, `lifestyle`, `motor` y `mobile`

#### Operaciones que debe realizar el API:

- [x] Lista de anuncios
  - [x] Posibilidad de paginación
  - [x] Filtros por tag
  - [x] Filtros por tipo de anuncio (venta/búsqueda)
  - [x] Filtros por rango de precio (especificando precio min y max)
  - [x] Filtro por nombre de artículo (que empiece por el texto buscado)
- [x] Lista de los tags existentes
- [x] Creación de anuncio

#### Extras valorados positivamente:

- [x] Documentación
- [ ] Validar nuestro código con ESLint
