import React, { useEffect, useState } from 'react'
import ProfessorCard from './components/ProfessorCard'
import sample from './data/professors'
import './index.css'

const LS_LIKES = 'rm_prof_likes'
const LS_DISLIKES = 'rm_prof_dislikes'

function App() {
  const [stack, setStack] = useState(sample)
  const [likes, setLikes] = useState([])
  const [dislikes, setDislikes] = useState([])

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem(LS_LIKES) || '[]')
    const savedDislikes = JSON.parse(localStorage.getItem(LS_DISLIKES) || '[]')
    setLikes(savedLikes)
    setDislikes(savedDislikes)
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_LIKES, JSON.stringify(likes))
  }, [likes])
  useEffect(() => {
    localStorage.setItem(LS_DISLIKES, JSON.stringify(dislikes))
  }, [dislikes])

  const handleSwipe = (dir, id) => {
    const prof = stack.find((p) => p.id === id)
    if (!prof) return
    if (dir === 'like') setLikes((s) => [...s, id])
    else setDislikes((s) => [...s, id])
    setStack((s) => s.filter((p) => p.id !== id))
  }

  const resetAll = () => {
    setStack(sample)
    setLikes([])
    setDislikes([])
    localStorage.removeItem(LS_LIKES)
    localStorage.removeItem(LS_DISLIKES)
  }

  const top = stack[stack.length - 1]

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Rate My Professor — Tinder Style</h1>

      <div className="relative w-full max-w-xl h-[420px]">
        {stack.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg">No more professors — you're done!</p>
              <button onClick={resetAll} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Reset</button>
            </div>
          </div>
        )}

        {stack.map((prof, i) => (
          <ProfessorCard
            key={prof.id}
            professor={prof}
            onSwipe={handleSwipe}
            zIndex={i}
          />
        ))}
      </div>

      <div className="mt-6 flex gap-4 items-center">
        <div className="text-sm text-gray-600">Likes: {likes.length}</div>
        <div className="text-sm text-gray-600">Dislikes: {dislikes.length}</div>
        <button onClick={resetAll} className="ml-4 px-3 py-1 border rounded">Reset</button>
      </div>

      <div className="mt-6 text-xs text-gray-500 max-w-xl text-center">
        Tip: drag cards left or right to dislike or like. You can also press reset to start over.
      </div>
    </div>
  )
}

export default App
