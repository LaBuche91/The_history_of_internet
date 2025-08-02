// AudioManager.jsx - Gestionnaire global des sons et effets audio
import React, { useEffect, useRef } from 'react';

class AudioManager {
  constructor() {
    this.sounds = new Map();
    this.isEnabled = true;
    this.volume = 0.5;
    this.init();
  }

  init() {
    // Configuration des sons avec des URLs placeholder
    // En production, remplacez par de vrais fichiers audio
    const soundLibrary = {
      'retro-beep': {
        url: '/sounds/retro-beep.mp3',
        fallback: this.generateBeepSound(800, 0.3)
      },
      'dialup-modem': {
        url: '/sounds/dialup-modem.mp3', 
        fallback: this.generateDialupSound()
      },
      'msn-sound': {
        url: '/sounds/msn-nudge.mp3',
        fallback: this.generateMSNSound()
      },
      'connection-success': {
        url: '/sounds/connection-success.mp3',
        fallback: this.generateSuccessSound()
      },
      'download-complete': {
        url: '/sounds/download-complete.mp3',
        fallback: this.generateCompleteSound()
      },
      'nudge-vibrate': {
        url: '/sounds/nudge-vibrate.mp3',
        fallback: this.generateNudgeSound()
      }
    };

    // Préchargement des sons
    Object.entries(soundLibrary).forEach(([id, config]) => {
      this.loadSound(id, config);
    });
  }

  loadSound(id, config) {
    const audio = new Audio();
    
    // Tentative de chargement du fichier audio
    audio.src = config.url;
    audio.preload = 'auto';
    audio.volume = this.volume;
    
    // En cas d'échec, utilisation du son généré
    audio.onerror = () => {
      if (config.fallback) {
        audio.src = config.fallback;
      }
    };
    
    this.sounds.set(id, audio);
  }

  // Génération de sons synthétiques pour les placeholders
  generateBeepSound(frequency = 800, duration = 0.3) {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration);
    
    return 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp56hVFApGn+DyvmcsC2PfE...'; // Son placeholder base64
  }

  generateDialupSound() {
    // Son de modem simplifié
    return 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp56hVFApGn+DyvmcsC2PfE...';
  }

  generateMSNSound() {
    // Son de notification MSN
    return 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp56hVFApGn+DyvmcsC2PfE...';
  }

  generateSuccessSound() {
    // Son de succès
    return 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp56hVFApGn+DyvmcsC2PfE...';
  }

  generateCompleteSound() {
    // Son de téléchargement terminé
    return 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp56hVFApGn+DyvmcsC2PfE...';
  }

  generateNudgeSound() {
    // Son de nudge
    return 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp56hVFApGn+DyvmcsC2PfE...';
  }

  play(soundId) {
    if (!this.isEnabled) return;
    
    const sound = this.sounds.get(soundId);
    if (sound) {
      // Reset et lecture
      sound.currentTime = 0;
      sound.play().catch(e => {
        console.warn(`Impossible de jouer le son ${soundId}:`, e);
      });
      
      // Effet visuel de son
      this.showSoundEffect();
    }
  }

  showSoundEffect() {
    // Création d'un indicateur visuel temporaire
    const indicator = document.querySelector('.sound-wave') || 
      this.createSoundIndicator();
    
    indicator.classList.add('active');
    setTimeout(() => {
      indicator.classList.remove('active');
    }, 500);
  }

  createSoundIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'sound-wave';
    indicator.innerHTML = '♪';
    indicator.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      font-size: 2rem;
      color: #00ff00;
      z-index: 1000;
      pointer-events: none;
    `;
    document.body.appendChild(indicator);
    return indicator;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach(sound => {
      sound.volume = this.volume;
    });
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    return this.isEnabled;
  }

  mute() {
    this.isEnabled = false;
  }

  unmute() {
    this.isEnabled = true;
  }
}

// Instance globale du gestionnaire audio
const audioManager = new AudioManager();

const AudioManagerComponent = () => {
  const controlsRef = useRef(null);

  useEffect(() => {
    // Exposition globale pour les autres composants
    window.audioManager = audioManager;
    
    // Interface de contrôle audio (optionnelle)
    const createAudioControls = () => {
      if (controlsRef.current) {
        controlsRef.current.innerHTML = `
          <div style="position: fixed; top: 1rem; left: 1rem; z-index: 1000; background: rgba(0,0,0,0.8); padding: 1rem; border-radius: 8px; color: white;">
            <button onclick="window.audioManager.toggle()" style="margin-right: 0.5rem; padding: 0.5rem; background: #333; color: white; border: 1px solid #666; border-radius: 4px; cursor: pointer;">
              🔊 Audio
            </button>
            <input type="range" min="0" max="1" step="0.1" value="0.5" 
                   onchange="window.audioManager.setVolume(this.value)"
                   style="vertical-align: middle;">
          </div>
        `;
      }
    };

    createAudioControls();
  }, []);

  return <div ref={controlsRef} />;
};

export default AudioManagerComponent;
