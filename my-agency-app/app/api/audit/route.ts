import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'
import { NextRequest } from 'next/server'

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Label Maps ───────────────────────────────────────────────────────────────

const STAGE_LABELS: Record<string, string> = {
    startup: 'Démarrage (< 50K€/an)',
    growth: 'Croissance (50K€ - 250K€/an)',
    scale: 'Scale-up (250K€ - 1M€/an)',
    established: 'Établie (+1M€/an)',
}

const BOTTLENECK_LABELS: Record<string, string> = {
    leads: 'Prospection et génération de leads (Cold Email, LinkedIn)',
    content: 'Création de contenu régulier et qualitatif (Réseaux, Vidéos, Ads)',
    ops: "L'opérationnel et le service client (Récurrence)",
    admin: 'Traitement de données et administratif',
}

const ATTEMPTS_LABELS: Record<string, string> = {
    average: 'Oui, mais résultats moyens',
    time: 'Oui, mais perds du temps techniquement',
    complex: 'Non, trop complexe',
    notime: 'Non, manque de temps',
}

const IMPACT_LABELS: Record<string, string> = {
    lost_revenue: 'Opportunités de CA perdues',
    high_costs: 'Coûts agence/prestataires trop élevés',
    burnout: 'Energie et focus de dirigeant',
    brand: 'Image pas au niveau des ambitions',
}

const RESULT_LABELS: Record<string, string> = {
    leads_auto: 'Système d\'acquisition automatique de RDV',
    content_engine: 'Moteur de contenu IA haut de gamme (Omniprésence)',
    workflows: 'Division du temps opérationnel par 2 via Neural Ops',
}

// ─── Mock fallback ────────────────────────────────────────────────────────────

const MOCK: AuditResult = {
    headline: "Récupérez 18h/semaine — sans recruter, sans changer vos outils",
    analysis: "Votre profil révèle plusieurs goulots d'étranglement critiques. En croissance, chaque heure perdue sur des tâches répétitives est une opportunité de CA manquée. Les systèmes IA ciblés peuvent automatiser jusqu'à 80% de ces processus manuels.",
    quickWin: "Qualification et nurturing automatique des prospects entrants",
    opportunities: [
        {
            title: "Système d'acquisition de leads automatisé",
            description: "Chaque nouveau contact est qualifié, enrichi et répondu en moins de 60 secondes — 24h/24. Le bon message, au bon moment, sans intervention humaine.",
            timeSaved: "8 h/semaine",
            system: "Lead Engine",
            roi: "+40% de taux de conversion sur leads entrants",
            timeline: "5-7 jours",
            tools: ["n8n", "Claude API", "HubSpot"],
        },
        {
            title: "Moteur de contenu IA sur-mesure",
            description: "Génération automatique de posts LinkedIn, threads, et courtes vidéos basés sur vos actualités. Publiez 5x plus, sans y passer du temps.",
            timeSaved: "6 h/semaine",
            system: "Automation sur-mesure",
            roi: "×5 de présence digitale — leads organiques +30%",
            timeline: "7-10 jours",
            tools: ["Claude API", "Make", "Buffer"],
        },
        {
            title: "Workflows internes intelligents",
            description: "Automatisation des relances, des suivis clients, des reportings — tout ce qui consomme votre énergie sans générer de valeur directe.",
            timeSaved: "4 h/semaine",
            system: "Automation sur-mesure",
            roi: "Réduction de 60% du temps opérationnel",
            timeline: "3-5 jours",
            tools: ["n8n", "Notion API", "Slack"],
        },
    ],
    totalHours: "18",
    pitch: "Webmind déploie ces systèmes en 3 semaines, adaptés à votre stack actuel. Vous gardez le contrôle — on gère la technique, le suivi, et les optimisations en continu.",
}

// ─── Email HTML ───────────────────────────────────────────────────────────────

function buildLeadEmail(form: FormData): string {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f0f; color: #e5e5e5; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #7c3aed, #0d9488); padding: 24px; text-align: center;">
        <h1 style="margin: 0; color: #fff; font-size: 22px;">🔥 Nouveau Lead — Audit IA Webmind</h1>
      </div>
      <div style="padding: 28px;">
        <h2 style="color: #a78bfa; font-size: 16px; margin-bottom: 20px;">Informations de contact</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
          <tr><td style="padding: 8px 0; color: #9ca3af; width: 140px;">Prénom</td><td style="color: #f5f5f5; font-weight: bold;">${form.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #9ca3af;">Email</td><td style="color: #a78bfa;">${form.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #9ca3af;">Téléphone</td><td style="color: #f5f5f5;">${form.phone}</td></tr>
        </table>

        <h2 style="color: #a78bfa; font-size: 16px; margin-bottom: 20px;">Réponses de l'Audit</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #1f1f1f; color: #9ca3af; width: 140px; vertical-align: top;">Stade</td><td style="padding: 10px 0; border-bottom: 1px solid #1f1f1f; color: #f5f5f5;">${STAGE_LABELS[form.stage] ?? form.stage}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #1f1f1f; color: #9ca3af; vertical-align: top;">Goulot</td><td style="padding: 10px 0; border-bottom: 1px solid #1f1f1f; color: #f5f5f5;">${BOTTLENECK_LABELS[form.bottleneck] ?? form.bottleneck}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #1f1f1f; color: #9ca3af; vertical-align: top;">Heures perdues</td><td style="padding: 10px 0; border-bottom: 1px solid #1f1f1f; color: #34d399; font-weight: bold; font-size: 18px;">${form.hoursWasted}h / semaine</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #1f1f1f; color: #9ca3af; vertical-align: top;">IA déjà essayé</td><td style="padding: 10px 0; border-bottom: 1px solid #1f1f1f; color: #f5f5f5;">${ATTEMPTS_LABELS[form.pastAttempts] ?? form.pastAttempts}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #1f1f1f; color: #9ca3af; vertical-align: top;">Impact financier</td><td style="padding: 10px 0; border-bottom: 1px solid #1f1f1f; color: #f5f5f5;">${IMPACT_LABELS[form.financialImpact] ?? form.financialImpact}</td></tr>
          <tr><td style="padding: 10px 0; color: #9ca3af; vertical-align: top;">Objectif</td><td style="padding: 10px 0; color: #f5f5f5;">${RESULT_LABELS[form.idealResult] ?? form.idealResult}</td></tr>
        </table>

        <div style="margin-top: 28px; padding: 16px; background: #1a1a2e; border: 1px solid #7c3aed33; border-radius: 10px;">
          <p style="margin: 0; color: #a78bfa; font-weight: bold;">⚡ Action recommandée</p>
          <p style="margin: 8px 0 0; color: #d1d5db; font-size: 14px;">Appeler <b>${form.name}</b> au <b>${form.phone}</b> dans les 24h pour la restitution personnalisée. Il/elle perd <b style="color: #34d399">${form.hoursWasted}h/semaine</b> sur des tâches automatisables.</p>
        </div>
      </div>
    </div>`
}

// ─── Prompt Builder ───────────────────────────────────────────────────────────

function buildPrompt(form: FormData): string {
    return `Tu es un expert senior en automatisation IA chez Webmind. Génère un audit ultra-précis et personnalisé basé sur ces données :

- Stade de l'entreprise: ${STAGE_LABELS[form.stage]}
- Principal goulot: ${BOTTLENECK_LABELS[form.bottleneck]}
- Heures perdues par semaine: ${form.hoursWasted}h
- Expérience avec l'IA: ${ATTEMPTS_LABELS[form.pastAttempts]}
- Impact financier ressenti: ${IMPACT_LABELS[form.financialImpact]}
- Objectif idéal: ${RESULT_LABELS[form.idealResult]}

INSTRUCTIONS:
- L'analyse doit être précise et montrer que tu as compris leur situation
- Les automations proposées doivent correspondre à leur goulot principal et objectif
- Les chiffres (heures, ROI, délais) doivent être réalistes
- Priorise par ROI décroissant

Réponds UNIQUEMENT avec du JSON valide dans ce format exact:
{
  "headline": "Titre avec chiffre concret sur les heures récupérables",
  "analysis": "2-3 phrases d'analyse précise de leur situation.",
  "quickWin": "Titre court de l'automation prioritaire",
  "opportunities": [
    {
      "title": "Nom court de l'automation",
      "description": "Ce que ça fait concrètement, en 2-3 phrases.",
      "timeSaved": "X h/semaine",
      "system": "Creative Systems | B2B Growth Engine | Neural Ops",
      "roi": "Impact business chiffré",
      "timeline": "X-Y jours",
      "tools": ["outil1", "outil2"]
    }
  ],
  "totalHours": "nombre total d'heures économisées (chiffre seul)",
  "pitch": "2 phrases sur pourquoi Webmind est le bon partenaire."
}

Génère exactement 3 opportunités.`
}

// ─── Route ────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    const form: FormData = await req.json()

    const anthropicKey = process.env.ANTHROPIC_API_KEY
    const resendKey = process.env.RESEND_API_KEY
    const leadEmail = process.env.LEAD_EMAIL

    // ── 1. Envoyer le lead par email via Resend (async, en parallèle)
    if (resendKey && resendKey !== 'your_resend_api_key_here' && leadEmail && leadEmail !== 'ton_email@domaine.com') {
        try {
            const resend = new Resend(resendKey)
            await resend.emails.send({
                from: 'Webmind Audit <onboarding@resend.dev>',
                to: [leadEmail],
                subject: `🔥 Nouveau Audit IA - ${form.name} (${form.hoursWasted}h/sem perdues)`,
                html: buildLeadEmail(form),
            })
        } catch (err) {
            console.error('[Resend] Email error:', err)
        }
    }

    // ── 2. Générer l'audit IA avec Claude (ou fallback mock)
    if (!anthropicKey || anthropicKey === 'your_anthropic_api_key_here') {
        await new Promise(r => setTimeout(r, 2500))
        return Response.json(MOCK)
    }

    try {
        const client = new Anthropic({ apiKey: anthropicKey })
        const message = await client.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 2000,
            messages: [{ role: 'user', content: buildPrompt(form) }],
        })

        const text = message.content[0].type === 'text' ? message.content[0].text : ''
        const result: AuditResult = JSON.parse(text)
        return Response.json(result)
    } catch {
        return Response.json(MOCK)
    }
}
