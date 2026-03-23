'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Phone, Star } from 'lucide-react'

const services = [
    {
        icon: Zap,
        title: 'Creative Systems',
        description:
            "Dominez votre marché avec un flux illimité de contenus haute performance (Ads, Reels, Threads) générés par nos modèles d'IA propriétaires. L'omniprésence, automatisée.",
        tags: ['Sora', 'Runway Gen-3', 'Flux'],
        accentFrom: 'from-violet-500/15',
        accentTo: 'to-violet-500/5',
        glow: 'hover:shadow-violet-500/10',
        border: 'hover:border-violet-500/30',
    },
    {
        icon: Phone,
        title: 'B2B Growth Engine',
        description:
            "Un système d'acquisition qui ne dort jamais. Scrape, qualification et outreach ultra-personnalisé sur LinkedIn & Cold Email pour remplir votre agenda de RDV qualifiés.",
        tags: ['Make', 'OpenAI', 'Lemlist'],
        accentFrom: 'from-teal-500/15',
        accentTo: 'to-teal-500/5',
        glow: 'hover:shadow-teal-500/10',
        border: 'hover:border-teal-500/30',
    },
    {
        icon: Star,
        title: 'Neural Ops',
        description:
            "Le système nerveux de votre entreprise. On automatise vos workflows internes, le service client et la gestion de données pour diviser votre charge opérationnelle par deux.",
        tags: ['n8n', 'Claude 3.5', 'Airtable'],
        accentFrom: 'from-amber-500/15',
        accentTo: 'to-amber-500/5',
        glow: 'hover:shadow-amber-500/10',
        border: 'hover:border-amber-500/30',
    },
]

export function ServicesSection() {
    return (
        <section id="services" className="py-24 md:py-36">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Ce que nous bâtissons</p>
                    <h2 className="text-4xl md:text-5xl font-display font-bold max-w-xl mx-auto leading-tight">
                        Trois systèmes. Une machine à revenus.
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {services.map((service, i) => {
                        const Icon = service.icon
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, delay: i * 0.12, type: 'spring' as const, bounce: 0.2 }}
                                className={`group relative rounded-2xl border border-border/60 p-8 overflow-hidden transition-all duration-500 hover:shadow-xl ${service.glow} ${service.border}`}>
                                {/* Gradient fill on hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${service.accentFrom} ${service.accentTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                                />
                                <div className="relative z-10">
                                    <div className="mb-6 inline-flex p-3 rounded-xl bg-muted/50 border border-border/50 group-hover:border-border/80 transition-colors duration-300">
                                        <Icon className="size-5 text-foreground" />
                                    </div>
                                    <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                        {service.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {service.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2.5 py-1 rounded-full bg-muted/60 border border-border/40 text-muted-foreground">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
