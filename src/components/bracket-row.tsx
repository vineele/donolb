"use client";

import { useState } from 'react'
import { BadgeCheck, Flame, Paintbrush, X, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBracket } from '@/context/bracket-context'
import { StyleEditor } from '@/components/style-editor'
import { getInlineStyle, getEffectStyle } from '@/lib/style-config'
import { cn } from '@/lib/utils'

interface BracketRowProps {
  rank: number
  initials: string
  username: string
  verified?: boolean
  donationCount: number
  country: string
  streak: number
  amount: string
  avatarUrl?: string
  isCurrentUser?: boolean
}

function InlineEditor({ onClose }: { onClose: () => void }) {
  const { bracket, setBracket, resetBracket } = useBracket()
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="overflow-hidden"
    >
      <div className="border-t border-white/6 bg-black/30 px-4 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Paintbrush className="size-3" /> Customize your bracket
          </p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={resetBracket}
              className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground">
              <RotateCcw className="size-3" /> Reset
            </button>
            <button type="button" onClick={onClose}
              className="rounded p-0.5 text-muted-foreground hover:text-foreground">
              <X className="size-3.5" />
            </button>
          </div>
        </div>
        <StyleEditor value={bracket} onChange={setBracket} showDefault compact />
      </div>
    </motion.div>
  )
}

export function BracketRow({
  rank, initials, username, verified,
  donationCount, country, streak, amount,
  avatarUrl, isCurrentUser,
}: BracketRowProps) {
  const { bracket: cfg } = useBracket()
  const [editorOpen, setEditorOpen] = useState(false)

  const bgStyle    = isCurrentUser ? getInlineStyle(cfg) : {}
  const glowStyle  = isCurrentUser ? getEffectStyle(cfg) : {}
  const effect     = isCurrentUser ? cfg.effect : 'none'
  const hasCustomBg = isCurrentUser && cfg.bgType !== 'default'

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border transition-all',
        isCurrentUser
          ? cfg.bgType === 'default' ? 'border-primary/40 bg-card' : 'border-transparent'
          : 'border-border bg-card hover:bg-accent/40',
        isCurrentUser && effect === 'neon' && 'effect-neon-border',
      )}
      style={glowStyle}
    >
      {/* Custom background layer */}
      {hasCustomBg && (
        <div
          className={cn('absolute inset-0', effect === 'animated-gradient' && 'effect-gradient-pan')}
          style={bgStyle}
        />
      )}

      {/* Holographic overlay */}
      {isCurrentUser && effect === 'holographic' && (
        <div
          className="effect-holo-overlay pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            background: `linear-gradient(135deg, ${cfg.holoColor}66, #3a86ff66, #06d6a066, ${cfg.holoColor}66, #ff006066)`,
          }}
        />
      )}

      {/* Aurora overlay */}
      {isCurrentUser && effect === 'aurora' && (
        <div
          className="effect-aurora-overlay pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            background: `linear-gradient(0deg, transparent, ${cfg.auroraColor}55, ${cfg.auroraColor}88, transparent)`,
          }}
        />
      )}

      {/* Shimmer */}
      {isCurrentUser && effect === 'shimmer' && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 -skew-x-12"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)' }}
            animate={{ x: ['-120%', '220%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
          />
        </div>
      )}

      {/* Image readability overlay */}
      {isCurrentUser && cfg.bgType === 'image' && cfg.imgUrl && (
        <div className="pointer-events-none absolute inset-0 bg-black/45" />
      )}

      {/* Row content */}
      <div className="relative flex items-center gap-4 px-4 py-3">
        <span className={cn('w-7 shrink-0 text-center text-sm font-semibold tabular-nums', rank === 1 ? 'text-primary' : 'text-muted-foreground')}>
          {rank}
        </span>

        {/* Avatar */}
        <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-xs font-semibold">
          {avatarUrl
            ? <img src={avatarUrl} alt={username} className="h-full w-full object-cover" />
            : initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-medium">{username}</p>
            {verified && <BadgeCheck className="size-3.5 shrink-0 text-primary" />}
          </div>
          <p className="truncate text-xs text-muted-foreground">{donationCount} donations · {country}</p>
        </div>

        <div className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
          <Flame className="size-3.5" />
          <span className="tabular-nums">{streak}d</span>
        </div>

        <span className="text-sm font-semibold tabular-nums">{amount}</span>

        {isCurrentUser && (
          <button
            type="button"
            onClick={() => setEditorOpen(o => !o)}
            className={cn(
              'ml-1 flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium transition-colors',
              editorOpen
                ? 'border-primary bg-primary/15 text-primary'
                : 'border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground',
            )}
            aria-label="Customize bracket"
          >
            <Paintbrush className="size-3" />
            {editorOpen ? 'Done' : 'Style'}
          </button>
        )}
      </div>

      <AnimatePresence>
        {isCurrentUser && editorOpen && <InlineEditor onClose={() => setEditorOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}
