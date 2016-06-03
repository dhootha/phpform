

jQuery(document).ready(function(){ 
    //unbine email uniqueness clientside check
     setTimeout(function(){
      jQuery( "#pro_email").unbind( "blur" ); 
    }, 100);
    
});
       
function getXMLFileforTranslation( selectedLanguage){
    
 
    selectedLanguage = selectedLanguage.toLowerCase();
   
    var genericXMLFileURL = ""; 
    var eventContentXMLFileURL = "";   
    
    if (jQuery(".form-section").length > 0 )
    {
      jQuery(".form-section").hide();
    }
    else if (jQuery(".form-section-1col").length > 0 ){
      jQuery(".form-section-1col").hide();
    }
    
    //if it is english default then hide all hidden content sections
    setTimeout(function(){
      HideEmailandCalendarFields();
    }, 100);
        
    if (selectedLanguage != "english-default")
    {
        
      genericXMLFileURL = "https://www.microsoftevents.com/accounts/register123/microsoft/msft-v1/events/gmo-hostedfiles/config-"+selectedLanguage+".xml";
        
      //check if file exists or not and if it does then call the translation script
      jQuery.ajax({
        url:genericXMLFileURL,
        type:'HEAD',
         success: function()
         {  
            
            translateGenericContent (genericXMLFileURL);
         }   
      }); 
    }else{ 
        
        setTimeout(function(){   
          if (jQuery(".form-section").length > 0 )
          {
            jQuery(".form-section").show("slow", "linear");
          }else if (jQuery(".form-section-1col").length > 0 ){
            jQuery(".form-section-1col").show("slow", "linear");
          }
          
        }, 300);
    }
            
          
          
   

}
     
 
function translateGenericContent(xmlFileURL){
  
  jQuery.ajax({
      type: "GET" ,
      url: xmlFileURL ,
      dataType: "xml" , 
    
      success: function(xml) {
        
      
          //Translate Registration form fields by ID
          jQuery(xml).find("formfield").each(function(){
            fieldType = jQuery(this).attr("type");   
            
            fieldId = jQuery(this).find("fieldname").attr("fieldid");
            fieldclass = jQuery(this).find("fieldname").attr("fieldclass");
            fieldLabel = jQuery(this).find("fieldname").text().trim();
            
            replaceFieldLabelsbyFieldId(fieldId, fieldLabel);                          
            
            replaceFieldLabelsbyClass(fieldclass, fieldLabel); 
            
            
            if (fieldType == "dropdown"){
              //remove all the options and add the options from the XML ( because sorting might be different as well)    
              jQuery("#"+ fieldId+" option").remove();
                
              jQuery("#"+ fieldId).append(new Option(fieldLabel, ""));
          
              jQuery(this).find("fieldoptions").each(function(){
                               
                jQuery("#"+ fieldId).append(new Option(jQuery(this).text(), jQuery(this).attr("value")));
              
              });    
              
              //hide the label
              jQuery("label[for='"+ fieldId + "']").parent().parent().hide();
              
            }
           
            
          });
        
          //Custom Profile Data and Custom Questions
           jQuery(xml).find("customformfielddetails").find("customformfield").each(function(){
              profilefieldType = jQuery(this).attr("type");   
              profilefieldclass = jQuery(this).find("customfieldname").attr("fieldclass");
              profilefieldLabel = jQuery(this).find("customfieldname").text().trim();
              
              var customProfileFieldId = jQuery("."+ profilefieldclass).parent().parent().attr("for");  
              
                     
              if (profilefieldType == "dropdown"){
					//before removing get the default value that has been set in Admin
					profilefieldSelectedVal = jQuery("select#"+customProfileFieldId +" option:selected").val(); 
					jQuery("#"+ customProfileFieldId+" option").remove();
                    
					//hide or show the label based on the if the class ShowLabel is there or not
					if (jQuery("."+profilefieldclass).hasClass("ShowLabel")){
						
						showHideformFieldLabelById(customProfileFieldId, false); 
						//change the label text, we need to get the object by Class name so for multilingual forms it keeps the span class
						jQuery("."+profilefieldclass).html(profilefieldLabel);

					}       
					else{
					
						//if label is hidden then add the label to the first item in the dropdown
						showHideformFieldLabelById(customProfileFieldId, true);  
						
						jQuery("."+profilefieldclass).html(profilefieldLabel);
						//add the label as the first option
						jQuery("#" + customProfileFieldId).append(new Option(profilefieldLabel, "")); 

					}

					jQuery(this).find("fieldoptions").each(function(){
							 
						//jQuery("#SelectList").append(new Option("option text", "value"));
						jQuery("#"+ customProfileFieldId).append(new Option(jQuery(this).text(), jQuery(this).attr("value")));
						
					});
					
					
					//select the default selected val
				if (profilefieldSelectedVal != undefined && profilefieldSelectedVal.length> 0){
					jQuery("#"+ customProfileFieldId +" option[value='"+ profilefieldSelectedVal +"']").attr("selected", true);
				}
					
					
					
              }else
              {
                  replaceCustomProfileAndQuestionFieldLabelsByClass( profilefieldclass, profilefieldLabel);
              }  
              
              
         });  
 
          //replace errorheader  
          if (jQuery("#page-table tr td .error").length > 0){
              if (jQuery("#page-table tr td .error")[0].innerText == jQuery(xml).find("errorDetails").find("errorHeader").attr("englishvalue"))
              {
                  jQuery("#page-table tr td .error")[0].innerText =  jQuery(xml).find("errorDetails").find("errorHeader").text().trim();
              }
         
          
              //replace error messages
              jQuery(xml).find("errorDetails").find("error").each(function(){
                 errorinLocalLang = jQuery(this).text().trim();
                 errorinEnglish = jQuery(this).attr("englishvalue");
                 
                 replaceErrorValues (errorinEnglish, errorinLocalLang);
              });  
          } 
        
        
          //Other Sections
           jQuery(xml).find("formOtherDetails").find("formcontent").each(function(){
              otherfieldType = jQuery(this).attr("type");   
              otherfieldclass = jQuery(this).find("fieldname").attr("fieldclass");
              otherfieldLabel = jQuery(this).find("fieldname").text().trim();
              
              //replaceFieldLabelsbyClass(fieldType, fieldclass, fieldLabel);
              
              var otherfieldId = jQuery("."+ otherfieldclass).parent().parent().attr("for");  
              
               if (otherfieldType == "dropdown"){
                  //remove all the options and add the options from the XML ( because sorting might be different as well)    
                  jQuery("#"+ otherfieldId+" option").remove();
                    
                  jQuery("#" + otherfieldId +" option:eq(0)").text(jQuery("label[for='"+ otherfieldId + "']").text());
          
                  jQuery(this).find("fieldoptions").each(function(){
                                   
                    //jQuery("#SelectList").append(new Option("option text", "value"));
                    jQuery("#"+ otherfieldId).append(new Option(jQuery(this).text(), jQuery(this).attr("value")));
                  
                  });
               }else{                                                                              
               
                  //if its email uniqueness, set the variable
                  
                  if ( otherfieldclass == "FormEmailUniquenessperEvent"){ 
                   
                      formEmailUniquenessperEventText = otherfieldLabel; 
                  }else{
                      replaceCustomProfileAndQuestionFieldLabelsByClass(otherfieldType, otherfieldclass, otherfieldLabel);
                  }
                  
                
               }
               
            
           });
         
         //email and Calendar Content Section 
        
         jQuery(xml).find("emailandCalendarContentSection").find("contentsection").each(function(){
            emailFieldType = jQuery(this).attr("type");     
            emailFieldClassName = jQuery(this).find("fieldname").attr("fieldclass");
            emailFieldContentText = jQuery(this).find("fieldname").text().trim();     
            
          
            var emailFieldId = jQuery("."+ emailFieldClassName).parent().parent().attr("for");  
            
            if (emailFieldId == undefined )
            {     
                
                //replace content for class
                jQuery("."+ emailFieldClassName).html(emailFieldContentText);
            }else{
                //replace by labelID   
                
                replaceEmailsCalendarAndQuestionsContentbyClassName(emailFieldId, emailFieldContentText)
            }
            
         });
     },
     complete: function () { 
		if (jQuery(".form-section").length > 0 )
		{
			jQuery(".form-section").show("slow", "linear");
		}else if (jQuery(".form-section-1col").length > 0 ){
			jQuery(".form-section-1col").show("slow", "linear");
		}
     }
  });
} 

function HideEmailandCalendarFields(){
  //for english default we need to hide the email fields in the form    
  jQuery('.hiddencontent, .HiddenContent').each(function(){ 
      var emailFieldId = jQuery(this).parent().parent().attr("for");  
      jQuery("#"+ emailFieldId).parent().parent().hide();
      jQuery("label[for='"+ emailFieldId +"']").parent().parent().hide();
                        
  });
  
  
  //set dropdown fields labels (placeholders)
  var formSelectFields = jQuery("select"); 
  
  if (formSelectFields != '')
  {
    for (var i = 0; i < formSelectFields.length; i++){  
    
        if (jQuery("label[for='"+ formSelectFields[i].id + "']") != ''){ 
          //check if the drondown has an empty first option then add the label to the first one, if not add a new option to number one    
            var formfieldLabel = jQuery("label[for='"+ formSelectFields[i].id + "']").text().trim();
            
           if(jQuery('#'+ formSelectFields[i].id).parent().prev().length > 0 && 
				( jQuery('#'+ formSelectFields[i].id).parent().prev().html() != null && 
					(jQuery('#'+ formSelectFields[i].id).parent().prev().html().indexOf('<label for="'+ formSelectFields[i].id +'"') > -1 || 
						jQuery('#'+ formSelectFields[i].id).parent().prev().html().indexOf('<span class="error"') > -1
					)
				)
			){
				//if field is required then it has 3 cells and has span error 
				//this is a left/right layout --> do not hide anything
				jQuery("label[for='"+ formSelectFields[i].id + "']").parent().parent().show();
			}else{
				//hide or show the label based on the if the class ShowLabel is there or not
				if (jQuery("#" + formSelectFields[i].id).hasClass("ShowLabel")){ 
				
					showHideformFieldLabelById(formSelectFields[i].id, false); 
				}else{
					//if doesn't have show label then hide the label and add as placeholder
					
					//get the text for the label 
					var formfieldLabel = jQuery("label[for='"+ formSelectFields[i].id + "']").text().trim();
					
					if ( jQuery("#" + formSelectFields[i].id +" option:eq(0)").val().length ==0){
						//get the text for the label and add it as place holder
						jQuery("#" + formSelectFields[i].id +" option:eq(0)").text(formfieldLabel);
					
					}else{
						//add the label as place holder
						jQuery("#" + formSelectFields[i].id).attr('placeholder', formfieldLabel);
					}
					
					//hide the label  
					jQuery("label[for='"+ formSelectFields[i].id + "']").parent().parent().hide();
				}
				
				
			}
          
        }
    }       
  } 

  
   
}   
       
function replaceFieldLabelsbyFieldId( fieldId, fieldLabel)
{
    jQuery("label[for='"+ fieldId + "']").text(fieldLabel);      
            
    jQuery("#" + fieldId).attr('placeholder', fieldLabel);
  

}    

function replaceCustomProfileAndQuestionFieldLabelsByClass( fieldType, fieldClass, fieldLabel)
{
     //find the id based on the class name
       var customProfileFieldId = jQuery("."+ fieldClass).parent().parent().attr("for");  
        //jQuery("label[for='"+ customProfileFieldId + "']").text(fieldLabel);     
      //if textbox change the label, if dropdown, add the label to the first option 
       
      if (fieldType == "text")
      {
        jQuery("#" + customProfileFieldId).attr("placehoder", fieldLabel);
      } 
      else if (fieldType == "dropdown")
      {
      
      }
      else if (fieldType == "content" || fieldType == "checkbox" || fieldType == "radio"){
        //only replace the content inside the class    
        jQuery("." + fieldClass).html(fieldLabel); 
      }
      else if ( fieldType  != undefined && fieldType.toLowerCase() == "button")
      {
          jQuery("." + fieldClass).attr("value", fieldLabel);
      }  
      else if(fieldType == "hiddencontent"){
          //add the value as HTML   
          jQuery("#" + customProfileFieldId).html(fieldLabel); 
          jQuery("#" + customProfileFieldId).parent().parent().hide();  
          //jQuery("label[for='"+ customProfileFieldId + "']").parent().parent().hide();
          showHideformFieldLabelById(customProfileFieldId, true);
      } 
      else
      {
          
      
      }
}

function replaceFieldLabelsbyClass(fieldType,  fieldClass, fieldLabel)
{
    
    if ( fieldType  != undefined && fieldType.toLowerCase() == "button")
    {
      jQuery("." + fieldClass).attr("value", fieldLabel);
    }
    else
    {
      jQuery("." + fieldClass).html(fieldLabel);
    }      
          

}  


function replaceEmailsCalendarAndQuestionsContentbyClassName(emailContentFieldId, emailContentFieldContent)
{

    
    jQuery("#" + emailContentFieldId).html(emailContentFieldContent);
    //hide the fields and the label from the form   
    
    jQuery("#"+ emailContentFieldId).parent().parent().hide();
    //jQuery("label[for='"+ emailContentFieldId +"']").parent().parent().hide();
    showHideformFieldLabelById(emailContentFieldId, true);
}


function replaceErrorValues(errorinEnglish, errorinLocalLang)
{
   
    //replace error labels
    jQuery("#errorStack li .error").each(function () {
        if(jQuery(this).context.textContent.toLowerCase() == errorinEnglish.toLowerCase()){
          jQuery(this).context.textContent = errorinLocalLang;
        }         
       
    });   
}


function showHideformFieldLabelById(fieldIdName, makeItHidden)
{
       
        if (makeItHidden)
        {  
          jQuery("label[for='"+ fieldIdName +"']").parent().parent().hide();
        } 
        else
        {   
          jQuery("label[for='"+ fieldIdName +"']").parent().parent().show();
        }
     
     
    

}     

function translateEventContent(contentXMLFileURL)
{  

   
    jQuery.ajax({
      type: "GET" ,
      url: contentXMLFileURL ,
      dataType: "xml" ,
      success: function(xml) {
          
        jQuery(xml).find("item").each(function(){
      
          contentClassName = jQuery(this).attr("contentClassName");   
          //EnglishText = jQuery(this).attr("EnglishText");
          contentText = jQuery(this).text().trim();
            
         
          replaceContentHTMLbyClassName(contentClassName, contentText);
         
          
        });
      
        
     }
    });

}

 function replaceContentHTMLbyClassName( className, contentText)
{
         
 
  jQuery("." + className).html(contentText);
  

}  
      
 