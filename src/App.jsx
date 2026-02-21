import React, { useEffect, useState } from 'react'
import ProfessorCard from './components/ProfessorCard'
import Header from './components/Header'
import Navbar from './components/Navbar'
import StatsPanel from './components/StatsPanel'
import Footer from './components/Footer'
import professors from './data/professors'
import './index.css'

// LocalStorage key for persisting ratings
const LS_RATINGS = 'rm_prof_ratings'

function App() {
  // State for the stack of professors to rate
  const [stack, setStack] = useState(professors)
  
  // State for storing user ratings (key: professorId, value: rating 1-5)
  const [ratings, setRatings] = useState({})
  
  // State for managing loading screen
  const [isLoading, setIsLoading] = useState(true)

  // Effect: Load saved ratings from localStorage on component mount
  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      const savedRatings = JSON.parse(localStorage.getItem(LS_RATINGS) || '{}')
      setRatings(savedRatings)
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Effect: Save ratings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LS_RATINGS, JSON.stringify(ratings))
  }, [ratings])

  // Handle rating submission - remove professor from stack and save rating
  const handleRate = (rating, id) => {
    setRatings((prev) => ({
      ...prev,
      [id]: rating
    }))
    setStack((s) => s.filter((p) => p.id !== id))
  }

  // Reset all data and start over
  const resetAll = () => {
    setStack(professors)
    setRatings({})
    localStorage.removeItem(LS_RATINGS)
  }

  // Calculate statistics
  const ratedCount = Object.keys(ratings).length
  const avgRating = ratedCount > 0
    ? (Object.values(ratings).reduce((sum, r) => sum + r, 0) / ratedCount).toFixed(1)
    : 0

  // Show loading spinner while initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p className="text-gray-600">Loading professors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Header Component - Title and Progress */}
      <Header ratedCount={ratedCount} totalCount={professors.length} />

      {/* Navbar Component - Navigation Buttons */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-8">
        {/* Card Container */}
        <div className="relative w-full h-[500px] mb-8">
          {/* Show completion screen when all professors have been rated */}
          {stack.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl">
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <p className="text-2xl font-bold text-gray-800 mb-2">
                  You've Rated All Professors!
                </p>
                <p className="text-gray-600 mb-6">
                  Your average rating:{' '}
                  <span className="text-2xl font-bold text-purple-600">{avgRating} ⭐</span>
                </p>
                <button
                  onClick={resetAll}
                  className="btn btn-primary gap-2"
                >
                  🔄 Start Over
                </button>
              </div>
            </div>
          ) : (
            // Render only the top (current) professor card
            stack.length > 0 && (
              <ProfessorCard
                key={stack[stack.length - 1].id}
                professor={stack[stack.length - 1]}
                onRate={handleRate}
                zIndex={1}
                isActive={true}
              />
            )
          )}
        </div>

        {/* Stats Panel Component - Shows progress statistics */}
        {stack.length > 0 && (
          <StatsPanel
            professorsLeft={stack.length}
            ratedCount={ratedCount}
            avgRating={avgRating}
          />
        )}
      </div>

      {/* Footer Component - Helpful text */}
      <Footer />
    </div>
  )
}

export default App
