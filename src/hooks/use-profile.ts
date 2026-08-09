"use client";

import { useState, useCallback } from 'react'
import { type StyleConfig, STYLE_DEFAULT } from '@/lib/style-config'
import { EXPORTED_SETTINGS } from '@/lib/exported-settings'

export type BannerConfig = StyleConfig

export interface ProfileCustomization {
  avatarUrl: string
  username: string
  bio: string
  banner: BannerConfig
}

const STORAGE_KEY = 'donolb-profile'
const DEFAULT: ProfileCustomization = {
  avatarUrl: '',
  username: 'RolBakool',
  bio: 'Helping clean oceans.',
  banner: { ...STYLE_DEFAULT },
}

function load(): ProfileCustomization {
  if (typeof window === "undefined") {
    return { ...DEFAULT, banner: { ...STYLE_DEFAULT } }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      // Migrate old bannerColor string → banner StyleConfig
      if (typeof parsed.bannerColor === 'string') {
        parsed.banner = parsed.bannerColor
          ? { ...STYLE_DEFAULT, bgType: 'solid', bgColor: parsed.bannerColor }
          : { ...STYLE_DEFAULT }
        delete parsed.bannerColor
      }
      return {
        ...DEFAULT,
        ...EXPORTED_SETTINGS.profile,
        ...parsed,
        banner: {
          ...STYLE_DEFAULT,
          ...(EXPORTED_SETTINGS.profile?.banner || {}),
          ...(parsed.banner || {}),
        },
      }
    }
  } catch {}
  return {
    ...DEFAULT,
    ...EXPORTED_SETTINGS.profile,
    banner: { ...STYLE_DEFAULT, ...(EXPORTED_SETTINGS.profile?.banner || {}) },
  }
}

function save(p: ProfileCustomization) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)) } catch {}
}

export function useProfile() {
  const [profile, setProfileState] = useState<ProfileCustomization>(load)

  const setProfile = useCallback((updates: Partial<ProfileCustomization>) => {
    setProfileState(prev => {
      const next = { ...prev, ...updates }
      save(next)
      return next
    })
  }, [])

  return { profile, setProfile }
}
