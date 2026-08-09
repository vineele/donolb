"use client";

'use client'

import { useState } from 'react'
import { Heart, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { causes } from '@/lib/data'
import { cn } from '@/lib/utils'

const presets = [10, 25, 50, 100, 250, 500]

export function DonateDialog() {
  const [open, setOpen] = useState(false)
  const [cause, setCause] = useState<string | null>(null)
  const [amount, setAmount] = useState<number | null>(null)
  const [custom, setCustom] = useState('')
  const [done, setDone] = useState(false)

  const effectiveAmount = custom ? Number(custom) : amount

  function reset() {
    setOpen(false)
    setDone(false)
    setCause(null)
    setAmount(null)
    setCustom('')
  }

  return (
    <>
      <Button className="w-full gap-2" onClick={() => setOpen(true)}>
        <Heart className="size-4" aria-hidden="true" />
        Donate
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Make a donation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            onClick={reset}
            aria-label="Close dialog"
          />
          <div className="relative z-10 flex max-h-[85svh] w-full max-w-md flex-col overflow-y-auto rounded-xl border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  {done ? 'Donation submitted' : 'Make a donation'}
                </h2>
                {!done && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Pick a cause and an amount. Verified donations count toward your rank.
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={reset}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {done ? (
              <div className="mt-6 flex flex-col items-center gap-3 py-6 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-6" aria-hidden="true" />
                </div>
                <p className="text-pretty text-sm text-muted-foreground">
                  {'This is a frontend preview. Payments and verification will be wired up with the backend.'}
                </p>
                <Button variant="secondary" onClick={reset} className="mt-2">
                  Back to DonoLB
                </Button>
              </div>
            ) : (
              <>
                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Cause
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {causes.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCause(c)}
                      className={cn(
                        'rounded-md border px-3 py-2 text-left text-xs font-medium transition-colors',
                        cause === c
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-secondary/50 text-foreground hover:bg-secondary',
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Amount
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {presets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setAmount(p)
                        setCustom('')
                      }}
                      className={cn(
                        'rounded-md border px-3 py-2 text-sm font-medium transition-colors',
                        amount === p && !custom
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-secondary/50 hover:bg-secondary',
                      )}
                    >
                      ${p}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  placeholder="Custom amount"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  className="mt-2 w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Custom donation amount in dollars"
                />

                <Button
                  className="mt-5 w-full"
                  disabled={!cause || !effectiveAmount || effectiveAmount <= 0}
                  onClick={() => setDone(true)}
                >
                  {cause && effectiveAmount && effectiveAmount > 0
                    ? `Donate $${effectiveAmount.toLocaleString('en-US')} to ${cause}`
                    : 'Select a cause and amount'}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
