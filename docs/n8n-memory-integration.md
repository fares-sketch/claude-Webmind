# n8n Memory Integration

Comment brancher `/api/memory` dans tes workflows n8n pour donner de la mémoire à Claude.

---

## Setup Airtable (une seule fois)

Crée une table **WorkflowMemory** dans ta base Airtable (`appFknzmZRW97vPCE`) avec ces champs :

| Champ | Type |
|-------|------|
| `key` | Single line text |
| `value` | Long text |
| `workflow` | Single line text |
| `updatedAt` | Date and time |

---

## Variables d'environnement n8n

Dans ton fichier `.env` n8n (ou via Settings → Variables) :

```
MEMORY_API_URL=https://claude-webmind.vercel.app
MEMORY_API_KEY=your_memory_api_key_here
```

> Remplace par ton domaine une fois le DNS propagé (`webmindlab.tech`).

---

## Pattern type : READ → Claude → WRITE

### Node 1 — Lire la mémoire (avant Claude)

**Type** : HTTP Request

```
Method  : GET
URL     : {{ $env.MEMORY_API_URL }}/api/memory?key=lead:{{ $json.email }}
Headers :
  x-api-key : {{ $env.MEMORY_API_KEY }}
```

**On Error** : Continue (si pas de mémoire existante → renvoie 404, c'est normal)

**Output mapping** (dans le node suivant) :
```javascript
// Récupère la mémoire ou chaîne vide
const memory = $('Read Memory').first()?.json?.value ?? ''
```

---

### Node 2 — Appel Claude avec contexte mémoire

**Type** : HTTP Request (ou node Claude/OpenAI)

```
Method  : POST
URL     : https://api.anthropic.com/v1/messages
Headers :
  x-api-key         : {{ $env.ANTHROPIC_API_KEY }}
  anthropic-version : 2023-06-01
  content-type      : application/json

Body (JSON) :
{
  "model": "claude-opus-4-6",
  "max_tokens": 1024,
  "system": "Tu es un qualificateur de leads pour WebMind.\n\nContexte mémoire du lead :\n{{ $('Read Memory').first().json.value ?? 'Aucun historique.' }}",
  "messages": [
    {
      "role": "user",
      "content": "Qualifie ce lead :\nNom : {{ $json.name }}\nEmail : {{ $json.email }}\nEntreprise : {{ $json.company }}\nMessage : {{ $json.message }}"
    }
  ]
}
```

---

### Node 3 — Écrire la mémoire (après Claude)

**Type** : HTTP Request

```
Method  : POST
URL     : {{ $env.MEMORY_API_URL }}/api/memory
Headers :
  x-api-key    : {{ $env.MEMORY_API_KEY }}
  content-type : application/json

Body (JSON) :
{
  "key": "lead:{{ $('Webhook').first().json.email }}",
  "workflow": "lead-engine",
  "value": {
    "lastContact": "{{ $now }}",
    "qualification": "{{ $('Claude Qualification').first().json.content[0].text }}",
    "name": "{{ $('Webhook').first().json.name }}",
    "company": "{{ $('Webhook').first().json.company }}"
  }
}
```

---

## Clés de mémoire recommandées par workflow

| Workflow | Clé | Exemple |
|----------|-----|---------|
| Lead Engine | `lead:<email>` | `lead:marc@renault.fr` |
| Call Engine | `call:<phone>` | `call:+33612345678` |
| Review Engine | `review:<customerId>` | `review:cust_42` |
| Global | `global:<context>` | `global:pricing-2024` |

---

## Intégration dans le Lead Engine existant

Dans le workflow **WebMind — Lead Engine** (ID: `yoFumIpVN3yHSrIx`), ajoute 2 nodes :

```
Webhook
  ↓
[Read Memory]        ← nouveau : GET /api/memory?key=lead:{{ email }}
  ↓
AI Lead Qualification (Claude)  ← injecte memory dans le system prompt
  ↓
Airtable (CRM Entry)
  ↓
[Write Memory]       ← nouveau : POST /api/memory { key, value, workflow }
  ↓
Slack + SMS
```

---

## Test rapide (curl)

```bash
# Écrire
curl -X POST https://claude-webmind.vercel.app/api/memory \
  -H "x-api-key: your_memory_api_key_here" \
  -H "content-type: application/json" \
  -d '{"key":"lead:test@test.com","value":"Lead chaud, intéressé par le Lead Engine","workflow":"lead-engine"}'

# Lire
curl "https://claude-webmind.vercel.app/api/memory?key=lead:test@test.com" \
  -H "x-api-key: your_memory_api_key_here"

# Lister tout le lead-engine
curl "https://claude-webmind.vercel.app/api/memory?workflow=lead-engine" \
  -H "x-api-key: your_memory_api_key_here"
```
