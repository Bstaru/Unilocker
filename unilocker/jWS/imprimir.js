$(document).ready(function () {

    var MTDS = new METODOS();

    var dataImp;

    var url_conp = MTDS.GET_URL_PARAM('Concepto');
    var url_user = MTDS.GET_URL_PARAM('id');
    var url_lock = MTDS.GET_URL_PARAM('idl');    

    window.s_DataImprimir = function (idUser, idLock, Conp) {

        var param = {action:"selDataimpreso", idU: idUser, idl: idLock, con: Conp };

        $.ajax({
            type: "POST",
            url: domin,
            data: param,
            dataType: "json",

            success: function (response) {
                var arr = new Array();
                dataImp = response;

                $('.tipoD').empty();
                $('#bodyImp').empty();

                $.each(response, function (indx, obj) {
                    var OBJ = [obj.Fecha,obj.Folio,obj.id,obj.Nombres,obj.Apellidos,obj.Matricula,obj.Numero,obj.Precio,obj.Condepto,obj.EstadoLocker];
                    arr.push(OBJ);
                    $('.tipoD').append(obj.Concepto);
                    $('#bodyImp').append(
                        '<div class="FechaRenta">' + MTDS.CAST_DATE(obj.Fecha) + '</div>' +
                        '<div class="FolioRenta"><span>Folio: #</span>' + obj.Folio + '</div>' +
                        '<div class="NombreCompleto"><span>Nombre: </span>' + obj.Nombres + ' ' + obj.Apellidos + '</div>' +
                        '<div class="Matricula"><span>Matrícula: </span>' + obj.Matricula + ' </div>' +
                        '<div class="NumeroLocker"><span>Número de locker: </span>' + obj.Numero + '</div>' +
                        '<div class="PrecioLocker"> <span>Precio: </span>$' + obj.Precio + '</div>'
                        );
                });
                //console.log(arr);
            },

            error: function (e) {
                console.log(e);
            }
        });

    };


    s_DataImprimir(url_user, url_lock, url_conp);

});