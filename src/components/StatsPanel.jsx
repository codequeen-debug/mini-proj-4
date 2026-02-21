import React from 'react'

/**
 * StatsPanel Component
 * Displays statistics: professors left, rated count, and average rating
 */
function StatsPanel({ professorsLeft, ratedCount, avgRating }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="grid grid-cols-3 gap-4 text-center">
        {/* Professors Left Counter */}
        <div>
          <p className="text-gray-600 text-sm font-medium">PROFESSORS LEFT</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{professorsLeft}</p>
        </div>

        {/* Rated Counter */}
        <div>
          <p className="text-gray-600 text-sm font-medium">RATED</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{ratedCount}</p>
        </div>

        {/* Average Rating */}
        <div>
          <p className="text-gray-600 text-sm font-medium">AVERAGE RATING</p>
          <p className="text-3xl font-bold text-pink-600 mt-2">
            {ratedCount > 0 ? avgRating : '—'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatsPanel
