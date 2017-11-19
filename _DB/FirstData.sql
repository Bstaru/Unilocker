
-- use unilocker;

-- Default values: Tipo, Estatus, Seccion, Concepto

/**/
	INSERT INTO tbl_tipo(Nombre) VALUES('Administrador');
	INSERT INTO tbl_tipo(Nombre) VALUES('Usuario');
    
	INSERT INTO tbl_estatus(Estado) VALUES('Ocupado');
	INSERT INTO tbl_estatus(Estado) VALUES('Libre');
	INSERT INTO tbl_estatus(Estado) VALUES('Apartado');
    INSERT INTO tbl_estatus(Estado) VALUES('Renovar');
    INSERT INTO tbl_estatus(Estado) VALUES('Cancelar');
    
	INSERT INTO tbl_seccion(Nombre) VALUES('Piso 1');
	INSERT INTO tbl_seccion(Nombre) VALUES('Piso 2');
	INSERT INTO tbl_seccion(Nombre) VALUES('Deportivo');

CALL i_usuario_adm('Admin','Admin','-','admin@gmail.com','0000');
CALL i_usuario_reg('Natalie','Conde Mejía','1589902','bstaru95@gmail.com','0000');
CALL i_usuario_reg('Tomás Eduardo','Ibarra Hernández','1519737','tomas@gmail.com','0000');
CALL i_usuario_reg('José Ángel','Osorio Villarreal','154879','osorio@gmail.com','0000');

	INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('2100','80',2,1,36);
     INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('2110','80',2,1,36);
	INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('2200','60',2,1,36);
     INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('2210','80',2,1,36);
	INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('2300','40',2,1,36);
     INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('2310','80',2,1,36);
	INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('2400','20',2,1,36);
	INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('2401','20',2,1,36);
     
     INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('3100','80',2,2,36);
	INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('3110','60',2,2,36);
	INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('3200','40',2,2,36);
	INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('3210','20',2,2,36);
      INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('3300','80',2,2,36);
	INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('3310','60',2,2,36);
	INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('3400','40',2,2,36);
	INSERT INTO tbl_locker(Numero,Precio,idEstatus,idSeccion,idUsuario) 
     VALUES('3410','40',2,2,36);



