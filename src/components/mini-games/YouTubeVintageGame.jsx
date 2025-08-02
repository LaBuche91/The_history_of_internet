// YouTubeVintageGame.jsx - Lecteur YouTube vintage avec easter egg
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const YouTubeVintageGame = ({ soundId = 'youtube-intro' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoTitle, setVideoTitle] = useState('');
  const [showRickroll, setShowRickroll] = useState(false);
  const [hasClickedPlay, setHasClickedPlay] = useState(false);
  
  const playerRef = useRef(null);
  const progressRef = useRef(null);
  const videoTimerRef = useRef(null);

  const vintageVideos = [
    {
      title: 'Crazy Frog - Axel F (Official Video)',
      duration: 180,
      views: '1,234,567',
      description: 'The most annoying song ever created! Upload par CrazyFrogOfficial',
      thumbnail: '🐸'
    },
    {
      title: 'Evolution of Dance - By Judson Laipply',
      duration: 360,
      views: '89,456,123',
      description: 'The original viral dance video that started it all!',
      thumbnail: '🕺'
    },
    {
      title: 'Charlie bit my finger - again !',
      duration: 56,
      views: '45,678,901',
      description: 'Classic viral video of two brothers. "Ouch Charlie!"',
      thumbnail: '👶'
    },
    {
      title: 'David After Dentist - "Is this real life?"',
      duration: 117,
      views: '12,345,678',
      description: 'Hilarious kid after dental surgery. "Is this real life?"',
      thumbnail: '🦷'
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState(vintageVideos[0]);

  const startVideo = () => {
    if (isLoading || isPlaying) return;
    
    setHasClickedPlay(true);
    setIsLoading(true);
    
    // 30% de chance de Rickroll !
    const isRickroll = Math.random() < 0.3;
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (isRickroll) {
        setShowRickroll(true);
        setVideoTitle('Rick Astley - Never Gonna Give You Up');
        setSelectedVideo({
          title: 'Rick Astley - Never Gonna Give You Up',
          duration: 213,
          views: '1,000,000,000',
          description: 'You just got rickrolled! Classic 2005 style!',
          thumbnail: '🎵'
        });
      }
      
      setIsPlaying(true);
      setCurrentTime(0);
      
      // Son de démarrage YouTube
      if (window.audioManager) {
        window.audioManager.playSound(soundId || 'youtube-intro');
      }
      
      // Démarrer le timer de la vidéo
      startVideoTimer();
      
    }, 2000 + Math.random() * 1500); // Simulation chargement
  };

  const startVideoTimer = () => {
    videoTimerRef.current = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 1;
        if (newTime >= selectedVideo.duration) {
          pauseVideo();
          return selectedVideo.duration;
        }
        return newTime;
      });
    }, 1000);
  };

  const pauseVideo = () => {
    setIsPlaying(false);
    if (videoTimerRef.current) {
      clearInterval(videoTimerRef.current);
    }
  };

  const resumeVideo = () => {
    if (currentTime < selectedVideo.duration) {
      setIsPlaying(true);
      startVideoTimer();
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseVideo();
    } else if (hasClickedPlay) {
      resumeVideo();
    } else {
      startVideo();
    }
  };

  const resetPlayer = () => {
    pauseVideo();
    setCurrentTime(0);
    setIsLoading(false);
    setIsPlaying(false);
    setShowRickroll(false);
    setHasClickedPlay(false);
    setVideoTitle('');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const selectVideo = (video) => {
    setSelectedVideo(video);
    resetPlayer();
  };

  useEffect(() => {
    return () => {
      if (videoTimerRef.current) {
        clearInterval(videoTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="mini-game youtube-vintage-game">
      <h3>📺 YouTube 2005 - Le commencement</h3>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
        Revivez les premiers jours de YouTube avec ses vidéos pixelisées et... ses Rickrolls !
      </p>
      
      <div style={{
        background: '#fff',
        border: '2px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Header YouTube vintage */}
        <div style={{
          background: 'linear-gradient(135deg, #cc0000, #990000)',
          color: 'white',
          padding: '0.5rem 1rem',
          display: 'flex',
          alignItems: 'center',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>
          <span style={{ marginRight: '0.5rem' }}>📺</span>
          YouTube
          <span style={{ 
            marginLeft: 'auto', 
            fontSize: '0.7rem', 
            background: 'rgba(255,255,255,0.2)',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px'
          }}>
            BETA
          </span>
        </div>

        <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
          {/* Lecteur vidéo */}
          <div style={{ flex: 2 }}>
            <div 
              ref={playerRef}
              style={{
                width: '100%',
                height: '300px',
                background: '#000',
                border: '2px inset #c0c0c0',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={togglePlayPause}
            >
              {/* Écran de chargement */}
              {isLoading && (
                <div style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: '1rem'
                }}>
                  <div style={{ 
                    fontSize: '2rem', 
                    marginBottom: '1rem',
                    animation: 'spin 2s linear infinite'
                  }}>
                    ⏳
                  </div>
                  <div>Chargement...</div>
                  <div style={{ fontSize: '0.8rem', color: '#ccc', marginTop: '0.5rem' }}>
                    (Optimisé pour Internet Explorer 6)
                  </div>
                </div>
              )}

              {/* Thumbnail / Écran de lecture */}
              {!isLoading && !isPlaying && !hasClickedPlay && (
                <div style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: '1.2rem'
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                    {selectedVideo.thumbnail}
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    {selectedVideo.title}
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#000',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    fontSize: '2rem',
                    cursor: 'pointer'
                  }}>
                    ▶️
                  </div>
                </div>
              )}

              {/* Vidéo en cours */}
              {!isLoading && hasClickedPlay && (
                <div style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: showRickroll 
                    ? 'linear-gradient(45deg, #ff0066, #6600ff, #0066ff, #00ff66)'
                    : '#333'
                }}>
                  {showRickroll ? (
                    <div style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '1.5rem',
                      animation: 'rainbow-text 2s infinite'
                    }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎵</div>
                      <div style={{ marginBottom: '0.5rem' }}>🎉 RICKROLL'D ! 🎉</div>
                      <div style={{ fontSize: '1rem' }}>
                        Never gonna give you up<br />
                        Never gonna let you down<br />
                        Never gonna run around<br />
                        and desert you!
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '1.2rem'
                    }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        {selectedVideo.thumbnail}
                      </div>
                      <div>
                        {isPlaying ? '⏸️' : '▶️'} {selectedVideo.title}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#ccc', marginTop: '0.5rem' }}>
                        Qualité: 240p (HD bientôt disponible!)
                      </div>
                    </div>
                  )}

                  {/* Overlay de contrôles */}
                  {!isPlaying && hasClickedPlay && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'rgba(0, 0, 0, 0.7)',
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      cursor: 'pointer'
                    }}>
                      ▶️
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Barre de progression */}
            <div style={{
              width: '100%',
              height: '6px',
              background: '#ddd',
              marginTop: '0.5rem',
              position: 'relative'
            }}>
              <div 
                ref={progressRef}
                style={{
                  height: '100%',
                  background: '#cc0000',
                  width: `${(currentTime / selectedVideo.duration) * 100}%`,
                  transition: 'width 0.3s ease'
                }}
              />
            </div>

            {/* Contrôles */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '0.5rem',
              fontSize: '0.9rem',
              color: '#666'
            }}>
              <div>
                {formatTime(currentTime)} / {formatTime(selectedVideo.duration)}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={togglePlayPause}
                  style={{
                    background: '#f0f0f0',
                    border: '1px solid #ccc',
                    padding: '0.3rem 0.6rem',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                </button>
                <button 
                  onClick={resetPlayer}
                  style={{
                    background: '#f0f0f0',
                    border: '1px solid #ccc',
                    padding: '0.3rem 0.6rem',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  🔄 Reset
                </button>
              </div>
            </div>

            {/* Informations de la vidéo */}
            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#000', fontSize: '1rem' }}>
                {showRickroll ? 'Rick Astley - Never Gonna Give You Up' : selectedVideo.title}
              </h4>
              <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
                {selectedVideo.views} vues • Ajoutée le 23 avril 2005
              </div>
              <div style={{ fontSize: '0.9rem', color: '#333', lineHeight: '1.4' }}>
                {showRickroll 
                  ? '🎉 Félicitations ! Vous venez d\'être rickrollé en 2005 ! Cette pratique était très populaire sur les premiers forums et YouTube. C\'était l\'époque où tout le monde tombait dans le piège !'
                  : selectedVideo.description
                }
              </div>
            </div>
          </div>

          {/* Sidebar avec vidéos suggérées */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#000', fontSize: '0.9rem' }}>
              Vidéos suggérées
            </h4>
            
            {vintageVideos.map((video, index) => (
              <div 
                key={index}
                onClick={() => selectVideo(video)}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  background: selectedVideo.title === video.title ? '#f0f0f0' : 'transparent',
                  border: '1px solid transparent'
                }}
                onMouseEnter={(e) => e.target.style.background = '#f8f8f8'}
                onMouseLeave={(e) => e.target.style.background = selectedVideo.title === video.title ? '#f0f0f0' : 'transparent'}
              >
                <div style={{ 
                  width: '60px', 
                  height: '45px', 
                  background: '#ddd',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  {video.thumbnail}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    fontWeight: 'bold',
                    color: '#000',
                    lineHeight: '1.2',
                    marginBottom: '0.2rem'
                  }}>
                    {video.title.length > 40 ? video.title.substring(0, 40) + '...' : video.title}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>
                    {formatTime(video.duration)} • {video.views} vues
                  </div>
                </div>
              </div>
            ))}
            
            {/* Easter egg Rickroll hint */}
            <div style={{
              background: '#fffacd',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '0.5rem',
              fontSize: '0.7rem',
              color: '#666',
              marginTop: '1rem'
            }}>
              💡 Astuce : En 2005, certaines vidéos cachaient des surprises...
              Les Rickrolls étaient partout ! 😉
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.8rem', 
        color: '#888',
        fontStyle: 'italic' 
      }}>
        💡 Nostalgie : YouTube a été créé par trois anciens employés de PayPal dans un garage. 
        La première vidéo "Me at the zoo" a été mise en ligne le 23 avril 2005 !
      </div>
    </div>
  );
};

export default YouTubeVintageGame;
