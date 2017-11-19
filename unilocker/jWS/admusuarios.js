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

    var ModalPen = $("#Modal_con").iziModal({
        title: 'Convertir Administrador',
        subtitle: '.',
        headerColor: '#46acc2',
        zindex: 2000,
        padding: 20,
        width: 800,
    });

    var btnAceptarRenta = $("#SeRento").iziModal({
        title: "¡Listo!",
        subtitle: 'El usuario ahora es administrador',
        iconText: '<i class="checkmark icon"></i>',
        headerColor: '#4cae4c',
        width: 600,
        timeout: 5000,
        timeoutProgressbar: true,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutDown',
        pauseOnHover: true
    });

    var btnSehizo = $("#SeRento2").iziModal({
        title: "¡Listo!",
        subtitle: 'Se creo el nuevo usuario administrador.',
        iconText: '<i class="checkmark icon"></i>',
        headerColor: '#4cae4c',
        width: 600,
        timeout: 5000,
        timeoutProgressbar: true,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutDown',
        pauseOnHover: true
    });

    function bindBTNROW_A() {

        $.each(Usuarios, function (index, value) {

            $('#EdU-' + value.id).unbind();
            $('#EdU-' + value.id).unbind().click(function () {
                $('#NombreUs').empty();
                $('#NombreUs').append(value.Nombre);
                $('#SiAdmin').attr('idRegistro', value.id);

                ModalPen.iziModal('open');
            });

        });
    }

    window.s_UsuariosNoAdmin = function () {

        var param = {action:"rptNotAdmins"};

        $.ajax({
            type: "POST",
            url: domin,
            data: param,
            dataType: "json",

            success: function (response) {

                var arr = new Array();
                Usuarios = response;

                $.each(response, function (indx, obj) {

                    var act = '';

                    var imagenU = '';
                    if (obj.Foto != 'NADA') {
                        imagenU = '<img src="' + obj.Foto + '" class="img-profile_t img-responsive" id="">';
                    }
                    else{
                        imagenU = '<img src="imgs-profile/default.png" class="img-profile_t img-responsive" id="">';
                    }                       

                    var OBJ = [obj.id, imagenU, obj.Nombre, obj.Matricula, obj.Correo];
                    arr.push(OBJ);
                   
                });
                
                var table = $('#tbl_u_edit').DataTable({
                    language: spanish,
                    searching: true,
                    destroy: true,
                    info: false,
                    pageLength:3,
                    paging: true,
                    dom: 'Bfrtip',
                    buttons: ['excel'],
                    responsive: true,
                    data: arr,
                    columns: [{ 'Locker': 'Locker' }, { 'Precio': 'Precio' }, { 'Estado': 'Estado' }, { 'Usuario': 'Usuario' },
                    { 'Usuario': 'Usuario' }, 
                     {
                         "mData": null,
                         "bSortable": false,
                         "mRender": function (o) {
                             return '<div class="text-center">'
                                     + '<div id="EdU-' + o[0] + '" class="btn btn-info EdU-' + o[0] + '"><i class="write icon"></i>'
                                     + '</div>';
                         }
                     }],
                });;

                table.on('draw.dt', function () {
                    bindBTNROW_A();
                });

                 bindBTNROW_A();

            },

            error: function (e) {
                console.log(e);
            }
        });

    };

    window.u_CambiarTipo = function (idUsuario) {

        var param = {action:"rptCambiarTipo", id: idUsuario };

        $.ajax({
            type: "POST",
            url: domin,
            data: param,

            success: function (response) {
                console.log(response);
                s_UsuariosNoAdmin();
                ModalPen.iziModal('close');
                btnAceptarRenta.iziModal('open');
            },

            error: function (e) {
                console.log(e);
            }
        });

    };

    $('#GuardarData').on('click', function () {

        var nombres = $('#nombre_add').val();
        var apellidos = $('#apellidos_add').val();
        var matricula = $('#mat_add').val();
        var correo = $('#correo_add').val();
        var contra = $('#correo_add_1').val();
        var contraCon = $('#correo_add_2').val();

        if (nombres != '' && apellidos != '' && matricula != '' && correo != '' && contra != '' && contraCon != '') {
            if (contraCon == contra) {
                i_usuario_adm(nombres, apellidos, matricula, correo, contra);
            }
            else {
                swal("¡Espera!", "Las contraseñas no son iguales", "warning");
            }
        }
        else {
            swal("¡Alto ahí!", "No has llenado todos los campos aún", "warning");
        }

    });

    window.i_usuario_adm = function (Nombres, Apellidos, Matricula, Correo, Contra) {

        var param = {action:"NewAdmin", name: Nombres, last: Apellidos, 
            mat: Matricula, mail: Correo, pass: Contra };

        $.ajax({
            type: "POST",
            url: domin,
            data: param,
            //async: false,

            success: function (response) {
                console.log(response);
                btnSehizo.iziModal('open');
            },

            error: function (e) {
                console.log(e);
            }
        });

    };

    $('#cancelar').on('click', function () {
        ModalPen.iziModal('close');
    });

    $('#SiAdmin').on('click', function () {
        u_CambiarTipo($('#SiAdmin').attr('idRegistro'));
    });

    s_UsuariosNoAdmin();
});