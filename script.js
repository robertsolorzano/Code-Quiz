//Select the start button
var startButton = document.getElementById('startButton');
var currentQuestionIndex = 0;
var score = 0; 
var totalTime = 90;
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
startButton.style.display = 'none' 
currentQuestionIndex = 0;
timeLeft = totalTime;
startTimer();
displayQuestion();
})


//Quiz questions 
const questions = [
    {
      question: "Which HTML tag is used to define the structure of a web page?",
      choices: ["<header>", "<body>", "<section>", "<html>"],
      answer: 3, 
    },
    {
      question: "What does CSS stand for?",
      choices: ["Cascading Style Sheet", "Creative Style Selector", "Computer System Syntax", "Coding Style Script"],
      answer: 0, 
    },
    {
      question: "Which CSS property is used to change the text color of an element?",
      choices: ["text-color", "color", "font-color", "text-style"],
      answer: 1, 
    },
    {
      question: "In JavaScript, how do you declare a variable?",
      choices: ["var", "let", "const", "var, let, or const"],
      answer: 3, 
    },
    {
      question: "What is the purpose of the `<div>` tag in HTML?",
      choices: ["To create a clickable link", "To define a division or a section", "To display an image", "To format text"],
      answer: 1, 
    },
    {
      question: "Which Bootstrap class is used to create a responsive navigation bar?",
      choices: [".navbar", ".nav", ".nav-header", ".menu"],
      answer: 0, 
    },
    {
      question: "What is the jQuery library primarily used for?",
      choices: ["Database management", "Web page styling", "Server-side scripting", "DOM manipulation"],
      answer: 3, 
    },
    {
      question: "Which HTML element is used to create a bullet list?",
      choices: ["<ul>", "<li>", "<ol>", "<list>"],
      answer: 0, 
    },
    {
      question: "In JavaScript, what is the purpose of an 'if' statement?",
      choices: ["To declare a variable", "To loop through an array", "To perform conditional execution", "To define a function"],
      answer: 2, 
    },
    {
      question: "Which HTML tag is used to include an external JavaScript file?",
      choices: ["<script>", "<link>", "<style>", "<js>"],
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
        choiceButton.classList.add('btn', 'btn-outline-primary', 'btn-block', 'mb-2'); 

        //Attach an event listener to handle choice
        choiceButton.addEventListener('click', function() {
            handleChoiceSelection(index, choiceButton);
        });
        
        quizContainer.appendChild(choiceButton);
    });
}


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
    startButton.style.display = 'block'; 

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
        saveScore(userInitials, score); 
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
        displayHighScores();
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


