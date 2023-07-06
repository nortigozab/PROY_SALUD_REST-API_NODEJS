<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

# PROY_SALUD_REST-API

## Descripción

El proyecto consiste en un aplicativo web (REST API) para la gestión de pacientes, doctores y citas médicas. Permite capturar información a través de formularios, almacenarla en una base de datos (MySQL) y mostrarla en páginas web utilizando DOM.

## Objetivo

El objetivo es proporcionar una solución completa, eficiente y segura para la administración de datos médicos.

## Tecnologías utilizadas

- [Node](https://nodejs.org/en) <i class="fab fa-node"></i> :green_circle:
- [Express](https://expressjs.com/) <i class="fab fa-node-js"></i> :arrows_counterclockwise:
- [MySQL](https://www.mysql.com) <i class="fas fa-database"></i> :floppy_disk:
- [Typescript](https://nodejs.dev/en/learn/nodejs-with-typescript/) <i class="fab fa-js"></i> :blue_book:

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

3. Ejecuta el comando npm para iniciar el proyecto:

   ```bash
   npm run dev
   ```

   **4.** **🎉 Open your browser and test the rest of the API at this URL `https://127.0.0.1:3000`**

:key:Recuerda que se debe crear el archivo .env para que la API funcione.

- Asegurese que debe tener el nombre **.env**
- Ingresar los datos segun esta estructura

```bash
PORT=3000
HOST=127.0.0.1
DB_USER=USERNAME
DB_PWD=PASSWORD
DB_NAME=NAMEDATABASE
```

#### Además, este proyecto utiliza:

- [TS-Nodemon](https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change) <i class="fas fa-sync"></i> :arrows_counterclockwise:
- [Bootstrap](https://getbootstrap.com/) <i class="fab fa-bootstrap"></i> :blue_book:
- [body-parser](https://www.npmjs.com/package/body-parser) <i class="fas fa-server"></i> :computer:
- [Dotenv](https://www.npmjs.com/package/dotenv) <i class="fas fa-cog"></i> :gear:
- [MySQL2](https://www.npmjs.com/package/mysql2) <i class="fas fa-database"></i> :floppy_disk:
- [EJS](https://www.npmjs.com/package/ejs) <i class="far fa-file-code"></i> :card_index:
- [Moment](https://www.npmjs.com/package/moment) <i class="far fa-clock"></i> :clock1:

**Sigue los pasos de la presentación de pasos en el repositorio -**

## Entorno de desarrollo

La aplicación se desarrolló y probó en el siguiente entorno:

- Sistema operativo: <i class="fab fa-linux"></i> Linux (derivado de Arch Linux, EndeavourOS) :penguin:
- Herramienta de desarrollo: <i class="fas fa-code"></i> VS Code :computer:
- Base de datos: <i class="fas fa-database"></i> DBeaver :floppy_disk:
- Navegador web: <i class="fab fa-chrome"></i> Google Chrome :globe_with_meridians:

Aquí tienes la tabla en formato Markdown con los datos proporcionados:

## Base de Datos SQL

![database](./img/database.png?raw=true "import")

| Tabla              | Descripción                                                                                                                                                                                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Especialidades** | Almacena las especialidades médicas disponibles en el sistema. Cada especialidad tiene un identificador único (IdEspecialidad) y un nombre (NombreEspecialidad).                                                                                                                           |
| **Pacientes**      | Guarda la información de los pacientes. Cada paciente tiene un identificador único (IdPaciente), nombre, número de cédula, apellido, fecha de nacimiento y número de teléfono.                                                                                                             |
| **Consultorios**   | Contiene los consultorios disponibles para las citas médicas. Cada consultorio tiene un identificador único (IdConsultorio), piso, número de consultorio y disponibilidad.                                                                                                                 |
| **Doctores**       | Almacena los datos de los doctores que atienden las citas médicas. Cada doctor tiene un identificador único (IdDoctor), nombre, apellido, especialidad, consultorio asignado y correo de contacto. La especialidad se relaciona con la tabla de Especialidades mediante una clave foránea. |
| **CitasMedicas**   | Registra las citas médicas programadas. Cada cita tiene un identificador único (IdCita), doctor asignado, paciente, especialidad, fecha y disponibilidad. Tanto el doctor, el paciente y la especialidad se relacionan con sus respectivas tablas mediante claves foráneas.                |

## Linea de Tiempo

En la mayoria de los formularios tanto en la creación y actualización se tienen expresiones regulares

### Prueba #1

En esta versión se hace la prueba para doctores con un cliente local, utilizando la extensión Thunder Client en Visual Studio Code, donde estas peticiones son muy básicas.

| Descripcion                                                                                                        |                   Soporte                   |
| :----------------------------------------------------------------------------------------------------------------- | :-----------------------------------------: |
| Se hace una primera prueba, con una extensión de vscode llamada thunder Client que hace una ejecucion tipo postman | ![Soporte 1](./img/1.gif?raw=true "import") |

### Prueba #2

En esta versión se hace una prueba para doctores de forma gráfica, donde se puede observar:

- Todos los doctores creados con información relevante.
- Edición de un doctor, donde se puede cambiar el nombre, apellido, correo electrónico, consultorio y disponibilidad.
- Creación de un nuevo doctor.
- En esta creación se realizan dos consultas:
  - Especialidad: Lista todas las especialidades existentes en la base de datos.
  - Consultorio: Asigna un consultorio si está disponible.

| Descripcion                                     |                   Soporte                   |
| :---------------------------------------------- | :-----------------------------------------: |
| Se hace una segunda prueba, ya de forma grafica | ![Soporte 2](./img/2.gif?raw=true "import") |

### Prueba #3

En esta versión se hace una prueba para pacientes de forma gráfica, donde se puede observar:

- Todos los pacientes creados con información relevante, como nombre, apellido y edad (calculada a partir de la fecha de nacimiento y la fecha actual).
- Edición de un paciente, donde se puede cambiar el nombre, apellido, cédula, fecha de nacimiento y teléfono.
- Creación de un nuevo paciente.

| Descripcion                                     |                   Soporte                   |
| :---------------------------------------------- | :-----------------------------------------: |
| Se hace una tercera prueba, ya de forma grafica | ![Soporte 3](./img/3.gif?raw=true "import") |

### Prueba #4

En esta versión se hace una prueba para citas médicas de forma gráfica, donde se puede observar:

- Todas las citas médicas, donde las citas disponibles se muestran en verde y las ocupadas en rojo.
- Las citas están disponibles si no tienen un paciente asignado.
  - Se puede editar una cita médica, cambiando la cédula, especialidad, doctor de la especialidad y fecha.
- Se puede crear una cita médica, con o sin cédula. También se solicita la especialidad, el doctor y una fecha.
  - Si se proporciona una cédula válida de un paciente, la cita se crea como ocupada.
  - De lo contrario, la cita se crea como disponible.

| Descripcion                                    |                   Soporte                   |
| :--------------------------------------------- | :-----------------------------------------: |
| Se hace una cuarta prueba, ya de forma grafica | ![Soporte 4](./img/4.gif?raw=true "import") |
