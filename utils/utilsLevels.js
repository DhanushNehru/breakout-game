// Level system for increasing difficulty
const levelSystem = {
    currentLevel: 1,
    maxLevel: 10,
    levelData: {
        1: { speed: 2, brickRows: 3, brickCols: 6, ballRadius: 15, paddleWidth: 100 },
        2: { speed: 2.5, brickRows: 4, brickCols: 7, ballRadius: 14, paddleWidth: 90 },
        3: { speed: 3, brickRows: 4, brickCols: 8, ballRadius: 13, paddleWidth: 85 },
        4: { speed: 3.5, brickRows: 5, brickCols: 8, ballRadius: 12, paddleWidth: 80 },
        5: { speed: 4, brickRows: 5, brickCols: 9, ballRadius: 11, paddleWidth: 75 },
        6: { speed: 4.5, brickRows: 6, brickCols: 9, ballRadius: 10, paddleWidth: 70 },
        7: { speed: 5, brickRows: 6, brickCols: 10, ballRadius: 9.5, paddleWidth: 65 },
        8: { speed: 5.5, brickRows: 7, brickCols: 10, ballRadius: 9, paddleWidth: 60 },
        9: { speed: 6, brickRows: 7, brickCols: 11, ballRadius: 8.5, paddleWidth: 55 },
        10: { speed: 7, brickRows: 8, brickCols: 12, ballRadius: 8, paddleWidth: 50 }
    }
};

// Check if level should advance
function checkLevelAdvance() {
    if (areAllBricksDestroyed() && levelSystem.currentLevel < levelSystem.maxLevel) {
        advanceLevel();
        return true;
    }
    return false;
}

// Helper function to check if all bricks are destroyed
function areAllBricksDestroyed() {
    // Assumes bricks is a 2D array: bricks[row][col] with .status property (1 = active, 0 = destroyed)
    for (let row = 0; row < bricks.length; row++) {
        for (let col = 0; col < bricks[row].length; col++) {
            if (bricks[row][col].status === 1) {
                return false;
            }
        }
    }
    return true;
}
// Advance to next level
function advanceLevel() {
    levelSystem.currentLevel++;
    const levelData = levelSystem.levelData[levelSystem.currentLevel];
    
    if (levelData) {
        // Update game configuration
        config.initialSpeed = levelData.speed;
        config.brickRowCount = levelData.brickRows;
        config.brickColumnCount = levelData.brickCols;
        config.ballRadius = levelData.ballRadius;
        config.paddleWidth = levelData.paddleWidth;
        
        // Reset game state for new level
        gameState.x = config.canvas.width/2;
        gameState.y = config.canvas.height-30;
        gameState.dx = config.initialSpeed;
        gameState.dy = -config.initialSpeed;
        gameState.ballRadius = config.ballRadius;
        gameState.paddleX = (config.canvas.width-config.paddleWidth)/2;
        gameState.lives = Math.min(gameState.lives + 1, 5); // Bonus life for advancing
        
        // Clear power-ups and particles
        powerUps.active = [];
        particles.active = [];
        
        // Reinitialize bricks
        initBricks();
        
        // Play level up sound
        if (typeof playLevelUpSound === 'function') {
            playLevelUpSound();
        }
        
        // Show level up message
        showLevelUpMessage();
    }
}

// Show level up message
function showLevelUpMessage() {
    // Create temporary level up display
    const levelUpDiv = document.createElement('div');
    levelUpDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
        color: white;
        padding: 20px 40px;
        border-radius: 15px;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        z-index: 1000;
        box-shadow: 0 0 30px rgba(255, 107, 107, 0.5);
        animation: levelUpPulse 2s ease-in-out;
    `;
    
    levelUpDiv.innerHTML = `
        <div>🎉 LEVEL ${levelSystem.currentLevel} 🎉</div>
        <div style="font-size: 16px; margin-top: 10px;">Bonus Life +1!</div>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes levelUpPulse {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(levelUpDiv);
    
    // Remove after animation
    setTimeout(() => {
        if (levelUpDiv.parentNode) {
            levelUpDiv.parentNode.removeChild(levelUpDiv);
        }
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
    }, 2000);
}

// Get current level
function getCurrentLevel() {
    return levelSystem.currentLevel;
}

// Reset level system
function resetLevelSystem() {
    levelSystem.currentLevel = 1;
    const levelData = levelSystem.levelData[1];
    
    config.initialSpeed = levelData.speed;
    config.brickRowCount = levelData.brickRows;
    config.brickColumnCount = levelData.brickCols;
    config.ballRadius = levelData.ballRadius;
    config.paddleWidth = levelData.paddleWidth;
}
