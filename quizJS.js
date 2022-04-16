var statusMenu = false;

function showMenu(){
	if(statusMenu == true){
		document.getElementById('mainID').style.zIndex = "1";	
		document.getElementById('mainID').style.opacity = "1";
		document.getElementById('headerID').style.opacity = "1";
		document.getElementById('drawer').style.width = "60px";
		document.getElementById('menuItemsID').style.display = "none";
		statusMenu = false;		
		hideSubmenu();		
		return;
	}else if(statusMenu == false){
		document.getElementById('mainID').style.zIndex = "-1";
		document.getElementById('mainID').style.opacity = "0.2";
		document.getElementById('headerID').style.opacity = "0.2";
		document.getElementById('drawer').style.width = "200px";
		document.getElementById('menuItemsID').style.display = "inline";
		statusMenu = true;
		return;
	}	
}	

function showSubmenu(){
	document.getElementById('submenuID').style.width = "200px";
	document.getElementById('submenu').style.display = "inline";
}

function hideSubmenu(){
	document.getElementById('submenuID').style.width = "0px";
	document.getElementById('submenu').style.display = "none";
}



var status = 0; //status 0 = no game is on; status 1 = game is on; status 2 = game finished

var progress = 0;

var timerrun = 0;

var timer = 30;

function quiztimer(){
	document.getElementById("score").innerHTML = progress;
	
	if(timer < 30 && timer > 0){
			clearInterval(int);
			timer = 30;
			quiztimer();
			return;
	}	
	
		
	if(status == 0){
		document.getElementById("buttonQuiz").innerHTML = "NEXT";
	}		
	
	int = setInterval(function(){ 
		if(0 < timer){
			document.getElementById("timer").innerHTML = timer;
			timer--;
		}else{
			document.getElementById("timer").innerHTML = "TIMEUP";
			
		}
	}, 1000);
	
}

let questionsasked = [];
let limit = 10;

function show(){
	
	var random = Math.floor(Math.random() * limit);
	console.log(random);
	
	if(questionsasked.length == limit){
		return;
	}
	
	if(questionsasked.includes(random)){
		show();
		return;;
	}else{
		questionsasked.push(random);
	}

	document.getElementById("question").innerHTML = questions[random].question;
	document.getElementById("answer1").innerHTML = questions[random].answers[0].option;
	document.getElementById("answer2").innerHTML = questions[random].answers[1].option;	
	document.getElementById("answer3").innerHTML = questions[random].answers[2].option;	
	document.getElementById("answer4").innerHTML = questions[random].answers[3].option;	
}


let questions = [
   {
       question: "What is the horsepower of Ferrari F50?",
       answers: [
           {option: "512", answer: true},
           {option: "584", answer: false},
		   {option: "498", answer: false},
		   {option: "612", answer: false},
       ]
   },
   {
       question: "In which city was Enzo Ferrari born?",
       answers: [
           {option: "Maranello", answer: false},
           {option: "Modena", answer: true},
		   {option: "Venezia", answer: false},
		   {option: "Milano", answer: false},
       ]
   },
   {
       question: "How many times did Fernando Alonso win F1 race?",
       answers: [
           {option: "45", answer: false},
           {option: "28", answer: false},
		   {option: "32", answer: true},
		   {option: "50", answer: false},
       ]
   },
   {
       question: "Who won the first LeMans race?",
       answers: [
           {option: "Gérard de Courcelles  & André Rossignol", answer: false},
           {option: "Sammy Davis & Dudley Benjafield", answer: false},
		   {option: "Luigi Chinetti & Raymond Sommer", answer: false},
		   {option: "André Lagache & René Léonard", answer: true},
       ]
   },
      {
       question: "Who won the most WRC Driver Championship titles in history?",
       answers: [
           {option: "Sébastien Loeb", answer: true},
           {option: "Sébastien Ogier", answer: false},
		   {option: "Ott Tänak", answer: false},
		   {option: "Tommi Mäkinen", answer: false},
       ]
   },
   {
       question: "What engine was used in BMW M1?",
       answers: [
           {option: "3.8 L M88/1 I6", answer: false},
           {option: "3.5 L M88/1 I6", answer: true},
		   {option: "4.0 L M88/1 I6", answer: false},
		   {option: "3.2 L M88/1 I6", answer: false},
       ]
   },
   {
       question: "What is the top speed of Koenigsegg Agera RS?",
       answers: [
           {option: "266.5 mph", answer: false},
           {option: "289.2 mph", answer: false},
		   {option: "277.8 mph", answer: true},
		   {option: "300.0 mph", answer: false},
       ]
   },
   {
       question: "In which year was Jaguar E-type presented on Geneva Motor show?",
       answers: [
           {option: "1958", answer: false},
           {option: "1972", answer: false},
		   {option: "1988", answer: false},
		   {option: "1961", answer: true},
       ]
   },
      {
       question: "Who founded Pagani car brand?",
       answers: [
           {option: "Horacio Pagani", answer: true},
           {option: "Christpher Pagani", answer: false},
		   {option: "Cristina Pagani", answer: false},
		   {option: "Ferruccio Lamborghini", answer: false},
       ]
   },
   {
       question: "What power does Bugatti Veyron have?",
       answers: [
           {option: "1010", answer: false},
           {option: "1001", answer: true},
		   {option: "980", answer: false},
		   {option: "999", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: true},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: true},
       ]
   },
      {
       question: "",
       answers: [
           {option: "", answer: true},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: true},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: true},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: true},
       ]
   },
      {
       question: "",
       answers: [
           {option: "", answer: true},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: true},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: true},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: true},
       ]
   },
      {
       question: "",
       answers: [
           {option: "", answer: true},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: true},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: true},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: true},
       ]
   },
      {
       question: "",
       answers: [
           {option: "", answer: true},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: true},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: true},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: true},
       ]
   },
      {
       question: "",
       answers: [
           {option: "", answer: true},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: true},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: true},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: true},
       ]
   },
      {
       question: "",
       answers: [
           {option: "", answer: true},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: true},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: true},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: true},
       ]
   },
      {
       question: "",
       answers: [
           {option: "", answer: true},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: true},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: true},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: true},
       ]
   },
      {
       question: "",
       answers: [
           {option: "", answer: true},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: true},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: true},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: true},
       ]
   },
      {
       question: "",
       answers: [
           {option: "", answer: true},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: true},
		   {option: "", answer: false},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: true},
		   {option: "", answer: false},
       ]
   },
   {
       question: "",
       answers: [
           {option: "", answer: false},
           {option: "", answer: false},
		   {option: "", answer: false},
		   {option: "", answer: true},
       ]
   }
]