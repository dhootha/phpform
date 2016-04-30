
//array of list of the countries for different behaviour for privacy 

//list of the countries for Opt-In
var OptInEmailOptInPhoneArray =[ "Angola", "Argentina" ,"Armenia", "Australia", "Azerbaijan", 
                        "Belgium", "Benin", "Brazil", "Burkina Faso",
                        "Canada", "Cape Verde", "Colombia", "Costa Rica", "Croatia", "Cyprus", 
                        "Denmark", "Estonia", "Finland",  "Georgia", "Ghana", 
                        "Hong Kong HAR", "Hungary", "Iceland", "Ireland", "Italy", "Korea", "Kuwait",  
                        "Latvia", "Liechtenstein", "Lithuania",  "Luxembourg", 
                        "Madagascar", "Malta", "Malaysia", "Mauritius", "Monaco", "Morocco",  "Mozambique",
                        "Netherlands", "New Zealand", "Norway", 
                        "Pakistan", "Peru", "Philippines", "Poland", "Portugal",  
                         "Romania", "Sao Tome & Principe", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden","Switzerland", "Tunisia", "Turkey",
                        "Ukraine", "United Arab Emirates",  "Uruguay", 
                        "Venezuela", "Vietnam"];

//list of the countries for Opt-Out
var OptOutEmailOptOutPhoneArray= [ "Algeria", "Bulgaria", "Chile", "China", "Czech Republic", "Democratic Republic of the Congo", "Egypt","Ethiopia", "France", "Guatemala","Guinea-Bissau","India", "Indonesia",
                        "Iran","Iraq","Jordan", "Kazakhstan", "Lebanon", "Liberia","Mexico","Namibia","Nigeria","Panama","Senegal",  "Singapore", 
                        "South Africa","Swaziland", "Taiwan",  "Thailand", "United Kingdom" ];   

//List of the countries for Double Opt-In                                              
var DoubleOptInEmailPhoneArray = ["Austria", "Germany", "Greece", "Japan", "Russia"];                        


//List of Notice Only Countries
var NoticeEmailNoticePhoneArray = ["Bahrain", "Bolivia", "Botswana", "Burundi", "Cameroon", "Central African Republic", "Chad", "Ivory Coast", "Dominican Republic", "Ecuador", "El Salvador", "Equatorial Guinea", "Eritrea", "Gabon", "Gambia", "Guinea", "Honduras",
                              "Jamaica", "Kenya", "Lesotho", "Libya", "Macao SAR", "Malawi", "Mali", "Mauritania", "Niger", "Oman", "Paraguay", "Qatar", "Republic of the Congo", "Rwanda", "Saudia Arabia" , "Seychelles", "Sudan", "Syria",
                              "Tanzania", "Togo", "Trinidad and Tobago", "Turkmenistan", "Uganda", "United States", "Yemen", "Zambia", "Zimbabwe"];
      
 

//Privacy Header Text
/*
var MSWideEmailandPhonePrivacyNoticeText = "Microsoft may use your contact information to provide updates and special offers about Microsoft products and services.You can unsubscribe at any time.To learn more you can read the <a href='http://go.microsoft.com/fwlink/?LinkId=521839' target='_blank'>Privacy Statement</a>.";

var AzureEmailandPhonePrivacyNoticeText = "Microsoft may use your contact information to provide updates and special offers about Microsoft Azure and other Microsoft products and services. You can unsubscribe at any time. To learn more you can read the <a href='http://go.microsoft.com/fwlink/?LinkId=521839' target='_blank'>Privacy Statement</a>.";

var EnterpriseMobilityEmailandPhonePrivacyNoticeHeaderText = "Microsoft may use your contact information to provide updates and special offers about Enterprise Mobility and other Microsoft products and services. You can unsubscribe at any time. To learn more you can read the <a href='http://go.microsoft.com/fwlink/?LinkId=521839' target='_blank'>Privacy Statement</a>.";

var DataManagementEmailandPhonePrivacyNoticeText = "Microsoft may use your contact information to provide updates and special offers about Data Management and other Microsoft products and services. You can unsubscribe at any time. To learn more you can read the <a href='http://go.microsoft.com/fwlink/?LinkId=521839' target='_blank'>Privacy Statement</a>.";

var BusinessManagementEmailandPhonePrivacyNoticeText = "Microsoft may use your contact information to provide updates and special offers about Business Management and other Microsoft products and services. You can unsubscribe at any time. To learn more you can read the <a href='http://go.microsoft.com/fwlink/?LinkId=521839' target='_blank'>Privacy Statement</a>.";

var VisualStudioEmailandPhonePrivacyNoticeText = "Microsoft may use your contact information to provide updates and special offers about Visual Studio and other Microsoft products and services. You can unsubscribe at any time. To learn more you can read the <a href='http://go.microsoft.com/fwlink/?LinkId=521839' target='_blank'>Privacy Statement</a>.";

var ITManagementEmailandPhonePrivacyNoticeText = "Microsoft may use your contact information to provide updates and special offers about IT Management and other Microsoft products and services. You can unsubscribe at any time. To learn more you can read the <a href='http://go.microsoft.com/fwlink/?LinkId=521839' target='_blank'>Privacy Statement</a>.";

var AdvancedAnalyticsEmailandPhonePrivacyNoticeText = "Microsoft may use your contact information to provide updates and special offers about Advanced Analytics and IoT and other Microsoft products and services. You can unsubscribe at any time. To learn more you can read the <a href='http://go.microsoft.com/fwlink/?LinkId=521839' target='_blank'>Privacy Statement</a>.";
*/

var MSWideEmailandPhonePrivacyNoticeText, AzureEmailandPhonePrivacyNoticeText, EnterpriseMobilityEmailandPhonePrivacyNoticeHeaderText, DataManagementEmailandPhonePrivacyNoticeText, BusinessManagementEmailandPhonePrivacyNoticeText ;
var VisualStudioEmailandPhonePrivacyNoticeText, ITManagementEmailandPhonePrivacyNoticeText, AdvancedAnalyticsEmailandPhonePrivacyNoticeText;

var TextBoxMSWideId, CheckBoxPrivacyMSWideId, TextBoxAzureId, CheckBoxPrivacyAzureId, TextBoxEnterpriseMobilityId, CheckBoxPrivacyEnterpriseMobilityId, TextBoxDataManagementId, CheckBoxPrivacyDataManagementId;
var TextBoxBusinessManagementId, CheckBoxPrivacyBusinessManagementId, TextBoxVisualStudioId, CheckBoxPrivacyVisualStudioId, TextBoxITManagementId, CheckBoxPrivacyITManagementId, TextBoxAdvancedAnalyticsId, CheckBoxPrivacyAdvancedAnalyticsId;


jQuery(document).ready(function () {

  
  setTimeout(function(){     
      //1 - find privacy textBox, and hide the textbox and its label
      //2- get the CheckBoxPrivacy id, so we can show/hide the CheckBoxPrivacy based on country rule
      //get the name attribute of the CheckBoxPrivacy --> then hide the parent level ( this is the header of the CheckBoxPrivacy that we are not displaying)
      
      //===========================MS Wide
      TextBoxMSWideId = jQuery(".MSWidePrivacy").parent().parent().attr("for");     
      CheckBoxPrivacyMSWideId = jQuery(".CheckBoxPrivacyMSWide").parent().parent().attr("for");
      //hide the textbox and its label, also the header line to reduce height
      HidePrivacyTextBoxandCheckBoxPrivacyHeader(TextBoxMSWideId, CheckBoxPrivacyMSWideId);
      
      //add click event for CheckBoxPrivacy to change the textbox value 
      jQuery("#" +CheckBoxPrivacyMSWideId).change(function() {
            if (jQuery(this).is(':checked')) { 
               jQuery("#" +TextBoxMSWideId).val("OK to Contact");
            }         
            else{
               jQuery("#"+ TextBoxMSWideId).val("Do Not Contact");
            }   
            
      }); 
      
      //===========================Azure
      TextBoxAzureId = jQuery(".AzurePrivacy").parent().parent().attr("for");     
      CheckBoxPrivacyAzureId = jQuery(".CheckBoxPrivacyAzure").parent().parent().attr("for");
      //hide the textbox and its label, also the header line to reduce height
      HidePrivacyTextBoxandCheckBoxPrivacyHeader(TextBoxAzureId, CheckBoxPrivacyAzureId);
      
      //add click event for CheckBoxPrivacy to change the textbox value 
      jQuery("#" +CheckBoxPrivacyAzureId).change(function() {
            if (jQuery(this).is(':checked')) { 
               jQuery("#" +TextBoxAzureId).val("Azure - Email Preference - Premium Content;1");
            }         
            else{
               jQuery("#"+ TextBoxAzureId).val("Azure - Email Preference - Premium Content;0");
            }   
            
      }); 
      
      
      //===========================Enterprize Mobility
      TextBoxEnterpriseMobilityId = jQuery(".EnterpriseMobilityPrivacy").parent().parent().attr("for");     
      CheckBoxPrivacyEnterpriseMobilityId = jQuery(".CheckBoxPrivacyEnterpriseMobility").parent().parent().attr("for");
      //hide the textbox and its label, also the header line to reduce height
      HidePrivacyTextBoxandCheckBoxPrivacyHeader(TextBoxEnterpriseMobilityId, CheckBoxPrivacyEnterpriseMobilityId);
      
      //add click event for CheckBoxPrivacy to change the textbox value 
      jQuery("#" +CheckBoxPrivacyEnterpriseMobilityId).change(function() {
            if (jQuery(this).is(':checked')) { 
               jQuery("#" +TextBoxEnterpriseMobilityId).val("Enterprise Mobility - Email Preference;1");
            }         
            else{
               jQuery("#"+ TextBoxEnterpriseMobilityId).val("Enterprise Mobility - Email Preference;0");
            }   
            
      }); 
      
      //===========================Data Managemen 
      TextBoxDataManagementId  = jQuery(".DataManagementPrivacy").parent().parent().attr("for");     
      CheckBoxPrivacyDataManagementId = jQuery(".CheckBoxPrivacyDataManagement").parent().parent().attr("for");
      //hide the textbox and its label, also the header line to reduce height
      HidePrivacyTextBoxandCheckBoxPrivacyHeader(TextBoxDataManagementId, CheckBoxPrivacyDataManagementId);
      
      //add click event for CheckBoxPrivacy to change the textbox value 
      jQuery("#" +CheckBoxPrivacyDataManagementId).change(function() {
            if (jQuery(this).is(':checked')) { 
               jQuery("#" +TextBoxDataManagementId).val("Data Management - Email Preference;1");
            }         
            else{
               jQuery("#"+ TextBoxDataManagementId).val("Data Management - Email Preference;0");
            }   
            
      }); 
           
           
      //===========================Business Management
      TextBoxBusinessManagementId  = jQuery(".BusinessManagementPrivacy").parent().parent().attr("for");     
      CheckBoxPrivacyBusinessManagementId = jQuery(".CheckBoxPrivacyBusinessManagement").parent().parent().attr("for");
      //hide the textbox and its label, also the header line to reduce height
      HidePrivacyTextBoxandCheckBoxPrivacyHeader(TextBoxBusinessManagementId, CheckBoxPrivacyBusinessManagementId);
                                                                               
      //add click event for CheckBoxPrivacy to change the textbox value 
      jQuery("#" +CheckBoxPrivacyBusinessManagementId).change(function() {
            if (jQuery(this).is(':checked')) { 
               jQuery("#" +TextBoxBusinessManagementId).val("Business Management - Email Preference;1");
            }         
            else{
               jQuery("#"+ TextBoxBusinessManagementId).val("Business Management - Email Preference;0");
            }   
            
      });
      
      
      //===========================Visual Studio
      TextBoxVisualStudioId  = jQuery(".VisualStudioPrivacy").parent().parent().attr("for");     
      CheckBoxPrivacyVisualStudioId = jQuery(".CheckBoxPrivacyVisualStudio").parent().parent().attr("for");
      //hide the textbox and its label, also the header line to reduce height
      HidePrivacyTextBoxandCheckBoxPrivacyHeader(TextBoxVisualStudioId, CheckBoxPrivacyVisualStudioId);
                                                                               
      //add click event for CheckBoxPrivacy to change the textbox value 
      jQuery("#" +CheckBoxPrivacyVisualStudioId).change(function() {
            if (jQuery(this).is(':checked')) { 
               jQuery("#" +TextBoxVisualStudioId).val("Visual Studio - Email Preference;1");
            }         
            else{
               jQuery("#"+ TextBoxVisualStudioId).val("Visual Studio - Email Preference;0");
            }   
            
      });    
      
      
      //===========================IT Management
      TextBoxITManagementId  = jQuery(".ITManagementPrivacy").parent().parent().attr("for");     
      CheckBoxPrivacyITManagementId = jQuery(".CheckBoxPrivacyITManagement").parent().parent().attr("for");
      //hide the textbox and its label, also the header line to reduce height
      HidePrivacyTextBoxandCheckBoxPrivacyHeader(TextBoxITManagementId, CheckBoxPrivacyITManagementId);
                                                                               
      //add click event for CheckBoxPrivacy to change the textbox value 
      jQuery("#" +CheckBoxPrivacyITManagementId).change(function() {
            if (jQuery(this).is(':checked')) { 
               jQuery("#" +TextBoxITManagementId).val("IT Management - Email Preference;1");
            }         
            else{
               jQuery("#"+ TextBoxITManagementId).val("IT Management - Email Preference;0");
            }   
            
      });      
      
      
      //==========================Advanced Analytics
      TextBoxAdvancedAnalyticsId  = jQuery(".AdvancedAnalyticsPrivacy").parent().parent().attr("for");     
      CheckBoxPrivacyAdvancedAnalyticsId = jQuery(".CheckBoxPrivacyAdvancedAnalytics").parent().parent().attr("for");
      //hide the textbox and its label, also the header line to reduce height
      HidePrivacyTextBoxandCheckBoxPrivacyHeader(TextBoxAdvancedAnalyticsId, CheckBoxPrivacyAdvancedAnalyticsId);
                                                                               
      //add click event for CheckBoxPrivacy to change the textbox value 
      jQuery("#" +CheckBoxPrivacyAdvancedAnalyticsId).change(function() {
            if (jQuery(this).is(':checked')) { 
               jQuery("#" +TextBoxAdvancedAnalyticsId).val("Advanced Analytics - Email Preference;1");
            }         
            else{
               jQuery("#"+ TextBoxAdvancedAnalyticsId).val("Advanced Analytics - Email Preference;0");
            }   
            
      });  
      
     
       var defaultCountryName = jQuery("select#pro_ans_field10 option:selected").val();  
       
       setPrivacySettingandNoticeByCountryName(defaultCountryName);
      
    },100); 
    
  
    jQuery("#pro_ans_field10").change(function() {  
        
        //get the selected country
        var SelectedCountryName = jQuery("select#pro_ans_field10 option:selected").val();
        
        setPrivacySettingandNoticeByCountryName(SelectedCountryName);
                         
    });   
    
   
});


function translationPrivacyAndCookie( selectedLanguage)
{
    
 
    selectedLanguage = selectedLanguage.toLowerCase();
    var privacyXMLFileURL = ""; 
    
    if (selectedLanguage != "enaglish-usa1")
    {
        setTimeout(function(){ 
            //todo: this need to change to access the parent account hosted files
            
            privacyXMLFileURL = "/accounts/register123/microsoft/msft-v1/events/gmo-hostedfiles/config-microsoft-privacy.xml";
              
            //check if file exists or not and if it does then call the translation script
            jQuery.ajax({
              url:privacyXMLFileURL,
              type:'HEAD',
               success: function()
               {  
                  translatePrivacyContent (privacyXMLFileURL, selectedLanguage);
               }   
            
        
            });
        
            
        }, 100);    
    }

}


function translatePrivacyContent(privacyXMLFileURL, selectedLanguage){  
    //PrivacyStatementContent : is the privacy text in the footer  
    //CookieTextContent : is for cookie banner on top of the page
    //EmailandPhonePrivacyNotice is the class name for  "AllNotticesBottomText"
    
    jQuery.ajax({
      type: "GET" ,
      url: privacyXMLFileURL ,
      dataType: "xml" ,
      success: function(xml) {
          
        jQuery(xml).find("privacyandcookieDetails").find("language").each(function(){
            languageCode = jQuery(this).attr("lanuagecode");
            
            
            if (languageCode.toLowerCase() == selectedLanguage.toLowerCase() )
            {     
              
               jQuery(this).find("contentsection").each(function(){
					fieldClassName = jQuery(this).find("contentitem").attr("fieldclass");
					fieldLabel = jQuery(this).find("contentitem").text().trim();
					
					//if its the footer for email we need to replace the value in textbox
					if (fieldClassName == "PrivacyStatementFooterEmail" || fieldClassName == "LocalMicrosoftOffice"){
                          //for privacy footer statement add the value to custom event question so it can be replaced in email  
                          var ContentFieldId = jQuery("."+ fieldClassName).parent().parent().attr("for");  
                          jQuery("#" + ContentFieldId).html(fieldLabel); 
                          jQuery("#" + ContentFieldId).parent().parent().hide();  
                          jQuery("label[for='"+ ContentFieldId + "']").parent().parent().hide();
					}else{
				
						replacePrivacyFieldLabelsbyClass(fieldClassName, fieldLabel);
					}
                 
                });    
                  
                //set the default text based on country and language 
                var defaultCountryName = jQuery("select#pro_addr_country option:selected").val();  
                setPrivacySettingandNoticeByCountryName(defaultCountryName);
                
                return false;
            }
         
        });
      }    
      
    });

}


function HidePrivacyTextBoxandCheckBoxPrivacyHeader(TextBoxId, CheckBoxPrivacyId)
{
      jQuery("#"+TextBoxId).parent().parent().hide();                    
      //hide the label incase the quesiton is not top/bottom
      jQuery("label[for='"+TextBoxId+"']").parent().parent().hide();  
      
      //hide the parent row of the header which is empty to remove extra spacing    
      //get headerid  by finding the name in CheckBoxPrivacy
      jQuery("label[for='"+ jQuery("#"+ CheckBoxPrivacyId).attr("name") +"']").parent().parent().hide(); 
       
}

function setPrivacyValues(PrivacyEmailPhoneValue, ShowNoticeHeader, ShowPrivacyCheckBoxPrivacy)
{     
    
    //===========================MS Wide
    if (jQuery("#"+ CheckBoxPrivacyMSWideId).length > 0 ){
        if (PrivacyEmailPhoneValue == "True")    
        {
          jQuery("#" + CheckBoxPrivacyMSWideId).attr("checked", "checked");
          jQuery("#"+ TextBoxMSWideId).val("OK to Contact");
        }
        else{   
          jQuery("#" + CheckBoxPrivacyMSWideId).attr("checked", false);    
          jQuery("#"+ TextBoxMSWideId).val("Do Not Contact");
        }  
                                  
        //hide or show the CheckBoxPrivacy ( the CheckBoxPrivacy label will always be visible)
        if (ShowPrivacyCheckBoxPrivacy)
        {
            //show the check box, 
            jQuery("#"+ CheckBoxPrivacyMSWideId).show();
        }else{
            jQuery("#"+ CheckBoxPrivacyMSWideId).hide();
        }
    } 
    
    //===========================Azure
    if (jQuery("#"+ CheckBoxPrivacyAzureId).length > 0 ){
        if (PrivacyEmailPhoneValue == "True")    
        {
          jQuery("#" + CheckBoxPrivacyAzureId).attr("checked", "checked");
          jQuery("#"+ TextBoxAzureId).val("Azure - Email Preference - Premium Content;1");
        }
        else{   
          jQuery("#" + CheckBoxPrivacyAzureId).attr("checked", false);    
          jQuery("#"+ TextBoxAzureId).val("Azure - Email Preference - Premium Content;0");
        }  
                                  
        //hide or show the CheckBoxPrivacy ( the CheckBoxPrivacy label will always be visible)
        if (ShowPrivacyCheckBoxPrivacy)
        {
            //show the check box, 
            jQuery("#"+ CheckBoxPrivacyAzureId).show();
        }else{
            jQuery("#"+ CheckBoxPrivacyAzureId).hide();
        }
    }  
    
    //===========================enterprise mobility 
    if (jQuery("#"+ CheckBoxPrivacyEnterpriseMobilityId).length > 0 ){
        if (PrivacyEmailPhoneValue == "True")    
        {
          jQuery("#" + CheckBoxPrivacyEnterpriseMobilityId).attr("checked", "checked");
          jQuery("#"+ TextBoxEnterpriseMobilityId).val("Enterprise Mobility - Email Preference;1");
        }
        else{   
          jQuery("#" + CheckBoxPrivacyEnterpriseMobilityId).attr("checked", false);    
          jQuery("#"+ TextBoxEnterpriseMobilityId).val("Enterprise Mobility - Email Preference;0");
        }  
                                  
        //hide or show the CheckBoxPrivacy ( the CheckBoxPrivacy label will always be visible)
        if (ShowPrivacyCheckBoxPrivacy)
        {
            //show the check box, 
            jQuery("#"+ CheckBoxPrivacyEnterpriseMobilityId).show();
        }else{
            jQuery("#"+ CheckBoxPrivacyEnterpriseMobilityId).hide();
        }
    } 
    
    //===========================Data Management
    if (jQuery("#"+ CheckBoxPrivacyDataManagementId).length > 0 ){
        if (PrivacyEmailPhoneValue == "True")    
        {
          jQuery("#" + CheckBoxPrivacyDataManagementId).attr("checked", "checked");
          jQuery("#" + TextBoxDataManagementId).val("Data Management - Email Preference;1");
        }
        else{   
          jQuery("#" + CheckBoxPrivacyDataManagementId).attr("checked", false);    
          jQuery("#" + TextBoxDataManagementId).val("Data Management - Email Preference;0");
        }  
                                  
        //hide or show the CheckBoxPrivacy ( the CheckBoxPrivacy label will always be visible)
        if (ShowPrivacyCheckBoxPrivacy)
        {
            //show the check box, 
            jQuery("#" + CheckBoxPrivacyDataManagementId).show();
        }else{
            jQuery("#" + CheckBoxPrivacyDataManagementId).hide();
        }
    }
    
    //===========================Business Management 
    if (jQuery("#"+ CheckBoxPrivacyBusinessManagementId).length > 0 ){
        if (PrivacyEmailPhoneValue == "True"){
          jQuery("#" + CheckBoxPrivacyBusinessManagementId).attr("checked", "checked");
          jQuery("#" + TextBoxBusinessManagementId).val("Business Management - Email Preference;1");
        }
        else{   
          jQuery("#" + CheckBoxPrivacyBusinessManagementId).attr("checked", false);    
          jQuery("#" + TextBoxBusinessManagementId).val("Business Management - Email Preference;0");
        }  
                                  
        //hide or show the CheckBoxPrivacy ( the CheckBoxPrivacy label will always be visible)
        if (ShowPrivacyCheckBoxPrivacy){
            //show the check box, 
            jQuery("#" + CheckBoxPrivacyBusinessManagementId).show();
        }else{
            jQuery("#" + CheckBoxPrivacyBusinessManagementId).hide();
        }
    }  
    
    //===========================Visual Studio 
    if (jQuery("#"+ CheckBoxPrivacyVisualStudioId).length > 0 ){
        if (PrivacyEmailPhoneValue == "True")    
        {
          jQuery("#" + CheckBoxPrivacyVisualStudioId).attr("checked", "checked");
          jQuery("#" + TextBoxVisualStudioId).val("Visual Studio - Email Preference;1");
        }
        else{   
          jQuery("#" + CheckBoxPrivacyVisualStudioId).attr("checked", false);    
          jQuery("#" + TextBoxVisualStudioId).val("Visual Studio - Email Preference;0");
        }  
                                  
        //hide or show the CheckBoxPrivacy ( the CheckBoxPrivacy label will always be visible)
        if (ShowPrivacyCheckBoxPrivacy)
        {
            //show the check box, 
            jQuery("#" + CheckBoxPrivacyVisualStudioId).show();
        }else{
            jQuery("#" + CheckBoxPrivacyVisualStudioId).hide();
        }
    } 
    
    //===========================IT Management 
    if (jQuery("#"+ CheckBoxPrivacyITManagementId).length > 0 ){
        if (PrivacyEmailPhoneValue == "True")    
        {
          jQuery("#" + CheckBoxPrivacyITManagementId).attr("checked", "checked");
          jQuery("#" + TextBoxITManagementId).val("IT Management - Email Preference;1");
        }
        else{   
          jQuery("#" + CheckBoxPrivacyITManagementId).attr("checked", false);    
          jQuery("#" + TextBoxITManagementId).val("IT Management - Email Preference;0");
        }  
                                  
        //hide or show the CheckBoxPrivacy ( the CheckBoxPrivacy label will always be visible)
        if (ShowPrivacyCheckBoxPrivacy)
        {
            //show the check box, 
            jQuery("#" + CheckBoxPrivacyITManagementId).show();
        }else{
            jQuery("#" + CheckBoxPrivacyITManagementId).hide();
        }
    }     
    
    //===========================Advanced Analytics 
    if (jQuery("#"+ CheckBoxPrivacyAdvancedAnalyticsId).length > 0 ){
        if (PrivacyEmailPhoneValue == "True")    
        {
          jQuery("#" + CheckBoxPrivacyAdvancedAnalyticsId).attr("checked", "checked");
          jQuery("#" + TextBoxAdvancedAnalyticsId).val("Advanced Analytics - Email Preference;1");
        }
        else{   
          jQuery("#" + CheckBoxPrivacyAdvancedAnalyticsId).attr("checked", false);    
          jQuery("#" + TextBoxAdvancedAnalyticsId).val("Advanced Analytics - Email Preference;0");
        }  
                                  
        //hide or show the CheckBoxPrivacy ( the CheckBoxPrivacy label will always be visible)
        if (ShowPrivacyCheckBoxPrivacy)
        {
            //show the check box, 
            jQuery("#" + CheckBoxPrivacyAdvancedAnalyticsId).show();
        }else{
            jQuery("#" + CheckBoxPrivacyAdvancedAnalyticsId).hide();
        }
    } 
}                  



function setPrivacySettingandNoticeByCountryName(CountryName)
{
  //hide the header by default    
  if (jQuery("#pro_ans_field08_True").length > 0 ){  
      jQuery(".EmailandPhonePrivacyNoticeHeader").hide();   
       
  }   
  
  if (jQuery("#pro_ans_field09_True").length > 0 ){  
      jQuery(".AzureEmailandPhonePrivacyNoticeHeader").hide();  
           
  }                
  
  //notice text after CheckBoxPrivacyes by default
       
  if ( jQuery.inArray(CountryName, OptInEmailOptInPhoneArray) > -1 ) {
      setPrivacyValues("False", false, true);
       
  }else if( jQuery.inArray(CountryName, OptOutEmailOptOutPhoneArray) > -1){     
      setPrivacyValues("True", false, true);                              
      
  }else if (jQuery.inArray(CountryName, NoticeEmailNoticePhoneArray)> -1){        
      setPrivacyValues("True", true, false);
      
  }else {    
      setPrivacyValues("False", false, true);
  }

  

}

function replacePrivacyFieldLabelsbyClass( fieldClass, fieldLabel)
{
    if (jQuery("." + fieldClass).length > 0 ){
		jQuery("." + fieldClass).html(fieldLabel);
	}
  
}  