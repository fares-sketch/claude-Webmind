'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
    { name: 'Services', href: '#services' },
    { name: 'Méthode', href: '#how-it-works' },
    { name: 'Tarifs', href: '#pricing' },
    { name: 'Audit', href: '#audit' },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={cn(
                    "pointer-events-auto flex items-center justify-between gap-8 px-6 py-3 rounded-2xl transition-all duration-500",
                    isScrolled 
                        ? "bg-background/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-full max-w-4xl" 
                        : "bg-transparent w-full max-w-7xl"
                )}
            >
                <Link href="/" className="flex items-center gap-2.5 group">
                    <WebMindLogo />
                    <span className="font-display font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">WebMind</span>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link 
                                href={item.href} 
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3">
                    <Button asChild size="sm" className="hidden md:flex rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5">
                        <Link href="#audit" className="flex items-center gap-2">
                            Réserver l'Audit <ArrowRight className="size-3.5" />
                        </Link>
                    </Button>

                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-foreground"
                    >
                        {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="pointer-events-auto absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl md:hidden flex flex-col gap-6"
                    >
                        <ul className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link 
                                        href={item.href} 
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-lg font-medium text-foreground hover:text-primary block"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Button asChild className="w-full rounded-xl bg-primary text-primary-foreground py-6">
                            <Link href="#audit" onClick={() => setMobileMenuOpen(false)}>
                                Commencer le Diagnostic
                            </Link>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

function WebMindLogo() {
    return (
        <div className="relative size-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 blur-md rounded-full animate-pulse" />
            <svg width="24" height="18" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                <path
                    d="M2 2L7.5 17L14 5L20.5 17L26 2"
                    stroke="url(#wm-gradient-new)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <defs>
                    <linearGradient id="wm-gradient-new" x1="2" y1="2" x2="26" y2="18" gradientUnits="userSpaceOnUse">
                        <stop stopColor="var(--primary)" />
                        <stop offset="1" stopColor="var(--secondary)" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    )
}
