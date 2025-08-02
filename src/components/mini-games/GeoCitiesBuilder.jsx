// GeoCitiesBuilder.jsx - Constructeur de site GeoCities vintage
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const GeoCitiesBuilder = ({ soundId = 'midi-music' }) => {
  const [websiteElements, setWebsiteElements] = useState([]);
  const [selectedBg, setSelectedBg] = useState('stars');
  const [siteTitle, setSiteTitle] = useState('Mon Site Génial!!!');
  const [isBuilding, setIsBuilding] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const canvasRef = useRef(null);
  const previewRef = useRef(null);
  const elementCounterRef = useRef(0);

  const backgrounds = {
    stars: 'radial-gradient(circle, #000033 0%, #000066 100%), url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="stars" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Ccircle cx="3" cy="3" r="1" fill="white"/%3E%3Ccircle cx="17" cy="8" r="0.5" fill="white"/%3E%3Ccircle cx="12" cy="15" r="0.8" fill="white"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23stars)"/%3E%3C/svg%3E")',
    rainbow: 'linear-gradient(45deg, #ff0000, #ff7700, #ffff00, #00ff00, #0077ff, #3300ff, #7700ff)',
    flames: 'linear-gradient(180deg, #ff4400 0%, #ff8800 50%, #ffcc00 100%)',
    matrix: 'linear-gradient(180deg, #003300 0%, #006600 50%, #00aa00 100%)',
    galaxy: 'radial-gradient(ellipse at center, #1e3c72 0%, #2a5298 100%)'
  };

  const draggableElements = [
    { 
      id: 'gif-dancing-baby', 
      content: '👶💃', 
      type: 'gif',
      label: 'Dancing Baby',
      style: { fontSize: '2rem', background: 'none', border: 'none' }
    },
    { 
      id: 'gif-sparkles', 
      content: '✨⭐✨', 
      type: 'gif',
      label: 'Sparkles',
      style: { fontSize: '1.5rem', background: 'none', border: 'none', animation: 'blink 1s infinite' }
    },
    { 
      id: 'gif-flame', 
      content: '🔥🔥🔥', 
      type: 'gif',
      label: 'Flames',
      style: { fontSize: '1.5rem', background: 'none', border: 'none' }
    },
    { 
      id: 'text-welcome', 
      content: 'BIENVENUE SUR MON SITE !!!', 
      type: 'text',
      label: 'Welcome Text',
      style: { 
        fontFamily: 'Comic Sans MS, cursive', 
        fontSize: '1.2rem', 
        color: '#ff00ff',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px #000',
        background: 'none',
        border: 'none'
      }
    },
    { 
      id: 'counter', 
      content: 'Visiteur n° 001337', 
      type: 'counter',
      label: 'Visitor Counter',
      style: { 
        background: '#000', 
        color: '#00ff00', 
        fontFamily: 'Courier New, monospace',
        padding: '0.3rem 0.6rem',
        border: '2px inset #c0c0c0',
        fontSize: '0.8rem'
      }
    },
    { 
      id: 'marquee-text', 
      content: '🎵 Cette page est optimisée pour Netscape Navigator 🎵', 
      type: 'marquee',
      label: 'Scrolling Text',
      style: { 
        background: '#ffff00', 
        color: '#ff0000',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        padding: '0.2rem',
        border: '1px solid #000',
        fontSize: '0.9rem'
      }
    },
    { 
      id: 'under-construction', 
      content: '🚧 EN CONSTRUCTION 🚧', 
      type: 'construction',
      label: 'Under Construction',
      style: { 
        background: '#ffff00', 
        color: '#000',
        fontFamily: 'Arial Black, sans-serif',
        fontWeight: 'bold',
        padding: '0.5rem',
        border: '3px solid #ff0000',
        fontSize: '0.8rem',
        animation: 'blink 1.5s infinite'
      }
    },
    { 
      id: 'guestbook', 
      content: '📖 SIGNEZ MON LIVRE D\'OR', 
      type: 'link',
      label: 'Guestbook Link',
      style: { 
        color: '#0000ff',
        textDecoration: 'underline',
        fontFamily: 'Times New Roman, serif',
        fontSize: '1rem',
        background: 'none',
        border: 'none',
        cursor: 'pointer'
      }
    }
  ];

  const addElement = (elementTemplate) => {
    const newElement = {
      ...elementTemplate,
      id: `${elementTemplate.id}-${++elementCounterRef.current}`,
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 50,
      zIndex: elementCounterRef.current
    };
    
    setWebsiteElements(prev => [...prev, newElement]);
    
    // Animation d'apparition
    setTimeout(() => {
      const element = document.getElementById(newElement.id);
      if (element) {
        gsap.fromTo(element,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
        
        // Rendre l'élément draggable
        Draggable.create(element, {
          type: 'x,y',
          bounds: canvasRef.current,
          onDrag: function() {
            // Mettre à jour la position dans l'état
            setWebsiteElements(prev => 
              prev.map(el => 
                el.id === newElement.id 
                  ? { ...el, x: this.x, y: this.y }
                  : el
              )
            );
          }
        });
      }
    }, 100);
  };

  const removeElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      gsap.to(element, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setWebsiteElements(prev => prev.filter(el => el.id !== elementId));
        }
      });
    }
  };

  const previewWebsite = () => {
    setShowPreview(true);
    
    // Son MIDI d'époque
    if (window.audioManager) {
      window.audioManager.playSound(soundId || 'midi-music');
    }
    
    // Animation d'ouverture du navigateur
    if (previewRef.current) {
      gsap.fromTo(previewRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  };

  const closePreview = () => {
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setShowPreview(false)
      });
    }
  };

  const clearCanvas = () => {
    setWebsiteElements([]);
    setSiteTitle('Mon Site Génial!!!');
  };

  return (
    <div className="mini-game geocities-builder-game">
      <h3>🏗️ Constructeur de site GeoCities</h3>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
        Créez votre chef-d'œuvre rétro avec tous les clichés des années 2000 !
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', height: '600px' }}>
        {/* Palette d'outils */}
        <div style={{
          width: '200px',
          background: '#f0f0f0',
          border: '2px inset #c0c0c0',
          padding: '1rem',
          borderRadius: '4px',
          overflowY: 'auto'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#000', fontSize: '0.9rem' }}>
            🎨 Éléments
          </h4>
          
          {/* Sélection du fond */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.8rem', color: '#000', fontWeight: 'bold' }}>
              Arrière-plan:
            </label>
            <select 
              value={selectedBg}
              onChange={(e) => setSelectedBg(e.target.value)}
              style={{
                width: '100%',
                marginTop: '0.3rem',
                padding: '0.2rem',
                fontSize: '0.7rem'
              }}
            >
              <option value="stars">✨ Étoiles</option>
              <option value="rainbow">🌈 Arc-en-ciel</option>
              <option value="flames">🔥 Flammes</option>
              <option value="matrix">💚 Matrix</option>
              <option value="galaxy">🌌 Galaxie</option>
            </select>
          </div>

          {/* Titre du site */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.8rem', color: '#000', fontWeight: 'bold' }}>
              Titre:
            </label>
            <input 
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              style={{
                width: '100%',
                marginTop: '0.3rem',
                padding: '0.2rem',
                fontSize: '0.7rem'
              }}
            />
          </div>
          
          {/* Éléments draggables */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#000', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Glissez sur la page:
            </div>
            {draggableElements.map(element => (
              <button
                key={element.id}
                onClick={() => addElement(element)}
                style={{
                  width: '100%',
                  marginBottom: '0.3rem',
                  padding: '0.3rem',
                  background: '#e0e0e0',
                  border: '1px outset #c0c0c0',
                  cursor: 'pointer',
                  fontSize: '0.7rem',
                  textAlign: 'left'
                }}
              >
                {element.label}
              </button>
            ))}
          </div>
          
          {/* Actions */}
          <div style={{ borderTop: '1px solid #ccc', paddingTop: '0.5rem' }}>
            <button 
              onClick={previewWebsite}
              style={{
                width: '100%',
                marginBottom: '0.5rem',
                padding: '0.5rem',
                background: '#0066cc',
                color: 'white',
                border: '2px outset #0066cc',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}
            >
              👁️ Aperçu
            </button>
            <button 
              onClick={clearCanvas}
              style={{
                width: '100%',
                padding: '0.3rem',
                background: '#cc0000',
                color: 'white',
                border: '2px outset #cc0000',
                cursor: 'pointer',
                fontSize: '0.7rem'
              }}
            >
              🗑️ Tout effacer
            </button>
          </div>
        </div>

        {/* Canvas de construction */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div 
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              background: backgrounds[selectedBg],
              border: '2px inset #c0c0c0',
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden',
              backgroundSize: selectedBg === 'stars' ? '20px 20px' : 'cover'
            }}
          >
            {/* Titre du site */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'Comic Sans MS, cursive',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#ff00ff',
              textShadow: '2px 2px 4px #000, 0 0 10px #fff',
              animation: 'rainbow-text 3s infinite',
              zIndex: 1000,
              whiteSpace: 'nowrap'
            }}>
              {siteTitle}
            </div>

            {/* Éléments placés */}
            {websiteElements.map(element => (
              <div
                key={element.id}
                id={element.id}
                style={{
                  position: 'absolute',
                  left: element.x,
                  top: element.y,
                  zIndex: element.zIndex,
                  cursor: 'move',
                  userSelect: 'none',
                  ...element.style
                }}
                onDoubleClick={() => removeElement(element.id)}
              >
                {element.type === 'marquee' ? (
                  <div style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    width: '300px'
                  }}>
                    <div style={{
                      animation: 'scroll-right 10s linear infinite',
                      ...element.style
                    }}>
                      {element.content}
                    </div>
                  </div>
                ) : (
                  element.content
                )}
              </div>
            ))}

            {/* Aide */}
            {websiteElements.length === 0 && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'rgba(255, 255, 255, 0.7)',
                textAlign: 'center',
                fontSize: '1rem',
                textShadow: '1px 1px 2px #000'
              }}>
                <div style={{ marginBottom: '0.5rem' }}>🎨</div>
                <div>Utilisez la palette pour ajouter des éléments</div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>
                  Double-clic pour supprimer un élément
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Aperçu en popup */}
      {showPreview && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div 
            ref={previewRef}
            style={{
              width: '90%',
              height: '90%',
              background: '#c0c0c0',
              border: '2px outset #c0c0c0',
              borderRadius: '4px',
              position: 'relative'
            }}
          >
            {/* Barre de titre Netscape */}
            <div style={{
              background: 'linear-gradient(135deg, #000080, #000060)',
              color: 'white',
              padding: '0.3rem 0.5rem',
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.8rem'
            }}>
              <span style={{ marginRight: '0.5rem' }}>🌐</span>
              Netscape Navigator - {siteTitle}
              <button 
                onClick={closePreview}
                style={{
                  marginLeft: 'auto',
                  background: '#c0c0c0',
                  border: '1px outset #c0c0c0',
                  width: '20px',
                  height: '16px',
                  fontSize: '0.7rem',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            {/* Barre d'adresse */}
            <div style={{
              background: '#c0c0c0',
              padding: '0.3rem',
              borderBottom: '1px solid #808080'
            }}>
              <div style={{ fontSize: '0.7rem' }}>
                Location: http://www.geocities.com/SiliconValley/1337/index.html
              </div>
            </div>

            {/* Contenu du site */}
            <div style={{
              height: 'calc(100% - 60px)',
              background: backgrounds[selectedBg],
              position: 'relative',
              overflow: 'hidden',
              backgroundSize: selectedBg === 'stars' ? '20px 20px' : 'cover'
            }}>
              {/* Titre */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'Comic Sans MS, cursive',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#ff00ff',
                textShadow: '2px 2px 4px #000, 0 0 10px #fff',
                animation: 'rainbow-text 3s infinite',
                whiteSpace: 'nowrap'
              }}>
                {siteTitle}
              </div>

              {/* Éléments */}
              {websiteElements.map(element => (
                <div
                  key={`preview-${element.id}`}
                  style={{
                    position: 'absolute',
                    left: element.x,
                    top: element.y,
                    zIndex: element.zIndex,
                    ...element.style
                  }}
                >
                  {element.type === 'marquee' ? (
                    <div style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      width: '300px'
                    }}>
                      <div style={{
                        animation: 'scroll-right 10s linear infinite',
                        ...element.style
                      }}>
                        {element.content}
                      </div>
                    </div>
                  ) : (
                    element.content
                  )}
                </div>
              ))}

              {/* Message de félicitation */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255, 255, 0, 0.9)',
                color: '#ff0000',
                padding: '1rem',
                border: '3px solid #ff0000',
                borderRadius: '8px',
                fontFamily: 'Comic Sans MS, cursive',
                fontWeight: 'bold',
                textAlign: 'center',
                animation: 'blink 2s infinite'
              }}>
                🎉 FÉLICITATIONS ! 🎉<br />
                Votre site GeoCities est prêt !<br />
                <small style={{ fontSize: '0.8rem' }}>
                  Maintenant il ne reste plus qu'à attendre les 56k visiteurs...
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.8rem', 
        color: '#888',
        fontStyle: 'italic' 
      }}>
        💡 Nostalgie : GeoCities a hébergé des millions de sites personnels avec leurs 
        fonds étoilés, GIFs animés et Comic Sans MS. C'était l'âge d'or de la créativité web !
      </div>
    </div>
  );
};

export default GeoCitiesBuilder;
