const sqr = document.querySelectorAll(".square");
var mole = document.querySelectorAll(".mole");
var timeLeft = document.querySelector("#timeLeft");
var score = document.querySelector("#score");
var grid = document.querySelector(".grid");


let result = 0;
let hitPosition;
let currentTime = 60;
let timer = null;
let lasthole = "";
let speed = 1000;
var img = document.createElement("img");
img.src = "images/mole.webp";






function randomSquare() {

    sqr.forEach(square => {
        lasthole.innerHTML = " "

    })

    img.src = "images/mole.webp";
    let randomsqr = sqr[Math.floor(Math.random() * 9)]

    /// add transition to the mole
    randomsqr.classList.add("mole");
    img.style.animation = 'jump ' + speed + 'ms ease'
    randomsqr.appendChild(img);
    randomsqr.classList.remove("mole")
    lasthole = randomsqr;
    hitPosition = randomsqr.id
}



sqr.forEach(square => {
    square.addEventListener('mousedown', () => {

        if (square.id == hitPosition) {
            let thud = new Audio("media/thud.mp3");
            thud.play();
            img.src = "images/mole_after_hit.webp";
            square.appendChild(img);
            result++;
            score.textContent = result;
            hitPosition = null;
            document.getElementById("comment").innerHTML = "Hurray! You hit the mole"
            setTimeout(() => {
                document.getElementById("comment").innerHTML = ""
                img.src = "images/mole.webp";
            }, speed);

        }

        else {
            let pluck = new Audio("media/pluck.mp3");
            pluck.play();
            document.getElementById("comment").innerHTML = "Oops! wrong hit"
            setTimeout(() => {
                document.getElementById("comment").innerHTML = ""
            }, speed);
        }

    })
})


function moveMole() {
    // add transition to the mole

    timer = setInterval(randomSquare, speed)

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
        document.getElementById("pause").style.display = "none";
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

let countdownTimerId = setInterval(countDopwn, speed);

document.getElementById("resume").addEventListener("click", function () {
    document.getElementById("content").style.display = "flex";
    document.getElementById("resume").style.display = "none";
    document.getElementById("pause").style.display = "flex";
    timer = setInterval(randomSquare, speed)
    countdownTimerId = setInterval(countDopwn, speed);

});

document.getElementById("pause").addEventListener("click", function () {

    document.getElementById("content").style.display = "none";
    document.getElementById("resume").style.display = "flex";
    document.getElementById("pause").style.display = "none";
    clearInterval(countdownTimerId);
    clearInterval(timer);

}
);

document.getElementById("restart").addEventListener("click", function () {
    location.reload();
});






const gridboxes = document.getElementById("gridboxes");

gridboxes.addEventListener("mousedown", function () {
    gridboxes.style.cursor = "url('images/hammer1.webp'), pointer";

    setTimeout(function () {
        gridboxes.style.cursor = "url('images/hammerhit1.webp'), pointer";
    }, 100); // Change delay time as needed
});

gridboxes.addEventListener("mouseup", function () {
    gridboxes.style.cursor = "url('images/hammer1.webp'), pointer";
});


let audio = new Audio("media/bgm.mp3");

document.getElementById("pause_music_con").addEventListener("click", function () {


    audio.play();
    audio.loop = true;

    document.getElementById("play_music_con").style.display = "block"
    document.getElementById("pause_music_con").style.display = "none";





});

document.getElementById("play_music_con").addEventListener("click", function () {

    audio.pause();
    MusicPlay = 0;
    document.getElementById("pause_music_con").style.display = "block";
    document.getElementById("play_music_con").style.display = "none"
});