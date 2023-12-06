//Select the start button
var startButton = document.getElementById('startButton');

//Quiz questions in an array inside an object to be accesssed for the quiz
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
  
//Add Event listener
startButton.addEventListener('click', function() {
console.log('Game has commnenced')
})

var currentQuestionIndex = 0;
