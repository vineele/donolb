"use client";

import { Crown } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { hallOfFame, communityTotal } from '@/lib/data'
import { useCountUp } from '@/hooks/use-count-up'

function AnimatedMoney({ value, delay = 0 }: { value: number; delay?: number }) {
  const count = useCountUp(value, 1800, delay)
  return <>${count.toLocaleString('en-US')}</>
}

function AnimatedNumber({ raw, delay = 0 }: { raw: string; delay?: number }) {
  // If the value starts with $ and is numeric, animate it
  const match = raw.match(/^\$?([\d,]+)(\s*.*)$/)
  if (match) {
    const num = parseInt(match[1].replace(/,/g, ''), 10)
    const suffix = match[2] || ''
    const hasDollar = raw.startsWith('$')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const count = useCountUp(num, 1600, delay)
    return <>{hasDollar ? '$' : ''}{count.toLocaleString('en-US')}{suffix}</>
  }
  // Plain number like "365"
  const plain = parseInt(raw.replace(/,/g, ''), 10)
  if (!isNaN(plain)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const count = useCountUp(plain, 1600, delay)
    return <>{count.toLocaleString('en-US')}</>
  }
  return <>{raw}</>
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' } }),
}

export default function HallOfFamePage() {
  const communityCount = useCountUp(communityTotal, 2200, 100)

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8 md:px-8">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-1"
      >
        <div className="flex items-center gap-2">
          <Crown className="size-5 text-primary" aria-hidden="true" />
          <h1 className="text-2xl font-semibold tracking-tight">Hall of Fame</h1>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Permanent records. Recognition that outlasts every seasonal reset.
        </p>
      </motion.header>

      <motion.section
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        aria-label="Community milestone"
        className="rounded-xl border border-primary/30 bg-card p-8 text-center"
      >
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          The DonoLB community has donated
        </p>
        <motion.p
          className="mt-2 text-4xl font-semibold tracking-tight tabular-nums md:text-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ${communityCount.toLocaleString('en-US')}
        </motion.p>
        <p className="mt-3 text-sm text-muted-foreground">
          Everyone who contributed earned the Founding Impact Badge.
        </p>
      </motion.section>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {hallOfFame.map((record, i) => (
          <motion.article
            key={record.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2 rounded-lg border border-border bg-card p-5"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {record.title}
            </p>
            <p className="text-2xl font-semibold tabular-nums">
              <AnimatedNumber raw={record.value} delay={200 + i * 80} />
            </p>
            <div className="mt-auto pt-2">
              <p className="text-sm font-medium">{record.holder}</p>
              <p className="text-xs text-muted-foreground">{record.detail}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
