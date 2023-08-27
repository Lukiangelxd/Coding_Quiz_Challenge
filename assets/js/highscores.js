var highScore = document.querySelector("#highScore");
var clearHighScore = document.querySelector("#clear");
var back = document.querySelector("#goBack");

//Clear localStorage via event listener
clearHighScore.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
//Pulls from localStorage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}
//To go back to front HTML page
back.addEventListener("click", function () {
    window.location.replace("./index.html");
});
