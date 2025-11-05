'use client'

import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import Link from 'next/link'

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth()
  const { items: cartItems, total } = useCart()
  const { items: wishlistItems } = useWishlist()

  if (!isAuthenticated || !user) {
    return (
      <main className="main-content">
        <div className="container">
          <div className="auth-required">
            <h1>Please Login</h1>
            <p>You need to be logged in to view your profile.</p>
            <Link href="/login" className="login-btn">Login</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="main-content">
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>

        <div className="profile-grid">
          {/* User Information */}
          <div className="profile-card">
            <h2>Personal Information</h2>
            <div className="info-item">
              <label>User ID:</label>
              <span>{user.id}</span>
            </div>
            <div className="info-item">
              <label>Name:</label>
              <span>{user.name}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <label>Member Since:</label>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Shopping Statistics */}
          <div className="profile-card">
            <h2>Shopping Statistics</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{user.orders?.length || 0}</div>
                <div className="stat-label">Total Orders</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{cartItems.length}</div>
                <div className="stat-label">Items in Cart</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{wishlistItems.length}</div>
                <div className="stat-label">Wishlist Items</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">${total.toFixed(2)}</div>
                <div className="stat-label">Cart Value</div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="profile-card">
            <h2>Recent Orders</h2>
            {user.orders && user.orders.length > 0 ? (
              <div className="recent-orders">
                {user.orders.slice(0, 3).map(order => (
                  <div key={order.id} className="order-summary">
                    <div className="order-header">
                      <span>Order #{order.id}</span>
                      <span className={`status ${order.status}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-details">
                      <span>{order.items.length} items</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                    <div className="order-date">
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                <Link href="/orders" className="view-all-orders">
                  View All Orders →
                </Link>
              </div>
            ) : (
              <p className="no-orders">No orders yet</p>
            )}
          </div>

          {/* Current Cart */}
          <div className="profile-card">
            <h2>Current Cart</h2>
            {cartItems.length > 0 ? (
              <div className="cart-preview">
                {cartItems.slice(0, 3).map(item => (
                  <div key={item.id} className="cart-item-preview">
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <p className="more-items">+{cartItems.length - 3} more items</p>
                )}
                <Link href="/cart" className="view-cart">
                  View Full Cart →
                </Link>
              </div>
            ) : (
              <p className="empty-cart">Cart is empty</p>
            )}
          </div>

          {/* Wishlist Preview */}
          <div className="profile-card">
            <h2>Wishlist</h2>
            {wishlistItems.length > 0 ? (
              <div className="wishlist-preview">
                {wishlistItems.slice(0, 3).map(item => (
                  <div key={item.id} className="wishlist-item-preview">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
                {wishlistItems.length > 3 && (
                  <p className="more-items">+{wishlistItems.length - 3} more items</p>
                )}
                <Link href="/wishlist" className="view-wishlist">
                  View Full Wishlist →
                </Link>
              </div>
            ) : (
              <p className="empty-wishlist">Wishlist is empty</p>
            )}
          </div>

          {/* Raw Data Viewer */}
          <div className="profile-card">
            <h2>Raw User Data (Developer View)</h2>
            <details className="data-viewer">
              <summary>Click to view raw JSON data</summary>
              <pre className="json-data">
                {JSON.stringify({
                  user: user,
                  cartItems: cartItems,
                  wishlistItems: wishlistItems,
                  localStorage: {
                    user: localStorage.getItem('user'),
                    wishlist: localStorage.getItem('wishlist')
                  }
                }, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      </div>
    </main>
  )
}