/******************************************************************************
 * popup.js
 *	
 *	Author: 	RWB
 *	Date:		03/29/01
 *	Purpose:	Opens a new window of definable size and properties
 *
 *	Attributes:
 *	url		- url to open in new window
 *	name	- name of new window
 *	width	- width in pixels of new window
 *	height	- height in pixels of new pixels
 *	menu	- 0= don't show menu bar
 *	tool	- 0= don't show tool bar
 *
 * Return:
 *	new window object named 'popup' with popup.name = 'name'
 *
 *	Modification List:
 *	20130628 RJM - SCM-9433 // add logic to center the popup
 *	20090903 RJM - REG-5823 // Add ifs around the window focus calls 
 *	20060227 RJM - MODIFICATION REG-730 // Add check for popup window before attempting to focus! (if(!popupWindow) return;)
 *  20041029 RJM - MODIFICATION // JS compatiblitlity for mozilla // issues with location.reload on inital popup call.
 *  20040629 RJM - MODIFICATION // tweak popup calles to exsisting window JS compatiblitlity
 *  20040518 RJM - MODIFICATION // tweak the dimensions of the refreshHelpWindow() window
 *  07/30/02 RWB - focus() on newly opened window
 *	03/29/01 RWB - Created
 *****************************************************************************/

/******************************************************************************
 * set global variables (in case 'popupWindow' window doesn't exist
 *****************************************************************************/
var helpWindow = null;
var searchWindow = null;

/******************************************************************************
 * open new window
 *****************************************************************************/
function popup(url, name, width, height, menu, tool) {	

	var left = (screen.width/2)-(width/2);
    var top = (screen.height/2)-(height/2);

	// build features string
	var features = 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left + ',resizable=yes,scrollbars=yes,status=yes,menubar=' + menu +',toolbar=' + tool;
	// open new window
	if (name === 'help') {
		helpWindow = window.open(url,name,features);
		if(helpWindow) helpWindow.focus();
	}
	else if (name === 'search') {
		searchWindow = window.open(url,name,features);
		if(searchWindow) searchWindow.focus();
	}
	else {
		popupWindow = window.open(url,name,features);
		if(popupWindow) popupWindow.focus();
	}
}