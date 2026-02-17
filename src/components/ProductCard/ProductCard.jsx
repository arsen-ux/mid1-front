import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/products/${product.id}`)
  }

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-card__image-wrapper">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="product-card__image"
        />
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__category">{product.category}</p>
        <div className="product-card__footer">
          <span className="product-card__price">${product.price}</span>
          <div className="product-card__rating">
            <span className="product-card__star">⭐</span>
            <span className="product-card__rating-value">{product.rating}</span>
          </div>
        </div>
        <p className="product-card__brand">{product.brand}</p>
      </div>
    </div>
  )
}

export default ProductCard;

