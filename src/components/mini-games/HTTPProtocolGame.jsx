// HTTPProtocolGame.jsx - Mini-jeu pour l'année 1990 : Création du protocole HTTP
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const HTTPProtocolGame = ({ soundId = 'computer-beep' }) => {
  const [gameStep, setGameStep] = useState('tutorial');
  const [draggedItem, setDraggedItem] = useState(null);
  const [configuredChain, setConfiguredChain] = useState([]);
  const [httpCommand, setHttpCommand] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  
  const terminalRef = useRef(null);
  const responseRef = useRef(null);
  const chainRef = useRef(null);

  const networkComponents = [
    { id: 'computer', name: 'Ordinateur Client', icon: '💻', description: 'L\'ordinateur qui fait la demande' },
    { id: 'http', name: 'Protocole HTTP', icon: '🌐', description: 'Le langage de communication web' },
    { id: 'browser', name: 'Navigateur', icon: '🖥️', description: 'Interface pour afficher les pages web' }
  ];

  const correctOrder = ['computer', 'http', 'browser'];
  
  const sampleResponse = `HTTP/1.0 200 OK
Content-Type: text/html
Content-Length: 147

<html>
<head>
<title>La première page web</title>
</head>
<body>
<h1>Bienvenue sur le World Wide Web!</h1>
<p>Ceci est la première page web créée par Tim Berners-Lee.</p>
</body>
</html>`;

  const tutorialSteps = [
    "En 1990, Tim Berners-Lee invente le protocole HTTP au CERN.",
    "HTTP permet aux ordinateurs de demander et recevoir des pages web.",
    "C'est un protocole de demande/réponse : le client demande, le serveur répond.",
    "Configurons notre première connexion HTTP !"
  ];

  useEffect(() => {
    if (gameStep === 'tutorial') {
      const timeline = gsap.timeline();
      timeline.fromTo('.tutorial-step', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 2, ease: "power2.out" }
      );
    }
  }, [gameStep]);

  useEffect(() => {
    if (showResponse && responseRef.current) {
      let index = 0;
      const typeText = () => {
        if (index < sampleResponse.length) {
          responseRef.current.textContent = sampleResponse.slice(0, index + 1);
          index++;
          setTimeout(typeText, 30);
        }
      };
      typeText();
    }
  }, [showResponse]);

  const handleDragStart = (e, component) => {
    setDraggedItem(component);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItem && !configuredChain.find(item => item.id === draggedItem.id)) {
      const newChain = [...configuredChain, draggedItem];
      setConfiguredChain(newChain);
      
      gsap.fromTo(`.chain-item-${draggedItem.id}`,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
      
      if (newChain.length === 3) {
        setTimeout(() => checkConfiguration(newChain), 500);
      }
    }
    setDraggedItem(null);
  };

  const checkConfiguration = (chain) => {
    const isCorrect = chain.every((item, index) => item.id === correctOrder[index]);
    
    if (isCorrect) {
      gsap.to(chainRef.current, { 
        backgroundColor: 'rgba(0, 255, 136, 0.2)',
        duration: 0.5 
      });
      setTimeout(() => setGameStep('http-request'), 1000);
    } else {
      gsap.to(chainRef.current, { 
        backgroundColor: 'rgba(255, 68, 68, 0.2)',
        duration: 0.5 
      });
      setTimeout(() => {
        setConfiguredChain([]);
        gsap.to(chainRef.current, { backgroundColor: 'transparent', duration: 0.5 });
      }, 1500);
    }
  };

  const handleCommandSubmit = () => {
    if (httpCommand.toLowerCase().includes('get') && httpCommand.toLowerCase().includes('http')) {
      gsap.to(terminalRef.current, { 
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        duration: 0.5 
      });
      setTimeout(() => {
        setShowResponse(true);
        setGameStep('complete');
      }, 1000);
    } else {
      gsap.to(terminalRef.current, { 
        backgroundColor: 'rgba(255, 68, 68, 0.1)',
        duration: 0.5 
      });
      setTimeout(() => {
        gsap.to(terminalRef.current, { backgroundColor: 'transparent', duration: 0.5 });
      }, 1000);
    }
  };

  const resetGame = () => {
    setGameStep('tutorial');
    setConfiguredChain([]);
    setHttpCommand('');
    setShowResponse(false);
    setTypingIndex(0);
  };

  if (gameStep === 'tutorial') {
    return (
      <div className="mini-game http-protocol-game">
        <h3>🌐 Naissance du Protocole HTTP (1990)</h3>
        <div className="tutorial-container">
          {tutorialSteps.map((step, index) => (
            <div key={index} className="tutorial-step" style={{ animationDelay: `${index * 2}s` }}>
              <p>{step}</p>
            </div>
          ))}
          <button 
            className="retro-button"
            onClick={() => setGameStep('configuration')}
            style={{ marginTop: '2rem' }}
          >
            Commencer la configuration
          </button>
        </div>
      </div>
    );
  }

  if (gameStep === 'configuration') {
    return (
      <div className="mini-game http-protocol-game">
        <h3>🔧 Étape 1 : Configuration du réseau</h3>
        <p>Glissez les composants dans le bon ordre pour établir une connexion HTTP :</p>
        
        <div className="drag-drop-container">
          <div className="components-source">
            <h4>Composants disponibles :</h4>
            <div className="components-list">
              {networkComponents.map(component => (
                <div
                  key={component.id}
                  className={`component-item ${configuredChain.find(item => item.id === component.id) ? 'used' : ''}`}
                  draggable={!configuredChain.find(item => item.id === component.id)}
                  onDragStart={(e) => handleDragStart(e, component)}
                >
                  <span className="component-icon">{component.icon}</span>
                  <div className="component-info">
                    <strong>{component.name}</strong>
                    <small>{component.description}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="arrow">➡️</div>

          <div 
            className="chain-container"
            ref={chainRef}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <h4>Chaîne de communication :</h4>
            <div className="chain-items">
              {configuredChain.length === 0 ? (
                <div className="drop-zone">Déposez les composants ici</div>
              ) : (
                configuredChain.map((item, index) => (
                  <div key={item.id} className={`chain-item chain-item-${item.id}`}>
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                    {index < configuredChain.length - 1 && <span className="chain-arrow">→</span>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="http-explanation">
          <h4>💡 Comment fonctionne HTTP :</h4>
          <p>1. L'<strong>ordinateur client</strong> envoie une demande</p>
          <p>2. Le <strong>protocole HTTP</strong> formate la communication</p>
          <p>3. Le <strong>navigateur</strong> affiche la réponse reçue</p>
        </div>
      </div>
    );
  }

  if (gameStep === 'http-request') {
    return (
      <div className="mini-game http-protocol-game">
        <h3>📡 Étape 2 : Envoi d'une requête HTTP</h3>
        <p>Tapez une commande HTTP pour demander une page web :</p>
        
        <div className="terminal-container" ref={terminalRef}>
          <div className="terminal-header">
            <span>Terminal HTTP - CERN 1990</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-prompt">
              <span className="prompt">http-client$</span>
              <input
                type="text"
                value={httpCommand}
                onChange={(e) => setHttpCommand(e.target.value)}
                placeholder="Tapez votre commande HTTP..."
                className="terminal-input"
                onKeyPress={(e) => e.key === 'Enter' && handleCommandSubmit()}
              />
            </div>
            <button 
              className="retro-button terminal-button"
              onClick={handleCommandSubmit}
            >
              Envoyer la requête
            </button>
          </div>
        </div>

        <div className="http-help">
          <h4>💡 Aide - Format de la requête HTTP :</h4>
          <div className="code-example">
            <code>GET /index.html HTTP/1.0</code>
          </div>
          <p><strong>GET</strong> : méthode de demande</p>
          <p><strong>/index.html</strong> : fichier demandé</p>
          <p><strong>HTTP/1.0</strong> : version du protocole</p>
        </div>
      </div>
    );
  }

  if (gameStep === 'complete') {
    return (
      <div className="mini-game http-protocol-game">
        <h3>✅ Succès ! Réponse du serveur reçue</h3>
        
        <div className="response-container">
          <div className="response-header">
            <span>Réponse HTTP du serveur CERN</span>
          </div>
          <pre className="response-body" ref={responseRef}>
            {/* Le texte sera tapé ici par l'effet de machine à écrire */}
          </pre>
        </div>

        <div className="success-message">
          <h4>🎉 Félicitations !</h4>
          <p>Vous venez de simuler la première communication HTTP de l'histoire !</p>
          <p>Cette technologie révolutionnaire créée par Tim Berners-Lee au CERN a permis la naissance du World Wide Web.</p>
          
          <button className="retro-button" onClick={resetGame}>
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default HTTPProtocolGame;