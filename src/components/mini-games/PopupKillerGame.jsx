// PopupKillerGameNew.jsx - Version simplifiée du jeu popup killer
import React, { useState, useRef, useEffect } from 'react';

function PopupKillerGameNew({ soundId = 'windows-95' }) {
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [popups, setPopups] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  
  const gameAreaRef = useRef(null);
  const popupCounterRef = useRef(0);
  const gameTimerRef = useRef(null);
  const spawnTimerRef = useRef(null);

  const popupTemplates = [
    {
      title: "FÉLICITATIONS!!!",
      content: "Vous êtes le 1 000 000ème visiteur !",
      color: "#ff0000",
      width: 300,
      height: 200
    },
    {
      title: "VIRUS DÉTECTÉ",
      content: "Votre ordinateur est infecté !",
      color: "#ffff00",
      width: 350,
      height: 180
    },
    {
      title: "Crédit Gratuit",
      content: "Obtenez 1000€ MAINTENANT !",
      color: "#00ff00",
      width: 280,
      height: 160
    }
  ];

  const startGame = () => {
    console.log('PopupKiller: Starting game...');
    setGameActive(true);
    setGameOver(false);
    setScore(0);
    setPopups([]);
    setTimeLeft(30);
    popupCounterRef.current = 0;
    
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

    // Commencer le spawn
    spawnPopup();
  };

  const MAX_POPUPS = 4;
  const spawnPopup = () => {
    setPopups(prevPopups => {
      if (prevPopups.length >= MAX_POPUPS) {
        // Si trop de popups, ne rien ajouter et reprogrammer plus tard
        spawnTimerRef.current = setTimeout(() => {
          setGameActive(currentActive => {
            if (currentActive) {
              spawnPopup();
            }
            return currentActive;
          });
        }, Math.random() * 3000 + 3000); // 3-6 secondes
        return prevPopups;
      }
      // Sinon, ajouter un popup
      const template = popupTemplates[Math.floor(Math.random() * popupTemplates.length)];
      const id = ++popupCounterRef.current;
      const newPopup = {
        id,
        ...template,
        x: Math.random() * 300,
        y: Math.random() * 200
      };
      console.log('PopupKiller: Created popup:', newPopup);
      // Programmer le prochain popup
      spawnTimerRef.current = setTimeout(() => {
        setGameActive(currentActive => {
          if (currentActive) {
            spawnPopup();
          }
          return currentActive;
        });
      }, Math.random() * 3000 + 3000); // 3-6 secondes
      return [...prevPopups, newPopup];
    });
  };

  const closePopup = (popupId) => {
    console.log('PopupKiller: Closing popup:', popupId);
    setPopups(prev => prev.filter(p => p.id !== popupId));
    setScore(prev => prev + 10);
  };

  const endGame = () => {
    console.log('PopupKiller: Ending game...');
    setGameActive(false);
    setGameOver(true);
    setPopups([]); // Vider les popups à la fin du jeu
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
    if (spawnTimerRef.current) {
      clearTimeout(spawnTimerRef.current);
    }
  };

  const resetGame = () => {
    setGameActive(false);
    setGameOver(false);
    setScore(0);
    setPopups([]);
    setTimeLeft(30);
    
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
    if (spawnTimerRef.current) {
      clearTimeout(spawnTimerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    };
  }, []);

  // Mettre à jour les refs quand gameActive change
  useEffect(() => {
    if (!gameActive && spawnTimerRef.current) {
      clearTimeout(spawnTimerRef.current);
    }
  }, [gameActive]);

  return (
    <div className="mini-game popup-killer-game" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
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
          overflow: 'hidden'
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
            <button 
              onClick={resetGame}
              style={{
                background: '#c0c0c0',
                border: '2px outset #c0c0c0',
                padding: '0.5rem 1rem',
                cursor: 'pointer'
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
            onClick={() => closePopup(popup.id)}
            style={{
              position: 'absolute',
              left: popup.x,
              top: popup.y,
              width: popup.width,
              height: popup.height,
              background: popup.color,
              border: '2px outset #c0c0c0',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'MS Sans Serif, sans-serif',
              fontSize: '0.8rem',
              boxShadow: '4px 4px 8px rgba(0,0,0,0.5)',
              zIndex: 100 + popup.id
            }}
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
                fontWeight: 'bold'
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
        💡 Nostalgie : En 1995, naviguer sur Internet était un véritable parcours du combattant !
      </div>
    </div>
  );
}

export default PopupKillerGameNew;
