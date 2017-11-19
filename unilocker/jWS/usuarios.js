$(document).ready(function () {

    var MTDS = new METODOS();

    var Usuarios;

    var spanish = {
        "sProcessing": "Procesando...",
        "sLengthMenu": "Mostrar _MENU_ registros",
        "sZeroRecords": "No encontramos resultados",
        "sEmptyTable": "No encontramos ningún registro",
        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix": "",
        "sSearch": "Buscar:",
        "sUrl": "",
        "sInfoThousands": ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst": "Primero",
            "sLast": "Último",
            "sNext": "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    }

    window.s_todoUsuarios = function () {

        var param = {action:"rptTodosUsers"};

        $.ajax({
            type: "POST",
            url: domin,
            data: param,
            dataType: "json",

            success: function (response) {

                var arr = new Array();
                Reporte = response;

                var NombreUrsuario = '';

                $.each(response, function (indx, obj) {

                    var act = '';

                    if (obj.Activo == true) {
                        act = '<i class="check circle icon"></i>';
                    }
                    else {
                        act = '<i class="remove circle icon"></i>'
                    }
                    var imagenU = '';
                    if (obj.Foto != 'NADA') {
                        imagenU = '<img src="' + obj.Foto + '" class="img-profile_t img-responsive" id="">';
                        }
                    else{
                        imagenU = '<img src="imgs-profile/default.png" class="img-profile_t img-responsive" id="">';
                        }                       

                    var OBJ = [obj.id, imagenU, obj.Nombre, obj.Matricula, obj.Correo,obj.Tipo, act];
                    arr.push(OBJ);
                   
                });
                
                var table = $('#tbl_Usuarios').DataTable({
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
                    columns: [{ 'Locker': 'Locker' }, { 'Precio': 'Precio' }, { 'Estado': 'Estado' }, { 'Usuario': 'Usuario' },
                    { 'Usuario': 'Usuario' }, { 'Usuario': 'Usuario' }, { 'Usuario': 'Usuario' }],
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

    //$('#Busqueda_tipo').on('change', function () {
    //    var tipo = $(this).val();
    //    s_ReporteLockers_Tipo(tipo);
    //});

    s_todoUsuarios();
});