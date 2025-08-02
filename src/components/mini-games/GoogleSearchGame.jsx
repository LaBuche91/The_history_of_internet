// GoogleSearchGame.jsx - Simulation de recherche Google vintage
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const GoogleSearchGame = ({ soundId = 'dial-up' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  const searchBoxRef = useRef(null);
  const resultsRef = useRef(null);
  const logoRef = useRef(null);

  const vintageSearchTerms = [
    'catz lol',
    'hamster dance',
    'dancing baby gif',
    'Y2K bug',
    'mp3 downloads',
    'geocities templates',
    'dial up internet',
    'netscape navigator',
    'webcrawler search',
    'altavista'
  ];

  const vintageResults = {
    'catz lol': [
      { 
        title: 'CatZ.com - The Ultimate Cat Site!!!',
        url: 'www.catz.com/funny-cats.html',
        description: 'OMG!!! THE FUNNIEST CAT PICTURES EVER!!! Animated GIFs, sounds, and more! Updated DAILY!!!',
        vintage: true
      },
      {
        title: 'LOL Cats Archive - GeoCities',
        url: 'geocities.com/PetCats/1999/lolcats.html',
        description: 'My personal collection of hilarious cat photos. Warning: Contains flashing GIFs!',
        vintage: true
      },
      {
        title: 'Kitty Humor Central',
        url: 'members.tripod.com/~catlover123/funny.htm',
        description: 'The #1 destination for cat jokes and funny pictures. Counter: 00001337 visitors!',
        vintage: true
      }
    ],
    'hamster dance': [
      {
        title: 'The Original Hamster Dance!!!',
        url: 'www.hampsterdance.com',
        description: 'Hampster Hampster Hampster... Welcome to the most addictive site on the web!',
        vintage: true
      },
      {
        title: 'Hamster Dance Remixes - MIDI Paradise',
        url: 'hometown.aol.com/hamsterfan/remixes.html',
        description: 'Download the best Hamster Dance MIDI files and WAV sounds. 56k modem friendly!',
        vintage: true
      }
    ],
    'default': [
      {
        title: 'Yahoo! Web Directory',
        url: 'dir.yahoo.com/search/results',
        description: 'Your search returned 42 categories and 1,337 sites. Browse by category or refine your search.',
        vintage: true
      },
      {
        title: 'AltaVista Search Results',
        url: 'altavista.digital.com/cgi-bin/query',
        description: 'Found 156 web pages containing your search terms. Tip: Use + and - to refine results.',
        vintage: true
      },
      {
        title: 'Excite Search Engine',
        url: 'excite.com/search/web/results',
        description: 'We found relevant web sites and organized them by topic. Click for more results!',
        vintage: true
      }
    ]
  };

  const performSearch = () => {
    if (!searchQuery.trim() || isSearching) return;
    
    setIsSearching(true);
    setShowResults(false);
    
    // Son de connexion dial-up
    if (window.audioManager) {
      window.audioManager.playSound(soundId || 'dial-up');
    }

    // Animation du logo qui rétrécit
    gsap.to(logoRef.current, {
      scale: 0.7,
      y: -50,
      duration: 0.8,
      ease: "power2.out"
    });

    // Simulation de temps de recherche réaliste pour l'époque
    setTimeout(() => {
      const results = vintageResults[searchQuery.toLowerCase()] || vintageResults.default;
      setSearchResults(results);
      setIsSearching(false);
      setShowResults(true);
      
      // Animation d'apparition des résultats
      setTimeout(() => {
        if (resultsRef.current) {
          const resultItems = resultsRef.current.querySelectorAll('.result-item');
          gsap.fromTo(resultItems,
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out"
            }
          );
        }
      }, 100);
    }, 2000 + Math.random() * 1500); // 2-3.5 secondes comme en 1998
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const getRandomSuggestion = () => {
    const term = vintageSearchTerms[Math.floor(Math.random() * vintageSearchTerms.length)];
    setSearchQuery(term);
    searchBoxRef.current?.focus();
  };

  const resetSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setShowResults(false);
    setSearchResults([]);
    
    // Reset du logo
    gsap.to(logoRef.current, {
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <div className="mini-game google-search-game">
      <h3>🔍 Google 1998 - Recherche vintage</h3>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
        Revivez l'époque où Google était un petit moteur de recherche dans un garage !
      </p>
      
      <div style={{
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '2rem',
        textAlign: 'center',
        minHeight: '500px',
        position: 'relative',
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Logo Google vintage */}
        <div 
          ref={logoRef}
          style={{
            marginBottom: '2rem',
            fontSize: '4rem',
            fontWeight: 'bold',
            letterSpacing: '-0.05em'
          }}
        >
          <span style={{ color: '#4285f4' }}>G</span>
          <span style={{ color: '#ea4335' }}>o</span>
          <span style={{ color: '#fbbc05' }}>o</span>
          <span style={{ color: '#4285f4' }}>g</span>
          <span style={{ color: '#34a853' }}>l</span>
          <span style={{ color: '#ea4335' }}>e</span>
        </div>

        {/* Barre de recherche */}
        <div style={{
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <input 
            ref={searchBoxRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre recherche..."
            disabled={isSearching}
            style={{
              width: '400px',
              padding: '0.8rem',
              border: '2px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          />
          <button 
            onClick={performSearch}
            disabled={isSearching || !searchQuery.trim()}
            style={{
              background: isSearching ? '#ccc' : '#f8f9fa',
              border: '1px solid #ddd',
              padding: '0.8rem 1.5rem',
              borderRadius: '4px',
              cursor: isSearching ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem'
            }}
          >
            {isSearching ? '🔍 Recherche...' : 'Recherche Google'}
          </button>
        </div>

        {/* Suggestions rétro */}
        {!showResults && !isSearching && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1rem', color: '#666', fontSize: '0.9rem' }}>
              Essayez une recherche vintage :
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {vintageSearchTerms.slice(0, 5).map(term => (
                <button 
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  style={{
                    background: '#f0f0f0',
                    border: '1px solid #ddd',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    color: '#333'
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
            <div style={{ marginTop: '1rem' }}>
              <button 
                onClick={getRandomSuggestion}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#1a73e8',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  textDecoration: 'underline'
                }}
              >
                🎲 Recherche aléatoire
              </button>
            </div>
          </div>
        )}

        {/* Indicateur de chargement */}
        {isSearching && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#666',
            marginTop: '2rem'
          }}>
            <div style={{ 
              fontSize: '2rem', 
              marginBottom: '1rem',
              animation: 'spin 2s linear infinite'
            }}>
              🌐
            </div>
            <div>Recherche dans l'index de 25 millions de pages...</div>
            <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>
              (Cela peut prendre quelques secondes avec votre connexion 56k)
            </div>
          </div>
        )}

        {/* Résultats de recherche */}
        {showResults && (
          <div ref={resultsRef} style={{ textAlign: 'left', marginTop: '2rem' }}>
            <div style={{ 
              borderBottom: '1px solid #ddd', 
              paddingBottom: '1rem',
              marginBottom: '1rem',
              color: '#666',
              fontSize: '0.9rem'
            }}>
              Résultats 1-{searchResults.length} sur environ {Math.floor(Math.random() * 10000) + 1000} 
              (0.{Math.floor(Math.random() * 9) + 1} secondes)
            </div>
            
            {searchResults.map((result, index) => (
              <div 
                key={index}
                className="result-item"
                style={{
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: index < searchResults.length - 1 ? '1px solid #eee' : 'none'
                }}
              >
                <div style={{
                  color: '#1a0dab',
                  fontSize: '1.1rem',
                  fontWeight: 'normal',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginBottom: '0.2rem'
                }}>
                  {result.title}
                </div>
                <div style={{
                  color: '#006621',
                  fontSize: '0.8rem',
                  marginBottom: '0.3rem'
                }}>
                  {result.url}
                </div>
                <div style={{
                  color: '#545454',
                  fontSize: '0.9rem',
                  lineHeight: '1.4'
                }}>
                  {result.description}
                </div>
              </div>
            ))}
            
            {/* Navigation pagination vintage */}
            <div style={{
              textAlign: 'center',
              marginTop: '2rem',
              paddingTop: '1rem',
              borderTop: '1px solid #eee'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#1a0dab', cursor: 'pointer', textDecoration: 'underline' }}>
                  Précédent
                </span>
                <span style={{ fontWeight: 'bold', color: '#d93025' }}>1</span>
                <span style={{ color: '#1a0dab', cursor: 'pointer', textDecoration: 'underline' }}>2</span>
                <span style={{ color: '#1a0dab', cursor: 'pointer', textDecoration: 'underline' }}>3</span>
                <span style={{ color: '#1a0dab', cursor: 'pointer', textDecoration: 'underline' }}>
                  Suivant
                </span>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button 
                onClick={resetSearch}
                style={{
                  background: '#f8f9fa',
                  border: '1px solid #ddd',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                🔄 Nouvelle recherche
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.8rem', 
        color: '#888',
        fontStyle: 'italic' 
      }}>
        💡 Nostalgie : En 1998, Google était révolutionnaire avec ses résultats rapides et pertinents, 
        comparé à Yahoo! qui organisait tout manuellement par catégories !
      </div>
    </div>
  );
};

export default GoogleSearchGame;
