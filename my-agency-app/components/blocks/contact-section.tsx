'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const benefits = [
    'Audit complet de votre flux de leads actuel',
    'Proposition d’architecture d’automatisation sur-mesure',
    'Projection du ROI pour votre entreprise',
    'Aucun engagement requis',
]

type FormState = 'idle' | 'loading' | 'success'

export function ContactSection() {
    const [formState, setFormState] = useState<FormState>('idle')
    const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormState('loading')
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (!res.ok) throw new Error('failed')
            setFormState('success')
        } catch {
            setFormState('idle')
            alert('Erreur lors de l\'envoi. Réessaie dans quelques secondes.')
        }
    }

    const inputClass = cn(
        'w-full rounded-xl border border-border/60 bg-muted/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50',
        'focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/50 transition-all duration-200'
    )

    return (
        <section id="contact" className="py-24 md:py-36 border-t border-border/30 bg-muted/5">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Contact</p>
                        <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
                            Réservez votre<br />
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                audit stratégique
                            </span>
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
                            En 30 minutes, nous cartographierons vos goulots d'étranglement et concevrons le système nerveux digital qui propulsera votre croissance.
                        </p>

                        <ul className="space-y-4">
                            {benefits.map((benefit, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                                    className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <CheckCircle className="size-4 shrink-0 text-teal-400" />
                                    {benefit}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right: form */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="rounded-2xl border border-border/60 bg-background/50 p-8 backdrop-blur-sm">
                        {formState === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col items-center text-center py-8 gap-4">
                                <div className="flex size-14 items-center justify-center rounded-full bg-teal-400/10 border border-teal-400/30">
                                    <CheckCircle className="size-6 text-teal-400" />
                                </div>
                                <h3 className="text-xl font-display font-semibold">C'est réservé.</h3>
                                <p className="text-sm text-muted-foreground max-w-xs">
                                    Nous vous contacterons sous 24h pour confirmer votre session d'audit. Vérifiez votre boîte mail.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-muted-foreground mb-1.5 block">Nom Complet</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Jean Dupont"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground mb-1.5 block">Email Professionnel</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="john@company.com"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground mb-1.5 block">Entreprise</label>
                                    <input
                                        type="text"
                                        placeholder="Acme Inc."
                                        value={form.company}
                                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground mb-1.5 block">Quel est votre plus grand défi ?</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Nous perdons des leads en haut du tunnel..."
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        className={cn(inputClass, 'resize-none')}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={formState === 'loading'}
                                    className="w-full rounded-xl gap-2">
                                    {formState === 'loading' ? (
                                        <span className="flex items-center gap-2">
                                            <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                            Envoi en cours...
                                        </span>
                                    ) : (
                                        <>
                                            Réserver mon Audit Gratuit
                                            <ArrowRight className="size-4" />
                                        </>
                                    )}
                                </Button>
                                <p className="text-center text-xs text-muted-foreground/60">
                                    Pas de spam. Aucun engagement. Juste un appel de 30 min.
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
