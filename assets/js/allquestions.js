// Global variables
var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 60;
var holdInterval = 0;
// Holds penalty time
var penalty = 5;
// Creates new element
var ulCreate = document.createElement("ul");

//All 10 questions
var questions = [
    {
        title: "1. What is the correct syntax of doctype in HTML5?",
        choices: ["</doctype html>", "<doctype html>", "<doctype html!>", "<!doctype html>"],
        answer: "<!doctype html>"
    },
    {
        title: "2. HTML is a subset of ___________",
        choices: ["SGMT", "SGML", "SGME", "XHTML"],
        answer: "SGML"
    },
    {
        title: "3. What is DOM in HTML?",
        choices: ["Hierarchy of objects in ASP.NET", " Application programming interface", "Convention for representing and interacting with objects in html documents", "Language dependent application programming"],
        answer: "Convention for representing and interacting with objects in html documents"
    },
    {
        title: "4. Which attribute is used to specify the source URL of an image in HTML?",
        choices: ["<src>", "<link>", "<link>", "<url>"],
        answer: "<src>"
    },
    {
        title: "5. What is the default value of visibility in CSS?",
        choices: ["visible", "hidden", "initial", "inherit"],
        answer: "Cascading Style Sheet"
    },
    {
        title: "6. Which operator is used for strict equality comparison in JavaScript?",
        choices: ["==", "===", "<=", "!=="],
        answer: "==="
    },
    {
        title: "7. Which of the following function defines a linear gradient as a CSS image?",
        choices: [" gradient()", "linear-gradient()", "grayscale()", "image()"],
        answer: "linear-gradient()"
    },
    {
        title: "8. Which of the folowing methods can be used to display data in some form using Javascript?",
        choices: ["document.write()", "console.log()", "window.alert()", "All of the above"],
        answer: "All of the above"
    },
    {
        title: "9. Which CSS property is used to control the spacing between lines of text?",
        choices: ["text-spacing", "letter-spacing", "text-line-spacing", "line-height"],
        answer: "line-height"
    },
    {
        title: "10. Which funstion is used to serialize an object into a JSON string in Javascript?",
        choices: ["stringify()", "parse()", "convert()", "None of the above"],
        answer: "stringify()"
    }
];


// Triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;

        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    });
    questionsDiv.appendChild(ulCreate);
}
// Event to compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {
            // Deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "You are all done!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    var percentage =(score / questions.length)*100;

    createP.textContent = "Your  final score is:" + percentage.toFixed(2) + "%";

    questionsDiv.appendChild(createP);

    // Calculates percentage and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    //submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("highscoreBoard.html");
        }
    });

}
