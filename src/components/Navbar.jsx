import React, { useState } from 'react'
import { FiHeart, FiEye } from 'react-icons/fi'

/**
 * Navbar Component
 * Navigation bar with buttons for wishlist and watched professors
 */
function Navbar() {
  // State for active tab view
  const [activeTab, setActiveTab] = useState('rating')

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-4">
        {/* Tab Buttons */}
        <button
          onClick={() => setActiveTab('rating')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'rating'
              ? 'bg-red-500 text-white shadow-md'
              : 'text-gray-700 hover:bg-white'
          }`}
        >
          <FiHeart size={18} /> Rate
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'wishlist'
              ? 'bg-purple-500 text-white shadow-md'
              : 'text-gray-700 hover:bg-white'
          }`}
        >
          <FiHeart size={18} /> Wishlist
        </button>
        <button
          onClick={() => setActiveTab('watched')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'watched'
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-gray-700 hover:bg-white'
          }`}
        >
          <FiEye size={18} /> Watched
        </button>
      </div>
    </div>
  )
}

export default Navbar
