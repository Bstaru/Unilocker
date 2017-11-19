
var domin = 'php/wsUnilocker.php';
var objSess = JSON.parse(sessionStorage.getItem("UserSession"));

var METODOS = function () {

    this.FULLER_COMBO = function (COMBO_ID, DATA) {

        $('#' + COMBO_ID).empty();
        $.each(DATA, function (indx, obj) {

            if (obj.Nombre) {
                $('#' + COMBO_ID).append('<option value="' + obj.id + '">' + obj.Nombre + '</option>');
            }
            if (obj.Matricula) {
                $('#' + COMBO_ID).append('<option value="' + obj.id + '">' + obj.Matricula + '</option>');
            }
            if (obj.Numero) {
                $('#' + COMBO_ID).append('<option value="' + obj.id + '">' + obj.Numero + '</option>');
            }
        });

        $('#' + COMBO_ID).selectpicker('refresh');
    };

    this.FULLER_LEFT = function (Char, cantTTL, Cadena) {
        if (Cadena.length < cantTTL) {
            var diff = cantTTL - Cadena.length;
            for (var i = 0; i < diff; i++) {
                Cadena = Char + Cadena;
            }
        }
        return Cadena;
    };
    this.CAST_DATE = function (Fecha) {
        var milli = Fecha.replace(/\/Date\((-?\d+)\)\//, '$1');
        var d = new Date(parseInt(milli));

        var SP = '-';
        /*//console.log(d.getDate());
        //console.log(d.getMonth());
        //console.log(d.getYear());*/

        return d.getFullYear() + SP +
        			this.FULLER_LEFT('0', 2, (d.getMonth() + 1) + '') + SP +
        			this.FULLER_LEFT('0', 2, d.getDate() + '');

        //return d.toLocaleDateString();
    };
    this.CAST_HOUR = function (Fecha) {
        var milli = Fecha.replace(/\/Date\((-?\d+)\)\//, '$1');
        var d = new Date(parseInt(milli));

        var SP = '/';
        Fecha = Fecha.split(' ', 1);
        Fecha = Fecha[0].split('/');

        return d.toLocaleTimeString(); //Fecha[2] + SP + Fecha[1] + SP + Fecha[0];		
    };
    this.COMMA = function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    this.TODAY = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        mm = (mm + '').length > 1 ? mm : '0' + mm;
        dd = (dd + '').length > 1 ? dd : '0' + dd;

        hoy = yyyy + '-' + mm + '-' + (dd);

        return hoy;
    };
    this.TODAY_PLUS = function (Dias) {
        var today = new Date();
        today.setDate(today.getDate() + Dias);
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        mm = (mm + '').length > 1 ? mm : '0' + mm;
        dd = (dd + '').length > 1 ? dd : '0' + dd;

        hoy = yyyy + '-' + mm + '-' + (dd);

        return hoy;
    };
    this.GET_WEEK = function () {
        var d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
    };

    this.GET_URL_PARAM = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

}