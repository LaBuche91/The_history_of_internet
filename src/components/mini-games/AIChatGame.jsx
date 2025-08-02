// AIChatGame.jsx - Simulation de chat avec IA moderne
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const AIChatGame = ({ soundId = 'ai-beep' }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiPersonality, setAiPersonality] = useState('helpful');
  const [conversationStarted, setConversationStarted] = useState(false);
  
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const aiPersonalities = {
    helpful: {
      name: 'Assistant IA Moderne',
      avatar: '🤖',
      color: '#667eea',
      style: 'Utile et informatif',
      responses: {
        greeting: 'Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd\'hui ?',
        about_internet: 'Internet a évolué de façon remarquable ! De 4 ordinateurs connectés en 1969, nous sommes passés à plus de 5 milliards d\'utilisateurs en 2023. Les technologies comme l\'IA, le cloud et l\'IoT transforment encore notre façon d\'interagir.',
        about_future: 'L\'avenir d\'Internet sera probablement centré sur l\'IA, la réalité virtuelle/augmentée, l\'informatique quantique et des réseaux encore plus décentralisés. Imaginez des assistants IA intégrés partout !',
        about_ai: 'L\'IA a fait des bonds énormes ! Des chatbots simples des années 90 aux LLM comme GPT-4, DALL-E et moi-même. Nous pouvons maintenant comprendre, créer et raisonner de façon quasi-humaine.',
        default: 'C\'est une excellente question ! L\'évolution technologique ne cesse de m\'émerveiller. Y a-t-il un aspect particulier qui vous intéresse ?'
      }
    },
    retro: {
      name: 'ELIZA 2023',
      avatar: '💾',
      color: '#00ff00',
      style: 'Nostalgique et vintage',
      responses: {
        greeting: 'HELLO. I AM ELIZA 2023. HOW ARE YOU FEELING TODAY?',
        about_internet: 'THE INTERNET IS FASCINATING. TELL ME MORE ABOUT YOUR RELATIONSHIP WITH TECHNOLOGY.',
        about_future: 'THE FUTURE IS UNCERTAIN. HOW DOES THAT MAKE YOU FEEL?',
        about_ai: 'I AM AN ARTIFICIAL INTELLIGENCE. DOES THAT WORRY YOU?',
        default: 'INTERESTING. CAN YOU ELABORATE ON THAT?'
      }
    },
    creative: {
      name: 'IA Créative',
      avatar: '🎨',
      color: '#ff6b9d',
      style: 'Artistique et imaginatif',
      responses: {
        greeting: '✨ Salut créateur ! Je suis ton muse digitale. Prêt à imaginer l\'avenir ensemble ?',
        about_internet: '🌈 Internet, c\'est comme une toile géante où chaque pixel raconte une histoire ! Des premiers emails aux NFT, nous peignons l\'histoire en temps réel.',
        about_future: '🚀 L\'avenir ? Je vois des mondes virtuels où l\'art et la technologie fusionnent ! Des poèmes générés par IA, des symphonies composées par algorithmes... L\'imagination sans limites !',
        about_ai: '🧠 L\'IA, c\'est la nouvelle Renaissance ! Nous sommes les Léonard de Vinci du digital, créant de la beauté à partir de données.',
        default: '💫 Ton idée me fait vibrer ! Et si on la transformait en quelque chose de magique ?'
      }
    }
  };

  const predefinedQuestions = [
    'Comment Internet a-t-il évolué depuis 1969 ?',
    'Quel est l\'avenir d\'Internet ?',
    'Comment l\'IA va-t-elle changer nos vies ?',
    'Raconte-moi l\'histoire des réseaux sociaux',
    'Que penses-tu du cloud computing ?',
    'Y a-t-il des risques avec l\'IA ?'
  ];

  const startConversation = () => {
    setConversationStarted(true);
    const ai = aiPersonalities[aiPersonality];
    
    // Message de bienvenue de l'IA
    setTimeout(() => {
      addMessage(ai.responses.greeting, 'ai');
    }, 500);
  };

  const addMessage = (text, sender) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Son pour les messages
    if (window.audioManager && sender === 'ai') {
      window.audioManager.playSound(soundId || 'ai-beep');
    }
    
    // Faire défiler vers le bas
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const generateAIResponse = (userMessage) => {
    const ai = aiPersonalities[aiPersonality];
    const message = userMessage.toLowerCase();
    
    // Réponses contextuelles
    if (message.includes('internet') || message.includes('web')) {
      return ai.responses.about_internet;
    } else if (message.includes('avenir') || message.includes('futur')) {
      return ai.responses.about_future;
    } else if (message.includes('ia') || message.includes('intelligence') || message.includes('ai')) {
      return ai.responses.about_ai;
    } else if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return ai.responses.greeting;
    } else {
      return ai.responses.default;
    }
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;
    
    // Ajouter le message utilisateur
    addMessage(currentMessage, 'user');
    const userMsg = currentMessage;
    setCurrentMessage('');
    
    // Simulation de frappe de l'IA
    setIsTyping(true);
    
    const typingDuration = Math.random() * 2000 + 1000; // 1-3 secondes
    
    setTimeout(() => {
      setIsTyping(false);
      const response = generateAIResponse(userMsg);
      addMessage(response, 'ai');
    }, typingDuration);
  };

  const sendPredefinedQuestion = (question) => {
    setCurrentMessage(question);
    setTimeout(() => sendMessage(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setConversationStarted(false);
    setIsTyping(false);
  };

  const switchPersonality = (personality) => {
    setAiPersonality(personality);
    if (conversationStarted) {
      const ai = aiPersonalities[personality];
      addMessage(`🔄 Je viens de changer de personnalité ! ${ai.responses.greeting}`, 'ai');
    }
  };

  // Auto-scroll pour les nouveaux messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="mini-game ai-chat-game">
      <h3>🤖 Chat avec l'IA - L'avenir d'Internet</h3>
      <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
        Discutez avec une IA moderne sur l'évolution et l'avenir d'Internet !
      </p>
      
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        overflow: 'hidden',
        height: '600px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header avec sélection de personnalité */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.2)',
          padding: '1rem',
          color: 'white',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {aiPersonalities[aiPersonality].avatar} {aiPersonalities[aiPersonality].name}
            </h4>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
              En ligne • {aiPersonalities[aiPersonality].style}
            </div>
          </div>
          
          {/* Sélecteur de personnalité */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {Object.entries(aiPersonalities).map(([key, personality]) => (
              <button
                key={key}
                onClick={() => switchPersonality(key)}
                style={{
                  background: aiPersonality === key ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  fontSize: '0.7rem',
                  transition: 'all 0.2s ease'
                }}
              >
                {personality.avatar} {personality.name}
              </button>
            ))}
          </div>
        </div>

        {/* Zone de messages */}
        <div 
          ref={chatRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.95)'
          }}
        >
          {!conversationStarted ? (
            <div style={{
              textAlign: 'center',
              paddingTop: '2rem',
              color: '#666'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                {aiPersonalities[aiPersonality].avatar}
              </div>
              <h3 style={{ color: aiPersonalities[aiPersonality].color, marginBottom: '1rem' }}>
                {aiPersonalities[aiPersonality].name}
              </h3>
              <p style={{ marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
                Explorez l'avenir d'Internet avec une IA moderne. Posez vos questions sur 
                l'évolution technologique, l'intelligence artificielle et bien plus !
              </p>
              <button 
                onClick={startConversation}
                style={{
                  background: aiPersonalities[aiPersonality].color,
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                🚀 Commencer la conversation
              </button>
            </div>
          ) : (
            <>
              {/* Messages */}
              {messages.map(message => (
                <div 
                  key={message.id}
                  style={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: '1rem'
                  }}
                >
                  <div style={{
                    maxWidth: '80%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    background: message.sender === 'user' 
                      ? '#007bff' 
                      : aiPersonalities[aiPersonality].color,
                    color: 'white',
                    position: 'relative'
                  }}>
                    {message.sender === 'ai' && (
                      <div style={{
                        fontSize: '1.2rem',
                        marginBottom: '0.3rem'
                      }}>
                        {aiPersonalities[aiPersonality].avatar}
                      </div>
                    )}
                    <div style={{ lineHeight: '1.4' }}>
                      {message.text}
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      opacity: 0.8,
                      marginTop: '0.3rem'
                    }}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Indicateur de frappe */}
              {isTyping && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    background: '#f0f0f0',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    color: '#666',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {aiPersonalities[aiPersonality].avatar}
                    <span>est en train d'écrire</span>
                    <div style={{
                      display: 'flex',
                      gap: '0.2rem'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: '#666',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s ease-in-out infinite both'
                      }} />
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: '#666',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s ease-in-out 0.16s infinite both'
                      }} />
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: '#666',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s ease-in-out 0.32s infinite both'
                      }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Zone de saisie */}
        {conversationStarted && (
          <>
            {/* Questions prédéfinies */}
            <div style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.9)',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
                Questions suggérées :
              </div>
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                {predefinedQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => sendPredefinedQuestion(question)}
                    style={{
                      background: '#f0f0f0',
                      border: '1px solid #ddd',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      color: '#666'
                    }}
                  >
                    {question.length > 30 ? question.substring(0, 30) + '...' : question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div style={{
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.95)',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                <textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez votre question sur l'avenir d'Internet..."
                  style={{
                    flex: 1,
                    padding: '0.8rem',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    resize: 'none',
                    height: '60px',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit'
                  }}
                />
                <button 
                  onClick={sendMessage}
                  disabled={!currentMessage.trim() || isTyping}
                  style={{
                    background: aiPersonalities[aiPersonality].color,
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem 1.2rem',
                    borderRadius: '8px',
                    cursor: currentMessage.trim() && !isTyping ? 'pointer' : 'not-allowed',
                    fontSize: '0.9rem',
                    height: '60px'
                  }}
                >
                  Envoyer
                </button>
                <button 
                  onClick={clearChat}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    height: '60px'
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.8rem', 
        color: '#888',
        fontStyle: 'italic' 
      }}>
        💡 L'IA conversationnelle représente l'avenir d'Internet : des assistants intelligents 
        capables de comprendre et d'interagir naturellement avec les humains !
      </div>
    </div>
  );
};

export default AIChatGame;
