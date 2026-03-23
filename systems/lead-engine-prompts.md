# Lead Engine — Prompts & Templates

## 1. Prompt Claude — Scoring & Qualification

### Système

```
Tu es un expert en qualification de leads B2B.
Tu analyses les soumissions de formulaire et retournes uniquement un JSON valide, sans texte autour.
```

### Utilisateur

```
Analyse ce lead et retourne exactement ce JSON (rien d'autre) :

{
  "score": "Hot" | "Warm" | "Cold",
  "raison": "string (max 2 phrases, en français)",
  "intent_signals": ["signal1", "signal2"],
  "action": "string (prochaine étape recommandée)",
  "urgence": "high" | "medium" | "low"
}

Critères de scoring :
- Hot  = intention d'achat claire + entreprise identifiable + urgence exprimée
- Warm = intérêt réel mais urgence absente ou information incomplète
- Cold = curieux, étudiant, concurrent, message vague ou hors cible

Données du lead :
Nom         : {{name}}
Email       : {{email}}
Téléphone   : {{phone}}
Entreprise  : {{company}}
Message     : {{message}}
Source      : {{source}}
Date        : {{timestamp}}
```

### Exemple de réponse attendue

```json
{
  "score": "Hot",
  "raison": "Le lead mentionne explicitement une implémentation urgente pour son équipe commerciale de 15 personnes. L'entreprise est identifiable et le message indique une décision d'achat imminente.",
  "intent_signals": ["urgence", "taille équipe mentionnée", "budget évoqué"],
  "action": "Contacter dans les 30 minutes avec une proposition de démo personnalisée",
  "urgence": "high"
}
```

---

## 2. Templates SMS — Confirmation Lead

### Hot / Warm (envoyé au lead)

```
Bonjour {{prenom}}, merci pour votre message !
Notre équipe vous contacte dans moins d'une heure.
En attendant, réservez un créneau : {{lien_booking}}
— {{nom_entreprise}}
```

### Cold (nurture J0)

```
Bonjour {{prenom}}, merci de votre intérêt pour {{nom_entreprise}}.
Découvrez comment nous automatisons vos process : {{lien_ressource}}
On reste disponibles pour toute question.
```

---

## 3. Template Slack — Notification Commercial

```
🔥 Nouveau lead *{{score}}* reçu

*Nom :* {{name}}
*Entreprise :* {{company}}
*Email :* {{email}}
*Téléphone :* {{phone}}

*Résumé IA :* {{raison}}
*Signaux détectés :* {{intent_signals}}
*Action recommandée :* {{action}}

👉 <{{lien_crm}}|Ouvrir dans le CRM>
```

---

## 4. Séquence Email Nurture — Cold Leads

### J0 — Email de bienvenue

```
Objet : Bienvenue {{prenom}} — voici ce que nous faisons pour vous

Bonjour {{prenom}},

Merci d'avoir contacté {{nom_entreprise}}.

Nous aidons les entreprises comme la vôtre à automatiser leurs processus répétitifs
pour que vos équipes se concentrent sur ce qui compte vraiment.

Voici 3 résultats concrets obtenus chez nos clients :
• Temps de réponse lead : de 4h à 60 secondes
• Volume d'avis Google : ×4 en 30 jours
• Appels traités 24/7 sans coût supplémentaire

Je reste disponible pour échanger.

[Prénom] — {{nom_entreprise}}
```

### J1 — Valeur (cas client)

```
Objet : Comment [Client X] a automatisé 80% de ses suivis en 2 semaines

Bonjour {{prenom}},

[Court cas client ou lien vers une ressource de valeur]

Si vous voulez voir concrètement comment ça marche pour votre secteur :
→ {{lien_booking}}

[Prénom]
```

### J3 — Check-in

```
Objet : Toujours là si vous avez des questions, {{prenom}}

Bonjour {{prenom}},

Je voulais m'assurer que vous avez bien reçu mon dernier message.

Avez-vous 15 minutes cette semaine pour un échange rapide ?
→ {{lien_booking}}

[Prénom]
```

### J7 — Dernière relance

```
Objet : Dernière tentative — {{prenom}}

Bonjour {{prenom}},

Je ne voudrais pas être intrusif, donc ce sera mon dernier message.

Si vous décidez un jour d'automatiser vos process, nous serons là.
→ {{lien_booking}}

Bonne continuation,
[Prénom] — {{nom_entreprise}}
```

---

## 5. Variables globales à configurer par client

| Variable | Description | Exemple |
|---|---|---|
| `{{nom_entreprise}}` | Nom du client final | Prestige Motors |
| `{{lien_booking}}` | Lien Calendly / Cal.com | cal.com/prestige/demo |
| `{{lien_crm}}` | Base URL du CRM | app.hubspot.com/contacts |
| `{{lien_ressource}}` | Contenu nurture J0 | site.com/guide |
| `slack_channel_sales` | Canal Slack commercial | #leads-chauds |
| `crm_pipeline_id` | ID pipeline CRM | pipeline_001 |
| `twilio_from` | Numéro Twilio expéditeur | +33XXXXXXXXX |
