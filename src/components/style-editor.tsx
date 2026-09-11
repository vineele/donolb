"use client";

/**
 * Reusable style editor — used in Settings (background / cards), Profile (banner), and
 * the bracket inline editor. Pass `showDefault` to include a "None" bg option.
 */
import { Image } from 'lucide-react'
import { type StyleConfig, type StyleBgType, type StyleEffect, getInlineStyle } from '@/lib/style-config'
import { cn } from '@/lib/utils'

interface StyleEditorProps {
  value: StyleConfig
  onChange: (updates: Partial<StyleConfig>) => void
  showDefault?: boolean   // include "None / Default" bg option
  compact?: boolean       // tighter layout for inline editors
}

const BG_TYPES: { key: StyleBgType; label: string }[] = [
  { key: 'default',  label: 'None' },
  { key: 'solid',    label: 'Colour' },
  { key: 'gradient', label: 'Gradient' },
]

const EFFECTS: { key: StyleEffect; label: string; description: string; color: string }[] = [
  { key: 'none',              label: 'None',            description: 'Clean, no effect',         color: '#555'    },
  { key: 'shimmer',           label: '✦ Shimmer',       description: 'Moving light sweep',        color: '#e2e8f0' },
  { key: 'glow',              label: '◉ Glow',          description: 'Pulsing outer glow',        color: '#a855f7' },
  { key: 'holographic',       label: '◈ Holographic',   description: 'Rainbow iridescent shine',  color: '#3a86ff' },
  { key: 'neon',              label: '⬡ Neon',          description: 'Bright neon border pulse',  color: '#06d6a0' },
  { key: 'aurora',            label: '❋ Aurora',        description: 'Animated aurora borealis',  color: '#00c3ff' },
  { key: 'animated-gradient', label: '◐ Animated Grad', description: 'Flowing gradient bg',       color: '#f97316' },
]

const GRAD_DIRS = [
  { value: '90deg',  label: '→' },
  { value: '135deg', label: '↘' },
  { value: '180deg', label: '↓' },
  { value: '45deg',  label: '↗' },
  { value: '225deg', label: '↙' },
]

function Swatch({ value, onChange, label }: { value: string; onChange: (v: string) => void; label?: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <div className="relative size-7 shrink-0">
        <div className="size-7 rounded-full border border-white/20 shadow" style={{ background: value }} />
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0" />
      </div>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </label>
  )
}

export function StyleEditor({ value: cfg, onChange, showDefault = true, compact = false }: StyleEditorProps) {
  const bgTypes = showDefault ? BG_TYPES : BG_TYPES.filter(t => t.key !== 'default')

  // Preview swatch for the background section header
  const previewStyle = getInlineStyle(cfg)
  const hasPreview = cfg.bgType !== 'default'

  return (
    <div className={cn('space-y-5', compact && 'space-y-4')}>

      {/* ── Background type ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Background</p>
          {hasPreview && (
            <div className="h-4 w-10 rounded-sm border border-white/10" style={previewStyle} />
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {bgTypes.map(t => (
            <button key={t.key} type="button" onClick={() => onChange({ bgType: t.key })}
              className={cn(
                'rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors',
                cfg.bgType === t.key
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-white/10 text-muted-foreground hover:text-foreground',
              )}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Solid colour */}
        {cfg.bgType === 'solid' && (
          <Swatch value={cfg.bgColor} onChange={v => onChange({ bgColor: v })} label="Pick colour" />
        )}

        {/* Gradient */}
        {cfg.bgType === 'gradient' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Swatch value={cfg.gradFrom} onChange={v => onChange({ gradFrom: v })} />
              <div className="h-2 flex-1 rounded-full border border-white/10"
                style={{ background: `linear-gradient(90deg, ${cfg.gradFrom}, ${cfg.gradTo})` }} />
              <Swatch value={cfg.gradTo} onChange={v => onChange({ gradTo: v })} />
            </div>
            <div className="flex gap-1">
              {GRAD_DIRS.map(d => (
                <button key={d.value} type="button" onClick={() => onChange({ gradDir: d.value })}
                  className={cn(
                    'flex-1 rounded border py-0.5 text-[11px] transition-colors',
                    cfg.gradDir === d.value
                      ? 'border-primary text-primary'
                      : 'border-white/10 text-muted-foreground hover:text-foreground',
                  )}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Effect ── */}
      <div className="space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Effect</p>
        <div className="flex flex-col gap-1.5">
          {EFFECTS.map(ef => (
            <button key={ef.key} type="button" onClick={() => onChange({ effect: ef.key })}
              className={cn(
                'flex items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors',
                cfg.effect === ef.key
                  ? 'border-primary/60 bg-primary/8'
                  : 'border-border hover:border-border/60 hover:bg-secondary/40',
              )}>
              <div className="size-3 shrink-0 rounded-full"
                style={{ background: ef.color, boxShadow: cfg.effect === ef.key ? `0 0 8px ${ef.color}` : undefined }} />
              <div className="min-w-0">
                <p className="text-xs font-medium">{ef.label}</p>
                <p className="text-[11px] text-muted-foreground">{ef.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Effect-specific color pickers */}
        {cfg.effect === 'glow' && (
          <Swatch value={cfg.glowColor} onChange={v => onChange({ glowColor: v })} label="Glow colour" />
        )}
        {cfg.effect === 'neon' && (
          <Swatch value={cfg.borderColor || '#06d6a0'} onChange={v => onChange({ borderColor: v })} label="Neon colour" />
        )}
        {cfg.effect === 'holographic' && (
          <Swatch value={cfg.holoColor} onChange={v => onChange({ holoColor: v })} label="Primary holo tint" />
        )}
        {cfg.effect === 'aurora' && (
          <Swatch value={cfg.auroraColor} onChange={v => onChange({ auroraColor: v })} label="Aurora colour" />
        )}
        {cfg.effect === 'animated-gradient' && cfg.bgType !== 'gradient' && (
          <p className="text-[10px] text-amber-400/80">Switch background to Gradient to use Pulse effect.</p>
        )}
      </div>
    </div>
  )
}
