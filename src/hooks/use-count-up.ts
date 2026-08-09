"use client";

import { useState, useEffect } from 'react'

export function useCountUp(target: number, duration = 1600, delay = 0) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let raf: number

    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startTime === null) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        // ease out expo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        setCount(Math.round(eased * target))
        if (progress < 1) raf = requestAnimationFrame(animate)
      }
      raf = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [target, duration, delay])

  return count
}
