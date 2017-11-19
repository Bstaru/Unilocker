$(document).ready(function () {

    var domin = 'webservice/wsUnilocker.asmx';
    var MTDS = new METODOS();

    var url_corr = MTDS.GET_URL_PARAM('correo');

    window.u_VerificarUser = function (Correo) {

        var param = { Correo: Correo};

        $.ajax({
            type: "POST",
            url: domin + "/u_VerificarUser",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (data) {
                console.log('se verifico');
            },

            error: function (e) {
                console.log(e);
            }
        });

    };

    u_VerificarUser(url_corr);
});