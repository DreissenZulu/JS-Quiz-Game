var time = 15 * questions.length;
var timeLimit;
var questionDiv = document.querySelector("#questionBlock");
var endGameDiv = document.querySelector("#endGameBlock");
var questionNum = 0;
var optionButtons = [document.querySelector("#quizOption1"), document.querySelector("#quizOption2"),
document.querySelector("#quizOption3"), document.querySelector("#quizOption4")]

// Do some fancy animations to hide the title screen and show the quiz
function startQuiz() {
    // Prevents checkAnswer function from running at the same time as startQuiz
    event.stopPropagation();

    document.querySelector("#titleScreen").style = "animation-play-state: running;"
    document.querySelector(".navbar-text").textContent = "Time: " + time;

    // Replace placeholder with the first question
    changeQuestion();

    // Wait for the title animation to finish, then show the question
    setTimeout(function () {
        document.querySelector("#titleScreen").style = "display: none;";
        document.querySelector("#questionBlock").style = "display: block;";
        document.querySelector("#questionBlock").className = "slideUp";
    }, 400);

    // Show and start the time limit. Stop the timer if there's no time left and show the end screen
    timeLimit = setInterval(function () {
        time--;
        document.querySelector(".navbar-text").textContent = "Time: " + time;
        if (time <= 0) {
            clearInterval(timeLimit);
            showEndGame();
        }
    }, 1000);
}

// changeQuestion operates only when the element clicked is a button
function changeQuestion() {
    // Load the next question object...
    var questionInfo = questions[questionNum];

    // ...If there are no questions left, end the function and stop the timer ...
    if (questionInfo == undefined) {
        console.log(`There's no questions left...!`);
        clearInterval(timeLimit);
        showEndGame();
        return;
    }

    // ...Otherwise write the information into the next question...
    setTimeout(function () {
        for (var i = 0; i < optionButtons.length; i++) {
            optionButtons[i].textContent = i+1 + '. ' + questionInfo.choices[i];
            optionButtons[i].value = questionInfo.choices[i];
        }
        document.querySelector("#questionPrompt").textContent = questionInfo.title;
        // ...And show the question
        questionDiv.className = "questionFadeIn";
    }, 400);

}

// Checks the user input and compares it with the answer on file.
function checkAnswer() {
    if (event.target.nodeName == "BUTTON") {
        // If there's a value in the button (ie. an answer) check if it's correct
        var playerAnswer = event.target.value;
        if (playerAnswer) {
            // The current question slides out as the answer is checked to make way for the next question
            if (playerAnswer === questions[questionNum].answer) {

            } else {
                time -= 15;
                if (time < 0) {
                    time = 0;
                    document.querySelector(".navbar-text").textContent = "Time: " + time;
                }
            }
            questionDiv.className = "questionFadeOut";
            console.log(`Choice: ${playerAnswer}, Answer: ${questions[questionNum].answer}`);
        }
        // questionNum is iterated and the next question is called
        questionNum++;
        changeQuestion();
    }
}

function showEndGame() {
    if (questionDiv.className != "questionFadeOut") {
        questionDiv.className = "questionFadeOut";
    }

    if (time != 0) {
        document.querySelector("#showScore").textContent = time;
    } else {
        document.querySelector("#showScore").textContent = "DNF";
    }

    setTimeout(function () {
        questionDiv.style = "display: none;";
        endGameDiv.style = "display: block;";
        endGameDiv.className = "slideDown";
    }, 700)
}

document.querySelector("#quizStart").onclick = startQuiz;
document.addEventListener("click", checkAnswer);

