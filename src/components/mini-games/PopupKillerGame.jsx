// PopupKillerGame.jsx - Mini-jeu de fermeture de pop-ups
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

function PopupKillerGame({ soundId = 'windows-95' }) {
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [popups, setPopups] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  
  const gameAreaRef = useRef(null);
  const gameTimerRef = useRef(null);
  const popupCounterRef = useRef(0);
  const gameActiveRef = useRef(false);

  const popupTemplates = [
    {
      title: "FÉLICITATIONS!!!",
      content: "Vous êtes le 1 000 000ème visiteur !",
      color: "#ff0000",
      size: { width: 300, height: 200 }
    },
    {
      title: "VIRUS DÉTECTÉ",
      content: "Votre ordinateur est infecté ! Cliquez ici pour nettoyer",
      color: "#ffff00",
      size: { width: 350, height: 180 }
    },
    {
      title: "Crédit Gratuit",
      content: "Obtenez 1000€ MAINTENANT !",
      color: "#00ff00",
      size: { width: 280, height: 160 }
    },
    {
      title: "Chat en ligne",
      content: "Des célibataires près de chez vous !",
      color: "#ff69b4",
      size: { width: 320, height: 190 }
    },
    {
      title: "Téléchargement Gratuit",
      content: "MP3, Films, Logiciels - 100% Gratuit !",
      color: "#00aaff",
      size: { width: 290, height: 170 }
    },
    {
      title: "Erreur Système",
      content: "Windows a rencontré une erreur. Redémarrez maintenant.",
      color: "#c0c0c0",
      size: { width: 400, height: 150 }
    }
  ];

  const startGame = () => {
    if (gameActive) return;
    
    setGameActive(true);
    gameActiveRef.current = true;
    setGameOver(false);
    setScore(0);
    setPopups([]);
    setTimeLeft(30);
    popupCounterRef.current = 0;
    
    // Son de démarrage
    if (window.audioManager) {
      window.audioManager.playSound(soundId || 'windows-95');
    }

    // Timer du jeu
    gameTimerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Commencer à spawner les popups
    setTimeout(() => spawnPopup(), 500);
  };

  const spawnPopup = () => {
    if (!gameActiveRef.current) return;
    
    const template = popupTemplates[Math.floor(Math.random() * popupTemplates.length)];
    const id = ++popupCounterRef.current;
    
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;
    
    const maxX = Math.max(0, gameArea.offsetWidth - template.size.width);
    const maxY = Math.max(0, gameArea.offsetHeight - template.size.height);
    
    const newPopup = {
      id,
      ...template,
      x: Math.random() * maxX,
      y: Math.random() * maxY,
      zIndex: 100 + id
    };
    
    setPopups(prev => [...prev, newPopup]);
    
    // Animation d'apparition
    setTimeout(() => {
      const popupElement = document.getElementById(`popup-${id}`);
      if (popupElement) {
        gsap.fromTo(popupElement,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );
      }
    }, 10);
    
    // Programmer le prochain popup
    const nextSpawnDelay = Math.random() * 2000 + 1000; // 1-3 secondes
    setTimeout(() => {
      if (gameActiveRef.current) { // Vérifier à nouveau l'état du jeu
        spawnPopup();
      }
    }, nextSpawnDelay);
  };

  const closePopup = (popupId) => {
    // Animation de fermeture
    const popupElement = document.getElementById(`popup-${popupId}`);
    if (popupElement) {
      gsap.to(popupElement, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setPopups(prev => prev.filter(p => p.id !== popupId));
        }
      });
    }
    
    setScore(prev => prev + 10);
    
    // Son de fermeture
    if (window.audioManager) {
      window.audioManager.playSound('click');
    }
  };

  const endGame = () => {
    setGameActive(false);
    gameActiveRef.current = false;
    setGameOver(true);
    
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
    
    // Animation de fin de jeu
    gsap.to(gameAreaRef.current, {
      filter: 'grayscale(100%)',
      duration: 0.5
    });
  };

  const resetGame = () => {
    setGameActive(false);
    gameActiveRef.current = false;
    setGameOver(false);
    setScore(0);
    setPopups([]);
    setTimeLeft(30);
    
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
    
    gsap.set(gameAreaRef.current, { filter: 'grayscale(0%)' });
  };

  useEffect(() => {
    return () => {
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="mini-game popup-killer-game">
      <h3>🎯 Internet Explorer - Survivez aux Pop-ups !</h3>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
        Fermez un maximum de pop-ups en 30 secondes ! Bienvenue dans l'enfer des années 90 !
      </p>
      
      {/* Interface de jeu */}
      <div style={{
        background: '#008080',
        border: '2px outset #008080',
        borderRadius: '4px',
        padding: '0.5rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          fontSize: '0.9rem',
          fontWeight: 'bold'
        }}>
          <div>🎯 Score: {score}</div>
          <div>⏰ Temps: {timeLeft}s</div>
          <div>🔥 Pop-ups: {popups.length}</div>
        </div>
      </div>

      {/* Zone de jeu */}
      <div 
        ref={gameAreaRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          background: 'linear-gradient(135deg, #008080, #004040)',
          border: '2px inset #c0c0c0',
          overflow: 'hidden',
          cursor: gameActive ? 'crosshair' : 'default'
        }}
      >
        {/* Écran de démarrage */}
        {!gameActive && !gameOver && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖱️</div>
            <div style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
              Prêt à affronter l'invasion des pop-ups ?
            </div>
            <button 
              onClick={startGame}
              style={{
                background: '#c0c0c0',
                border: '2px outset #c0c0c0',
                padding: '0.8rem 1.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              🚀 Commencer le cauchemar !
            </button>
          </div>
        )}

        {/* Écran de fin de jeu */}
        {gameOver && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '2rem',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              {score >= 200 ? '🏆' : score >= 100 ? '👍' : '💀'}
            </div>
            <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              Partie terminée !
            </div>
            <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              Score final: <strong>{score} points</strong>
            </div>
            <div style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: '#ccc' }}>
              {score >= 200 ? 'Expert en pop-up killing !' :
               score >= 100 ? 'Pas mal pour un débutant !' :
               'Il faut s\'entraîner encore...'}
            </div>
            <button 
              onClick={resetGame}
              style={{
                background: '#c0c0c0',
                border: '2px outset #c0c0c0',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                marginRight: '0.5rem'
              }}
            >
              🔄 Rejouer
            </button>
          </div>
        )}

        {/* Pop-ups dynamiques */}
        {popups.map(popup => (
          <div
            key={popup.id}
            id={`popup-${popup.id}`}
            style={{
              position: 'absolute',
              left: popup.x,
              top: popup.y,
              width: popup.size.width,
              height: popup.size.height,
              background: popup.color,
              border: '2px outset #c0c0c0',
              borderRadius: '4px',
              zIndex: popup.zIndex,
              cursor: 'pointer',
              fontFamily: 'MS Sans Serif, sans-serif',
              fontSize: '0.8rem',
              boxShadow: '4px 4px 8px rgba(0,0,0,0.5)'
            }}
            onClick={() => closePopup(popup.id)}
          >
            {/* Barre de titre */}
            <div style={{
              background: 'linear-gradient(135deg, #000080, #000060)',
              color: 'white',
              padding: '0.2rem 0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.7rem'
            }}>
              <span>{popup.title}</span>
              <button 
                style={{
                  background: '#c0c0c0',
                  border: '1px outset #c0c0c0',
                  width: '16px',
                  height: '14px',
                  fontSize: '0.6rem',
                  cursor: 'pointer',
                  lineHeight: '1'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  closePopup(popup.id);
                }}
              >
                ×
              </button>
            </div>
            
            {/* Contenu */}
            <div style={{
              padding: '1rem',
              textAlign: 'center',
              color: popup.color === '#ffff00' ? '#000' : '#fff',
              fontWeight: 'bold',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: 'calc(100% - 20px)'
            }}>
              <div style={{ marginBottom: '1rem' }}>
                {popup.content}
              </div>
              <button style={{
                background: '#ff0000',
                color: 'white',
                border: '2px outset #ff0000',
                padding: '0.3rem 0.8rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                animation: 'blink 1s infinite'
              }}>
                CLIQUEZ ICI !
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.8rem', 
        color: '#888',
        fontStyle: 'italic' 
      }}>
        💡 Nostalgie : En 1995, naviguer sur Internet était un véritable parcours du combattant 
        avec les pop-ups, bannières clignotantes et publicités envahissantes !
      </div>
    </div>
  );
};

export default PopupKillerGame;
