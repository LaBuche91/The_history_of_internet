// TCPIPGame.jsx - Mini-jeu de ping entre machines
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const TCPIPGame = ({ soundId = 'computer-beep' }) => {
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState('');
  const [pingCount, setPingCount] = useState(0);
  const [currentPing, setCurrentPing] = useState(0);
  
  const gameRef = useRef(null);
  const machine1Ref = useRef(null);
  const machine2Ref = useRef(null);
  const signalRef = useRef(null);
  const terminalRef = useRef(null);

  const machines = [
    { name: 'UCLA-HOST', ip: '192.168.1.10' },
    { name: 'SRI-HOST', ip: '192.168.1.20' },
    { name: 'UCSB-HOST', ip: '192.168.1.30' },
    { name: 'UTAH-HOST', ip: '192.168.1.40' }
  ];

  const [selectedMachine, setSelectedMachine] = useState(machines[1]);

  const executePing = () => {
    if (isPinging) return;
    
    setIsPinging(true);
    setPingResult('');
    setPingCount(0);
    setCurrentPing(0);
    
    // Animation du signal qui voyage
    animatePingSignal();
    
    // Simulation de 4 pings
    const pingInterval = setInterval(() => {
      setCurrentPing(prev => {
        const newCount = prev + 1;
        
        // Simulation de temps de réponse réaliste
        const responseTime = Math.random() * 50 + 10; // 10-60ms
        
        setTimeout(() => {
          setPingResult(prev => prev + 
            `64 bytes from ${selectedMachine.ip}: icmp_seq=${newCount} time=${responseTime.toFixed(1)}ms\n`
          );
          
          // Son de ping
          if (window.audioManager) {
            window.audioManager.playSound(soundId || 'computer-beep');
          }
        }, responseTime);
        
        if (newCount >= 4) {
          clearInterval(pingInterval);
          setTimeout(() => {
            setPingResult(prev => prev + 
              `\n--- ${selectedMachine.name} ping statistics ---\n` +
              `4 packets transmitted, 4 received, 0% packet loss\n` +
              `round-trip min/avg/max = 10.2/32.5/58.7 ms`
            );
            setIsPinging(false);
          }, 200);
        }
        
        return newCount;
      });
    }, 800);
  };

  const animatePingSignal = () => {
    if (!signalRef.current) return;
    
    // Reset de la position
    gsap.set(signalRef.current, { x: 0, opacity: 1, scale: 1 });
    
    // Animation aller-retour
    const tl = gsap.timeline({ repeat: 3, repeatDelay: 0.2 });
    
    tl.to(signalRef.current, {
      x: 300,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        // Signal arrive à destination
        gsap.to(machine2Ref.current, {
          scale: 1.1,
          duration: 0.1,
          yoyo: true,
          repeat: 1
        });
      }
    })
    .to(signalRef.current, {
      x: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        // Signal revient à l'origine
        gsap.to(machine1Ref.current, {
          scale: 1.1,
          duration: 0.1,
          yoyo: true,
          repeat: 1
        });
      }
    });
  };

  const resetGame = () => {
    setIsPinging(false);
    setPingResult('');
    setPingCount(0);
    setCurrentPing(0);
  };

  return (
    <div className="mini-game tcpip-game">
      <h3>🌐 Test de connectivité TCP/IP</h3>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
        Utilisez la commande ping pour tester la connectivité entre les machines du réseau
      </p>
      
      <div 
        ref={gameRef}
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '1.5rem',
          fontFamily: 'Courier New, monospace'
        }}
      >
        {/* Sélection de la machine cible */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#00ff00', marginRight: '1rem' }}>
            Machine cible:
          </label>
          <select 
            value={selectedMachine.name}
            onChange={(e) => setSelectedMachine(machines.find(m => m.name === e.target.value))}
            style={{
              background: '#000',
              color: '#00ff00',
              border: '1px solid #333',
              padding: '0.3rem',
              fontFamily: 'inherit'
            }}
          >
            {machines.slice(1).map(machine => (
              <option key={machine.name} value={machine.name}>
                {machine.name} ({machine.ip})
              </option>
            ))}
          </select>
        </div>

        {/* Visualisation du réseau */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          position: 'relative',
          height: '80px'
        }}>
          {/* Machine source */}
          <div 
            ref={machine1Ref}
            style={{
              background: '#00ff00',
              color: '#000',
              padding: '0.5rem',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              textAlign: 'center',
              minWidth: '100px'
            }}
          >
            UCLA-HOST<br />
            192.168.1.10
          </div>

          {/* Ligne de connexion */}
          <div style={{
            flex: 1,
            height: '2px',
            background: 'repeating-linear-gradient(90deg, #333 0px, #333 10px, transparent 10px, transparent 20px)',
            margin: '0 1rem',
            position: 'relative'
          }}>
            {/* Signal animé */}
            <div 
              ref={signalRef}
              style={{
                position: 'absolute',
                top: '-8px',
                left: '0',
                width: '16px',
                height: '16px',
                background: '#ffff00',
                borderRadius: '50%',
                opacity: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.6rem'
              }}
            >
              📡
            </div>
          </div>

          {/* Machine cible */}
          <div 
            ref={machine2Ref}
            style={{
              background: '#00aaff',
              color: '#fff',
              padding: '0.5rem',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              textAlign: 'center',
              minWidth: '100px'
            }}
          >
            {selectedMachine.name}<br />
            {selectedMachine.ip}
          </div>
        </div>

        {/* Interface terminal */}
        <div 
          ref={terminalRef}
          style={{
            background: '#000',
            border: '1px solid #333',
            borderRadius: '4px',
            padding: '1rem',
            minHeight: '150px',
            color: '#00ff00',
            fontSize: '0.8rem',
            fontFamily: 'Courier New, monospace'
          }}
        >
          <div style={{ marginBottom: '0.5rem' }}>
            $ ping {selectedMachine.ip}
          </div>
          
          {isPinging && (
            <div style={{ color: '#ffff00', marginBottom: '0.5rem' }}>
              PING {selectedMachine.name} ({selectedMachine.ip}): 56 data bytes
            </div>
          )}
          
          <pre style={{ 
            margin: 0, 
            whiteSpace: 'pre-wrap',
            color: '#00ff00',
            fontSize: '0.8rem'
          }}>
            {pingResult}
          </pre>
          
          {isPinging && (
            <div style={{ color: '#ffff00' }}>
              <span style={{ animation: 'blink 1s infinite' }}>|</span>
            </div>
          )}
        </div>

        {/* Contrôles */}
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button 
            onClick={executePing}
            disabled={isPinging}
            style={{
              background: isPinging ? '#666' : '#00ff00',
              color: isPinging ? '#ccc' : '#000',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: isPinging ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              fontWeight: 'bold',
              marginRight: '0.5rem'
            }}
          >
            {isPinging ? '📡 Ping en cours...' : '🚀 Exécuter ping'}
          </button>
          
          <button 
            onClick={resetGame}
            style={{
              background: '#333',
              color: '#fff',
              border: '1px solid #666',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            🔄 Clear
          </button>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.8rem', 
        color: '#888',
        fontStyle: 'italic' 
      }}>
        💡 Fact historique : TCP/IP a été développé par Vint Cerf et Bob Kahn, 
        créant le langage universel qui permet à tous les ordinateurs de communiquer !
      </div>
    </div>
  );
};

export default TCPIPGame;
