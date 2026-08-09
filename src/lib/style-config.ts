"use client";

/**
 * Shared style configuration used for brackets, banners, cards, and the site background.
 */

export type StyleBgType = 'default' | 'solid' | 'gradient' | 'image'
export type StyleEffect  = 'none' | 'shimmer' | 'glow' | 'holographic' | 'neon' | 'aurora' | 'animated-gradient'

export interface StyleConfig {
  bgType:      StyleBgType
  bgColor:     string
  gradFrom:    string
  gradTo:      string
  gradDir:     string
  imgUrl:      string
  effect:      StyleEffect
  glowColor:   string
  borderColor: string
  holoColor:   string
  auroraColor: string
}

export const STYLE_DEFAULT: StyleConfig = {
  bgType:      'default',
  bgColor:     '#1f1f1f',
  gradFrom:    '#1a0a2e',
  gradTo:      '#0a1628',
  gradDir:     '135deg',
  imgUrl:      '',
  effect:      'none',
  glowColor:   '#a855f7',
  borderColor: '#06d6a0',
  holoColor:   '#a855f7',
  auroraColor: '#00c3ff',
}

/** Returns the CSS `background` value for a StyleConfig. */
export function getCssBg(cfg: StyleConfig): string {
  if (cfg.bgType === 'solid') return cfg.bgColor
  if (cfg.bgType === 'gradient') {
    return `linear-gradient(${cfg.gradDir}, ${cfg.gradFrom}, ${cfg.gradTo}, ${cfg.gradFrom})`
  }
  if (cfg.bgType === 'image' && cfg.imgUrl) {
    return `url("${cfg.imgUrl}") center/cover no-repeat`
  }
  return ''
}

/** Returns inline React CSSProperties for a style config (used on divs). */
export function getInlineStyle(cfg: StyleConfig): React.CSSProperties {
  if (cfg.bgType === 'default') return {}
  const isAnimGrad = cfg.effect === 'animated-gradient' && cfg.bgType === 'gradient'
  if (cfg.bgType === 'solid') return { background: cfg.bgColor }
  if (cfg.bgType === 'gradient') {
    const grad = `linear-gradient(${cfg.gradDir}, ${cfg.gradFrom}, ${cfg.gradTo}, ${cfg.gradFrom})`
    return isAnimGrad
      ? { backgroundImage: grad, backgroundSize: '300% 300%' }
      : { background: grad }
  }
  if (cfg.bgType === 'image' && cfg.imgUrl) {
    return { backgroundImage: `url("${cfg.imgUrl}")`, backgroundSize: 'cover', backgroundPosition: 'center' }
  }
  return {}
}

/** Returns box-shadow / border style for an effect. */
export function getEffectStyle(cfg: StyleConfig): React.CSSProperties {
  if (cfg.effect === 'glow') return {
    boxShadow: `0 0 18px 4px ${cfg.glowColor}55, inset 0 0 16px 1px ${cfg.glowColor}10`,
    borderColor: `${cfg.glowColor}55`,
  }
  if (cfg.effect === 'neon') {
    const c = cfg.borderColor || '#06d6a0'
    return { boxShadow: `0 0 8px 2px ${c}88, 0 0 28px 6px ${c}33`, borderColor: c }
  }
  return {}
}

// ─── CSS injection helpers ─────────────────────────────────────────────────

function injectStyle(id: string, css: string) {
  let el = document.getElementById(id) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement('style')
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = css
}

/** Apply the site-wide background (body + effect overlay). */
export function applyBodyBg(cfg: StyleConfig) {
  const bg = getCssBg(cfg) || 'oklch(0.17 0 0)'
  document.body.style.background = bg

  const isAnimGrad = cfg.effect === 'animated-gradient' && cfg.bgType === 'gradient'
  let css = ''

  if (isAnimGrad) {
    css += `
@keyframes donolb-body-grad {
  0%   { background-position: 0%   50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0%   50%; }
}
body { background-size: 300% 300% !important; animation: donolb-body-grad 6s ease infinite !important; }
`
  } else {
    css += `body { background-size: auto !important; animation: none !important; }`
  }

  if (cfg.effect === 'shimmer') {
    css += `
@keyframes donolb-body-shimmer {
  from { transform: translateX(-120%) skewX(-12deg); }
  to   { transform: translateX(220%)  skewX(-12deg); }
}
#donolb-bg-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent);
  transform: skewX(-12deg) translateX(-120%);
  animation: donolb-body-shimmer 2.8s linear infinite;
}
`
  } else if (cfg.effect === 'holographic') {
    css += `
@keyframes donolb-body-holo {
  0%   { background-position: 0%   50%; filter: hue-rotate(0deg); }
  100% { background-position: 100% 50%; filter: hue-rotate(360deg); }
}
#donolb-bg-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background: linear-gradient(135deg, ${cfg.holoColor}22, #3a86ff22, #06d6a022, ${cfg.holoColor}22, #ff006022);
  background-size: 400% 400%;
  animation: donolb-body-holo 5s linear infinite;
  mix-blend-mode: screen;
}
`
  } else if (cfg.effect === 'aurora') {
    css += `
@keyframes donolb-body-aurora {
  0%, 100% { opacity: 0.4; transform: translateY(0); }
  50%       { opacity: 0.7; transform: translateY(-20px); }
}
#donolb-bg-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background: linear-gradient(0deg, transparent, ${cfg.auroraColor}30, ${cfg.auroraColor}50, transparent);
  animation: donolb-body-aurora 5s ease-in-out infinite;
  mix-blend-mode: screen;
}
`
  } else if (cfg.effect === 'glow') {
    css += `
#donolb-bg-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background: radial-gradient(ellipse at 50% 50%, ${cfg.glowColor}18, transparent 70%);
}
`
  } else {
    css += `#donolb-bg-overlay { display: none; }`
  }

  injectStyle('donolb-body-bg', css)
}

/** Apply card styles globally (targets .glass-target + sidebar). */
export function applyCardStyle(cfg: StyleConfig) {
  const hasBg   = cfg.bgType !== 'default'
  const hasImage = cfg.bgType === 'image' && cfg.imgUrl
  const isAnimGrad = cfg.effect === 'animated-gradient' && cfg.bgType === 'gradient'
  const bg = getCssBg(cfg)

  let css = ''

  if (hasBg) {
    css += `
.glass-target, aside, .card-bg {
  background: ${bg} !important;
  background-size: ${isAnimGrad ? '300% 300%' : 'auto'} !important;
}
`
  } else {
    // Reset
    css += `.glass-target, aside, .card-bg { background: unset !important; }`
  }

  if (cfg.effect === 'shimmer') {
    css += `
@keyframes donolb-card-shimmer {
  from { transform: translateX(-120%) skewX(-12deg); }
  to   { transform: translateX(220%)  skewX(-12deg); }
}
.glass-target, aside { position: relative; overflow: hidden; }
.glass-target::after, aside::after {
  content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 1;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 50%, transparent);
  transform: skewX(-12deg) translateX(-120%);
  animation: donolb-card-shimmer 2.2s linear infinite;
}
`
  } else if (cfg.effect === 'glow') {
    css += `
.glass-target {
  box-shadow: 0 0 14px 2px ${cfg.glowColor}44 !important;
}
`
  } else if (cfg.effect === 'holographic') {
    css += `
@keyframes donolb-card-holo {
  0%   { background-position: 0%   50%; filter: hue-rotate(0deg); }
  100% { background-position: 100% 50%; filter: hue-rotate(360deg); }
}
.glass-target { position: relative; overflow: hidden; }
.glass-target::before {
  content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 1;
  background: linear-gradient(135deg, ${cfg.holoColor}44, #3a86ff44, #06d6a044, ${cfg.holoColor}44, #ff006044);
  background-size: 300% 300%;
  animation: donolb-card-holo 3s linear infinite;
  mix-blend-mode: screen;
  opacity: 0.6;
}
`
  } else if (cfg.effect === 'aurora') {
    css += `
@keyframes donolb-card-aurora {
  0%, 100% { opacity: 0.4; transform: translateY(0); }
  50%       { opacity: 0.8; transform: translateY(-8px); }
}
.glass-target { position: relative; overflow: hidden; }
.glass-target::before {
  content: ''; position: absolute; inset: -10% 0; pointer-events: none; z-index: 1;
  background: linear-gradient(0deg, transparent, ${cfg.auroraColor}44, ${cfg.auroraColor}66, transparent);
  animation: donolb-card-aurora 4s ease-in-out infinite;
  mix-blend-mode: screen;
}
`
  } else if (cfg.effect === 'neon') {
    const c = cfg.borderColor || '#06d6a0'
    css += `
.glass-target {
  border-color: ${c} !important;
  box-shadow: 0 0 8px 2px ${c}88, 0 0 20px 4px ${c}33 !important;
}
`
  } else if (isAnimGrad) {
    css += `
@keyframes donolb-card-grad {
  0%   { background-position: 0%   50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0%   50%; }
}
.glass-target, aside { animation: donolb-card-grad 4s ease infinite !important; }
`
  }

  if (hasImage) {
    css += `
.glass-target::after {
  content: ''; position: absolute; inset: 0;
  background: rgba(0,0,0,0.45); pointer-events: none; z-index: 0;
}
`
  }

  injectStyle('donolb-cards', css)
}

/** Inject arbitrary custom CSS. */
export function applyCustomCss(css: string) {
  injectStyle('donolb-custom', css)
}
