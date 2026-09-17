"use client";

import { createContext, useContext, useState, useCallback } from 'react'
import { type StyleConfig, type StyleBgType, type StyleEffect, STYLE_DEFAULT } from '@/lib/style-config'
import { EXPORTED_SETTINGS } from '@/lib/exported-settings'

export type { StyleBgType as BracketBgType, StyleEffect as BracketEffect }
export type BracketConfig = StyleConfig

const DEFAULT: BracketConfig = { ...STYLE_DEFAULT }

const KEY = 'donolb-bracket'
function loadStored(): BracketConfig {
  if (typeof window === "undefined") return { ...DEFAULT }
  try {
    const r = localStorage.getItem(KEY)
    if (r) return { ...DEFAULT, ...EXPORTED_SETTINGS.bracket, ...JSON.parse(r) }
  } catch {}
  return { ...DEFAULT, ...EXPORTED_SETTINGS.bracket }
}
function saveStored(c: BracketConfig) {
  try { localStorage.setItem(KEY, JSON.stringify(c)) } catch {}
}

interface BracketCtx {
  bracket: BracketConfig
  setBracket: (u: Partial<BracketConfig>) => void
  resetBracket: () => void
}

const Ctx = createContext<BracketCtx>({ bracket: DEFAULT, setBracket: () => {}, resetBracket: () => {} })

export function BracketProvider({ children }: { children: React.ReactNode }) {
  const [bracket, setState] = useState<BracketConfig>(loadStored)

  const setBracket = useCallback((updates: Partial<BracketConfig>) => {
    setState(prev => {
      const next = { ...prev, ...updates }
      saveStored(next)
      return next
    })
  }, [])

  const resetBracket = useCallback(() => {
    setState({ ...DEFAULT })
    try { localStorage.removeItem(KEY) } catch {}
  }, [])

  return <Ctx.Provider value={{ bracket, setBracket, resetBracket }}>{children}</Ctx.Provider>
}

export function useBracket() { return useContext(Ctx) }
