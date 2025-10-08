const gameState = {
    x: config.canvas.width/2,
    y: config.canvas.height - 30,
    dx: config.initialSpeed,
    dy: -config.initialSpeed,
    speed: config.initialSpeed,
    ballRadius: config.ballRadius,
    // current ball color (can be changed at runtime)
    ballColor: config.ballColor,
    paddleX: (config.canvas.width-config.paddleWidth)/2,
    score: 0,
    lives: config.initialLives,
    bricks: [],
    gameOver: false
};

function updatePaddleX(newPaddleX) {
    gameState.paddleX = newPaddleX;
}

// Initialize bricks
function initBricks() {
    changeBrickColumnCountAndOffsetLeft();
    
    // Clear existing bricks array
    gameState.bricks = [];
    
    for (let c=0; c<config.brickColumnCount; c++) {
        gameState.bricks[c] = [];
        for (let r=0; r<config.brickRowCount; r++) {
            gameState.bricks[c][r] = {
                x: 0, 
                y: 0, 
                status: 1, 
                lives: getRandomArbitrary(1, 5, true)
            };
        }
    }
    
    // Calculate brick positions
    for (let c=0; c<config.brickColumnCount; c++) {
        for (let r=0; r<config.brickRowCount; r++) {
            if (gameState.bricks[c][r].status == 1) {
                let brickX = (c*(config.brickWidth+config.brickPadding))+config.brickOffsetLeft;
                let brickY = (r*(config.brickHeight+config.brickPadding))+config.brickOffsetTop;
                gameState.bricks[c][r].x = brickX;
                gameState.bricks[c][r].y = brickY;
            }
        }
    }
}

function changeBrickColumnCountAndOffsetLeft() {
    let lengthBricks = (config.brickColumnCount*(config.brickWidth+config.brickPadding))+config.brickOffsetLeft;
    while (lengthBricks >= config.canvas.width) {
        config.brickColumnCount = config.brickColumnCount - 1;
        lengthBricks = (config.brickColumnCount*(config.brickWidth+config.brickPadding))+config.brickOffsetLeft;
    }
    config.brickOffsetLeft = ((config.canvas.width - lengthBricks) + config.brickOffsetLeft) / 2;
}

// Collision detection
function collisionDetection() {
    for(let c=0; c<config.brickColumnCount; c++){
        for(let r=0; r<config.brickRowCount; r++){
            let b = gameState.bricks[c][r];
            if(b && b.status == 1) {
                let sideCollision = false;
                if(gameState.x+gameState.ballRadius > b.x && 
                   gameState.x-gameState.ballRadius < b.x+config.brickWidth && 
                   gameState.y+gameState.ballRadius > b.y && 
                   gameState.y-gameState.ballRadius < b.y+config.brickHeight) {
                    
                    if(gameState.y > b.y && gameState.y < b.y+config.brickHeight){
                        if(gameState.x < b.x || gameState.x > b.x+config.brickWidth){
                            gameState.dx = -gameState.dx;
                            sideCollision = true;
                        }
                    }

                    if(!sideCollision){
                        gameState.dy = -gameState.dy;
                    }

                    b.lives -= 1;
                    if(b.lives == 0){
                        b.status = 0;
                        gameState.score++;
                    }
                    if(gameState.score == config.brickRowCount*config.brickColumnCount) {
                        resetValues(elements.success);
                    }
                    return;
                }
            }
        }
    }
}

function resetValues(element) {
    gameState.ballRadius = 0;
    gameState.lives = 0;
    gameState.score = 0;
    config.paddleWidth = 0;
    element.style.top = "40%";
    gameState.gameOver = true;
}

// Update game settings from sliders
function setupSliders() {
    elements.speedSlider.addEventListener("input", () => {
        gameState.speed = parseFloat(elements.speedSlider.value);
        if (!controls.isPaused) {
            gameState.dx = gameState.dx > 0 ? gameState.speed : -gameState.speed;
            gameState.dy = gameState.dy > 0 ? gameState.speed : -gameState.speed;
        }
    });

    elements.sizeSlider.addEventListener("input", () => {
        gameState.ballRadius = parseInt(elements.sizeSlider.value);
    });

    // Color picker listener
    if (elements.colorPicker) {
        // initialize picker value from config/gameState
        elements.colorPicker.value = gameState.ballColor || config.ballColor;
        elements.colorPicker.addEventListener('input', () => {
            gameState.ballColor = elements.colorPicker.value;
        });
    }
}

// Main game loop
function draw() {
    clearCanvas();
    drawBricks(gameState.bricks);
    drawBall(gameState.x, gameState.y, gameState.ballRadius);
    drawPaddle(gameState.paddleX);
    drawScore(gameState.score);
    drawLives(gameState.lives);

    if (gameState.gameOver || controls.isPaused) {
        requestAnimationFrame(draw);
        return;
    }

    collisionDetection();

    // Ball wall collision
    if(gameState.y + gameState.dy < gameState.ballRadius) {
        gameState.dy = -gameState.dy;
    } else if (gameState.y + gameState.dy > config.canvas.height-gameState.ballRadius) {
        if(gameState.x > gameState.paddleX && gameState.x < gameState.paddleX + config.paddleWidth) {
            gameState.dy = -gameState.dy;
        } else {
            gameState.lives--;
            if(gameState.lives <= 0) {
                gameState.lives = 0;
                resetValues(elements.failure);
                requestAnimationFrame(draw);
                return;
            } else {
                gameState.x = config.canvas.width/2;
                gameState.y = config.canvas.height-30;
                gameState.dx = gameState.speed;
                gameState.dy = -gameState.speed; 
                gameState.paddleX = (config.canvas.width-config.paddleWidth)/2;
            }
        }
    }
    
    if(gameState.x + gameState.dx > config.canvas.width-gameState.ballRadius || 
       gameState.x + gameState.dx < gameState.ballRadius) {
        gameState.dx = -gameState.dx;
        gameState.dy += getRandomArbitrary(-0.4, 0.4);
    }

    // Paddle movement
    if(controls.rightPressed && gameState.paddleX < config.canvas.width-config.paddleWidth) {
        gameState.paddleX += 7;
    }
    else if(controls.leftPressed && gameState.paddleX > 0) {
        gameState.paddleX -= 7;
    }

    // Move ball
    gameState.x += gameState.dx;
    gameState.y += gameState.dy;

    requestAnimationFrame(draw);
}

// Initialize and start game
function init() {
    // Reset game state
    gameState.gameOver = false;
    gameState.lives = config.initialLives;
    gameState.score = 0;
    gameState.x = config.canvas.width/2;
    gameState.y = config.canvas.height-30;
    gameState.dx = config.initialSpeed;
    gameState.dy = -config.initialSpeed;
    gameState.ballRadius = config.ballRadius;
    // ensure gameState color is set from config on new game
    gameState.ballColor = config.ballColor;
    gameState.paddleX = (config.canvas.width-config.paddleWidth)/2;
    
    setupEventListeners();
    setupSliders();
    initBricks();
    draw();
}
