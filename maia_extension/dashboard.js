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

const loginstate= '';
function Released(){
	//stringify selection object
	let counter=1;
	let msg='';
	let selectedData = window.getSelection().toString();
    const loginstate = sessionStorage.getItem('token');
	//send string to background js, if not empty
	if(selectedData.length>0) {
	msg={message:selectedData,count:counter};
	if(msg !== '' || typeof(msg) !== undefined){
        chrome.runtime.sendMessage(msg);
    }
	//console.log(msg);
	}else{
		selectedData="$emp";
	}
}

window.addEventListener('message',checklogin);

function checklogin(e){
    if(e.origin !== 'http://localhost:3000')
        return;
    if(e.data.source !=='maia')
        return;
    console.log(e.data);
    var message = e.data;
    if(message !== '' || typeof(message) !== undefined){
        chrome.runtime.sendMessage(message);
    }
}

/*window.addEventListener('onload',checklogin);

function checklogin(){
    const loginstate = sessionStorage.getItem('token');
    console.log('token '+loginstate);
}*/