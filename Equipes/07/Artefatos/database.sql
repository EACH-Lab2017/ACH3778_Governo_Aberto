CREATE DATABASE `Calendario_Legislativo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


USE Calendario_Legislativo;

CREATE TABLE `Calendario_Legislativo`.`tb_eventos_camara` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `assunto` VARCHAR(4000) NULL,
  `data` DATE NULL,
  `horario_inicio` TIME(0) NULL,
  `horario_fim` TIME(0) NULL,
  `local` VARCHAR(4000)  NULL,
  `condutor` VARCHAR(4000) NULL,
  PRIMARY KEY (`id`));
