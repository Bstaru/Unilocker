$(document).ready(function () {

    var MTDS = new METODOS();

    var msgCampos = $("#msgCampos").iziModal({
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

    var msgPss  = $("#msgpss").iziModal({
        title: "¡Espera!",
        subtitle: "Las contraseñas no son iguales.",
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

    $('#newUser').on('click', function () {

        var nombres = $('#nName').val();
        var apellidos = $('#nLast').val();
        var matricula = $('#nMat').val();
        var correo = $('#nMail').val();
        var contra = $('#nPass').val();
        var contraCon = $('#nConPass').val();

        if (nombres != '' && apellidos != '' && matricula != '' && correo != '' && contra != '' && contraCon != '') {
            if (contraCon == contra) { 
                $('#newUserUp').removeClass('elem-hide');              
                i_usuario_reg(nombres, apellidos, matricula, correo, contra);                              
            }
            else {
                msgCampos.iziModal('open');
                //swal("¡Espera!", "Las contraseñas no son iguales", "warning");
            }
        }
        else {
            msgPss.iziModal('open'); 
            //swal( "¡Alto ahí!", "No has llenado todos los campos aún", "warning" );
        }
        
    });

    window.i_usuario_reg = function (Nombres, Apellidos, Matricula, Correo, Contra) {

        var param = { action: "NewUser",
                    name: Nombres,
                    last: Apellidos,
                    mat: Matricula,
                    mail: Correo,
                    pass: Contra };

        $.ajax({
            type: "POST",
            url: domin,
            data: param,
            //dataType: "json",
            async: true,

            success: function (response) {
                console.log(response);
                window.location.href = "new-msg.html";
            },

            error: function (e) {
               console.log(e);
                alertError.iziModal('open'); 
            }
        });

    };
});