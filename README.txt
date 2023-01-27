# Proyecto backend e-commerce con NodeJS

- [Resúmen](#resúmen)
- [1. Puesta en marcha](#1-puesta-en-marcha)
  - [A. Requisitos previos](#a-requisitos-previos)
  - [B. Instalación del proyecto](#b-instalación-del-proyecto-y-dependencias)
  - [C. Ejecución en localhost](#c-ejecución-en-localhost)
- [2. Tecnologías utilizadas](#2-tecnologías-y-librerías-utilizadas)
- [3. AUTH Endpoints](#3-auth-endpoints)
- [4. API Endpoints](#4-api-endpoints)
  - [A. Productos](#a-productos)
  - [B. Carritos](#b-carritos)
  - [C. Ordenes](#c-ordenes)
  - [D. Usuario](#d-usuario)

# Resúmen

Esta es una API RESTful desarrollada con NodeJS y ExpressJS que cuenta con una capa básica de frontend 
servida en espacio público del servidor.

Las funcionalidades principales son:

1. Autenticación: Registro de usuario e Inicio de sesión mediante PassportJS (Local Strategy)
2. CRUD de productos (Agregado, lectura, edición y eliminación).
3. Agregado de productos al carrito.
4. Generación de pedido (orden de compra).
5. Visualización de historial de ordenes generadas.
6. Envio de alertas de email a una casilla configurable con detalle de orden de
    compra generada (nodemailer/gmail).
7. La capa de persistencia de datos implementa un "DAOFactory" que permite cambiar de forma dinamica 
    entre varias persistencias configurables desde variables entorno.
   - Para producción:
     - mongoDB (local o mongo atlas)
     - firebase
   - Para desarrollo:
     - fileSystem
8. Canal de chat basado en websockets (próximamente)

# 1. Puesta en marcha

## A. Requisitos previos

  ![NodeJS](https://img.shields.io/badge/node.js-v18.10.0-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

  En caso de usar MongoDB en modo local en vez de Atlas:

  NPM 8.19.xx

  ![MongoDB](https://img.shields.io/badge/MongoDB-v6.0.2-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## B. Instalación del proyecto y dependencias

- En primera instancia es necesario clonar el repositorio

  ```
  git clone https://github.com/AVelazquez97/e-Commerce_Proyecto-Final-Backend.git
  ```
- Es importante destacar que la versión actual del proyecto se encuentra en la branch v3

- Luego de clonar el proyecto, es necesario abrir terminal o powershell ubicandose en el directorio del mismo
  para instalar todas las dependencias que están detalladas en el fichero package.json.
  
  Esto es posible ejecutando una de las siguientes ordenes:
  
  ```
  npm i | npm install
  ```

## C. Ejecución en localhost
  - En los ficheros `development.env` y `production.env` se encuentran la variables de entorno. 

    Estas deben ser configuradas con las credenciales necesarias para la correcta ejecución del servidor.
  
    **Una aclaración importante es que estos ficheros están visibles únicamente porque es necesario para el correcto monitoreo del proyecto.** 

    **En condiciones reales se ocultarían en el `.gitignore`**
  
  - Para gestionar los tipos de persistencia del DAOFactory se debe alternar la variable de entorno `PERSISTENCY` con los siguientes tres valores posibles:
    - 'mongoDB' (100% en funcionamiento)
    - 'fileSystem' (No utilizar - sin terminar)
    - 'firebase' (No utilizar - sin terminar)

  - El servidor Express puede ser ejecutado mediante diversos scripts disponibles:
    - Dispositivos UNIX:
      - `npm run development` modo desarrollo con las variables de entorno definidas en el archivo `development.env`.
      - `npm run production` modo producción con las variables de entorno definidas en el archivo `production.env`.
      - `npm run start` levanta el servidor por defecto en modo producción. Invoca a `npm run production`.
      - `npm run watch` con nodemon instalado.

    - Dispositivos Windows:
      - `npm run development:win` modo desarrollo con las variables de entorno definidas en el archivo `development.env`.
      - `npm run production:win` modo producción con las variables de entorno definidas en el archivo `production.env`.

  - Luego de poner en en marcha el proyecto, es posible acceder al frontend en la siguiente dirección:
    ```localhost:8080/```

# 2. Tecnologías y librerías utilizadas

  - NodeJS 18.7.xx
  - NPM 8.19.xx
  - Express 4.18.xx
  - Express-handlebars: 6.0.xx
  - Express-session: 1.17.xx
  - Express-validator: 6.14.xx
  - Mongoose: 6.7.xx
  - Firebase-admin: 11.2.xx
  - Connect-mongo: 4.6.0
  - Cookie-parser: 1.4.6
  - Bcrypt: 5.1.xx
  - Dotenv: 16.0.xx
  - Log4js: 6.7.xx
  - Minimist: 1.2.xx
  - Multer: 1.4.xx
  - Nodemailer: 6.8.xx
  - Passport: 0.6.xx
  - Passport-local: 1.0.xx
  - Twilio: 3.83.xx

# 3. AUTH Endpoints
 
  - **Post de registro de usuario:**
    ```localhost:8080/auth/signup```
  
  - **Post de inicio de sesión de usuario:**
    ```localhost:8080/auth/login```
  
  - **Post de cierre de sesión de usuario:**
    ```localhost:8080/auth/logout```

# 4. API Endpoints

## A. Productos:
  - **Get de todos los productos:** 
    ```localhost:8080/api/productos/listado```

  - **Get de producto por id:**
    ```localhost:8080/api/productos/listado/id```

  - **Get de filtrado de productos por query params:**
    ```localhost:8080/api/productos/busqueda?name=&code=&minPrice=&maxPrice=&minStock=&maxStock=```  
    \* Luego de cada símbolo de igualdad es necesario pasar el parámetro a filtrar. (Solo uno por ocasión, a excepción del filtrado por precio o por stock que necesitan el min y el max).

  - **Post de producto (solo para administradores):**
    ```localhost:8080/api/productos/```

  - **Put de producto (solo para administradores):**
    ```localhost:8080/api/productos/id```

  - **Delete de producto (solo para administradores):**
    ```localhost:8080/api/productos/id```

**\*Por el momento el modo admin es gestionado desde las variables de entorno con la clave ADMIN_MODE.**

**Este clave puede alternar entre dos valores: 'true' y 'false'** 

## B. Carritos:
  - **Post de creación de carrito vacío con id de cliente:** 
    ```localhost:8080/api/carrito/clientId```

  - **Delete de carrito por id de carrito del mismo:** 
    ```localhost:8080/api/carrito/id```

  - **Get de todos los productos en carrito por id de cliente:** 
    ```localhost:8080/api/carrito/clientId/productos```

  - **Post de producto con id en carrito por id del mismo:** 
    ```localhost:8080/api/carrito/id/productos/idProd```

  - **Delete de producto con id en carrito por id de cliente:** 
    ```localhost:8080/api/carrito/clientId/productos/id_prod```

## C. Ordenes:
  - **Get de todas las ordenes:** 
    ```localhost:8080/api/ordenes/```

  - **Get de orden por id:** 
    ```localhost:8080/api/ordenes/id```

  - **Post de creación de orden:** 
    ```localhost:8080/api/ordenes/id```

  - **Put de confirmación de orden (cambio de estado de la misma):** 
    ```localhost:8080/api/ordenes/id```

  - **Delete de orden por id:** 
    ```localhost:8080/api/ordenes/clientId/productos/id_prod```

## D. Usuario:
  - **Get de usuario que se encuentra actualmente autenticado:**
    ```localhost:8080/api/usuario```

## Importante:
  - Tanto los id de productos como los de carrito deben ser un número entero o generado por mongoDB o firebase

  - Todos los endpoints fueron testeados con rest client y hay ejemplos en la carpeta "restClientExamples"