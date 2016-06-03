jQuery(document).ready(function () {
      
      if (jQuery('.question').length > 0 )
      {      
         
          jQuery('.question').click(function() {
              if(jQuery(this).next().is(':hidden') != true) {
                jQuery(this).removeClass('selected-t'); 
                jQuery(this).next().slideUp("normal");
              } else {
                jQuery('.question').removeClass('selected-t');  
                jQuery('.answer').slideUp('normal');
                
                if(jQuery(this).next().is(':hidden') == true) {
                    jQuery(this).addClass('selected-t');
                    jQuery(this).next().slideDown('normal');
                }   
              }
          });

      }
});
