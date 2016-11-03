'use strict';
var num = 0;
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	document.getElementById("demo").innerHTML = "Hello JavaScript!";
	num = 0;
	var mydata = JSON.parse(data);
	//var json = JSON.parse(data);
	document.getElementById("question").innerHTML = mydata[num].question;
	document.getElementById("btn1").innerHTML = mydata[num].answers[0];
	document.getElementById("btn2").innerHTML = mydata[num].answers[1];
	document.getElementById("btn3").innerHTML = mydata[num].answers[2];
	document.getElementById("btn4").innerHTML = mydata[num].answers[3];
	console.log(num);
}

function nextQuestion() {

	num++;
	console.log(num);
	if(num == 2){
		window.location.replace("results");
	}
	var mydata = JSON.parse(data);
	//var json = JSON.parse(data);
	document.getElementById("question").innerHTML = mydata[num].question;
	document.getElementById("btn1").innerHTML = mydata[num].answers[0];
	document.getElementById("btn2").innerHTML = mydata[num].answers[1];
	document.getElementById("btn3").innerHTML = mydata[num].answers[2];
	document.getElementById("btn4").innerHTML = mydata[num].answers[3];
	console.log(num);


}


function anagrammedName(name) {
	// Thanks, Internet Anagram Server!
	
	if (name == "Doug Engelbart") {
		return "Notable Grudge";
	} 
	else if (name == "Ivan Sutherland") {
		return "Vandal Heist Run";
	}
	else if (name == "JCR Licklider") {
		return "Crick Rid Jell";
	}
	else if (name == "Vannevar Bush") {
		return "Ravens Van Hub";
	}
	else if (name == "Alan C. Kay") {
		return "Canal Yak";
	}
	else if (name == "Allen Newell") {
		return "Ellen All New";
	}
	else if (name == "Lucy Suchman") {
		return "Lunacy Chums";
	}
	else if (name == "Grace Hopper") {
		return "Gear Chopper";
	}
	else {
		console.log(name + " not known for anagramming.");
		return name;
	}
}