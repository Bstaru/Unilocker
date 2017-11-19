$(document).ready(function () {

    var MTDS = new METODOS();  
    var fecha = MTDS.TODAY();

    var UserSess = function () {
        this.id = "";
        this.nombres = "";
        this.apellidos = "";
        this.matricula = "";
        this.idtipo = "";
        this.correo = "";
        this.contra = "";
        this.foto = "";
        this.locker = "";
    }
    function GuardaSess(id, nom, ape, mat, tipo, cor, con, foto, locker) {

        var user = new UserSess();

        user.id = id;
        user.nombres = nom;
        user.apellidos = ape;
        user.matricula = mat;
        user.idtipo = tipo;
        user.correo = cor;
        user.contra = con;
        user.foto = foto;
        user.locker = locker;

        sessionStorage.setItem('UserSession', JSON.stringify(user));
    }
    function DatosInputs() {
    var objSess = JSON.parse(sessionStorage.getItem("UserSession"));
    $('#userNN').attr('value', objSess.id);
    $('#GuardarData_1').attr('idUser', objSess.id);
    $('#GuardarData_2').attr('idUser2', objSess.id)
    $('#nombre_edit').val(objSess.nombres);
    $('#apellidos_edit').val(objSess.apellidos);
    $('#mat_edit').val(objSess.matricula);
    $('#correo_edit').val(objSess.correo);
    }

    window.u_Usuario = function (Idu, Nombres, Apellidos, Matricula, Correo, Foto) {

        var param = {action:"upUsuario",
        id:Idu, name: Nombres, 
        last: Apellidos, mat: Matricula, 
        mail: Correo, pic: Foto };

        $.ajax({
            type: "POST",
            url: domin,
            data:param,

            success: function (data) {
                swal("¡Bien!", "Se actualizaron tus datos.", "success", { button: "Ok" });
                //window.location.href = "home.html";
            },

            error: function (e) {
                console.log(e);
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
                swal("¡Bien!", "Se actualizaró tu contraseña.", "success", { button: "Ok" });
                //window.location.href = "home.html";
            },

            error: function (e) {
                console.log(e);
            }
        });

    };
    window.s_usuarioUpdate = function (idu) {

        var param = {action:"selSeccion", idu: idu };

        $.ajax({
            type: "POST",
            url: domin,
            data:param,
            dataType: "json",

            success: function (response) {
                $.each(response, function (indx, obj) {
                    sessionStorage.removeItem("UserSession");
                    GuardaSess(obj.id,obj.Nombres, obj.Apellidos,obj.Matricula,obj.idTipo,obj.Correo,obj.Contra,obj.Foto,obj.Locker,obj.Activo);
                });
                DatosInputs();
            },

            error: function (e) {
                console.log(e);
            }
        });

    };

    //window.UploadImage = function (img, UserID) {

    //    var param = { img: img, UserID: UserID };

    //    $.ajax({
    //        type: "POST",
    //        url: domin + "/s_usuarioUpdate",
    //        data: JSON.stringify(param),
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",

    //        success: function (data) {
    //            console.log('imagen guardada');
    //        },

    //        error: function (e) {
    //            console.log(e);
    //        }
    //    });

    //};
    //$('#GuardarData_1').on('click', function () {
    //    var foto = $('#filePhoto').val();
    //    UploadImage(foto);
    //});

    DatosInputs();

    $('#GuardarData_1').on('click', function () {

        var foto = $('#filePhoto').val();

        u_Usuario($('#GuardarData_1').attr('idUser'), $('#nombre_edit').val(), $('#apellidos_edit').val(),
            $('#mat_edit').val(), $('#correo_edit').val(), foto);
        s_usuarioUpdate($('#GuardarData_1').attr('idUser'));
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
            swal("¡Espera!", "Las contraseñas no son iguales.", "warning", { button: "Ok" });
        }

       
    });
});