'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function useCountUp(end: number, duration: number = 2, trigger: boolean = false) {
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (!trigger) return
        let frame: number
        const start = performance.now()
        const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / (duration * 1000), 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * end))
            if (progress < 1) {
                frame = requestAnimationFrame(tick)
            }
        }
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [trigger, end, duration])

    return value
}

const stats = [
    { value: 12400, suffix: '+', label: 'Leads Qualifiés / Mois', prefix: '' },
    { value: 4, suffix: 'h', label: 'Temps Gagné / Jour / User', prefix: '' },
    { value: 99, suffix: '%', label: 'Précision du Scoring IA', prefix: '' },
    { value: 3, suffix: 'x', label: 'Augmentation du ROI', prefix: '' },
]

function StatCard({ stat, index, isInView }: { stat: typeof stats[0]; index: number; isInView: boolean }) {
    const count = useCountUp(stat.value, 2, isInView)

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12, type: 'spring' as const, bounce: 0.3 }}
            className="flex flex-col items-center text-center px-4">
            <div className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tabular-nums">
                {stat.prefix}{count.toLocaleString()}{stat.suffix}
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">{stat.label}</p>
        </motion.div>
    )
}

export function ResultsSection() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section className="border-y border-white/5 py-24 md:py-32 bg-slate-950/20 backdrop-blur-sm">
            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center gap-4 mb-20 text-center">
                    <span className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest">
                        Neural Performance
                    </span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold">L'impact WebMind en chiffres</h2>
                </motion.div>
                <div
                    ref={ref}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
                    {stats.map((stat, i) => (
                        <StatCard key={i} stat={stat} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    )
}
