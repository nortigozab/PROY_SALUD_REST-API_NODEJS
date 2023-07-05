Aquí está el texto corregido:

```markdown
# PROY_SALUD_REST-API

## Descripción
El proyecto consiste en un aplicativo web (REST API) para la gestión de pacientes, doctores y citas médicas. Permite capturar información a través de formularios, almacenarla en una base de datos (MySQL) y mostrarla en páginas web utilizando DOM.

## Objetivo
El objetivo es proporcionar una solución completa, eficiente y segura para la administración de datos médicos.

## Tecnologías utilizadas
- [Node](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com)
- [TypeScript](https://nodejs.dev/en/learn/nodejs-with-typescript/)

## Instalación y Ejecución de la Aplicación :zap:
1. Clona este repositorio ejecutando el siguiente comando:

   ```bash
   git clone https://github.com/nortigozab/PROY_SALUD_REST-API.git
   cd PROY_SALUD_REST-API
   ```

2. Instala las dependencias requeridas:

   ```bash
   npm install
   ```

3. Ejecuta el siguiente comando para iniciar el proyecto:

   ```bash
   npm run dev
   ```

**4.** **🎉 Abre tu navegador y prueba el resto de la API en esta URL `https://127.0.0.1:3000`**

Recuerda que debes crear el archivo .env para que la API funcione.
Asegúrate de que el archivo se llame **.env** y que contenga la siguiente estructura:

```bash
PORT=3000
HOST=127.0.0.1
DB_USER=USERNAME
DB_PWD=PASSWORD
DB_NAME=NAMEDATABASE
```

Además, este proyecto utiliza las siguientes dependencias:

- [TS-Nodemon](https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [EJS](https://www.npmjs.com/package/ejs)
- [Moment](https://www.npmjs.com/package/moment)

**Sigue los pasos de la presentación de pasos en el repositorio -**

## Línea de Tiempo

En esta versión se hace la prueba para doctores con un cliente local, utilizando la extensión Thunder Client en Visual Studio Code, donde estas peticiones son muy básicas.

| Descripción | Soporte |
|:------------|--------:|
| Se realiza una primera prueba utilizando la extensión Thunder Client en Visual Studio Code para peticiones básicas | ![Soporte 1](./img/1.gif?raw=true "import") |

En esta versión se hace una prueba para doctores de forma gráfica, donde se puede observar:
- Todos los doctores creados con información relevante.
- Edición de un doctor, donde se puede cambiar el nombre, apellido, correo electrónico, consultorio y disponibilidad.
- Creación de un nuevo doctor.
  - En esta creación se realizan dos consultas:
    - Especialidad: Lista todas las especialidades existentes en la base de datos.
    - Consultorio: Asigna un consultorio si está disponible.

| Descri

pción | Soporte |
|:------------|--------:|
| Se realiza una segunda prueba de forma gráfica | ![Soporte 2](./img/2.gif?raw=true "import") |

En esta versión se hace una prueba para pacientes de forma gráfica, donde se puede observar:
- Todos los pacientes creados con información relevante, como nombre, apellido y edad (calculada a partir de la fecha de nacimiento y la fecha actual).
- Edición de un paciente, donde se puede cambiar el nombre, apellido, cédula, fecha de nacimiento y teléfono.
- Creación de un nuevo paciente.

| Descripción | Soporte |
|:------------|--------:|
| Se realiza una tercera prueba de forma gráfica | ![Soporte 3](./img/3.gif?raw=true "import") |

En esta versión se hace una prueba para citas médicas de forma gráfica, donde se puede observar:
- Todas las citas médicas, donde las citas disponibles se muestran en verde y las ocupadas en rojo.
  - Las citas están disponibles si no tienen un paciente asignado.
- Se puede editar una cita médica, cambiando la cédula, especialidad, doctor de la especialidad y fecha.
- Se puede crear una cita médica, con o sin cédula. También se solicita la especialidad, el doctor y una fecha.
  - Si se proporciona una cédula válida de un paciente, la cita se crea como ocupada.
  - De lo contrario, la cita se crea como disponible.

| Descripción | Soporte |
|:------------|--------:|
| Se realiza una cuarta prueba de forma gráfica | ![Soporte 4](./img/4.mp4?raw=true "import") |
```

Espero que esto te sea útil. Si tienes alguna otra pregunta, ¡no dudes en preguntar!