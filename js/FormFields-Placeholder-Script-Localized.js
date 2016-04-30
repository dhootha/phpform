jQuery( document ).ready(function() {

	var formInputFields = jQuery("input[type='text']");
	var formSelectFields = jQuery("select");       

	//change email input type to email for mobile keyboards acceibility

	if (jQuery("#pro_email").length > 0 ){
		jQuery("#pro_email").prop("type", "email");
	}
												   
	if (formInputFields != '')
	{
		for (var i = 0; i < formInputFields.length; i++){  
			if (formInputFields[i].id.length > 0 ){
				if (jQuery("label[for='"+ formInputFields[i].id + "']") != ''){
					if(jQuery('#'+ formInputFields[i].id).parent().prev().length > 0 && jQuery('#'+ formInputFields[i].id).parent().prev().html().indexOf('<label for="'+ formInputFields[i].id +'"') > -1 )
					{
						//this is a left/right layout --> do not hide anything
					}else{
						//get the text for the label and add it as place holder
						jQuery("#" + formInputFields[i].id).attr('placeholder', jQuery("label[for='"+ formInputFields[i].id + "']").text());

						//hide the label  
						jQuery("label[for='"+ formInputFields[i].id + "']").parent().parent().hide();
					}
				}
			}
		}   
	}      
  
	if (formSelectFields != '')
	{
		for (var i = 0; i < formSelectFields.length; i++){  
			if (formSelectFields[i].id.length > 0 ){
				if (jQuery("label[for='"+ formSelectFields[i].id + "']") != ''){
					if(jQuery('#'+ formInputFields[i].id).parent().prev().length > 0 && jQuery('#'+ formInputFields[i].id).parent().prev().html().indexOf('<label for="'+ formInputFields[i].id +'"') > -1 )
					{
						//this is a left/right layout --> do not hide anything
					}else{
						//we replace the label and add as an option in localization script
						//hide the label  
						jQuery("label[for='"+ formSelectFields[i].id + "']").parent().parent().hide();
						
						
					}
				}
			}
		}   
	}     

});