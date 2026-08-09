"use client";

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Trophy,
  Activity,
  Swords,
  Users,
  HeartHandshake,
  Crown,
  User,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { DonateDialog } from '@/components/donate-dialog'
import { SettingsPanel } from '@/components/settings-panel'
import { useProfile } from '@/hooks/use-profile'

const navItems = [
  { href: '/', label: 'Leaderboards', icon: Trophy },
  { href: '/feed', label: 'Live Feed', icon: Activity },
  { href: '/challenges', label: 'Challenges', icon: Swords },
  { href: '/teams', label: 'Teams', icon: Users },
  { href: '/charities', label: 'Charities', icon: HeartHandshake },
  { href: '/hall-of-fame', label: 'Hall of Fame', icon: Crown },
  { href: '/profile', label: 'My Profile', icon: User },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const location = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { profile } = useProfile()

  const avatarContent = profile.avatarUrl ? (
    <img
      src={profile.avatarUrl}
      alt={profile.username}
      className="h-full w-full rounded-full object-cover"
    />
  ) : (
    <span className="text-xs font-semibold text-secondary-foreground">
      {profile.username.slice(0, 2).toUpperCase()}
    </span>
  )

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Main navigation">
      {navItems.map((item) => {
        const active = location === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
            )}
            aria-current={active ? 'page' : undefined}
          >
            <item.icon className="size-4 shrink-0" aria-hidden="true" />
            {item.label}
          </Link>
        )
      })}
      <div className="mt-1">
        <SettingsPanel />
      </div>
    </nav>
  )

  const userFooter = (onClick?: () => void) => (
    <div className="border-t border-sidebar-border p-4">
      <Link href="/profile" onClick={onClick} className="flex items-center gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary overflow-hidden">
          {avatarContent}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-sidebar-foreground">{profile.username}</p>
          <p className="truncate text-xs text-muted-foreground">Global Rank #452</p>
        </div>
      </Link>
    </div>
  )

  return (
    <div className="flex min-h-svh">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-14 items-center gap-2 px-5">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            D
          </div>
          <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
            DonoLB
          </span>
        </div>
        <div className="px-3 pb-4">
          <DonateDialog />
        </div>
        {nav}
        {userFooter()}
      </aside>

      {/* Mobile header */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-sidebar-border bg-sidebar px-4 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            D
          </div>
          <span className="text-sm font-semibold tracking-tight">DonoLB</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 text-muted-foreground hover:text-foreground"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-sidebar-border bg-sidebar">
            <div className="flex h-14 items-center gap-2 px-5">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
                D
              </div>
              <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
                DonoLB
              </span>
            </div>
            <div className="px-3 pb-4">
              <DonateDialog />
            </div>
            {nav}
            {userFooter(() => setMobileOpen(false))}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-60">
        <main className="flex-1 pt-14 md:pt-0">
          {children}
        </main>
      </div>
    </div>
  )
}
