// ArpanetGame.jsx - Mini-jeu de connexion ARPANET (drag & drop)
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const ArpanetGame = ({ soundId = 'retro-beep' }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const cableRef = useRef(null);
  const computer1Ref = useRef(null);
  const computer2Ref = useRef(null);
  const connectionRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    // Configuration du drag & drop pour le câble
    if (cableRef.current && !gameCompleted) {
      const draggable = Draggable.create(cableRef.current, {
        type: 'x,y',
        bounds: gameRef.current,
        onDrag: checkConnection,
        onThrowUpdate: checkConnection,
        cursor: 'grabbing'
      });

      return () => {
        draggable[0].kill();
      };
    }
  }, [gameCompleted]);

  const checkConnection = () => {
    if (!cableRef.current || !computer2Ref.current) return;

    const cable = cableRef.current.getBoundingClientRect();
    const computer2 = computer2Ref.current.getBoundingClientRect();
    
    // Calcul de la distance entre le câble et l'ordinateur cible
    const distance = Math.sqrt(
      Math.pow(cable.x - computer2.x, 2) + 
      Math.pow(cable.y - computer2.y, 2)
    );

    // Si le câble est suffisamment proche
    if (distance < 50 && !isConnected) {
      connectComputers();
    }
  };

  const connectComputers = () => {
    setIsConnected(true);
    
    // Animation de connexion
    gsap.to(connectionRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    });

    // Snap du câble à la position finale
    gsap.to(cableRef.current, {
      x: computer2Ref.current.offsetLeft - cableRef.current.offsetLeft,
      y: computer2Ref.current.offsetTop - cableRef.current.offsetTop,
      duration: 0.3,
      ease: "power2.out"
    });

    // Son de connexion
    if (window.audioManager) {
      window.audioManager.play('connection-success');
    }

    // Animation de succès
    setTimeout(() => {
      setGameCompleted(true);
      showSuccessMessage();
    }, 1000);
  };

  const showSuccessMessage = () => {
    // Animation de texte de succès
    const successText = document.createElement('div');
    successText.innerHTML = `
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 255, 0, 0.9);
        color: black;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: bold;
        z-index: 100;
      ">
        🎉 CONNEXION ÉTABLIE ! 🎉<br>
        <small>Le premier réseau informatique est né !</small>
      </div>
    `;
    
    gameRef.current.appendChild(successText);
    
    gsap.fromTo(successText, 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
    );

    // Suppression automatique après 3 secondes
    setTimeout(() => {
      gsap.to(successText, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        onComplete: () => successText.remove()
      });
    }, 3000);
  };

  const resetGame = () => {
    setIsConnected(false);
    setGameCompleted(false);
    
    // Reset des positions
    gsap.set(cableRef.current, { x: 0, y: 0 });
    gsap.set(connectionRef.current, { opacity: 0 });
  };

  return (
    <div className="mini-game arpanet-game">
      <h3>🔌 Connectez les premiers ordinateurs du réseau</h3>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
        Glissez le câble depuis UCLA vers Stanford pour établir la première connexion ARPANET
      </p>
      
      <div 
        ref={gameRef}
        className="connection-game"
        style={{ 
          position: 'relative', 
          height: '200px',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '2rem'
        }}
      >
        {/* Ordinateur UCLA */}
        <div 
          ref={computer1Ref}
          className="computer"
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'var(--retro-green)',
            border: '2px solid #fff',
            width: '80px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            color: '#000'
          }}
        >
          UCLA
        </div>

        {/* Câble draggable */}
        <div 
          ref={cableRef}
          style={{
            position: 'absolute',
            left: '110px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
            background: '#ff6b00',
            borderRadius: '50%',
            cursor: gameCompleted ? 'default' : 'grab',
            border: '2px solid #fff',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem'
          }}
        >
          🔌
        </div>

        {/* Ligne de connexion */}
        <div 
          ref={connectionRef}
          className="connection-line"
          style={{
            position: 'absolute',
            left: '110px',
            right: '110px',
            top: '50%',
            height: '4px',
            background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, var(--retro-green) 10px, var(--retro-green) 20px)',
            opacity: 0,
            animation: isConnected ? 'data-flow 1s infinite' : 'none'
          }}
        />

        {/* Ordinateur Stanford */}
        <div 
          ref={computer2Ref}
          className="computer"
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'var(--retro-green)',
            border: '2px solid #fff',
            width: '80px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            color: '#000'
          }}
        >
          SRI
        </div>

        {/* Indicateur de distance */}
        {!isConnected && !gameCompleted && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '0.8rem',
            color: '#999'
          }}>
            Approchez le câble du port de destination
          </div>
        )}
      </div>

      {gameCompleted && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button 
            onClick={resetGame}
            className="retro-button"
            style={{ 
              borderColor: 'var(--retro-green)',
              color: 'var(--retro-green)'
            }}
          >
            Rejouer
          </button>
        </div>
      )}
      
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.8rem', 
        color: '#888',
        fontStyle: 'italic' 
      }}>
        💡 Fait historique : Le premier message était censé être "LOGIN", 
        mais seules les lettres "LO" sont arrivées avant que le système plante !
      </div>
    </div>
  );
};

export default ArpanetGame;
