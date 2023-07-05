-- Creacion de la base de datos

CREATE DATABASE salud;
use salud;
-- Tabla Especialidades
CREATE TABLE Especialidades (
  IdEspecialidad INT PRIMARY KEY AUTO_INCREMENT,
  NombreEspecialidad VARCHAR(50) NOT NULL
);
-- Tabla Pacientes
CREATE TABLE Pacientes (
  IdPaciente INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(50) NOT NULL,
  NumeroCedula VARCHAR(10) NOT NULL UNIQUE,
  Apellido VARCHAR(50) NOT NULL,
  FechaNacimiento DATE NOT NULL,
  Telefono VARCHAR(50) NOT NULL
);
-- Tabla Consultorios
CREATE TABLE Consultorios (
  IdConsultorio INT PRIMARY KEY AUTO_INCREMENT,
  Piso INT NOT NULL,
  NumeroConsultorio INT NOT NULL,
  Disponibilidad BOOLEAN NOT NULL DEFAULT TRUE
);

-- Tabla Doctores
CREATE TABLE Doctores (
  IdDoctor INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(50) NOT NULL,
  Apellido VARCHAR(50) NOT NULL,
  Especialidad INT NOT NULL,
  Consultorio INT,
  CorreoContacto VARCHAR(50) NOT NULL,
  FOREIGN KEY (Especialidad) REFERENCES Especialidades(IdEspecialidad) ON DELETE CASCADE,
  FOREIGN KEY (Consultorio) REFERENCES Consultorios(IdConsultorio) ON DELETE CASCADE
);
-- Tabla CitasMedicas
CREATE TABLE CitasMedicas (
  IdCita INT PRIMARY KEY AUTO_INCREMENT,
  IdDoctor INT NOT NULL,
  IdPaciente INT,
  Especialidad INT NOT NULL,
  Fecha DATE NOT NULL,
  Disponibilidad BOOLEAN NOT NULL,
  FOREIGN KEY (IdDoctor) REFERENCES Doctores(IdDoctor) ON DELETE CASCADE,
  FOREIGN KEY (IdPaciente) REFERENCES Pacientes(IdPaciente) ON DELETE CASCADE,
  FOREIGN KEY (Especialidad) REFERENCES Especialidades(IdEspecialidad) ON DELETE CASCADE
);

INSERT INTO Especialidades (NombreEspecialidad) VALUES
('Medicina general'),
('Cardiología'),
('Medicina interna'),
('Dermatología'),
('Rehabilitación física'),
('Psicología'),
('Odontología'),
('Radiología');

INSERT INTO Consultorios (Piso, NumeroConsultorio, Disponibilidad) VALUES
(1, 101, FALSE),
(1, 102, FALSE),
(1, 103, FALSE),
(1, 104, FALSE),
(1, 105, TRUE),
(1, 106, TRUE),
(1, 107, TRUE),
(1, 108, TRUE),
(2, 201, FALSE),
(2, 202, FALSE),
(2, 203, FALSE),
(2, 204, FALSE),
(2, 205, TRUE),
(2, 206, TRUE),
(2, 207, TRUE),
(2, 208, TRUE),
(3, 301, FALSE),
(3, 302, FALSE),
(3, 303, FALSE),
(3, 304, FALSE),
(3, 305, TRUE),
(3, 306, TRUE),
(3, 307, TRUE),
(3, 308, TRUE),
(4, 401, FALSE),
(4, 402, FALSE),
(4, 403, FALSE),
(4, 404, FALSE),
(4, 405, TRUE),
(4, 406, TRUE),
(4, 407, TRUE),
(4, 408, TRUE);




INSERT INTO Pacientes (Nombre, NumeroCedula, Apellido, FechaNacimiento, Telefono) VALUES
('Juan', '123456789', 'Pérez', '1990-01-15', '1234567890'),
('María', '987654321', 'Gómez', '1995-06-20', '9876543210'),
('Carlos', '456789123', 'López', '1980-09-10', '4567891230'),
('Laura', '789123456', 'Martínez', '1985-03-25', '7891234560'),
('Pedro', '654321987', 'Sánchez', '1970-12-03', '6543219870'),
('Ana', '321987654', 'Ramírez', '1993-07-08', '3219876540'),
('José', '896745231', 'Hernández', '1988-11-12', '8967452310'),
('Sofía', '234567891', 'Torres', '1979-04-18', '2345678910'),
('Luis', '678912345', 'García', '1984-08-30', '6789123450'),
('Isabel', '987123456', 'Rodríguez', '1992-02-05', '9871234560');


-- Doctores de Medicina General
INSERT INTO Doctores (Nombre, Apellido, Especialidad, Consultorio, CorreoContacto) VALUES
('Juan', 'López', 1, 1, 'julo1@example.com'),
('María', 'González', 1, 2, 'mago1@example.com');

-- Doctores de Cardiología
INSERT INTO Doctores (Nombre, Apellido, Especialidad, Consultorio, CorreoContacto) VALUES
('Pedro', 'Sánchez', 2, 3, 'pesa1@example.com'),
('Ana', 'Ramírez', 2, 4, 'anra1@example.com');

-- Doctores de Medicina Interna
INSERT INTO Doctores (Nombre, Apellido, Especialidad, Consultorio, CorreoContacto) VALUES
('Carlos', 'Martínez', 3, 9, 'cama1@example.com'),
('Laura', 'Hernández', 3, 10, 'laher1@example.com');

-- Doctores de Dermatología
INSERT INTO Doctores (Nombre, Apellido, Especialidad, Consultorio, CorreoContacto) VALUES
('Sofía', 'Torres', 4, 11, 'soto1@example.com'),
('Luis', 'García', 4, 12, 'luga1@example.com');

-- Doctores de Rehabilitación Física
INSERT INTO Doctores (Nombre, Apellido, Especialidad, Consultorio, CorreoContacto) VALUES
('Marcela', 'Pérez', 5, 17, 'mape1@example.com'),
('Andrés', 'Gómez', 5, 18, 'ango1@example.com');

-- Doctores de Psicología
INSERT INTO Doctores (Nombre, Apellido, Especialidad, Consultorio, CorreoContacto) VALUES
('Valeria', 'Navarro', 6, 19, 'vane1@example.com'),
('Hugo', 'Fernández', 6, 20, 'hufer1@example.com');

-- Doctores de Odontología
INSERT INTO Doctores (Nombre, Apellido, Especialidad, Consultorio, CorreoContacto) VALUES
('Isabella', 'Luna', 7, 25, 'islu1@example.com'),
('Emilio', 'Rojas', 7, 26, 'emro1@example.com');

-- Doctores de Radiología
INSERT INTO Doctores (Nombre, Apellido, Especialidad, Consultorio, CorreoContacto) VALUES
('Camila', 'Silva', 8, 27, 'casi1@example.com'),
('Alejandro', 'Mendoza', 8, 28, 'alem1@example.com');


-- Citas médicas disponibles
INSERT INTO CitasMedicas (IdDoctor, Especialidad, Fecha, Disponibilidad)
VALUES (1, 1, '2023-07-01', true),
       (2, 1, '2023-07-02', true),
       (3, 2, '2023-07-03', true),
       (4, 2, '2023-07-04', true),
       (5, 3, '2023-07-05', true),
       (6, 3, '2023-07-06', true),
       (7, 4, '2023-07-07', true),
       (8, 4, '2023-07-08', true),
       (9, 5, '2023-07-09', true),
       (10, 5, '2023-07-10', true);

-- Citas médicas no disponibles
INSERT INTO CitasMedicas (IdDoctor, IdPaciente, Especialidad, Fecha, Disponibilidad)
VALUES (11, 1, 1, '2023-07-11', true),
       (11, 1, 6, '2023-07-11', false),
       (12, 2, 6, '2023-07-12', false),
       (13, 3, 7, '2023-07-13', false),
       (14, 4, 7, '2023-07-14', false),
       (15, 5, 8, '2023-07-15', false),
       (16, 6, 8, '2023-07-16', false);
