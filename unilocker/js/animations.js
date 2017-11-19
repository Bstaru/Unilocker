$(document).ready(function (){

    //ANIMACION DEL INDEX -LOGIN-NEW
	var frmLog = $('#form-login');
	var frmNew = $('#form-new');

	$('#create-account').on('click',function(){

		frmLog.removeClass('fadeInLeft');
    	frmNew.removeClass('fadeOutRight');

		if(frmNew.hasClass('elem-hide')){

			frmLog.addClass('fadeOutLeft');
			setTimeout(function () {
		      frmLog.addClass('elem-hide');
		    }, 380);

			setTimeout(function () {
		      frmNew.removeClass('elem-hide');
		    }, 380);
		    frmNew.addClass('fadeInRight');
		}
		else{
		}

    });

    $('#return-login').on('click',function(){

    	frmLog.removeClass('fadeOutLeft');
    	frmNew.removeClass('fadeInRight');

		if(frmLog.hasClass('elem-hide')){

			frmNew.addClass('fadeOutRight');
			setTimeout(function () {
		      frmNew.addClass('elem-hide');
		    }, 380);			
		   
		    setTimeout(function () {
		      frmLog.removeClass('elem-hide');
		    }, 380); 
		    frmLog.addClass('fadeInLeft');
		}
		else{
		}

    });

    //ANIMACION DE HOME PRIMERA VEZ
        var cuadro1 = $('.comenzar-1');
        var cuadro2 = $('.comenzar-2');
        var cuadro3 = $('.comenzar-3');
        var cuadro4 = $('.comenzar-4');
        var cuadro5 = $('.comenzar-5');
        var cuadro6 = $('.comenzar-6');
        var cuadro7 = $('.comenzar-7');
        var cuadro8 = $('.comenzar-8');
        var cuadro9 = $('.comenzar-9');
    
        //setTimeout(function () {
        //    cuadro1.removeClass('elem-hide');
        //}, 380);
        //cuadro1.addClass('bounceIn');
        //('.cortina-negra').removeClass('elem-hide');

        $('#noquiero').on('click', function () {
            cuadro1.addClass('bounceOut');
            setTimeout(function () {
                cuadro1.addClass('elem-hide');
                $('.cortina-negra').addClass('elem-hide');
            }, 380);
        });
        $('#sig-1').on('click', function () {
            cuadro1.addClass('bounceOut');
            setTimeout(function () {
                cuadro1.addClass('elem-hide');
            }, 380);

            setTimeout(function () {
                cuadro2.removeClass('elem-hide');
            }, 380);
            cuadro2.addClass('bounceIn');
        });
        $('#sig-2').on('click', function () {
            cuadro2.addClass('bounceOut');
            setTimeout(function () {
                cuadro2.addClass('elem-hide');
            }, 380);

            setTimeout(function () {
                cuadro3.removeClass('elem-hide');
            }, 380);
            cuadro3.addClass('bounceIn');
        });
        $('#sig-3').on('click', function () {
            cuadro3.addClass('bounceOut');
            setTimeout(function () {
                cuadro3.addClass('elem-hide');
            }, 380);

            setTimeout(function () {
                cuadro4.removeClass('elem-hide');
            }, 380);
            cuadro4.addClass('bounceIn');
        });
        $('#sig-4').on('click', function () {
            cuadro4.addClass('bounceOut');
            setTimeout(function () {
                cuadro4.addClass('elem-hide');
            }, 380);

            setTimeout(function () {
                cuadro5.removeClass('elem-hide');
            }, 380);
            cuadro5.addClass('bounceIn');
        });
        $('#sig-5').on('click', function () {
            cuadro5.addClass('bounceOut');
            setTimeout(function () {
                cuadro5.addClass('elem-hide');
            }, 380);

            setTimeout(function () {
                cuadro6.removeClass('elem-hide');
            }, 380);
            cuadro6.addClass('bounceIn');
        });
        $('#sig-6').on('click', function () {
            cuadro6.addClass('bounceOut');
            setTimeout(function () {
                cuadro6.addClass('elem-hide');
            }, 380);

            setTimeout(function () {
                cuadro7.removeClass('elem-hide');
            }, 380);
            cuadro7.addClass('bounceIn');
        });
        $('#sig-7').on('click', function () {
            cuadro7.addClass('bounceOut');
            setTimeout(function () {
                cuadro7.addClass('elem-hide');
            }, 380);

            setTimeout(function () {
                cuadro8.removeClass('elem-hide');
            }, 380);
            cuadro8.addClass('bounceIn');
        });
        $('#sig-8').on('click', function () {
            cuadro8.addClass('bounceOut');
            setTimeout(function () {
                cuadro8.addClass('elem-hide');
            }, 380);

            setTimeout(function () {
                cuadro9.removeClass('elem-hide');
            }, 380);
            cuadro9.addClass('bounceIn');
        });
        $('#terminar').on('click', function () {
            cuadro9.addClass('bounceOut');
            setTimeout(function () {
                cuadro9.addClass('elem-hide');
                $('.cortina-negra').addClass('elem-hide');
            }, 380);
        });

        $('.tacha').on('click', function () {     
            setTimeout(function () {
                $('.cnt-cuadro-info').addClass('elem-hide');
                $('.cortina-negra').addClass('elem-hide');
            }, 380);
            $('.cnt-cuadro-info').addClass('bounceOut');
        });


    
});