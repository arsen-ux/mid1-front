import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        if (!response.ok) {
          throw new Error('Товар не найден')
        }
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="product-details">
        <div className="product-details__loading">
          <div className="product-details__spinner"></div>
          <p>Загрузка ждемс</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details">
        <div className="product-details__error">
          <p className="product-details__error-text">❌ {error}</p>
          <button 
            className="product-details__back-btn"
            onClick={() => navigate('/')}
          >
            ← Назад к каталогу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details">
      <div className="product-details__container">
        <button 
          className="product-details__back-btn"
          onClick={() => navigate('/')}
        >
          ← Назад к каталогу
        </button>

        <div className="product-details__content">
          <div className="product-details__image-section">
            <img 
              src={product.thumbnail} 
              alt={product.title}
              className="product-details__image"
            />
          </div>

          <div className="product-details__info">
            <h1 className="product-details__title">{product.title}</h1>
            <p className="product-details__description">{product.description}</p>

            <div className="product-details__price-section">
              <span className="product-details__price">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="product-details__discount">
                  -{product.discountPercentage}%
                </span>
              )}
            </div>

            <div className="product-details__grid">
              <div className="product-details__field">
                <span className="product-details__label">Рейтинг:</span>
                <span className="product-details__value">
                  ⭐ {product.rating}
                </span>
              </div>

              <div className="product-details__field">
                <span className="product-details__label">Бренд:</span>
                <span className="product-details__value">{product.brand}</span>
              </div>

              <div className="product-details__field">
                <span className="product-details__label">Категория:</span>
                <span className="product-details__value">{product.category}</span>
              </div>

              <div className="product-details__field">
                <span className="product-details__label">В наличии:</span>
                <span className="product-details__value">{product.stock} шт.</span>
              </div>

              <div className="product-details__field">
                <span className="product-details__label">Вес:</span>
                <span className="product-details__value">{product.weight} г</span>
              </div>

              <div className="product-details__field">
                <span className="product-details__label">Доступность:</span>
                <span className="product-details__value product-details__value--status">
                  {product.availabilityStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage;

