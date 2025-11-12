-- PRUEBA 
drop database aeropuerto_db;
create database aeropuerto_db;

use aeropuerto_db;

select * from vuelo;
select * from pasajero;

INSERT INTO vuelo (codigo_vuelo, origen, destino, fecha_salida, hora_salida, precio, estado)
VALUES 
('AV101', 'Lima', 'Cusco', '2025-11-10', '08:30:00', 320.50, 'Activo'),
('AV102', 'Cusco', 'Arequipa', '2025-11-11', '10:15:00', 280.00, 'Activo'),
('AV103', 'Lima', 'Piura', '2025-11-12', '14:45:00', 350.75, 'Activo'),
('AV104', 'Arequipa', 'Lima', '2025-11-13', '09:20:00', 310.60, 'Activo'),
('AV105', 'Trujillo', 'Lima', '2025-11-14', '07:10:00', 295.40, 'Activo'),
('AV106', 'Lima', 'Iquitos', '2025-11-15', '16:50:00', 420.90, 'Activo'),
('AV107', 'Chiclayo', 'Cusco', '2025-11-16', '11:00:00', 385.20, 'Activo'),
('AV108', 'Lima', 'Tacna', '2025-11-17', '13:25:00', 340.00, 'Activo'),
('AV109', 'Cusco', 'Lima', '2025-11-18', '18:10:00', 330.50, 'Activo'),
('AV110', 'Lima', 'Pucallpa', '2025-11-19', '06:40:00', 310.30, 'Activo');

INSERT INTO vuelo (codigo_vuelo, origen, destino, fecha_salida, hora_salida, precio, estado)
VALUES 
('AV111', 'Iquitos', 'Lima', '2025-11-20', '09:00:00', 410.80, 'Activo'),
('AV112', 'Piura', 'Lima', '2025-11-21', '12:30:00', 305.60, 'Activo'),
('AV113', 'Tacna', 'Arequipa', '2025-11-22', '07:45:00', 250.50, 'Activo'),
('AV114', 'Lima', 'Chiclayo', '2025-11-23', '15:10:00', 290.70, 'Activo'),
('AV115', 'Cusco', 'Trujillo', '2025-11-24', '10:00:00', 370.90, 'Activo'),
('AV116', 'Arequipa', 'Cusco', '2025-11-25', '11:25:00', 285.40, 'Activo'),
('AV117', 'Lima', 'Arequipa', '2025-11-26', '08:50:00', 315.30, 'Activo'),
('AV118', 'Pucallpa', 'Lima', '2025-11-27', '06:20:00', 300.00, 'Activo'),
('AV119', 'Trujillo', 'Cusco', '2025-11-28', '14:15:00', 360.60, 'Activo'),
('AV120', 'Lima', 'Trujillo', '2025-11-29', '09:40:00', 295.50, 'Activo'),
('AV121', 'Arequipa', 'Pucallpa', '2025-11-30', '16:30:00', 410.20, 'Activo'),
('AV122', 'Cusco', 'Tacna', '2025-12-01', '07:55:00', 345.80, 'Activo'),
('AV123', 'Piura', 'Arequipa', '2025-12-02', '13:35:00', 390.00, 'Activo'),
('AV124', 'Chiclayo', 'Lima', '2025-12-03', '10:10:00', 310.40, 'Activo'),
('AV125', 'Lima', 'Ica', '2025-12-04', '06:45:00', 260.50, 'Activo'),
('AV126', 'Ica', 'Lima', '2025-12-05', '17:20:00', 255.30, 'Activo'),
('AV127', 'Cusco', 'Pucallpa', '2025-12-06', '09:30:00', 375.60, 'Activo'),
('AV128', 'Arequipa', 'Chiclayo', '2025-12-07', '14:00:00', 400.10, 'Activo'),
('AV129', 'Trujillo', 'Arequipa', '2025-12-08', '08:10:00', 320.70, 'Activo'),
('AV130', 'Lima', 'Cusco', '2025-12-09', '12:00:00', 330.90, 'Activo');

-- Vuelos pasados
INSERT INTO vuelo (codigo_vuelo, origen, destino, fecha_salida, hora_salida, precio, estado)
VALUES
('AV201', 'Lima', 'Cusco', '2024-01-15', '08:30:00', 320.50, 'Completado'),
('AV204', 'Arequipa', 'Lima', '2024-02-03', '09:20:00', 310.60, 'Completado'),
('AV206', 'Lima', 'Iquitos', '2024-02-28', '16:50:00', 420.90, 'Completado'),
('AV208', 'Lima', 'Tacna', '2024-03-14', '13:25:00', 340.00, 'Completado'),
('AV210', 'Lima', 'Pucallpa', '2024-03-29', '06:40:00', 310.30, 'Completado'),
('AV212', 'Piura', 'Lima', '2024-04-09', '12:30:00', 305.60, 'Completado'),
('AV214', 'Lima', 'Chiclayo', '2024-04-26', '15:10:00', 290.70, 'Completado'),
('AV215', 'Cusco', 'Trujillo', '2024-05-05', '10:00:00', 370.90, 'Completado'),
('AV217', 'Lima', 'Arequipa', '2024-05-20', '08:50:00', 315.30, 'Completado'),
('AV219', 'Trujillo', 'Cusco', '2024-06-02', '14:15:00', 360.60, 'Completado'),
('AV221', 'Arequipa', 'Pucallpa', '2024-06-17', '16:30:00', 410.20, 'Completado'),
('AV223', 'Piura', 'Arequipa', '2024-07-08', '13:35:00', 390.00, 'Completado'),
('AV224', 'Chiclayo', 'Lima', '2024-07-27', '10:10:00', 310.40, 'Completado'),
('AV225', 'Lima', 'Ica', '2024-08-03', '06:45:00', 260.50, 'Completado'),
('AV226', 'Ica', 'Lima', '2024-08-18', '17:20:00', 255.30, 'Completado'),
('AV227', 'Cusco', 'Pucallpa', '2024-09-01', '09:30:00', 375.60, 'Completado'),
('AV228', 'Arequipa', 'Chiclayo', '2024-09-16', '14:00:00', 400.10, 'Completado'),
('AV229', 'Trujillo', 'Arequipa', '2024-10-05', '08:10:00', 320.70, 'Completado'),
('AV202', 'Cusco', 'Arequipa', '2024-10-25', '10:15:00', 280.00, 'Completado'),
('AV207', 'Chiclayo', 'Cusco', '2024-11-06', '11:00:00', 385.20, 'Completado'),
('AV213', 'Tacna', 'Arequipa', '2024-11-22', '07:45:00', 250.50, 'Completado'),
('AV220', 'Lima', 'Trujillo', '2024-12-10', '09:40:00', 295.50, 'Completado'),
('AV230', 'Lima', 'Cusco', '2024-12-28', '12:00:00', 330.90, 'Completado');

INSERT INTO pasajero (nombre, apellido, dni, email)
VALUES ('Carlos', 'Pérez', '78451236', 'carlos@gmail.com');
