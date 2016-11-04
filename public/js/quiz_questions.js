'use strict';
var num = 0;
var isTree = false;
var isFlower = false;
var isFern = false;
var isMoss = false;
var plantTypeSelected = false;
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	num = 0;
	isTree = false;
    isFlower = false;
	isFern = false;
	isMoss = false;
	plantTypeSelected = false;
	//var json = JSON.parse(data);
	document.getElementById("question").innerHTML = data.InitialQuestion;
	document.getElementById("btn1").innerHTML = data.InitialAnswers[0];
	document.getElementById("btn2").innerHTML = data.InitialAnswers[1];
	document.getElementById("btn3").innerHTML = data.InitialAnswers[2];
	document.getElementById("btn4").innerHTML = data.InitialAnswers[3];
	console.log(num);
}


function Btn1Press(){
	if(!plantTypeSelected){
		isTree = true;
		plantTypeSelected = true;
	}
	if(num == 3){
		window.location.replace("results");
	}
	else{
	nextQuestion();
	}
	
}

function Btn2Press(){
	if(!plantTypeSelected){
		isFlower = true;
		plantTypeSelected = true;
	}
	if(num == 3){
		window.location.replace("results");
	}
	else{
	nextQuestion();
	}}

function Btn3Press(){
	if(!plantTypeSelected){
		isFern = true;
		plantTypeSelected = true;
	}
	if(num == 3){
		window.location.replace("results");
	}
	else{
	nextQuestion();
	}}

function Btn4Press(){
	if(!plantTypeSelected){
		isMoss = true;
		plantTypeSelected = true;
	}
	if(num == 3){
		window.location.replace("results");
	}
	else{
	nextQuestion();
	}}

function nextQuestion() {

	
	console.log(num);

	
		//var json = JSON.parse(data);
	if(isTree){
		document.getElementById("question").innerHTML = data.Trees.TreeQuestions[num];
		document.getElementById("btn1").innerHTML = data.Trees.TreeAnswers[num].TreeOptions[0];
		document.getElementById("btn2").innerHTML = data.Trees.TreeAnswers[num].TreeOptions[1];
		document.getElementById("btn3").innerHTML = data.Trees.TreeAnswers[num].TreeOptions[2];
		document.getElementById("btn4").innerHTML = data.Trees.TreeAnswers[num].TreeOptions[3];
	}

	else if(isFlower){
		document.getElementById("question").innerHTML = data.Flowers.FlowerQuestions[num];
		document.getElementById("btn1").innerHTML = data.Flowers.FlowerAnswers[num].FlowerOptions[0];
		document.getElementById("btn2").innerHTML = data.Flowers.FlowerAnswers[num].FlowerOptions[1];
		document.getElementById("btn3").innerHTML = data.Flowers.FlowerAnswers[num].FlowerOptions[2];
		document.getElementById("btn4").innerHTML = data.Flowers.FlowerAnswers[num].FlowerOptions[3];
	}

	else if(isFern){
		document.getElementById("question").innerHTML = data.Ferns.FernQuestions[num];
		document.getElementById("btn1").innerHTML = data.Ferns.FernAnswers[num].FernOptions[0];
		document.getElementById("btn2").innerHTML = data.Ferns.FernAnswers[num].FernOptions[1];
		document.getElementById("btn3").innerHTML = data.Ferns.FernAnswers[num].FernOptions[2];
		document.getElementById("btn4").innerHTML = data.Ferns.FernAnswers[num].FernOptions[3];
	}

	else if(isMoss){
		document.getElementById("question").innerHTML = data.Moss.MossQuestions[num];
		document.getElementById("btn1").innerHTML = data.Moss.MossAnswers[num].MossOptions[0];
		document.getElementById("btn2").innerHTML = data.Moss.MossAnswers[num].MossOptions[1];
		document.getElementById("btn3").innerHTML = data.Moss.MossAnswers[num].MossOptions[2];
		document.getElementById("btn4").innerHTML = data.Moss.MossAnswers[num].MossOptions[3];
	}
		
	console.log(num);
	num++;



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