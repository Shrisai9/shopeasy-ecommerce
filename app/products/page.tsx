'use client'

import { useState, useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import SearchFilter from '../components/SearchFilter'

const allProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
    description: "Premium quality wireless headphones with noise cancellation",
    category: "audio"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
    description: "Advanced smartwatch with health tracking features",
    category: "electronics"
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop",
    description: "Ergonomic laptop stand for better posture",
    category: "accessories"
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop",
    description: "Portable Bluetooth speaker with rich sound quality",
    category: "audio"
  },
  {
    id: 5,
    name: "Phone Case",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=200&fit=crop",
    description: "Durable phone case with premium protection",
    category: "accessories"
  },
  {
    id: 6,
    name: "USB Cable",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    description: "High-speed USB-C cable for fast charging",
    category: "accessories"
  }
]

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [priceFilter, setPriceFilter] = useState('')

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      // Category filter
      const matchesCategory = !categoryFilter || product.category === categoryFilter
      
      // Price filter
      let matchesPrice = true
      if (priceFilter) {
        const price = product.price
        switch (priceFilter) {
          case '0-50':
            matchesPrice = price <= 50
            break
          case '50-100':
            matchesPrice = price > 50 && price <= 100
            break
          case '100-200':
            matchesPrice = price > 100 && price <= 200
            break
          case '200+':
            matchesPrice = price > 200
            break
        }
      }
      
      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [searchQuery, categoryFilter, priceFilter])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilter = (category: string, priceRange: string) => {
    setCategoryFilter(category)
    setPriceFilter(priceRange)
  }

  return (
    <main className="main-content">
      <div className="container">
        <h1>All Products ({filteredProducts.length})</h1>
        
        <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
        
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}