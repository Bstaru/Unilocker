$(document).ready(function () {

    var MTDS = new METODOS();
    var fecha = MTDS.TODAY();

    var Lockers;
    var Matriculas;

    if (objSess.idtipo == 1) {
        $('#msg_cancelar_user').addClass('elem-hide');
        $('#msg_cancelar_admin').removeClass('elem-hide');
        $('#cancelarMat').removeClass('elem-hide');
        $('#cancelarCom').removeClass('elem-hide');
        }
    else {
        console.log('soy usuario');
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

                MTDS.FULLER_COMBO('Cancelar_Matricula', arr);

             },

            error: function (e) {
                console.log(e);
            }
        });

    };
    window.s_LockerByUser = function (idUser) {

        var param = {action:"selLockerUser", idU: idUser };

        $.ajax({
            type: "POST",
            url: domin,
            data: param,
            dataType: "json",

            success: function (response) {

                var arr = new Array();
                Lockers = response;

                $.each(response, function (indx, obj) {
                    var OBJ = [obj.id, obj.Numero, obj.Precio, obj.idEstatus, obj.idSeccion, obj.idUsuario];
                    arr.push(OBJ);
                });
                MTDS.FULLER_COMBO('Cancelar_NumLocker', Lockers);

            },

            error: function (e) {
                console.log(e);
            }
        });

    };

    window.u_CancelarByUsuario = function (idLocker, idUsuario, fecha) {

        var param = {action:"cancelUser", idl: idLocker, idU: idUsuario, dia: fecha };

        $.ajax({
            type: "POST",
            url: domin ,
            data: param,

            success: function (response) {
                console.log(response);
                swal("¡Listo!", "Tu locker está en proceso de cancelación, te avisaremos cuando esté todo listo.", "success", { button: "Ok" });
                //window.location.href = "home.html";
            },

            error: function (e) {
                console.log(e);
            }
        });

    };

    window.u_CancelarByAdmin = function (idLocker, idUsuario, idRentador, Comentarios, fecha) {

        var param = {action:"cancelAdmin", idl: idLocker, idU: idUsuario, idRen: idRentador, com: Comentarios, dia: fecha };

        $.ajax({
            type: "POST",
            url: domin,
            data: param,

            success: function (response) {
                console.log(response);
                swal("¡Listo!", "El locker ha sido liberado.", "success", { button: "Ok" });
                //window.location.href = "admin.html";
            },

            error: function (e) {
                console.log(e);
            }
        });

    };

    s_usuario();

    $('#Cancelar_Matricula').on('change', function () {
        var idU = $(this).val();
        s_LockerByUser(idU);
    });

    s_LockerByUser(objSess.id);
    
    $('#Cancelar').on('click', function () {      

        var idNumLocker = $('#Cancelar_NumLocker').val();
        var byMatri = $('#Cancelar_Matricula').val();
        var comment = $('#coment_can').val();

        var checkCom = '';
        if (comment == '') { checkCom = '-'; }
        else { checkCom = comment; }       

        if (objSess.idtipo != 1) {
            u_CancelarByUsuario(idNumLocker, objSess.id, fecha);
        }
        else {
            u_CancelarByAdmin(idNumLocker, byMatri, objSess.id, checkCom, fecha);
        }      
    });

});