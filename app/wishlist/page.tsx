'use client'

import Link from 'next/link'
import ProductCard from '../components/ProductCard'
import { useWishlist } from '../context/WishlistContext'

export default function Wishlist() {
  const { items, clearWishlist } = useWishlist()

  if (items.length === 0) {
    return (
      <main className="main-content">
        <div className="container">
          <h1>My Wishlist</h1>
          <div className="empty-wishlist">
            <p>Your wishlist is empty</p>
            <Link href="/products" className="continue-shopping">
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="main-content">
      <div className="container">
        <div className="wishlist-header">
          <h1>My Wishlist ({items.length} items)</h1>
          <button onClick={clearWishlist} className="clear-wishlist-btn">
            Clear Wishlist
          </button>
        </div>
        
        <div className="products-grid">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}