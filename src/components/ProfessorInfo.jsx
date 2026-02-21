import React from 'react'

/**
 * ProfessorInfo Component
 * Displays professor details: image, name, department, specialty, stats, and tags
 */
function ProfessorInfo({ professor }) {
  return (
    <div>
      {/* Professor Image */}
      <div className="w-full h-56 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mb-6 overflow-hidden">
        <img
          src={professor.image}
          alt={professor.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Professor Name and Department */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{professor.name}</h2>
        <p className="text-sm text-gray-600 mt-1">{professor.department}</p>
        <p className="text-sm text-purple-600 font-medium mt-2">{professor.specialty}</p>
      </div>

      {/* Professor Statistics: Rating, Review Count, Difficulty */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Rating Stat */}
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">{professor.rating}</p>
          <p className="text-xs text-gray-600 mt-1">Rating</p>
        </div>

        {/* Reviews Count Stat */}
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-600">{professor.reviews}</p>
          <p className="text-xs text-gray-600 mt-1">Reviews</p>
        </div>

        {/* Difficulty Level Stat */}
        <div className="bg-orange-50 rounded-lg p-3 text-center">
          <p className="text-sm font-semibold text-orange-600">{professor.difficulty}</p>
          <p className="text-xs text-gray-600 mt-1">Level</p>
        </div>
      </div>

      {/* Professor Tags (descriptive attributes) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {professor.tags.map((tag, idx) => (
          <span key={idx} className="badge badge-sm bg-purple-100 text-purple-700 text-xs">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ProfessorInfo
