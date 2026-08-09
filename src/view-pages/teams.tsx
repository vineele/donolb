"use client";

import { Users, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { teams, formatMoney } from '@/lib/data'

export default function TeamsPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8 md:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Teams</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Fundraise together. Schools, communities, companies, friend groups.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" aria-hidden="true" />
          Create Team
        </Button>
      </header>

      <ol className="flex flex-col gap-3" aria-label="Team leaderboard">
        {teams.map((team) => {
          const pct = Math.min(100, Math.round((team.totalRaised / team.goal) * 100))
          return (
            <li key={team.id} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-start gap-4">
                <span className="w-6 pt-1 text-center text-sm font-semibold tabular-nums text-muted-foreground">
                  {team.rank}
                </span>
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-semibold">
                  {team.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-sm font-semibold">{team.name}</h2>
                    <span className="text-sm font-semibold tabular-nums">
                      {formatMoney(team.totalRaised)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {team.description}
                  </p>
                  <div
                    className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary"
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${team.name} fundraising progress`}
                  >
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="size-3.5" aria-hidden="true" />
                      {team.members} members
                    </span>
                    <span className="tabular-nums">
                      {pct}% of {formatMoney(team.goal)} goal
                    </span>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
