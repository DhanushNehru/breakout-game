const config = {
    // Canvas
    canvas: document.getElementById('myCanvas'),
    
    // Ball
    ballRadius: 25,
    initialSpeed: 2,
    
    // Paddle
    paddleHeight: 10,
    paddleWidth: 100,
    
    // Bricks
    brickRowCount: 5,
    brickColumnCount: 8,
    brickWidth: 100,
    brickHeight: 15,
    brickPadding: 7,
    brickOffsetTop: 30,
    brickOffsetLeft: 30,
    
    // Game state
    initialLives: 3,
    modeColor: 'row',
    currentTheme: 'classic'
};

const elements = {
    failure: document.querySelector('.failure'),
    failureBtn: document.querySelector('#failureBtn'),
    success: document.querySelector('.success'),
    successBtn: document.querySelector('#successBtn'),
    pauseBtn: document.getElementById('pauseBtn'),
    speedSlider: document.querySelector("#speed-slider"),
    sizeSlider: document.querySelector("#size-slider"),
    themeSelector: document.querySelector("#theme-selector"),
    soundToggleBtn: document.getElementById('soundToggleBtn')
};

function getRandomArbitrary(min, max, toInt=false) {
    let value = Math.random() * (max - min) + min;
    if(toInt){
        return Math.round(value)
    }
    return value
}

// If utilsColor is defined in the global space, we don't need to declare it here 