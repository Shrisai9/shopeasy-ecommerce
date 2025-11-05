'use client'

import { useAuth } from '../context/AuthContext'
import Link from 'next/link'

export default function Orders() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <main className="main-content">
        <div className="container">
          <div className="auth-required">
            <h1>Please Login</h1>
            <p>You need to be logged in to view your orders.</p>
            <Link href="/login" className="login-btn">Login</Link>
          </div>
        </div>
      </main>
    )
  }

  if (!user?.orders || user.orders.length === 0) {
    return (
      <main className="main-content">
        <div className="container">
          <h1>My Orders</h1>
          <div className="empty-orders">
            <p>You haven't placed any orders yet.</p>
            <Link href="/products" className="continue-shopping">
              Start Shopping
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="main-content">
      <div className="container">
        <h1>My Orders</h1>
        
        <div className="orders-list">
          {user.orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="order-status">
                  <span className={`status ${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="order-total">
                <strong>Total: ${order.total.toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}