"use client";

import { BadgeCheck, Users } from 'lucide-react'
import { charities, formatCompact } from '@/lib/data'

export default function CharitiesPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8 md:px-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Verified Charities</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Every organization on DonoLB is verified. Donations are transparently tracked.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {charities.map((charity) => (
          <article key={charity.id} className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="truncate text-sm font-semibold">{charity.name}</h2>
                  {charity.verified && (
                    <BadgeCheck className="size-4 shrink-0 text-primary" aria-label="Verified charity" />
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{charity.category}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{charity.description}</p>
            <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="size-3.5" aria-hidden="true" />
                {charity.supporters.toLocaleString('en-US')} supporters
              </span>
              <span className="font-semibold tabular-nums text-foreground">
                {formatCompact(charity.totalReceived)} raised
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
