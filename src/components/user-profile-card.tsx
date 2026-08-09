"use client";

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, Flame, HeartHandshake, Trophy, X } from 'lucide-react'
import { users, formatMoney } from '@/lib/data'

interface UserProfileCardProps {
  username: string
  anchorRect: DOMRect
  onClose: () => void
  customAvatarUrl?: string
}

export function UserProfileCard({ username, anchorRect, onClose, customAvatarUrl }: UserProfileCardProps) {
  const user = users.find(u => u.username === username)
  const cardRef = useRef<HTMLDivElement>(null)

  // Close on outside click or Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    const onClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [onClose])

  // Position: prefer right of anchor, fall back to left
  const vw = window.innerWidth
  const vh = window.innerHeight
  const cardW = 280
  const spaceRight = vw - anchorRect.right - 8
  const left = spaceRight >= cardW ? anchorRect.right + 8 : anchorRect.left - cardW - 8
  const top = Math.min(anchorRect.top, vh - 360)

  if (!user) return null

  const initials = user.initials
  const hasAvatar = !!customAvatarUrl
  const isGif = customAvatarUrl?.match(/\.(gif|webp)$/i) || customAvatarUrl?.includes('tenor') || customAvatarUrl?.includes('giphy')

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      style={{ position: 'fixed', top, left, width: cardW, zIndex: 9999 }}
      className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
    >
      {/* Banner */}
      <div className="relative h-16 bg-secondary">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground hover:text-foreground"
          aria-label="Close profile card"
        >
          <X className="size-3.5" />
        </button>
      </div>

      {/* Avatar */}
      <div className="px-4 pb-4">
        <div className="-mt-8 mb-3 flex items-end justify-between">
          <div className="size-14 overflow-hidden rounded-full border-4 border-card bg-secondary">
            {hasAvatar ? (
              <img
                src={customAvatarUrl}
                alt={username}
                className={`h-full w-full object-cover ${isGif ? '' : ''}`}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-bold">
                {initials}
              </div>
            )}
          </div>
          {user.verified && (
            <BadgeCheck className="size-5 text-primary" aria-label="Verified" />
          )}
        </div>

        <p className="text-sm font-semibold">{user.username}</p>
        <p className="text-xs text-muted-foreground">{user.country !== '—' ? user.country : 'Anonymous'}</p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { icon: HeartHandshake, label: 'Donated', value: formatMoney(user.amounts['all-time']) },
            { icon: Flame, label: 'Streak', value: `${user.streak}d` },
            { icon: Trophy, label: 'Rank', value: `#${user.globalRank}` },
            { icon: BadgeCheck, label: 'Donations', value: String(user.donationCount) },
          ].map(stat => (
            <div key={stat.label} className="rounded-lg bg-secondary px-3 py-2">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <stat.icon className="size-3" />
                <span className="text-[10px] font-medium uppercase tracking-wide">{stat.label}</span>
              </div>
              <p className="mt-0.5 text-sm font-semibold tabular-nums">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
