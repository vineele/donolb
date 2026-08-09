"use client";

import { DonationFeed } from '@/components/donation-feed'

export default function FeedPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8 md:px-8">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">Live Feed</h1>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Real-time verified donation activity across DonoLB.
        </p>
      </header>

      <DonationFeed />
    </div>
  )
}
