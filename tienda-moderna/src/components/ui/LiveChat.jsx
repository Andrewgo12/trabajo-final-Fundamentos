import React, { useState, useEffect, useRef } from 'react';
import { useNotification } from '../../context/NotificationContext';

const LiveChat = () => {
  const { showSuccess, showInfo } = useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef(null);

  const botResponses = [
    "¡Hola! Soy el asistente virtual de CleanPro. ¿En qué puedo ayudarte hoy?",
    "Tenemos productos de limpieza de alta calidad. ¿Buscas algo específico?",
    "Nuestros productos más populares son detergentes y desinfectantes. ¿Te interesa alguno?",
    "¿Necesitas ayuda con tu pedido o tienes alguna pregunta sobre nuestros productos?",
    "Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?",
    "¡Excelente elección! Nuestros productos son de la más alta calidad.",
    "Si necesitas más información, no dudes en preguntarme.",
    "¿Te gustaría conocer nuestras ofertas especiales del día?",
    "Puedo ayudarte a encontrar el producto perfecto para tus necesidades.",
    "¡Gracias por contactarnos! ¿En qué más puedo ayudarte?"
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Mensaje de bienvenida
      setTimeout(() => {
        addBotMessage("¡Hola! 👋 Bienvenido a CleanPro. Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?");
      }, 1000);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (text) => {
    const message = {
      id: Date.now(),
      text,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (text) => {
    const message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    addUserMessage(newMessage);
    setNewMessage('');
    
    // Simular respuesta del bot
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      addBotMessage(randomResponse);
    }, 1500 + Math.random() * 1000);
  };

  const quickActions = [
    { text: "Ver productos", emoji: "🛍️" },
    { text: "Estado de mi pedido", emoji: "📦" },
    { text: "Información de envío", emoji: "🚚" },
    { text: "Hablar con un agente", emoji: "👨‍💼" }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: isOnline 
            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
            : 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
          color: 'white',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
          zIndex: 1000,
          transition: 'var(--transition)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className="hover-lift"
        title="Chat en vivo"
      >
        {isOpen ? '✕' : '💬'}
        {isOnline && (
          <div style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#22c55e',
            border: '2px solid white'
          }} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '5rem',
          left: '2rem',
          width: '350px',
          height: '500px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid var(--border-color)'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
            color: 'white',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem'
            }}>
              🤖
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>
                Asistente CleanPro
              </h4>
              <p style={{ 
                margin: 0, 
                fontSize: '0.75rem', 
                opacity: 0.9,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isOnline ? '#22c55e' : '#6b7280'
                }} />
                {isOnline ? 'En línea' : 'Desconectado'}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.map(message => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '0.75rem 1rem',
                  borderRadius: message.sender === 'user' 
                    ? '18px 18px 4px 18px'
                    : '18px 18px 18px 4px',
                  background: message.sender === 'user'
                    ? 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)'
                    : 'var(--light-gray)',
                  color: message.sender === 'user' ? 'white' : 'var(--text-primary)',
                  fontSize: '0.875rem',
                  lineHeight: 1.4,
                  position: 'relative'
                }}>
                  {message.text}
                  <div style={{
                    fontSize: '0.75rem',
                    opacity: 0.7,
                    marginTop: '0.25rem',
                    textAlign: 'right'
                  }}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  background: 'var(--light-gray)',
                  padding: '0.75rem 1rem',
                  borderRadius: '18px 18px 18px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--primary-color)',
                    animation: 'typing 1.4s infinite ease-in-out'
                  }} />
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--primary-color)',
                    animation: 'typing 1.4s infinite ease-in-out 0.2s'
                  }} />
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--primary-color)',
                    animation: 'typing 1.4s infinite ease-in-out 0.4s'
                  }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div style={{
              padding: '0 1rem',
              borderTop: '1px solid var(--border-color)'
            }}>
              <p style={{ 
                fontSize: '0.75rem', 
                color: 'var(--text-secondary)', 
                margin: '0.75rem 0 0.5rem 0',
                textAlign: 'center'
              }}>
                Acciones rápidas:
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      addUserMessage(action.text);
                      setTimeout(() => {
                        setIsTyping(true);
                        setTimeout(() => {
                          setIsTyping(false);
                          addBotMessage("Perfecto, te ayudo con eso. ¿Podrías darme más detalles?");
                        }, 1000);
                      }, 500);
                    }}
                    style={{
                      background: 'var(--light-gray)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '0.5rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#e2e8f0'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--light-gray)'}
                  >
                    <span>{action.emoji}</span>
                    <span>{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '1rem',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--light-gray)'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu mensaje..."
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                style={{
                  background: newMessage.trim() 
                    ? 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)'
                    : 'var(--medium-gray)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                📤
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default LiveChat;
