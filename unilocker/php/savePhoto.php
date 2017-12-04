<?php

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
	$mysqli = connect();

	$idu = mysqli_real_escape_string($mysqli,$_POST['savePP']);

	$dat = basename($_FILES['userprofile_picture']['name']);
	$rest = substr($dat, -4);
	
	if ($rest == '.png') {
		$uploaddir = '../imgs_profile/'.time();
		$imgsita = 'imgs_profile/'.time();
	}
	else {
		$uploaddir = '../imgs_profile/'.time();
		$imgsita = 'imgs_profile/'.time();
	}

    $uploadfile = $uploaddir.basename($_FILES['userprofile_picture']['name']);
    $uploadfile2 = $imgsita.basename($_FILES['userprofile_picture']['name']);

    if (move_uploaded_file($_FILES['userprofile_picture']['tmp_name'], $uploadfile)) {
      //echo "File is valid, and was successfully uploaded.\n";
    } 

	$result = $mysqli->query("CALL u_Foto('".$idu."', '".$uploadfile2."');");

    if (!$result) {
		echo "Problema al hacer un query: " . $mysqli->error;								
	} else {
		//echo $uploadfile2;
		header("location: ../config.html?archivo=$uploadfile2");
	}


	mysqli_close($mysqli);

?>