let result = 0;
let hitPosition;
let currentTime = 60;
let timer = null;
let lasthole = "";
let speed = 1000;
const sqr = document.querySelectorAll(".square");
var mole = document.querySelectorAll(".mole");
var timeLeft = document.querySelector("#timeLeft");
var score = document.querySelector("#score");
var grid = document.querySelector(".grid");
var img = document.createElement("img");
const gridboxes = document.getElementById("gridboxes");
let countdownTimerId = setInterval(countDopwn, speed);
let audio = new Audio("media/bgm.mp3");
img.src = "images/mole.webp";

window.onload = function () {
    seteventlistners();
    moveMole();
    sethighscore();
}
function sethighscore() {
    if (JSON.parse(localStorage.getItem("highscore")) == null) {
        localStorage.setItem("highscore", 0);
    }
    document.getElementById("highscore").innerHTML = JSON.parse(localStorage.getItem("highscore"));;
}
function seteventlistners() {
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
    gridboxes.addEventListener("mousedown", function () {
        gridboxes.style.cursor = "url('images/hammer1.webp'), pointer";
        setTimeout(function () {
            gridboxes.style.cursor = "url('images/hammerhit1.webp'), pointer";
        }, 100); // Change delay time as needed
    });
    gridboxes.addEventListener("mouseup", function () {
        gridboxes.style.cursor = "url('images/hammer1.webp'), pointer";
    });
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

}
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
            let screem = new Audio("media/screem.mp3");
            screem.play();
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
    timer = setInterval(randomSquare, speed)
}
function countDopwn() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if (currentTime == 0) {
        if (result > JSON.parse(localStorage.getItem("highscore"))) {
            localStorage.setItem("highscore", result);
            alert("Congrats! You have set a new high score");
        }
        clearInterval(countdownTimerId)
        clearInterval(timer)
        document.getElementById("GameOver_popup").style.display = "flex";
        document.getElementById("game_Result").innerHTML = " Your final score is " + result;
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