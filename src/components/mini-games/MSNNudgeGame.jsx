// MSNNudgeGame.jsx - Simulation nostalgique du nudge MSN Messenger
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const MSNNudgeGame = ({ soundId = 'msn-sound' }) => {
  const [isShaking, setIsShaking] = useState(false);
  const [nudgeCount, setNudgeCount] = useState(0);
  const [lastNudgeTime, setLastNudgeTime] = useState(0);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [messages, setMessages] = useState([
    { user: 'CoolGuy2003', text: 'salut ça va ?', time: '14:32' },
    { user: 'Vous', text: 'ouais et toi ?', time: '14:33' },
    { user: 'CoolGuy2003', text: 'ça va... tu fais quoi ?', time: '14:33' }
  ]);
  
  const messengerRef = useRef(null);
  const nudgeButtonRef = useRef(null);
  const chatRef = useRef(null);

  // Cooldown entre les nudges (comme dans le vrai MSN)
  const NUDGE_COOLDOWN = 3000; // 3 secondes

  const sendNudge = () => {
    const now = Date.now();
    
    // Vérification du cooldown
    if (now - lastNudgeTime < NUDGE_COOLDOWN) {
      setCooldownActive(true);
      setTimeout(() => setCooldownActive(false), NUDGE_COOLDOWN - (now - lastNudgeTime));
      return;
    }
    
    setLastNudgeTime(now);
    setNudgeCount(prev => prev + 1);
    
    // Son de nudge
    if (window.audioManager) {
      window.audioManager.play('nudge-vibrate');
    }
    
    // Animation de secousse de la fenêtre
    performNudgeAnimation();
    
    // Ajout du message de nudge
    addNudgeMessage();
    
    // Cooldown temporaire
    setCooldownActive(true);
    setTimeout(() => setCooldownActive(false), NUDGE_COOLDOWN);
  };

  const performNudgeAnimation = () => {
    setIsShaking(true);
    
    // Animation GSAP de secousse
    const tl = gsap.timeline({
      onComplete: () => setIsShaking(false)
    });
    
    // Secousse intense
    tl.to(messengerRef.current, {
      x: 10,
      duration: 0.1,
      ease: "power2.inOut"
    })
    .to(messengerRef.current, {
      x: -15,
      duration: 0.1,
      ease: "power2.inOut"
    })
    .to(messengerRef.current, {
      x: 12,
      duration: 0.1,
      ease: "power2.inOut"
    })
    .to(messengerRef.current, {
      x: -8,
      duration: 0.1,
      ease: "power2.inOut"
    })
    .to(messengerRef.current, {
      x: 5,
      duration: 0.1,
      ease: "power2.inOut"
    })
    .to(messengerRef.current, {
      x: 0,
      duration: 0.2,
      ease: "elastic.out(1, 0.3)"
    });

    // Animation du bouton nudge
    gsap.fromTo(nudgeButtonRef.current, 
      { scale: 1 },
      { 
        scale: 1.2, 
        duration: 0.1, 
        yoyo: true, 
        repeat: 1,
        ease: "power2.inOut"
      }
    );

    // Effet visuel de vibration sur toute la fenêtre
    const originalTransform = messengerRef.current.style.transform;
    gsap.set(messengerRef.current, {
      filter: 'hue-rotate(0deg) brightness(1)'
    });
    
    gsap.to(messengerRef.current, {
      filter: 'hue-rotate(360deg) brightness(1.2)',
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  const addNudgeMessage = () => {
    const nudgeMessage = {
      user: 'Système',
      text: `🔔 Vous avez envoyé un nudge à CoolGuy2003`,
      time: new Date().toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isNudge: true
    };
    
    setMessages(prev => [...prev, nudgeMessage]);
    
    // Auto-scroll vers le bas
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 100);
    
    // Réponse automatique de l'ami après un délai
    setTimeout(() => {
      const responses = [
        "Arrête tes nudges ! 😅",
        "Pourquoi tu me nudges ??",
        "J'étais là ! Pas besoin de nudge",
        "STOP avec les nudges !!!",
        "Tu me fais peur avec ça 😱"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage = {
        user: 'CoolGuy2003',
        text: randomResponse,
        time: new Date().toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      
      setMessages(prev => [...prev, responseMessage]);
      
      // Auto-scroll
      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }, 100);
    }, 1500 + Math.random() * 2000); // Délai variable
  };

  const resetChat = () => {
    setMessages([
      { user: 'CoolGuy2003', text: 'salut ça va ?', time: '14:32' },
      { user: 'Vous', text: 'ouais et toi ?', time: '14:33' },
      { user: 'CoolGuy2003', text: 'ça va... tu fais quoi ?', time: '14:33' }
    ]);
    setNudgeCount(0);
    setCooldownActive(false);
    setLastNudgeTime(0);
  };

  return (
    <div className="mini-game msn-game">
      <h3>💬 MSN Messenger - L'art du Nudge</h3>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
        Souvenez-vous de l'époque où faire vibrer l'écran de vos amis était le summum de la communication !
      </p>
      
      <div 
        ref={messengerRef}
        style={{
          background: 'linear-gradient(135deg, #4285f4, #0057d9)',
          border: '2px solid #003d99',
          borderRadius: '8px 8px 0 0',
          overflow: 'hidden',
          fontFamily: 'Tahoma, sans-serif',
          fontSize: '0.8rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Barre de titre MSN */}
        <div style={{
          background: 'linear-gradient(135deg, #ff6b00, #ff8c00)',
          color: 'white',
          padding: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.7rem',
          fontWeight: 'bold'
        }}>
          <span style={{ marginRight: '0.5rem' }}>💬</span>
          Conversation avec CoolGuy2003 - En ligne
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.3rem' }}>
            <button style={{ 
              background: 'rgba(255,255,255,0.2)', 
              border: 'none', 
              color: 'white',
              width: '16px',
              height: '16px',
              fontSize: '0.6rem',
              cursor: 'pointer'
            }}>_</button>
            <button style={{ 
              background: 'rgba(255,255,255,0.2)', 
              border: 'none', 
              color: 'white',
              width: '16px',
              height: '16px',
              fontSize: '0.6rem',
              cursor: 'pointer'
            }}>×</button>
          </div>
        </div>
        
        {/* Zone de chat */}
        <div 
          ref={chatRef}
          style={{
            background: 'white',
            height: '200px',
            overflowY: 'auto',
            padding: '0.5rem',
            borderBottom: '1px solid #ccc'
          }}
        >
          {messages.map((message, index) => (
            <div key={index} style={{
              marginBottom: '0.5rem',
              color: message.isNudge ? '#666' : 
                     message.user === 'Vous' ? '#0066cc' : '#cc0000',
              fontWeight: message.isNudge ? 'normal' : 'bold'
            }}>
              <span style={{ fontSize: '0.7rem', color: '#666' }}>
                [{message.time}] 
              </span>
              <span style={{ marginLeft: '0.3rem' }}>
                {message.user === 'Vous' ? '' : `${message.user}: `}
                {message.text}
              </span>
            </div>
          ))}
        </div>
        
        {/* Zone de saisie */}
        <div style={{
          background: '#f0f0f0',
          padding: '0.5rem',
          borderBottom: '1px solid #ccc'
        }}>
          <input 
            type="text"
            placeholder="Tapez votre message ici..."
            style={{
              width: '100%',
              padding: '0.3rem',
              border: '1px solid #ccc',
              fontSize: '0.8rem'
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                const newMessage = {
                  user: 'Vous',
                  text: e.target.value,
                  time: new Date().toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })
                };
                setMessages(prev => [...prev, newMessage]);
                e.target.value = '';
                
                // Auto-scroll
                setTimeout(() => {
                  if (chatRef.current) {
                    chatRef.current.scrollTop = chatRef.current.scrollHeight;
                  }
                }, 100);
              }
            }}
          />
        </div>
        
        {/* Barre d'outils */}
        <div style={{
          background: '#e0e0e0',
          padding: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <button 
            ref={nudgeButtonRef}
            onClick={sendNudge}
            disabled={cooldownActive}
            style={{
              background: cooldownActive ? '#ccc' : 'linear-gradient(135deg, #ff6b00, #ff8c00)',
              border: 'none',
              color: 'white',
              padding: '0.4rem 0.8rem',
              borderRadius: '3px',
              cursor: cooldownActive ? 'not-allowed' : 'pointer',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              transition: 'all 0.2s ease'
            }}
          >
            {cooldownActive ? '⏳ Attendre...' : '👋 Nudge!'}
          </button>
          
          <span style={{ fontSize: '0.7rem', color: '#666' }}>
            Nudges envoyés: {nudgeCount}
          </span>
          
          <div style={{ marginLeft: 'auto' }}>
            <button 
              onClick={resetChat}
              style={{
                background: '#666',
                border: 'none',
                color: 'white',
                padding: '0.3rem 0.6rem',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '0.7rem'
              }}
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.8rem', 
        color: '#888',
        fontStyle: 'italic' 
      }}>
        💡 Nostalgie : Le nudge était limité à une fois toutes les 30 secondes 
        pour éviter le spam... mais c'était souvent 30 secondes de trop ! 😄
      </div>
    </div>
  );
};

export default MSNNudgeGame;
