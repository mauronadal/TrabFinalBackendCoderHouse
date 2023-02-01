# Proyecto backend e-commerce CoderHouse

Autor: Nadal Mauro
Comisión: 32065 y 32085 
Link del Proyecto: https://backend-mauronadal.onrender.com/


# Resúmen

API RESTful desarrollada con NodeJS y ExpressJS con frontend basico para poder probar la funcionalidad.


Las caracteristicas principales son:

1. Autenticación: Registro de usuario e Inicio de sesión mediante PassportJS
2. CRUD de productos (Agregado, lectura, edición y eliminación).
3. Agregado de productos al carrito.
4. Generación de pedido (orden de compra).
5. Visualización de historial de ordenes generadas.
6. Envio de alertas de email a una casilla configurable con detalle de orden de
    compra generada (nodemailer/gmail).
7. La capa de persistencia de datos implementa un "DAOFactory" para cambiar desde variables de entorno de forma dinamica: 
    
     - Producción:
     - mongoDB (local o mongo atlas)
     - Para desarrollo:
     - fileSystem


##  Ejecución en localhost
  - En los ficheros `development.env` y `production.env` se encuentran la variables de entorno. 

    Estas deben ser configuradas con las credenciales necesarias para la correcta ejecución del servidor.
  
    **Importante los ficheros están visibles porque es necesario para el correcto monitoreo del proyecto.** 

    **En condiciones reales se ocultarían en el `.gitignore`**
  
    - El servidor Express puede ser ejecutado mediante diversos scripts disponibles:
    - Dispositivos UNIX:
      - `npm run development` modo desarrollo con las variables de entorno definidas en el archivo `development.env`.
      - `npm run production` modo producción con las variables de entorno definidas en el archivo `production.env`.
      - `npm run start` servidor por defecto en modo producción.
      - `npm run watch` con nodemon instalado.

    
  - Acceder al frontend:
    ```localhost:8080/```

# Tecnologías y librerías utilizadas

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

