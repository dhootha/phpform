/*
The addLoadEvent function takes as an argument another function which should be executed once the page has loaded. Unlike assigning directly to window.onload, the function adds the event in such a way that any previously added onload functions will be executed first. #

http://simon.incutio.com/archive/2004/05/26/addLoadEvent#p-6

Usage : addLoadEvent(focusLogin);

*/
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}