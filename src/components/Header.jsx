import React from 'react'
import { FaHeart } from 'react-icons/fa'

/**
 * Header Component
 * Displays the app title with icon and shows progress (professors rated)
 */
function Header({ ratedCount, totalCount }) {
  return (
    <div className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Title with Icon */}
        <div className="flex items-center gap-3">
          <FaHeart className="text-red-500 text-2xl animate-pulse" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Rate My Professor
          </h1>
        </div>

        {/* Progress Counter */}
        <div className="text-sm font-medium text-gray-600">
          Rated: <span className="text-purple-600 font-bold">{ratedCount}</span> / {totalCount}
        </div>
      </div>
    </div>
  )
}

export default Header
