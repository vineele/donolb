"use client";

import { Swords, Timer, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { challenges, formatMoney, type Challenge } from '@/lib/data'
import { cn } from '@/lib/utils'

function ProgressBar({ label, value, target, money }: { label: string; value: number; target: number; money: boolean }) {
  const pct = Math.min(100, Math.round((value / target) * 100))
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">{label}</span>
        <span className="tabular-nums text-muted-foreground">
          {money ? formatMoney(value) : value} / {money ? formatMoney(target) : target}
        </span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} progress`}
      >
        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function ChallengeCard({ c }: { c: Challenge }) {
  const money = c.type !== 'Most Donations' && c.type !== 'Unique Charities'
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {c.type}
          </p>
          <h3 className="mt-1 text-sm font-semibold">{c.goal}</h3>
        </div>
        <span
          className={cn(
            'shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium',
            c.status === 'active' && 'border-primary/40 text-foreground',
            c.status === 'pending' && 'border-border text-muted-foreground',
            c.status === 'completed' && 'border-border bg-secondary text-muted-foreground',
          )}
        >
          {c.status === 'active' ? 'Active' : c.status === 'pending' ? 'Pending' : 'Completed'}
        </span>
      </div>

      {c.status === 'pending' ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">{c.challenger}</span> challenged{' '}
            <span className="font-medium text-foreground">{c.opponent}</span>. Waiting for a
            response.
          </p>
          <div className="flex gap-2">
            <Button size="sm">Accept</Button>
            <Button size="sm" variant="secondary">
              Decline
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <ProgressBar label={c.challenger} value={c.challengerProgress} target={c.target} money={money} />
          <ProgressBar label={c.opponent} value={c.opponentProgress} target={c.target} money={money} />
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {c.status === 'completed' && c.winner ? (
          <>
            <Trophy className="size-3.5" aria-hidden="true" />
            <span>
              Winner: <span className="font-medium text-foreground">{c.winner}</span>
            </span>
          </>
        ) : (
          <>
            <Timer className="size-3.5" aria-hidden="true" />
            <span>{c.timeLeft}</span>
          </>
        )}
      </div>
    </article>
  )
}

export default function ChallengesPage() {
  const active = challenges.filter((c) => c.status !== 'completed')
  const past = challenges.filter((c) => c.status === 'completed')

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8 md:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Swords className="size-5" aria-hidden="true" />
            <h1 className="text-2xl font-semibold tracking-tight">Challenges</h1>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Head-to-head competition. Beat your rival or get beaten.
          </p>
        </div>
        <Button>
          Challenge someone
        </Button>
      </header>

      {active.length > 0 && (
        <section aria-label="Active challenges">
          <h2 className="mb-3 text-sm font-semibold">Active &amp; Pending</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {active.map((c) => <ChallengeCard key={c.id} c={c} />)}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section aria-label="Completed challenges">
          <h2 className="mb-3 text-sm font-semibold">Past Challenges</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {past.map((c) => <ChallengeCard key={c.id} c={c} />)}
          </div>
        </section>
      )}
    </div>
  )
}
