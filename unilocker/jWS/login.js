(function ($, document, undefined) {

    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return unRfc2068(decodeURIComponent(s.replace(pluses, ' ')));
    }

    function unRfc2068(value) {
        if (value.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape
            value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        return value;
    }

    function fromJSON(value) {
        return config.json ? JSON.parse(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (value === null) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        var result = key ? null : {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = decode(parts.join('='));

            if (key && key === name) {
                result = fromJSON(cookie);
                break;
            }

            if (!key) {
                result[name] = fromJSON(cookie);
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== null) {
            $.cookie(key, null, options);
            return true;
        }
        return false;
    };

})(jQuery, document);


$(document).ready(function () {

    var user;

    var Usuario = function () {
        this.email = "";
        this.password = "";
    }
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
        this.activo = "";
    }
/////////////////////////////////////////
    $("#form-login input").keyup(function (event) {
        var mail = $('#mail').val();
        var pass = $('#pass').val();

        if (event.which == 13) {
            if (mail != '' && pass != '') {
                logIn(mail, pass);
            }
            else {
                swal("¡Espera!", "No has llenado todos los campos", "warning", {
                    button: "Ok",
                    closeOnClickOutside: true,
                    closeOnEsc: true
                });
            }
        }               
    });

    $('#btn-login').on('click', function () {
        var mail = $('#mail').val();
        var pass = $('#pass').val();

        if(mail != '' && pass != ''){
            logIn(mail,pass);
        }
        else{
            swal("¡Espera!", "No has llenado todos los campos", "warning", {
                button: "Ok",
                closeOnClickOutside: true,
                closeOnEsc: true
            });
        }
        
    });
    
    function logIn(mail, pass) {

        var param = {action: "Login", mail:mail, pass:pass };
       
        $.ajax({
            type: "POST",
            url: domin,
            data: param,
            dataType: "json",
            async: true,

            success: function (response) {

                if (response == 0) {
                    console.log('vacio');
                    swal("¡Espera!", "Tu correo o contraseña no son correctos, intenta de nuevo. O tal vez aun no verifícas tu cuenta", "warning", {
                        button: "Ok",
                        closeOnClickOutside: true,
                        closeOnEsc: true
                    });
                }
                else {
                    console.log('login');              
               
                    $.each(response, function (ind, obj) {
                        GuardaSess(obj.id,obj.Nombres, obj.Apellidos,obj.Matricula,obj.idTipo,obj.Correo,obj.Contra,obj.Foto,obj.Locker,obj.Activo);
                    });

                    GuardaSession(response);
                }
            },

            error: function (e) {
                console.log(e);
                //window.location.href = "index.html";
            }
        });

    };

    function GuardaSession(OBJSSN) {
        $.cookie('unissn', JSON.stringify(OBJSSN));

        window.location.href = "home.html";

        var obj = $.cookie("unissn");
        console.log(obj);

        obj = JSON.parse(obj);
        console.log(obj.Usuario);

        var jsonSess = sessionStorage.getItem("UserSession");
        var objSess = JSON.parse(jsonSess);

        if (objSess.idtipo != 1) {
            window.location.href = "home.html";
        }
        else {
            window.location.href = "admin.html";
        }
    }

    function GuardaSess(id,nom,ape,mat,tipo,cor,con,foto,locker,act) {

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
        user.activo = act;

        sessionStorage.setItem('UserSession', JSON.stringify(user));
    }

});