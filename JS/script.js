// variables to keep tract of quiz
var time = 75
var timerId;
var currentQuestionIndex = 0

var timeEl = document.querySelector("#time");
var startBtn = document.querySelector("#startButton");
var submitBtn = document.querySelector("#submit-button");
var titleScreen = document.querySelector("#title-section");
var quizScreen = document.querySelector("#quiz-section");
var highScoreScreen = document.querySelector("#highscore-section");
var highScoreDisplay = document.querySelector("#highscores");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var questionsEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");

 /*questions section*/

 var question = [
    {
        title: "Commonly used data types in JavaScript DO NOT include:",
        choices: ["stings", "alerts", "booleans", "numbers"],
        answer: "alerts"
    },
    {
        title: "What is the purpose of CSS in coding",
        choices: ["Structuring", "Styling", "footers", "cookies"],
        answer: "Styling"
    },
    {
        title: "What is a the top of an HTML document",
        choices: ["Footer", "Body", "Main", "Header"],
        answer: "Header"
    },
    {
        title: "What programming language that allows you to implement complex things on web pages?",
        choices: ["CSS", "HTML", "title", "JavaScript"],
        answer: "JavaScript"
    },
    {
        title: "What is the practice of ensuring websites accesible to the largest number of possible users?",
        choices: ["css", "class", "accessibility", "style"],
        answer: "accessibility"
    }
];


//creaet a function to start the quiz and timer
function startQuiz(){
    //hide the start screen
    titleScreen.setAttribute("class", "hide");
    //unhide the questions screen
    quizScreen.setAttribute("class", "show");
    //start timer
    timerId = setInterval (tick, 1000);
    // show starting time
    timeEl.textContent = time;
    getQuestion()
}
 //take a second of the clock
 function tick () {
    time--;
    timeEl.textContent = time
    //check if timer is a zero
    if (time <= 0) {
        quizEnd();
    }
 };


 function getQuestion() {
    // get questions
    var currentQuestion = question[currentQuestionIndex];
  console.log("question",currentQuestion)
    // update title with question
    var titleEl = document.getElementById("question-title");
    //const titleEl = document.getElementById("question-title");

    titleEl.textContent = currentQuestion.title;
  
    // clear out any old question choices
    choicesEl.innerHTML = "";
  
    // loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
      // create new button for each choice
      var choiceBtn = document.createElement("button");
      choiceBtn.setAttribute("class", "choice");
      choiceBtn.setAttribute("value", choice);
  
      choiceBtn.textContent = i + 1 + ". " + choice;
  
      // event listener to each choice
      choiceBtn.onclick = questionClick;
  
      // display on the page
      choicesEl.appendChild(choiceBtn);
    });
  };



 //click a question
 function questionClick() {
    //check answer
    if(this.value !== question[currentQuestionIndex].answer) {
        // if wrong pentalize 15 seconds
        time -= 15;
        if (time , 0) {
            time = 0;
        }
        //display new time
        timeEl.textContent = time;
        //Wrong or Correct text
        feedbackEl.textContent = "Wrong";
     } else {
        feedbackEl.textContent = "Correct"
     }
     //diplay on page
     feedbackEl.setAttribute("class", "feedback");
     setTimeout(function() {
       feedbackEl.setAttribute("class", "feedback hide");
     }, 1000);

     //next question
     currentQuestionIndex++;

     //check end of question list
     if (currentQuestionIndex ===question.length) {
        quizEnd();
     } else {
        getQuestion();
     }
 }

// end the quiz function
function quizEnd() {
    // stop timer
    clearInterval(timerId);
  
    // show end screen
    var highscoreSectionEl = document.querySelector("#highscore-section");
    highscoreSectionEl.setAttribute("class", "show");
  
    // show final score
    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = time;
  
    // hide questions section
    quizScreen.setAttribute("class", "hide");
  }

// function for saving highscore
function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
  
    // make sure value wasn't empty
    if (initials !== "") {
      // get saved scores
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      // format new score object for current user
      var newScore = {
        score: time,
        initials: initials
      };
  
      // save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
    }
  }

  function checkForEnter(event) {
    // represents the enter key
    if (event.key === "Enter") {
      saveHighscore();
    }
  }

  
  // user clicks button to submit initials
  submitBtn.onclick = saveHighscore;
  
  // user clicks button to start quiz
  startBtn.onclick = startQuiz;
  
  initialsEl.onkeyup = checkForEnter;