

function load_menu() {
    var includes = $('[data-include]');
    jQuery.each(includes, function () {
        var file = 'vistas/' + $(this).data('include') + '.html';
        $(this).load(file);
    });
}

load_menu();

$(document).ready(function () {

    console.log(objSess);
    //debugger
    $('#nombrePerfilMenu').append(objSess.nombres);

    if (objSess.idtipo != 1) {
        $('#goHome').attr('href','home.html');
    }
    else {
        $('#goHome').attr('href', 'admin.html');
    }

    $('#CerrarSesion').on('click', function () {
        sessionStorage.removeItem("UserSession");
        window.location.href = "index.html";
    });

});






