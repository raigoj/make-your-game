let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
let isPaused = false;
let isOver = false;
const bground=document.querySelector(".grid");
const pauseScreen = document.querySelector(".pause");
let xBall = 5;
let yBall = 5;
const scoreCounter = document.querySelector("#scoreCounter");
const livesCounter = document.querySelector("#livesCounter");
let seconds = 00; 
let tens = 00; 
let appendTens = document.getElementById("tens")
let appendSeconds = document.getElementById("seconds")
let Interval ;
let livesCount = 3;
let score = 0;
let LEFT = false;
let RIGHT = false;
let lostSound = new Audio("lost.wav")
let popSound = new Audio("point.wav")
let tickSound = new Audio("tick.wav")
let winSound = new Audio("fanfare.wav")
var buttonCon = document.querySelector(".continue");
var buttonRes = document.querySelector(".restart");
const createBtn = (text = 'Restart') => {
    const btn = document.createElement('button');
    btn.innerText = text;
    btn.onclick = function() {
        location.reload();
    };
    pauseScreen.appendChild(btn);
    return btn;
}
buttonCon.onclick = function() {
    isPaused = false;
}
buttonRes.onclick = function() {
    location.reload()
}

window.addEventListener("keydown", checkKeyPressed, false);

Interval = setInterval(startTimer, 10);
function startTimer () {
    tens++; 
    
    if(tens <= 9){
      appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
      appendTens.innerHTML = tens;
      
    } 
    
    if (tens > 99) {
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
  
  }

function checkKeyPressed(evt) {
    if (!isOver) {
        if (evt.keyCode == "80") isPaused = !isPaused;  //r
    } 
    if (evt.keyCode == "82") location.reload();  
}
document.onkeydown = function(e) {
	if(e.keyCode == 37) LEFT = true;
	if(e.keyCode == 39) RIGHT = true;
}

document.onkeyup = function(e) {
	if(e.keyCode == 37) LEFT = false;
	if(e.keyCode == 39) RIGHT = false;
}
function move() {
	if (!isOver) {
	  if(LEFT) { 
		if (currentPos[0]>20) {
            currentPos[0] -= 20
            summonPaddle()
        } else {
            currentPos[0] += 10
            summonPaddle()
        }
	  }
	  if(RIGHT) {
		if (currentPos[0]<860) {
            currentPos[0] += 20
            summonPaddle()
        } else {
            currentPos[0] -= 10
            summonPaddle()
        }
	  }
  }
}

function animate() {
    if (!isPaused) {
        moveBall();
        pauseScreen.style.display = 'none'
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    } else {
        isPaused = true
        pauseScreen.style.display = 'block'
        clearInterval(Interval);
    }
    
    requestAnimationFrame(animate);
    
}


function scoreRefresh() {
    livesCounter.innerHTML = livesCount
    scoreCounter.innerHTML = score
}


function createBlocks () {
    for (let i = 0; i < allBlocks.length; i++) {

    const block = document.createElement("div")
    block.classList.add("block")
    block.style.left=allBlocks[i].bLeft[0] + "px"
    block.style.bottom = allBlocks[i].bLeft[1] + "px"
    bground.appendChild(block)
}
    pauseScreen.style.display = 'none'
}

const blockWidth = 100
const blockHeight = 25
const startPos = [450,20]
let currentPos = startPos

const ballStart = [450,200]
let currentPosBall = ballStart


class Block { // 
    constructor(xax, yax){
    this.bLeft = [xax, yax]
    this.bRight = [xax + blockWidth, yax]
    this.tLeft = [xax, yax + blockHeight]
    this.tRight = [xax + blockWidth, yax + blockHeight]
    }
}

const allBlocks = [
 new Block(60,450),
 new Block(190,450),
 new Block(320,450),
 new Block(450,450),
 new Block(580,450),
 new Block(710,450),
 new Block(840,450),
 new Block(30,400),
 new Block(160,400),
 new Block(290,400),
 new Block(420,400),
 new Block(550,400),
 new Block(680,400),
 new Block(810,400),
 new Block(90,350),
 new Block(220,350),
 new Block(350,350),
 new Block(480,350),
 new Block(610,350),
 new Block(740,350),
 new Block(870,350),
 new Block(190,300),
 new Block(450,300),
 new Block(710,300),
]

const paddle = document.createElement("div")
paddle.classList.add("paddle")

const ball = document.createElement("div")
ball.classList.add("ball")


bground.appendChild(paddle)
bground.appendChild(ball)


function summonBall() {
    ball.style.left=currentPosBall[0] + "px"
    ball.style.bottom=currentPosBall[1] + "px"
}

summonBall()


function summonPaddle() {
    paddle.style.left=currentPos[0] + "px"
    paddle.style.bottom=currentPos[1] + "px"
}

  function moveBall() {
    currentPosBall[0] += xBall
    currentPosBall[1] += yBall
    summonBall()
    wallCheck()
  }

  function minusLife() {
    livesCount -= 1;
    setTimeout(10000)
  }

  function wallCheck() {

    for (let i = 0; i < allBlocks.length; i++) { // loop through all blocks
        if (currentPosBall[0]> (allBlocks[i].bLeft[0]-20) && currentPosBall[0]< (allBlocks[i].bRight[0] +20 ) &&
            currentPosBall[1]> (allBlocks[i].bLeft[1]-30) && (currentPosBall[1]< allBlocks[i].tLeft[1] +20) ) {
                console.log(229, currentPosBall[0] + " " + currentPosBall[1])
                popSound.play()
                const ogBlocks = Array.from(document.querySelectorAll(".block"))
                ogBlocks[i].classList.remove("block")
                allBlocks.splice(i, 1)
                topBounce()
                score += 1000
                scoreRefresh() 
                
                    // if (score === 7000) {
                    //     xBall = 6
                    //     yBall = 8
                    // }
                    // if (score === 10000) {
                    //     xBall = 8
                    //     yBall = 8
                    // }
                    // if (score === 16000) {
                    //     xBall = 10
                    //     yBall = 10
                    // }
                    // if (score === 22000) {
                    //     xBall = 12
                    //     yBall = 11
                    // }
            }
    }
//top of paddle
    if (currentPosBall[0]> (currentPos[0]) && currentPosBall[0]< (currentPos[0]+58 ) && //left of paddle
    currentPosBall[1] < (currentPos[1]+25) && currentPosBall[1] > (currentPos[1]-10)) {
        console.log(258, currentPosBall[0] + " " + currentPosBall[1])
        tickSound.play()
        topBounceLeft()
    }  
    if (currentPosBall[0]> (currentPos[0]+62) && currentPosBall[0]< (currentPos[0]+120 ) && //right of paddle
    currentPosBall[1] < (currentPos[1]+25) && currentPosBall[1] > (currentPos[1]-10))  {
        console.log(264, currentPosBall[0] + " " + currentPosBall[1])
        tickSound.play()
        topBounceRight()
    }  
//bottom
    // if (currentPosBall[0]> (currentPos[0]-10) && currentPosBall[0]< (currentPos[0]+60 ) && //left of paddle
    // currentPosBall[1] < (currentPos[1]+22) && currentPosBall[1] > (currentPos[1]-10)) {
    //     console.log(258, currentPosBall[0] + " " + currentPosBall[1])
    //     tickSound.play()
    //     topBounceLeft()
    // } 
    // if (currentPosBall[0]> (currentPos[0]+60) && currentPosBall[0]< (currentPos[0]+130 ) && //right of paddle
    // currentPosBall[1] < (currentPos[1]+22) && currentPosBall[1] > (currentPos[1]-10))  {
    //     console.log(264, currentPosBall[0] + " " + currentPosBall[1])
    //     tickSound.play()
    //     topBounceRight()
    // } 
//sides of paddle
    // if (currentPosBall[0]> (currentPos[0]-10) && currentPosBall[0]< (currentPos[0] +60) && // left side
    // currentPosBall[1] < (currentPos[1]+35) && currentPosBall[1] > (currentPos[1]+10)) {
    //     console.log(271, currentPosBall[0] + " " + currentPosBall[1])
    //     tickSound.play()
    //     wallBounce()
    // }  
    // if (currentPosBall[0]< (currentPos[0] + 130) && currentPosBall[0]> (currentPos[0]+60 ) && // right side
    // currentPosBall[1] < (currentPos[1]+35) && currentPosBall[1] > (currentPos[1] +10)) {
    //     console.log(277, currentPosBall[0] + " " + currentPosBall[1])
    //     tickSound.play()
    //     wallBounce()
    // }  

    if ((currentPosBall[0]>= 970) ||  (currentPosBall[0]<= 2) ) {
        console.log(283, currentPosBall[0] + " " + currentPosBall[1])
        wallBounce()
    }
    else if ((currentPosBall[1] >= 478 )|| currentPosBall[1]<= 2) {
        console.log(287, currentPosBall[0] + " " + currentPosBall[1])
        topBounce()
        if (currentPosBall[1]<= 2) {
            lostSound.play()

            minusLife()
            if (livesCount <= 0) {
                isOver = !isOver
                livesCount = "game over"
                pauseScreen.innerHTML = 'Game over!<br>'
                createBtn();
                pauseScreen.style.display = 'block'
                isPaused = !isPaused
                yBall = -yBall
                tickSound.play()
                clearInterval(Interval);
            }
            scoreRefresh() 
        }
    }
    if (score === 24000) {
        isOver = !isOver
        isPaused = !isPaused
        winSound.play()
        pauseScreen.innerHTML = 'You won!<br>'
        createBtn();
        pauseScreen.style.display = 'block'
        document.body.style.background = "yellow"
        score = "YOU WON"
        scoreRefresh()
        clearInterval(Interval);
        
    }
}

function topBounce() {
 yBall = -yBall
 tickSound.play()

 return
}
function topBounceRight() {
    xBall = (Math.abs(xBall))
    yBall = -yBall
    tickSound.play()
    return
}

function topBounceLeft() {
    xBall = -(Math.abs(xBall))
    yBall = -yBall
    tickSound.play()
    return
}

function wallBounce() {
    xBall = -xBall
    tickSound.play()

    return
}
createBlocks()
summonPaddle()

setInterval (update, 20);

function update() {
    move();
}

scoreRefresh() 
animate()



