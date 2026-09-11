"use client";

import { createContext, useContext, useState, useCallback } from 'react'
import { type StyleConfig, type StyleBgType, type StyleEffect, STYLE_DEFAULT } from '@/lib/style-config'
import { EXPORTED_SETTINGS } from '@/lib/exported-settings'

export type { StyleBgType as BracketBgType, StyleEffect as BracketEffect }
export type BracketConfig = StyleConfig

export interface Blinkie {
  id: string
  url: string
  x: number // percentage
  y: number // percentage
  width: number // pixels
  height: number // pixels
  zIndex: number
}

const DEFAULT: BracketConfig = { ...STYLE_DEFAULT }
const BLINKIES_KEY = 'donolb-bracket-blinkies'

function loadStored(): BracketConfig {
  if (typeof window === "undefined") return { ...DEFAULT }
  try {
    const r = localStorage.getItem(BLINKIES_KEY.replace('blinkies', ''))
    if (r) return { ...DEFAULT, ...EXPORTED_SETTINGS.bracket, ...JSON.parse(r) }
  } catch {}
  return { ...DEFAULT, ...EXPORTED_SETTINGS.bracket }
}

function saveStored(c: BracketConfig) {
  try { localStorage.setItem(BLINKIES_KEY.replace('blinkies', ''), JSON.stringify(c)) } catch {}
}

function loadBlinkies(): Blinkie[] {
  if (typeof window === "undefined") return []
  try {
    const r = localStorage.getItem(BLINKIES_KEY)
    return r ? JSON.parse(r) : []
  } catch {}
  return []
}

function saveBlinkies(b: Blinkie[]) {
  try { localStorage.setItem(BLINKIES_KEY, JSON.stringify(b)) } catch {}
}

interface BracketCtx {
  bracket: BracketConfig
  setBracket: (u: Partial<BracketConfig>) => void
  resetBracket: () => void
  blinkies: Blinkie[]
  addBlinkie: (url: string) => void
  updateBlinkie: (id: string, updates: Partial<Blinkie>) => void
  removeBlinkie: (id: string) => void
  resetBlinkies: () => void
}

const Ctx = createContext<BracketCtx>({
  bracket: DEFAULT,
  setBracket: () => {},
  resetBracket: () => {},
  blinkies: [],
  addBlinkie: () => {},
  updateBlinkie: () => {},
  removeBlinkie: () => {},
  resetBlinkies: () => {},
})

export function BracketProvider({ children }: { children: React.ReactNode }) {
  const [bracket, setState] = useState<BracketConfig>(loadStored)
  const [blinkies, setBlinkies] = useState<Blinkie[]>(loadBlinkies)

  const setBracket = useCallback((updates: Partial<BracketConfig>) => {
    setState(prev => {
      const next = { ...prev, ...updates }
      saveStored(next)
      return next
    })
  }, [])

  const resetBracket = useCallback(() => {
    setState({ ...DEFAULT })
    try { localStorage.removeItem('donolb-bracket') } catch {}
  }, [])

  const addBlinkie = useCallback((url: string) => {
    setBlinkies(prev => {
      const newBlinkie: Blinkie = {
        id: Math.random().toString(36).slice(2, 9),
        url,
        x: 50,
        y: 50,
        width: 60,
        height: 60,
        zIndex: prev.length,
      }
      const next = [...prev, newBlinkie]
      saveBlinkies(next)
      return next
    })
  }, [])

  const updateBlinkie = useCallback((id: string, updates: Partial<Blinkie>) => {
    setBlinkies(prev => {
      const next = prev.map(b => b.id === id ? { ...b, ...updates } : b)
      saveBlinkies(next)
      return next
    })
  }, [])

  const removeBlinkie = useCallback((id: string) => {
    setBlinkies(prev => {
      const next = prev.filter(b => b.id !== id)
      saveBlinkies(next)
      return next
    })
  }, [])

  const resetBlinkies = useCallback(() => {
    setBlinkies([])
    try { localStorage.removeItem(BLINKIES_KEY) } catch {}
  }, [])

  return (
    <Ctx.Provider
      value={{
        bracket,
        setBracket,
        resetBracket,
        blinkies,
        addBlinkie,
        updateBlinkie,
        removeBlinkie,
        resetBlinkies,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export function useBracket() { return useContext(Ctx) }
