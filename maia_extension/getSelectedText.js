//const session = require("express-session");

/*var temp_data='';

function getSelectedText(e) {
	//when mouse is released,copy text
	temp_data=(document.all) ? document.selection.createRange().text : document.getSelection();
	
	//assign text to input
	document.getElementById('copiedText').value=temp_data;
	console.log(temp_data);
	//popup options to decide what to do with text
}

document.onmouseup = getSelectedText;

if (!document.all) document.captureEvents(Event.MOUSEUP);

	
	
chrome.tabs.onUpdated.addListener(
	chrome.tabs.executeScript({
  code: "window.getSelection().toString();"
}, function(selection) {
  //document.getElementById("output").value = selection[0];
  console.log(selection);
})
); 

console.log("running back");

chrome.browserAction.onClicked.addListener(btnClick);

function btnClick(){
	
	console.log("cclick");
}
*/
let Err =chrome.runtime.lastError;
chrome.runtime.onMessage.addListener(receiverFxn);
var badgeCount=0;
var key ='';
var msg='';
var msgObj={};

const Http = new XMLHttpRequest();
const url = "http://localhost:3080/highlights";

function receiverFxn(req,sender,sendresp){
	if(req.sender=='mydash')
	{
		console.log('logindat '+req.message)
		const user=req.message.name;
		const id = req.message.identifier;
		sessionStorage.setItem('identifier',JSON.stringify(id));
		sessionStorage.setItem('user',JSON.stringify(user));
	}else if(req.sender=='logout'){
		sessionStorage.clear();
	}
	else
	{
		badgeCount=badgeCount+req.count;
		//console.log(req);
		//generate key from badge count
		msgObj['key'+badgeCount]=req.message;
		
		//console.log('msgOBJ: '+msgObj);
		//console.log('login state '+req.loginstate)
		chrome.storage.local.set(msgObj, function(){
				if(Err){
					console.log(Err);
				}else{
					chrome.browserAction.setBadgeText({text:badgeCount.toString()});
					chrome.storage.local.get(null,function (results){
					console.log(results);
			}); 
				}
				
			});
		
		chrome.storage.local.get(null,function (results){
			console.log(results)
		});
		
		chrome.runtime.sendMessage(req);

}
}


/*Http.open("POST",url);
			//Http.SetRequestHeader("Content-type","application/json");
			//Http.send(msg);
			
			Http.send(results);
				
			
			Http.onreadystatechange = function(){
				if(this.readyState==4 && this.status==200){
					console.log(Http.responseText);
				}
			}*/








