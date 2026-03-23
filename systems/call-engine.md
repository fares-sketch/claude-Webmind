# Call Engine

Handle inbound calls automatically. Route intelligently, log everything.

---

## Flow

```
Incoming call (Twilio)
  → Retell AI voice agent answers
  → AI classifies intent (support / sales / booking / other)
  → Route: transfer to agent OR handle autonomously
  → Call ends
  → Retell AI fires webhook to n8n
  → n8n triggers Claude API: generates call summary + confirms intent
  → CRM entry created (caller, intent, summary, duration)
  → Team notified via Slack
  → Optional: SMS follow-up sent to caller post-call
```

---

## Intent Classification

| Intent | Action |
|---|---|
| Sales inquiry | Transfer to sales + notify Slack |
| Support issue | Handle via AI or transfer to support |
| Booking request | Trigger booking workflow |
| Unknown | Transfer to receptionist |

---

## Inputs

- Caller ID (Twilio)
- Call transcript (Retell AI)
- Timestamp and duration

---

## Outputs

- CRM record: caller, intent, summary, duration
- Slack alert: intent + summary (sales or support channel)
- Optional: SMS follow-up to caller post-call

---

## Integrations

| Step | Tool |
|---|---|
| Inbound call | Twilio |
| Voice agent | Retell AI |
| AI summary + intent | Claude API |
| CRM | HubSpot / Airtable |
| Notifications | Slack |
| SMS follow-up | Twilio |
| Orchestration | n8n |

---

## Error Handling

- Retell AI webhook failure → retry 3× with exponential backoff
- AI summary failure → log raw transcript to CRM, flag for manual review
- CRM write failure → log to error queue, alert on-call via Slack
- Transfer failure → fallback to voicemail + Slack alert with caller ID

---

## Monitoring

- **Volume** — calls handled per day/week
- **Intent breakdown** — % sales / support / booking / unknown
- **Transfer rate** — % calls escalated to a human agent
- **Resolution time** — median call duration per intent
- Alert if no calls received in a 4-hour window during business hours
- Alert if AI transfer failure rate exceeds 5%

---

## Voice Agent Config

See @prompts/voice-agent.md for the system prompt.
See @integrations/twilio.md for webhook setup.

---

## Reuse Checklist

- [ ] Twilio number configured
- [ ] Retell AI agent created with client-specific prompt
- [ ] Intent categories adapted to client's business
- [ ] CRM fields mapped
- [ ] Slack routing configured per intent
