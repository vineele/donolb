import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/context/theme-context"
import { BracketProvider } from "@/context/bracket-context"
import { AppShell } from "@/components/app-shell"

export const metadata: Metadata = {
  title: "DonoLB — Donation Leaderboard",
  description: "A competitive philanthropy platform for tracking verified donations.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <BracketProvider>
            <div id="donolb-bg-overlay" aria-hidden="true" style={{ pointerEvents: "none" }} />
            <AppShell>{children}</AppShell>
          </BracketProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
