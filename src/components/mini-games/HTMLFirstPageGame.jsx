// HTMLFirstPageGame.jsx - Affichage de la première page web
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const HTMLFirstPageGame = ({ soundId = 'modem-connect' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const browserRef = useRef(null);
  const addressBarRef = useRef(null);
  const pageRef = useRef(null);

  const loadingSteps = [
    'Connexion au serveur CERN...',
    'Résolution DNS...',
    'Établissement de la connexion...',
    'Téléchargement de la page...',
    'Rendu HTML...'
  ];

  const loadFirstWebsite = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setShowPage(false);
    setCurrentStep(0);
    
    // Son de connexion modem
    if (window.audioManager) {
      window.audioManager.playSound(soundId || 'modem-connect');
    }

    // Simulation du chargement avec étapes
    loadingSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        
        if (index === loadingSteps.length - 1) {
          setTimeout(() => {
            setIsLoading(false);
            setShowPage(true);
            animatePageAppearance();
          }, 1000);
        }
      }, (index + 1) * 800);
    });
  };

  const animatePageAppearance = () => {
    if (!pageRef.current) return;
    
    // Animation d'apparition ligne par ligne
    const lines = pageRef.current.querySelectorAll('.html-line');
    
    gsap.fromTo(lines, 
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.5,
        stagger: 0.2,
        ease: "power2.out"
      }
    );
  };

  const resetBrowser = () => {
    setIsLoading(false);
    setShowPage(false);
    setCurrentStep(0);
  };

  return (
    <div className="mini-game html-first-page-game">
      <h3>🌍 La première page web de l'histoire</h3>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
        Découvrez la toute première page web créée par Tim Berners-Lee en 1991
      </p>
      
      <div 
        ref={browserRef}
        style={{
          background: '#c0c0c0',
          border: '2px outset #c0c0c0',
          borderRadius: '4px',
          fontFamily: 'MS Sans Serif, sans-serif',
          fontSize: '0.8rem'
        }}
      >
        {/* Barre de titre du navigateur */}
        <div style={{
          background: 'linear-gradient(135deg, #000080, #000060)',
          color: 'white',
          padding: '0.3rem 0.5rem',
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.7rem'
        }}>
          <span style={{ marginRight: '0.5rem' }}>🌐</span>
          WorldWideWeb Browser - CERN
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.2rem' }}>
            <button style={{ 
              background: '#c0c0c0', 
              border: '1px outset #c0c0c0',
              width: '16px',
              height: '14px',
              fontSize: '0.6rem'
            }}>_</button>
            <button style={{ 
              background: '#c0c0c0', 
              border: '1px outset #c0c0c0',
              width: '16px',
              height: '14px',
              fontSize: '0.6rem'
            }}>□</button>
            <button style={{ 
              background: '#c0c0c0', 
              border: '1px outset #c0c0c0',
              width: '16px',
              height: '14px',
              fontSize: '0.6rem'
            }}>×</button>
          </div>
        </div>

        {/* Barre d'adresse */}
        <div style={{
          background: '#c0c0c0',
          padding: '0.5rem',
          borderBottom: '1px solid #808080'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.7rem' }}>Address:</label>
            <div 
              ref={addressBarRef}
              style={{
                background: 'white',
                border: '1px inset #c0c0c0',
                padding: '0.2rem 0.5rem',
                flex: 1,
                fontSize: '0.7rem',
                fontFamily: 'Courier New, monospace'
              }}
            >
              {showPage ? 'http://info.cern.ch/hypertext/WWW/TheProject.html' : ''}
            </div>
          </div>
        </div>

        {/* Zone de contenu */}
        <div style={{
          background: 'white',
          minHeight: '300px',
          padding: '1rem',
          position: 'relative'
        }}>
          {!isLoading && !showPage && (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
              color: '#666'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌐</div>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                Cliquez pour charger la première page web de l'histoire
              </div>
              <button 
                onClick={loadFirstWebsite}
                style={{
                  background: '#c0c0c0',
                  border: '2px outset #c0c0c0',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                📡 Se connecter à CERN
              </button>
            </div>
          )}

          {isLoading && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px'
            }}>
              <div style={{ 
                fontSize: '1.5rem', 
                marginBottom: '1rem',
                animation: 'spin 2s linear infinite'
              }}>
                📡
              </div>
              <div style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                {loadingSteps[currentStep]}
              </div>
              <div style={{
                width: '200px',
                height: '20px',
                background: '#c0c0c0',
                border: '1px inset #c0c0c0',
                position: 'relative'
              }}>
                <div style={{
                  height: '100%',
                  background: '#0000ff',
                  width: `${((currentStep + 1) / loadingSteps.length) * 100}%`,
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
          )}

          {showPage && (
            <div ref={pageRef} style={{
              color: '#000',
              fontSize: '0.9rem',
              lineHeight: '1.4',
              fontFamily: 'Times, serif'
            }}>
              <div className="html-line" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                World Wide Web
              </div>
              
              <div className="html-line" style={{ marginBottom: '1rem' }}>
                The WorldWideWeb (W3) is a wide-area <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>hypermedia</a> information retrieval 
                initiative aiming to give universal access to a large universe of documents.
              </div>
              
              <div className="html-line" style={{ marginBottom: '1rem' }}>
                Everything there is online about <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>W3</a> is linked directly or indirectly 
                to this document, including an <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>executive summary</a> of the project, 
                <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>Mailing lists</a>, <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>Policy</a>, November's  
                <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>W3 news</a>, and <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>Frequently Asked Questions</a>.
              </div>
              
              <div className="html-line" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                What's out there?
              </div>
              
              <div className="html-line" style={{ marginBottom: '0.5rem' }}>
                Pointers to the world's online information, <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>subjects</a>, 
                <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>W3 servers</a>, etc.
              </div>
              
              <div className="html-line" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Help
              </div>
              
              <div className="html-line" style={{ marginBottom: '1rem' }}>
                on the browser you are using
              </div>
              
              <div className="html-line" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Software Products
              </div>
              
              <div className="html-line" style={{ marginBottom: '1rem' }}>
                A list of <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>W3 project components</a> and their current state. 
                (e.g. <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>Line Mode</a>, X11 <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>Viola</a>, 
                <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>NeXTStep</a>, <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>Servers</a>, 
                <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>Tools</a>, <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>Mail robot</a>, 
                <a href="#" style={{ color: '#0000ff', textDecoration: 'underline' }}>Library</a>)
              </div>
              
              <div className="html-line" style={{ fontSize: '0.8rem', color: '#666', marginTop: '2rem' }}>
                Tim Berners-Lee, CERN<br />
                December 1990
              </div>
            </div>
          )}
        </div>

        {/* Barre de statut */}
        <div style={{
          background: '#c0c0c0',
          borderTop: '1px solid #808080',
          padding: '0.2rem 0.5rem',
          fontSize: '0.7rem',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>
            {isLoading ? 'Chargement...' : 
             showPage ? 'Document terminé' : 'Prêt'}
          </span>
          {showPage && (
            <button 
              onClick={resetBrowser}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.7rem',
                cursor: 'pointer',
                color: '#000080'
              }}
            >
              🔄 Recharger
            </button>
          )}
        </div>
      </div>
      
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.8rem', 
        color: '#888',
        fontStyle: 'italic' 
      }}>
        💡 Fact historique : Cette page était accessible à l'adresse info.cern.ch et contenait 
        la description complète du projet World Wide Web de Tim Berners-Lee !
      </div>
    </div>
  );
};

export default HTMLFirstPageGame;
