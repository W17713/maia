//listen for count and show as badge
//chrome.runtime.onMessage.addListener(receiveCount);
var back = chrome.extension.getBackgroundPage();
//console.log(back);
/*
function receiveCount(request,sender,sendresp){
	console.log(request);
}*/
var topicState = document.getElementById("inputTop");
var subbtnState=document.getElementById("subBtn");
document.getElementById("addBtn").addEventListener('click',btnClicked);
topicState.style.display ="none";
subbtnState.style.display ="none";

console.log(document.getElementById("addBtn"));
//console.log(topicState);

//document.getElementById('navbody').addEventListener('load',showphHigh);
window.onload = function checkLogin(){
	/*if(back.badgeCount>0){
		document.getElementById('pghighlight').innerHTML("12");
	}*/
	const loggedin = back.sessionStorage.getItem('identifier');
	const username = back.sessionStorage.getItem('user');
	if(loggedin){
		document.getElementsByClassName('iconhead')[0].style.display='block';
		document.getElementById('username').innerHTML=JSON.parse(username);
	}else{
		document.getElementsByClassName('iconhead')[0].style.display='none';
		document.getElementById('username').innerHTML="not signed in";
	}
}
document.getElementById('pghighlight').innerHTML=back.badgeCount;
function btnClicked(){
	
	
	if(topicState.style.display ==="none"){
		topicState.style.display ="block";
		subbtnState.style.display ="block";
		document.getElementById("btnImgID").src="icons/minus.png";
		//console.log(document.getElementById("btnImgID").src);
		//console.log(topicState.style.display);
		//change icon to minus
		
	}else{
		topicState.style.display ="none";
		subbtnState.style.display="none";
		document.getElementById("btnImgID").src="icons/add.png";
	}
	
	}
	

document.getElementById("inputTop").addEventListener('input',positiveSubmit);
var inputVal = '';


function positiveSubmit(){
	inputVal = document.getElementById("inputTop").value;
	//console.log(inputVal);
	if(inputVal.length >0){
	document.getElementById("subbtnImgID").src="icons/correct2.png";
	submitState=2;
	}else{
		document.getElementById("subbtnImgID").src="icons/correct1.png";
	}
	}

document.getElementById("btnAllclear").addEventListener('click',clearStack);
var i;
function clearStack(){
	chrome.storage.local.clear();
	console.log("done");
	/*
	for(i=1;i<back.badgeCount+1;i++){
		chrome.storage.local.remove('key'+i);
		}
	back.badgeCount=0;
	chrome.browserAction.setBadgeText({text:back.badgeCount.toString()});
	document.getElementById('pghighlight').innerHTML=0;
	//console.log(back.key);
	chrome.storage.local.get(null,function (results){
		console.log(results)
	}); */
}


document.getElementById("btnLastclear").addEventListener('click', clearLast);

function clearLast(){
	//console.log(back.msgObj['key'+back.badgeCount]);
	chrome.storage.local.remove('key'+back.badgeCount, function(){
		if(back.badgeCount >=1){
		back.badgeCount = back.badgeCount - 1;
		chrome.browserAction.setBadgeText({text:back.badgeCount.toString()});
		}
		else{
		back.badgeCount=0;
		chrome.browserAction.setBadgeText({text:back.badgeCount.toString()});
		}
		}
		);
	}
	
//var TopicData={};
document.getElementById('subBtn').addEventListener('click',postTopic);
function postTopic(){
	if(inputVal.length >0){
	chrome.storage.local.set({'Topic':inputVal},chrome.storage.local.get(null,function(res){console.log(res)}));
	//inputVal='';
	topicState.style.display ="none";
	subbtnState.style.display="none";
	document.getElementById("btnImgID").src="icons/add.png";
	document.getElementById("inputTop").value = '';
	}
}

//push all data to backend 

const Http = new XMLHttpRequest();
const url = "http://localhost:3080/highlights";
const loginurl="http://localhost:3080/highlights"
document.getElementById('feedback').addEventListener('click',pushStack);
function pushStack(){
	const user = back.sessionStorage.getItem('name');
	const topic = document.getElementById('inputTop').value;
	const date = Date.now();
	const userid = JSON.parse(back.sessionStorage.getItem('identifier'));
	console.log('popup user '+user);
	if(userid){
		chrome.storage.local.get(null,function(data){
			console.log(user);
			//Http.open("GET",url);
			Http.open("POST",url,true);
			Http.setRequestHeader("Content-Type","application/json;charset=UTF-8");
			Http.send(JSON.stringify({userdata:{topic:topic,date:date,userid:userid,data:data}}));
			console.log(JSON.stringify({userdata:{topic:topic,date:date,userid:userid,data:data}}));
			
			//	Http.send();
			Http.onreadystatechange = function(){
				if(this.readyState==4 && this.status==200){
					console.log("Resp is: "+Http.responseText);
					document.getElementById('message').innerHTML = 'Stack pushed successfully';
				}
			}
			});
	}else{
		document.getElementById('message').innerHTML="Click on 'show my board' to login before you can push a stack";
	}

}
/*
document.getElementById('navbody').addEventListener('load',checkLogin);

function checkLogin(){
	const loggedin = sessionStorage.getItem('token');
	if(loggedin){
		document.getElementById('username').innerHTML(loggedin);
	}else{
		document.getElementById('username').innerHTML("not signed in");
	}
}*/


