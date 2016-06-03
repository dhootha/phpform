jQuery().ready(function(){

	$isPhoneAutoSuggest = jQuery('#isPhoneAutoSuggest');
	$proAddrCountry = jQuery('#pro_addr_country');

	if($isPhoneAutoSuggest.val() == 1){
		if($proAddrCountry.length > 0) {
			updatePhoneCode($proAddrCountry.val());
		}
	}

	/* pre-populate phone field based on country selection; put in because the sequence initiated by registerCountryListener does not fire when the state field is 
	not present on the attendee form */
	if($isPhoneAutoSuggest.val() == 1){
		$proAddrCountry.change(
			function(){
				updatePhoneCode(jQuery(this).val());
			}
		);
	}
		

});	

/***
 * ARGUMENTS:
 * countryValTypeArg: describes what data is used for the value of the country select options
 *    (1:cou_id; 2:cou_3letter_code; 3:cou_name)
 * stateValueKeyArg: state query column to use for the value of the options returned
 *    (1:sta_id; 2:sta_abbreviation; 3:sta_name)
 * stateDisplayKeyArg: state query column to use for the display of the options returned
 *    (1:sta_id; 2:sta_abbreviation; 3:sta_name; 4:sta_abbreviation - sta_name)
 * stateSelId: id string of the state dropdown to repopulate
 * countrySelId: id string of the country dropdown to register the listener to
 * accountID and formID are NOT required are are intended for attendee side
 * */
registerCountryListener = function( countryValTypeArg, stateValueKeyArg, stateDisplayKeyArg, stateSelId, countrySelId, accountId, formId){
	jQuery().ready( function(){
		window[countrySelId+'stateSel'] = jQuery('select#'+stateSelId);
		if(window[countrySelId+'stateSel'].length) {

			window[countrySelId+'countryValType'] = countryValTypeArg;
			window[countrySelId+'stateValueKey'] = stateValueKeyArg;
			window[countrySelId+'stateDisplayKey'] = stateDisplayKeyArg;
			window[countrySelId+'stateSelDefault'] = window[countrySelId+'stateSel'].val();

			if(!(typeof accountId === 'undefined')) {
				window[countrySelId+'accountId'] = accountId;
				window[countrySelId+'formId'] = formId;
			}

			jQuery('#'+countrySelId).change(countryListener);

			// register a listener for the associated state to select the country if it's blank

			jQuery('select#'+stateSelId).change( function() {

				// IF NO COUNTRY then find it from the optgroup (which is the parent node)
				if (!jQuery('#'+countrySelId).val() || ! jQuery.trim(this.value) ) {

					// SEARCH FOR containing optgroup which should be the country, or blank to reset
					if ( (jQuery('select#'+stateSelId+' :selected').parent().get(0).nodeName.toUpperCase() == "OPTGROUP")
						|| !jQuery.trim(this.value) ) {

						var txtOptGroupLabel = jQuery.trim(jQuery('select#'+stateSelId+' :selected').parent().attr("label"));

						// SELECT the country that matches the optgroup, set the default and fire the event
						jQuery('#'+countrySelId+' option[value="' + txtOptGroupLabel + '"]').get(0).selected = true;
						window[countrySelId+'stateSelDefault'] = jQuery('select#'+stateSelId).val();
						jQuery('#'+countrySelId).change();

					} // IF optgroup is there or blank
				}

			}); // state onchange

			jQuery('#'+countrySelId).change();
			
		}
	});
}


countryListener = function() {
	var $countrySel = jQuery(this);
	var countryId = $countrySel.attr('id');
	var windowAccountId = 0;
	var windowFormId = 0;

	if( countryId+'accountId' in window ) {
		windowAccountId = window[countryId+'accountId']
		windowFormId = window[countryId+'formId']
	}
	if(jQuery('#isPhoneAutoSuggest').val() == 1){
		updatePhoneCode($countrySel.val());
	}
	updateStates(
					$countrySel.val(),
					window[countryId+'countryValType'],
					window[countryId+'stateValueKey'],
					window[countryId+'stateDisplayKey'],
					window[countryId+'stateSel'],
					window[countryId+'stateSelDefault'],
					windowAccountId,
					windowFormId
				);
}


var oPhoneCodeSet = {set:false};

updatePhoneCode = function(countryVal){

	var servicePathRE = /^\/system/;
	var urlPath = servicePathRE.test(location.pathname)?'/system':'';
	
	// we only set the value if its blank
	// OR it was previously set and the value is shorter than a country code
	var $phone = jQuery('input[name="pro_phone"]');
	var setCountryCode = false;
	if(	countryVal.length && $phone.length && ( !oPhoneCodeSet.set && !$phone.val() ) || ( oPhoneCodeSet.set && $phone.val().length < 7)) {
		setCountryCode = true;
	}

	if (setCountryCode){
		jQuery.ajax({
			url: urlPath + '/ajax/country.cfc',
			data: { method: 'getCountryTelCode', countryName: countryVal },
			success: function(data) {
				if (!data){
					$phone.val('');
					oPhoneCodeSet.set = false;
				} else {
					$phone.val('+' + data);
					oPhoneCodeSet.set = true;
				}
			}
		});
	}

}

updateStates = function(countryVal, countryValType, stateValueColumnKey, stateDisplayColumnKey, stateSelectJQObj, defaultStateVal, windowAccountId, windowFormId) {
	var servicePathRE = /^\/system/;
	var urlPath = servicePathRE.test(location.pathname)?'/system':'';
	urlPath = urlPath + '/ajax/stateSelect.cfm';

	jQuery.ajax(
			{
				url: urlPath,
				data: { countryKey: countryVal,
						countryKeyType: countryValType,
						stateValueKey: stateValueColumnKey,
						stateDisplayKey: stateDisplayColumnKey,
						accountId: windowAccountId,
						formId: windowFormId},
				success: function(data) {
							stateSelectJQObj.html(data);
							stateSelectJQObj.val(defaultStateVal)
						}
			}
		);
}