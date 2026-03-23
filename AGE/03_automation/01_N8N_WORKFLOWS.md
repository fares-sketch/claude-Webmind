# CONFIGURATION N8N + ANTHROPIC 🤖

*L'objectif est d'automatiser le traitement des leads de l'Audit IA et d'offrir une expérience "Premium" ultra-réactive.*

## 1. Comment obtenir votre clé API Anthropic
*C'est la seule étape que je ne peux pas faire pour vous pour des raisons de sécurité.*

1.  Allez sur **[console.anthropic.com](https://console.anthropic.com/)**.
2.  Créez un compte ou connectez-vous.
3.  Allez dans **"API Keys"**.
4.  Cliquez sur **"Create Key"**. Nommez-la "N8N Webmind".
5.  **Copiez-la soigneusement** et gardez-la de côté.

---

## 2. Configuration dans N8N
*Une fois que vous avez la clé, voici comment l'ajouter dans votre instance :*
URL : `https://webmind-agency.app.n8n.cloud/`

1.  Allez dans **Credentials** (icône clé à gauche).
2.  Cliquez sur **Add Credential**.
3.  Cherchez **Anthropic**.
4.  Collez votre **API Key**.
5.  Cliquez sur **Save**.

---

## 3. Workflow "Lead Insight Engine" (V1)
*Voici la structure du premier workflow que nous allons construire ensemble :*

1.  **Webhook Trigger** : Reçoit les données de l'Audit (Nom, Email, Heures perdues, etc.).
2.  **Anthropic Node** : Claude analyse les données et génère un "Plan d'Action Stratégique" personnalisé de 3 pages.
3.  **Google Docs / PDF Node** : Génère un document PDF propre avec le branding Webmind.
4.  **Gmail / Resend Node** : Envoie le PDF au lead avec un message ultra-personnalisé.
5.  **Slack Notification** : Vous envoie un message : "🔥 Nouveau Lead Qualifié ! Plan d'action envoyé à {Name}."
6.  **Twilio SMS** : Envoie un SMS au lead : "Bonjour {Name}, votre Audit IA Webmind est prêt ! Vérifiez vos emails. 🚀"

---

## Ce que je peux faire maintenant :
Si vous parvenez à vous connecter à **n8n.cloud** dans le navigateur de cette session, je peux essayer de construire le workflow directement par l'interface !
