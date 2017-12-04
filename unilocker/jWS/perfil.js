$(document).ready(function () {

    var domin = 'webservice/wsUnilocker.asmx';
    var MTDS = new METODOS();

    var objSess = JSON.parse(sessionStorage.getItem("UserSession"));

    var fecha = MTDS.TODAY();

    $('#img_Perfil').attr('src',objSess.foto);
    
    var lock = '';
    if (objSess.locker == "SIN LOCKER") { lock = 'Aun sin locker' }
    else{lock=objSess.locker}

    var tioo = '';
    if (objSess.idtipo == 1) { tipo = '<h3><i class="users icon"></i> Tipo: <label id="Per_tipo">Administrador</label></h3>' }
    else{tipo = ''}

    $('#DatosUser').empty();
    $('#DatosUser').append(
            '<h3><i class="user circle outline icon"></i> Nombre: <label id="Per_Name">' + objSess.nombres + ' ' + objSess.apellidos + '</label></h3>' +
            '<h3><i class="mail outline icon"></i> Correo: <label id="Per_Mail">' + objSess.correo + '</label></h3>' +
            '<h3><i class="id card outline icon"></i> Matrícula: <label id="Per_Mat">' + objSess.matricula + '</label></h3>' +
            '<h3><i class="archive icon"></i> Locker: <label id="Per_Lock">' + lock + '</label></h3>' +
            tipo
        );
});