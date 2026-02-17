import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

const ProductList = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="product-list__empty">
        <p className="product-list__empty-text">Броо твой товар не найден😭😔</p>
      </div>
    )
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList;

