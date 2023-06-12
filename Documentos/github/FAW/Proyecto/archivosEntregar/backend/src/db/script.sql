CREATE DATABASE ProyectoFAW;

USE ProyectoFAW;

CREATE TABLE `usuario` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `usuario` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `fnac` DATE NOT NULL,
    `sexo` VARCHAR(1) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `comic` (
    `id` INT NOT NULL AUTO_INCREMENT,
	`id_usuario` INT NOT NULL,
    `nombre` VARCHAR(45) NOT NULL,
    `aimp` INT NOT NULL,
    `sinopsis` VARCHAR(200) NOT NULL,
    `editorial` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id`)
);