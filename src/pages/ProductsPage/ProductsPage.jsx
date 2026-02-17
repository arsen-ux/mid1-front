import React, { useState, useEffect } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const url = searchQuery 
          ? `https://dummyjson.com/products/search?q=${searchQuery}`
          : 'https://dummyjson.com/products'
        
        const response = await fetch(url)
        const data = await response.json()
        setProducts(data.products)
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error)
      } finally {
        setLoading(false)
      }
    };

    const timeoutId = setTimeout(() => {
      fetchProducts()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  };

  return (
    <div className="products-page">
      <div className="products-page__container">
        <h1 className="products-page__title">Товары</h1>
        
        <div className="products-page__search">
          <input
            type="text"
            className="products-page__search-input"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {loading ? (
          <div className="products-page__loading">
            <div className="products-page__spinner"></div>
            <p>Загрузка, ждемс</p>
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </div>
  )
}

export default ProductsPage;

