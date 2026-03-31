'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, CheckCircle } from 'lucide-react'

const topics = [
  'Fonksiyon Tanımı',
  'Fonksiyon Değeri',
  'Fonksiyon Türleri',
  'Ters Fonksiyon'
]

export default function SmartRoadmap() {
  const [completedLevel, setCompletedLevel] = useState(0)

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <h2 className="text-2xl font-bold text-purple-400 text-center">
        Öğrenme Yolu
      </h2>

      {topics.map((topic, index) => {
        const isUnlocked = index <= completedLevel
        const isCompleted = index < completedLevel

        return (
          <motion.div
            key={topic}
            className={`flex items-center justify-between p-5 rounded-2xl border
              ${
                isCompleted
                  ? 'bg-green-500/20 border-green-400'
                  : isUnlocked
                  ? 'bg-purple-500/20 border-purple-400'
                  : 'bg-white/5 border-white/10 opacity-40'
              }`}
          >
            <span>{topic}</span>
            {isCompleted && <CheckCircle />}
            {!isUnlocked && <Lock />}
            {isUnlocked && !isCompleted && (
              <button
                onClick={() => setCompletedLevel(lvl => lvl + 1)}
                className="ml-4 px-4 py-2 bg-cyan-500 text-black rounded"
              >
                Başla
              </button>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
