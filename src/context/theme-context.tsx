"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  type StyleConfig, STYLE_DEFAULT,
  applyBodyBg, applyCardStyle, applyCustomCss,
} from '@/lib/style-config'
import { EXPORTED_SETTINGS } from '@/lib/exported-settings'

export type { StyleConfig }

const ACCENT_KEY  = 'donolb-accent'
const BG_KEY      = 'donolb-bg-config'
const CARD_KEY    = 'donolb-card-config'
const CSS_KEY     = 'donolb-custom-css'

function loadConfig(key: string, exported?: Partial<StyleConfig>): StyleConfig {
  if (typeof window === "undefined") return { ...STYLE_DEFAULT, ...exported }
  try {
    const r = localStorage.getItem(key)
    if (r) return { ...STYLE_DEFAULT, ...exported, ...JSON.parse(r) }
  } catch {}
  return { ...STYLE_DEFAULT, ...exported }
}
function saveConfig(key: string, cfg: StyleConfig) {
  try { localStorage.setItem(key, JSON.stringify(cfg)) } catch {}
}

interface ThemeCtx {
  accentColor: string
  setAccentColor: (hex: string) => void
  resetAccent: () => void
  bgConfig: StyleConfig
  setBgConfig: (u: Partial<StyleConfig>) => void
  resetBg: () => void
  cardConfig: StyleConfig
  setCardConfig: (u: Partial<StyleConfig>) => void
  resetCards: () => void
  customCss: string
  setCustomCss: (css: string) => void
}

const ThemeContext = createContext<ThemeCtx>({
  accentColor: '#ffffff', setAccentColor: () => {}, resetAccent: () => {},
  bgConfig: STYLE_DEFAULT, setBgConfig: () => {}, resetBg: () => {},
  cardConfig: STYLE_DEFAULT, setCardConfig: () => {}, resetCards: () => {},
  customCss: '', setCustomCss: () => {},
})

function applyAccent(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  const fg = lum > 0.55 ? '#0a0a0a' : '#fafafa'
  const root = document.documentElement
  root.style.setProperty('--primary', hex)
  root.style.setProperty('--primary-foreground', fg)
  root.style.setProperty('--sidebar-primary', hex)
  root.style.setProperty('--sidebar-primary-foreground', fg)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accentColor, setAccentState] = useState<string>(() => {
    if (typeof window === 'undefined') return EXPORTED_SETTINGS.accent || '#ffffff'
    try { return localStorage.getItem(ACCENT_KEY) || '#ffffff' } catch { return '#ffffff' }
  })
  const [bgConfig, setBgState] = useState<StyleConfig>(() => loadConfig(BG_KEY, EXPORTED_SETTINGS.background))
  const [cardConfig, setCardState] = useState<StyleConfig>(() => loadConfig(CARD_KEY, EXPORTED_SETTINGS.cards))
  const [customCss, setCssState] = useState<string>(() => {
    if (typeof window === 'undefined') return EXPORTED_SETTINGS.customCss || ''
    try { return localStorage.getItem(CSS_KEY) || EXPORTED_SETTINGS.customCss || '' } catch { return EXPORTED_SETTINGS.customCss || '' }
  })

  // Apply all on mount
  useEffect(() => {
    if (accentColor !== '#ffffff') applyAccent(accentColor)
    applyBodyBg(bgConfig)
    applyCardStyle(cardConfig)
    applyCustomCss(customCss)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const setAccentColor = useCallback((hex: string) => {
    setAccentState(hex); applyAccent(hex)
    try { localStorage.setItem(ACCENT_KEY, hex) } catch {}
  }, [])

  const resetAccent = useCallback(() => {
    setAccentState('#ffffff')
    ;['--primary','--primary-foreground','--sidebar-primary','--sidebar-primary-foreground']
      .forEach(v => document.documentElement.style.removeProperty(v))
    try { localStorage.removeItem(ACCENT_KEY) } catch {}
  }, [])

  const setBgConfig = useCallback((updates: Partial<StyleConfig>) => {
    setBgState(prev => {
      const next = { ...prev, ...updates }
      applyBodyBg(next)
      saveConfig(BG_KEY, next)
      return next
    })
  }, [])

  const resetBg = useCallback(() => {
    setBgState({ ...STYLE_DEFAULT })
    applyBodyBg({ ...STYLE_DEFAULT })
    try { localStorage.removeItem(BG_KEY) } catch {}
  }, [])

  const setCardConfig = useCallback((updates: Partial<StyleConfig>) => {
    setCardState(prev => {
      const next = { ...prev, ...updates }
      applyCardStyle(next)
      saveConfig(CARD_KEY, next)
      return next
    })
  }, [])

  const resetCards = useCallback(() => {
    setCardState({ ...STYLE_DEFAULT })
    applyCardStyle({ ...STYLE_DEFAULT })
    try { localStorage.removeItem(CARD_KEY) } catch {}
  }, [])

  const setCustomCss = useCallback((css: string) => {
    setCssState(css); applyCustomCss(css)
    try { localStorage.setItem(CSS_KEY, css) } catch {}
  }, [])

  return (
    <ThemeContext.Provider value={{
      accentColor, setAccentColor, resetAccent,
      bgConfig, setBgConfig, resetBg,
      cardConfig, setCardConfig, resetCards,
      customCss, setCustomCss,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() { return useContext(ThemeContext) }

export function getContrastColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? '#0a0a0a' : '#fafafa'
}
