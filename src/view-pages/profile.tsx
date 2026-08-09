"use client";

import { useState } from 'react'
import {
  Flame, Trophy, HeartHandshake, Globe, BadgeCheck, Lock,
  Award, Medal, Target, Compass, Pencil, X, Check, Image, Swords,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { currentUser, achievements, signatures, formatMoney } from '@/lib/data'
import { useProfile } from '@/hooks/use-profile'
import { StyleEditor } from '@/components/style-editor'
import { BracketCustomizer } from '@/components/bracket-customizer'
import { getInlineStyle, getEffectStyle, type StyleConfig } from '@/lib/style-config'
import { cn } from '@/lib/utils'

const categoryIcon = {
  milestone: Medal, competition: Trophy, consistency: Flame, exploration: Compass,
} as const

type ProfileTab = 'info' | 'bracket'

// ── Banner with effects ─────────────────────────────────────────────────────
function BannerDisplay({ banner }: { banner: StyleConfig }) {
  const bgStyle   = getInlineStyle(banner)
  const glowStyle = getEffectStyle(banner)
  const hasCustomBg = banner.bgType !== 'default'

  return (
    <div className="relative h-24 overflow-hidden" style={glowStyle}>
      {/* Base background */}
      {hasCustomBg ? (
        <div
          className={cn('absolute inset-0', banner.effect === 'animated-gradient' && 'effect-gradient-pan')}
          style={bgStyle}
        />
      ) : (
        <div className="absolute inset-0 bg-secondary" />
      )}
      {/* Holographic overlay */}
      {banner.effect === 'holographic' && (
        <div
          className="effect-holo-overlay pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
          style={{ background: `linear-gradient(135deg, ${banner.holoColor}66, #3a86ff66, #06d6a066, ${banner.holoColor}66, #ff006066)` }}
        />
      )}
      {/* Aurora overlay */}
      {banner.effect === 'aurora' && (
        <div
          className="effect-aurora-overlay pointer-events-none absolute inset-0 opacity-50 mix-blend-screen"
          style={{ background: `linear-gradient(0deg, transparent, ${banner.auroraColor}55, ${banner.auroraColor}88, transparent)` }}
        />
      )}
      {/* Shimmer */}
      {banner.effect === 'shimmer' && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 -skew-x-12"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 50%, transparent)' }}
            animate={{ x: ['-120%', '220%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
          />
        </div>
      )}
      {/* Image readability overlay */}
      {banner.bgType === 'image' && banner.imgUrl && (
        <div className="pointer-events-none absolute inset-0 bg-black/30" />
      )}
    </div>
  )
}

export default function ProfilePage() {
  const { profile, setProfile } = useProfile()
  const [editing, setEditing]     = useState(false)
  const [draft, setDraft]         = useState({ ...profile })
  const [profileTab, setProfileTab] = useState<ProfileTab>('info')

  const goal     = 10_000
  const progress = Math.min(100, Math.round((currentUser.totalDonated / goal) * 100))

  const saveEdits   = () => { setProfile({ ...draft }); setEditing(false) }
  const cancelEdits = () => { setDraft({ ...profile }); setEditing(false) }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8 md:px-8">

      {/* Profile header */}
      <header className="overflow-hidden rounded-xl border border-border bg-card glass-target">
        <BannerDisplay banner={profile.banner} />
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="-mt-14 relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-card bg-secondary text-xl font-semibold">
              {profile.avatarUrl
                ? <img src={profile.avatarUrl} alt={profile.username} className="h-full w-full object-cover" />
                : profile.username.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">{profile.username}</h1>
              <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{profile.bio}&rdquo;</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="size-4" />
              Global Rank <span className="font-semibold text-foreground">#{currentUser.globalRank}</span>
            </div>
            <button type="button"
              onClick={() => { setDraft({ ...profile }); setEditing(true) }}
              className="flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              <Pencil className="size-3" /> Edit Profile
            </button>
          </div>
        </div>
      </header>

      {/* Edit profile panel */}
      <AnimatePresence>
        {editing && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-xl border border-primary/30 bg-card"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Customize Profile</h2>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={cancelEdits}
                    className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground border border-border">
                    <X className="size-3" /> Cancel
                  </button>
                  <button type="button" onClick={saveEdits}
                    className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium bg-primary text-primary-foreground hover:opacity-90">
                    <Check className="size-3" /> Save
                  </button>
                </div>
              </div>

              {/* Avatar URL */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <Image className="size-3" /> Avatar / GIF URL
                </label>
                <input type="url" value={draft.avatarUrl}
                  onChange={e => setDraft(d => ({ ...d, avatarUrl: e.target.value }))}
                  placeholder="Paste a GIF from Tenor/Giphy or any image URL…"
                  className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                <p className="mt-1 text-xs text-muted-foreground">
                  Tenor / Giphy: right-click GIF → Copy image address → paste here.
                </p>
                {draft.avatarUrl && (
                  <div className="mt-2 flex items-center gap-3">
                    <div className="size-12 overflow-hidden rounded-full border border-border bg-secondary">
                      <img src={draft.avatarUrl} alt="preview" className="h-full w-full object-cover" />
                    </div>
                    <span className="text-xs text-muted-foreground">Preview (also shows on leaderboard)</span>
                  </div>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Username</label>
                <input type="text" value={draft.username} onChange={e => setDraft(d => ({ ...d, username: e.target.value }))} maxLength={32}
                  className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>

              {/* Bio */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Bio</label>
                <textarea value={draft.bio} onChange={e => setDraft(d => ({ ...d, bio: e.target.value }))} maxLength={120} rows={2}
                  className="w-full resize-none rounded-md border border-border bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>

              {/* Banner */}
              <div>
                <label className="mb-3 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Banner Style</label>
                {/* Live preview */}
                <div className="mb-3 overflow-hidden rounded-lg border border-white/10">
                  <BannerDisplay banner={draft.banner} />
                </div>
                <StyleEditor
                  value={draft.banner}
                  onChange={updates => setDraft(d => ({ ...d, banner: { ...d.banner, ...updates } }))}
                  showDefault
                />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex border-b border-border gap-1">
        {([
          { key: 'info',    label: 'Stats & Achievements', icon: Trophy },
          { key: 'bracket', label: 'My Bracket',           icon: Swords },
        ] as { key: ProfileTab; label: string; icon: React.ElementType }[]).map(t => (
          <button key={t.key} type="button" onClick={() => setProfileTab(t.key)}
            className={cn(
              'flex items-center gap-2 border-b-2 px-4 pb-3 text-sm font-medium transition-colors',
              profileTab === t.key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground',
            )}>
            <t.icon className="size-4" />{t.label}
          </button>
        ))}
      </div>

      {/* Stats tab */}
      {profileTab === 'info' && (
        <>
          <section aria-label="Donation statistics" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { label: 'Total donated',  value: formatMoney(currentUser.totalDonated), icon: HeartHandshake },
              { label: 'Donations',      value: String(currentUser.donationCount),      icon: Award },
              { label: 'Day streak',     value: `${currentUser.streak}`,               icon: Flame },
              { label: 'Challenges won', value: `${currentUser.challengesWon}`,         icon: Trophy },
            ].map(stat => (
              <div key={stat.label} className="rounded-lg border border-border bg-card glass-target p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <stat.icon className="size-4" />
                  <p className="text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                </div>
                <p className="mt-2 text-xl font-semibold tabular-nums">{stat.value}</p>
              </div>
            ))}
          </section>

          <section aria-label="Donation goal" className="rounded-lg border border-border bg-card glass-target p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="size-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold">Next milestone</h2>
              </div>
              <span className="text-sm font-semibold tabular-nums">
                {formatMoney(currentUser.totalDonated)} / {formatMoney(goal)}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{progress}% to $10,000 donated</p>
          </section>

          <section aria-label="Achievements">
            <h2 className="mb-3 text-sm font-semibold">Achievements</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {achievements.map(a => {
                const Icon = categoryIcon[a.category]
                return (
                  <div key={a.id} className={cn('flex items-start gap-3 rounded-lg border p-4 glass-target', a.earned ? 'border-border bg-card' : 'border-border/50 bg-card/50 opacity-50')}>
                    <div className={cn('flex size-8 shrink-0 items-center justify-center rounded-full', a.earned ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground')}>
                      {a.earned ? <Icon className="size-4" /> : <Lock className="size-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{a.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{a.description}</p>
                    </div>
                    {a.earned && <BadgeCheck className="size-4 shrink-0 text-primary" />}
                  </div>
                )
              })}
            </div>
          </section>

          <section aria-label="Wall of signatures">
            <h2 className="mb-3 text-sm font-semibold">Wall of Signatures</h2>
            <div className="flex flex-col gap-2">
              {signatures.map(s => (
                <div key={s.id} className="flex items-start gap-3 rounded-lg border border-border bg-card glass-target p-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold">{s.name[0]}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium">{s.name}</p>
                      {s.verified && <BadgeCheck className="size-3.5 text-primary" />}
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">&ldquo;{s.message}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Bracket tab */}
      {profileTab === 'bracket' && (
        <section>
          <div className="mb-4">
            <h2 className="text-sm font-semibold">Bracket Customization</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Customize how your row looks on the leaderboard. Changes apply live across the site.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card glass-target p-5">
            <BracketCustomizer />
          </div>
        </section>
      )}
    </div>
  )
}
