-- Creacion de la base de datos

CREATE DATABASE salud;

use salud;

-- Creacion de la funcion para UUID: para generar id mas seguros

DELIMITER //

CREATE FUNCTION UUID_TO_BIN(UUID CHAR(36)) RETURNS 
BINARY(16) DETERMINISTIC BEGIN 
	DECLARE hex CHAR(32);
	SET hex = REPLACE(uuid, '-', '');
	RETURN UNHEX(hex);
; 

END // 

DELIMITER ;

-- Tabla Especialidades

CREATE TABLE
    Especialidades (
        IdEspecialidad INT PRIMARY KEY AUTO_INCREMENT,
        NombreEspecialidad VARCHAR(50) NOT NULL
    );

-- Tabla Pacientes

CREATE TABLE
    Pacientes (
        IdPaciente VARCHAR(32) PRIMARY KEY,
        Nombre VARCHAR(50) NOT NULL,
        NumeroCedula VARCHAR(10) NOT NULL UNIQUE,
        Apellido VARCHAR(50) NOT NULL,
        FechaNacimiento DATE NOT NULL,
        Telefono VARCHAR(50) NOT NULL
    );

-- Tabla Consultorios

CREATE TABLE
    Consultorios (
        IdConsultorio INT PRIMARY KEY AUTO_INCREMENT,
        Piso INT NOT NULL,
        NumeroConsultorio INT NOT NULL,
        Disponibilidad BOOLEAN NOT NULL DEFAULT TRUE
    );

-- Tabla Doctores

CREATE TABLE
    Doctores (
        IdDoctor VARCHAR(32) PRIMARY KEY,
        Nombre VARCHAR(50) NOT NULL,
        Apellido VARCHAR(50) NOT NULL,
        Especialidad INT NOT NULL,
        Consultorio INT,
        CorreoContacto VARCHAR(50) NOT NULL,
        FOREIGN KEY (Especialidad) REFERENCES Especialidades(IdEspecialidad) ON DELETE CASCADE,
        FOREIGN KEY (Consultorio) REFERENCES Consultorios(IdConsultorio) ON DELETE CASCADE
    );

-- Tabla CitasMedicas

CREATE TABLE
    CitasMedicas (
        IdCita INT PRIMARY KEY AUTO_INCREMENT,
        IdDoctor VARCHAR(32) NOT NULL,
        IdPaciente VARCHAR(32),
        Especialidad INT NOT NULL,
        Fecha DATE NOT NULL,
        Disponibilidad BOOLEAN NOT NULL,
        FOREIGN KEY (IdDoctor) REFERENCES Doctores(IdDoctor) ON DELETE CASCADE,
        FOREIGN KEY (IdPaciente) REFERENCES Pacientes(IdPaciente) ON DELETE CASCADE,
        FOREIGN KEY (Especialidad) REFERENCES Especialidades(IdEspecialidad) ON DELETE CASCADE
    );

INSERT INTO
    Especialidades (NombreEspecialidad)
VALUES ('Medicina general'), ('Cardiología'), ('Medicina interna'), ('Dermatología'), ('Rehabilitación física'), ('Psicología'), ('Odontología'), ('Radiología');

INSERT INTO
    Consultorios (
        Piso,
        NumeroConsultorio,
        Disponibilidad
    )
VALUES (1, 101, FALSE), (1, 102, FALSE), (1, 103, FALSE), (1, 104, FALSE), (1, 105, TRUE), (1, 106, TRUE), (1, 107, TRUE), (1, 108, TRUE), (2, 201, FALSE), (2, 202, FALSE), (2, 203, FALSE), (2, 204, FALSE), (2, 205, TRUE), (2, 206, TRUE), (2, 207, TRUE), (2, 208, TRUE), (3, 301, FALSE), (3, 302, FALSE), (3, 303, FALSE), (3, 304, FALSE), (3, 305, TRUE), (3, 306, TRUE), (3, 307, TRUE), (3, 308, TRUE), (4, 401, FALSE), (4, 402, FALSE), (4, 403, FALSE), (4, 404, FALSE), (4, 405, TRUE), (4, 406, TRUE), (4, 407, TRUE), (4, 408, TRUE);

INSERT INTO
    Pacientes (
        IdPaciente,
        Nombre,
        NumeroCedula,
        Apellido,
        FechaNacimiento,
        Telefono
    )
VALUES (
        'fd1e15191dac11ee9b0de8d0fcadc281',
        'Juan',
        '123456789',
        'Pérez',
        '1990-01-15',
        '1234567890'
    ), (
        'fd1e1a251dac11ee9b0de8d0fcadc281',
        'María',
        '987654321',
        'Gómez',
        '1995-06-20',
        '9876543210'
    ), (
        'fd1e1b0d1dac11ee9b0de8d0fcadc281',
        'Carlos',
        '456789123',
        'López',
        '1980-09-10',
        '4567891230'
    ), (
        'fd1e1b921dac11ee9b0de8d0fcadc281',
        'Laura',
        '789123456',
        'Martínez',
        '1985-03-25',
        '7891234560'
    ), (
        'fd1e1bf91dac11ee9b0de8d0fcadc281',
        'Pedro',
        '654321987',
        'Sánchez',
        '1970-12-03',
        '6543219870'
    ), (
        'fd1e1c5d1dac11ee9b0de8d0fcadc281',
        'Ana',
        '321987654',
        'Ramírez',
        '1993-07-08',
        '3219876540'
    ), (
        'fd1e1cb51dac11ee9b0de8d0fcadc281',
        'José',
        '896745231',
        'Hernández',
        '1988-11-12',
        '8967452310'
    ), (
        'fd1e1d211dac11ee9b0de8d0fcadc281',
        'Sofía',
        '234567891',
        'Torres',
        '1979-04-18',
        '2345678910'
    ), (
        'fd1e1daf1dac11ee9b0de8d0fcadc281',
        'Luis',
        '678912345',
        'García',
        '1984-08-30',
        '6789123450'
    ), (
        'fd1e1e311dac11ee9b0de8d0fcadc281',
        'Isabel',
        '987123456',
        'Rodríguez',
        '1992-02-05',
        '9871234560'
    );

-- Doctores de Medicina General

INSERT INTO
    Doctores (
        IdDoctor,
        Nombre,
        Apellido,
        Especialidad,
        Consultorio,
        CorreoContacto
    )
VALUES (
        'fd1ea36d1dac11ee9b0de8d0fcadc281',
        'Juan',
        'López',
        1,
        1,
        'julo1@example.com'
    ), (
        'fd1ea6891dac11ee9b0de8d0fcadc281',
        'María',
        'González',
        1,
        2,
        'mago1@example.com'
    );

-- Doctores de Cardiología

INSERT INTO
    Doctores (
        IdDoctor,
        Nombre,
        Apellido,
        Especialidad,
        Consultorio,
        CorreoContacto
    )
VALUES (
        'fd1f192e1dac11ee9b0de8d0fcadc281',
        'Pedro',
        'Sánchez',
        2,
        3,
        'pesa1@example.com'
    ), (
        'fd1f1cc21dac11ee9b0de8d0fcadc281',
        'Ana',
        'Ramírez',
        2,
        4,
        'anra1@example.com'
    );

-- Doctores de Medicina Interna

INSERT INTO
    Doctores (
        IdDoctor,
        Nombre,
        Apellido,
        Especialidad,
        Consultorio,
        CorreoContacto
    )
VALUES (
        'fd1f91171dac11ee9b0de8d0fcadc281',
        'Carlos',
        'Martínez',
        3,
        9,
        'cama1@example.com'
    ), (
        'fd1f947a1dac11ee9b0de8d0fcadc281',
        'Laura',
        'Hernández',
        3,
        10,
        'laher1@example.com'
    );

-- Doctores de Dermatología

INSERT INTO
    Doctores (
        IdDoctor,
        Nombre,
        Apellido,
        Especialidad,
        Consultorio,
        CorreoContacto
    )
VALUES (
        'fd20338c1dac11ee9b0de8d0fcadc281',
        'Sofía',
        'Torres',
        4,
        11,
        'soto1@example.com'
    ), (
        'fd2036b61dac11ee9b0de8d0fcadc281',
        'Luis',
        'García',
        4,
        12,
        'luga1@example.com'
    );

-- Doctores de Rehabilitación Física

INSERT INTO
    Doctores (
        IdDoctor,
        Nombre,
        Apellido,
        Especialidad,
        Consultorio,
        CorreoContacto
    )
VALUES (
        'fd20c4371dac11ee9b0de8d0fcadc281',
        'Marcela',
        'Pérez',
        5,
        17,
        'mape1@example.com'
    ), (
        'fd20c81f1dac11ee9b0de8d0fcadc281',
        'Andrés',
        'Gómez',
        5,
        18,
        'ango1@example.com'
    );

-- Doctores de Psicología

INSERT INTO
    Doctores (
        IdDoctor,
        Nombre,
        Apellido,
        Especialidad,
        Consultorio,
        CorreoContacto
    )
VALUES (
        'fd216a041dac11ee9b0de8d0fcadc281',
        'Valeria',
        'Navarro',
        6,
        19,
        'vane1@example.com'
    ), (
        'fd216e991dac11ee9b0de8d0fcadc281',
        'Hugo',
        'Fernández',
        6,
        20,
        'hufer1@example.com'
    );

-- Doctores de Odontología

INSERT INTO
    Doctores (
        IdDoctor,
        Nombre,
        Apellido,
        Especialidad,
        Consultorio,
        CorreoContacto
    )
VALUES (
        'fd2208221dac11ee9b0de8d0fcadc281',
        'Isabella',
        'Luna',
        7,
        25,
        'islu1@example.com'
    ), (
        'fd220c0c1dac11ee9b0de8d0fcadc281',
        'Emilio',
        'Rojas',
        7,
        26,
        'emro1@example.com'
    );

-- Doctores de Radiología

INSERT INTO
    Doctores (
        IdDoctor,
        Nombre,
        Apellido,
        Especialidad,
        Consultorio,
        CorreoContacto
    )
VALUES (
        'fd227e1b1dac11ee9b0de8d0fcadc281',
        'Camila',
        'Silva',
        8,
        27,
        'casi1@example.com'
    ), (
        'fd2281661dac11ee9b0de8d0fcadc281',
        'Alejandro',
        'Mendoza',
        8,
        28,
        'alem1@example.com'
    );

-- Citas médicas disponibles

INSERT INTO
    CitasMedicas (
        IdDoctor,
        Especialidad,
        Fecha,
        Disponibilidad
    )
VALUES (
        'fd1ea36d1dac11ee9b0de8d0fcadc281',
        1,
        '2023-07-01',
        true
    ), (
        'fd1ea6891dac11ee9b0de8d0fcadc281',
        1,
        '2023-07-02',
        true
    ), (
        'fd1f192e1dac11ee9b0de8d0fcadc281',
        2,
        '2023-07-03',
        true
    ), (
        'fd1f1cc21dac11ee9b0de8d0fcadc281',
        2,
        '2023-07-04',
        true
    ), (
        'fd1f91171dac11ee9b0de8d0fcadc281',
        3,
        '2023-07-05',
        true
    ), (
        'fd1f947a1dac11ee9b0de8d0fcadc281',
        3,
        '2023-07-06',
        true
    ), (
        'fd20338c1dac11ee9b0de8d0fcadc281',
        4,
        '2023-07-07',
        true
    ), (
        'fd2036b61dac11ee9b0de8d0fcadc281',
        4,
        '2023-07-08',
        true
    ), (
        'fd20c4371dac11ee9b0de8d0fcadc281',
        5,
        '2023-07-09',
        true
    ), (
        'fd20c81f1dac11ee9b0de8d0fcadc281',
        5,
        '2023-07-10',
        true
    );

-- Citas médicas no disponibles

INSERT INTO
    CitasMedicas (
        IdDoctor,
        IdPaciente,
        Especialidad,
        Fecha,
        Disponibilidad
    )
VALUES (
        'fd216a041dac11ee9b0de8d0fcadc281',
        'fd1e15191dac11ee9b0de8d0fcadc281',
        1,
        '2023-07-11',
        false
    ), (
        'fd216e991dac11ee9b0de8d0fcadc281',
        'fd1e1a251dac11ee9b0de8d0fcadc281',
        6,
        '2023-07-12',
        false
    ), (
        'fd2208221dac11ee9b0de8d0fcadc281',
        'fd1e1b0d1dac11ee9b0de8d0fcadc281',
        7,
        '2023-07-13',
        false
    ), (
        'fd220c0c1dac11ee9b0de8d0fcadc281',
        'fd1e1b921dac11ee9b0de8d0fcadc281',
        7,
        '2023-07-14',
        false
    ), (
        'fd227e1b1dac11ee9b0de8d0fcadc281',
        'fd1e1bf91dac11ee9b0de8d0fcadc281',
        8,
        '2023-07-15',
        false
    ), (
        'fd2281661dac11ee9b0de8d0fcadc281',
        'fd1e1c5d1dac11ee9b0de8d0fcadc281',
        8,
        '2023-07-16',
        false
    );