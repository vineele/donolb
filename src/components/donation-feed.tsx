"use client";

import { useState, useRef, useCallback } from 'react'
import { HeartHandshake, Trophy, Award, Swords } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { feedItems, formatMoney, type FeedItem } from '@/lib/data'
import { UserProfileCard } from '@/components/user-profile-card'

const iconFor = {
  donation: HeartHandshake,
  milestone: Trophy,
  achievement: Award,
  challenge: Swords,
} as const

export function DonationFeed({ items = feedItems, compact = false }: { items?: FeedItem[]; compact?: boolean }) {
  const [activeCard, setActiveCard] = useState<{ username: string; rect: DOMRect } | null>(null)
  const closeCard = useCallback(() => setActiveCard(null), [])

  const handleUserClick = (username: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setActiveCard(prev => prev?.username === username ? null : { username, rect })
  }

  return (
    <>
      <ol className="flex flex-col gap-1.5" aria-label="Live donation feed">
        {items.map((item) => {
          const Icon = iconFor[item.type]
          return (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3"
            >
              {/* Avatar bracket — clickable */}
              <button
                type="button"
                onClick={(e) => handleUserClick(item.user, e)}
                className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold transition-colors hover:bg-primary/20 hover:text-primary"
                aria-label={`View ${item.user}'s profile`}
              >
                {item.user.slice(0, 2).toUpperCase()}
              </button>

              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed">
                  <button
                    type="button"
                    onClick={(e) => handleUserClick(item.user, e)}
                    className="font-medium underline-offset-2 hover:underline hover:text-primary transition-colors"
                  >
                    {item.user}
                  </button>{' '}
                  <span className="text-muted-foreground">{item.action}</span>{' '}
                  {item.amount !== undefined && (
                    <span className="font-semibold">{formatMoney(item.amount)}</span>
                  )}
                  {item.amount !== undefined && <span className="text-muted-foreground"> to </span>}
                  <span className={item.amount !== undefined ? 'text-muted-foreground' : 'font-medium'}>
                    {item.target}
                  </span>
                </p>
                {!compact && <p className="mt-0.5 text-xs text-muted-foreground">{item.time}</p>}
              </div>

              {compact && (
                <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
              )}

              {/* Donation type icon */}
              <div className="mt-0.5 shrink-0 text-muted-foreground/40">
                <Icon className="size-3.5" aria-hidden="true" />
              </div>
            </li>
          )
        })}
      </ol>

      <AnimatePresence>
        {activeCard && (
          <UserProfileCard
            key={activeCard.username}
            username={activeCard.username}
            anchorRect={activeCard.rect}
            onClose={closeCard}
          />
        )}
      </AnimatePresence>
    </>
  )
}
