DELIMITER $$
CREATE PROCEDURE `i_RentaByAdmin`(
	IN idLock int,
    IN idUser int,
    IN idRent int,
    IN coments varchar(200),
    IN dia date
)
BEGIN
	SET @consulta = (SELECT EXISTS(SELECT idUsuario FROM tbl_locker WHERE idUsuario = idUser));
    
	IF(@consulta != 1) THEN
		INSERT INTO tbl_renta (idLocker, idUsuario, idRentador,Comentarios,Fecha)
		VALUES (idLock,idUser,idRent,coments,'Rentado',dia);
        
        UPDATE tbl_locker
        SET idEstatus = 1, idUsuario = idUser
        WHERE id = idLock;
        
         SELECT 'Se guardó';
	ELSE
		SELECT 'El usuario ya cuenta con un locker';
	END IF;
		
        
	END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `i_RentaByUsuario`(
	IN idLock int,
    IN idUser int,
    IN dia date
)
BEGIN
	SET @consulta = (SELECT EXISTS(SELECT idUsuario FROM tbl_locker WHERE idUsuario = idUser));
    
	IF(@consulta != 1) THEN
		INSERT INTO tbl_renta (idLocker, idUsuario, idRentador,Comentarios,Concepto,Fecha)
		VALUES (idLock,idUser,2,'-','Apartar',dia);
        
        UPDATE tbl_locker
        SET idEstatus = 3, idUsuario = idUser
        WHERE id = idLock;
        
		SELECT 'Se guardó';
	ELSE
		SELECT 'Ya cuentas con un locker';
	END IF;

		
        
	END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `i_usuario_adm`(
	IN uname varchar(50),
    IN ulast varchar(50),
    IN mat varchar(10),
    IN mail varchar(30),
    IN pass varchar(255)
)
BEGIN
		INSERT INTO tbl_usuarios (Nombres, Apellidos, Matricula,Correo,idTipo,Contra,Activo)
		VALUES (uname,ulast,mat,mail,1,MD5(pass),0);
	END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `i_usuario_reg`(
	IN uname varchar(50),
    IN ulast varchar(50),
    IN mat varchar(10),
    IN mail varchar(30),
    IN pass varchar(255)
)
BEGIN
		INSERT INTO tbl_usuarios (Nombres, Apellidos, Matricula,Correo,idTipo,Contra,Activo)
		VALUES (uname,ulast,mat,mail,2,MD5(pass),0);
	END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `s_DataImprimir`(
	IN idUsuario INT, 
    IN idLocker INT,
    in concepto varchar(20)
)
BEGIN
	SELECT R.Fecha, R.id as Folio,  U.id, U.Nombres, U.Apellidos, U.Matricula, L.Numero, L.Precio, R.Concepto, E.Estado as EstadoLocker

	FROM tbl_renta R
	INNER JOIN tbl_locker L
	ON L.id = R.idLocker
	INNER JOIN tbl_usuarios U
	ON U.id = R.idUsuario
	INNER JOIN tbl_estatus E
	ON E.id = L.idEstatus

	 WHERE 	r.idUsuario = idUsuario AND
			r.idLocker = idLocker AND
			(
				(concepto = 'Rentar' AND R.Concepto = 'Rentar') OR
				(concepto = 'Renovar' AND R.Concepto = 'Renovar' ) OR
				(concepto = 'Apartar' AND R.Concepto = 'Apartar' ) OR
				(concepto = 'Cancelar' AND R.Concepto = 'Cancelar')
			);
			

	-- ORDER BY R.Fecha DESC
        
	END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `s_Locker`(  
)
BEGIN
	SELECT id,Numero, Precio, idEstatus, idSeccion, idUsuario 
    FROM tbl_locker
    where idEstatus = 2;
        
	END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `s_LockerBySeccion`(  
IN idSec int
)
BEGIN
	SELECT id,Numero, Precio, idEstatus, idSeccion, idUsuario 
    FROM tbl_locker
    WHERE idSec = idSeccion  AND idEstatus = 2;
        
	END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `s_LockerByUser`(     
    IN idUser int
)
BEGIN

	SELECT id, Numero,Precio, idEstatus, idSeccion, idUsuario

	FROM tbl_locker

	WHERE idUsuario = idUser; 
        
	END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `s_LockerByUserOcupado`(     
   IN idU int, 
   IN idSec int
)
BEGIN
	SELECT id,Numero, Precio, idEstatus, idSeccion, idUsuario 
    FROM tbl_locker
    WHERE  idSec = idSeccion AND idU = idUsuario  AND idEstatus = 1;
        
	END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `s_login`(
    IN corr varchar (60),IN pass varchar(255)
)
BEGIN
		SELECT U.id, U.Nombres, U.Apellidos, U.Matricula, U.Correo, U.idTipo, U.Contra, U.Foto, 
        ifnull( (SELECT L.Numero FROM tbl_locker L WHERE L.idUsuario = U.id ), 'Sin Locker') as Locker,
        U.Activo
		FROM tbl_usuarios U
		WHERE Contra = MD5(pass) AND Correo = corr AND  Activo != 0;
	END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `s_Pendientes`(
)
BEGIN
	SELECT distinct
		 R.id as FOLIO, R.Fecha, R.Concepto, L.Numero, L.Precio,CONCAT(U.Nombres,' ',U.Apellidos) AS Usuario, U.id as idU

	FROM tbl_locker L
	INNER JOIN tbl_renta R
	ON R.idLocker = L.id
	INNER JOIN tbl_estatus E
	ON L.idEstatus = E.id
	INNER JOIN tbl_usuarios U
	ON L.idUsuario = U.id

	 WHERE  (E.id = 3 AND R.Concepto = 'Apartar') OR 
			(E.id = 3 AND R.Concepto = 'Renovar') OR 
			(E.id = 5 AND R.Concepto = 'Cancelar')
	
    ORDER BY R.Fecha DESC;
        
	END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `s_ReporteLockers_Tipo`(
    in concepto int
)
BEGIN
	SELECT distinct
			-- R.id as FOLIO, R.Fecha,
		 L.Numero, L.Precio, E.Estado, CONCAT(U.Nombres,' ',U.Apellidos) AS Usuario

	FROM tbl_locker L
	INNER JOIN tbl_estatus E
	ON L.idEstatus = E.id
	INNER JOIN tbl_usuarios U
	ON L.idUsuario = U.id

	 WHERE 
			(concepto = 0 ) OR
			(concepto = 1 AND E.id = 1 ) OR
			(concepto = 2 AND E.id = 3 ) OR
			(concepto = 3 AND E.id = 2 );
			
        
	END$$
DELIMITER ;

DELIMITER $$
CREATE  PROCEDURE `s_Resumen`()
BEGIN
	select R.id as Folio,  U.Nombres, L.Numero,R.Concepto, E.Estado, R.Fecha

	from tbl_locker L
	inner join tbl_renta R 
	on L.id = R.idLocker
	inner join tbl_estatus E
	on E.id = L.idEstatus
	inner join tbl_usuarios U 
	on U.id = L.idUsuario

	order by R.id desc
    LIMIT 7;
        
	END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `s_Seccion`(  
)
BEGIN
	SELECT id,Nombre 
    FROM tbl_seccion;
        
	END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `s_todoUsuarios`(
)
BEGIN
	SELECT U.id,U.Foto,CONCAT(U.Nombres,' ',U.Apellidos) as Nombre,U.Matricula,U.Correo,U.Activo, T.Nombre
	FROM tbl_usuarios U
    INNER JOIN tbl_tipo T
    ON U.idTipo = T.id
	WHERE Activo = 1;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `s_usuario`(
)
BEGIN
		SELECT id,Nombres,Apellidos,Matricula,Correo,idTipo,Contra,Foto,Activo
		FROM tbl_usuarios
        WHERE idTipo != 1 AND Activo = 1;
	END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `s_UsuariosNoAdmin`(
)
BEGIN
	SELECT U.id,U.Foto,CONCAT(U.Nombres,' ',U.Apellidos) as Nombre,U.Matricula,U.Correo,U.Activo, T.Nombre
	FROM tbl_usuarios U
    INNER JOIN tbl_tipo T
    ON U.idTipo = T.id
	WHERE Activo = 1 AND T.id = 2;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `s_usuarioUpdate`(
	IN idu int
)
BEGIN
		SELECT U.id, U.Nombres, U.Apellidos, U.Matricula, U.Correo, U.idTipo, U.Contra, U.Foto, 
        ifnull( (SELECT L.Numero FROM tbl_locker L WHERE L.idUsuario = U.id ), 'Sin Locker') as Locker
		FROM tbl_usuarios U
        WHERE U.id = idu AND U.Activo = 1;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `u_Aceptar`(
	IN id_Renta int,    
    IN idRent int,
    IN coments varchar(200),    
    IN idUser int,
    IN hoy date,
    IN tipo varchar(20)
)
BEGIN
	UPDATE	tbl_renta
	SET idRentador = idRent, Comentarios = coments, Fecha = hoy, Concepto = tipo
	WHERE id = id_Renta;
	
	SET @idLocker = ( SELECT idLocker FROM tbl_Renta WHERE id = id_Renta);
	
	IF(tipo != 'Cancelado') THEN
		UPDATE tbl_locker
        SET idEstatus = 1, idUsuario = idUser
        WHERE id = @idLocker;
	ELSE
		UPDATE tbl_locker
        SET idEstatus = 2, idUsuario = 2
        WHERE id = @idLocker;
	END IF;        
        
        
	END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `u_CambiarTipo`(
	IN idu int
)
BEGIN
	UPDATE tbl_usuarios
    SET idTipo = 1
	WHERE id = idu;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `u_CambiarTipoUser`(
	IN idu int
)
BEGIN
	UPDATE tbl_usuarios
    SET idTipo = 2
	WHERE id = idu;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `u_CancelarByAdmin`(
	IN idLock int,
    IN idUser int,
    IN idRent int,
    IN coments varchar(200),
    IN dia date
)
BEGIN
		INSERT INTO tbl_renta (idLocker, idUsuario, idRentador,Comentarios,Concepto,Fecha)
		VALUES (idLock,idUser,idRent,coments,'Cancelado',dia);
        
        UPDATE tbl_locker
        SET idEstatus = 2, idUsuario = 2
        WHERE id = idLock;
	END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `u_CancelarByUsuario`(
	IN idLock int,    
	IN idUser int,
	IN dia date
)
BEGIN
		INSERT INTO tbl_renta (idLocker, idUsuario, idRentador,Comentarios,Concepto,Fecha)
		VALUES (idLock,idUser,2,'-','Cancelar',dia);
        
        UPDATE tbl_locker
        SET idEstatus = 5, idUsuario = idUser
        WHERE id = idLock;
	END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `u_Contra`(
	IN idu int,
    IN pss varchar(255)
)
BEGIN
	UPDATE tbl_usuarios
     SET Contra = MD5(pss)
    WHERE id = idu;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `u_FotoUser`(
	IN idu int,
    in foton varchar(255)
)
BEGIN
	UPDATE tbl_usuarios
    SET Foto = foton
	WHERE id = idu;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `u_RenovarByAdmin`(
    IN idLock int,
    IN idUser int,
    IN idRent int,
    IN coments varchar(200),
    IN dia date
)
BEGIN
		INSERT INTO tbl_renta (idLocker, idUsuario, idRentador,Comentarios,Concepto,Fecha)
		VALUES (idLock,idUser,idRent,coments,'Renovado',dia);
        
        UPDATE tbl_locker
        SET idEstatus = 1, idUsuario = idUser
        WHERE id = idLock;

	END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `u_RenovarByUsuario`(  
    IN idLock int,    
    IN idUser int,
    IN dia date
)
BEGIN
		INSERT INTO tbl_renta (idLocker, idUsuario, idRentador,Comentarios,Concepto,Fecha)
		VALUES (idLock,idUser,2,'-','Renovar',dia);
        
        UPDATE tbl_locker
        SET idEstatus = 3, idUsuario = idUser
        WHERE id = idLock;
        
	END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `u_Usuario`(
	IN idu int,
	IN nombres varchar(50),
    IN apellid varchar(50),
    IN matricu varchar(10),
    IN correo varchar(60),
    IN foto varchar(255)
)
BEGIN
	UPDATE tbl_usuarios
    SET Nombres = nombres, Apellidos = apellid, Matricula=matricu, Correo=correo,Foto=foto
    WHERE id = idu;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `u_VerificarUser`(
	IN correo varchar(50)
)
BEGIN
	UPDATE tbl_usuarios
    SET Activo = 2
	WHERE Correo = correo;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `u_WalkT`(
	IN idd int
)
BEGIN
	UPDATE tbl_usuarios
    SET Activo = 1
	WHERE id = idd;
END$$
DELIMITER ;

