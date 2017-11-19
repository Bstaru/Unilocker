

			
  $(function(){
    var includes = $('[data-include]');
    jQuery.each(includes, function(){
      var file = '../vistas/' + $(this).data('include') + '.html';
      $(this).load(file);
    });
  });



