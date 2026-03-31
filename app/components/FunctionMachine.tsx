'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function FunctionMachine() {
  const [x, setX] = useState(2)
  const fx = x * x

  return (
    <div className="flex items-center gap-10">

      {/* Girdi */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 text-center w-40"
      >
        <p className="text-sm text-gray-300 mb-2">Girdi</p>
        <input
          type="number"
          value={x}
          onChange={e => setX(Number(e.target.value))}
          className="w-full text-center bg-black border border-cyan-400 rounded-lg py-2"
        />
      </motion.div>

      <ArrowRight className="text-purple-400" size={36} />

      {/* Fonksiyon */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        className="bg-purple-500/20 p-6 rounded-2xl border border-purple-400 w-44 text-center"
      >
        <p className="text-sm text-purple-300">Fonksiyon</p>
        <p className="text-xl font-bold mt-2">f(x) = x²</p>
      </motion.div>

      <ArrowRight className="text-green-400" size={36} />

      {/* Çıktı */}
      <motion.div
        key={fx}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-green-500/20 p-6 rounded-2xl border border-green-400 w-40 text-center"
      >
        <p className="text-sm text-green-300">Çıktı</p>
        <p className="text-2xl font-bold mt-2">{fx}</p>
      </motion.div>

    </div>
  )
}

