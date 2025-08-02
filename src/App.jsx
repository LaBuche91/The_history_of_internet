// App.jsx - Composant principal de l'expérience interactive
import React, { useEffect, useRef, useState } from 'react';
import './styles/App.css';

// Import conditionnel des composants pour éviter les erreurs
const HeroSection = React.lazy(() => 
  import('./components/HeroSection').catch(() => ({ 
    default: () => <div style={{color: '#00ff00', padding: '2rem'}}>Section Héro en cours de chargement...</div>
  }))
);

const TimelineSection = React.lazy(() => 
  import('./components/TimelineSection').catch(() => ({ 
    default: () => <div style={{color: '#00ff00', padding: '2rem'}}>Timeline en cours de chargement...</div>
  }))
);

const AudioManager = React.lazy(() => 
  import('./components/AudioManager').catch(() => ({ 
    default: () => null
  }))
);

function App() {
  const appRef = useRef(null);
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  useEffect(() => {
    // Animation d'entrée simple sans GSAP pour commencer
    if (appRef.current) {
      appRef.current.style.opacity = '0';
      setTimeout(() => {
        if (appRef.current) {
          appRef.current.style.transition = 'opacity 1.5s ease';
          appRef.current.style.opacity = '1';
        }
      }, 100);
    }
    
    // Chargement progressif des composants
    setTimeout(() => setComponentsLoaded(true), 1000);
  }, []);

  return (
    <div ref={appRef} className="app">
      {/* Section héro */}
      <section style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(45deg, #000 0%, #1a1a1a 50%, #333 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 8vw, 6rem)',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '2rem',
          background: 'linear-gradient(45deg, #00ff00, #ffb000)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          The History of the Internet
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          textAlign: 'center',
          color: '#ccc',
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          Embarquez pour un voyage interactif à travers les moments 
          qui ont façonné notre monde numérique. Des premiers pas 
          d'ARPANET aux réseaux sociaux modernes.
        </p>
        
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#00ff00',
          fontSize: '2rem',
          animation: 'blink 2s infinite'
        }}>
          ↓
        </div>
      </section>

      {/* Chargement conditionnel des composants */}
      {componentsLoaded && (
        <React.Suspense fallback={
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            color: '#00ff00'
          }}>
            Chargement des composants interactifs...
          </div>
        }>
          <AudioManager />
          <HeroSection />
          <TimelineSection />
        </React.Suspense>
      )}
      
      {/* Footer */}
      <footer style={{
        background: '#111',
        padding: '2rem',
        textAlign: 'center',
        color: '#666',
        borderTop: '1px solid #333'
      }}>
        <p>© 2025 - Une expérience interactive inspirée de neal.fun</p>
      </footer>
    </div>
  );
}

export default App;