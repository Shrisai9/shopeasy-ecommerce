import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import LoadingSpinner from './components/LoadingSpinner'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'

export const metadata: Metadata = {
  title: 'ShopEasy - Your Online Store',
  description: 'Modern e-commerce platform with great products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}