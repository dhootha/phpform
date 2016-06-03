/* This is used on /r123_includes/profile/form/dsp_invite_friends.cfm */
 jQuery().ready(function(){
	jQuery('#flgShowInviteFriends').click(
		function(){
			var inviteCheck = jQuery(this);
			var inviteDiv = jQuery('#invite-div');
			if (inviteCheck.is(':checked')) {
				// show
				inviteDiv.fadeIn('fast');
			} else {
				// hide
				inviteDiv.fadeOut('fast');
			}
		}
	);

	/* This is used on /r123_includes/profile/form/dsp_invite_friends.cfm */
	jQuery('#submitInvite').click(
		function(){
			var emailAddresses = jQuery('#txtInviteEmails').val();
			var inviteNote = jQuery('#txtInviteNote').val();
			var inviteFormID = jQuery('#inviteFormID').val();
			var inviteFromEmail = jQuery('#inviteFromEmail').val();
			var inviteEventName = jQuery('#inviteEventName').val();
			var inviteEventID = jQuery('#inviteEventID').val();
			var inviterRegCode = jQuery('#inviterRegCode').val();
			
			var servicePathRE = /^\/system/;
			var urlPath = servicePathRE.test(location.pathname)?'/system':'';
			urlPath = urlPath + '/ajax/inviteFriends.cfm';
			
			// Post to inviteFriends controller
			jQuery.ajax({
				cache: false,
				type: "post",
				url: urlPath,
				data: {
						method	 : "inviteFriends",
						txtInviteEmails: emailAddresses,
						txtInviteNote: inviteNote,
						txtInviteFormID: inviteFormID,
						txtInviteFromEmail: inviteFromEmail,
						inviteEventName: inviteEventName,
						inviteEventID: inviteEventID,
						txtInviterRegCode: inviterRegCode
					},
				dataType: "json",
				success: function( data, textStatus, XMLHttpRequest ){
							var txtMessage = "";
							if (data.numSent > 0) { txtMessage += data.numSent+" sent successfully" }
							if (data.numSent > 0 && data.numFail > 0) { txtMessage += ", " }
							if (data.numFail > 0) { txtMessage += data.numFail+" failed" }
							jQuery('#invite-status').text(txtMessage);
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					jQuery('#invite-status').text("We're sorry, your request could not be completed at this time.");
				}
			})
		}
	);})