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
| Orchestration | n8n |
| Telephony | Twilio |
| Voice agents | Retell AI |
| AI models | Claude (primary) / OpenAI |
| Data | Google Sheets / Airtable |
| Notifications | Slack / SMS / Email |

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

---

## Reference Docs

Read relevant docs before implementing. Use @-imports on demand:

- Architecture patterns: @docs/architecture.md
- Automation design principles: @docs/automation-playbook.md
- Client onboarding process: @docs/client-onboarding.md

Core system templates:
- @systems/lead-engine.md
- @systems/call-engine.md
- @systems/review-engine.md