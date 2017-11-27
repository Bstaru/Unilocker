$(document).ready(function () {

    //var MTDS = new METODOS();

    $('#numLocker').empty();
    $('#numLocker').append(objSess.locker);

    var cuadro1 = $('.comenzar-1');

    window.u_WalkT = function (id) {

        var param = {action: "WalkT", id: id };

        $.ajax({
            type: "POST",
            url: domin,
            data: param,
            async: true,

            success: function (response) {
                //console.log('adios tuto');
                //console.log(response);
            },

            error: function (e) {
                console.log(e);
                alertError.iziModal('open'); 
            }
        });

    };

    if (objSess.activo == 3) {
        console.log('el primero');

        setTimeout(function () {
            cuadro1.removeClass('elem-hide');
        }, 380);
        cuadro1.addClass('bouncein');

        $('.cortina-negra').removeClass('elem-hide');
    }
    else {
        u_WalkT(objSess.id);
    }
    $('#noquiero').on('click', function () {
        u_WalkT(objSess.id);
    });
    $('#terminar').on('click', function () {
        u_WalkT(objSess.id);
    });

    $('.tacha').on('click', function () {
        u_WalkT(objSess.id);
    });
});