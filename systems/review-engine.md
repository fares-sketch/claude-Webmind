# Review Engine

Automate review collection after every customer interaction.

---

## Flow

```
Customer interaction logged (CRM or n8n trigger)
  → Wait X hours (configurable per client)
  → n8n sends SMS via Twilio with review link
  → Customer leaves Google review
  → n8n polls for new review
  → Reputation score updated in Airtable
  → Team notified of new reviews (Slack)
```

---

## Trigger Conditions

| Event | Delay before SMS |
|---|---|
| Completed call | 2 hours |
| Closed support ticket | 4 hours |
| Service delivered | 24 hours |
| Purchase confirmed | 1 hour |

---

## SMS Template

```
Hi [First Name], thanks for choosing [Business Name].
We'd love your feedback — it only takes 30 seconds:
[Google Review Link]
```

Adapt tone per client. Keep under 160 characters.

---

## Inputs

- Customer name and phone (from CRM)
- Interaction type and timestamp
- Google Business profile ID

---

## Outputs

- SMS sent via Twilio
- Review count tracked in Airtable
- Slack alert on new review with star rating

---

## Integrations

| Step | Tool |
|---|---|
| Trigger | CRM (HubSpot / Airtable) or n8n scheduled check |
| SMS delivery | Twilio |
| Review platform | Google Business API |
| Review tracking | Airtable |
| Notifications | Slack |
| Orchestration | n8n |

---

## Error Handling

- SMS delivery failure → fallback to email, log failure in Airtable
- Google API polling failure → retry 3× with exponential backoff, alert on-call
- CRM trigger failure → log to error queue, flag interaction for manual follow-up
- Invalid phone number → skip SMS, send email if available, log for data cleanup

---

## Monitoring

- **Volume** — SMS sent per day/week per client
- **Delivery rate** — % SMS delivered successfully
- **Review conversion rate** — % SMS sent → review left
- **Average star rating** — tracked per week in Airtable
- Alert if review conversion rate drops below 10% (possible broken link or SMS issue)
- Alert if SMS delivery failure rate exceeds 5%

---

## Goal

> Automate review collection after every interaction.
> Increase Google review volume without manual outreach.

---

## Reuse Checklist

- [ ] Trigger event defined with client
- [ ] SMS delay configured
- [ ] Google Business profile connected
- [ ] SMS template reviewed and approved
- [ ] Airtable tracking sheet set up
- [ ] Slack channel for new review alerts configured
