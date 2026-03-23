'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Clock, TrendingUp, ArrowRight, Sparkles, Loader2, Zap, Check, ChevronRight, RotateCcw, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'form' | 'loading' | 'result'

interface FormData {
    stage: string
    bottleneck: string
    hoursWasted: number
    pastAttempts: string
    financialImpact: string
    idealResult: string
    name: string
    email: string
    phone: string
}

interface AuditResult {
    headline: string
    analysis: string
    quickWin: string
    opportunities: {
        title: string
        description: string
        timeSaved: string
        system: string
        roi: string
        timeline: string
        tools: string[]
    }[]
    totalHours: string
    pitch: string
}

const INITIAL_FORM: FormData = {
    stage: '', bottleneck: '', hoursWasted: 20,
    pastAttempts: '', financialImpact: '', idealResult: '',
    name: '', email: '', phone: ''
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STAGES = [
    { id: 'startup', label: 'Démarrage (< 50K€/an)' },
    { id: 'growth', label: 'Croissance (50K€ - 250K€/an)' },
    { id: 'scale', label: 'Scale-up (250K€ - 1M€/an)' },
    { id: 'established', label: 'Établie (+1M€/an)' }
]

const BOTTLENECKS = [
    { id: 'leads', label: 'La prospection et la génération de leads (Cold Email, LinkedIn)' },
    { id: 'content', label: 'La création de contenu régulier et qualitatif (Réseaux, Vidéos, Ads)' },
    { id: 'ops', label: "L'opérationnel et le service client (Répondre aux mêmes questions non-stop)" },
    { id: 'admin', label: 'Le traitement de données et l\'administratif' }
]

const PAST_ATTEMPTS = [
    { id: 'average', label: 'Oui, mais résultats moyens / robotiques' },
    { id: 'time', label: 'Oui, mais je perds du temps techniquement' },
    { id: 'complex', label: "Non, c'est trop complexe à mettre en place" },
    { id: 'notime', label: "Non, je manque de temps pour m'y pencher" }
]

const FINANCIAL_IMPACTS = [
    { id: 'lost_revenue', label: "Des opportunités de chiffre d'affaires perdues" },
    { id: 'high_costs', label: "Des coûts d'agence/prestataires trop élevés" },
    { id: 'burnout', label: 'Mon énergie et mon focus de dirigeant' },
    { id: 'brand', label: "Mon image n'est pas au niveau de mes ambitions" }
]

const IDEAL_RESULTS = [
    { id: 'leads_auto', label: 'Acquisition automatique de RDV' },
    { id: 'content_engine', label: 'Moteur de contenu illimité haut de gamme' },
    { id: 'workflows', label: 'Diviser mon temps de travail interne par 2' }
]

const LOADING_STEPS = [
    "Initialisation du WebMind Engine...",
    "Analyse de votre stack technologique...",
    "Identification des leviers de rentabilité cachés...",
    "Calcul du coût de l'inertie...",
    "Génération de votre roadmap IA personnalisée...",
]

const SYSTEM_COLORS: Record<string, string> = {
    'B2B Growth Engine': 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    'Creative Systems': 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    'Neural Ops': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    'Automation sur-mesure': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
}

// ─── Root Component ───────────────────────────────────────────────────────────

export function AuditSection() {
    const [phase, setPhase] = useState<Phase>('form')
    const [step, setStep] = useState(1)
    const [form, setForm] = useState<FormData>(INITIAL_FORM)
    const [loadingStep, setLoadingStep] = useState(0)
    const [result, setResult] = useState<AuditResult | null>(null)

    const handleSubmit = async () => {
        setPhase('loading')

        const stepInterval = setInterval(() => {
            setLoadingStep(prev => {
                if (prev >= LOADING_STEPS.length - 1) { clearInterval(stepInterval); return prev }
                return prev + 1
            })
        }, 750)

        try {
            const res = await fetch('/api/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            clearInterval(stepInterval)
            setLoadingStep(LOADING_STEPS.length - 1)
            await new Promise(r => setTimeout(r, 400))
            setResult(data)
            setPhase('result')
        } catch {
            clearInterval(stepInterval)
            setPhase('form')
        }
    }

    const handleReset = () => {
        setPhase('form')
        setStep(1)
        setForm(INITIAL_FORM)
        setResult(null)
        setLoadingStep(0)
    }

    return (
        <section id="audit" className="bg-background py-24 md:py-32">
            <div className="mx-auto max-w-3xl px-6">
                <div className="text-center mb-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
                            <Sparkles className="size-3.5" />
                            Diagnostic IA — Offert
                        </span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-balance">
                            Découvrez votre score de{' '}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                maturité IA
                            </span>
                        </h2>
                        <p className="mt-4 text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
                            2 minutes de diagnostic. Notre IA identifie où vous perdez du temps et calcule le ROI exact des automatisations possibles dans votre business.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="relative rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                >
                    <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-violet-600/20 blur-[100px] pointer-events-none" />

                    <div className="relative p-6 md:p-10">
                        <AnimatePresence mode="wait">
                            {phase === 'form' && (
                                <FormPhase key="form" step={step} setStep={setStep} form={form} setForm={setForm} onSubmit={handleSubmit} />
                            )}
                            {phase === 'loading' && (
                                <LoadingPhase key="loading" steps={LOADING_STEPS} currentStep={loadingStep} />
                            )}
                            {phase === 'result' && result && (
                                <ResultPhase key="result" result={result} form={form} onReset={handleReset} />
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

// ─── Form Phase ───────────────────────────────────────────────────────────────

function FormPhase({ step, setStep, form, setForm, onSubmit }: {
    step: number; setStep: (s: number) => void
    form: FormData; setForm: (f: FormData) => void; onSubmit: () => void
}) {
    const update = (patch: Partial<FormData>) => setForm({ ...form, ...patch })
    const progress = (step / 7) * 100

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
            <div className="w-full bg-white/5 h-1 rounded-full mb-8 overflow-hidden">
                <div className="bg-gradient-to-r from-violet-500 to-teal-400 h-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && <QuestionLayout key="1" question="À quel stade de développement se trouve votre entreprise ?" onNext={() => setStep(2)} canNext={!!form.stage}>
                    {STAGES.map(s => <OptionBtn key={s.id} active={form.stage === s.id} onClick={() => update({ stage: s.id })}>{s.label}</OptionBtn>)}
                </QuestionLayout>}

                {step === 2 && <QuestionLayout key="2" question="Si vous aviez une baguette magique, quelle tâche chronophage feriez-vous disparaître ?" onBack={() => setStep(1)} onNext={() => setStep(3)} canNext={!!form.bottleneck}>
                    {BOTTLENECKS.map(b => <OptionBtn key={b.id} active={form.bottleneck === b.id} onClick={() => update({ bottleneck: b.id })}>{b.label}</OptionBtn>)}
                </QuestionLayout>}

                {step === 3 && <QuestionLayout key="3" question="Combien d'heures par semaine sont perdues sur ces tâches à faible valeur ?" onBack={() => setStep(2)} onNext={() => setStep(4)} canNext>
                    <div className="py-6">
                        <div className="flex justify-between items-baseline mb-4">
                            <span className="text-violet-400 font-bold text-5xl">{form.hoursWasted}</span>
                            <span className="text-zinc-400 text-sm">heures / semaine</span>
                        </div>
                        <input type="range" min="0" max="60" step="1" value={form.hoursWasted}
                            onChange={e => update({ hoursWasted: parseInt(e.target.value) })}
                            className="w-full accent-violet-500 cursor-pointer" />
                        <p className="text-center text-zinc-500 text-sm mt-4">≈ {form.hoursWasted * 4} heures perdues par mois</p>
                    </div>
                </QuestionLayout>}

                {step === 4 && <QuestionLayout key="4" question="Avez-vous déjà essayé d'intégrer des outils IA (ChatGPT, Make...) ?" onBack={() => setStep(3)} onNext={() => setStep(5)} canNext={!!form.pastAttempts}>
                    {PAST_ATTEMPTS.map(p => <OptionBtn key={p.id} active={form.pastAttempts === p.id} onClick={() => update({ pastAttempts: p.id })}>{p.label}</OptionBtn>)}
                </QuestionLayout>}

                {step === 5 && <QuestionLayout key="5" question="Aujourd'hui, que vous coûte concrètement cette inefficacité ?" onBack={() => setStep(4)} onNext={() => setStep(6)} canNext={!!form.financialImpact}>
                    {FINANCIAL_IMPACTS.map(f => <OptionBtn key={f.id} active={form.financialImpact === f.id} onClick={() => update({ financialImpact: f.id })}>{f.label}</OptionBtn>)}
                </QuestionLayout>}

                {step === 6 && <QuestionLayout key="6" question="Si Webmind implémentait un système sur-mesure, quel serait l'objectif prioritaire ?" onBack={() => setStep(5)} onNext={() => setStep(7)} canNext={!!form.idealResult}>
                    {IDEAL_RESULTS.map(i => <OptionBtn key={i.id} active={form.idealResult === i.id} onClick={() => update({ idealResult: i.id })}>{i.label}</OptionBtn>)}
                </QuestionLayout>}

                {step === 7 && <QuestionLayout key="7" question="L'analyse est prête. Où devons-nous envoyer votre rapport ?" onBack={() => setStep(6)} onNext={onSubmit} canNext={!!(form.name && form.email && form.phone)} nextText="Générer mon audit gratuit">
                    <div className="space-y-3 max-w-md mx-auto">
                        <input type="text" placeholder="Votre prénom" value={form.name} onChange={e => update({ name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:border-violet-500/60 focus:outline-none transition-colors" />
                        <input type="email" placeholder="Email professionnel" value={form.email} onChange={e => update({ email: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:border-violet-500/60 focus:outline-none transition-colors" />
                        <input type="tel" placeholder="Téléphone (pour l'appel restitution)" value={form.phone} onChange={e => update({ phone: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:border-violet-500/60 focus:outline-none transition-colors" />
                        <p className="text-xs text-zinc-600 text-center pt-1 flex items-center justify-center gap-1.5">
                            <Zap className="size-3 text-amber-500" /> Votre rapport va révéler comment regagner {form.hoursWasted}h/semaine.
                        </p>
                    </div>
                </QuestionLayout>}
            </AnimatePresence>
        </motion.div>
    )
}

function QuestionLayout({ question, children, onNext, onBack, canNext, nextText = 'Continuer' }: {
    question: string; children: React.ReactNode
    onNext: () => void; onBack?: () => void; canNext: boolean; nextText?: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring' as const, bounce: 0.2, duration: 0.4 }}
            className="flex flex-col"
        >
            <h3 className="text-xl md:text-2xl font-medium text-white mb-8 text-center leading-snug">{question}</h3>
            <div className="space-y-3 max-w-lg mx-auto w-full">{children}</div>
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/5">
                {onBack ? (
                    <button onClick={onBack} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">← Retour</button>
                ) : <div />}
                <Button onClick={onNext} disabled={!canNext} className="gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white px-6 disabled:opacity-40">
                    {nextText} <ChevronRight className="size-4" />
                </Button>
            </div>
        </motion.div>
    )
}

function OptionBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button onClick={onClick} className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
            active ? 'bg-violet-500/15 border-violet-500/50 text-violet-100' : 'bg-white/5 border-white/10 text-zinc-300 hover:border-white/20 hover:bg-white/8'
        }`}>
            <span className="text-sm font-medium">{children}</span>
            {active && <CheckCircle className="size-4 text-violet-400 shrink-0" />}
        </button>
    )
}

// ─── Loading Phase ────────────────────────────────────────────────────────────

function LoadingPhase({ steps, currentStep }: { steps: string[]; currentStep: number }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-12 text-center">
            <Loader2 className="size-8 text-violet-400 animate-spin mx-auto mb-6" />
            <h3 className="text-xl font-medium text-white mb-8">Génération de votre diagnostic...</h3>
            <div className="space-y-3 max-w-sm mx-auto text-left">
                {steps.map((step, i) => (
                    <motion.div key={i} animate={{ opacity: i <= currentStep ? 1 : 0.25 }} className="flex items-center gap-3">
                        <div className={`size-5 rounded-full flex items-center justify-center shrink-0 ${i < currentStep ? 'bg-teal-500/20' : i === currentStep ? 'bg-violet-500/20' : 'bg-white/5'}`}>
                            {i < currentStep ? <Check className="size-3 text-teal-400" /> : i === currentStep ? <Loader2 className="size-3 text-violet-400 animate-spin" /> : null}
                        </div>
                        <span className={`text-sm ${i < currentStep ? 'text-teal-400' : i === currentStep ? 'text-violet-300' : 'text-zinc-600'}`}>{step}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

// ─── Result Phase ─────────────────────────────────────────────────────────────

function ResultPhase({ result, form, onReset }: { result: AuditResult; form: FormData; onReset: () => void }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="text-center">
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-teal-400 uppercase mb-3">
                    <CheckCircle className="size-3.5" /> Analyse complète
                </div>
                <h3 className="text-2xl md:text-3xl font-display text-white mb-3">{result.headline}</h3>
                <p className="text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed">{result.analysis}</p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3">
                <Zap className="size-4 text-amber-400 shrink-0" />
                <div>
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">Quick win</span>
                    <p className="text-sm text-zinc-200 font-medium">{result.quickWin}</p>
                </div>
            </div>

            <div className="grid gap-4">
                {result.opportunities.map((opp, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }}
                        className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-2">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${SYSTEM_COLORS[opp.system] ?? SYSTEM_COLORS['Automation sur-mesure']}`}>{opp.system}</span>
                                {opp.timeline && <span className="text-xs text-zinc-500 flex items-center gap-1"><Clock className="size-3" />{opp.timeline}</span>}
                            </div>
                            <span className="text-xs font-semibold text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-lg px-2.5 py-1 shrink-0">{opp.timeSaved}</span>
                        </div>
                        <h4 className="text-base font-semibold text-white">{opp.title}</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">{opp.description}</p>
                        <div className="flex items-center gap-1.5"><TrendingUp className="size-3.5 text-teal-400 shrink-0" /><span className="text-xs text-teal-400">{opp.roi}</span></div>
                        {opp.tools && opp.tools.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap pt-1">
                                <Wrench className="size-3 text-zinc-600" />
                                {opp.tools.map(t => <span key={t} className="text-xs px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-zinc-500">{t}</span>)}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-teal-500/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="size-12 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                        <span className="text-lg font-bold text-violet-300">{result.totalHours}h</span>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white">économisées par semaine</p>
                        <p className="text-xs text-zinc-500">≈ {Math.round(parseInt(result.totalHours) * 4.3)} heures / mois récupérées</p>
                    </div>
                </div>
                <p className="text-sm text-zinc-300 mb-5 leading-relaxed">{result.pitch}</p>
                <Button asChild size="lg" className="w-full sm:w-auto rounded-xl gap-2 bg-violet-600 hover:bg-violet-700 text-white">
                    <Link href="#contact">
                        Implémenter ce plan avec Webmind <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </motion.div>

            <div className="flex justify-center">
                <button onClick={onReset} className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-400 transition-colors">
                    <RotateCcw className="size-3.5" /> Recommencer
                </button>
            </div>
        </motion.div>
    )
}
