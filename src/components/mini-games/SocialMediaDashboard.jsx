// SocialMediaDashboard.jsx - Dashboard des réseaux sociaux Web 2.0
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SocialMediaDashboard = ({ soundId = 'notification' }) => {
  const [activeApps, setActiveApps] = useState([]);
  const [notifications, setNotifications] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedApp, setSelectedApp] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  
  const dashboardRef = useRef(null);
  const notificationCounterRef = useRef(0);

  const socialApps = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: '👥',
      color: '#3b5998',
      year: '2004',
      description: 'Connectez-vous avec vos amis',
      users: '500M utilisateurs'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: '🐦',
      color: '#1da1f2',
      year: '2006',
      description: 'Exprimez-vous en 140 caractères',
      users: '200M utilisateurs'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      color: '#0077b5',
      year: '2003',
      description: 'Réseau professionnel',
      users: '100M utilisateurs'
    },
    {
      id: 'myspace',
      name: 'MySpace',
      icon: '🎵',
      color: '#005580',
      year: '2003',
      description: 'Musique et profils personnalisés',
      users: '300M utilisateurs'
    },
    {
      id: 'flickr',
      name: 'Flickr',
      icon: '📸',
      color: '#ff0084',
      year: '2004',
      description: 'Partagez vos photos',
      users: '50M utilisateurs'
    },
    {
      id: 'digg',
      name: 'Digg',
      icon: '📰',
      color: '#356aa0',
      year: '2004',
      description: 'Découvrez les actualités',
      users: '30M utilisateurs'
    },
    {
      id: 'delicious',
      name: 'del.icio.us',
      icon: '🔖',
      color: '#3274d1',
      year: '2003',
      description: 'Marque-pages sociaux',
      users: '10M utilisateurs'
    },
    {
      id: 'skype',
      name: 'Skype',
      icon: '📞',
      color: '#00aff0',
      year: '2003',
      description: 'Appels vidéo gratuits',
      users: '150M utilisateurs'
    },
    {
      id: 'reddit',
      name: 'Reddit',
      icon: '🤖',
      color: '#ff4500',
      year: '2005',
      description: 'La première page d\'Internet',
      users: '20M utilisateurs'
    }
  ];

  const openApp = (app) => {
    if (activeApps.find(a => a.id === app.id)) return;
    
    setShowWelcome(false); // Cacher le message de bienvenue
    setActiveApps(prev => [...prev, app]);
    setSelectedApp(app);
    
    // Son de notification
    if (window.audioManager) {
      window.audioManager.playSound(soundId || 'notification');
    }
    
    // Animation d'ouverture
    setTimeout(() => {
      const appWindow = document.getElementById(`window-${app.id}`);
      if (appWindow) {
        gsap.fromTo(appWindow,
          { scale: 0, opacity: 0, y: 50 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
        );
      }
    }, 10);
    
    // Simulation de notifications
    simulateNotifications(app);
  };

  const closeApp = (appId) => {
    const appWindow = document.getElementById(`window-${appId}`);
    if (appWindow) {
      gsap.to(appWindow, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActiveApps(prev => prev.filter(a => a.id !== appId));
          if (selectedApp?.id === appId) {
            setSelectedApp(null);
          }
        }
      });
    }
  };

  const simulateNotifications = (app) => {
    const notificationMessages = {
      facebook: [
        'Jean a commenté votre photo',
        'Marie vous a envoyé un poke',
        'Nouveau message de Paul',
        'Invitation à rejoindre le groupe "Souvenirs du lycée"'
      ],
      twitter: [
        'Vous avez 3 nouveaux followers',
        '@user123 vous a mentionné',
        'Tendance: #Web20',
        'RT par @celebrity'
      ],
      linkedin: [
        'Votre profil a été consulté 5 fois',
        'Nouvelle connexion: Manager chez Tech Corp',
        'Recommandation reçue',
        'Offre d\'emploi suggérée'
      ],
      myspace: [
        'Nouveau commentaire sur votre profil',
        'Ami ajouté à votre top 8',
        'Nouvelle chanson ajoutée',
        'Message privé reçu'
      ]
    };

    const messages = notificationMessages[app.id] || ['Nouvelle notification'];
    
    // Simulation de notifications périodiques
    const interval = setInterval(() => {
      if (!activeApps.find(a => a.id === app.id)) {
        clearInterval(interval);
        return;
      }
      
      const message = messages[Math.floor(Math.random() * messages.length)];
      setNotifications(prev => prev + 1);
      
      // Effet visuel de notification
      showNotification(app, message);
      
    }, 3000 + Math.random() * 4000);
  };

  const showNotification = (app, message) => {
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, ${app.color}, ${app.color}99);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        min-width: 250px;
        font-family: Arial, sans-serif;
        font-size: 0.9rem;
      ">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <span style="font-size: 1.2rem;">${app.icon}</span>
          <strong>${app.name}</strong>
        </div>
        <div>${message}</div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    gsap.fromTo(notification,
      { x: 300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    
    setTimeout(() => {
      gsap.to(notification, {
        x: 300,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => document.body.removeChild(notification)
      });
    }, 4000);
  };

  const clearNotifications = () => {
    setNotifications(0);
  };

  // Horloge en temps réel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mini-game social-media-dashboard">
      <h3>🌐 Dashboard Web 2.0 - L'explosion sociale</h3>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
        Explorez l'écosystème des réseaux sociaux de 2010 ! Cliquez sur les icônes pour découvrir chaque plateforme.
      </p>
      
      <div 
        ref={dashboardRef}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: '2px solid #4a5568',
          borderRadius: '12px',
          padding: '1rem',
          minHeight: '600px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Barre de menu du système */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '8px',
          padding: '0.5rem 1rem',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          fontSize: '0.9rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: 'bold' }}>Web 2.0 Desktop</span>
            <span>🔔 {notifications} notifications</span>
            {notifications > 0 && (
              <button 
                onClick={clearNotifications}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: 'white',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Effacer
              </button>
            )}
          </div>
          <div>
            {currentTime.toLocaleTimeString()} - {currentTime.toLocaleDateString()}
          </div>
        </div>

        {/* Grille d'icônes des réseaux sociaux */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {socialApps.map(app => (
            <div 
              key={app.id}
              onClick={() => openApp(app)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '2px solid transparent',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.borderColor = app.color;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
                e.target.style.borderColor = 'transparent';
              }}
            >
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '0.5rem',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
              }}>
                {app.icon}
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                {app.name}
              </div>
              <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                {app.year}
              </div>
            </div>
          ))}
        </div>

        {/* Fenêtres d'applications ouvertes */}
        {activeApps.map((app, index) => (
          <div
            key={app.id}
            id={`window-${app.id}`}
            style={{
              position: 'absolute',
              left: 50 + (index * 30),
              top: 100 + (index * 30),
              width: '400px',
              minHeight: '300px',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              zIndex: 1000 + index,
              overflow: 'hidden'
            }}
          >
            {/* Barre de titre */}
            <div style={{
              background: app.color,
              color: 'white',
              padding: '0.5rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
              <span>{app.icon} {app.name}</span>
              <button 
                onClick={() => closeApp(app.id)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: 'white',
                  width: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                ×
              </button>
            </div>

            {/* Contenu de l'application */}
            <div style={{ padding: '1rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: app.color }}>
                Bienvenue sur {app.name} !
              </h4>
              
              <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
                <strong>Lancé en:</strong> {app.year}<br />
                <strong>Utilisateurs:</strong> {app.users}<br />
                <strong>Description:</strong> {app.description}
              </div>

              {/* Contenu spécifique à chaque app */}
              {app.id === 'facebook' && (
                <div>
                  <div style={{ marginBottom: '1rem' }}>
                    <strong>Statut:</strong>
                    <div style={{
                      background: '#f0f0f0',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      marginTop: '0.3rem',
                      fontSize: '0.9rem'
                    }}>
                      "En train de découvrir ce nouveau truc appelé Facebook !"
                    </div>
                  </div>
                  <div>
                    <strong>Amis récents:</strong>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      • Jean Dupont<br />
                      • Marie Martin<br />
                      • Paul Durand
                    </div>
                  </div>
                </div>
              )}

              {app.id === 'twitter' && (
                <div>
                  <div style={{ marginBottom: '1rem' }}>
                    <strong>Dernier tweet:</strong>
                    <div style={{
                      background: '#e1f5fe',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      marginTop: '0.3rem',
                      fontSize: '0.9rem',
                      borderLeft: '3px solid #1da1f2'
                    }}>
                      "Twitter va révolutionner la communication ! #web20 #innovation"
                    </div>
                  </div>
                </div>
              )}

              {app.id === 'myspace' && (
                <div>
                  <div style={{ marginBottom: '1rem' }}>
                    <strong>Chanson du profil:</strong>
                    <div style={{
                      background: '#fff3e0',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      marginTop: '0.3rem',
                      fontSize: '0.9rem'
                    }}>
                      🎵 "My Chemical Romance - Welcome to the Black Parade"
                    </div>
                  </div>
                  <div>
                    <strong>Top 8 amis:</strong>
                    <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.3rem' }}>
                      {'👤'.repeat(8).split('').map((emoji, i) => (
                        <span key={i} style={{ fontSize: '1.2rem' }}>{emoji}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Boutons d'action génériques */}
              <div style={{
                marginTop: '1.5rem',
                display: 'flex',
                gap: '0.5rem'
              }}>
                <button style={{
                  background: app.color,
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}>
                  Utiliser {app.name}
                </button>
                <button style={{
                  background: '#f0f0f0',
                  color: '#666',
                  border: '1px solid #ddd',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}>
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Message d'aide - seulement au début */}
        {showWelcome && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.1rem',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid rgba(255, 255, 255, 0.3)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌐</div>
            <div>Cliquez sur les icônes pour explorer les réseaux sociaux</div>
            <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.7 }}>
              Découvrez comment le Web 2.0 a transformé Internet !
            </div>
            <button
              onClick={() => setShowWelcome(false)}
              style={{
                marginTop: '1rem',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Commencer à explorer
            </button>
          </div>
        )}

        {/* Effet de brillance en arrière-plan */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
      </div>
      
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.8rem', 
        color: '#888',
        fontStyle: 'italic' 
      }}>
        💡 L'époque Web 2.0 (2004-2010) a vu naître les réseaux sociaux modernes. 
        Facebook, Twitter, LinkedIn... ces plateformes ont révolutionné notre façon de communiquer !
      </div>
    </div>
  );
};

export default SocialMediaDashboard;
