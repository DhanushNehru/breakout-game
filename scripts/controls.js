const controls = {
    rightPressed: false,
    leftPressed: false,
    isPaused: false
};

let listenersAttached = false;

function keyDownHandler(e) {
    // "D" or right arrow key for right and "A" or left arrow key for left movement 
    if(e.code == "KeyD" || e.code == "ArrowRight") {
        controls.rightPressed = true;
    }
    
    if(e.code == "KeyA" || e.code == "ArrowLeft") {
        controls.leftPressed = true;
    }

    // Add pause functionality on 'P' key press
    if(e.code == "KeyP") {
        togglePause();
    }
}

function keyUpHandler(e) {
    if(e.code == "KeyD" || e.code == "ArrowRight") {
        controls.rightPressed = false;
    }
    
    if(e.code == "KeyA" || e.code == "ArrowLeft") {
        controls.leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    if (!controls.isPaused) {
        let relativeX = e.clientX - config.canvas.offsetLeft;
        if(relativeX > 0+config.paddleWidth/2 && relativeX < config.canvas.width-config.paddleWidth/2) {
            gameState.paddleX = relativeX - config.paddleWidth/2;
        }
    }
}

function togglePause() {
    controls.isPaused = !controls.isPaused;
    if (controls.isPaused) {
        elements.pauseBtn.textContent = "Resume";
    } else {
        elements.pauseBtn.textContent = "Pause";
    }
}

function reloadPage() {
    init();
}

function setupEventListeners() {
    if (listenersAttached) {
        return;
    }
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    document.addEventListener("mousemove", mouseMoveHandler);
    
    elements.failureBtn.addEventListener('click', reloadPage);
    elements.successBtn.addEventListener('click', reloadPage);
    elements.pauseBtn.addEventListener("click", togglePause);
    listenersAttached = true;
}
