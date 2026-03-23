'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Menu, X, Zap, Activity, Users, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { SparklesCore } from '@/components/ui/sparkles'
import { cn } from '@/lib/utils'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

import { SplineScene } from "@/components/ui/splite"

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
            {/* Stacking layer 1: Absolute Black Background */}
            <div className="absolute inset-0 bg-black -z-20" />

            {/* Stacking layer 2: Spline Robot */}
            <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
                 <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                />
                {/* Lighter overlay to show the robot more clearly */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />
            </div>

            {/* Subtle light effect top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-white/[0.03] blur-[120px] -z-10 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 relative z-10 text-center pointer-events-none">
                <AnimatedGroup variants={transitionVariants} className="flex flex-col items-center pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md pointer-events-auto">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white/60"></span>
                        </span>
                        Systèmes d'Intelligence Artificielle de Haute Performance
                    </div>

                    <h1 className="max-w-4xl mx-auto text-balance text-5xl md:text-7xl lg:text-8xl font-display font-medium leading-[1.1] mb-8 tracking-tight text-white pointer-events-none">
                        L'IA qui <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">pense</span>, <br />
                        votre business qui <span className="italic font-light opacity-80 text-zinc-300">scale</span>.
                    </h1>
                    
                    <p className="mx-auto max-w-2xl text-balance text-lg md:text-xl text-zinc-400 font-sans leading-relaxed mb-12 pointer-events-none">
                        WebMind conçoit les systèmes nerveux digitaux des marques d'exception. Capture, qualification et conversion automatisées — sans compromis sur l'expérience client.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
                        <Button
                            asChild
                            size="lg"
                            className="rounded-2xl px-10 py-8 text-lg bg-white hover:bg-zinc-200 text-black shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all hover:scale-[1.02]">
                            <Link href="#audit">
                                <span className="flex items-center gap-2 font-bold">Lancer l'Audit Stratégique <ArrowRight className="size-5" /></span>
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="rounded-2xl px-10 py-8 text-lg border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all text-white">
                            <Link href="#services">Découvrir nos Systèmes</Link>
                        </Button>
                    </div>
                </AnimatedGroup>
            </div>

            {/* Marquee remains but updated to steel theme */}
            <div className="w-full mt-32 py-10 border-y border-white/8 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
                <div className="relative m-auto max-w-7xl px-6">
                    <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
                        {[...marqueeLogos, ...marqueeLogos].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                                {item.src && <img src={item.src} alt={item.name} className="h-5 w-auto" />}
                                <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-zinc-500">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

const marqueeLogos = [
    { name: 'HubSpot',  src: 'https://cdn.simpleicons.org/hubspot/ffffff' },
    { name: 'n8n',      src: 'https://cdn.simpleicons.org/n8n/ffffff' },
    { name: 'Airtable', src: 'https://cdn.simpleicons.org/airtable/ffffff' },
    { name: 'OpenAI',   src: 'https://cdn.simpleicons.org/openai/ffffff' },
    { name: 'Make',     src: 'https://cdn.simpleicons.org/make/ffffff' },
    { name: 'Anthropic',src: 'https://cdn.simpleicons.org/anthropic/ffffff' },
]
