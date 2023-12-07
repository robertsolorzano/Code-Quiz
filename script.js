//Select the start button
var startButton = document.getElementById('startButton');
var currentQuestionIndex = 0;
var score = 0; 
var totalTime = 60;
var timeLeft = totalTime;
var timerInterval;


//timer function
function startTimer() {
    timerInterval = setInterval(function(){
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}


//Main Event listener
startButton.addEventListener('click', function() {
console.log('Game has commenced')
startButton.style.display = 'none' //hiding start button once quiz starts
currentQuestionIndex = 0;
timeLeft = totalTime;
startTimer();
displayQuestion();
})


//Quiz questions 
const questions = [
    {
      question: "Which HTML tag is used to include an external JavaScript file?",
      choices: ["<script>", "<link>", "<style>", "<js>"],
      answer: 0,
    },
    {
      question: "In CSS, which property is used to set the background color of an element?",
      choices: ["color", "background-color", "text-color", "fill-color"],
      answer: 1,
    },
    {
      question: "What is the correct syntax for creating a new HTML5 document?",
      choices: ["<!DOCTYPE HTML5>", "<html5>", "<!DOCTYPE html>", "<html>"],
      answer: 2,
    },
    {
      question: "Which CSS framework is known for its responsive design components?",
      choices: ["Bootstrap", "jQuery UI", "Foundation", "Semantic UI"],
      answer: 0,
    },
    {
      question: "In JavaScript, which function is used to fetch data from a server?",
      choices: ["fetch()", "get()", "load()", "ajax()"],
      answer: 0,
    },
    {
      question: "Which jQuery method is used to hide an element with a sliding motion?",
      choices: ["fadeOut()", "slideUp()", "hide()", "toggle()"],
      answer: 0,
    },
    {
      question: "What does API stand for in Web development?",
      choices: ["Advanced Programming Interface", "Application Programming Interface", "Active Page Interaction", "All Purpose Integration"],
      answer: 1,
    },
    {
      question: "Which HTML tag is used to create a hyperlink?",
      choices: ["<link>", "<a>", "<href>", "<url>"],
      answer: 1,
    },
    {
      question: "Which CSS selector is used to target an element with a specific class?",
      choices: [".class", "#id", "element", "tag"],
      answer: 0,
    },
    {
      question: "What is the purpose of the 'DOMContentLoaded' event in JavaScript?",
      choices: ["To detect when the page has finished loading", "To detect when the page has started loading", "To detect when the user clicks a button", "To detect when an AJAX request is complete"],
      answer: 0,
    },
  ];
  

  function displayQuestion() {
    var quizContainer = document.getElementById('quizContainer');
    var questionObj = questions[currentQuestionIndex];

    //Clear previous content
    quizContainer.innerHTML = '';

    //Create and append the question text
    var questionElement = document.createElement('h4');
    questionElement.textContent = questionObj.question;
    questionElement.classList.add('mb-3'); 
    quizContainer.appendChild(questionElement);

    //Loop through choices, create styled buttons for each
    questionObj.choices.forEach(function(choice, index){
        var choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.classList.add('btn', 'btn-outline-primary', 'btn-block', 'mb-2'); //Bootstrap button classes

        //Attach an event listener to handle choice
        choiceButton.addEventListener('click', function() {
            handleChoiceSelection(index, choiceButton);
        });
        
        quizContainer.appendChild(choiceButton);
    });
}

//Updated with bootstrap styling
//Handles choice selection/conditionals for right and wrong
function handleChoiceSelection(choiceIndex, choiceButton) {
    var isCorrect = choiceIndex === questions[currentQuestionIndex].answer;

    //Temporarily disable all choice buttons to prevent multiple answers
    var choiceButtons = document.querySelectorAll('#quizContainer button');
    choiceButtons.forEach(function(button) {
        button.disabled = true;
    });

    if (isCorrect) {
        score++;
        choiceButton.classList.remove('btn-outline-primary');
        choiceButton.classList.add('btn-success');
    } else {
        timeLeft -= 5; //Subtract time for wrong answer
        document.getElementById('time').textContent = timeLeft;
        choiceButton.classList.remove('btn-outline-primary');
        choiceButton.classList.add('btn-danger'); 

        if (timeLeft <= 0) {
            endQuiz();
            return;
        }
    }

    //display feedback for a short period of time
    setTimeout(function() {
        moveToNextQuestion();
    }, 600); // Delay of 1 second
}

function moveToNextQuestion() {
    // Enable the buttons again for the next question
    var choiceButtons = document.querySelectorAll('#quizContainer button');
    choiceButtons.forEach(function(button) {
        button.disabled = false;
    });

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
       endQuiz();
    }
}



//End quiz function
function endQuiz() {
    clearInterval(timerInterval);
    startButton.style.display = 'block'; //display start button when quiz ends

    document.getElementById('finalScore').textContent = score;
    var scoreModal = document.getElementById('scoreModal');
    scoreModal.style.display = 'block';

    var quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = '';

    //Display end of quiz message and score
    var endMessage = document.createElement('h5');
    endMessage.textContent = 'Quiz completed! Your final score is: ' + score;
    endMessage.classList.add('centered-text');
    quizContainer.appendChild(endMessage);
}

//save score function
function saveScore(initials, score) {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var newScore = { initials: initials, score: score };

    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}


//User interaction/initals input event listener
document.getElementById('saveScoreButton').addEventListener('click', function() {
    var userInitials = document.getElementById('initialsInput').value;
    if (userInitials) {
        saveScore(userInitials, score); // Ensure saveScore is defined
        document.getElementById('scoreModal').style.display = 'none';
    } else {
        console.log('no initals entered')
    }
});


//Event listner to activate button when typing(input) occurs
document.getElementById('initialsInput').addEventListener('input', function(event) {
    var saveButton = document.getElementById('saveScoreButton');
    if (event.target.value.trim() !== "") {
        saveButton.disabled = false;
    } else {
        saveButton.disabled = true;
    }
});


//function to handle clicking on high score button
document.getElementById('viewHighScores').addEventListener('click', function() {
    var highScoresContainer = document.getElementById('highScoresContainer');
    var isDisplayed = highScoresContainer.style.display === 'block';
    highScoresContainer.style.display = isDisplayed ? 'none' : 'block';

    if (!isDisplayed) {
        displayHighScores(); // Call function to display high scores
    }
});

//displaying high score
function displayHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var highScoresList = document.getElementById('highScoresList');

    // Clear existing list items
    highScoresList.innerHTML = '';

    // Sort high scores if needed
    highScores.sort((a, b) => b.score - a.score);

    // Create a list item for each high score and append to the list
    highScores.forEach(function(score) {
        var listItem = document.createElement('li');
        listItem.textContent = `${score.initials}: ${score.score}`;
        listItem.classList.add('list-group-item');
        highScoresList.appendChild(listItem);
    });
}


