--Select  de citas Medicas

-- Consulta para buscar una cita en especifico por su id
SELECT cm.IdCita, d.IdDoctor, d.Nombre as NombreDoc, d.Apellido as ApellidoDoc, e.IdEspecialidad, e.NombreEspecialidad, c.IdConsultorio, c.Piso, c.NumeroConsultorio, c.Disponibilidad, d.CorreoContacto, p.IdPaciente, p.Nombre as NombrePac, p.Apellido as ApellidoPac, p.NumeroCedula, p.FechaNacimiento, p.Telefono, e.IdEspecialidad, e.NombreEspecialidad, cm.Fecha, cm.Disponibilidad
      FROM CitasMedicas cm
      JOIN Doctores d ON cm.IdDoctor = d.IdDoctor
      JOIN Especialidades e ON e.IdEspecialidad = cm.Especialidad AND e.IdEspecialidad = d.Especialidad
      JOIN Consultorios c ON c.IdConsultorio = d.Consultorio
      LEFT JOIN Pacientes p ON cm.IdPaciente = p.IdPaciente WHERE cm.IdCita=?

-- Consulta para buscar las citas médicas de una especialidad específica por su IdEspecialidad

SELECT cm.IdCita, d.IdDoctor, d.Nombre as NombreDoc, d.Apellido as ApellidoDoc, e.IdEspecialidad, e.NombreEspecialidad, c.IdConsultorio, c.Piso, c.NumeroConsultorio, c.Disponibilidad, d.CorreoContacto, p.IdPaciente, p.Nombre as NombrePac, p.Apellido as ApellidoPac, p.NumeroCedula, p.FechaNacimiento, p.Telefono, e.IdEspecialidad, e.NombreEspecialidad, cm.Fecha, cm.Disponibilidad
FROM CitasMedicas cm
JOIN Doctores d ON cm.IdDoctor = d.IdDoctor
JOIN Especialidades e ON e.IdEspecialidad = cm.Especialidad AND e.IdEspecialidad = d.Especialidad
JOIN Consultorios c ON c.IdConsultorio = d.Consultorio
LEFT JOIN Pacientes p ON cm.IdPaciente = p.IdPaciente WHERE e.IdEspecialidad=?


-- Consulta para obtener todas las citas médicas ordenadas por disponibilidad (en orden descendente) y por IdCita (en orden ascendente)

SELECT cm.IdCita, d.IdDoctor, d.Nombre as NombreDoc, d.Apellido as ApellidoDoc, e.IdEspecialidad, e.NombreEspecialidad, c.IdConsultorio, c.Piso, c.NumeroConsultorio, c.Disponibilidad, d.CorreoContacto, p.IdPaciente, p.Nombre as NombrePac, p.Apellido as ApellidoPac, p.NumeroCedula, p.FechaNacimiento, p.Telefono, e.IdEspecialidad, e.NombreEspecialidad, cm.Fecha, cm.Disponibilidad
FROM CitasMedicas cm
JOIN Doctores d ON cm.IdDoctor = d.IdDoctor
JOIN Especialidades e ON e.IdEspecialidad = cm.Especialidad AND e.IdEspecialidad = d.Especialidad
JOIN Consultorios c ON c.IdConsultorio = d.Consultorio
LEFT JOIN Pacientes p ON cm.IdPaciente = p.IdPaciente order by cm.Disponibilidad desc,cm.IdCita ASC

--Select  de consultorio

-- Consulta para obtener información de un consultorio específico por su IdConsultorio

SELECT IdConsultorio, Piso, NumeroConsultorio, Disponibilidad FROM Consultorios WHERE IdConsultorio=?

-- Consulta para obtener información de todos los consultorios disponibles en la tabla Consultorios

SELECT IdConsultorio, Piso, NumeroConsultorio, Disponibilidad FROM Consultorios;

-- Consulta para obtener información de los consultorios disponibles (con Disponibilidad = TRUE)

SELECT IdConsultorio, Piso, NumeroConsultorio, Disponibilidad FROM salud.Consultorios WHERE Disponibilidad = TRUE;

--Select  de Doctores

-- Consulta para obtener información de los doctores, consultorios y especialidades relacionados en base a una especialidad específica, ordenados por el IdDoctor en orden ascendente

SELECT D.IdDoctor, D.Nombre, D.Apellido, E.IdEspecialidad, E.NombreEspecialidad, C.IdConsultorio, C.Piso, C.NumeroConsultorio, C.Disponibilidad, D.CorreoContacto
FROM Doctores D
JOIN Consultorios C ON D.Consultorio = C.IdConsultorio
JOIN Especialidades E ON D.Especialidad = E.IdEspecialidad
WHERE Especialidad = ?
ORDER BY D.IdDoctor ASC;


-- Consulta para obtener información de un doctor específico por su IdDoctor

SELECT D.IdDoctor, D.Nombre, D.Apellido, E.IdEspecialidad, E.NombreEspecialidad, C.IdConsultorio, C.Piso, C.NumeroConsultorio, C.Disponibilidad, D.CorreoContacto
FROM Doctores D
JOIN Consultorios C ON D.Consultorio = C.IdConsultorio
JOIN Especialidades E ON D.Especialidad = E.IdEspecialidad
WHERE D.IdDoctor = ?;

-- Consulta para obtener información de todos los doctores, consultorios y especialidades relacionados, ordenados por el IdDoctor en orden ascendente

SELECT D.IdDoctor, D.Nombre, D.Apellido, E.IdEspecialidad, E.NombreEspecialidad, C.IdConsultorio, C.Piso, C.NumeroConsultorio, C.Disponibilidad, D.CorreoContacto
FROM Doctores D
JOIN Consultorios C ON D.Consultorio = C.IdConsultorio
JOIN Especialidades E ON D.Especialidad = E.IdEspecialidad
ORDER BY D.IdDoctor ASC;


--Select  de Especialidades

-- Consulta para obtener información de una especialidad específica por su IdEspecialidad

SELECT * FROM Especialidades WHERE IdEspecialidad = ?;

-- Consulta para obtener información de todas las especialidades en la tabla Especialidades

SELECT * FROM Especialidades;

--Select  de Pacientes 

-- Consulta para obtener información de un paciente específico por su IdPaciente

SELECT * FROM Pacientes WHERE IdPaciente = ?;

-- Consulta para obtener información de un paciente específico por su NumeroCedula

SELECT * FROM Pacientes WHERE NumeroCedula = ?;

-- Consulta para obtener información de todos los pacientes en la tabla Pacientes, ordenados por el IdPaciente en orden ascendente

SELECT * FROM Pacientes ORDER BY IdPaciente ASC;


