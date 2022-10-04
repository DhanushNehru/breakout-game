let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let x = canvas.width/2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 25;
let paddleHeight = 10;
let paddleWidth = 100;
let paddleX = (canvas.width-paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 5;
let brickColumnCount = 8;
let brickWidth = 100;
let brickHeight = 10;
let brickPadding = 7;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
let lives = 3;
let modeColor = 'row';


let failure = document.querySelector('.failure');
let failureBtn = document.querySelector('#failureBtn');
let success = document.querySelector('.success');
let successBtn = document.querySelector('#successBtn');


function reloadPage() {
	document.location.reload();
}

function resetValues(element) {
	ballRadius = 0;
	lives = 0;
	score = 0;
	paddleWidth = 0;
	element.style.top = "40%";
}

//reloads page OnClick
failureBtn.addEventListener('click', () => {
	reloadPage();
});

successBtn.addEventListener('click', () => {
	reloadPage();
});

changeBrickColumnCountAndOffsetLeft()
let bricks = [];
for (c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for (r=0; r<brickRowCount; r++) {
		bricks[c][r] = {x: 0, y:0, status: 1};
	}
}
/*
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
*/
function changeBrickColumnCountAndOffsetLeft(){
	let lengthBriks = (brickColumnCount*(brickWidth+brickPadding))+brickOffsetLeft
	while (lengthBriks >= canvas.width) {
		brickColumnCount = brickColumnCount -1;
		lengthBriks = (brickColumnCount*(brickWidth+brickPadding))+brickOffsetLeft
	}
	brickOffsetLeft = ( (canvas.width - lengthBriks) + brickOffsetLeft ) / 2
}

function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = utilsColor(c,r, modeColor);
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "pink";
	ctx.fill();
	ctx.closePath();
}

function collisionDetection() {
	for(c=0; c<brickColumnCount; c++){
		for(r=0; r<brickRowCount; r++){
			let b = bricks[c][r];
			if(b.status  == 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					if(score == brickRowCount*brickColumnCount) {
						resetValues(success);
					}
				}
			}
		}
	}
}

function drawScore () {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	drawBricks()
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();

	if(y + dy < ballRadius) {
		dy = -dy;
	} else if (y + dy > canvas.height-ballRadius) {
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		} else {
			lives--;
			if(!lives) {
				resetValues(failure);
			} else {
				x = canvas.width/2;
				y = canvas.height-30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width-paddleWidth)/2;
			}
		}
	}
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}

	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= 7;
	}

	x += dx;
	y += dy;
	requestAnimationFrame(draw);
}


document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e) {
	let relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0+paddleWidth/2 && relativeX < canvas.width-paddleWidth/2) {
		paddleX = relativeX - paddleWidth/2;
	}
}

document.addEventListener("keypress", keyDownHandler);

function keyDownHandler(e) {
	// "D" for right and "A" for left movement 
	if(e.code == "KeyD") {

		let relativeX = paddleX + 10;
		if(relativeX < canvas.width - 100) {
			paddleX = relativeX + 10;
		}
	}
	
	if(e.code == "KeyA") {

		let relativeX = paddleX - 10;
		if(relativeX > 0 ) {
			paddleX = relativeX - 10;
		}
	}
}

draw();