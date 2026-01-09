/* ═══════════════════════════════════════════════════════════════════════
   🏔️ TREP DAWOUD - 3D Snow Effect System
   ═══════════════════════════════════════════════════════════════════════ */

class SnowEffect {
    constructor(container, count = 50) {
        this.container = container;
        this.snowCount = count;
        this.snowflakes = [];
        this.init();
    }

    init() {
        this.createSnowflakes();
        this.animate();
    }

    createSnowflakes() {
        for (let i = 0; i < this.snowCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            
            const size = Math.random() * 3 + 2;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            const x = Math.random() * 100;
            const opacity = Math.random() * 0.7 + 0.3;
            
            snowflake.style.cssText = `
                position: absolute;
                top: -10px;
                left: ${x}%;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, #ffffff ${size/2}px, rgba(255,255,255,0.5) 100%);
                border-radius: 50%;
                box-shadow: 0 0 ${size}px rgba(255, 255, 255, ${opacity}),
                            0 0 ${size*2}px rgba(135, 206, 235, ${opacity * 0.5});
                filter: drop-shadow(0 0 ${size}px rgba(255, 255, 255, ${opacity * 0.7}));
                animation: snowFall ${duration}s linear ${delay}s infinite,
                           snowSway ${duration * 1.5}s ease-in-out ${delay}s infinite;
                opacity: ${opacity};
                z-index: 1;
            `;
            
            this.container.appendChild(snowflake);
            this.snowflakes.push(snowflake);
        }
    }

    animate() {
        // Animation keyframes are handled in CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes snowFall {
                0% {
                    transform: translateY(0) rotateZ(0deg);
                }
                100% {
                    transform: translateY(400px) rotateZ(360deg);
                }
            }

            @keyframes snowSway {
                0%, 100% {
                    transform: translateX(0);
                }
                50% {
                    transform: translateX(30px);
                }
            }

            .snowflake {
                will-change: transform;
                backface-visibility: hidden;
            }
        `;
        document.head.appendChild(style);
    }

    // Add more snowflakes dynamically
    addSnowflakes(count) {
        for (let i = 0; i < count; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            
            const size = Math.random() * 3 + 2;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            const x = Math.random() * 100;
            const opacity = Math.random() * 0.7 + 0.3;
            
            snowflake.style.cssText = `
                position: absolute;
                top: -10px;
                left: ${x}%;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, #ffffff ${size/2}px, rgba(255,255,255,0.5) 100%);
                border-radius: 50%;
                box-shadow: 0 0 ${size}px rgba(255, 255, 255, ${opacity}),
                            0 0 ${size*2}px rgba(135, 206, 235, ${opacity * 0.5});
                filter: drop-shadow(0 0 ${size}px rgba(255, 255, 255, ${opacity * 0.7}));
                animation: snowFall ${duration}s linear ${delay}s infinite,
                           snowSway ${duration * 1.5}s ease-in-out ${delay}s infinite;
                opacity: ${opacity};
                z-index: 1;
            `;
            
            this.container.appendChild(snowflake);
            this.snowflakes.push(snowflake);
        }
    }

    // Clear all snowflakes
    clear() {
        this.snowflakes.forEach(flake => flake.remove());
        this.snowflakes = [];
    }

    // Pause animation
    pause() {
        this.snowflakes.forEach(flake => {
            flake.style.animationPlayState = 'paused';
        });
    }

    // Resume animation
    resume() {
        this.snowflakes.forEach(flake => {
            flake.style.animationPlayState = 'running';
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SnowEffect;
}
