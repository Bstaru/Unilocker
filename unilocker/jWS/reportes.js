$(document).ready(function () {

    var MTDS = new METODOS();

    var Reporte;
    
    window.s_ReporteLockers_Tipo = function (concepto) {

        var param = {action:"rptLockersTipo", concepto: concepto };

        $.ajax({
            type: "POST",
            url: domin,
            data: param,
            dataType: "json",

            success: function (param) {

                var arr = new Array();
                Reporte = param;

                var NombreUrsuario = '';

                $.each(param, function (indx, obj) {
                    if ((obj.Usuario).match("^Admin")) {
                        NombreUrsuario = 'Nadie';
                    }
                    else {
                        NombreUrsuario = obj.Usuario;
                    }
                    var OBJ = [obj.Numero, obj.Precio, obj.Estado, NombreUrsuario];
                    arr.push(OBJ);

                   
                });
                
                var table = $('#tbl_Reportes').DataTable({
                    language: spanish,
                    searching: true,
                    destroy: true,
                    info: false,
                    pageLength: 5,
                    paging: true,
                    dom: 'Bfrtip',
                    buttons: ['excel'],
                    responsive: true,
                    data: arr,
                    columns: [{ 'Locker': 'Locker' }, { 'Precio': 'Precio' }, { 'Estado': 'Estado' }, { 'Usuario': 'Usuario' }],
                });;

                table.on('draw.dt', function () {
                    // bindBTNROW_P();
                });

                // bindBTNROW_P();

            },

            error: function (e) {
                console.log(e);
            }
        });

    };

    $('#Busqueda_tipo').on('change', function () {
        var tipo = $(this).val();
        s_ReporteLockers_Tipo(tipo);
    });

    s_ReporteLockers_Tipo(0);
});