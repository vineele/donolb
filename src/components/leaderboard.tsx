"use client";

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BadgeCheck, Flame } from 'lucide-react'
import { users, formatMoney, type LeaderboardPeriod } from '@/lib/data'
import { BracketRow } from '@/components/bracket-row'
import { useProfile } from '@/hooks/use-profile'
import { cn } from '@/lib/utils'

const periods: { key: LeaderboardPeriod; label: string }[] = [
  { key: 'daily',    label: 'Daily'    },
  { key: 'weekly',   label: 'Weekly'   },
  { key: 'monthly',  label: 'Monthly'  },
  { key: 'yearly',   label: 'Yearly'   },
  { key: 'all-time', label: 'All-Time' },
]

export function Leaderboard() {
  const [period, setPeriod] = useState<LeaderboardPeriod>('all-time')
  const { profile } = useProfile()
  const ranked = [...users].sort((a, b) => b.amounts[period] - a.amounts[period])

  return (
    <section aria-label="Leaderboard">
      <div
        className="flex flex-wrap gap-1 rounded-lg border border-border bg-card p-1 glass-target"
        role="tablist"
        aria-label="Leaderboard period"
      >
        {periods.map(p => (
          <button
            key={p.key}
            type="button"
            role="tab"
            aria-selected={period === p.key}
            onClick={() => setPeriod(p.key)}
            className={cn(
              'flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              period === p.key
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <ol className="mt-4 flex flex-col gap-1.5">
        <AnimatePresence mode="popLayout">
          {ranked.map((user, i) => {
            const isCurrentUser = user.username === 'RolBakool'

            if (isCurrentUser) {
              return (
                <motion.li
                  key={user.id}
                  layout
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.28, ease: 'easeOut', delay: i * 0.03 }}
                >
                  <BracketRow
                    rank={i + 1}
                    initials={user.initials}
                    username={profile.username}
                    verified={user.verified}
                    donationCount={user.donationCount}
                    country={user.country !== '—' ? user.country : 'Anonymous'}
                    streak={user.streak}
                    amount={formatMoney(user.amounts[period])}
                    avatarUrl={profile.avatarUrl}
                    isCurrentUser
                  />
                </motion.li>
              )
            }

            return (
              <motion.li
                key={user.id}
                layout
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.28, ease: 'easeOut', delay: i * 0.03 }}
                className="flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-3 glass-target transition-colors hover:bg-accent/40"
              >
                <span className={cn('w-7 shrink-0 text-center text-sm font-semibold tabular-nums', i === 0 ? 'text-primary' : 'text-muted-foreground')}>
                  {i + 1}
                </span>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
                  {user.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-medium">{user.username}</p>
                    {user.verified && <BadgeCheck className="size-3.5 shrink-0 text-primary" />}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.donationCount} donations{user.country !== '—' ? ` · ${user.country}` : ' · Anonymous'}
                  </p>
                </div>
                <div className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                  <Flame className="size-3.5" />
                  <span className="tabular-nums">{user.streak}d</span>
                </div>
                <motion.span
                  key={`${user.id}-${period}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm font-semibold tabular-nums"
                >
                  {formatMoney(user.amounts[period])}
                </motion.span>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ol>
    </section>
  )
}
