'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Hammer, Plug, Rocket } from 'lucide-react'

const steps = [
    {
        number: '01',
        icon: Search,
        title: 'Audit Découverte',
        description:
            'Nous cartographions votre flux actuel de leads, identifions les plus grosses failles et concevons une architecture d’automatisation sur-mesure adaptée à vos outils et objectifs.',
    },
    {
        number: '02',
        icon: Hammer,
        title: 'Design & Build',
        description:
            'Notre équipe bâtit vos workflows dans n8n, configure vos agents IA et connecte le tout à votre CRM, votre agenda et vos outils de communication.',
    },
    {
        number: '03',
        icon: Plug,
        title: 'Intégration & Tests',
        description:
            'Nous connectons chaque pièce, lançons des tests de bout en bout avec des scénarios réels et ajustons les réponses jusqu’à ce que le système soit infaillible.',
    },
    {
        number: '04',
        icon: Rocket,
        title: 'Lancement & Suivi',
        description:
            'Mise en ligne avec monitoring complet. Nous suivons les performances, itérons sur les prompts et optimisons vos taux de conversion mois après mois.',
    },
]

export function HowItWorksSection() {
    const lineRef = useRef<HTMLDivElement>(null)
    const isLineInView = useInView(lineRef, { once: true, margin: '-80px' })

    return (
        <section id="how-it-works" className="py-24 md:py-36 bg-muted/5 border-t border-border/30">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">La méthode</p>
                    <h2 className="text-4xl md:text-5xl font-display font-bold max-w-lg mx-auto leading-tight">
                        De l'audit aux revenus en 4 étapes
                    </h2>
                </motion.div>

                <div className="relative grid md:grid-cols-4 gap-8 md:gap-6">
                    {/* Horizontal connecting line (desktop) */}
                    <div
                        ref={lineRef}
                        className="hidden md:block absolute top-8 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-border/30 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary to-secondary origin-left"
                            initial={{ scaleX: 0 }}
                            animate={isLineInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
                        />
                    </div>

                    {steps.map((step, i) => {
                        const Icon = step.icon
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 32 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.6, delay: i * 0.15, type: 'spring' as const, bounce: 0.2 }}
                                className="relative flex flex-col items-start md:items-center">
                                {/* Step icon bubble */}
                                <div className="relative z-10 mb-6 flex size-16 items-center justify-center rounded-full border border-border/60 bg-background shadow-sm">
                                    <Icon className="size-5 text-foreground" />
                                    <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-muted border border-border text-[10px] font-semibold text-muted-foreground font-display">
                                        {i + 1}
                                    </span>
                                </div>

                                {/* Mobile vertical connector */}
                                {i < steps.length - 1 && (
                                    <div className="md:hidden absolute left-8 top-16 w-px h-full bg-border/30" />
                                )}

                                <div className="md:text-center pl-4 md:pl-0">
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5">{step.number}</p>
                                    <h3 className="text-lg font-display font-semibold mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
