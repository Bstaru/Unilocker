$(document).ready(function () {

    var MTDS = new METODOS();

	var fecha = MTDS.TODAY();
 
    var Reporte;

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

	var ModalPen = $("#Modal_pendientes").iziModal({
	    title: 'Aceptar | Liberar LOCKER',
	    subtitle: '.',
	    headerColor: '#46acc2',
	    zindex: 2000,
	    padding: 20,
	    width: 800,
	});

	var btnAceptarRenta = $("#SeRento").iziModal({
	    title: "¡Listo!",
	    subtitle: 'El locker se ha confirmado',
	    iconText: '<i class="checkmark icon"></i>',
	    headerColor: '#4cae4c',
	    width: 600,
	    timeout: 5000,
	    timeoutProgressbar: true,
	    transitionIn: 'fadeInDown',
	    transitionOut: 'fadeOutDown',
	    pauseOnHover: true
	});

	function bindBTNROW_P() {

	    $.each(Reporte, function (index, value) {

	        $('#EdL-' + value.Folio).unbind();
	        $('#EdL-' + value.Folio).unbind().click(function () {

	            $('#folio_pen').empty();
	            $('#locker_pen').empty();
	            $('#precio_pen').empty();
	            $('#usuario_pen').empty();
	            $('#tipo_pen').empty();

	            $('#Pagado').attr('idRegistro', value.Folio);
	            $('#Liberar').attr('idRegistro', value.Folio);

	            $('#folio_pen').append(value.Folio); 
	            $('#locker_pen').append(value.Numero); 
	            $('#precio_pen').append(value.Precio);
	            $('#usuario_pen').append(value.Usuario); $('#usuario_pen').attr('idU', value.idU);
	            $('#tipo_pen').append(value.Concepto); $('#tipo_pen').attr('tipo', value.Concepto);

	            ModalPen.iziModal('open');
	        });

	    });
	}

	window.s_Pendientes = function () {
        
        var param ={action:"Pendientes"};

	    $.ajax({
	        type: "POST",
	        url: domin,
	        data: param,
	        dataType: "json",

	        success: function (response) {

	            var arr = new Array();
	            Reporte = response;

	            $.each(response, function (indx, obj) {
	                var OBJ = [obj.Folio, obj.Fecha ,obj.Concepto, obj.Numero, obj.Precio, obj.Usuario];
	                arr.push(OBJ);
	            });

	            var table = $('#tbl_Pendientes').DataTable({
	                language: spanish,
	                searching: true,
	                destroy: true,
	                info: false,
	                pageLength: 5,
	                paging: true,
	                dom: 'Bfrtip',
	                buttons: [],
	                responsive: true,
	                data: arr,
	                columns: [{ 'folio': 'folio' }, { 'fecha': 'fecha' }, { 'fecha': 'fecha' },
                        { 'Locker': 'Locker' }, { 'Precio': 'Precio' }, { 'Usuario': 'Usuario' },
                        {
                            "mData": null,
                            "bSortable": false,
                            "mRender": function (o) {
                                return '<div class="text-center">'
                                        + '<div id="EdL-' + o[0] + '" class="btn btn-info EdL-' + o[0] + '"><i class="plus icon"></i></div>'
                                        +'</div>';
                            }
                        }
	                ],
	            });;

	            table.on('draw.dt', function () {
	                 bindBTNROW_P();
	            });

	             bindBTNROW_P();

	        },

	        error: function (e) {
	            console.log(e);
	        }
	    });

	};

	window.u_Aceptar = function (Folio, Rentador, Comentarios, Usuario, Fecha, tipo) {

		debugger

	    var param = {
	        action:"Aceptar",
	        folio: Folio, 
	        rent: Rentador, 
	        com: Comentarios, 
	        user: Usuario, 
	        day: Fecha,
	        conc: tipo
	    };

	    $.ajax({
	        type: "POST",
	        url: domin,
	        data:param,

	        success: function (response) {	           
	            s_Pendientes();
	            ModalPen.iziModal('close');
	            btnAceptarRenta.iziModal('open');
	        },

	        error: function (e) {
	            console.log(e);
	        }
	    });

	};

	s_Pendientes();

	$('#Pagado').on('click', function () {

	    var comment = $('#comment_aceptar').val();
	    var tipo = $('#tipo_pen').attr('tipo')

	    var checkCom = '';
	    if (comment == '') { checkCom = '-'; }
	    else { checkCom = comment; }

	    var checkTipo = '';
	    if (tipo == 'Apartar') { checkTipo = 'Rentado'; }
	    else if (tipo == 'Renovar') { checkTipo = 'Renovado'; }
	    else if (tipo == 'Cancelar')  { checkTipo = 'Cancelado' }

	    u_Aceptar($('#Pagado').attr('idRegistro'), objSess.id, checkCom, $('#usuario_pen').attr('idU'), fecha, checkTipo);
	});
});