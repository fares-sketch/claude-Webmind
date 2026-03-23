# Lead Engine

## Purpose

Capture and qualify leads automatically — reducing human intervention in the top-of-funnel process while ensuring only high-intent prospects reach the sales team.

---

## Flow

```
Website Form
     │
     ▼
AI Lead Qualification
     │
     ├─── Low intent  ──→  Nurture sequence (email drip)
     │
     └─── High intent ──→  CRM Entry
                                │
                                ▼
                          SMS Confirmation (to lead)
                                │
                                ▼
                          Sales Notification (to rep)
                                │
                                ▼
                          Follow-up Automation
```

---

## Steps

### 1. Website Form
- Capture: name, email, phone, company, message
- Trigger: form submission fires a webhook to n8n
- Validation: required fields, email format, spam filter (honeypot + rate limit)

### 2. AI Lead Qualification
- Score the lead based on: company size, message intent, source, industry
- Classify as **Hot**, **Warm**, or **Cold**
- Extract key intent signals from the free-text message field
- Route accordingly — Cold leads enter a nurture sequence, Hot/Warm proceed

### 3. CRM Entry
- Create or update contact record automatically
- Tag with lead score, source, and qualification timestamp
- Assign to the correct sales rep based on territory or round-robin rule

### 4. SMS Confirmation
- Send an instant confirmation to the lead's phone number
- Personalized with their first name and expected response time
- Includes a direct booking link (Calendly / Cal.com)

### 5. Sales Notification
- Alert the assigned rep via Slack or email within 60 seconds of form submission
- Include: lead name, score, company, message summary, CRM link
- Escalate to manager if unacknowledged after 30 minutes

### 6. Follow-up Automation
- **Day 0** — SMS confirmation + welcome email
- **Day 1** — Value email (case study or demo video)
- **Day 3** — Check-in email if no reply
- **Day 7** — Final outreach + soft close
- Stop sequence automatically when lead replies or books a call

---

## Trigger

`POST /webhook/lead-capture` — fired on every form submission.

---

## Integrations

| Step | Tool |
|------|------|
| Form | Typeform / Webflow / Custom HTML |
| AI Qualification | Claude API (intent scoring) |
| CRM | HubSpot / Notion / Airtable |
| SMS | Twilio |
| Notifications | Slack + Email (SMTP) |
| Booking | Calendly / Cal.com |
| Orchestration | n8n |

---

## Error Handling

- Form webhook failure → retry 3× with exponential backoff
- AI scoring failure → default to **Warm** and flag for manual review
- CRM write failure → log to error queue, alert on-call
- SMS delivery failure → fallback to email confirmation

---

## Monitoring

- **Volume** — leads captured per day/week
- **Qualification rate** — % scored Hot vs. Warm vs. Cold
- **Response time** — median time from form → sales notification
- **Conversion rate** — leads booked → deals closed
- Alert if no leads received in a 24-hour window (possible form breakage)

---

## Goal

> Reduce lead response time from hours to under 60 seconds.
> Increase conversion by routing only qualified, context-rich leads to sales.
