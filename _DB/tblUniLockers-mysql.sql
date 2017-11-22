CREATE TABLE `tbl_estatus` (
  `id`INT unsigned NOT NULL AUTO_INCREMENT,
  `Estado` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

CREATE TABLE `tbl_seccion` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE `tbl_tipo` (
  `id`INT unsigned NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `tbl_usuarios` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `Nombres` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `Matricula` varchar(10) NOT NULL,
  `Correo` varchar(60) DEFAULT NULL,
  `idTipo` INT unsigned NOT NULL,
  `Contra` varchar(255) NOT NULL,
  `Foto` varchar(255) DEFAULT 'NADA',
  `Activo` INT(3) DEFAULT b'1',
  PRIMARY KEY (`id`),
  KEY `usuarios_idfk_tipo` (`idTipo`),
  CONSTRAINT `usuarios_idfk_tipo` FOREIGN KEY (`idTipo`) REFERENCES `tbl_tipo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

CREATE TABLE `tbl_locker` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `Numero` varchar(20) NOT NULL,
  `Precio` float NOT NULL,
  `idEstatus` INT unsigned NOT NULL,
  `idSeccion` INT unsigned NOT NULL,
  `idUsuario` INT unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `locker_idfk_estatus` (`idEstatus`),
  KEY `locker_idfk_seccion` (`idSeccion`),
  KEY `locker_idfk_usuario` (`idUsuario`),
  CONSTRAINT `locker_idfk_estatus` FOREIGN KEY (`idEstatus`) REFERENCES `tbl_estatus` (`id`),
  CONSTRAINT `locker_idfk_seccion` FOREIGN KEY (`idSeccion`) REFERENCES `tbl_seccion` (`id`),
  CONSTRAINT `locker_idfk_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `tbl_usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

CREATE TABLE `tbl_renta` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `idLocker` INT unsigned NOT NULL,
  `idUsuario` INT unsigned NOT NULL,
  `idRentador` INT unsigned NOT NULL,
  `Comentarios` varchar(200) DEFAULT NULL,
  `Concepto` enum('Rentar','Renovar','Apartar','Cancelar','Rentado','Renovado','Cancelado') DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `renta_idfk_locker` (`idLocker`),
  KEY `renta_idfk_usuario` (`idUsuario`),
  KEY `renta_idfk_rentador` (`idRentador`),
  CONSTRAINT `renta_idfk_rentador` FOREIGN KEY (`idRentador`) REFERENCES `tbl_usuarios` (`id`),
  CONSTRAINT `renta_idfk_seccion` FOREIGN KEY (`idLocker`) REFERENCES `tbl_locker` (`id`),
  CONSTRAINT `renta_idfk_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `tbl_usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
