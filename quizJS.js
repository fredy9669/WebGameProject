var statusMenu = false;

/* Menu animation */
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

/* Submenu animation */
function showSubmenu(){
	document.getElementById('submenuID').style.width = "200px";
	document.getElementById('submenuID').style.visibility = "visible";
}

function hideSubmenu(){
	document.getElementById('submenuID').style.width = "0px";
	document.getElementById('submenuID').style.visibility = "hidden";
}



var statusquiz = 0; //status 0 = no game is on; status 1 = game finished
var progress = 1; 	//counter of which question are you at
var timerrun = 0;	//status of counter, 1 = counter is running
var timer = 15; 	//amount of seconds
var score = 0;		//players score
let scoreboard = [];
let numberofplayers = 0;

/* Main function, decides on what to do depending in which part of quiz we are */
function quiztimer(clicked_id){	
	document.getElementById("question").style.fontSize = "30px";
	document.getElementById("question").style.textAlign = "left";
		
	/*Means quiz is finished*/	
	if(statusquiz == 1){
	
		document.getElementById("quizanswers").style.visibility = "hidden";
		document.getElementById("questionnumber").innerHTML = "";	
		document.getElementById("timer").innerHTML = "";
		
		document.getElementById("buttonQuiz").innerHTML = "START";
		clearInterval(int);
		statusquiz = 0;
		
		var nameplayersb = document.getElementById("nameplayer");
		scoreboard.push([nameplayersb.value, score]);
		numberofplayers = localStorage.length;
		
		localStorage.setItem(numberofplayers, nameplayersb.value);
		localStorage.setItem(nameplayersb.value, score);		
		
		document.getElementById("question").innerHTML = nameplayersb.value + " you scored " + score + " points. <br>Press <b>START</b> to play again and put your name." ;
		document.getElementById("question").style.fontSize = "40px";
		document.getElementById("question").style.textAlign = "center";
		
		
		score = 0;
		document.getElementById("nameplayer").value = "";
		onloadFunction();
		return;
	}	
	if(timerrun == 1){
		clearInterval(int);
		timer = 15;
	}		
	/*Timer handler*/
	if(timer == 15){
		timerstart();
		timerrun = 1;
	}else{
		clearInterval(int);
	}
	
	
	if(statusquiz == 0){
		document.getElementById("buttonQuiz").innerHTML = "NEXT";
		document.getElementById("quizanswers").style.visibility = "visible";
		document.getElementById("question").style.visibility = "visible";
	}		

	document.getElementById("questionnumber").innerHTML = progress;	
	
	/*Last question handle*/
	if(progress >= 10){
		document.getElementById("buttonQuiz").innerHTML = "FINISH";
		statusquiz = 1;	
		progress = 0;
		statusquiz = 1;
		questionsasked = [];	
	}
	
	show(clicked_id);

}

/* Starts a timer to countdown the time */
function timerstart(){
	int = setInterval(function(){ 
		if(0 < timer){
			document.getElementById("timer").innerHTML = timer + " s";
			//Play beep sound
			if(timer == 5 || timer == 4 || timer == 3 || timer == 2 || timer == 1){
				beep();
			}
			timer--;
		}else{
			//Play long beep sound
			document.getElementById("timer").innerHTML = "TIMEUP";	
			beepLong();
			quiztimer();
		}
	}, 1000);
}


let questionsasked = []; 	//list of questions already asked
let limit = 62; 			//amount of questions
var correctanswerID = 0;    //ID of the correct answer


/* Main function to show the questions */
function show(clicked_id){
	/* Checks if answer is correct or not */
	if((clicked_id-1) == correctanswerID){
		score++;
	}

	/*Random number to select question*/
	var random = Math.floor(Math.random() * limit);
	if(questionsasked.length == limit){
		return;
	}
	
	/*Checks if the question has been asked before. If so repeat.*/
	if(questionsasked.includes(random)){
		show();
		return;;
	}else{
		questionsasked.push(random);
	}

	/*Fill the question and options.*/
	document.getElementById("question").innerHTML = questions[random].question;
	document.getElementById("1").innerHTML = questions[random].answers[0].option;
	document.getElementById("2").innerHTML = questions[random].answers[1].option;	
	document.getElementById("3").innerHTML = questions[random].answers[2].option;	
	document.getElementById("4").innerHTML = questions[random].answers[3].option;	
	

	/*Finds correct id of right answer*/
	for(var i = 0; i < 4; i++){
	if(questions[random].answers[i].answer == true)
		{
			correctanswerID = i;
		}
	}
	
	counterscore();	
}

/* Counter to know how many questions were asked */
function counterscore(){
	progress++;
}


/* Onload page show scoreboard */
function scoreboardload(){
	let lengthStorage = localStorage.length;
	/* DISPLAY RESULTS */
	let outputString = "Below is a list of players and their results. You can clear the list by button CLEAR above" + " <br> "+ " <br> ";
	for(let i = 0; i < lengthStorage; i++){
		if(localStorage.getItem(i) != null)
		outputString += localStorage.getItem(i) + " - " + localStorage.getItem(localStorage.getItem(i)) + " <br> ";
	}
	document.getElementById("scoreboardbody").innerHTML = outputString;
}

/* Press button to clear */
function clearscoreboard(){
	localStorage.clear();
	alert("You have cleared all the scoreboard");
	location.reload();
}

function enableStart(){
	var nameplayerCheck = document.getElementById("nameplayer");
	/*First checks if the name already exists in scoreboard*/
	let lengthStorage = localStorage.length;
	for(let i = 0; i < lengthStorage; i++){
		if(localStorage.getItem(i) == nameplayerCheck.value)
		{
			alert("This username already exists. Select a different one.")
			document.getElementById("nameplayer").value = "";
			return;
		}
	}
	
	document.getElementById("buttonQuiz").disabled = false;
	document.getElementById("buttonQuiz").style.cursor = "pointer";
	document.getElementById("nameplayer").disabled = true;
}

function onloadFunction(){
	document.getElementById("buttonQuiz").disabled = true;
	document.getElementById("buttonQuiz").style.cursor = "not-allowed";
	document.getElementById("nameplayer").disabled = false;
}

/*Long beep when run out of time*/
function beep(){
	var context = new AudioContext();
	var oscillator = context.createOscillator();
	oscillator.type = "sine";
	oscillator.frequency.value = 800;
	oscillator.connect(context.destination);
	oscillator.start(); 
	// Beep for 100 milliseconds
	setTimeout(function () {
    oscillator.stop();
	}, 100); 
}

/*Short beep for 5-1 seconds*/
function beepLong(){
	var context = new AudioContext();
	var oscillator = context.createOscillator();
	oscillator.type = "sine";
	oscillator.frequency.value = 800;
	oscillator.connect(context.destination);
	oscillator.start(); 
	// Beep for 500 milliseconds
	setTimeout(function () {
    oscillator.stop();
	}, 500); 
}

/* List of all the questions */
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
       question: "When was the Company for the Preparation of the German Volkswagen Ltd. established?",
       answers: [
           {option: "May 28, 1940", answer: false},
           {option: "May 28, 1938", answer: false},
		   {option: "May 28, 1937", answer: true},
		   {option: "May 28, 1932", answer: false},
       ]
   },
   {
       question: "When was the VW Type 2 (Transporter) model added to lineup?",
       answers: [
           {option: "1951", answer: false},
           {option: "1958", answer: false},
		   {option: "1953", answer: false},
		   {option: "1950", answer: true},
       ]
   },
      {
       question: "What year did VW Beetle go in production?",
       answers: [
           {option: "1938", answer: true},
           {option: "1932", answer: false},
		   {option: "1928", answer: false},
		   {option: "1948", answer: false},
       ]
   },
   {
       question: "How fast does VW IDR accelerate from 0-100 kph?",
       answers: [
           {option: "2,00s", answer: false},
           {option: "2,78s", answer: true},
		   {option: "2,25s", answer: false},
		   {option: "3,25s", answer: false},
       ]
   },
   {
       question: "How many VW Golfs have been built as of October 2019?",
       answers: [
           {option: "More than 95 million", answer: false},
           {option: "More than 85 million", answer: false},
		   {option: "More than 35 million", answer: true},
		   {option: "More than 55 million", answer: false},
       ]
   },
   {
       question: "What does Volkswagen translate to?",
       answers: [
           {option: "fast car", answer: false},
           {option: "everyone's car", answer: false},
		   {option: "god's car", answer: false},
		   {option: "people's car", answer: true},
       ]
   },
      {
       question: "Where is the headquarters of VW?",
       answers: [
           {option: "Wolfsburg, Germany", answer: true},
           {option: "Berlin, Germany", answer: false},
		   {option: "Frankfurt, Germany", answer: false},
		   {option: "Stuttgart, Germany", answer: false},
       ]
   },
   {
       question: "When was the VW Passat introduced?",
       answers: [
           {option: "1975", answer: false},
           {option: "1973", answer: true},
		   {option: "1978", answer: false},
		   {option: "1983", answer: false},
       ]
   },
   {
       question: "Who won the WRC championship four times in a row with VW Polo R WRC?",
       answers: [
           {option: "Sebastien Loeb & Pedro Ingrassia", answer: false},
           {option: "Sebastien Ogier & Francisco Ingrassia", answer: false},
		   {option: "Sebastien Ogier & Julien Ingrassia", answer: true},
		   {option: "Sebastien Loeb & Julio Ingrassia", answer: false},
       ]
   },
   {
       question: "When was the Ferrari 166 MM launched at Turing Motor show?",
       answers: [
           {option: "1942", answer: false},
           {option: "1946", answer: false},
		   {option: "1958", answer: false},
		   {option: "1948", answer: true},
       ]
   },
      {
       question: "What year did Marzotto win with the 195S A Red Mille Miglia?",
       answers: [
           {option: "1950", answer: true},
           {option: "1940", answer: false},
		   {option: "1955", answer: false},
		   {option: "1952", answer: false},
       ]
   },
   {
       question: "When did Ascari win Ferrari's first F1 world title?",
       answers: [
           {option: "1962", answer: false},
           {option: "1952", answer: true},
		   {option: "1972", answer: false},
		   {option: "1957", answer: false},
       ]
   },
   {
       question: "What iconic car was unveiled in 1962 by Ferrari?",
       answers: [
           {option: "225 GTO", answer: false},
           {option: "240 GTO", answer: false},
		   {option: "250 GTO", answer: true},
		   {option: "280 GTO", answer: false},
       ]
   },
   {
       question: "When did Enzo Ferrari die?",
       answers: [
           {option: "11th August 1985", answer: false},
           {option: "14th August 1987", answer: false},
		   {option: "13th August 1989", answer: false},
		   {option: "14th August 1988", answer: true},
       ]
   },
      {
       question: "Who became F1 champion in Brazil in 2007?",
       answers: [
           {option: "Kimi Raikkonen", answer: true},
           {option: "Fernando Alonso", answer: false},
		   {option: "Charles Leclerc", answer: false},
		   {option: "Lewis Hamilton", answer: false},
       ]
   },
   {
       question: "Who are the current Ferrari F1 drivers?",
       answers: [
           {option: "Charlses Leclers and Juan Carlos", answer: false},
           {option: "Charlses Leclers and Carlos Sainz", answer: true},
		   {option: "Stephan Leclers and Fernando Alonso", answer: false},
		   {option: "Lewis Hamilton and Kimi Raikkonen", answer: false},
       ]
   },
   {
       question: "How many F1 driver champion titles does Lewis Hamilton have?",
       answers: [
           {option: "8", answer: false},
           {option: "9", answer: false},
		   {option: "7", answer: true},
		   {option: "6", answer: false},
       ]
   },
   {
       question: "Who has the highest number of fastest laps in F1?",
       answers: [
           {option: "Michael Buemi in 66 races ", answer: false},
           {option: "Thomas Schumacher in 78 races ", answer: false},
		   {option: "Michael Schumacher in 90 races ", answer: false},
		   {option: "Michael Schumacher in 77 races ", answer: true},
       ]
   },
      {
       question: "Who is the first driver to break triple figures in amount of races won in F1?",
       answers: [
           {option: "Lewis Hamilton", answer: true},
           {option: "Fernando Alonso", answer: false},
		   {option: "Michael Schumacher", answer: false},
		   {option: "Michael Fasbender", answer: false},
       ]
   },
   {
       question: "How many drivers have died while testing, practising, qualifying or racing F1?",
       answers: [
           {option: "50", answer: false},
           {option: "52", answer: true},
		   {option: "60", answer: false},
		   {option: "102", answer: false},
       ]
   },
   {
       question: "What year did Ayrton Senna die?",
       answers: [
           {option: "1995", answer: false},
           {option: "1996", answer: false},
		   {option: "1994", answer: true},
		   {option: "1998", answer: false},
       ]
   },
   {
       question: "What brand is the most valuable in F1?",
       answers: [
           {option: "Williams", answer: false},
           {option: "Mercedes", answer: false},
		   {option: "Red Bull", answer: false},
		   {option: "Ferrari", answer: true},
       ]
   },
      {
       question: "How fast can F1 car accelerate from 0 to 300 km/h?",
       answers: [
           {option: "10.6 s", answer: true},
           {option: "6.6 s", answer: false},
		   {option: "8.6 s", answer: false},
		   {option: "12.6 s", answer: false},
       ]
   },
   {
       question: "How much does it cost to build a F1 car?",
       answers: [
           {option: "£188,32 million", answer: false},
           {option: "£14,58 million", answer: true},
		   {option: "£11,24 million", answer: false},
		   {option: "£1,99 million", answer: false},
       ]
   },
   {
       question: "Who is the supplier of F1 tyres?",
       answers: [
           {option: "Michelin", answer: false},
           {option: "Yokohama", answer: false},
		   {option: "Pirelli", answer: true},
		   {option: "Kuzmo", answer: false},
       ]
   },
   {
       question: "What did BMW originally built?",
       answers: [
           {option: "Motorbike Engines", answer: false},
           {option: "Boat Engines", answer: false},
		   {option: "Bottles", answer: false},
		   {option: "Plane Engines", answer: true},
       ]
   },
      {
       question: "What does BMW mean?",
       answers: [
           {option: "Bayerische Motoren Werke", answer: true},
           {option: "Bayerische Motoren Wagen", answer: false},
		   {option: "Bayerische Master Werke", answer: false},
		   {option: "Bayerische Motoren Wunster", answer: false},
       ]
   },
   {
       question: "When was BMW founded?",
       answers: [
           {option: "1918", answer: false},
           {option: "1916", answer: true},
		   {option: "1926", answer: false},
		   {option: "1912", answer: false},
       ]
   },
   {
       question: "What do the colours in BMW logo represent?",
       answers: [
           {option: "Stuttgart", answer: false},
           {option: "Berlin", answer: false},
		   {option: "Bavaria", answer: true},
		   {option: "Hesse", answer: false},
       ]
   },
   {
       question: "When did BMW make its first electric car?",
       answers: [
           {option: "1952", answer: false},
           {option: "1978", answer: false},
		   {option: "1982", answer: false},
		   {option: "1972", answer: true},
       ]
   },
      {
       question: "How was the first car made by BMW called?",
       answers: [
           {option: "Dixi", answer: true},
           {option: "Pixi", answer: false},
		   {option: "Dissi", answer: false},
		   {option: "Fimi", answer: false},
       ]
   },
   {
       question: "How many cylinders did the Ford Model A have?",
       answers: [
           {option: "1", answer: false},
           {option: "2", answer: true},
		   {option: "6", answer: false},
		   {option: "4", answer: false},
       ]
   },
   {
       question: "Who founded Ford?",
       answers: [
           {option: "Peter Ford", answer: false},
           {option: "Henry Benz", answer: false},
		   {option: "Henry Ford", answer: true},
		   {option: "Faust Ford", answer: false},
       ]
   },
   {
       question: "Where is Ford headquarters?",
       answers: [
           {option: "Dearborn, Florida", answer: false},
           {option: "Dearborn, New York", answer: false},
		   {option: "Dearborn, Wisconsin", answer: false},
		   {option: "Dearborn, Michigan", answer: true},
       ]
   },
      {
       question: "When was Ford Model T introduced?",
       answers: [
           {option: "1908", answer: true},
           {option: "1800", answer: false},
		   {option: "1918", answer: false},
		   {option: "1900", answer: false},
       ]
   },
   {
       question: "Where was Ford's first international sales branch opened in 1908?",
       answers: [
           {option: "Budapest", answer: false},
           {option: "Paris", answer: true},
		   {option: "London", answer: false},
		   {option: "Berlin", answer: false},
       ]
   },
   {
       question: "Who constructed the first considerable as a very first true motorcycle?",
       answers: [
           {option: "Helmut Daimler", answer: false},
           {option: "Gottlieb Kopf", answer: false},
		   {option: "Gottlieb Daimler", answer: true},
		   {option: "Karl Benz", answer: false},
       ]
   },
   {
       question: "At what year did Karl Benz patented hiw three-wheeled Motorwagen?",
       answers: [
           {option: "1889", answer: false},
           {option: "1836", answer: false},
		   {option: "1888", answer: false},
		   {option: "1886", answer: true},
       ]
   },
      {
       question: "When did Mercedes-Benz make a first hybrid vehicle?",
       answers: [
           {option: "1906", answer: true},
           {option: "1900", answer: false},
		   {option: "1910", answer: false},
		   {option: "1928", answer: false},
       ]
   },
   {
       question: "What was the first car in Nepal?",
       answers: [
           {option: "Mercedes-Benz", answer: false},
           {option: "Opel", answer: true},
		   {option: "Ferrari", answer: false},
		   {option: "VW", answer: false},
       ]
   },
   {
       question: "In how many countries are Mercedes-Benz vehicles produced?",
       answers: [
           {option: "20 countries", answer: false},
           {option: "60 countries", answer: false},
		   {option: "30 countries", answer: true},
		   {option: "26 countries", answer: false},
       ]
   },
   {
       question: "Who founded Lamborghini?",
       answers: [
           {option: "Enzo Ferrari", answer: false},
           {option: "Lamorghini Maxus", answer: false},
		   {option: "Max Ferrucio", answer: false},
		   {option: "Ferruccio Lamborghini", answer: true},
       ]
   },
      {
       question: "When was Lamborghini founded?",
       answers: [
           {option: "1963", answer: true},
           {option: "1966", answer: false},
		   {option: "1973", answer: false},
		   {option: "1968", answer: false},
       ]
   },
   {
       question: "What was originally produced by Lamborghini?",
       answers: [
           {option: "boats", answer: false},
           {option: "tractors", answer: true},
		   {option: "bikes", answer: false},
		   {option: "cars", answer: false},
       ]
   },
   {
       question: "What was the first model by Lamborghini to be named after a bull?",
       answers: [
           {option: "Lamborghini Urus", answer: false},
           {option: "Lamborghini Murcielago", answer: false},
		   {option: "Lamborghini Miura", answer: true},
		   {option: "Lamborghini Galardo", answer: false},
       ]
   },
   {
       question: "What was the first Lamborghini SUV?",
       answers: [
           {option: "Huracan", answer: false},
           {option: "LM009", answer: false},
		   {option: "Urus", answer: false},
		   {option: "LM002", answer: true},
       ]
   },
      {
       question: "Who owns Lamborghini?",
       answers: [
           {option: "VW Group", answer: true},
           {option: "BMW", answer: false},
		   {option: "Daimler", answer: false},
		   {option: "Rimac", answer: false},
       ]
   },
   {
       question: "What did Honda originally manufacture?",
       answers: [
           {option: "planes", answer: false},
           {option: "bicycles", answer: true},
		   {option: "tractors", answer: false},
		   {option: "helicopters", answer: false},
       ]
   },
   {
       question: "Which was the first foreign vehicle made in the US?",
       answers: [
           {option: "Toyota Prius", answer: false},
           {option: "Opel Meriva", answer: false},
		   {option: "Honda Accord", answer: true},
		   {option: "Ferrari F355", answer: false},
       ]
   },
   {
       question: "What is the most succesfull engine maker in the Indy 500?",
       answers: [
           {option: "Lamborghini", answer: false},
           {option: "Ferrari", answer: false},
		   {option: "Opel", answer: false},
		   {option: "Honda", answer: true},
       ]
   },
   {
       question: "Which was the first four-wheel drive car ever produced and sold?",
       answers: [
           {option: "Toyota Prius", answer: false},
           {option: "Opel Meriva", answer: false},
		   {option: "Honda Prelude", answer: true},
		   {option: "Ferrari F355", answer: false},
       ]
   },
   {
       question: "Where is Honda's headquarters?",
       answers: [
           {option: "Osaka, Japan", answer: false},
           {option: "Ukila, Japan", answer: false},
		   {option: "Sakamoto, Japan", answer: false},
		   {option: "Tokyo, Japan", answer: true},
       ]
   }
]
