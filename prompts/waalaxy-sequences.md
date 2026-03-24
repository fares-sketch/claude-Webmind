# WebMind — Séquences Waalaxy LinkedIn

> **Objectif :** Prospecter des dirigeants de PME / responsables commerciaux FR
> **Outil :** Waalaxy (séquence LinkedIn automatisée)
> **Campagne cible :** Audit gratuit WebMind → appel découverte

---

## Cible idéale (ICP — Ideal Customer Profile)

- **Titre :** Dirigeant, CEO, Directeur commercial, Head of Sales, Responsable marketing
- **Taille entreprise :** 5 à 100 salariés
- **Secteur :** Services B2B, immobilier, agences, cabinets conseil, e-commerce
- **Localisation :** France (priorité : Paris, Lyon, Bordeaux, Lille, Marseille)
- **Signal :** Actif sur LinkedIn, a posté dans les 30 derniers jours

---

## Séquence A — Audit Gratuit (Recommandée pour démarrer)

**Durée totale :** 10 jours | **Étapes :** 3 messages

---

### Étape 1 — Invitation de connexion
**Délai :** Envoi immédiat
**Note de connexion (300 car max) :**

```
Bonjour [Prénom],

Je tombe sur votre profil — vous travaillez dans un secteur où la réactivité commerciale fait toute la différence.

On aide des PME à automatiser leur prospection et leurs relances avec l'IA. Curieux d'échanger ?

Ali — WebMind
```

---

### Étape 2 — Message J+3 (après acceptation)
**Délai :** 3 jours après acceptation
**Objet :** Première prise de contact

```
Bonjour [Prénom],

Merci d'avoir accepté ma demande.

Une question directe : combien de temps votre équipe passe-t-elle à relancer manuellement des leads chaque semaine ?

La plupart des dirigeants que j'accompagne me disent entre 5 et 10h. Et la moitié de ces leads sont déjà froids au moment du rappel.

On a construit un système qui automatise ça entièrement — qualification, CRM, SMS de confirmation, alerte commerciale — le tout en moins de 60 secondes après la soumission d'un formulaire.

Je propose 3 audits gratuits ce mois-ci pour identifier les 3 points de friction dans votre process commercial.

Vous seriez partant pour un appel de 30 min ?
```

---

### Étape 3 — Message J+7 (si pas de réponse)
**Délai :** 7 jours après acceptation
**Objet :** Dernier message / Soft close

```
Bonjour [Prénom],

Je ne veux pas vous encombrer, c'est mon dernier message.

Je vous partage juste un chiffre : 74% des leads B2B ne sont jamais relancés. Pas par manque d'intention, mais par manque de système.

Si un jour vous voulez voir comment on résout ça en 10 jours chrono, je suis disponible.

Bonne continuation à vous,
Ali — WebMind
```

---

## Séquence B — Approche Valeur (Contenu éducatif)

**Durée totale :** 14 jours | **Étapes :** 3 messages
**Usage :** Prospects plus froids, décideurs senior

---

### Étape 1 — Invitation
```
Bonjour [Prénom],

Je partage régulièrement des méthodes concrètes pour automatiser les process commerciaux en PME.

Si le sujet vous parle, je serais ravi qu'on soit connectés.

Ali — WebMind
```

---

### Étape 2 — Message J+5
```
Bonjour [Prénom],

Merci pour la connexion.

Je viens de publier un cas concret : comment une PME de services a multiplié par 3 son taux de conversion en automatisant simplement sa réponse aux leads entrants.

Le principe : répondre en moins de 60 secondes, 24h/24, sans intervention humaine.

Si ça vous intéresse, je vous envoie le résumé en 5 points ?
```

---

### Étape 3 — Message J+14
```
Bonjour [Prénom],

Une dernière chose avant de ne plus vous solliciter :

On offre un audit commercial gratuit (45 min) — on analyse votre process, on identifie les fuites, on vous propose un plan.

Pas de vente. Juste de la clarté.

Si le timing est bon pour vous, répondez "OUI" et je vous envoie un lien de réservation.
```

---

## Réponses types (pour gérer les objections)

### "Pas intéressé pour l'instant"
```
Pas de problème [Prénom], je comprends tout à fait.
Si un jour le sujet revient sur la table, n'hésitez pas à me solliciter.
Bonne continuation !
```

### "C'est quoi exactement WebMind ?"
```
Bonne question [Prénom] !

WebMind est une agence d'automatisation IA — on conçoit des systèmes sur mesure pour les PME :
→ Qualification automatique des leads entrants
→ Gestion des appels entrants par IA
→ Collecte automatisée d'avis Google

On utilise n8n, Claude AI, Twilio — des outils robustes, pas du no-code fragile.

Vous voulez qu'on en parle 20 min cette semaine ?
```

### "Quel est le prix ?"
```
Ça dépend du système à mettre en place [Prénom].

Nos offres démarrent à 1 499€ pour un système de qualification de leads clé en main.

Mais avant de parler prix, je préfère d'abord comprendre votre situation — pour ne vous proposer que ce qui a du sens.

On se fait un appel de 30 min pour que je puisse vous chiffrer précisément ?
```

---

## Configuration Waalaxy recommandée

| Paramètre | Valeur |
|-----------|--------|
| Invitations/jour | 15–20 max (limite LinkedIn safe) |
| Messages/jour | 50 max |
| Délai entre actions | Aléatoire 2–5 min (anti-ban) |
| Séquence à lancer en premier | Séquence A |
| Filtre LinkedIn Sales Navigator | Décideur + PME + FR + actif 30j |

---

## Métriques à suivre (hebdomadaire)

- **Taux d'acceptation** des invitations (objectif : > 30%)
- **Taux de réponse** aux messages (objectif : > 15%)
- **Taux de conversion** message → appel (objectif : > 5%)
- **Leads qualifiés/semaine** via Waalaxy → pipeline CRM

---

## Intégration avec le Lead Engine

Une fois un prospect intéressé :
1. Il remplit le formulaire sur webmindlab.tech
2. Le Lead Engine n8n prend le relais automatiquement
3. CRM Airtable mis à jour, Slack alerté, SMS envoyé au prospect

→ Waalaxy génère l'intérêt, le Lead Engine convertit.
