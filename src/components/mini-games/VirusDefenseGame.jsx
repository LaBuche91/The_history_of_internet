// VirusDefenseGameNew.jsx - Version simplifiée du jeu de défense anti-virus
import React, { useState, useRef, useEffect } from 'react';

function VirusDefenseGameNew({ soundId = 'alert-sound' }) {
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [threats, setThreats] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [infectionLevel, setInfectionLevel] = useState(0);
  
  const gameAreaRef = useRef(null);
  const threatCounterRef = useRef(0);
  const gameTimerRef = useRef(null);
  const spawnTimerRef = useRef(null);

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
      type: 'trojan',
      title: 'Mise à jour Windows',
      content: 'Cliquez pour installer',
      color: '#4444ff',
      points: 20,
      damage: 3,
      icon: '🐴'
    }
  ];

  const startGame = () => {
    console.log('VirusDefense: Starting game...');
    setGameActive(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
    setThreats([]);
    setTimeLeft(60);
    setInfectionLevel(0);
    threatCounterRef.current = 0;
    
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

    // Commencer le spawn
    spawnThreat();
  };

  const spawnThreat = () => {
    console.log('VirusDefense: Spawning threat...');
    const threatTemplate = threatTypes[Math.floor(Math.random() * threatTypes.length)];
    const id = ++threatCounterRef.current;
    
    const newThreat = {
      id,
      ...threatTemplate,
      x: Math.random() * 400,
      y: Math.random() * 250
    };
    
    console.log('VirusDefense: Created threat:', newThreat);
    setThreats(prev => [...prev, newThreat]);
    
    // Auto-dommage après 7 secondes si pas fermé (au lieu de 5)
    setTimeout(() => {
      setThreats(current => {
        const threat = current.find(t => t.id === id);
        if (threat) {
          takeDamage(threat.damage);
          return current.filter(t => t.id !== id);
        }
        return current;
      });
    }, 7000);
    
    // Programmer la prochaine menace en utilisant l'état actuel
    spawnTimerRef.current = setTimeout(() => {
      setGameActive(currentActive => {
        if (currentActive) {
          spawnThreat();
        }
        return currentActive;
      });
    }, Math.random() * 3000 + 2500); // 2.5-5.5 secondes au lieu de 1.5-3.5 secondes
  };

  const closeThreat = (threatId) => {
    console.log('VirusDefense: Closing threat:', threatId);
    const threat = threats.find(t => t.id === threatId);
    if (!threat) return;
    
    setThreats(prev => prev.filter(t => t.id !== threatId));
    setScore(prev => prev + threat.points);
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
  };

  const endGame = () => {
    console.log('VirusDefense: Ending game...');
    setGameActive(false);
    setGameOver(true);
    setThreats([]);
    
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
    <div className="mini-game virus-defense-game" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
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
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛡️</div>
            <div style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
              Prêt à défendre votre PC contre les malware ?
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
            onClick={() => closeThreat(threat.id)}
            style={{
              position: 'absolute',
              left: threat.x,
              top: threat.y,
              width: '280px',
              minHeight: '150px',
              background: threat.color,
              border: '2px outset #c0c0c0',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'MS Sans Serif, sans-serif',
              fontSize: '0.8rem',
              boxShadow: '6px 6px 12px rgba(0,0,0,0.7)',
              zIndex: 100 + threat.id
            }}
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
              color: '#fff',
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
                fontSize: '0.8rem'
              }}>
                {threat.type === 'popup' ? 'CLIQUEZ ICI !' :
                 threat.type === 'virus' ? 'SCANNER MAINTENANT' :
                 'INSTALLER'}
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
        💡 Nostalgie : Les années 2000 étaient l'âge d'or des virus informatiques !
      </div>
    </div>
  );
}

export default VirusDefenseGameNew;
