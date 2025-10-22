// Power-up system for the breakout game
const powerUps = {
    types: {
        MULTI_BALL: 'multi_ball',
        BIG_PADDLE: 'big_paddle',
        SMALL_PADDLE: 'small_paddle',
        EXTRA_LIFE: 'extra_life',
        SLOW_BALL: 'slow_ball',
        FAST_BALL: 'fast_ball',
        MAGNET: 'magnet'
    },
    
    active: [],
    effects: {
        multi_ball: { duration: 10000, active: false },
        big_paddle: { duration: 15000, active: false },
        small_paddle: { duration: 10000, active: false },
        extra_life: { duration: 0, active: false },
        slow_ball: { duration: 12000, active: false },
        fast_ball: { duration: 10000, active: false },
        magnet: { duration: 8000, active: false }
    }
};

// Power-up drop chance (20% chance for special bricks)
const POWER_UP_DROP_CHANCE = 0.2;

// Create a power-up drop
function createPowerUp(x, y) {
    if (Math.random() < POWER_UP_DROP_CHANCE) {
        const types = Object.values(powerUps.types);
        const type = types[Math.floor(Math.random() * types.length)];
        
        const powerUp = {
            x: x,
            y: y,
            type: type,
            width: 20,
            height: 20,
            speed: 2,
            active: true
        };
        
        powerUps.active.push(powerUp);
    }
}

// Update power-up positions
function updatePowerUps() {
    for (let i = powerUps.active.length - 1; i >= 0; i--) {
        const powerUp = powerUps.active[i];
        powerUp.y += powerUp.speed;
        
        // Remove if off screen
        if (powerUp.y > config.canvas.height) {
            powerUps.active.splice(i, 1);
        }
    }
}

// Check power-up collisions with paddle
function checkPowerUpCollisions() {
    for (let i = powerUps.active.length - 1; i >= 0; i--) {
        const powerUp = powerUps.active[i];
        
        if (powerUp.x < gameState.paddleX + config.paddleWidth &&
            powerUp.x + powerUp.width > gameState.paddleX &&
            powerUp.y < config.canvas.height &&
            powerUp.y + powerUp.height > config.canvas.height - config.paddleHeight) {
            
            activatePowerUp(powerUp.type);
            powerUps.active.splice(i, 1);
        }
    }
}

// Activate a power-up effect
function activatePowerUp(type) {
    // Play power-up sound
    if (typeof playPowerUpSound === 'function') {
        playPowerUpSound();
    }
    
    switch (type) {
        case powerUps.types.MULTI_BALL:
            createMultiBall();
            break;
        case powerUps.types.BIG_PADDLE:
            powerUps.effects.big_paddle.active = true;
            config.paddleWidth = 150;
            setTimeout(() => {
                powerUps.effects.big_paddle.active = false;
                config.paddleWidth = 100;
            }, powerUps.effects.big_paddle.duration);
            break;
        case powerUps.types.SMALL_PADDLE:
            powerUps.effects.small_paddle.active = true;
            config.paddleWidth = 60;
            setTimeout(() => {
                powerUps.effects.small_paddle.active = false;
                config.paddleWidth = 100;
            }, powerUps.effects.small_paddle.duration);
            break;
        case powerUps.types.EXTRA_LIFE:
            gameState.lives++;
            break;
        case powerUps.types.SLOW_BALL:
            powerUps.effects.slow_ball.active = true;
            gameState.speed *= 0.5;
            setTimeout(() => {
                powerUps.effects.slow_ball.active = false;
                gameState.speed *= 2;
            }, powerUps.effects.slow_ball.duration);
            break;
        case powerUps.types.FAST_BALL:
            powerUps.effects.fast_ball.active = true;
            gameState.speed *= 1.5;
            setTimeout(() => {
                powerUps.effects.fast_ball.active = false;
                gameState.speed /= 1.5;
            }, powerUps.effects.fast_ball.duration);
            break;
        case powerUps.types.MAGNET:
            powerUps.effects.magnet.active = true;
            setTimeout(() => {
                powerUps.effects.magnet.active = false;
            }, powerUps.effects.magnet.duration);
            break;
    }
}

// Create additional balls for multi-ball power-up
function createMultiBall() {
    // This would create additional ball objects
    // For now, we'll just increase the ball speed temporarily
    gameState.speed *= 1.2;
}

// Get power-up color based on type
function getPowerUpColor(type) {
    const colors = {
        [powerUps.types.MULTI_BALL]: '#FF6B6B',
        [powerUps.types.BIG_PADDLE]: '#4ECDC4',
        [powerUps.types.SMALL_PADDLE]: '#45B7D1',
        [powerUps.types.EXTRA_LIFE]: '#96CEB4',
        [powerUps.types.SLOW_BALL]: '#FFEAA7',
        [powerUps.types.FAST_BALL]: '#DDA0DD',
        [powerUps.types.MAGNET]: '#98D8C8'
    };
    return colors[type] || '#FFFFFF';
}

// Get power-up symbol based on type
function getPowerUpSymbol(type) {
    const symbols = {
        [powerUps.types.MULTI_BALL]: '⚽',
        [powerUps.types.BIG_PADDLE]: '📏',
        [powerUps.types.SMALL_PADDLE]: '📐',
        [powerUps.types.EXTRA_LIFE]: '❤️',
        [powerUps.types.SLOW_BALL]: '🐌',
        [powerUps.types.FAST_BALL]: '⚡',
        [powerUps.types.MAGNET]: '🧲'
    };
    return symbols[type] || '?';
}
