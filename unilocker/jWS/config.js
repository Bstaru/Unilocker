$(document).ready(function () {

    var MTDS = new METODOS();  
    var fecha = MTDS.TODAY();
    var lafoto = MTDS.GET_URL_PARAM('archivo');

    console.log(lafoto);

   

    var btnOk = $("#msgok").iziModal({
        title: "¡Perfecto!",
        subtitle: 'Tus datos han sido actualizados',
        iconText: '<i class="checkmark icon"></i>',
        headerColor: '#4cae4c',
        width: 600,
        timeout: 5000,
        timeoutProgressbar: true,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutDown',
        pauseOnHover: true,
        onClosing: function(){
            location.reload();
        },
    });

    var msgPss  = $("#msgpss").iziModal({
        title: "¡Espera!",
        subtitle: "Las contraseñas no son iguales.",
        iconText: '<i class="warning sign icon"></i>',
        headerColor: '#F2BE30',
        zindex: 2000,
        radius: 20,
        width: 600,
        timeout: 5000,
        timeoutProgressbar: true,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutDown',
        pauseOnHover: true
    });

    function DatosInputs() {    
        $('#userNN').attr('value', objSess.id);
        $('#GuardarData_1').attr('iduser', objSess.id);
        $('#img_per').attr('src',objSess.foto);
        $('#savePP').attr('value', objSess.id);
        $('#GuardarData_2').attr('iduser2', objSess.id)
        $('#nombre_edit').val(objSess.nombres);
        $('#apellidos_edit').val(objSess.apellidos);
        $('#mat_edit').val(objSess.matricula);
        $('#correo_edit').val(objSess.correo);
    }
    window.u_Usuario = function (Idu, Nombres, Apellidos, Matricula, Correo) {

        var param = {action:"upUsuario",
        id:Idu, name: Nombres, 
        last: Apellidos, mat: Matricula, 
        mail: Correo};

        $.ajax({
            type: "POST",
            url: domin,
            data:param,

            success: function (response) {
                btnOk.iziModal('open');
            },

            error: function (e) {                
                console.log(e);
                btnErr.iziModal('open');
            }
        });
    };
   
    window.u_Contra = function (Idu, Contra) {

        var param = {action:"upContra", id: Idu, pass: Contra};

        $.ajax({
            type: "POST",
            url: domin,
            data:param,

            success: function (response) {
                btnOk.iziModal('open');
            },

            error: function (e) {
                console.log(e);
                btnErr.iziModal('open');               
            }
        });
    };
    window.s_usuarioUpdate = function (idu) {

        var param = {action:"selUsuarioUp", id: idu };

        $.ajax({
            type: "POST",
            url: domin,
            data:param,
            dataType: "json",

            success: function (response) {
                $.each(response, function (indx, obj) {                  
                    MTDS.SAVE_SESS(obj.id,obj.Nombres, obj.Apellidos,obj.Matricula,obj.idTipo,obj.Correo,obj.Contra,obj.Foto,obj.Locker,obj.Activo);
                });
            },

            error: function (e) {
                console.log(e);
            }
        });

    }; 

    if (lafoto != '') {     
        DatosInputs();     
        s_usuarioUpdate($('#GuardarData_1').attr('iduser'));    
        $('#img_per').attr('src',lafoto); 
    }
    else{
        //s_usuarioUpdate($('#GuardarData_1').attr('iduser'));    
        DatosInputs();   
    }  

    $('#GuardarData_1').on('click', function () {

        u_Usuario(  $('#GuardarData_1').attr('idUser'), 
                    $('#nombre_edit').val(),
                    $('#apellidos_edit').val(),
                    $('#mat_edit').val(), 
                    $('#correo_edit').val());       

        //sessionStorage.removeItem("UserSession");    
        $("#FotoForm").submit();
    });

    $('#GuardarData_2').on('click', function () {

        var contra1 = $('#correo_edit_1').val();
        var contra2 = $('#correo_edit_2').val();

        if(contra1 == contra2){
            u_Contra($('#GuardarData_2').attr('idUser2'), $('#correo_edit_2').val());
            s_usuarioUpdate($('#GuardarData_1').attr('idUser'));
            $('#correo_edit_1').val('');
            $('#correo_edit_2').val('');
        }
        else {
            //swal("¡Espera!", "Las contraseñas no son iguales.", "warning", { button: "Ok" });
            msgPss.iziModal('open');
        }    
       
    });
});