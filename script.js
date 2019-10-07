function startQuiz() {
    document.querySelector("#titleScreen").style = "animation-play-state: running;"
    setTimeout(function () {
        document.querySelector("#titleScreen").style = "display: none;";
        document.querySelector("#questionBlock").style = "display: block; animation-play-state: running;";
    }, 400)
}

function changeQuestion() {
    document.querySelector("#questionBlock").className = "questionFadeOut";
    setTimeout(function () {
        document.querySelector("#questionBlock").className = "questionFadeIn";
    }, 300);
}

document.querySelector("#quizStart").onclick = startQuiz;
document.querySelector(".btnOption").onclick = changeQuestion;