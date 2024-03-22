const quiz = [


	{
		question : "Name the all-time bestselling movie soundtrack",
		optionA : "I have nothing",
		optionB : "My love is your love",
		optionC : "Waiting to exhale",
		optionD : "The Bodyguard: Original Soundtrack Album",
		img : Object.assign(new Image,{
			src: "../Images/quiz1.jpg"                          //https://stackoverflow.com/questions/37103988/is-it-possible-to-set-an-image-source-on-a-javascript-object-property
		}),
		answer : 4,
		answerId : "choiceD"
		
	},
	
	{
		question : "To consider a band as a Big Band what is the minimum number of musicians to be needed",
		optionA : "11",
		optionB : "21",
		optionC : "12",
		optionD : "10",
		img : Object.assign(new Image,{
			src: "../Images/quiz2.jpg"
		}),
		answer : 4,
		answerId : "choiceD"
			
	},
	
	{
		question : "The first hispanic to be inducted into the Rock and Roll Hall of Fame is whom",
		optionA : "Carlos Santana",
		optionB : "Cindy Blackman",
		optionC : "Rob Thomas",
		optionD : "John Lee Hooker",
		img : Object.assign(new Image,{
			src: "../Images/quiz3.jpg"
		}),
		answer : 1,
		answerId : "choiceA"
		
	},
	
	{
		question :"In an Orchestra, which is the largest brass section instrument",
		optionA : "Trumpet",
		optionB : "Tenor",
		optionC : "French horns",
		optionD : "Tuba",
		img : Object.assign(new Image,{
			src: "../Images/quiz4.jpg"
		}),
		answer : 4,
		answerId : "choiceD"
		
	},
	
	{
		question : "Name the singer who released the album Alf",
		optionA : "Alison Moyet",
		optionB : "Aretha Louise Franklin",
		optionC : "Michael Joseph Jackson",
		optionD : "Christopher Maurice",
		img : Object.assign(new Image,{
			src: "../Images/quiz5.jpg"
		}),
		answer : 1,
		answerId : "choiceA"
		
	},
	
	{
		question : " In what key is a concert flute pitched",
		optionA : "F",
		optionB : "C",
		optionC : "A",
		optionD : "A",
		img : Object.assign(new Image,{
			src: "../Images/quiz6.jpg"
		}),
		answer : 2,
		answerId : "choiceB"
		
	},
	
	{
		question : "The 2022, Grammy Award for Best New Artist was won by whom",
		optionA : "Sam Smith",
		optionB : "Amy Winehouse",
		optionC : "Meghan Trainor",
		optionD : "Olivia Rodrigo",
		img : Object.assign(new Image,{
			src: "../Images/quiz7.jpg"
		}),
		answer : 4,
		answerId : "choiceD"
		
	},
	
	{
		question : "A tribute to David Bowie’s ex-wife was given with a song by The Rolling stones, name the song",
		optionA : "Wild Horses",
		optionB : "Gimme Shelter",
		optionC : "Angie",
		optionD : "Satisfaction",
		img : Object.assign(new Image,{
			src: "../Images/quiz8.jpg"
		}),
		answer : 3,
		answerId : "choiceC"
		
	},
	
	
	{
		question : "Name the blues great who was born Ellas Otha Bates",
		optionA : "Little Richard",
		optionB : "Muddy Waters",
		optionC : "Bo Diddley",
		optionD : "Chuck Berry",
		img : Object.assign(new Image,{
			src: "../Images/quiz9.jpg"
		}),
		answer : 3,
		answerId : "choiceC"
		
	},
	
	{
		question : "Name the band having its name after a scientist from the movie Barbarella",
		optionA : "Duran Duran",
		optionB : "A Ha",
		optionC : "Nile Rodgers",
		optionD : "Tears for fears",
		img : Object.assign(new Image,{
			src: "../Images/quiz10.jpg"
		}),
		answer : 1,
		answerId : "choiceA"
		
	}
	
]



let quizIndex;
let score;
let timer;
let allChoices = document.querySelectorAll(".radio-button")
let path;
let interval;



let startButton = document.querySelector("#startbtn") 
startButton.addEventListener("click",beginGame)

let resetButton = document.querySelector("#reset")
resetButton.addEventListener("click",resetGame)

let continueButton = document.querySelector("#continue");
continueButton.addEventListener("click",closeOptionValidatorPane)

let nextButton = document.querySelector("#button")
nextButton.addEventListener("click",quizFlow)

let quizBox = document.querySelector("#quiz-box");
quizBox.style.visibility = "hidden"



// This is the function responsible for begining the quiz after the start button is clicked by the player.
function beginGame(){
	
	quizIndex = 0;
	score = 0;
	timer = 0;
	
	document.querySelector("#start-pane").style.display = "none"
	quizBox.style.visibility = "visible"
	
	
	setTimeout(()=>{
		questionAllocator()
		interval = setInterval(quizTimer,1000)         // We store the id returned by the setInterval inorder to clear the timer when the quiz is reset by the player.
	},500);
	
}




// Function inserts the questions,choices and the images in the relavant div by getting them from the array defined at the top.
function questionAllocator(){
	
	let quizInProgress = quiz[quizIndex]
	
	document.querySelector("#question-no").innerText = quizIndex + 1
	document.querySelector("#question").innerText = quizInProgress.question
	document.querySelector("#choice-label1").innerText = quizInProgress.optionA
	document.querySelector("#choice-label2").innerText = quizInProgress.optionB
	document.querySelector("#choice-label3").innerText = quizInProgress.optionC
	document.querySelector("#choice-label4").innerText = quizInProgress.optionD
	
	path = quizInProgress.img.src;
	document.querySelector("#pic-box img").setAttribute("src",path);
	
}



// Function validates the answer entered by the player and changes the color of the div.For each correct answer function increases the score by one.
function answerValidator(){
	
	let quizInProgress = quiz[quizIndex]
	let correctAnswer = quizInProgress.answer
	
	if(allChoices[0].checked == false && allChoices[1].checked == false && allChoices[2].checked == false && allChoices[3].checked == false ){
		document.querySelector("#option-validator").style.display = "flex"
	}
		
	allChoices.forEach((choice) => {
		if(choice.checked){
			let selectedChoice = choice.value						 // getting the value of the radio button that user selected
			let selector = "#div-option" + selectedChoice			 // generating the id of the user answer
			let selectedDiv = document.querySelector(selector)  
			
			if(selectedChoice == correctAnswer){                     // checking whether user answer is correct, to change the div colors accordingly
				selectedDiv.style.backgroundColor = "#39FF14"  
				score++
				
				
			}
			
			else{
				selectedDiv.style.backgroundColor = "#FF3131"                
				let correctSelector = "#div-option" + correctAnswer
				let correctDiv = document.querySelector(correctSelector)
				correctDiv.style.backgroundColor = "#39FF14"                
				selectedDiv.style.backgroundColor = "#FF3131"
				
			}
			
			quizIndex++				
			
		}
	})
}



// function runs when the continue button on the validator pane is pressed
function closeOptionValidatorPane(){
	document.querySelector("#option-validator").style.display = "none"
}



// function runs each time when the next button is pressed. This is the function that maintains the flow of the game by calling other functions within them.
function quizFlow(){
	
	answerValidator()
	
	allChoices.forEach((choice) =>{
		choice.checked = false                          // The checked button is unchecked here before the next quiz.
		
	})
	
	setTimeout(()=>{
		
		if(quizIndex < quiz.length){
			
		questionAllocator()
		
		}
		else{
			feedbackDisplay("CONGRATULATIONS: QUIZ COMPLETED")   
		}
		
		// the div colors changed as per the answer given by the user is changed back to their initial colors before the next question.
		allChoices.forEach((choice)=> {
		let selectedChoice = choice.value
		let selector = "#div-option" + selectedChoice
		let selectedDiv = document.querySelector(selector)  
		selectedDiv.style.backgroundColor = ""
		})
	},1000);
	
}



// responsible for handling the timer that appeared at the top of the quizBox.
function quizTimer(){
	
	document.querySelector("#time").innerText = 60 - timer		//the timer displayed at the top of the quiz box
	
	if(timer < 60 && quizIndex < quiz.length){					// timer will keep running until all questions are answered, and within the given 1 minute  
		
		timer++
		document.querySelector("#time").innerText = 60 - timer
	}
	else if(timer == 60){
		
		feedbackDisplay("YOUR TIME IS OVER")
	}
	
}




// Function runs on each time when user presses the reset button.
function resetGame(){
	
	document.querySelector("#feedback-pane").style.display = "none"
	quizBox.style.visibility = "hidden"
	document.querySelector("#start-pane").style.display = "flex"
	
	clearInterval(interval)   //we are clearing the timer using the id that is returned by the set interval
	
	// clearing all texts and images inside the quiz box, vaidator pane, and the radio buttons.
	document.querySelector("#time").innerText = ""
	document.querySelector("#question-no").innerText = ""
	document.querySelector("#question").innerText = ""
	document.querySelector("#choice-label1").innerText = ""
	document.querySelector("#choice-label2").innerText = ""
	document.querySelector("#choice-label3").innerText = ""
	document.querySelector("#choice-label4").innerText = ""
	document.querySelector("#pic-box img").setAttribute("src","")
	document.querySelector("#option-validator").style.display = "none"
	
	// uncheckking all radio buttons
	allChoices.forEach((choice) => {
		choice.checked = false
	})
	
	// bringing back the div opacity back to initial state
	document.querySelector("#count").style.opacity = "1"
	document.querySelector("#content-box").style.opacity = "1"
	document.querySelector("#inner-container").style.opacity = "1"
	
	quizBox.style.visibility = "hidden"
	
}




// function displays text relavant to the score obtained by the player. The message parameter is the text that appears at the top of the feedback pane. 
function feedbackDisplay(message){
	
	document.querySelector("#feedback-pane").style.display = "block"			// displaying the feedback box
	let grade = (score / 10) * 100												// calculating the average
	
	
	// generating the texts inside the feedback box
	document.querySelector("#headingfb").innerText = message 
	document.querySelector("#falsefb").innerText = `Wrong Answers : ${10 - score}`
	document.querySelector("#scorefb").innerText = `Score : ${score}`
	document.querySelector("#gradefb").innerText = `Grade : ${grade}%`
	document.querySelector("#timefb").innerText = `time taken : ${timer} s`
	
	
	document.querySelector("#count").style.opacity = "0.4"
	document.querySelector("#content-box").style.opacity = "0.4"
	document.querySelector("#inner-container").style.opacity = "0.4"
	
	
	feedbackComment = document.querySelector("#commentfb")
	
	// checking the conditons to display, a feedback on the grade in an appropriate color
	if(score > 7){
		
		feedbackComment.style.color = "#34A853"
		feedbackComment.innerText = "Excellent performance.keep up the good work"
	}
	else if(score > 4){
		feedbackComment.style.color = "#f43a09"
		feedbackComment.innerText = "Average performance.Try better next time"
	}
	else{
		
		feedbackComment.style.color = "#FF3131"
		feedbackComment.innerText = "Poor performace.Try better next time"
	}
}