let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function randomInt(min, max) {
    return Math.random() * (max - min) + min;
}

function radians(deg) {
    return (Math.PI/180)*deg;
}

let xArc = canvas.width/2;
let yArc = canvas.height/2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(xArc, yArc, 5, 0, Math.PI*2);
    ctx.lineWidth = 1;
    ctx.fillStyle = "rgb(43, 2, 158)";
    ctx.strokeStyle = "rgb(43, 2, 158)";
    ctx.fill();
    ctx.stroke();
}

let yMoveBot = (canvas.height/2)-25;

function drawRcktBot() {
    ctx.fillStyle = "rgb(61, 45, 186)";
    ctx.fillRect(3, yMoveBot, 7, 50);
}

function drawRcktPlayer(yMove) {
    ctx.fillStyle = "rgb(61, 45, 186)";
    ctx.fillRect(canvas.width-10, yMove, 7, 50);
}

let counterPlayer = 0;
let counterBot = 0;


let Xstep = 1;
let Ystep = 1;

let yMove_ = (canvas.height/2)-25;

function collisionWithRckt() {
    if (xArc+5 >= canvas.width-10 && yArc >= yMove_ && yArc <= yMove_+50) {
        return true;
    }
    else {
        return false;
    }
}

function collisionWithRcktBot() {
    if (xArc <= 10 && yArc >= yMoveBot && yArc <= yMoveBot+50) {
        return true;
    }
    else {
        return false;
    }
}

function moveYbotEasy() {
    yMoveBot = (yArc - 2) + randomInt(1, 10);
    if (yMoveBot < 0) {
        yMoveBot = 0;
    }
    else if (yMoveBot + 50 > canvas.height) {
        yMoveBot = canvas.height - 50;
    }
}

function moveYbotHard() {
    yMoveBot = yArc - 22;
    if (yMoveBot < 0) {
        yMoveBot = 0;
    }
    else if (yMoveBot + 50 > canvas.height) {
        yMoveBot = canvas.height - 50;
    }
}

function Default() {
    xArc = canvas.width/2;
    yArc = canvas.height/2;
    counterBot = counterPlayer = 0;
    yMoveBot = (canvas.height/2)-25;
    yMove_ = (canvas.height/2)-25;
}

function button_run_inline() {
    document.getElementById("button_run").style.display = "inline";
}


function draw() {
    let counterValue = document.getElementById("cv").value;
    let LevelValue = "o_hard"; // document.getElementById("s_Level").value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(86, 196, 148)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke()
    ctx.font = "30px Arial";
    ctx.fillStyle = "rgb(248, 255, 235)";
    ctx.fillText(counterBot, canvas.width/4, canvas.height/5);
    ctx.fillText(counterPlayer, (canvas.width/4)*3, canvas.height/5);
    drawBall();
    drawRcktBot();
    drawRcktPlayer(yMove_);
    xArc += Xstep;
    yArc += Ystep;
    if (xArc >= canvas.width-5) {
        xArc = canvas.width/2;
        yArc = canvas.height/2;
        counterBot += 1;
    }
    else if (xArc <= 5) {
        xArc = canvas.width/2;
        yArc = canvas.height/2;
        counterPlayer += 1;
    }
    else if (yArc >= canvas.height-5) {
        yArc = canvas.height-5;
        Ystep *= -1;
    }
    else if (yArc <= 5) {
        yArc = 5;
        Ystep *= -1;
    }
    //else if (xArc >= canvas.width-10 && yArc >= yMove_ && yArc <= yMove_+50) {
    //    xArc = canvas.width-15;
    //    Xstep *= -1;
    //}
    if (collisionWithRckt() == true) {
        xArc = canvas.width-15;
        Xstep *= -1;
    }
    else if (collisionWithRcktBot() == true) {
        xArc = 15;
        Xstep *= -1;
    }
    if (counterBot == counterValue) {
        document.getElementById("div_button").innerHTML = "Bot won!";
        button_run_inline();
        clearInterval(timerPlay);
        Default();
        setTimeout(draw, 1);
    }
    else if (counterPlayer == counterValue) {
        document.getElementById("div_button").innerHTML = "You won!";
        button_run_inline();
        clearInterval(timerPlay);
        Default();
        setTimeout(draw, 1);
    }
    if (LevelValue == "o_hard") {
        moveYbotHard();
    }
    else if (LevelValue == "o_easy") {
        moveYbotEasy();
    }
    
}


function MoveDown(e) {
    if (e.key == "ArrowDown" || e.key == "Down" || e.code == "KeyS") {
        yMove_ += 4;
    }
    if (yMove_ + 50 > canvas.height) {
        yMove_ = canvas.height - 50;
    }
}

function MoveUp(e) {
    if (e.key == "ArrowUp" || e.key == "Up" || e.code == "KeyW") {
        yMove_ -= 4;
    }
    if (yMove_ < 0) {
        yMove_ = 0;
    }
}


document.addEventListener("keydown", MoveDown);
document.addEventListener("keydown", MoveUp);

setTimeout(draw, 1);

let timerPlay;

button_run.onclick = function() {
    timerPlay = setInterval(draw, 7);
    document.getElementById("button_run").style.display = "none";
}
