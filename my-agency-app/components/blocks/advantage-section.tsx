'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Target, TrendingUp, Cpu } from 'lucide-react'

const advantages = [
    {
        title: "Immersion & Engagement",
        description: "Le robot interactif capte l'attention en 3 secondes et réduit instantanément votre taux de rebond.",
        icon: Zap,
        color: "text-zinc-100"
    },
    {
        title: "Autorité Technologique",
        description: "Pour vendre de l'IA, il faut incarner l'IA — visuellement, avant même le premier appel.",
        icon: Cpu,
        color: "text-zinc-100"
    },
    {
        title: "Conversion Haut de Gamme",
        description: "Ce qui est rare et complexe visuellement est perçu comme premium. Vos prix s'en ressentent.",
        icon: Target,
        color: "text-zinc-100"
    },
    {
        title: "Avantage Concurrentiel",
        description: "99% de vos concurrents utilisent des templates basiques. Vous êtes dans le top 1%.",
        icon: TrendingUp,
        color: "text-zinc-100"
    }
]

export function AdvantageSection() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
             {/* Background decoration */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
             
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6 tracking-tight">
                        Pourquoi l'Elite choisit le <span className="italic">Neural Design</span> ?
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        L'IA sans une interface d'exception est une puissance gâchée. Nous créons l'avantage concurrentiel que vos rivaux ne peuvent pas copier.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {advantages.map((adv, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm group hover:border-white/10 transition-all hover:bg-white/[0.04]"
                        >
                            <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                                <adv.icon className="size-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-display font-medium text-white mb-4">{adv.title}</h3>
                            <p className="text-zinc-500 leading-relaxed text-base group-hover:text-zinc-400 transition-colors">
                                {adv.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
