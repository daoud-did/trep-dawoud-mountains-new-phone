/* ═══════════════════════════════════════════════════════════════════════
   🏔️ TREP DAWOUD - Neon Lights & Glow Effects
   ═══════════════════════════════════════════════════════════════════════ */

class LightsEffect {
    constructor(element) {
        this.element = element;
        this.neonColors = [
            { r: 0, g: 208, b: 132 },     // Neon Dark Green
            { r: 255, g: 0, b: 128 },     // Neon Pink
            { r: 0, g: 255, b: 65 },      // Neon Green
            { r: 181, g: 0, b: 255 },     // Neon Purple
            { r: 255, g: 107, b: 53 }     // Neon Orange
        ];
        this.currentColor = this.neonColors[0];
        this.init();
    }

    init() {
        this.applyInitialGlow();
        this.startColorAnimation();
    }

    applyInitialGlow() {
        const color = `rgb(${this.currentColor.r}, ${this.currentColor.g}, ${this.currentColor.b})`;
        this.element.style.boxShadow = `
            0 0 10px ${color},
            0 0 20px ${color},
            0 0 30px ${color},
            0 0 40px ${color},
            inset 0 0 20px rgba(255, 255, 255, 0.1)
        `;
    }

    startColorAnimation() {
        let colorIndex = 0;
        setInterval(() => {
            colorIndex = (colorIndex + 1) % this.neonColors.length;
            this.currentColor = this.neonColors[colorIndex];
            this.applyInitialGlow();
        }, 3000);
    }

    // Create floating particles
    createParticles(count = 20) {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            border-radius: inherit;
        `;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 2;
            const delay = Math.random() * 2;
            const duration = Math.random() * 3 + 2;
            const colorIndex = Math.floor(Math.random() * this.neonColors.length);
            const color = this.neonColors[colorIndex];

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgb(${color.r}, ${color.g}, ${color.b}), transparent);
                border-radius: 50%;
                box-shadow: 0 0 ${size * 2}px rgb(${color.r}, ${color.g}, ${color.b});
                animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                filter: drop-shadow(0 0 ${size}px rgb(${color.r}, ${color.g}, ${color.b}));
            `;

            particlesContainer.appendChild(particle);
        }

        this.element.appendChild(particlesContainer);

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0;
                }
                25% {
                    opacity: 1;
                }
                75% {
                    opacity: 1;
                }
                100% {
                    transform: translate(${Math.random() * 100 - 50}px, -${Math.random() * 200 + 100}px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Create light rays effect
    createLightRays() {
        const raysContainer = document.createElement('div');
        raysContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            border-radius: inherit;
        `;

        for (let i = 0; i < 3; i++) {
            const ray = document.createElement('div');
            const rotation = (i * 120) + Math.random() * 30;
            const colorIndex = i % this.neonColors.length;
            const color = this.neonColors[colorIndex];

            ray.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    ${rotation}deg,
                    transparent,
                    rgba(${color.r}, ${color.g}, ${color.b}, 0.1),
                    transparent
                );
                animation: rotateLightRay ${4 + i}s linear infinite;
                transform-origin: center;
            `;

            raysContainer.appendChild(ray);
        }

        this.element.appendChild(raysContainer);

        // Add rotation animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rotateLightRay {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Pulse effect
    enablePulse(intensity = 1) {
        let pulseIntensity = 0;
        const direction = 1;

        const pulse = setInterval(() => {
            pulseIntensity += 0.05 * direction;

            if (pulseIntensity >= 1) pulseIntensity = 1;
            if (pulseIntensity <= 0) pulseIntensity = 0;

            const color = `rgb(${this.currentColor.r}, ${this.currentColor.g}, ${this.currentColor.b})`;
            const glowSize = 20 + pulseIntensity * 20;

            this.element.style.boxShadow = `
                0 0 ${glowSize}px ${color},
                0 0 ${glowSize * 2}px ${color},
                0 0 ${glowSize * 3}px ${color},
                0 0 ${glowSize * 4}px ${color},
                inset 0 0 20px rgba(255, 255, 255, 0.1)
            `;
        }, 50);

        return pulse;
    }

    // Thunder effect
    createThunderEffect() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes thunderFlash {
                0%, 8%, 15%, 100% {
                    filter: brightness(1);
                }
                3%, 12% {
                    filter: brightness(1.5);
                }
            }
        `;
        document.head.appendChild(style);

        this.element.style.animation = 'thunderFlash 2s ease-in-out';
    }

    // Disable all effects
    disable() {
        this.element.style.boxShadow = 'none';
        this.element.style.animation = 'none';
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LightsEffect;
}
