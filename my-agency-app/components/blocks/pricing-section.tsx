'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const plans = [
    {
        name: 'B2B Growth',
        monthlyPrice: 1990,
        annualPrice: 1590,
        description: 'Système d’acquisition automatisé LinkedIn + Cold Email pour remplir votre agenda.',
        highlight: false,
        badge: null,
        features: [
            { label: 'Scraping & Lead Gen IA', included: true },
            { label: 'Outreach ultra-personnalisé', included: true },
            { label: 'Infrastructure technique (Lemlist/Make)', included: true },
            { label: 'Creative Systems (Vidéo Ads)', included: false },
            { label: 'Workflows Internes (Ops)', included: false },
            { label: 'Support 24/7', included: false },
        ],
        cta: 'Lancer mon Engine',
        ctaVariant: 'outline' as const,
    },
    {
        name: 'Neural Omnipresence',
        monthlyPrice: 3990,
        annualPrice: 3190,
        description: 'La puissance combinée de l’acquisition B2B et de la création de contenu omniprésent IA.',
        highlight: true,
        badge: 'Plus Populaire',
        features: [
            { label: 'Everything in B2B Growth', included: true },
            { label: 'Moteur de Contenu IA (15 assets/m)', included: true },
            { label: 'Direction Artistique Premium', included: true },
            { label: 'Scripting & Montage IA (Sora/Runway)', included: true },
            { label: 'Workflows Internes (Ops)', included: true },
            { label: 'PM Dédié', included: true },
        ],
        cta: 'Réserver un Audit Stratégique',
        ctaVariant: 'default' as const,
    },
    {
        name: 'Neural Infrastructure',
        monthlyPrice: null,
        annualPrice: null,
        description: 'Conception de systèmes nerveux digitaux complets pour entreprises à fort volume.',
        highlight: false,
        badge: 'Entreprise',
        features: [
            { label: 'Systèmes custom illimités', included: true },
            { label: 'Intégration profonde API/CRM', included: true },
            { label: 'Sourcing & Qualification IA massifs', included: true },
            { label: 'Déploiement en 14 jours', included: true },
            { label: 'Maintenance & Optimisation continue', included: true },
            { label: 'Support CTO as a Service', included: true },
        ],
        cta: 'Nous Contacter',
        ctaVariant: 'outline' as const,
    },
]

export function PricingSection() {
    const [annual, setAnnual] = useState(false)

    return (
        <section id="pricing" className="py-24 md:py-36 border-t border-border/30">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Investissement</p>
                    <h2 className="text-4xl md:text-5xl font-display font-bold max-w-xl mx-auto leading-tight mb-8">
                        Tarifs transparents. ROI Réel.
                    </h2>

                    {/* Billing toggle */}
                    <div className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/30 p-1">
                        <button
                            onClick={() => setAnnual(false)}
                            className={cn(
                                'rounded-full px-4 py-1.5 text-sm transition-all duration-200',
                                !annual ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                            )}>
                            Mensuel
                        </button>
                        <button
                            onClick={() => setAnnual(true)}
                            className={cn(
                                'rounded-full px-4 py-1.5 text-sm transition-all duration-200 flex items-center gap-2',
                                annual ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                            )}>
                            Annuel
                            <span className="text-[10px] font-semibold text-teal-400 bg-teal-400/10 px-1.5 py-0.5 rounded-full">
                                −20%
                            </span>
                        </button>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 items-start">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.6, delay: i * 0.1, type: 'spring' as const, bounce: 0.2 }}
                            className={cn(
                                'relative rounded-2xl border p-8 flex flex-col transition-all duration-300',
                                plan.highlight
                                    ? 'border-violet-500/50 bg-gradient-to-b from-violet-500/10 to-transparent shadow-xl shadow-violet-500/10 md:-mt-4 md:pb-12'
                                    : 'border-border/60 bg-muted/5 hover:border-border/80'
                            )}>
                            {plan.badge && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1 text-xs font-semibold text-white shadow-lg">
                                    {plan.badge}
                                </span>
                            )}

                            <div className="mb-8">
                                <h3 className="text-lg font-display font-semibold mb-1">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{plan.description}</p>

                                <div className="flex items-end gap-1 h-12">
                                    {plan.monthlyPrice ? (
                                        <>
                                            <AnimatePresence mode="wait">
                                                <motion.span
                                                    key={annual ? 'annual' : 'monthly'}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="text-4xl font-display font-bold text-foreground">
                                                    {annual ? plan.annualPrice?.toLocaleString() : plan.monthlyPrice.toLocaleString()}€
                                                </motion.span>
                                            </AnimatePresence>
                                            <span className="text-muted-foreground text-sm mb-1.5">/mois</span>
                                        </>
                                    ) : (
                                        <span className="text-4xl font-display font-bold text-foreground">Sur-mesure</span>
                                    )}
                                </div>
                                {annual && plan.monthlyPrice && (
                                    <p className="text-xs text-muted-foreground mt-1.5">
                                        Facturé annuellement — économisez {((plan.monthlyPrice - (plan.annualPrice ?? 0)) * 12).toLocaleString()}€/an
                                    </p>
                                )}
                            </div>

                            <ul className="space-y-3 mb-8 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature.label} className="flex items-start gap-2.5">
                                        {feature.included ? (
                                            <Check className="size-4 mt-0.5 shrink-0 text-teal-400" />
                                        ) : (
                                            <Minus className="size-4 mt-0.5 shrink-0 text-muted-foreground/30" />
                                        )}
                                        <span className={cn('text-sm', feature.included ? 'text-foreground' : 'text-muted-foreground/40')}>
                                            {feature.label}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Button asChild variant={plan.ctaVariant} className="w-full rounded-xl">
                                <Link href="#contact">{plan.cta}</Link>
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}