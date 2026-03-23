import React from 'react'
import Link from 'next/link'

const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Fonctionnement', href: '#how-it-works' },
    { label: 'Tarifs', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
]

const legalLinks = [
    { label: 'Politique de Confidentialité', href: '#' },
    { label: 'Conditions d’Utilisation', href: '#' },
]

export function FooterSection() {
    return (
        <footer className="border-t border-border/30 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    {/* Logo + tagline */}
                    <div className="flex flex-col gap-2">
                        <Link href="/" className="flex items-center gap-2.5 w-fit group">
                            <div className="relative size-8 flex items-center justify-center">
                                <div className="absolute inset-0 bg-primary/20 blur-md rounded-full group-hover:bg-primary/30 transition-colors" />
                                <svg width="24" height="18" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                                    <path
                                        d="M2 2L7.5 17L14 5L20.5 17L26 2"
                                        stroke="url(#footer-gradient-new)"
                                        strokeWidth="3.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <defs>
                                        <linearGradient id="footer-gradient-new" x1="2" y1="2" x2="26" y2="18" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="var(--primary)" />
                                            <stop offset="1" stopColor="var(--secondary)" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <span className="font-display font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">WebMind</span>
                        </Link>
                        <p className="text-xs text-muted-foreground max-w-[240px] leading-relaxed">
                            L'intelligence artificielle au service de la haute performance. Libérez votre potentiel, automatisez le reste.
                        </p>
                    </div>

                    {/* Nav links */}
                    <nav className="flex flex-wrap gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border/30 pt-6">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} WebMind. Tous droits réservés.
                    </p>
                    <div className="flex gap-5">
                        {legalLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
