import React, { useState, useEffect } from 'react';
import { useNotification } from '../../context/NotificationContext';

const ReviewSystem = ({ productId, productName }) => {
  const { showSuccess, showError } = useNotification();
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = () => {
    try {
      const savedReviews = localStorage.getItem(`cleanpro_reviews_${productId}`);
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      } else {
        // Generar reviews de ejemplo
        const exampleReviews = generateExampleReviews();
        setReviews(exampleReviews);
        localStorage.setItem(`cleanpro_reviews_${productId}`, JSON.stringify(exampleReviews));
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const generateExampleReviews = () => {
    const names = ['María García', 'Carlos López', 'Ana Martínez', 'Luis Rodríguez', 'Carmen Silva'];
    const titles = [
      'Excelente producto',
      'Muy recomendado',
      'Buena calidad',
      'Cumple expectativas',
      'Producto increíble'
    ];
    const comments = [
      'Muy buen producto, cumple con lo prometido. Lo recomiendo totalmente.',
      'Excelente calidad y precio. Llegó rápido y bien empacado.',
      'Producto de muy buena calidad, lo volvería a comprar sin dudarlo.',
      'Cumple perfectamente con las expectativas. Muy satisfecho con la compra.',
      'Increíble producto, superó mis expectativas. Servicio al cliente excelente.'
    ];

    return Array.from({ length: Math.floor(Math.random() * 5) + 3 }, (_, i) => ({
      id: Date.now() + i,
      rating: Math.floor(Math.random() * 2) + 4, // 4 o 5 estrellas
      title: titles[Math.floor(Math.random() * titles.length)],
      comment: comments[Math.floor(Math.random() * comments.length)],
      name: names[Math.floor(Math.random() * names.length)],
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-CO'),
      verified: Math.random() > 0.3
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!newReview.title.trim() || !newReview.comment.trim() || !newReview.name.trim()) {
      showError('Por favor completa todos los campos obligatorios');
      return;
    }

    setLoading(true);

    try {
      const review = {
        id: Date.now(),
        ...newReview,
        date: new Date().toLocaleDateString('es-CO'),
        verified: false
      };

      const updatedReviews = [review, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem(`cleanpro_reviews_${productId}`, JSON.stringify(updatedReviews));

      setNewReview({
        rating: 5,
        title: '',
        comment: '',
        name: '',
        email: ''
      });
      setShowReviewForm(false);
      showSuccess('¡Reseña enviada exitosamente!', 3000);
    } catch (error) {
      showError('Error al enviar la reseña');
    } finally {
      setLoading(false);
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const renderStars = (rating, size = '1rem') => {
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            style={{
              fontSize: size,
              color: star <= rating ? '#fbbf24' : '#e5e7eb'
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const distribution = getRatingDistribution();
  const averageRating = getAverageRating();

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Rating Summary */}
      <div style={{
        background: 'var(--white)',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          marginBottom: '1.5rem',
          color: 'var(--primary-color)'
        }}>
          ⭐ Reseñas y Calificaciones
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--primary-color)' }}>
              {averageRating}
            </div>
            {renderStars(Math.round(averageRating), '1.5rem')}
            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>
              {reviews.length} reseña{reviews.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div>
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                marginBottom: '0.5rem' 
              }}>
                <span style={{ minWidth: '20px' }}>{rating}</span>
                <span style={{ color: '#fbbf24' }}>★</span>
                <div style={{
                  flex: 1,
                  height: '8px',
                  backgroundColor: 'var(--light-gray)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${reviews.length > 0 ? (distribution[rating] / reviews.length) * 100 : 0}%`,
                    height: '100%',
                    backgroundColor: '#fbbf24',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <span style={{ minWidth: '30px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {distribution[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          style={{
            marginTop: '1.5rem',
            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '1rem 2rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'var(--transition)',
            boxShadow: '0 4px 15px rgba(0, 102, 255, 0.3)'
          }}
          className="hover-lift"
        >
          ✍️ Escribir Reseña
        </button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div style={{
          background: 'var(--white)',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2rem'
        }}>
          <h4 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
            📝 Escribir Reseña para {productName}
          </h4>

          <form onSubmit={handleSubmitReview}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {/* Rating */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Calificación *
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '2rem',
                        color: star <= newReview.rating ? '#fbbf24' : '#e5e7eb',
                        cursor: 'pointer',
                        transition: 'color 0.2s'
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Título de la reseña *
                </label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej: Excelente producto"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  required
                />
              </div>

              {/* Comment */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Comentario *
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Comparte tu experiencia con este producto..."
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                  required
                />
              </div>

              {/* Name and Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Tu nombre"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Email (opcional)
                  </label>
                  <input
                    type="email"
                    value={newReview.email}
                    onChange={(e) => setNewReview(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="tu@email.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  style={{
                    flex: 1,
                    background: 'var(--light-gray)',
                    color: 'var(--text-primary)',
                    border: '2px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 2,
                    background: loading 
                      ? 'var(--medium-gray)' 
                      : 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: loading ? 'none' : '0 4px 15px rgba(0, 102, 255, 0.3)'
                  }}
                >
                  {loading ? '⏳ Enviando...' : '📤 Enviar Reseña'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div>
        <h4 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
          💬 Todas las Reseñas ({reviews.length})
        </h4>

        {reviews.length === 0 ? (
          <div style={{
            background: 'var(--white)',
            padding: '3rem',
            borderRadius: '16px',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💭</div>
            <p>Aún no hay reseñas para este producto</p>
            <p style={{ fontSize: '0.875rem' }}>¡Sé el primero en escribir una reseña!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {reviews.map(review => (
              <div
                key={review.id}
                style={{
                  background: 'var(--white)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      {renderStars(review.rating)}
                      {review.verified && (
                        <span style={{
                          background: 'var(--success-color)',
                          color: 'white',
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontWeight: '600'
                        }}>
                          ✓ Compra verificada
                        </span>
                      )}
                    </div>
                    <h5 style={{ margin: 0, fontWeight: '600', fontSize: '1rem' }}>
                      {review.title}
                    </h5>
                  </div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {review.date}
                  </span>
                </div>

                <p style={{ margin: '0 0 1rem 0', lineHeight: 1.6 }}>
                  {review.comment}
                </p>

                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Por <strong>{review.name}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSystem;
