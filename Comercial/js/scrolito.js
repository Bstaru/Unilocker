 $(document).ready(function (){

    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 2000);
        }
    });


  $('.ico').css('opacity', 0);
 
  $('#nosotros').waypoint(function() {
      $('.ico').addClass('jackInTheBox');
  }, 

  { offset: '50%' });

   $('.imgLocker').css('opacity', 0);
   $('.dataInfoRen').css('opacity', 0);
 
  $('#rentar').waypoint(function() {
      $('.imgLocker').addClass('fadeInRight');
      $('.dataInfoRen').addClass('fadeInLeft');
  }, 

  { offset: '50%' });

   $('.coso').css('opacity', 0);
 
  $('#contacto').waypoint(function() {
      $('.coso').addClass('fadeInUp');
  }, 

  { offset: '50%' });


 });

