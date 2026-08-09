"use client";

import { RotateCcw } from 'lucide-react'
import { useBracket } from '@/context/bracket-context'
import { StyleEditor } from '@/components/style-editor'
import { BracketRow } from '@/components/bracket-row'

export function BracketCustomizer() {
  const { bracket, setBracket, resetBracket } = useBracket()

  return (
    <div className="space-y-6">
      {/* Live preview */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live preview</p>
        <div className="overflow-hidden rounded-lg border border-border bg-secondary/30 p-3">
          <BracketRow
            rank={1}
            initials="RO"
            username="RolBakool"
            verified
            donationCount={87}
            country="NL"
            streak={62}
            amount="$3,420"
            isCurrentUser
          />
        </div>
      </div>

      {/* Editor */}
      <StyleEditor value={bracket} onChange={setBracket} showDefault />

      {/* Reset */}
      <button type="button" onClick={resetBracket}
        className="flex w-full items-center justify-center gap-1.5 rounded-md border border-border py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <RotateCcw className="size-3" /> Reset to default
      </button>
    </div>
  )
}
