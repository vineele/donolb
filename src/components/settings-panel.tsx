"use client";

import { useState } from 'react'
import { Settings, X, RotateCcw, Monitor, Layers, Code2, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme, getContrastColor } from '@/context/theme-context'
import { StyleEditor } from '@/components/style-editor'
import { downloadSourceExport } from '@/lib/source-export'
import { cn } from '@/lib/utils'

const ACCENT_PRESETS = [
  // Reds
  { label: 'Red 50',    value: '#fef2f2' },
  { label: 'Red 100',   value: '#fee2e2' },
  { label: 'Red 200',   value: '#fecaca' },
  { label: 'Red 300',   value: '#fca5a5' },
  { label: 'Red 400',   value: '#f87171' },
  { label: 'Red 500',   value: '#ef4444' },
  { label: 'Red 600',   value: '#dc2626' },
  { label: 'Red 700',   value: '#b91c1c' },
  { label: 'Red 800',   value: '#991b1b' },
  { label: 'Red 900',   value: '#7f1d1d' },
  // Oranges
  { label: 'Orange 50',  value: '#fff7ed' },
  { label: 'Orange 100', value: '#ffedd5' },
  { label: 'Orange 200', value: '#fed7aa' },
  { label: 'Orange 300', value: '#fdba74' },
  { label: 'Orange 400', value: '#fb923c' },
  { label: 'Orange 500', value: '#f97316' },
  { label: 'Orange 600', value: '#ea580c' },
  { label: 'Orange 700', value: '#c2410c' },
  { label: 'Orange 800', value: '#9a3412' },
  { label: 'Orange 900', value: '#7c2d12' },
  // Yellows
  { label: 'Yellow 50',  value: '#fefce8' },
  { label: 'Yellow 100', value: '#fef3c7' },
  { label: 'Yellow 200', value: '#fde68a' },
  { label: 'Yellow 300', value: '#fcd34d' },
  { label: 'Yellow 400', value: '#fbbf24' },
  { label: 'Yellow 500', value: '#f59e0b' },
  { label: 'Yellow 600', value: '#d97706' },
  { label: 'Yellow 700', value: '#b45309' },
  { label: 'Yellow 800', value: '#92400e' },
  { label: 'Yellow 900', value: '#78350f' },
  // Greens
  { label: 'Green 50',   value: '#f0fdf4' },
  { label: 'Green 100',  value: '#dcfce7' },
  { label: 'Green 200',  value: '#bbf7d0' },
  { label: 'Green 300',  value: '#86efac' },
  { label: 'Green 400',  value: '#4ade80' },
  { label: 'Green 500',  value: '#22c55e' },
  { label: 'Green 600',  value: '#16a34a' },
  { label: 'Green 700',  value: '#15803d' },
  { label: 'Green 800',  value: '#166534' },
  { label: 'Green 900',  value: '#14532d' },
  // Teals
  { label: 'Teal 50',    value: '#f0fdfa' },
  { label: 'Teal 100',   value: '#ccfbf1' },
  { label: 'Teal 200',   value: '#99f6e4' },
  { label: 'Teal 300',   value: '#5eead4' },
  { label: 'Teal 400',   value: '#2dd4bf' },
  { label: 'Teal 500',   value: '#14b8a6' },
  { label: 'Teal 600',   value: '#0d9488' },
  { label: 'Teal 700',   value: '#0f766e' },
  { label: 'Teal 800',   value: '#134e4a' },
  { label: 'Teal 900',   value: '#0f2f2f' },
  // Cyans
  { label: 'Cyan 50',    value: '#ecf8ff' },
  { label: 'Cyan 100',   value: '#cef6ff' },
  { label: 'Cyan 200',   value: '#a5f3fc' },
  { label: 'Cyan 300',   value: '#67e8f9' },
  { label: 'Cyan 400',   value: '#22d3ee' },
  { label: 'Cyan 500',   value: '#06b6d4' },
  { label: 'Cyan 600',   value: '#0891b2' },
  { label: 'Cyan 700',   value: '#0e7490' },
  { label: 'Cyan 800',   value: '#155e75' },
  { label: 'Cyan 900',   value: '#164e63' },
  // Blues
  { label: 'Blue 50',    value: '#eff6ff' },
  { label: 'Blue 100',   value: '#dbeafe' },
  { label: 'Blue 200',   value: '#bfdbfe' },
  { label: 'Blue 300',   value: '#93c5fd' },
  { label: 'Blue 400',   value: '#60a5fa' },
  { label: 'Blue 500',   value: '#3b82f6' },
  { label: 'Blue 600',   value: '#2563eb' },
  { label: 'Blue 700',   value: '#1d4ed8' },
  { label: 'Blue 800',   value: '#1e40af' },
  { label: 'Blue 900',   value: '#1e3a8a' },
  // Indigos
  { label: 'Indigo 50',  value: '#eef2ff' },
  { label: 'Indigo 100', value: '#e0e7ff' },
  { label: 'Indigo 200', value: '#c7d2fe' },
  { label: 'Indigo 300', value: '#a5b4fc' },
  { label: 'Indigo 400', value: '#818cf8' },
  { label: 'Indigo 500', value: '#6366f1' },
  { label: 'Indigo 600', value: '#4f46e5' },
  { label: 'Indigo 700', value: '#4338ca' },
  { label: 'Indigo 800', value: '#3730a3' },
  { label: 'Indigo 900', value: '#312e81' },
  // Purples
  { label: 'Purple 50',  value: '#faf5ff' },
  { label: 'Purple 100', value: '#f3e8ff' },
  { label: 'Purple 200', value: '#e9d5ff' },
  { label: 'Purple 300', value: '#d8b4fe' },
  { label: 'Purple 400', value: '#c084fc' },
  { label: 'Purple 500', value: '#a855f7' },
  { label: 'Purple 600', value: '#9333ea' },
  { label: 'Purple 700', value: '#7e22ce' },
  { label: 'Purple 800', value: '#6b21a8' },
  { label: 'Purple 900', value: '#581c87' },
  // Pinks
  { label: 'Pink 50',    value: '#fdf2f8' },
  { label: 'Pink 100',   value: '#fce7f3' },
  { label: 'Pink 200',   value: '#fbcfe8' },
  { label: 'Pink 300',   value: '#f8b4d6' },
  { label: 'Pink 400',   value: '#f472b6' },
  { label: 'Pink 500',   value: '#ec4899' },
  { label: 'Pink 600',   value: '#db2777' },
  { label: 'Pink 700',   value: '#be185d' },
  { label: 'Pink 800',   value: '#9d174d' },
  { label: 'Pink 900',   value: '#831843' },
  // Grays & Neutrals
  { label: 'Slate 50',   value: '#f8fafc' },
  { label: 'Slate 100',  value: '#f1f5f9' },
  { label: 'Slate 200',  value: '#e2e8f0' },
  { label: 'Slate 300',  value: '#cbd5e1' },
  { label: 'Slate 400',  value: '#94a3b8' },
  { label: 'Slate 500',  value: '#64748b' },
  { label: 'Slate 600',  value: '#475569' },
  { label: 'Slate 700',  value: '#334155' },
  { label: 'Slate 800',  value: '#1e293b' },
  { label: 'Slate 900',  value: '#0f172a' },
  { label: 'White',      value: '#ffffff' },
]

type Tab = 'background' | 'accent' | 'cards' | 'css'
const SHOW_EXPORT_LINK = process.env.NEXT_PUBLIC_SHOW_EXPORT_LINK !== 'false'

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.477-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.55[...]
    </svg>
  )
}

export function SettingsPanel() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('background')
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState("")

  const {
    accentColor, setAccentColor, resetAccent,
    bgConfig, setBgConfig, resetBg,
    cardConfig, setCardConfig, resetCards,
    customCss, setCustomCss,
  } = useTheme()

  const handleExport = async () => {
    setExporting(true)
    setExportError("")
    try {
      await downloadSourceExport()
    } catch {
      setExportError("Could not create the ZIP. Please try again.")
    } finally {
      setExporting(false)
    }
  }

  const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'background', label: 'Background', icon: Monitor },
    { key: 'accent',     label: 'Accent',     icon: PaletteIcon },
    { key: 'cards',      label: 'Cards',      icon: Layers },
    { key: 'css',        label: 'CSS',        icon: Code2 },
  ]

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}
        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground">
        <Settings className="size-4 shrink-0" />
        Settings
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 flex w-84 flex-col border-r border-white/8 bg-[#0d0915] shadow-2xl"
              style={{ width: '22rem' }}
            >
              {/* Header */}
              <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/6 px-5">
                <div className="flex items-center gap-2">
                  <Settings className="size-4 text-primary" />
                  <span className="text-sm font-semibold">Appearance</span>
                </div>
                <button type="button" onClick={() => setOpen(false)}
                  className="rounded-md p-1.5 text-muted-foreground hover:text-foreground">
                  <X className="size-4" />
                </button>
              </div>

              {/* Tab bar */}
              <div className="flex shrink-0 gap-0.5 border-b border-white/6 px-3 pt-2">
                {TABS.map(t => (
                  <button key={t.key} type="button" onClick={() => setTab(t.key)}
                    className={cn(
                      'flex flex-1 items-center justify-center gap-1 rounded-t-md border-b-2 px-1.5 pb-2 text-[11px] font-medium transition-colors',
                      tab === t.key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground',
                    )}>
                    <t.icon className="size-3" />
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-5 py-5">

                {/* ── BACKGROUND ── */}
                {tab === 'background' && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Site background</p>
                      <button type="button" onClick={resetBg}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                        <RotateCcw className="size-3" /> Reset
                      </button>
                    </div>
                    <StyleEditor value={bgConfig} onChange={setBgConfig} showDefault={false} />
                  </div>
                )}

                {/* ── ACCENT ── */}
                {tab === 'accent' && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Accent colour</p>
                      <button type="button" onClick={resetAccent}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                        <RotateCcw className="size-3" /> Reset
                      </button>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-white/6 bg-white/3 p-4">
                      <div className="relative size-12 shrink-0">
                        <div className="size-12 rounded-full border-2 border-white/10 shadow-xl"
                          style={{ background: accentColor }} />
                        <input type="color" value={accentColor}
                          onChange={e => setAccentColor(e.target.value)}
                          className="absolute inset-0 cursor-pointer opacity-0" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Custom colour</p>
                        <p className="text-xs text-muted-foreground">Click circle to open wheel</p>
                        <p className="mt-0.5 font-mono text-xs text-muted-foreground">{accentColor}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5">
                      {ACCENT_PRESETS.map(p => (
                        <button key={p.value} type="button" onClick={() => setAccentColor(p.value)}
                          className="group flex flex-col items-center gap-0.5 relative"
                          title={p.label}>
                          <div className="size-7 rounded-full border-2 transition-all group-hover:scale-110"
                            style={{
                              background: p.value,
                              borderColor: accentColor === p.value ? '#fff' : 'transparent',
                              boxShadow: accentColor === p.value ? `0 0 0 1px #0d0915, 0 0 0 2px #fff` : undefined,
                            }} />
                          <span className="text-[8px] text-muted-foreground text-center w-full truncate">{p.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="rounded-xl border border-white/6 bg-white/3 p-4 space-y-3">
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Preview</p>
                      <div className="flex items-center gap-2">
                        <div className="flex size-7 items-center justify-center rounded-md text-xs font-bold"
                          style={{ background: accentColor, color: getContrastColor(accentColor) }}>D</div>
                        <span className="text-sm font-semibold">DonoLB</span>
                      </div>
                      <button className="w-full rounded-md py-1.5 text-xs font-semibold"
                        style={{ background: accentColor, color: getContrastColor(accentColor) }}>
                        ♥ Donate
                      </button>
                      <div className="flex items-center gap-2 rounded-md px-2.5 py-2"
                        style={{ background: `${accentColor}18` }}>
                        <div className="size-2 rounded-full" style={{ background: accentColor }} />
                        <span className="text-xs">Active nav item</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── CARDS ── */}
                {tab === 'cards' && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Card &amp; sidebar style</p>
                      <button type="button" onClick={resetCards}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                        <RotateCcw className="size-3" /> Reset
                      </button>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Applied to all cards, the sidebar, and other UI surfaces across the entire site.
                    </p>
                    <StyleEditor value={cardConfig} onChange={setCardConfig} showDefault />
                  </div>
                )}

                {/* ── CUSTOM CSS ── */}
                {tab === 'css' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Custom CSS</p>
                      {customCss && (
                        <button type="button" onClick={() => setCustomCss('')}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                          <RotateCcw className="size-3" /> Clear
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Raw CSS injected into the page. Use any valid CSS — overrides Tailwind styles.
                      Persists across refreshes.
                    </p>
                    <textarea
                      value={customCss}
                      onChange={e => setCustomCss(e.target.value)}
                      spellCheck={false}
                      placeholder={`.glass-target {\n  border-radius: 16px;\n}\n\naside {\n  opacity: 0.9;\n}`}
                      className="h-72 w-full resize-y rounded-lg border border-white/10 bg-black/40 px-3 py-3 font-mono text-[11px] leading-relaxed text-foreground placeholder:text-muted-foregrou[...]
                    />
                    <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                      <p className="text-[11px] text-amber-400/80 leading-relaxed">
                        Custom CSS is powerful — incorrect rules can break the layout. Clear the field to reset.
                      </p>
                    </div>
                  </div>
                )}

              </div>
              {SHOW_EXPORT_LINK && (
                <div className="shrink-0 border-t border-white/6 px-5 py-4">
                  <button
                    type="button"
                    onClick={handleExport}
                    disabled={exporting}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2.5 text-xs font-semibold text-primary transition-colors hov[...]
                  >
                    <Download className="size-3.5" />
                    {exporting ? "Preparing ZIP…" : "Download website ZIP"}
                  </button>
                  <p className="mt-2 text-center text-[10px] leading-relaxed text-muted-foreground">
                    GitHub-ready source export with your current customizations. The download link is removed from the exported copy.
                  </p>
                  {exportError && <p className="mt-2 text-center text-[10px] text-red-400">{exportError}</p>}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
