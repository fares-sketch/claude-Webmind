# Twilio Integration — WebMind

Setup reference for SMS and call workflows.

---

## Required Credentials

| Variable | Value |
|---|---|
| `TWILIO_ACCOUNT_SID` | `stored in .n8n/.env` |
| `TWILIO_AUTH_TOKEN` | `stored in .n8n/.env` |
| `TWILIO_MESSAGING_SERVICE_SID` | `stored in .n8n/.env` |
| `ALPHANUMERIC_SENDER_ID` | `WEBMIND` |

Store in n8n credentials — never hardcode in workflows.

---

## SMS Node (n8n)

```json
{
  "to": "{{ $json.phone }}",
  "from": "{{ $env.TWILIO_PHONE_NUMBER }}",
  "body": "{{ $json.sms_message }}"
}
```

Always validate phone format before sending: `+[country code][number]`

---

## Inbound Call Webhook

Configure in Twilio Console → Phone Numbers → Voice:

```
Webhook URL: https://[n8n-instance]/webhook/twilio-inbound
Method: HTTP POST
```

n8n receives: `CallSid`, `From`, `To`, `CallStatus`

---

## Call Transfer (TwiML)

```xml
<Response>
  <Dial>[destination_number]</Dial>
</Response>
```

Return this from n8n when intent requires human transfer.

---

## Common Errors

| Error | Cause | Fix |
|---|---|---|
| 21211 | Invalid phone number | Validate E.164 format |
| 21608 | Unverified number (trial) | Upgrade account or verify number |
| 20003 | Auth failure | Check SID and token |

---

## Rules

- Always use n8n credentials store for Twilio keys
- Validate phone numbers before every SMS send
- Log all outbound SMS to Airtable (timestamp, recipient, content)
- Test with a verified number before deploying to production
