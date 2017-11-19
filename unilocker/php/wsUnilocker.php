<?php
	$action = $_POST['action'];

//USUARIOS
	if ($action == "Login")
		s_login();
	if ($action == "Verificar")
		u_VerificarUser();
	if ($action == "WalkT")
		u_WalkT();				
	if ($action == "NewUser")
		i_usuario_reg();
	if ($action == "upUsuario")
		u_Usuario();
	if ($action == "upContra")
		u_Contra();
	if ($action == "NewAdmin")
		i_usuario_adm();
//SELECT
	if ($action == "selUsuario")
		s_usuario();
	if ($action == "selUsuarioUp")
		s_usuarioUpdate();
	if ($action == "selSeccion")
		s_Seccion();
	if ($action == "selLocker")
		s_Locker();
	if ($action == "selLockerSecc")
		s_LockerBySeccion();
	if ($action == "selLockerUser")
		s_LockerByUser();
	if ($action == "selLockerUserOcupado")
		s_LockerByUserOcupado();
	if ($action == "selResumen")
		s_Resumen();
	if ($action == "selDataimpreso")
		s_DataImprimir();
//RENTAS
	if ($action == "rentUsuario")
		i_RentaByUsuario();
	if ($action == "rentAdmin")
		i_RentaByAdmin();
//RENOVAR
	if ($action == "renovaUser")
		u_RenovarByUsuario();
	if ($action == "renovaAdmin")
		u_RenovarByAdmin();
//CANCELAR
	if ($action == "cancelUser")
		u_CancelarByUsuario();
	if ($action == "cancelAdmin")
		u_CancelarByAdmin();
//PENDIENTES
	if ($action == "Pendientes")
		s_Pendientes();
	if ($action == "Aceptar")
		u_Aceptar();
//REPORTES
	if ($action == "rptLockersTipo")
		s_ReporteLockers_Tipo();
	if ($action == "rptTodosUsers")
		s_todoUsuarios();
	if ($action == "rptNotAdmins")
		s_UsuariosNoAdmin();
	if ($action == "rptCambiarTipo")
		u_CambiarTipo();
	
//EnviaEmail_New('bstaru95@gmail.com','Nata');

// CONEXIÓN BASE DE DATOS
	function connect() {
		$databasehost = "localhost"; //160.153.62.69
		$databasename = "unilocker01";//unilocker02
		$databaseuser = "root"; //ncm
		$databasepass = "shineekey91";//QIzscCuT5T

		$mysqli = new mysqli($databasehost, $databaseuser, $databasepass, $databasename);
		if ($mysqli->connect_errno) {
			echo "Problema con la conexion a la base de datos";
		}
		return $mysqli;
		}
	function disconnect() {
		mysqli_close();
		}

//EMAIL
	$EMAIL = 'notificaciones@unilocker.com.mx';
	$PASS = 'locker95?';
	$PORTAL_LOCAL = 'http://localhost:8080/';
	$PORTAL = 'http://www.unilocker.com.mx/';
	function EnviaEmail_New(){
		$name = 'Nata';
		$to = 'bstaru95@gmail.com';
		$subject = "¡Bienvenido!";

		$htmlBody ="<link href='https://fonts.googleapis.com/css?family=Montserrat:400,500,700' rel='stylesheet'>" +
            "<div style='background-color:#f0eff4; font-family:\"Montserrat\",sans-serif;padding:10%;'>" +
                "<div style='background-color:#fff;padding:2%;'>" +
                    "<div style='margin-top:5%; padding:5%;text-align:center;'>" +
                        "<img src='https://drive.google.com/uc?export=view&id=0B3cBei8Bg7hCZDRFTG9OOUQ0M1E' style='width: 80%; margin: 0 auto; text-align:center;'>" +
                    "</div>" +
                    "<div style='margin: 0 auto; width: inherit;text-align:center;'>" +
                        "<h2 style='text-transform: uppercase;font-size:'>BIENVENIDO " + $name + "</h2>" +
                        "<p>Gracias por unirte a UNILOCKER. Hemos verificado tu cuenta, sólo te queda un paso más para comenzar a rentar tu locker. </p>" +
                        "<a href='"+ $PORTAL_LOCAL + "verificar.html?correo="+ $to + "' target='_blank' style='text-decoration:none;display: inline-block;line-height: 1.42857143;"+
                        "text-align: center;background-color: #4e4caa; border-radius: 25px;border: 1px solid transparent;font-family:\"Montserrat\",sans-serif;"+
                        "font-size: 3vh;color: #fff; padding: 6px 23px; margin-top: 5%;cursor: pointer;'>Iniciar Sesión</a>" +
                    "</div>" +
                "</div>" +
            "</div>";
	
        // Always set content-type when sending HTML email
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

		// More headers
		$headers .= 'From: '+$EMAIL  . "\r\n";

		mail($to,$subject,$message,$headers);                        
	}

// ----------------------------------------------------------------


//USUARIOS
	function s_login() {
		$email = $_POST["mail"];
		$pass = $_POST["pass"];

		$mysqli = connect();

		$result = $mysqli->query("call s_login('".$email."', '".$pass."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}
	function u_VerificarUser(){
		$email = $_POST["mail"];
		$mysqli = connect();

		$result = $mysqli->query("call u_VerificarUser('".$email."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";
		}
		mysqli_close($mysqli);
		}
	function u_WalkT(){
		$idu = $_POST["id"];
		$mysqli = connect();

		$result = $mysqli->query("call u_WalkT(".$idu.");");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";
		}
		mysqli_close($mysqli);
		}
	function i_usuario_reg(){
		$nombre = $_POST["name"];
		$apellidos = $_POST["last"];
		$matricula = $_POST["mat"];
		$correo = $_POST["mail"];
		$contra = $_POST["pass"];

		$mysqli = connect();

		$result = $mysqli->query("call i_usuario_reg('".$nombre."','".$apellidos."','".$matricula."','".$correo."','".$contra."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";

			// string NombreUsuario = Nombres + " " + Apellidos;

           // EnviaEmail_New(Correo, NombreUsuario);
		}
		mysqli_close($mysqli);
		}
	function u_Usuario(){
		$idu = $_POST["id"];
		$nombre = $_POST["name"];
		$apellidos = $_POST["last"];
		$matricula = $_POST["mat"];
		$correo = $_POST["mail"];
		$foto = $_POST["pic"];

		$mysqli = connect();

		$result = $mysqli->query("call u_Usuario(".$idu.",'".$nombre."', '".$apellidos."', '".$matricula."', '".$correo."', '".$foto."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";
		}
		mysqli_close($mysqli);
		}
	function u_Contra(){
		$idu = $_POST["id"];
		$contra = $_POST["pass"];

		$mysqli = connect();

		$result = $mysqli->query("call u_Contra(".$idu.",'".$contra."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";
		}
		mysqli_close($mysqli);
		}	
	function i_usuario_adm(){
		$nombre = $_POST["name"];
		$apellidos = $_POST["last"];
		$matricula = $_POST["mat"];
		$correo = $_POST["mail"];
		$contra = $_POST["pass"];


		$mysqli = connect();

		$result = $mysqli->query("call i_usuario_adm('".$nombre."', '".$apellidos."', '".$matricula."', '".$correo."', '".$contra."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";

			// string NombreUsuario = Nombres + " " + Apellidos;

           // EnviaEmail_New(Correo, NombreUsuario);
		}
		mysqli_close($mysqli);
		}

//SELECTS
	function s_usuario() {

		$mysqli = connect();

		$result = $mysqli->query("call s_usuario();");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}
	function s_usuarioUpdate() {
		$idu = $_POST["id"];

		$mysqli = connect();

		$result = $mysqli->query("call s_usuarioUpdate(".$idu.");");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}
	function s_Seccion() {

		$mysqli = connect();

		$result = $mysqli->query("call s_Seccion();");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}
	function s_Locker() {

		$mysqli = connect();

		$result = $mysqli->query("call s_Locker();");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}
	function s_LockerBySeccion() {
		$idub = $_POST["idsec"];

		$mysqli = connect();

		$result = $mysqli->query("call s_LockerBySeccion(".$idub.");");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}
	function s_LockerByUser() {
		$idus = $_POST["idU"];

		$mysqli = connect();

		$result = $mysqli->query("call s_LockerByUser(".$idus.");");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}
	function s_LockerByUserOcupado() {
		$idub = $_POST["idsec"];
		$idus = $_POST["idU"];

		$mysqli = connect();

		$result = $mysqli->query("call s_LockerByUserOcupado(".$idus.",".$idub.");");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}
	function s_Resumen() {

		$mysqli = connect();

		$result = $mysqli->query("call s_Resumen();");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}
	function s_DataImprimir() {
		$idus = $_POST["idU"];
		$idl = $_POST["idl"];
		$con = $_POST["con"];

		$mysqli = connect();

		$result = $mysqli->query("call s_DataImprimir(".$idus.",".$idl.",'".$con."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}

//RENTAR
	function i_RentaByUsuario() {
		$idlock = $_POST["idl"];
		$idus = $_POST["idU"];
		$fech = $_POST["dia"];

		$mysqli = connect();

		$result = $mysqli->query("call i_RentaByUsuario(".$idlock.",".$idus.",'".$fech."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}
	function i_RentaByAdmin(){
		$idlock = $_POST["idl"];
		$idus = $_POST["idU"];
		$idrenter = $_POST["idRen"];
		$comm = $_POST["com"];
		$fech = $_POST["dia"];

		$mysqli = connect();

		$result = $mysqli->query("call i_RentaByAdmin(".$idlock.",".$idus.",".$idrenter.",'".$comm."','".$fech."');");	

		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}

//RENOVAR
	function u_RenovarByUsuario(){
		$idlock = $_POST["idl"];
		$idus = $_POST["idU"];
		$fech = $_POST["dia"];

		$mysqli = connect();

		$result = $mysqli->query("call u_RenovarByUsuario(".$idlock.",".$idus.",'".$fech."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";
		}
		mysqli_close($mysqli);
		}
	function u_RenovarByAdmin(){
		$idlock = $_POST["idl"];
		$idus = $_POST["idU"];
		$idrenter = $_POST["idRen"];
		$comm = $_POST["com"];
		$fech = $_POST["dia"];

		$mysqli = connect();

		$result = $mysqli->query("call u_RenovarByAdmin(".$idlock.",".$idus.",".$idrenter.",'".$comm."','".$fech."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";
		}
		mysqli_close($mysqli);
		}

//CANCERAL
	function u_CancelarByUsuario(){
		$idlock = $_POST["idl"];
		$idus = $_POST["idU"];
		$fech = $_POST["dia"];

		$mysqli = connect();

		$result = $mysqli->query("call u_CancelarByUsuario(".$idlock.",".$idus.",'".$fech."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";
		}
		mysqli_close($mysqli);
		}
	function u_CancelarByAdmin(){
		$idlock = $_POST["idl"];
		$idus = $_POST["idU"];
		$idrenter = $_POST["idRen"];
		$comm = $_POST["com"];
		$fech = $_POST["dia"];

		$mysqli = connect();

		$result = $mysqli->query("call u_CancelarByAdmin(".$idlock.",".$idus.",".$idrenter.",'".$comm."','".$fech."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";
		}
		mysqli_close($mysqli);
		}

//PENDIENTES
	function s_Pendientes(){
		$mysqli = connect();

		$result = $mysqli->query("call s_Pendientes();");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}
	function u_Aceptar(){
		$folio = $_POST["folio"];
		$renta = $_POST["rent"];
		$comen = $_POST["com"];
		$idu = $_POST["user"];
		$fech = $_POST["day"];
		$concep = $_POST["conc"];

		$mysqli = connect();

		$result = $mysqli->query("CALL u_Aceptar(".$folio.",".$renta.",'".$comen."',".$idu.",'".$fech."','".$concep."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";
		}
		mysqli_close($mysqli);
		}

//REPORTES
	function s_ReporteLockers_Tipo() {
		$concepto = $_POST["concepto"];

		$mysqli = connect();

		$result = $mysqli->query("call s_ReporteLockers_Tipo(".$concepto.");");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}
	function s_todoUsuarios() {

		$mysqli = connect();

		$result = $mysqli->query("call s_todoUsuarios();");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}
	function s_UsuariosNoAdmin() {

		$mysqli = connect();

		$result = $mysqli->query("call s_UsuariosNoAdmin();");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}
	function u_CambiarTipo(){
		$idu = $_POST["id"];

		$mysqli = connect();

		$result = $mysqli->query("call u_CambiarTipo(".$idu.");");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";
		}
		mysqli_close($mysqli);
		}
	
?>