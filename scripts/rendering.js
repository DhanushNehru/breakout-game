const ctx = config.canvas.getContext('2d');

function drawBall(x, y, ballRadius) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    // Prefer live color from gameState if available, otherwise fall back to config
    const ballColor = (typeof gameState !== 'undefined' && gameState.ballColor) ? gameState.ballColor : config.ballColor;
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(paddleX) {
    ctx.beginPath();
    ctx.rect(paddleX, config.canvas.height-config.paddleHeight, config.paddleWidth, config.paddleHeight);
    ctx.fillStyle = "pink";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(bricks) {
    for(let c=0; c<bricks.length; c++) {
        for(let r=0; r<bricks[c].length; r++) {
            if(bricks[c][r].status == 1) {
                let brickX = bricks[c][r].x;
                let brickY = bricks[c][r].y;
                ctx.beginPath();
                ctx.rect(brickX, brickY, config.brickWidth, config.brickHeight);
                ctx.fillStyle = utilsColor(c, r, config.modeColor);
                ctx.fill();

                // draw block lives
                ctx.font = `${config.brickHeight-2}px Arial`;
                ctx.fillStyle = "#FFFFFF";
                ctx.fillText(bricks[c][r].lives, brickX+(config.brickWidth/2), brickY+config.brickHeight-2);

                ctx.closePath();
            }
        }
    }
}

function drawScore(score) {
    ctx.font = "20px Roboto";
    ctx.fillStyle = document.body.classList.contains('light-mode') ? "#222" : "#fff";
    ctx.textAlign = 'left';
    ctx.fillText("Score: " + score, 8, 25);
}

function drawLives(lives) {
    ctx.save();
    ctx.font = "20px Roboto";
    ctx.fillStyle = document.body.classList.contains('light-mode') ? "#222" : "#fff";
    ctx.textAlign = 'right';
    ctx.fillText("Lives: " + lives, config.canvas.width - 8, 25);
    ctx.restore();
}

function clearCanvas() {
    ctx.clearRect(0, 0, config.canvas.width, config.canvas.height);
}
