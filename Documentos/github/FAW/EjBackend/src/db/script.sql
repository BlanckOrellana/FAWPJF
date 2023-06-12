CREATE TABLE `faw2023`.`operacion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `operando1` FLOAT NOT NULL,
  `operando2` FLOAT NOT NULL,
  `operacion` VARCHAR(45) NOT NULL,
  `resultado` FLOAT NOT NULL,
  PRIMARY KEY (`id`));