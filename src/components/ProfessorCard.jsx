import React, { useRef, useState, useEffect } from 'react'
import RatingHearts from './RatingHearts'

export default function ProfessorCard({ professor, onSwipe, zIndex }) {
  const ref = useRef(null)
  const start = useRef({ x: 0, y: 0 })
  const [pos, setPos] = useState({ x: 0, y: 0, rot: 0 })
  const [dragging, setDragging] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handlePointerMove = (e) => {
      if (!dragging) return
      const dx = e.clientX - start.current.x
      const dy = e.clientY - start.current.y
      const rot = Math.max(-20, Math.min(20, dx / 15))
      setPos({ x: dx, y: dy, rot })
    }
    const handlePointerUp = () => {
      if (!dragging) return
      setDragging(false)
      const threshold = 120
      if (Math.abs(pos.x) > threshold) {
        const dir = pos.x > 0 ? 'like' : 'dislike'
        const offX = pos.x > 0 ? 1000 : -1000
        setAnimating(true)
        setPos((p) => ({ ...p, x: offX, rot: p.rot * 2 }))
        setTimeout(() => onSwipe(dir, professor.id), 300)
        return
      }
      // reset
      setAnimating(true)
      setPos({ x: 0, y: 0, rot: 0 })
      setTimeout(() => setAnimating(false), 200)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [dragging, pos.x, pos.rot, onSwipe, professor.id])

  const handlePointerDown = (e) => {
    e.preventDefault()
    start.current = { x: e.clientX, y: e.clientY }
    setDragging(true)
    setAnimating(false)
    if (ref.current) ref.current.setPointerCapture(e.pointerId)
  }

  const likeOpacity = Math.min(1, Math.max(0, pos.x / 120))
  const nopeOpacity = Math.min(1, Math.max(0, -pos.x / 120))

  const transform = `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rot}deg)`
  const LS_FEEDBACK = 'rm_prof_feedback'
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const map = JSON.parse(localStorage.getItem(LS_FEEDBACK) || '{}')
      const fb = map[professor.id]
      if (fb) {
        setRating(fb.rating || 0)
        setComment(fb.comment || '')
      }
    } catch (e) {
      // ignore
    }
  }, [professor.id])

  const saveFeedback = (r, c) => {
    try {
      const map = JSON.parse(localStorage.getItem(LS_FEEDBACK) || '{}')
      map[professor.id] = { rating: r, comment: c }
      localStorage.setItem(LS_FEEDBACK, JSON.stringify(map))
      setSaved(true)
      setTimeout(() => setSaved(false), 1400)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div
      ref={ref}
      onPointerDown={handlePointerDown}
      className={`absolute left-1/2 top-24 -translate-x-1/2 w-80 max-w-[90vw] bg-white rounded-xl shadow-lg overflow-hidden touch-none`}
      style={{ zIndex, transform, transition: animating ? 'transform 200ms ease' : 'none' }}
    >
      <div className="relative h-48 bg-gray-100">
        <img src={professor.photo} alt={professor.name} className="w-full h-full object-cover" />
        <div
          className="absolute top-4 left-4 text-green-600 font-bold text-2xl"
          style={{ opacity: likeOpacity }}
        >
          LIKE
        </div>
        <div
          className="absolute top-4 right-4 text-red-600 font-bold text-2xl"
          style={{ opacity: nopeOpacity }}
        >
          NOPE
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-lg">{professor.name}</div>
            <div className="text-sm text-gray-500">{professor.department}</div>
          </div>
          <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">⭐ {professor.avgRating}</div>
        </div>
        <p className="mt-3 text-sm text-gray-600">{professor.blurb}</p>
        <div className="mt-4">
          <div className="text-sm text-gray-700 font-medium mb-2">Your rating</div>
          <RatingHearts rating={rating} onRate={(r) => { setRating(r); saveFeedback(r, comment) }} />
        </div>
        <div className="mt-3">
          <div className="text-sm text-gray-700 font-medium mb-2">Comment</div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2 text-sm"
            rows={3}
            placeholder="Add a short comment about this professor"
          />
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={() => saveFeedback(rating, comment)}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Save
            </button>
            {saved && <div className="text-sm text-green-600">Saved</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
