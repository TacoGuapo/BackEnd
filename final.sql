-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-08-2024 a las 10:57:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `final`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencias`
--

CREATE TABLE `incidencias` (
  `id_incidencia` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `asunto` varchar(250) NOT NULL,
  `tipo` varchar(250) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `estado` varchar(250) NOT NULL,
  `fecha_creacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidencias`
--

INSERT INTO `incidencias` (`id_incidencia`, `usuario_id`, `asunto`, `tipo`, `descripcion`, `estado`, `fecha_creacion`) VALUES
(4, 3, 'Problema con la calefacción', 'Mantenimiento', 'La calefacción no está funcionando correctamente en el apartamento.', 'pendiente', '2024-08-06'),
(5, 3, 'Problema de luz', 'Mantenimiento', 'Se apagaron las luces a las 10:23am, solucionarlo porfavor.', 'concluido', '2024-08-06'),
(6, 3, 'Problema de agua', 'Mantenimiento', 'Se rompió la tubería del piso 28 ', 'en proceso', '2024-08-07'),
(14, 8, 'Agua', 'Hogar', 'El agua se salio por todo el piso', 'en proceso', '2024-08-07'),
(17, 3, 'Problemas con los pisos', 'Limpieza', 'Se encontraron con basura los pisos al momento de subir a mi departamento', 'en proceso', '2024-08-07'),
(18, 8, 'Ruido', 'Zona', 'El vecino de al lado se queda toda la madrugada hasta las 3:00am haciendo ruido necesita una llamada de atencion', 'concluido', '2024-08-07'),
(19, 8, 'Piso mojado', 'Limpieza', 'El piso del ascensor estaba mojado y hacia lodo, necesita una limpieza', 'en proceso', '2024-08-07'),
(20, 3, 'Problema con el foco', 'Hogar', 'El foco se apaga y prende sin razón', 'pendiente', '2024-08-08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `email` varchar(250) DEFAULT NULL,
  `contraseña` varchar(250) NOT NULL,
  `rol` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `nombre`, `email`, `contraseña`, `rol`) VALUES
(1, '', 'karma.police190@hotmail.com', '$2b$10$6iVUsSpeamPpIddBVz2Uj.5Mr2KmG3z38vytGlCr1yGftBaPUYGDS', 'admin'),
(2, '', 'karma.police180@hotmail.com', '$2b$10$R9TqZZND86Yu4NrKTcVC.OU9QAy3HuKS5dAMNaxaG6vRfelDiWTx2', 'residente'),
(3, 'Anthony Vela', 'karma.police200@hotmail.com', '$2b$10$33/w9VGvxbn/RLioBOZXfuCmEe1M9CBFG6teZ63tpIHcfytrSktPy', 'residente'),
(4, 'Admin1', 'karma.police210@hotmail.com', '$2b$10$0TgJWG26w6o6nKJWhLsC9OwR7u7KrzZR4aSFXQXKamEBU3fmjr6Zu', 'admin'),
(8, '', 'prueba@example.com', '$2b$10$G.Yp4NVrIC4H22hGXc4JJOiBnxPWmN8hAq2nKOcEeEcIO735DwxHu', 'residente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD PRIMARY KEY (`id_incidencia`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  MODIFY `id_incidencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD CONSTRAINT `incidencias_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
