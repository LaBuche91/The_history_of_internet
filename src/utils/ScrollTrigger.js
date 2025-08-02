// ScrollTrigger.js - Configuration avancée pour les animations au scroll
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrement du plugin
gsap.registerPlugin(ScrollTrigger);

// Configuration globale pour ScrollTrigger
ScrollTrigger.config({
  // Améliore les performances sur mobile
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  // Désactive le refresh automatique pour de meilleures performances
  ignoreMobileResize: true
});

// Fonction utilitaire pour créer des animations réutilisables
export const createScrollAnimation = (element, animation, options = {}) => {
  const defaultOptions = {
    trigger: element,
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    ...options
  };

  return gsap.timeline({
    scrollTrigger: defaultOptions
  }).add(animation);
};

// Animations prédéfinies pour les événements
export const timelineAnimations = {
  // Animation d'apparition en fondu avec échelle
  fadeInScale: (element, delay = 0) => {
    return gsap.fromTo(element, 
      { 
        opacity: 0, 
        scale: 0.8, 
        y: 50 
      },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 1.2, 
        delay,
        ease: "power3.out" 
      }
    );
  },

  // Animation de texte machine à écrire
  typeWriter: (element, text, speed = 0.05) => {
    element.textContent = '';
    const chars = text.split('');
    const tl = gsap.timeline();
    
    chars.forEach((char, index) => {
      tl.call(() => {
        element.textContent += char;
      }, [], index * speed);
    });
    
    return tl;
  },

  // Animation de parallax pour les arrière-plans
  parallaxBackground: (element, speed = 0.5) => {
    return gsap.fromTo(element,
      { backgroundPosition: "50% 100%" },
      {
        backgroundPosition: "50% 0%",
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: speed
        }
      }
    );
  },

  // Animation de révélation par sliding
  slideInFromLeft: (element, delay = 0) => {
    return gsap.fromTo(element,
      { x: -100, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 1, 
        delay,
        ease: "power2.out" 
      }
    );
  },

  slideInFromRight: (element, delay = 0) => {
    return gsap.fromTo(element,
      { x: 100, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 1, 
        delay,
        ease: "power2.out" 
      }
    );
  },

  // Animation spéciale pour les mini-jeux
  gameReveal: (element, delay = 0) => {
    return gsap.fromTo(element,
      { 
        scale: 0, 
        rotation: -180, 
        opacity: 0 
      },
      { 
        scale: 1, 
        rotation: 0, 
        opacity: 1, 
        duration: 1.5, 
        delay,
        ease: "elastic.out(1, 0.8)" 
      }
    );
  }
};

// Configuration des animations par décennie
export const decadeAnimations = {
  '1960s': {
    textColor: '#00ff00',
    bgGradient: 'linear-gradient(135deg, #001100 0%, #003300 100%)',
    fontFamily: 'monospace',
    letterSpacing: '2px'
  },
  '1990s': {
    textColor: '#ff00ff',
    bgGradient: 'linear-gradient(135deg, #4a0080 0%, #8a2be2 100%)',
    fontFamily: 'serif',
    letterSpacing: '1px'
  },
  '2000s': {
    textColor: '#0066cc',
    bgGradient: 'linear-gradient(135deg, #0066cc 0%, #004499 100%)',
    fontFamily: 'sans-serif',
    letterSpacing: '0px'
  }
};

// Fonction pour appliquer le style d'une décennie
export const applyDecadeStyle = (element, decade) => {
  const style = decadeAnimations[decade];
  if (style) {
    gsap.set(element, {
      color: style.textColor,
      background: style.bgGradient,
      fontFamily: style.fontFamily,
      letterSpacing: style.letterSpacing
    });
  }
};

// Nettoyage des ScrollTriggers
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  ScrollTrigger.refresh();
};

export default {
  createScrollAnimation,
  timelineAnimations,
  decadeAnimations,
  applyDecadeStyle,
  cleanupScrollTriggers
};
