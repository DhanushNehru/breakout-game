// Sound system for the breakout game
const soundSystem = {
    enabled: true,
    volume: 0.5,
    sounds: {
        ballHit: null,
        brickBreak: null,
        powerUp: null,
        levelUp: null,
        gameOver: null,
        gameWin: null,
        paddleHit: null
    }
};

// Create audio context and sounds using Web Audio API
function initSoundSystem() {
    try {
        // Create audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Generate sound effects using oscillators
        soundSystem.sounds.ballHit = createTone(audioContext, 800, 0.1, 'sine');
        soundSystem.sounds.brickBreak = createTone(audioContext, 1200, 0.2, 'square');
        soundSystem.sounds.powerUp = createTone(audioContext, 1000, 0.3, 'triangle');
        soundSystem.sounds.levelUp = createTone(audioContext, 1500, 0.5, 'sawtooth');
        soundSystem.sounds.gameOver = createTone(audioContext, 200, 1.0, 'sine');
        soundSystem.sounds.gameWin = createTone(audioContext, 2000, 0.8, 'triangle');
        soundSystem.sounds.paddleHit = createTone(audioContext, 600, 0.15, 'sine');
        
        console.log('Sound system initialized successfully');
    } catch (error) {
        console.log('Sound system not available:', error);
        soundSystem.enabled = false;
    }
}

// Create a tone using Web Audio API
function createTone(audioContext, frequency, duration, waveType) {
    return function() {
        if (!soundSystem.enabled) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = waveType;
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(soundSystem.volume, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    };
}

// Play sound effects
function playSound(soundName) {
    if (soundSystem.enabled && soundSystem.sounds[soundName]) {
        try {
            soundSystem.sounds[soundName]();
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    }
}

// Toggle sound on/off
function toggleSound() {
    soundSystem.enabled = !soundSystem.enabled;
    return soundSystem.enabled;
}

// Set volume (0.0 to 1.0)
function setVolume(volume) {
    soundSystem.volume = Math.max(0, Math.min(1, volume));
}

// Get current volume
function getVolume() {
    return soundSystem.volume;
}

// Check if sound is enabled
function isSoundEnabled() {
    return soundSystem.enabled;
}

// Sound effect functions for different game events
function playBallHitSound() {
    playSound('ballHit');
}

function playBrickBreakSound() {
    playSound('brickBreak');
}

function playPowerUpSound() {
    playSound('powerUp');
}

function playLevelUpSound() {
    playSound('levelUp');
}

function playGameOverSound() {
    playSound('gameOver');
}

function playGameWinSound() {
    playSound('gameWin');
}

function playPaddleHitSound() {
    playSound('paddleHit');
}

// Initialize sound system when page loads
document.addEventListener('DOMContentLoaded', initSoundSystem);
