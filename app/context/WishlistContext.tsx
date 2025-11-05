'use client'

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'
import { Product } from './CartContext'

interface WishlistState {
  items: Product[]
}

type WishlistAction = 
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'CLEAR_WISHLIST' }

const initialState: WishlistState = {
  items: []
}

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const exists = state.items.find(item => item.id === action.payload.id)
      if (exists) return state
      return { items: [...state.items, action.payload] }
    }
    
    case 'REMOVE_FROM_WISHLIST':
      return { items: state.items.filter(item => item.id !== action.payload) }
    
    case 'CLEAR_WISHLIST':
      return initialState
    
    default:
      return state
  }
}

interface WishlistContextType extends WishlistState {
  addToWishlist: (product: Product) => void
  removeFromWishlist: (id: number) => void
  clearWishlist: () => void
  isInWishlist: (id: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState)

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist)
      items.forEach((item: Product) => {
        dispatch({ type: 'ADD_TO_WISHLIST', payload: item })
      })
    }
  }, [])

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.items))
  }, [state.items])

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product })
  }

  const removeFromWishlist = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id })
  }

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' })
  }

  const isInWishlist = (id: number) => {
    return state.items.some(item => item.id === id)
  }

  return (
    <WishlistContext.Provider value={{
      ...state,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}