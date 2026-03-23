# Automation Playbook — WebMind

Define these 5 elements before designing any workflow. No exceptions.

---

## Workflow Design Framework

| # | Element | Question to answer |
|---|---|---|
| 1 | **Trigger** | What event starts the workflow? |
| 2 | **Input** | What data is received? What is its format? |
| 3 | **Processing** | What AI or logic is applied? |
| 4 | **Action** | What happens as a result? |
| 5 | **Feedback** | What is stored or sent to the team? |

---

## Example — Inbound Call

```
Trigger   → Incoming call via Twilio
Input     → Caller ID, timestamp, intent (via Retell AI)
Process   → AI classifies intent (support / sales / other)
Action    → Route to agent OR handle autonomously
Feedback  → Call summary → CRM entry → Slack notification to sales team
```

---

## Example — Lead Capture

```
Trigger   → Website form submission
Input     → Name, email, message, source
Process   → AI qualifies lead (hot / warm / cold)
Action    → CRM entry + SMS confirmation to lead
Feedback  → Sales notification with lead score
```

---

## Design Rules

- Define trigger and input before touching n8n
- Never process data without storing a copy in the Data Layer first
- Every workflow must handle empty, malformed, or duplicate inputs
- Use AI classification only when the output feeds a branching decision
- Keep workflows under 15 nodes — split into sub-workflows if needed
