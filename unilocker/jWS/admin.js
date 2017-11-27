$(document).ready(function () {

    //var MTDS = new METODOS();

    var ResumenData;

    window.s_Resumen = function () {

        var param = {action:"selResumen"}

        $.ajax({
            type: "POST",
            url: domin,
            data: param,
            dataType: "json",

            success: function (response) {

                var arr = new Array();
                ResumenData = response;

                $('#Resumen').empty();

                $.each(response, function (indx, obj) {
                    var OBJ = [obj.Folio, obj.Nombres, obj.Numero, obj.Concepto, obj.Estado, obj.Fecha];
                    arr.push(OBJ);
                
                    var ICON = '';
                    var TEXTO = '';
                    switch (obj.Concepto) {
                        case 'Rentar':
                            ICON = '<i class="plus icon"></i> ';//RENTAR 
                            TEXTO = '<h4>Nuevo Locker</h4>';
                            break;
                        case 'Renovar':
                            ICON = '<i class="refresh icon"></i> ';//RENOVAR 
                            TEXTO = '<h4>Renovar</h4>';
                            break;
                        case 'Apartar':
                            ICON = '<i class="wait icon"></i> ';//APARTAR 
                            TEXTO = '<h4>Apartado</h4>';
                            break;
                        case 'Cancelar':
                            ICON = '<i class="remove icon"></i> ';//CANCELAR 
                            TEXTO = '<h4>Cancelar</h4>';
                            break;

                        case 'Rentado':
                            ICON = '<i class="plus icon"></i> ';//RENTAR 
                            TEXTO = '<h4>Locker rentado</h4>';
                            break;
                        case 'Renovado':
                            ICON = '<i class="refresh icon"></i> ';//RENOVAR 
                            TEXTO = '<h4>Renovado</h4>';
                            break;
                        case 'Cancelado':
                            ICON = '<i class="remove icon"></i> ';//CANCELAR 
                            TEXTO = '<h4>Cancelado</h4>';
                            break;

                        default:
                            ICON = '<i class="plus icon"></i> ';//RENTAR 
                            break;
                    }

                    var ESTATUS = '';
                    switch (obj.Estado) {
                        case 'Ocupado':
                            ESTATUS = '<h5 class="pagado">RENTADO</h5>';//OCUPADO 
                            break;
                        case 'Libre':
                            ESTATUS = '<h5 class="cancelado">LIBRE</h5>';//LIBRE 
                            break;
                        case 'Apartado':
                            ESTATUS = '<h5 class="pendiente">APARTADO</h5>';//APARTARDO
                            break;
                        case 'Renovar':
                            ESTATUS = '<h5 class="pagado">RENOVADO</h5>';//RENOVAR 
                            break;
                        case 'Cancelar':
                            ESTATUS = '<h5 class="cancelado">CANCELAR</h5>';//RENOVAR 
                            break;
                        default:
                            ESTATUS = '<h5 class="cancelado">Estatus</h5>';//RENTAR 
                            break;
                    }

                    $('#Resumen').append(
                        '<div class="cnt-res-body">'+
                            '<div class="col-xs-4 cnt-res-tipo">'+
                               ICON +
                            '</div>'+
                            '<div class="col-xs-8 cnt-res-data">'+
                              '<span>#' + obj.Numero + '</span>' +
                              //'<h4>Usuario: '+obj.Usuario+'</h4>' +
                              TEXTO+
                              ESTATUS+
                            '</div>'+
                          '</div>');

                });

            },

            error: function (e) {
                console.log(e);
                alertError.iziModal('open'); 
            }
        });

    };

    s_Resumen();

});