import React from 'react'

export default function RatingHearts({ rating = 0, onRate, max = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const idx = i + 1
        const filled = rating >= idx
        return (
          <button
            key={idx}
            onClick={() => onRate(idx)}
            className={`text-2xl leading-none ${filled ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
            aria-label={`Rate ${idx}`}
            type="button"
          >
            ❤️
          </button>
        )
      })}
    </div>
  )
}
