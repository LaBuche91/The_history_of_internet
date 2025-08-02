// MP3DownloadGame.jsx - Simulation nostalgique de téléchargement MP3
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const MP3DownloadGame = ({ soundId = 'dialup-modem' }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [connectionLost, setConnectionLost] = useState(false);
  
  const progressRef = useRef(null);
  const gameRef = useRef(null);
  const intervalRef = useRef(null);

  // Simulation réaliste des aléas de téléchargement des années 90
  const simulateDownload = () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    setProgress(0);
    setDownloadComplete(false);
    setConnectionLost(false);
    
    // Son de connexion modem
    if (window.audioManager) {
      window.audioManager.play(soundId);
    }

    let currentProgress = 0;
    let currentSpeed = Math.random() * 5 + 2; // Entre 2 et 7 kb/s
    
    intervalRef.current = setInterval(() => {
      // Simulation des variations de vitesse
      const speedVariation = (Math.random() - 0.5) * 2;
      currentSpeed = Math.max(0.5, Math.min(10, currentSpeed + speedVariation));
      
      // Progression réaliste
      const increment = currentSpeed / 100;
      currentProgress += increment;
      
      // Aléas de connexion
      if (Math.random() < 0.02 && currentProgress < 95) { // 2% de chance de déconnexion
        setConnectionLost(true);
        setIsDownloading(false);
        clearInterval(intervalRef.current);
        return;
      }
      
      // Ralentissement à la fin (réaliste)
      if (currentProgress > 80) {
        currentSpeed *= 0.7;
      }
      
      setProgress(Math.min(100, currentProgress));
      setDownloadSpeed(currentSpeed);
      
      // Calcul du temps restant
      const remainingMB = (3.5 * (100 - currentProgress)) / 100;
      const eta = remainingMB / (currentSpeed / 1000);
      const minutes = Math.floor(eta / 60);
      const seconds = Math.floor(eta % 60);
      setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      
      // Animation de la barre de progression
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: `${Math.min(100, currentProgress)}%`,
          duration: 0.1,
          ease: "none"
        });
      }
      
      // Téléchargement terminé
      if (currentProgress >= 100) {
        setDownloadComplete(true);
        setIsDownloading(false);
        clearInterval(intervalRef.current);
        
        // Son de succès
        if (window.audioManager) {
          window.audioManager.play('download-complete');
        }
        
        // Animation de succès
        showDownloadComplete();
      }
    }, 200); // Mise à jour toutes les 200ms
  };

  const showDownloadComplete = () => {
    const celebration = document.createElement('div');
    celebration.innerHTML = `
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(138, 43, 226, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        z-index: 100;
        border-radius: 8px;
      ">
        <div style="font-size: 2rem; margin-bottom: 1rem;">🎵</div>
        <div style="font-size: 1.2rem; font-weight: bold;">Téléchargement terminé !</div>
        <div style="font-size: 0.9rem; margin-top: 0.5rem;">
          "Eminem - The Real Slim Shady.mp3" prêt à être écouté
        </div>
      </div>
    `;
    
    gameRef.current.appendChild(celebration);
    
    gsap.fromTo(celebration, 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
    );

    setTimeout(() => {
      gsap.to(celebration, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => celebration.remove()
      });
    }, 3000);
  };

  const retryDownload = () => {
    setConnectionLost(false);
    setProgress(0);
    // Reprise à partir de 0 (réalisme des années 90 !)
    simulateDownload();
  };

  const resetGame = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsDownloading(false);
    setProgress(0);
    setDownloadComplete(false);
    setConnectionLost(false);
    setDownloadSpeed(0);
    setTimeRemaining('');
    
    if (progressRef.current) {
      gsap.set(progressRef.current, { width: '0%' });
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="mini-game mp3-game">
      <h3>💿 Télécharger un MP3 sur Napster</h3>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
        Revivez l'époque héroïque du téléchargement... et priez pour que la connexion tienne !
      </p>
      
      <div 
        ref={gameRef}
        style={{
          position: 'relative',
          background: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #666',
          borderRadius: '8px',
          padding: '1.5rem'
        }}
      >
        {/* Interface de téléchargement rétro */}
        <div style={{
          background: '#c0c0c0',
          border: '2px outset #c0c0c0',
          padding: '1rem',
          fontFamily: 'MS Sans Serif, sans-serif',
          fontSize: '0.8rem',
          color: '#000'
        }}>
          <div style={{ 
            background: '#000080', 
            color: 'white', 
            padding: '0.3rem', 
            marginBottom: '1rem',
            fontSize: '0.7rem'
          }}>
            📁 Napster - Téléchargement en cours...
          </div>
          
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Fichier:</strong> Eminem - The Real Slim Shady.mp3
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Taille:</strong> 3.5 MB
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Source:</strong> CoolDude1999@Berkeley
          </div>
          
          {/* Barre de progression */}
          <div className="progress-container" style={{
            background: '#fff',
            border: '1px inset #c0c0c0',
            height: '20px',
            position: 'relative',
            marginBottom: '1rem'
          }}>
            <div 
              ref={progressRef}
              className="progress-bar"
              style={{
                height: '100%',
                background: connectionLost ? '#ff0000' : 
                           progress < 30 ? '#ff0000' :
                           progress < 70 ? '#ffff00' : '#00ff00',
                width: '0%',
                transition: 'none'
              }}
            />
            <div className="progress-text" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '0.7rem',
              color: '#000',
              fontWeight: 'bold'
            }}>
              {connectionLost ? 'CONNEXION PERDUE' : `${Math.floor(progress)}%`}
            </div>
          </div>
          
          {/* Statistiques */}
          {isDownloading && (
            <div style={{ fontSize: '0.7rem', marginBottom: '1rem' }}>
              <div>Vitesse: {downloadSpeed.toFixed(1)} KB/s</div>
              <div>Temps restant: {timeRemaining}</div>
              <div>État: {connectionLost ? '❌ Échec' : '⬇️ En cours...'}</div>
            </div>
          )}
          
          {/* Boutons */}
          <div style={{ textAlign: 'center' }}>
            {!isDownloading && !downloadComplete && !connectionLost && (
              <button 
                onClick={simulateDownload}
                style={{
                  background: '#c0c0c0',
                  border: '2px outset #c0c0c0',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                ▶️ Démarrer le téléchargement
              </button>
            )}
            
            {connectionLost && (
              <div>
                <div style={{ 
                  color: '#ff0000', 
                  marginBottom: '1rem',
                  fontWeight: 'bold' 
                }}>
                  ⚠️ Connexion interrompue !<br />
                  <small>Votre maman a décroché le téléphone...</small>
                </div>
                <button 
                  onClick={retryDownload}
                  style={{
                    background: '#c0c0c0',
                    border: '2px outset #c0c0c0',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    marginRight: '0.5rem'
                  }}
                >
                  🔄 Recommencer
                </button>
              </div>
            )}
            
            {(downloadComplete || connectionLost) && (
              <button 
                onClick={resetGame}
                style={{
                  background: '#c0c0c0',
                  border: '2px outset #c0c0c0',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                🆕 Nouveau téléchargement
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.8rem', 
        color: '#888',
        fontStyle: 'italic' 
      }}>
        💡 Nostalgie : À l'époque, télécharger un album entier pouvait prendre 
        une nuit complète... et encore, si personne ne décrochait le téléphone !
      </div>
    </div>
  );
};

export default MP3DownloadGame;
