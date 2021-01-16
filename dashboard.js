/*
chrome.tabs.executeScript({
  code: "window.getSelection().toString();"
}, function(selection) {
  //document.getElementById("output").value = selection[0];
  console.log(selection);
});

function GetSelectedText () {
            if (document.getSelection) {    // all browsers, except IE before version 9
                var sel = document.getSelection ();
                    // sel is a string in Firefox and Opera, 
                    // and a selectionRange object in Google Chrome, Safari and IE from version 9
                    // the alert method displays the result of the toString method of the passed object
                console.log (sel);
            } 
            else {
                if (document.selection) {   // Internet Explorer before version 9
                    var textRange = document.selection.createRange ();
                    console.log (textRange.text);
                }
            }
        }


GetSelectedText();*/
//console.log("start");

window.addEventListener('mouseup',Released);

function Released(){
	//stringify selection object
	let counter=1;
	let msg='';
	let selectedData = window.getSelection().toString();
	//send string to background js, if not empty
	if(selectedData.length>0) {
	msg={message:selectedData,count:counter};
	chrome.runtime.sendMessage(msg);
	//console.log(msg);
	}else{
		selectedData="$emp";
	}
}