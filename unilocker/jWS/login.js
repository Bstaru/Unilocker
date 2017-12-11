
$(document).ready(function () {

    var MTDS = new METODOS();

    var user;

    var msgCampos = $("#msg1").iziModal({
        title: "¡Espera!",
        subtitle: "No has llenado todos los campos aún",
        iconText: '<i class="warning sign icon"></i>',
        headerColor: '#F2BE30',
        zindex: 2000,
        radius: 20,
        width: 600,
        timeout: 5000,
        timeoutProgressbar: true,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutDown',
        pauseOnHover: true
    });    
    var msgData = $("#msg2").iziModal({
        title: "¡Espera!",
        //subtitle: "Tu correo o contraseña no son correctos, intenta de nuevo. O tal vez aun no verifícas tu cuenta",
        iconText: '<i class="warning sign icon"></i>',
        headerColor: '#F2BE30',
        background:'#fff',
        zindex: 2000,
        radius: 20,
        width: 600,
        padding: 20,
        timeout: 5000,
        timeoutProgressbar: true,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutDown',
        pauseOnHover: true
    });


    $("#form-login input").keyup(function (event) {
        var mail = $('#mail').val();
        var pass = $('#pass').val();

        if (event.which == 13) {
            if (mail != '' && pass != '') {
                logIn(mail, pass);
            }
            else {
              msgCampos.iziModal('open'); 
            }
        }               
    });

    $('#btn-login').on('click', function () {
        var mail = $('#mail').val();
        var pass = $('#pass').val();

        if(mail != '' && pass != ''){
            logIn(mail,pass);
        }
        else{
            msgCampos.iziModal('open'); 
        }
        
    });
    
   // window.logIn = function (mail, pass) 

    function logIn(mail, pass) {

        var param = {action: "Login", mail:mail, pass:pass };

        $.ajax({
            type: "POST",
            url: domin,
            data: param,
            dataType: "json",
            async: true,

            success: function (response) {

                if (response == 0) {
                    msgData.iziModal('open'); 
                }
                else {
                    console.log('login');              
               
                    $.each(response, function (ind, obj) {
                        MTDS.SAVE_SESS(obj.id,obj.Nombres, obj.Apellidos,obj.Matricula,obj.idTipo,obj.Correo,obj.Contra,obj.Foto,obj.Locker,obj.Activo);
                        MTDS.LOGIN_SESS(obj.idTipo);
                    });
                }
            },

            error: function (e) {
                console.log(e);
                alertError.iziModal('open'); 
            }
        });

    };



});