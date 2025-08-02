// VirusDefenseGame.jsx - Mini-jeu de défense contre les virus
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

function VirusDefenseGame({ soundId = 'alert-sound' }) {
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [threats, setThreats] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [infectionLevel, setInfectionLevel] = useState(0);
  
  const gameAreaRef = useRef(null);
  const gameTimerRef = useRef(null);
  const threatCounterRef = useRef(0);
  const spawnTimerRef = useRef(null);
  const gameActiveRef = useRef(false);

  const threatTypes = [
    {
      type: 'popup',
      title: 'Félicitations !',
      content: 'Vous avez gagné 1000€ !',
      color: '#ff0000',
      points: 10,
      damage: 1,
      icon: '💰'
    },
    {
      type: 'virus',
      title: 'VIRUS DÉTECTÉ',
      content: 'Votre PC est infecté !',
      color: '#ff4444',
      points: 15,
      damage: 2,
      icon: '🦠'
    },
    {
      type: 'spyware',
      title: 'Antivirus Gratuit',
      content: 'Téléchargez maintenant !',
      color: '#ffaa00',
      points: 12,
      damage: 1,
      icon: '🕵️'
    },
    {
      type: 'trojan',
      title: 'Mise à jour Windows',
      content: 'Cliquez pour installer',
      color: '#4444ff',
      points: 20,
      damage: 3,
      icon: '🐴'
    },
    {
      type: 'adware',
      title: 'Rencontres Locales',
      content: 'Célibataires près de chez vous',
      color: '#ff69b4',
      points: 8,
      damage: 1,
      icon: '💋'
    },
    {
      type: 'scam',
      title: 'Erreur Système',
      content: 'Appelez le 08-XX-XX-XX-XX',
      color: '#666666',
      points: 18,
      damage: 2,
      icon: '📞'
    }
  ];

  const startGame = () => {
    if (gameActive) return;
    
    setGameActive(true);
    gameActiveRef.current = true;
    setGameOver(false);
    setScore(0);
    setLives(3);
    setThreats([]);
    setTimeLeft(60);
    setInfectionLevel(0);
    threatCounterRef.current = 0;
    
    // Son d'alerte
    if (window.audioManager) {
      window.audioManager.playSound(soundId || 'alert-sound');
    }

    // Timer principal
    gameTimerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Spawn des menaces
    startThreatSpawning();
  };

  const startThreatSpawning = () => {
    const spawnThreat = () => {
      if (!gameActiveRef.current) return;
      
      const threatTemplate = threatTypes[Math.floor(Math.random() * threatTypes.length)];
      const id = ++threatCounterRef.current;
      
      const gameArea = gameAreaRef.current;
      if (!gameArea) return;
      
      const maxX = Math.max(0, gameArea.offsetWidth - 300);
      const maxY = Math.max(0, gameArea.offsetHeight - 200);
      
      const newThreat = {
        id,
        ...threatTemplate,
        x: Math.random() * maxX,
        y: Math.random() * maxY,
        zIndex: 100 + id,
        createdAt: Date.now()
      };
      
      setThreats(prev => [...prev, newThreat]);
      
      // Animation d'apparition
      setTimeout(() => {
        const threatElement = document.getElementById(`threat-${id}`);
        if (threatElement) {
          gsap.fromTo(threatElement,
            { scale: 0, opacity: 0, rotation: -180 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" }
          );
          
          // Effet de pulsation pour attirer l'attention
          gsap.to(threatElement, {
            scale: 1.1,
            duration: 0.8,
            yoyo: true,
            repeat: -1,
            ease: "power2.inOut"
          });
        }
      }, 10);
      
      // Auto-dommage après 5 secondes si pas fermé
      setTimeout(() => {
        if (gameActiveRef.current) {
          setThreats(current => {
            const threat = current.find(t => t.id === id);
            if (threat) {
              takeDamage(threat.damage);
              return current.filter(t => t.id !== id);
            }
            return current;
          });
        }
      }, 5000);
      
      // Programmer la prochaine menace
      const delay = Math.max(500, 3000 - (threatCounterRef.current * 50)); // Accélération progressive
      setTimeout(() => {
        if (gameActiveRef.current) { // Vérifier à nouveau l'état du jeu
          spawnThreat();
        }
      }, delay);
    };
    
    spawnThreat();
  };

  const closeThreat = (threatId) => {
    const threat = threats.find(t => t.id === threatId);
    if (!threat) return;
    
    // Animation de fermeture
    const threatElement = document.getElementById(`threat-${threatId}`);
    if (threatElement) {
      gsap.to(threatElement, {
        scale: 0,
        opacity: 0,
        rotation: 180,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setThreats(prev => prev.filter(t => t.id !== threatId));
        }
      });
    }
    
    setScore(prev => prev + threat.points);
    
    // Son de succès
    if (window.audioManager) {
      window.audioManager.playSound('click');
    }
    
    // Effet visuel de succès
    showSuccessEffect(threatElement);
  };

  const showSuccessEffect = (element) => {
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const effect = document.createElement('div');
    effect.innerHTML = '✅ +' + (threats.find(t => t.id === element.id?.split('-')[1])?.points || 10);
    effect.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width/2}px;
      top: ${rect.top}px;
      color: #00ff00;
      font-weight: bold;
      font-size: 1.2rem;
      z-index: 10000;
      pointer-events: none;
      text-shadow: 2px 2px 4px #000;
    `;
    
    document.body.appendChild(effect);
    
    gsap.to(effect, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => document.body.removeChild(effect)
    });
  };

  const takeDamage = (damage) => {
    setLives(prev => {
      const newLives = prev - damage;
      if (newLives <= 0) {
        endGame();
        return 0;
      }
      return newLives;
    });
    
    setInfectionLevel(prev => Math.min(100, prev + damage * 10));
    
    // Son de dommage
    if (window.audioManager) {
      window.audioManager.playSound('error');
    }
    
    // Effet de dommage sur l'écran
    gsap.to(gameAreaRef.current, {
      backgroundColor: '#ff0000',
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        gsap.set(gameAreaRef.current, { backgroundColor: 'transparent' });
      }
    });
  };

  const endGame = () => {
    setGameActive(false);
    gameActiveRef.current = false;
    setGameOver(true);
    setThreats([]); // Supprimer toutes les menaces
    
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
      gameTimerRef.current = null;
    }
    if (spawnTimerRef.current) {
      clearTimeout(spawnTimerRef.current);
      spawnTimerRef.current = null;
    }
    
    // Animation de fin
    if (gameAreaRef.current) {
      gsap.to(gameAreaRef.current, {
        filter: 'sepia(100%) contrast(200%)',
        duration: 1
      });
    }
  };

  const resetGame = () => {
    setGameActive(false);
    setGameOver(false);
    setScore(0);
    setLives(3);
    setThreats([]);
    setTimeLeft(60);
    setInfectionLevel(0);
    
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
    if (spawnTimerRef.current) {
      clearTimeout(spawnTimerRef.current);
    }
    
    gsap.set(gameAreaRef.current, { filter: 'none' });
  };

  useEffect(() => {
    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    };
  }, []);

  return (
    <div className="mini-game virus-defense-game">
      <h3>🛡️ Défense Anti-Virus - Années 2000</h3>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
        Survivez à l'invasion des virus, pop-ups et malware ! Fermez tout avant que votre PC soit infecté !
      </p>
      
      {/* Interface de jeu */}
      <div style={{
        background: 'linear-gradient(135deg, #000080, #000040)',
        border: '2px outset #c0c0c0',
        borderRadius: '4px',
        padding: '0.5rem',
        marginBottom: '1rem',
        color: 'white'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1rem',
          fontSize: '0.9rem',
          fontWeight: 'bold'
        }}>
          <div>🎯 Score: {score}</div>
          <div>❤️ Vies: {lives}</div>
          <div>⏰ Temps: {timeLeft}s</div>
          <div>🦠 Infection: {infectionLevel}%</div>
          <div>⚠️ Menaces: {threats.length}</div>
        </div>
        
        {/* Barre d'infection */}
        <div style={{
          width: '100%',
          height: '8px',
          background: '#333',
          border: '1px inset #c0c0c0',
          marginTop: '0.5rem',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${infectionLevel}%`,
            height: '100%',
            background: `linear-gradient(90deg, #00ff00 0%, #ffff00 50%, #ff0000 100%)`,
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Zone de jeu */}
      <div 
        ref={gameAreaRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
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
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛡️</div>
            <div style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
              Prêt à défendre votre PC contre les malware ?
            </div>
            <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#ccc' }}>
              Fermez les pop-ups et virus avant qu'ils infectent votre système !
            </div>
            <button 
              onClick={startGame}
              style={{
                background: '#c0c0c0',
                border: '2px outset #c0c0c0',
                padding: '1rem 2rem',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              🚀 Lancer la protection !
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
            background: 'rgba(0, 0, 0, 0.9)',
            padding: '2rem',
            borderRadius: '8px',
            border: '2px solid #ff0000'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              {lives > 0 ? '🏆' : '💀'}
            </div>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              {lives > 0 ? 'Mission accomplie !' : 'PC infecté !'}
            </div>
            <div style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              Score final: <strong>{score} points</strong>
            </div>
            <div style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: '#ccc' }}>
              {score >= 300 ? 'Expert en cybersécurité !' :
               score >= 150 ? 'Bon réflexe de défense !' :
               score >= 50 ? 'Il faut encore s\'entraîner...' :
               'Votre PC a besoin d\'un bon antivirus !'}
            </div>
            <button 
              onClick={resetGame}
              style={{
                background: '#c0c0c0',
                border: '2px outset #c0c0c0',
                padding: '0.8rem 1.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              🔄 Recommencer
            </button>
          </div>
        )}

        {/* Menaces actives */}
        {threats.map(threat => (
          <div
            key={threat.id}
            id={`threat-${threat.id}`}
            style={{
              position: 'absolute',
              left: threat.x,
              top: threat.y,
              width: '280px',
              minHeight: '150px',
              background: threat.color,
              border: '2px outset #c0c0c0',
              borderRadius: '4px',
              zIndex: threat.zIndex,
              cursor: 'pointer',
              fontFamily: 'MS Sans Serif, sans-serif',
              fontSize: '0.8rem',
              boxShadow: '6px 6px 12px rgba(0,0,0,0.7)'
            }}
            onClick={() => closeThreat(threat.id)}
          >
            {/* Barre de titre */}
            <div style={{
              background: 'linear-gradient(135deg, #000080, #000060)',
              color: 'white',
              padding: '0.3rem 0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.7rem'
            }}>
              <span>{threat.icon} {threat.title}</span>
              <button 
                style={{
                  background: '#c0c0c0',
                  border: '1px outset #c0c0c0',
                  width: '18px',
                  height: '16px',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  lineHeight: '1'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  closeThreat(threat.id);
                }}
              >
                ×
              </button>
            </div>
            
            {/* Contenu */}
            <div style={{
              padding: '1rem',
              textAlign: 'center',
              color: threat.color === '#ffaa00' ? '#000' : '#fff',
              fontWeight: 'bold',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '100px'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {threat.icon}
              </div>
              <div style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                {threat.content}
              </div>
              <button style={{
                background: '#ff0000',
                color: 'white',
                border: '2px outset #ff0000',
                padding: '0.4rem 1rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                animation: 'blink 1s infinite',
                fontSize: '0.8rem'
              }}>
                {threat.type === 'popup' ? 'CLIQUEZ ICI !' :
                 threat.type === 'virus' ? 'SCANNER MAINTENANT' :
                 threat.type === 'spyware' ? 'TÉLÉCHARGER' :
                 threat.type === 'trojan' ? 'INSTALLER' :
                 threat.type === 'adware' ? 'VOIR PROFILS' :
                 'APPELER MAINTENANT'}
              </button>
            </div>
          </div>
        ))}

        {/* Effet de scanlines rétro */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)',
          pointerEvents: 'none'
        }} />
      </div>
      
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.8rem', 
        color: '#888',
        fontStyle: 'italic' 
      }}>
        💡 Nostalgie : Les années 2000 étaient l'âge d'or des virus informatiques ! 
        Pas d'antivirus moderne, juste votre vigilance contre les pop-ups malveillantes !
      </div>
    </div>
  );
};

export default VirusDefenseGame;
