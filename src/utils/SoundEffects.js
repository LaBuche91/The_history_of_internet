// SoundEffects.js - Effets visuels synchronisés avec les sons
import { gsap } from 'gsap';

class SoundEffectsManager {
  constructor() {
    this.activeEffects = new Map();
    this.init();
  }

  init() {
    // Création du conteneur d'effets visuels
    this.effectsContainer = document.createElement('div');
    this.effectsContainer.id = 'sound-effects-container';
    this.effectsContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    `;
    document.body.appendChild(this.effectsContainer);
  }

  // Effet de vagues sonores
  createSoundWaves(type = 'default') {
    const waves = document.createElement('div');
    waves.className = 'sound-waves';
    
    const colors = {
      'retro': '#00ff00',
      'dialup': '#ff00ff',
      'msn': '#0066cc',
      'success': '#00ffff',
      'default': '#ffffff'
    };

    waves.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      border: 2px solid ${colors[type] || colors.default};
      border-radius: 50%;
      transform: translate(-50%, -50%);
    `;

    this.effectsContainer.appendChild(waves);

    // Animation concentrique
    const tl = gsap.timeline({
      onComplete: () => waves.remove()
    });

    // Création de plusieurs cercles concentriques
    for (let i = 0; i < 3; i++) {
      const circle = waves.cloneNode(true);
      this.effectsContainer.appendChild(circle);
      
      tl.fromTo(circle, 
        { 
          scale: 0, 
          opacity: 0.8 
        },
        { 
          scale: 3 + i, 
          opacity: 0, 
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => circle.remove()
        }, 
        i * 0.2
      );
    }

    waves.remove();
    return tl;
  }

  // Effet de secousse d'écran (pour les nudges)
  screenShake(intensity = 1) {
    const duration = 0.5;
    const strength = 10 * intensity;

    return gsap.timeline()
      .to(document.body, {
        x: gsap.utils.random(-strength, strength),
        y: gsap.utils.random(-strength, strength),
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: "power2.inOut"
      })
      .to(document.body, {
        x: 0,
        y: 0,
        duration: 0.2,
        ease: "elastic.out(1, 0.3)"
      });
  }

  // Effet de pulsation colorée
  colorPulse(color = '#ff0000', element = document.body) {
    const originalFilter = element.style.filter || '';
    
    return gsap.timeline()
      .to(element, {
        filter: `hue-rotate(180deg) brightness(1.3) saturate(1.5)`,
        duration: 0.2,
        ease: "power2.out"
      })
      .to(element, {
        filter: originalFilter,
        duration: 0.3,
        ease: "power2.inOut"
      });
  }

  // Effet de particules (pour les succès)
  createParticles(count = 20, colors = ['#ff0000', '#00ff00', '#0000ff']) {
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
      
      this.effectsContainer.appendChild(particle);
      particles.push(particle);
    }

    // Animation d'explosion de particules
    const tl = gsap.timeline({
      onComplete: () => {
        particles.forEach(p => p.remove());
      }
    });

    particles.forEach((particle, index) => {
      const angle = (360 / count) * index;
      const distance = gsap.utils.random(100, 300);
      const x = Math.cos(angle * Math.PI / 180) * distance;
      const y = Math.sin(angle * Math.PI / 180) * distance;

      tl.to(particle, {
        x: x,
        y: y,
        opacity: 0,
        scale: gsap.utils.random(0.5, 2),
        duration: gsap.utils.random(1, 2),
        ease: "power2.out"
      }, 0);
    });

    return tl;
  }

  // Effet de scan rétro
  retroScan() {
    const scanLine = document.createElement('div');
    scanLine.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #00ff00, transparent);
      box-shadow: 0 0 10px #00ff00;
    `;

    this.effectsContainer.appendChild(scanLine);

    return gsap.fromTo(scanLine, 
      { y: 0 },
      { 
        y: window.innerHeight,
        duration: 2,
        ease: "none",
        onComplete: () => scanLine.remove()
      }
    );
  }

  // Effet de glitch
  glitchEffect(element = document.body, duration = 0.5) {
    const originalTransform = element.style.transform;
    const originalFilter = element.style.filter;

    const tl = gsap.timeline({
      onComplete: () => {
        element.style.transform = originalTransform;
        element.style.filter = originalFilter;
      }
    });

    // Plusieurs frames de glitch
    for (let i = 0; i < 6; i++) {
      tl.set(element, {
        transform: `translateX(${gsap.utils.random(-5, 5)}px) scaleX(${gsap.utils.random(0.98, 1.02)})`,
        filter: `hue-rotate(${gsap.utils.random(0, 360)}deg) contrast(${gsap.utils.random(0.8, 1.2)})`
      }, i * 0.08);
    }

    return tl;
  }

  // Interface publique pour déclencher les effets
  playEffect(effectType, options = {}) {
    switch (effectType) {
      case 'waves':
        return this.createSoundWaves(options.type);
      
      case 'shake':
        return this.screenShake(options.intensity);
      
      case 'pulse':
        return this.colorPulse(options.color, options.element);
      
      case 'particles':
        return this.createParticles(options.count, options.colors);
      
      case 'scan':
        return this.retroScan();
      
      case 'glitch':
        return this.glitchEffect(options.element, options.duration);
      
      default:
        console.warn(`Effet sonore visuel "${effectType}" non reconnu`);
        return gsap.timeline();
    }
  }

  // Nettoyage
  cleanup() {
    if (this.effectsContainer) {
      this.effectsContainer.remove();
    }
    this.activeEffects.clear();
  }
}

// Instance globale
const soundEffects = new SoundEffectsManager();

// Export pour utilisation dans les composants
export default soundEffects;

// Fonction utilitaire pour synchroniser son et effet visuel
export const playWithVisualEffect = (audioManager, soundId, effectType, effectOptions = {}) => {
  if (audioManager && typeof audioManager.play === 'function') {
    audioManager.play(soundId);
  }
  
  return soundEffects.playEffect(effectType, effectOptions);
};
