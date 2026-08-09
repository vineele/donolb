"use client";

export type LeaderboardPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all-time'

export type BracketBgType = 'default' | 'solid' | 'gradient' | 'image'
export type BracketEffect = 'none' | 'shimmer' | 'glow' | 'holographic' | 'neon' | 'aurora' | 'animated-gradient'

export interface BracketStyle {
  bgType: BracketBgType
  bgColor?: string
  gradFrom?: string
  gradTo?: string
  gradDir?: string
  imgUrl?: string
  effect: BracketEffect
  glowColor?: string
  borderColor?: string
}

export interface User {
  id: string
  username: string
  initials: string
  bio: string
  country: string
  verified: boolean
  anonymous?: boolean
  totalDonated: number
  donationCount: number
  streak: number
  challengesWon: number
  globalRank: number
  favoriteCause: string
  amounts: Record<LeaderboardPeriod, number>
  bracketStyle?: BracketStyle
}

export interface FeedItem {
  id: string
  user: string
  action: string
  amount?: number
  target: string
  time: string
  type: 'donation' | 'milestone' | 'achievement' | 'challenge'
}

export interface Challenge {
  id: string
  challenger: string
  opponent: string
  type: string
  goal: string
  challengerProgress: number
  opponentProgress: number
  target: number
  timeLeft: string
  status: 'active' | 'pending' | 'completed'
  winner?: string
}

export interface Team {
  id: string
  name: string
  initials: string
  members: number
  totalRaised: number
  goal: number
  rank: number
  description: string
}

export interface Charity {
  id: string
  name: string
  category: string
  verified: boolean
  totalReceived: number
  supporters: number
  description: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  earned: boolean
  category: 'milestone' | 'competition' | 'consistency' | 'exploration'
}

export const causes = [
  'Ocean Cleanup',
  'Forest Restoration',
  'Cancer Research',
  'Hunger Relief',
  "Children's Hospitals",
  'Mental Health',
  'Wildlife Conservation',
  'Homelessness',
  'Education',
  'Disaster Relief',
  'Clean Water',
  'Medical Research',
]

export const users: User[] = [
  {
    id: 'u1',
    username: 'AnonymousHero',
    initials: 'AH',
    bio: 'Impact over identity.',
    country: '—',
    verified: true,
    anonymous: true,
    totalDonated: 1_200_000,
    donationCount: 214,
    streak: 365,
    challengesWon: 0,
    globalRank: 1,
    favoriteCause: 'Disaster Relief',
    amounts: { daily: 5000, weekly: 32000, monthly: 118000, yearly: 640000, 'all-time': 1_200_000 },
  },
  {
    id: 'u2',
    username: 'MayaGives',
    initials: 'MG',
    bio: 'Every dollar plants a seed.',
    country: 'CA',
    verified: true,
    totalDonated: 842_500,
    donationCount: 512,
    streak: 218,
    challengesWon: 31,
    globalRank: 2,
    favoriteCause: 'Forest Restoration',
    amounts: { daily: 1200, weekly: 9800, monthly: 41000, yearly: 322000, 'all-time': 842_500 },
  },
  {
    id: 'u3',
    username: 'AlexTheKind',
    initials: 'AK',
    bio: 'Racing to the top for clean water.',
    country: 'US',
    verified: true,
    totalDonated: 610_200,
    donationCount: 389,
    streak: 145,
    challengesWon: 24,
    globalRank: 3,
    favoriteCause: 'Clean Water',
    amounts: { daily: 2400, weekly: 11200, monthly: 38500, yearly: 290000, 'all-time': 610_200 },
  },
  {
    id: 'u4',
    username: 'NoahImpact',
    initials: 'NI',
    bio: 'Weekly leaderboard is my home.',
    country: 'UK',
    verified: false,
    totalDonated: 402_800,
    donationCount: 267,
    streak: 89,
    challengesWon: 18,
    globalRank: 4,
    favoriteCause: 'Hunger Relief',
    amounts: { daily: 800, weekly: 14500, monthly: 29000, yearly: 201000, 'all-time': 402_800 },
  },
  {
    id: 'u5',
    username: 'SaraShines',
    initials: 'SS',
    bio: 'Mental health matters, always.',
    country: 'SE',
    verified: true,
    totalDonated: 318_400,
    donationCount: 720,
    streak: 302,
    challengesWon: 12,
    globalRank: 5,
    favoriteCause: 'Mental Health',
    amounts: { daily: 450, weekly: 3900, monthly: 17800, yearly: 152000, 'all-time': 318_400 },
  },
  {
    id: 'u6',
    username: 'RolBakool',
    initials: 'RB',
    bio: 'Helping clean oceans.',
    country: 'NL',
    verified: false,
    totalDonated: 3_420,
    donationCount: 87,
    streak: 62,
    challengesWon: 14,
    globalRank: 452,
    favoriteCause: 'Ocean Cleanup',
    amounts: { daily: 20, weekly: 140, monthly: 480, yearly: 2900, 'all-time': 3_420 },
  },
  {
    id: 'u7',
    username: 'JinCares',
    initials: 'JC',
    bio: 'Education changes everything.',
    country: 'KR',
    verified: false,
    totalDonated: 254_100,
    donationCount: 198,
    streak: 44,
    challengesWon: 9,
    globalRank: 6,
    favoriteCause: 'Education',
    amounts: { daily: 300, weekly: 5200, monthly: 21400, yearly: 128000, 'all-time': 254_100 },
  },
  {
    id: 'u8',
    username: 'LenaWilds',
    initials: 'LW',
    bio: 'For the elephants.',
    country: 'DE',
    verified: true,
    totalDonated: 197_600,
    donationCount: 156,
    streak: 121,
    challengesWon: 7,
    globalRank: 7,
    favoriteCause: 'Wildlife Conservation',
    amounts: { daily: 950, weekly: 4100, monthly: 15600, yearly: 99000, 'all-time': 197_600 },
  },
  {
    id: 'u9',
    username: 'OmarHopes',
    initials: 'OH',
    bio: 'Small gifts, big impact.',
    country: 'AE',
    verified: false,
    totalDonated: 152_300,
    donationCount: 604,
    streak: 200,
    challengesWon: 22,
    globalRank: 8,
    favoriteCause: "Children's Hospitals",
    amounts: { daily: 150, weekly: 2800, monthly: 12100, yearly: 84000, 'all-time': 152_300 },
  },
  {
    id: 'u10',
    username: 'EvaBuilds',
    initials: 'EB',
    bio: 'Housing is a human right.',
    country: 'FR',
    verified: false,
    totalDonated: 121_900,
    donationCount: 143,
    streak: 15,
    challengesWon: 4,
    globalRank: 9,
    favoriteCause: 'Homelessness',
    amounts: { daily: 600, weekly: 3300, monthly: 9800, yearly: 71000, 'all-time': 121_900 },
  },
]

export const currentUser = users.find((u) => u.username === 'RolBakool')!

export const feedItems: FeedItem[] = [
  { id: 'f1', user: 'AlexTheKind', action: 'donated', amount: 100, target: 'Clean Water Fund', time: '12s ago', type: 'donation' },
  { id: 'f2', user: 'MayaGives', action: 'donated', amount: 500, target: 'Forest Restoration Fund', time: '1m ago', type: 'donation' },
  { id: 'f3', user: 'Team Phoenix', action: 'reached', target: '$50,000 donated', time: '3m ago', type: 'milestone' },
  { id: 'f4', user: 'AnonymousHero', action: 'donated', amount: 10000, target: 'Disaster Relief Race', time: '8m ago', type: 'donation' },
  { id: 'f5', user: 'NoahImpact', action: 'won a challenge against', target: 'JinCares', time: '15m ago', type: 'challenge' },
  { id: 'f6', user: 'SaraShines', action: 'earned', target: '300-Day Streak badge', time: '22m ago', type: 'achievement' },
  { id: 'f7', user: 'OmarHopes', action: 'donated', amount: 25, target: "Children's Hospitals Network", time: '31m ago', type: 'donation' },
  { id: 'f8', user: 'LenaWilds', action: 'donated', amount: 250, target: 'Wildlife Rescue Alliance', time: '44m ago', type: 'donation' },
  { id: 'f9', user: 'RolBakool', action: 'donated', amount: 20, target: 'Ocean Cleanup Project', time: '1h ago', type: 'donation' },
  { id: 'f10', user: 'EvaBuilds', action: 'earned', target: 'Supported 10 Causes badge', time: '2h ago', type: 'achievement' },
]

export const challenges: Challenge[] = [
  {
    id: 'c1',
    challenger: 'RolBakool',
    opponent: 'NoahImpact',
    type: 'First to Amount',
    goal: 'First to $750',
    challengerProgress: 480,
    opponentProgress: 615,
    target: 750,
    timeLeft: '2d 14h',
    status: 'active',
  },
  {
    id: 'c2',
    challenger: 'MayaGives',
    opponent: 'AlexTheKind',
    type: 'Highest Donation',
    goal: 'Most donated in 7 days',
    challengerProgress: 9800,
    opponentProgress: 11200,
    target: 15000,
    timeLeft: '4d 2h',
    status: 'active',
  },
  {
    id: 'c3',
    challenger: 'JinCares',
    opponent: 'RolBakool',
    type: 'Speed Challenge',
    goal: 'Raise $500 within 24 hours',
    challengerProgress: 0,
    opponentProgress: 0,
    target: 500,
    timeLeft: 'Awaiting response',
    status: 'pending',
  },
  {
    id: 'c4',
    challenger: 'SaraShines',
    opponent: 'OmarHopes',
    type: 'Most Donations',
    goal: 'Most donations in 30 days',
    challengerProgress: 42,
    opponentProgress: 51,
    target: 60,
    timeLeft: 'Ended',
    status: 'completed',
    winner: 'OmarHopes',
  },
  {
    id: 'c5',
    challenger: 'RolBakool',
    opponent: 'EvaBuilds',
    type: 'Unique Charities',
    goal: 'Most unique charities in 14 days',
    challengerProgress: 8,
    opponentProgress: 5,
    target: 10,
    timeLeft: 'Ended',
    status: 'completed',
    winner: 'RolBakool',
  },
]

export const teams: Team[] = [
  { id: 't1', name: 'Team Phoenix', initials: 'TP', members: 128, totalRaised: 52_400, goal: 100_000, rank: 1, description: 'Rising together for disaster relief worldwide.' },
  { id: 't2', name: 'Ocean Guardians', initials: 'OG', members: 86, totalRaised: 38_900, goal: 50_000, rank: 2, description: 'A crew dedicated to cleaning our oceans.' },
  { id: 't3', name: 'Northside High', initials: 'NH', members: 214, totalRaised: 21_300, goal: 25_000, rank: 3, description: 'Students fundraising for local children\u2019s hospitals.' },
  { id: 't4', name: 'DevsForGood', initials: 'DG', members: 452, totalRaised: 19_750, goal: 40_000, rank: 4, description: 'Developer community donating for education access.' },
  { id: 't5', name: 'Green Circle', initials: 'GC', members: 67, totalRaised: 12_100, goal: 20_000, rank: 5, description: 'Forest restoration, one tree at a time.' },
]

export const charities: Charity[] = [
  { id: 'ch1', name: 'Ocean Cleanup Project', category: 'Ocean Cleanup', verified: true, totalReceived: 4_820_000, supporters: 38_200, description: 'Removing plastic from the world\u2019s oceans and rivers.' },
  { id: 'ch2', name: 'Clean Water Fund', category: 'Clean Water', verified: true, totalReceived: 3_910_000, supporters: 29_400, description: 'Bringing safe drinking water to communities in need.' },
  { id: 'ch3', name: 'Forest Restoration Fund', category: 'Forest Restoration', verified: true, totalReceived: 3_240_000, supporters: 25_100, description: 'Reforesting degraded land across five continents.' },
  { id: 'ch4', name: "Children's Hospitals Network", category: "Children's Hospitals", verified: true, totalReceived: 2_870_000, supporters: 41_800, description: 'Funding care and research for pediatric hospitals.' },
  { id: 'ch5', name: 'Global Hunger Relief', category: 'Hunger Relief', verified: true, totalReceived: 2_410_000, supporters: 33_600, description: 'Delivering meals and food security programs worldwide.' },
  { id: 'ch6', name: 'Minds Matter Foundation', category: 'Mental Health', verified: true, totalReceived: 1_960_000, supporters: 22_900, description: 'Expanding access to mental health support for all.' },
  { id: 'ch7', name: 'Wildlife Rescue Alliance', category: 'Wildlife Conservation', verified: true, totalReceived: 1_540_000, supporters: 18_700, description: 'Protecting endangered species and their habitats.' },
  { id: 'ch8', name: 'Shelter First', category: 'Homelessness', verified: true, totalReceived: 1_120_000, supporters: 15_300, description: 'Housing-first programs in over 40 cities.' },
]

export const achievements: Achievement[] = [
  { id: 'a1', name: 'First Donation', description: 'Make your first verified donation', earned: true, category: 'milestone' },
  { id: 'a2', name: '$100 Donated', description: 'Donate a total of $100', earned: true, category: 'milestone' },
  { id: 'a3', name: '$1,000 Donated', description: 'Donate a total of $1,000', earned: true, category: 'milestone' },
  { id: 'a4', name: '$10,000 Donated', description: 'Donate a total of $10,000', earned: false, category: 'milestone' },
  { id: 'a5', name: '30-Day Streak', description: 'Donate 30 days in a row', earned: true, category: 'consistency' },
  { id: 'a6', name: '365-Day Streak', description: 'Donate every day for a year', earned: false, category: 'consistency' },
  { id: 'a7', name: 'Top 100 Weekly', description: 'Reach top 100 on the weekly leaderboard', earned: true, category: 'competition' },
  { id: 'a8', name: 'Challenge Champion', description: 'Win 10 challenges', earned: true, category: 'competition' },
  { id: 'a9', name: 'Supported 10 Causes', description: 'Donate to 10 different causes', earned: true, category: 'exploration' },
  { id: 'a10', name: 'Supported 50 Charities', description: 'Donate to 50 different charities', earned: false, category: 'exploration' },
]

export const signatures = [
  { id: 's1', name: 'Ocean Cleanup Project', verified: true, message: 'Thank you for 62 days of support!' },
  { id: 's2', name: 'MayaGives', verified: true, message: 'A worthy rival. See you on the weekly LB.' },
  { id: 's3', name: 'AlexTheKind', verified: false, message: 'Good luck on the challenge!' },
  { id: 's4', name: 'OmarHopes', verified: false, message: 'Streak buddies since day 1.' },
]

export const hallOfFame = [
  { id: 'h1', title: 'Largest Single Donation', holder: 'AnonymousHero', value: '$1,000,000', detail: 'Disaster Relief Race, 2025' },
  { id: 'h2', title: 'Biggest 24-Hour Fundraiser', holder: 'Team Phoenix', value: '$212,000', detail: 'Summer Giving Challenge' },
  { id: 'h3', title: 'Longest Donation Streak', holder: 'SaraShines', value: '302 days', detail: 'And counting' },
  { id: 'h4', title: 'Most Challenges Won', holder: 'MayaGives', value: '31 wins', detail: 'Undefeated in speed challenges' },
  { id: 'h5', title: 'First to $1M Donated', holder: 'AnonymousHero', value: '$1,200,000', detail: 'Reached March 2026' },
  { id: 'h6', title: 'Top Team of 2025', holder: 'Ocean Guardians', value: '$304,000', detail: 'Season champion' },
]

export const communityTotal = 100_000_000

export function formatMoney(n: number): string {
  return `$${n.toLocaleString('en-US')}`
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 10_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n.toLocaleString('en-US')}`
}
