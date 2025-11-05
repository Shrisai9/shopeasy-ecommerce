'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'

interface SupabaseUser {
  id: string
  email: string
  full_name: string
  created_at: string
  orders_count: number
}

export default function Admin() {
  const { user, isAuthenticated } = useAuth()
  const [allUsers, setAllUsers] = useState<SupabaseUser[]>([])
  const [selectedUser, setSelectedUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 6
  })

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers()
      fetchStats()
    }
  }, [isAuthenticated])

  const fetchUsers = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          full_name,
          created_at
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching users:', error)
        return
      }

      // Get order counts for each user
      const usersWithOrderCounts = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { count } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', profile.id)

          return {
            ...profile,
            orders_count: count || 0
          }
        })
      )

      setAllUsers(usersWithOrderCounts)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      // Get total users count
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      // Get total orders count
      const { count: ordersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

      setStats({
        totalUsers: usersCount || 0,
        totalOrders: ordersCount || 0,
        totalProducts: 6
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchUserOrders = async (userId: string) => {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user orders:', error)
      return []
    }

    return orders || []
  }

  if (!isAuthenticated) {
    return (
      <main className="main-content">
        <div className="container">
          <div className="auth-required">
            <h1>Admin Access Required</h1>
            <p>Please login to access the admin dashboard.</p>
          </div>
        </div>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="main-content">
        <div className="container">
          <LoadingSpinner />
        </div>
      </main>
    )
  }

  return (
    <main className="main-content">
      <div className="container">
        <h1>Admin Dashboard (Supabase)</h1>
        <p className="admin-note">
          🔒 Real-time data from Supabase database
        </p>

        <div className="admin-grid">
          {/* Current Session Info */}
          <div className="admin-card">
            <h2>Current Session</h2>
            {user ? (
              <div className="session-info">
                <div className="info-row">
                  <label>Logged in as:</label>
                  <span>{user.name} ({user.email})</span>
                </div>
                <div className="info-row">
                  <label>User ID:</label>
                  <span>{user.id}</span>
                </div>
                <div className="info-row">
                  <label>Session started:</label>
                  <span>{new Date().toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <p>No user logged in</p>
            )}
          </div>

          {/* System Statistics */}
          <div className="admin-card">
            <h2>System Statistics</h2>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-number">{stats.totalUsers}</div>
                <div className="stat-label">Total Users</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{stats.totalOrders}</div>
                <div className="stat-label">Total Orders</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{stats.totalProducts}</div>
                <div className="stat-label">Products</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">1</div>
                <div className="stat-label">Active Sessions</div>
              </div>
            </div>
          </div>

          {/* All Users List */}
          <div className="admin-card">
            <h2>All Users ({allUsers.length})</h2>
            <div className="users-list">
              {allUsers.map(userData => (
                <div 
                  key={userData.id} 
                  className={`user-item ${selectedUser?.id === userData.id ? 'selected' : ''}`}
                  onClick={() => setSelectedUser(userData)}
                >
                  <div className="user-info">
                    <strong>{userData.full_name}</strong>
                    <span>{userData.email}</span>
                  </div>
                  <div className="user-stats">
                    <span>ID: {userData.id.slice(0, 8)}...</span>
                    <span>{userData.orders_count} orders</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected User Details */}
          {selectedUser && (
            <div className="admin-card">
              <h2>User Details: {selectedUser.full_name}</h2>
              <div className="user-details">
                <div className="detail-section">
                  <h3>Basic Information</h3>
                  <div className="info-row">
                    <label>ID:</label>
                    <span>{selectedUser.id}</span>
                  </div>
                  <div className="info-row">
                    <label>Name:</label>
                    <span>{selectedUser.full_name}</span>
                  </div>
                  <div className="info-row">
                    <label>Email:</label>
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className="info-row">
                    <label>Joined:</label>
                    <span>{new Date(selectedUser.created_at).toLocaleString()}</span>
                  </div>
                  <div className="info-row">
                    <label>Total Orders:</label>
                    <span>{selectedUser.orders_count}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Database Info */}
          <div className="admin-card">
            <h2>Database Information</h2>
            <div className="storage-data">
              <div className="storage-section">
                <h3>Supabase Tables</h3>
                <ul className="table-list">
                  <li>✅ profiles - User profiles</li>
                  <li>✅ orders - Order history</li>
                  <li>🔒 auth.users - Authentication (managed by Supabase)</li>
                </ul>
              </div>
              
              <div className="storage-section">
                <h3>Security Features</h3>
                <ul className="security-list">
                  <li>🔐 Row Level Security (RLS) enabled</li>
                  <li>🔑 JWT token authentication</li>
                  <li>📧 Email verification available</li>
                  <li>🛡️ User data isolation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Raw Data Export */}
          <div className="admin-card">
            <h2>Data Export</h2>
            <div className="export-buttons">
              <button 
                onClick={() => {
                  const data = JSON.stringify(allUsers, null, 2)
                  const blob = new Blob([data], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'supabase-users-data.json'
                  a.click()
                }}
                className="export-btn"
              >
                Export Users Data
              </button>
              
              <button 
                onClick={() => {
                  console.log('Supabase Users Data:', allUsers)
                  console.log('Current User:', user)
                  console.log('Stats:', stats)
                  alert('Data logged to console. Open Developer Tools to view.')
                }}
                className="export-btn"
              >
                Log to Console
              </button>
              
              <button 
                onClick={fetchUsers}
                className="export-btn"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}