"use client";

import { useState, useCallback } from 'react'

export type BracketBgType = 'default' | 'solid' | 'gradient' | 'image'
export type BracketEffect = 'none' | 'shimmer' | 'glow' | 'holographic' | 'neon' | 'aurora' | 'animated-gradient'

export interface BracketConfig {
  bgType: BracketBgType
  bgColor: string
  gradFrom: string
  gradTo: string
  gradDir: string
  imgUrl: string
  effect: BracketEffect
  glowColor: string
  borderColor: string
  borderWidth: number
}

const STORAGE_KEY = 'donolb-bracket'

const DEFAULT: BracketConfig = {
  bgType: 'default',
  bgColor: '#1f1f1f',
  gradFrom: '#1a0a2e',
  gradTo: '#0a1628',
  gradDir: '135deg',
  imgUrl: '',
  effect: 'none',
  glowColor: '#ffffff',
  borderColor: '',
  borderWidth: 1,
}

function load(): BracketConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...DEFAULT, ...JSON.parse(raw) }
  } catch {}
  return { ...DEFAULT }
}

function save(c: BracketConfig) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)) } catch {}
}

export function useBracket() {
  const [bracket, setBracketState] = useState<BracketConfig>(load)

  const setBracket = useCallback((updates: Partial<BracketConfig>) => {
    setBracketState(prev => {
      const next = { ...prev, ...updates }
      save(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setBracketState({ ...DEFAULT })
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }, [])

  return { bracket, setBracket, reset }
}

export function loadBracket(): BracketConfig {
  return load()
}
