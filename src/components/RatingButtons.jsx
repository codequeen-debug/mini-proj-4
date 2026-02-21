import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

/**
 * RatingButtons Component
 * Displays 5 clickable heart buttons for rating (1-5 stars)
 * 
 * @param {Function} onRate - Callback when a heart is clicked
 */
function RatingButtons({ onRate }) {
  // State for tracking which hearts are hovered (for visual feedback)
  const [hoveredRating, setHoveredRating] = useState(0)

  // Handle heart click - submit rating
  const handleRating = (rating) => {
    onRate(rating)
  }

  return (
    <div className="border-t pt-6">
      <p className="text-sm font-semibold text-gray-700 mb-4 text-center">
        Rate this Professor
      </p>

      {/* 5 interactive heart buttons */}
      <div className="flex justify-center gap-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => handleRating(num)}
            // Set hovered rating to show filled hearts on hover
            onMouseEnter={() => setHoveredRating(num)}
            onMouseLeave={() => setHoveredRating(0)}
            className="transition-all duration-200 transform hover:scale-125 focus:outline-none cursor-pointer"
            title={`Rate ${num} star${num !== 1 ? 's' : ''}`}
          >
            {/* Show filled heart if hovered, otherwise empty heart */}
            {hoveredRating >= num ? (
              <FaHeart className="text-red-500 text-3xl" />
            ) : (
              <FaRegHeart className="text-gray-300 text-3xl hover:text-red-300" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RatingButtons
