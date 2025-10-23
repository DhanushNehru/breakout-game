// High score system using localStorage
const highScore = {
    key: 'breakout_high_score',
    current: 0,
    best: 0
};

// Load high score from localStorage
function loadHighScore() {
    const saved = localStorage.getItem(highScore.key);
    if (saved) {
        highScore.best = parseInt(saved, 10);
    }
    return highScore.best;
}

// Save high score to localStorage
function saveHighScore(score) {
    if (score > highScore.best) {
        highScore.best = score;
        localStorage.setItem(highScore.key, score.toString());
        return true; // New high score!
    }
    return false;
}

// Update current score and check for high score
function updateScore(points) {
    highScore.current += points;
    return saveHighScore(highScore.current);
}

// Reset current score
function resetCurrentScore() {
    highScore.current = 0;
}

// Get current score
function getCurrentScore() {
    return highScore.current;
}

// Get best score
function getBestScore() {
    return highScore.best;
}
