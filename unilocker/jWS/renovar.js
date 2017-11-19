$(document).ready(function () {

    var MTDS = new METODOS();
    var fecha = MTDS.TODAY();

    var Secciones;
    var Lockers;
    var Matriculas;

    if (objSess.idtipo == 1) {
        $('#msg_renovar_user').addClass('elem-hide');
        $('#msg_renovar_admin').removeClass('elem-hide');
        $('#renovarMat').removeClass('elem-hide');
        $('#renovarCom').removeClass('elem-hide');
        }
    else {
        console.log('');
        }

    window.s_usuario = function () {

        var param = {action: "selUsuario"};

        $.ajax({
            type: "POST",
            url: domin,
            data: param,
            dataType: "json",

            success: function (response) {

                var arr = new Array();
                Secciones = response;

                arr.push({ id: 0, Nombre: 'Selecciona matricula' });

                $.each(response, function (indx, obj) {
                    var OBJ = { id: obj.id, Nombre: obj.Matricula };
                    arr.push(OBJ);
                });

                MTDS.FULLER_COMBO('Renovar_Matricula', arr);

             },

            error: function (e) {
                console.log(e);
            }
        });

    };

    window.s_Seccion = function () {

        var param = {action:"selSeccion"}
        
        $.ajax({
            type: "POST",
            url: domin,
            data: param,            
            dataType: "json",

            success: function (response) {

                var arr = new Array();
                Secciones = response;

                arr.push({ id: 0, Nombre: 'NINGUNO' });

                $.each(response, function (indx, obj) {
                    var OBJ = {id: obj.id, Nombre: obj.Nombre };
                    arr.push(OBJ);
                });

                //console.log(Secciones);
                MTDS.FULLER_COMBO('Renovar_Seccion', arr);
            },

            error: function (e) {
                console.log(e);
            }
        });

    };

    window.s_LockerByUserOcupado = function (idUser, idSecc) {

        var param = {action:"selLockerUserOcupado", idsec: idSecc, idU: idUser };

        $.ajax({
            type: "POST",
            url: domin ,
            data: param,
            dataType: "json",

            success: function (response) {

                var arr = new Array();
                Lockers = response;

                $.each(response, function (indx, obj) {
                    var OBJ = [obj.id, obj.Numero, obj.Precio, obj.idEstatus, obj.idSeccion, obj.idUsuario];
                    arr.push(OBJ);
                });
                MTDS.FULLER_COMBO('Renovar_NumLocker', Lockers);
                ImgLocker();
            },

            error: function (e) {
                console.log(e);
            }
        });

    };

    window.u_RenovarByUsuario = function (idLocker, idUsuario, fecha) {

        var param = {action:"renovaUser", idl: idLocker, idU: idUsuario, dia: fecha };

        $.ajax({
            type: "POST",
            url: domin,
            data: param,

            success: function (response) {
                console.log(response);
                window.location.href = "imprimir.html?Concepto=Renovar&idl=" + idLocker + "&id=" + idUsuario;
            },

            error: function (e) {
                console.log(e);
            }
        });

    };

    window.u_RenovarByAdmin = function (idLocker, idUsuario, idRentador, Comentarios, fecha) {

        var param = {action:"renovaAdmin", idl: idLocker, idU: idUsuario, idRen: idRentador, com: Comentarios, dia: fecha };

        $.ajax({
            type: "POST",
            url: domin,
            data: param,

            success: function (response) {
                console.log(response);
               window.location.href = "imprimir.html?Concepto=Renovar&idl=" + idLocker + "&id=" + idUsuario;
           },

            error: function (e) {
                console.log(e);
            }
        });

    };

    s_usuario();
    s_Seccion();

    $('#Renovar_Matricula').on('change', function () {
        var idU= $(this).val();

        if (objSess.idtipo != 1) {
            s_LockerByUserOcupado(objSess.id, idSec);
        }
        else {
            s_LockerByUserOcupado(idU, $('#Renovar_Seccion').val());
        }
    });

    $('#Renovar_Seccion').on('change', function () {
        var idSec = $(this).val();

        if (objSess.idtipo != 1) {
            s_LockerByUserOcupado(objSess.id, idSec);
        }
        else {
            s_LockerByUserOcupado($('#Renovar_Matricula').val(), idSec);
        }
    });

    function resetImgLocker() {
        $('#imgDelLocker').removeClass('img_5')
                        .removeClass('img_1')
                        .removeClass('img_2')
                        .removeClass('img_3')
                        .removeClass('img_4');
        $('#precioLock').empty();
    }
    function ImgLocker() {
        var numeroLocker = $('#Renovar_NumLocker option:selected').text();


        if (numeroLocker.match("^11") || numeroLocker.match("^21")) {
            //console.log('arriba!');           
            resetImgLocker();
            $('#precioLock').text('$80');
            $('#imgDelLocker').addClass('img_1');
        }
        if (numeroLocker.match("^12") || numeroLocker.match("^22")) {
            //console.log('segundo!');
            resetImgLocker();
            $('#precioLock').text('$60');
            $('#imgDelLocker').addClass('img_2');
        }
        if (numeroLocker.match("^13") || numeroLocker.match("^23")) {
            //console.log('tercero!');
            resetImgLocker();
            $('#precioLock').text('$40');
            $('#imgDelLocker').addClass('img_3');
        }
        if (numeroLocker.match("^14") || numeroLocker.match("^24")) {
            //console.log('abajo!');
            resetImgLocker();
            $('#precioLock').text('$20');
            $('#imgDelLocker').addClass('img_4');
        }
    }

    $('#Renovar_NumLocker').on('change', function () {
        ImgLocker();       
    });

    $('#Renovar').on('click', function () {       

        var idNumLocker = $('#Renovar_NumLocker').val();
        var byMatri = $('#Renovar_Matricula').val();
        var comment = $('#coment_renov').val();

        var checkCom = '';
        if (comment == '') {checkCom = '-';}
        else { checkCom = comment; }

        if (idNumLocker == null) {
            console.log('nel no tienes');
        }
        else {
            if (objSess.idtipo != 1) {
                u_RenovarByUsuario(idNumLocker, objSess.id, fecha);
            }
            else {
                u_RenovarByAdmin(idNumLocker, byMatri, objSess.id, checkCom, fecha);
            }
        }

              
    });

});