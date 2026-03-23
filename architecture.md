# Architecture — WebMind

Every client system is built on 5 stacked layers. All automations flow through them in order.

---

## Layer Stack

| # | Layer | Role | Tools |
|---|---|---|---|
| 1 | **Smart Website** | Capture leads, questions, requests | Forms, chat widgets |
| 2 | **Automation Engine** | Orchestrate events, route data between layers | n8n |
| 3 | **AI Layer** | Classify requests, summarize, qualify, assist | Claude / OpenAI |
| 4 | **Data Layer** | Store leads, calls, interactions | Airtable / Google Sheets / CRM |
| 5 | **Notification Layer** | Alert teams on key events | Slack / SMS / Email |

---

## Standard Flow

```
Website form → AI qualification → CRM entry → Sales notification → Follow-up automation
```

Layer sequence: 1 → 3 → 4 → 5 → 2 (loop back for follow-ups)

---

## Design Rules

- Implement all 5 layers on every project — partial builds are not reusable templates
- n8n is the single orchestration point — never bypass it to connect layers directly
- AI layer runs after capture and before data storage — never reverse this order
- Notifications fire only after data is committed to the Data Layer
- Every layer must have a defined failure path before implementation starts

---

## Reference Systems

Concrete implementations of this architecture:

- [systems/lead-engine.md](systems/lead-engine.md)
- [systems/call-engine.md](systems/call-engine.md)
- [systems/review-engine.md](systems/review-engine.md)
