# WebMind — Plan d'Offres & Implémentation

> Document de référence interne. Couvre les 4 systèmes core de WebMind : architecture, stack, flux complet, livrables et critères de succès.

---

## Vue d'ensemble

| # | Système | Problème résolu | Canal principal | Délai de déploiement |
|---|---|---|---|---|
| 1 | Lead Engine | Leads non traités, réponse lente | Web → CRM → SMS | 5–7 jours |
| 2 | Call Engine | Appels manqués, zéro traçabilité | Voix → CRM → Slack | 7–10 jours |
| 3 | Review Engine | Peu d'avis Google, collecte manuelle | SMS post-interaction | 3–5 jours |
| 4 | Brain Engine | Équipe dispersée, pas de mémoire interne | Chat / Slack / Email | 10–14 jours |

---

---

# Système 1 — Lead Engine

## Problème

Le client reçoit des soumissions de formulaire mais répond en heures, parfois en jours. Aucun tri automatique. Le commercial traite les mauvais leads en priorité. Conversion faible.

## Objectif

> Répondre à chaque lead en moins de 60 secondes. Ne transmettre au commercial que les leads qualifiés avec contexte complet.

---

## Architecture

```
[Formulaire web]
      │
      │  POST webhook
      ▼
[n8n — Réception & validation]
      │
      ├── Champ manquant / spam → Log + rejet silencieux
      │
      ▼
[Claude API — Scoring & qualification]
      │
      │  Analyse : intention, secteur, taille, message
      │  Output : Hot / Warm / Cold + résumé 2 lignes
      │
      ├── Cold ──────────────────────────────────────┐
      │                                               ▼
      │                                    [Séquence nurture email]
      │                                    J0 welcome / J3 valeur
      │                                    J7 relance / J14 close
      │
      └── Hot / Warm ──────────────────────────────┐
                                                    ▼
                                          [CRM — Création contact]
                                          Tags : score, source, date
                                          Assignation rep (round-robin)
                                                    │
                                          ┌─────────┴──────────┐
                                          ▼                     ▼
                               [SMS → Lead]          [Slack → Commercial]
                               Confirmation          Alerte < 60 sec
                               + lien booking        Nom / score / résumé / lien CRM
                                                                │
                                                                ▼ (si pas de réponse en 30 min)
                                                    [Escalade → Manager]
```

---

## Séquence de follow-up automatique

| Jour | Canal | Contenu |
|---|---|---|
| J0 | SMS | Confirmation de réception + lien booking |
| J0 | Email | Email de bienvenue personnalisé |
| J1 | Email | Cas client ou vidéo de démo |
| J3 | Email | Check-in si pas de réponse |
| J7 | Email + SMS | Dernière relance + soft close |

Arrêt automatique dès que le lead répond ou prend un RDV.

---

## Stack

| Étape | Outil |
|---|---|
| Formulaire | Typeform / Webflow / HTML custom |
| Orchestration | n8n |
| Scoring IA | Claude API (`claude-sonnet-4-6`) |
| CRM | HubSpot / Airtable |
| SMS | Twilio |
| Email | SMTP / SendGrid / Resend |
| Booking | Calendly / Cal.com |
| Notifications | Slack (webhook) |

---

## Prompt Claude — Qualification

```
Tu es un expert en qualification de leads B2B.

Analyse ce lead et retourne un JSON structuré :
- score: "Hot" | "Warm" | "Cold"
- raison: string (max 2 phrases)
- intent_signals: string[] (mots clés détectés)
- recommended_action: string

Données du lead :
Nom : {{name}}
Email : {{email}}
Entreprise : {{company}}
Message : {{message}}
Source : {{source}}

Critères :
- Hot = intention d'achat claire, entreprise identifiable, urgence exprimée
- Warm = intérêt présent mais pas d'urgence ou info incomplète
- Cold = curieux, étudiant, concurrent, message vague ou hors cible
```

---

## Gestion d'erreurs

| Erreur | Action |
|---|---|
| Webhook formulaire échoue | Retry ×3 avec backoff exponentiel (1s, 5s, 30s) |
| Claude API indisponible | Score par défaut = Warm, flag manuel |
| Échec écriture CRM | Log dans file d'attente, alerte Slack on-call |
| SMS non délivré | Fallback email, log dans Airtable |
| Numéro invalide | Email uniquement, log pour nettoyage data |

---

## Monitoring

- Volume de leads par jour / semaine
- Taux Hot vs Warm vs Cold
- Délai médian : soumission → notif commercial
- Taux de conversion : lead → RDV → deal
- Alerte si aucun lead reçu en 24h (formulaire potentiellement cassé)

---

## Livrables client

- [ ] Workflow n8n exporté (JSON)
- [ ] Prompt Claude documenté et versionné
- [ ] CRM configuré avec tags et assignation
- [ ] Séquence email rédigée et validée client
- [ ] Dashboard monitoring (Airtable ou HubSpot)
- [ ] Runbook d'exploitation

---

---

# Système 2 — Call Engine

## Problème

Les appels entrants ne sont pas toujours pris. Pas de logs. Le commercial ne sait pas ce qui a été dit. Aucune action post-appel automatique.

## Objectif

> Zéro appel manqué. Chaque appel loggé, résumé, et routé vers la bonne action en moins de 2 minutes.

---

## Architecture

```
[Appel entrant — Twilio]
      │
      ▼
[Retell AI — Agent vocal]
      │  Répond immédiatement, 24/7
      │  Collecte : nom, intention, contexte
      │
      ├── Intent = Vente ────────────────────────┐
      ├── Intent = Support ──────────────────────┤
      ├── Intent = Booking ─────────────────────┤
      └── Intent = Inconnu ────────────────────┐ │
                                               ▼ ▼
                                    [Transfert humain / voicemail]
                                    + Alerte Slack immédiate
      │
      ▼ (fin d'appel)
[Retell AI → Webhook → n8n]
      │  Payload : transcript, durée, caller ID, intent détecté
      │
      ▼
[Claude API — Résumé + confirmation intent]
      │  Output : résumé structuré, intent validé, action recommandée
      │
      ┌────────────────────┬──────────────────────┐
      ▼                    ▼                      ▼
[CRM — Fiche appel]  [Slack — Alerte équipe]  [SMS — Suivi caller]
Caller, intent,      Canal selon intent        "Merci pour votre appel,
résumé, durée        + résumé 3 lignes         voici ce qu'on fait ensuite..."
```

---

## Classification des intentions

| Intention détectée | Action Retell AI | Notification |
|---|---|---|
| Demande commerciale | Transfert commercial + Slack #sales | Immédiate |
| Problème support | Résolution IA ou transfert #support | Immédiate |
| Prise de RDV | Déclenchement workflow booking | Après appel |
| Inconnu / autre | Transfert standard + voicemail | Slack #general |

---

## Stack

| Étape | Outil |
|---|---|
| Réception appel | Twilio (numéro dédié) |
| Agent vocal | Retell AI |
| Résumé & intent | Claude API (`claude-sonnet-4-6`) |
| Orchestration | n8n |
| CRM | HubSpot / Airtable |
| Notifications | Slack |
| SMS post-appel | Twilio |

---

## Prompt Claude — Résumé d'appel

```
Tu es un assistant de gestion de la relation client.

À partir de ce transcript d'appel, génère un JSON structuré :
- intent: "sales" | "support" | "booking" | "unknown"
- summary: string (3 phrases max, ton professionnel)
- caller_name: string (extrait du transcript ou "Inconnu")
- action_required: string (prochaine étape recommandée)
- urgency: "high" | "medium" | "low"

Transcript :
{{transcript}}

Durée : {{duration}} secondes
Caller ID : {{caller_id}}
```

---

## Configuration Retell AI

```
Persona : Assistant de [Nom du client]
Ton : Professionnel, chaleureux, efficace
Langue : Français (adapter par client)

Objectif : Identifier l'intention de l'appelant en moins de 30 secondes
           et router vers la bonne action.

Script d'ouverture :
"Bonjour, vous avez joint [Nom de l'entreprise], je suis [Prénom IA].
Comment puis-je vous aider aujourd'hui ?"

Questions de qualification :
1. "Pouvez-vous me préciser la nature de votre demande ?"
2. "Avez-vous déjà travaillé avec nous ou c'est votre premier contact ?"

Fin d'appel :
"Parfait, je transmets votre demande immédiatement.
Vous recevrez un SMS de confirmation dans quelques minutes."
```

---

## Gestion d'erreurs

| Erreur | Action |
|---|---|
| Webhook Retell échoue | Retry ×3, backoff exponentiel |
| Claude API indisponible | Transcript brut loggé dans CRM, flag manuel |
| Échec écriture CRM | Log error queue, alerte Slack on-call |
| Transfert échoue | Bascule voicemail + Slack immédiat avec caller ID |
| Retell AI indisponible | Twilio bascule sur message d'accueil + callback request |

---

## Monitoring

- Volume d'appels par jour / semaine
- Répartition par intention (vente / support / booking / inconnu)
- Taux de transfert humain vs traitement IA
- Durée médiane par intention
- Alerte si taux d'échec de transfert > 5%
- Alerte si aucun appel reçu pendant 4h en heures ouvrables

---

## Livrables client

- [ ] Numéro Twilio configuré
- [ ] Agent Retell AI créé avec prompt adapté au client
- [ ] Workflow n8n exporté (JSON)
- [ ] Mapping intentions → canaux Slack
- [ ] CRM champs mappés et testés
- [ ] Runbook d'exploitation + guide escalade

---

---

# Système 3 — Review Engine

## Problème

Peu d'avis Google malgré des clients satisfaits. La collecte est manuelle, irrégulière, et dépend de la mémoire de l'équipe. Les avis négatifs ne sont pas détectés rapidement.

## Objectif

> Automatiser la collecte d'avis après chaque interaction. Multiplier le volume d'avis Google sans intervention humaine.

---

## Architecture

```
[Événement client — CRM ou n8n trigger]
      │  Types : appel terminé, ticket fermé, service livré, achat confirmé
      │
      ▼
[n8n — Attente configurable]
      │  2h après appel / 4h après ticket / 24h après livraison
      │
      ▼
[Twilio — SMS personnalisé]
      │  "Bonjour [Prénom], merci pour votre confiance.
      │   Un avis rapide ? [lien Google]"
      │
      ▼
[Client laisse un avis Google]
      │
      ▼
[n8n — Polling Google Business API]
      │  Vérification toutes les heures
      │
      ├── Nouvel avis détecté ──────────────────────┐
      │                                              ▼
      │                                  [Airtable — Mise à jour score]
      │                                  + [Slack — Alerte équipe]
      │                                  Note, texte, date, auteur
      │
      └── Avis négatif (1-2 étoiles) ──────────────┐
                                                     ▼
                                         [Alerte prioritaire Slack]
                                         + Assignation réponse manuelle
```

---

## Délais d'envoi par type d'interaction

| Événement | Délai SMS |
|---|---|
| Appel terminé | 2 heures |
| Ticket support fermé | 4 heures |
| Service / prestation livré | 24 heures |
| Achat / commande confirmé | 1 heure |

---

## Templates SMS

**Standard (< 160 caractères) :**
```
Bonjour [Prénom], merci de faire confiance à [Entreprise].
Un avis rapide nous aiderait beaucoup : [lien]
```

**Post-service :**
```
Bonjour [Prénom], votre [service] est terminé.
Partagez votre expérience en 30 sec : [lien]
```

**Post-achat :**
```
Merci [Prénom] pour votre commande chez [Entreprise] !
Votre avis compte pour nous : [lien]
```

---

## Stack

| Étape | Outil |
|---|---|
| Déclencheur | CRM (HubSpot / Airtable) ou n8n scheduled |
| Orchestration | n8n |
| SMS | Twilio |
| Plateforme avis | Google Business API |
| Tracking | Airtable |
| Notifications | Slack |

---

## Gestion d'erreurs

| Erreur | Action |
|---|---|
| SMS non délivré | Fallback email, log dans Airtable |
| Numéro invalide | Email uniquement, log pour nettoyage data |
| Google API polling échoue | Retry ×3 backoff exponentiel, alerte on-call |
| Trigger CRM échoue | Log error queue, flag interaction pour suivi manuel |
| Lien Google invalide | Alerte immédiate équipe, suspension des envois |

---

## Monitoring

- Volume de SMS envoyés par jour / semaine / client
- Taux de livraison SMS
- Taux de conversion : SMS envoyé → avis laissé
- Note moyenne hebdomadaire (Airtable)
- Alerte si taux de conversion < 10%
- Alerte si taux d'échec SMS > 5%

---

## Livrables client

- [ ] Triggers CRM configurés par type d'événement
- [ ] Délais SMS validés avec le client
- [ ] Google Business Profile connecté
- [ ] Templates SMS rédigés et approuvés
- [ ] Airtable tracking configuré
- [ ] Alerte avis négatif testée
- [ ] Runbook d'exploitation

---

---

# Système 4 — Brain Engine

## Problème

L'équipe perd du temps à chercher des informations en interne. Les process ne sont pas respectés car personne ne s'en souvient. Les nouvelles recrues mettent des semaines à monter en compétence. Les décisions sont répétées sans mémoire collective.

## Objectif

> Donner à chaque membre de l'équipe un assistant IA qui connaît tout de l'entreprise — ses process, ses clients, ses décisions — et qui structure leur journée automatiquement.

---

## Architecture

```
[Sources internes]
      │
      ├── Google Drive / Notion (docs, playbooks, process)
      ├── CRM (état clients, deals, historique)
      ├── Call Engine (transcripts, résumés d'appels)
      ├── Slack (décisions d'équipe, contexte)
      └── Emails (Gmail / Outlook via OAuth)
      │
      ▼
[n8n — Pipeline d'ingestion (scheduled)]
      │  Sync quotidien ou à chaque modification
      │  Chunking + embedding des documents
      │
      ▼
[Base vectorielle — Supabase pgvector / Pinecone]
      │  Index sémantique de toutes les ressources internes
      │
      ▼
[Claude API — RAG Engine]
      │  Retrieval Augmented Generation
      │  Contexte = ressources internes uniquement
      │  Pas d'hallucination sur des données externes
      │
      ├── [Interface chat web (Next.js)]
      │   Accessible par les employés authentifiés
      │
      ├── [Slack Bot]
      │   /ask [question] dans n'importe quel canal
      │
      └── [Daily Briefing automatique]
            Envoyé chaque matin à 8h
            Tâches prioritaires, leads chauds, RDV du jour
```

---

## Fonctionnalités

### Daily Briefing (8h chaque matin)

Envoyé automatiquement par Slack ou email à chaque membre de l'équipe :

```
Bonjour [Prénom], voici votre brief du [date] :

PRIORITÉS DU JOUR
• 3 leads Hot en attente de contact (Lead Engine)
• RDV client à 14h00 — [Nom entreprise] — prep deck à finaliser
• Ticket support ouvert depuis 48h — escalade recommandée

PIPELINE COMMERCIAL
• 2 deals en phase de négociation — relance prévue aujourd'hui
• 1 proposition envoyée il y a 5 jours — aucune réponse

ALERTES
• Avis Google 2 étoiles reçu hier — réponse manuelle recommandée
```

### Q&A interne

Les employés posent des questions en langage naturel :

- "Quel est notre process d'onboarding pour un nouveau client ?"
- "Quelle est notre politique de remboursement ?"
- "Comment on a géré le dernier problème Twilio ?"
- "Qui est en charge du compte [Client X] ?"

L'IA répond uniquement à partir des documents internes indexés.

### Rédaction contextuelle

- Emails clients rédigés dans le ton de l'entreprise
- Comptes-rendus de réunion structurés
- Propositions commerciales pré-remplies
- Messages Slack de follow-up automatiques

### Mémoire des décisions

Chaque décision importante loguée dans Notion ou Slack est indexée automatiquement → retrouvable en quelques secondes via le chat.

---

## Stack

| Couche | Outil |
|---|---|
| Ingestion & sync | n8n (scheduled, event-driven) |
| Chunking / embedding | OpenAI `text-embedding-3-small` ou Voyage AI |
| Base vectorielle | Supabase pgvector (hosted) ou Pinecone |
| LLM | Claude API (`claude-sonnet-4-6`) |
| Interface web | Next.js + Tailwind + shadcn/ui |
| Auth | NextAuth (Google OAuth — accès employés uniquement) |
| Slack bot | Slack API (Bolt framework) |
| Sources connectées | Google Drive API / Notion API / Gmail API / HubSpot API |

---

## Prompt système — RAG

```
Tu es l'assistant interne de [Nom de l'entreprise].
Tu as accès exclusivement aux ressources internes de l'entreprise.

Règles absolues :
- Ne réponds qu'à partir des documents fournis dans le contexte
- Si l'information n'est pas dans le contexte, dis-le clairement
- Ne fais jamais de suppositions sur des données que tu n'as pas
- Ton : professionnel, direct, utile
- Langue : adapte-toi à la langue de l'utilisateur

Contexte interne récupéré :
{{retrieved_chunks}}

Question de l'utilisateur :
{{user_question}}
```

---

## Pipeline d'ingestion

```
1. Connexion aux sources (OAuth / API keys)
2. Récupération des documents modifiés depuis le dernier sync
3. Chunking sémantique (800 tokens / chunk, 100 tokens overlap)
4. Génération des embeddings
5. Upsert dans la base vectorielle (avec metadata : source, date, auteur)
6. Log de sync dans Airtable (volume, erreurs, durée)
```

Fréquence : toutes les heures pour les sources critiques (CRM, Slack), toutes les 24h pour les documents.

---

## Sécurité & accès

- Authentification obligatoire (Google OAuth entreprise)
- Aucune donnée client exposée à des tiers
- Logs de toutes les requêtes (audit trail)
- Isolation par client si déployé chez plusieurs entités
- Données hébergées en Europe (RGPD)

---

## Gestion d'erreurs

| Erreur | Action |
|---|---|
| Sync source échoue | Log + retry, alerte Slack si > 3 échecs |
| Embedding API indisponible | Mise en queue, sync décalé de 1h |
| Base vectorielle inaccessible | Fallback mode dégradé : réponse sans contexte + warning |
| Claude API indisponible | Message d'erreur clair, log pour retry |
| Auth failure | Redirection login, log tentative |

---

## Monitoring

- Volume de requêtes par jour / par utilisateur
- Taux de "réponse sans contexte trouvé" (indique des lacunes dans les sources)
- Couverture de la base : nombre de documents indexés
- Délai de sync moyen
- Satisfaction utilisateur (thumbs up/down sur chaque réponse)

---

## Livrables client

- [ ] Sources internes identifiées et connectées
- [ ] Pipeline d'ingestion configuré et testé
- [ ] Base vectorielle initialisée avec les docs existants
- [ ] Interface chat déployée (web + Slack bot)
- [ ] Daily briefing configuré avec les préférences de l'équipe
- [ ] Auth configurée (accès employés uniquement)
- [ ] Formation équipe (30 min)
- [ ] Runbook d'exploitation + guide d'ajout de sources

---

---

# Offres commerciales

## Positionnement

| Offre | Systèmes inclus | Cible | Prix indicatif |
|---|---|---|---|
| **Starter** | Lead Engine | PME avec formulaire web | 1 499 € setup + 299 €/mois |
| **Growth** | Lead + Call + Review Engine | Entreprise avec équipe commerciale | 2 999 € setup + 599 €/mois |
| **Scale** | Les 4 systèmes complets | Entreprise avec équipe structurée | Sur devis (5 000–10 000 € setup) |

---

## Délais de déploiement par offre

| Phase | Starter | Growth | Scale |
|---|---|---|---|
| Discovery & architecture | 1 jour | 2 jours | 3 jours |
| Implémentation | 4–6 jours | 7–10 jours | 12–18 jours |
| Tests & UAT | 1 jour | 2 jours | 3 jours |
| Go-live & monitoring | Jour J | Jour J | Jour J |
| **Total** | **~7 jours** | **~14 jours** | **~24 jours** |

---

## Processus de vente

```
1. Appel discovery (30 min) — identifier le pain point principal
2. Proposition adaptée — sélection des systèmes pertinents
3. Validation architecture — présentation du plan avant implémentation
4. Signature & onboarding — accès aux outils, réunion kick-off
5. Déploiement — selon planning ci-dessus
6. Go-live + suivi 30 jours — monitoring actif inclus
```

---

## Garanties

- Déploiement dans les délais ou remboursement de la différence
- SLA de support : réponse en 4h ouvrables
- Monitoring inclus pendant 30 jours post-déploiement
- Documentation complète livrée avec chaque système

---

*Document interne WebMind — version 1.0 — Mars 2026*
