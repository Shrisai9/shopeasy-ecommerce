'use client'

import { useState } from 'react'

interface SearchFilterProps {
  onSearch: (query: string) => void
  onFilter: (category: string, priceRange: string) => void
}

export default function SearchFilter({ onSearch, onFilter }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('')
  const [priceRange, setPriceRange] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  const handleFilterChange = () => {
    onFilter(category, priceRange)
  }

  return (
    <div className="search-filter">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="search-btn">🔍</button>
      </div>
      
      <div className="filters">
        <select 
          value={category} 
          onChange={(e) => {
            setCategory(e.target.value)
            setTimeout(handleFilterChange, 0)
          }}
          className="filter-select"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="accessories">Accessories</option>
          <option value="audio">Audio</option>
        </select>
        
        <select 
          value={priceRange} 
          onChange={(e) => {
            setPriceRange(e.target.value)
            setTimeout(handleFilterChange, 0)
          }}
          className="filter-select"
        >
          <option value="">All Prices</option>
          <option value="0-50">$0 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-200">$100 - $200</option>
          <option value="200+">$200+</option>
        </select>
        
        <button 
          onClick={() => {
            setCategory('')
            setPriceRange('')
            setSearchQuery('')
            onSearch('')
            onFilter('', '')
          }}
          className="clear-filters-btn"
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}