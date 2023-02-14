const sqr = document.querySelectorAll(".square");
var mole = document.querySelectorAll(".mole");
var timeLeft = document.querySelector("#timeLeft");
var score = document.querySelector("#score");
var grid = document.querySelector(".grid");
document.body.style.cursor = "url('OIP.jpg'), auto";


let result = 0;
let hitPosition;
let currentTime = 60;
let timer = null;
let lasthole = "";

var img = document.createElement("img");
img.src = "mole.png";

//img.setAttribute("style", "margin-left: 41px;");




function randomSquare() {

    sqr.forEach(square => {
        lasthole.innerHTML = " "

    })


    let randomsqr = sqr[Math.floor(Math.random() * 9)]

    /// add transition to the mole
    randomsqr.classList.add("mole");
    img.style.animation = 'jump 1.5s ease'
    randomsqr.appendChild(img);
    randomsqr.classList.remove("mole")
    //   randomsqr.innerHTML+='<img src="'+img.src+'" />'
    lasthole = randomsqr;

    hitPosition = randomsqr.id
}




sqr.forEach(square => {

    square.addEventListener('mousedown', () => {

        if (square.id == hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;

        }


    })
})


function moveMole() {
    // add transition to the mole

    timer = setInterval(randomSquare, 800)

}

moveMole()

function countDopwn() {

    currentTime--;
    timeLeft.textContent = currentTime;
    if (currentTime == 0) {
        clearInterval(countdownTimerId)
        clearInterval(timer)
        document.getElementById("GameOver_popup").style.display = "flex";
        document.getElementById("game_Result").innerHTML = "game over your final score is " + result;
        document.getElementById("content").style.display = "none";
        document.getElementById("yes").addEventListener("click", function () {
            location.reload();
        });

        document.getElementById("no").addEventListener("click", function () {
            document.getElementById("GameOver_popup").style.display = "none";
            document.getElementById("container").style.display = "flex";
            document.getElementById("resume").style.display = "none";
        });

    }

}

let countdownTimerId = setInterval(countDopwn, 1000);

document.getElementById("resume").addEventListener("click", function () {
    document.getElementById("content").style.display = "flex";
    document.getElementById("resume").style.display = "none";
    document.getElementById("pause").style.display = "flex";
    setInterval(countDopwn, 1000);
    countDopwn();
    moveMole();
});

document.getElementById("pause").addEventListener("click", function () {

    document.getElementById("content").style.display = "none";
    document.getElementById("resume").style.display = "flex";
    document.getElementById("pause").style.display = "none";
    clearInterval(countdownTimerId);


}
);

document.getElementById("restart").addEventListener("click", function () {
    location.reload();
});

document.getElementById("exit").addEventListener("click", function () {
    window.close();
});

