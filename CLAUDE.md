# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# WebMind

AI automation agency — we design and implement business automation systems for client companies.

## Mission
Build scalable, reusable automation systems that eliminate repetitive tasks:
- Lead generation automation
- AI call handling
- Internal operations automation
- Reporting automation
- AI assistants

---

## Tech Stack

| Layer | Tool |
|---|---|
| Orchestration | n8n (local, localhost:5678) |
| Telephony | Twilio |
| Voice agents | Retell AI |
| AI models | Claude (primary) / OpenAI |
| Data | Airtable (primary) / Google Sheets |
| Notifications | Slack / SMS / Email |
| Frontend | Next.js 16 + Tailwind CSS v4 + shadcn/ui |
| Deployment | Vercel |
| DNS / Tunnels | Cloudflare |

---

## Mandatory Workflow

Follow this order on every project — do not skip steps:

1. **Problem discovery** — define inputs, outputs, triggers, edge cases
2. **System architecture** — design before writing any code
3. **Automation workflow** — map nodes, conditions, error paths
4. **Implementation** — build with n8n exports as reusable templates
5. **Monitoring** — define success metrics and failure alerts
6. **Optimization** — iterate based on real data

---

## Working Rules

- Design architecture before writing any code
- Prefer simple and reliable over complex and clever
- Build every system as a reusable template for future clients
- Validate all API integrations and webhook inputs before implementation
- Document systems before and during implementation
- Use n8n JSON exports for all workflow templates
- User validates plan before implementation — always present architecture first

---

## Local Dev Environment

| Item | Value |
|---|---|
| n8n | `http://localhost:5678` — start via `C:\Users\ALI\start-n8n.ps1` |
| n8n env vars | `C:\Users\ALI\.n8n\.env` (Twilio, Anthropic) |
| Agency website | `C:\Users\ALI\claude_code\my-agency-app\` — `npm run dev` |
| Cloudflared | `C:\Users\ALI\cloudflared.exe` |
| Permanent tunnel | `https://n8n.webmindlab.com` — launched automatically by start-n8n.ps1 |
| Python | `C:\Users\ALI\AppData\Local\Programs\Python\Python312\python.exe` |
| Whisper PTT | `C:\Users\ALI\whisper-to-claude\start-whisper.ps1` |

---

## Live Infrastructure

| Item | URL / Status |
|---|---|
| Agency site | https://claude-webmind.vercel.app (live) |
| Custom domain | https://www.webmindlab.com — LIVE |
| GitHub repo | https://github.com/fares-sketch/claude-Webmind |
| n8n public | https://n8n.webmindlab.com ✅ PERMANENT (tunnel ID: 22006beb-bfe8-483c-a1f6-078d421d3a45) |

---

## Built Systems

### 1. Lead Engine — LIVE + EMAIL (2026-03-29)
- n8n workflow ID: `yoFumIpVN3yHSrIx` — 12 nodes, tested end-to-end
- Flow: Webhook → Validate → Claude Haiku scoring → Airtable CRM → Router → Slack + Twilio SMS + Resend Email
- Airtable Base: `appFknzmZRW97vPCE`, table: `Leads`
- Slack: `#leads-chauds` (Hot/Warm) + `#leads-froids` (Cold)
- Email: Hot/Warm = confirmation + cal.com/webmindlab/30min — Cold = nurture + webmindlab.com
- Webhook: `POST /webhook/lead-capture` via `https://n8n.webmindlab.com`
- Details: `@memory/project_lead_engine.md`

### 2. Agency Website — LIVE (2026-03-22)
- Next.js 16 + Tailwind CSS v4 + shadcn/ui + framer-motion
- 7 sections: Hero, Results, Services, How It Works, Pricing, Contact, Footer
- Deployed on Vercel from subdirectory `my-agency-app/`
- Contact form POSTs to n8n webhook
- Details: `@memory/MEMORY.md` (Key Files section)

### 3. Whisper Push-to-Talk — INSTALLED (2026-03-24)
- Windows voice input for Claude Code (replaces claude-whisper which is macOS-only)
- Hold `RIGHT CTRL` → speak → release → text pasted into active window
- Uses faster-whisper (local, offline, no API key)
- Script: `C:\Users\ALI\whisper-to-claude\whisper_push_to_talk.py`
- Language: French (`LANGUAGE = "fr"` in script config)

---

## Systems Roadmap

| # | System | Status |
|---|---|---|
| 1 | Lead Engine | ✅ LIVE |
| 2 | Call Engine | Pending — Retell AI + n8n post-call workflow |
| 3 | Review Engine | Pending — Twilio SMS → Google Reviews → Airtable |
| 4 | Brain Engine | Pending — RAG pipeline, Supabase pgvector, Claude API |

Details: `@systems/lead-engine.md`, `@systems/call-engine.md`, `@systems/review-engine.md`

---

## LinkedIn Launch Campaign (2026-03-24)

- 10 posts written: `prompts/linkedin-posts-ready.md`
- 10 image prompts: `prompts/linkedin-image-prompts.md`
- Waalaxy sequences: `prompts/waalaxy-sequences.md`
- Images: to generate via ChatGPT DALL·E
- ICP: CEO/Dir. Commercial, PME 5–100 employees, B2B France
- Funnel: LinkedIn → webmindlab.com → Lead Engine → Airtable + Slack

---

## Pending Infrastructure Tasks

- [x] ~~Tunnel permanent n8n.webmindlab.com~~ ✅ DONE
- [x] ~~Email Resend Lead Engine~~ ✅ DONE
- [ ] Build Call Engine workflow in n8n
- [ ] Build Review Engine workflow in n8n

---

## Git & Deploy

- **Git user.email** : `fares@webmindlab.tech` (même email pour tout — GitHub, Vercel, Cloudflare)
- **CRITIQUE** : Si l'email du commit est différent, Vercel bloque le deploy (`TEAM_ACCESS_REQUIRED`)
- Fix : `git config user.email "fares@webmindlab.tech"` + amend + force push

---

## Key Credentials (IDs only — secrets in .env)

| Service | ID / Reference |
|---|---|
| Airtable base | `appFknzmZRW97vPCE` |
| n8n Airtable credential | `8R0QX9LyMuQ7EfzD` |
| n8n Slack credential | `2A4Lj5Qm3bQzB9c0` |
| n8n Anthropic credential | `ce1nWiRGSuHpfrze` |
| Lead email | fares@webmindlab.tech |

---

## Reference Docs

Read relevant docs before implementing. Use @-imports on demand:

- Architecture patterns: @docs/architecture.md
- Automation design principles: @docs/automation-playbook.md
- Client onboarding process: @docs/client-onboarding.md
- Offers plan: @docs/offers-plan.md

Core system templates:
- @systems/lead-engine.md
- @systems/call-engine.md
- @systems/review-engine.md

Memory files (persistent context):
- @memory/MEMORY.md — index of all session memory
- @memory/project_lead_engine.md — Lead Engine full details
- @memory/project_infrastructure.md — infra, DNS, Vercel, tunnels
- @memory/project_linkedin_launch.md — LinkedIn campaign
- @memory/project_webmind_systems.md — 4 systems overview
