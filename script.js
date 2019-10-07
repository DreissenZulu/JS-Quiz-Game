var time = 15 * questions.length;
var questionNum = 0;
var optionButtons = [document.querySelector("#quizOption1"), document.querySelector("#quizOption2"),
document.querySelector("#quizOption3"), document.querySelector("#quizOption4")]

// Do some fancy animations to hide the title screen and show the quiz
function startQuiz() {
    document.querySelector("#titleScreen").style = "animation-play-state: running;"
    document.querySelector(".navbar-text").textContent = "Time: " + time;

    setTimeout(function () {
        document.querySelector("#titleScreen").style = "display: none;";
        document.querySelector("#questionBlock").style = "display: block;";
        document.querySelector("#questionBlock").className = "questionSlideIn";
    }, 400);
    var timeLimit = setInterval(function () {
        time--;
        document.querySelector(".navbar-text").textContent = "Time: " + time;
        if (time == 0) {
            clearInterval(timeLimit);
        }
    }, 1000);
}

// changeQuestion operates only when the element clicked is a button
function changeQuestion() {
    if (event.target.nodeName == "BUTTON") {
        // If there's a value in the button (ie. an answer, check if it's correct)
        var playerAnswer = event.target.value;
        if (playerAnswer) {
            checkAnswer(playerAnswer);
            document.querySelector("#questionBlock").className = "questionFadeOut";
        }
        // Load the next question object...
        var questionInfo = questions[questionNum];

        // ...If there are no questions left, end the function...
        if (questionInfo == undefined) {
            console.log(`There's no questions left...!`);
            return;
        }
        // ...Otherwise write the information into the next question
        setTimeout(function () {
            for (var i = 0; i < optionButtons.length; i++) {
                optionButtons[i].textContent = questionInfo.choices[i];
                optionButtons[i].value = questionInfo.choices[i];
            }
            document.querySelector("#questionPrompt").textContent = questionInfo.title;
            questionNum++;
            document.querySelector("#questionBlock").className = "questionFadeIn";
        }, 400);

    }
}

function checkAnswer(answer) {
    console.log(answer);
}

document.querySelector("#quizStart").onclick = startQuiz;
document.addEventListener("click", changeQuestion);

