'use client'

import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'

export default function Header() {
  const { itemCount } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const { items: wishlistItems } = useWishlist()

  return (
    <header className="header">
      <div className="container">
        <Link href="/" className="logo">
          <h1>ShopEasy</h1>
        </Link>
        
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="header-actions">
          <Link href="/wishlist" className="wishlist-link">
            ❤️ ({wishlistItems.length})
          </Link>
          
          <Link href="/cart" className="cart-link">
            🛒 Cart ({itemCount})
          </Link>
          
          {isAuthenticated ? (
            <div className="user-menu">
              <span>Hi, {user?.name}</span>
              <Link href="/profile">Profile</Link>
              <Link href="/orders">Orders</Link>
              <Link href="/admin">Admin</Link>
              <button onClick={logout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}