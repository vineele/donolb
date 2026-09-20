"use client";

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Leaderboard } from '@/components/leaderboard'
import { DonationFeed } from '@/components/donation-feed'
import { feedItems, communityTotal, users } from '@/lib/data'

export default function HomePage() {
  const totalDonations = users.reduce((sum, u) => sum + u.donationCount, 0)

  return (
    <div className="lb-page-shell mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:px-8">
      <header className="lb-page-header flex flex-col gap-1">
        <h1 className="text-balance text-2xl font-semibold tracking-tight">Leaderboards</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Status comes from giving. Only verified donations count.
        </p>
      </header>

      <div className="lb-page-stats grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Community total
          </p>
          <p className="mt-1 text-xl font-semibold tabular-nums">
            ${communityTotal.toLocaleString('en-US')}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Verified donations
          </p>
          <p className="mt-1 text-xl font-semibold tabular-nums">
            {totalDonations.toLocaleString('en-US')}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Your global rank
          </p>
          <p className="mt-1 text-xl font-semibold tabular-nums">#452</p>
        </div>
      </div>

      <div className="lb-page-content grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        <Leaderboard />

        <aside className="lb-page-feed flex flex-col gap-3" aria-label="Live activity">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Live Feed</h2>
            <Link
              href="/feed"
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              View all
              <ArrowRight className="size-3" aria-hidden="true" />
            </Link>
          </div>
          <DonationFeed items={feedItems.slice(0, 6)} compact />
        </aside>
      </div>
    </div>
  )
}
