// Particle system for visual effects
const particles = {
    active: [],
    maxParticles: 50
};

// Create particle effect when brick is destroyed
function createBrickParticles(x, y, color) {
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = {
            x: x + config.brickWidth / 2,
            y: y + config.brickHeight / 2,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 1.0,
            decay: 0.02,
            size: Math.random() * 4 + 2,
            color: color || '#FFFFFF'
        };
        
        particles.active.push(particle);
    }
    
    // Limit particle count
    if (particles.active.length > particles.maxParticles) {
        particles.active = particles.active.slice(-particles.maxParticles);
    }
}

// Create particle effect for ball hits
function createBallParticles(x, y) {
    const particleCount = 5;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 0.8,
            decay: 0.03,
            size: Math.random() * 3 + 1,
            color: '#FFFF00'
        };
        
        particles.active.push(particle);
    }
}

// Update all particles
function updateParticles() {
    for (let i = particles.active.length - 1; i >= 0; i--) {
        const particle = particles.active[i];
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Apply gravity
        particle.vy += 0.1;
        
        // Update life
        particle.life -= particle.decay;
        
        // Remove dead particles
        if (particle.life <= 0) {
            particles.active.splice(i, 1);
        }
    }
}

// Draw all particles
function drawParticles() {
    particles.active.forEach(particle => {
        const alpha = particle.life;
        const size = particle.size * alpha;
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
}

// Create explosion effect
function createExplosion(x, y, color = '#FF6B6B') {
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = Math.random() * 6 + 2;
        
        const particle = {
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1.0,
            decay: 0.015,
            size: Math.random() * 5 + 3,
            color: color
        };
        
        particles.active.push(particle);
    }
}
