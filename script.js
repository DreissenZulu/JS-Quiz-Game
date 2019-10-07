var time = 120;

function startQuiz() {
    document.querySelector("#titleScreen").style = "animation-play-state: running;"
    document.querySelector(".navbar-text").textContent = "Time: " + time;
    setTimeout(function () {
        document.querySelector("#titleScreen").style = "display: none;";
        document.querySelector("#questionBlock").style = "display: block; animation-play-state: running;";
    }, 400);
    var timeLimit = setInterval(function () {
        time--;
        document.querySelector(".navbar-text").textContent = "Time: " + time;
        if (time == 0) {
            clearInterval(timeLimit);
        }
    }, 1000);
}

function changeQuestion() {
    document.querySelector("#questionBlock").className = "questionFadeOut";
    setTimeout(function () {
        document.querySelector("#questionBlock").className = "questionFadeIn";
    }, 300);
}

document.querySelector("#quizStart").onclick = startQuiz;
document.querySelector(".btnOption").onclick = changeQuestion;