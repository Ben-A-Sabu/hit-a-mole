const sqr=document.querySelectorAll(".square");
var mole=document.querySelectorAll(".mole");
var timeLeft=document.querySelector("#timeLeft");
var score=document.querySelector("#score");
var grid=document.querySelector(".grid");

let result=0;
let hitPosition;
let currentTime=60;
let timer=null;
let lasthole="";

var img = document.createElement("img");  
img.src = "mole.png"; 

img.setAttribute("style", "margin-left: 41px;");




function randomSquare(){    
   
    sqr.forEach(square=>{
        lasthole.innerHTML=" "
          
    })


    let randomsqr=sqr[Math.floor(Math.random()*9)]
    randomsqr.appendChild(img);
 //   randomsqr.innerHTML+='<img src="'+img.src+'" />'
   lasthole=randomsqr;
  
    hitPosition=randomsqr.id
    
   
} 


sqr.forEach(square => {

    square.addEventListener('mousedown', () =>{

       if(square.id == hitPosition){

         result++;
         score.textContent=result;
         hitPosition=null;

       }
   
   
    })
})


function moveMole(){
   
    timer=setInterval(randomSquare,1500)
  
}

moveMole()

function countDopwn(){
   
currentTime--;
timeLeft.textContent=currentTime;
if(currentTime==0){
    clearInterval(countdownTimerId)
    clearInterval(timer)
    alert("game over your final score is "+ result);

}


}

let countdownTimerId=setInterval(countDopwn,1000);