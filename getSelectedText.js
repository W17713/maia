/*var temp_data='';

function getSelectedText(e) {
	//when mouse is released,copy text
	temp_data=(document.all) ? document.selection.createRange().text : document.getSelection();
	
	//assign text to input
	//document.getElementById('copiedText').value=temp_data;
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

function receiverFxn(req,sender,sendresp){
	badgeCount=badgeCount+req.count;
	//console.log(req);
	//generate key from badge count
	msgObj['key'+badgeCount]=req.message;
	
	//console.log(msgObj);
	
chrome.storage.local.set(msgObj, function(){
		if(Err){
			console.log();
		}else{
			
			chrome.browserAction.setBadgeText({text:badgeCount.toString()});
			chrome.storage.local.get(null,function (results){
			console.log(results)
	}); 
		}
		
	});
	/*
	chrome.storage.local.get(null,function (results){
		console.log(results)
	});
	*/
	//chrome.runtime.sendMessage(req);
}


const Http = new XMLHttpRequest();
const url = "https://jsonplaceholder.typicode.com/";

Http.open("GET",url);
//Http.open("POST",url.true);
//Http.SetRequestHeader("Content-type","application/json");
//Http.send(msg);
Http.send();
Http.onreadystatechange = function(){
	if(this.readyState==4 && this.status==200){
		//console.log(Http.responseText);
	}
}






