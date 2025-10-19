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

function updatePauseButtonText() {
	if (elements.pauseBtn) {
		elements.pauseBtn.textContent = controls.isPaused ? "Resume" : "Pause";
	}
}

function togglePause() {
    controls.isPaused = !controls.isPaused;
	updatePauseButtonText();
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
    
    // Touch support for mobile
    document.addEventListener("touchstart", touchStartHandler);
    document.addEventListener("touchmove", touchMoveHandler);
    document.addEventListener("touchend", touchEndHandler);
    
    elements.failureBtn.addEventListener('click', reloadPage);
    elements.successBtn.addEventListener('click', reloadPage);
    elements.pauseBtn.addEventListener("click", togglePause);
    
    // Initialize sound toggle button state
    if (elements.soundToggleBtn) {
        const isEnabled = isSoundEnabled();
        elements.soundToggleBtn.textContent = isEnabled ? "🔊 Sound On" : "🔇 Sound Off";
        elements.soundToggleBtn.classList.toggle("muted", !isEnabled);
    }
    
    listenersAttached = true;
}

// Touch handlers for mobile support
function touchStartHandler(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = config.canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    
    if (x < config.canvas.width / 2) {
        controls.leftPressed = true;
        controls.rightPressed = false;
    } else {
        controls.rightPressed = true;
        controls.leftPressed = false;
    }
}

function touchMoveHandler(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = config.canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    
    if (x < config.canvas.width / 2) {
        controls.leftPressed = true;
        controls.rightPressed = false;
    } else {
        controls.rightPressed = true;
        controls.leftPressed = false;
    }
}

function touchEndHandler(e) {
    e.preventDefault();
    controls.leftPressed = false;
    controls.rightPressed = false;
}
