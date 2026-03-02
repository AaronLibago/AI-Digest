# AI Digest Dashboard

A Next.js web dashboard for controlling the **Daily AI Digest Content Engine** — an n8n workflow that automatically curates AI news from Gmail, generates Substack and LinkedIn articles using GPT-4o, and saves drafts to Google Docs.

## What It Does

The n8n workflow:
1. Searches Gmail for emails labeled `AI-Digest`
2. Extracts and cleans email content
3. Sends to GPT-4o to extract the top 10 AI developments
4. Generates a **Substack article** (900-1200 words, strategic tone)
5. Generates a **LinkedIn article** (500-800 words, practical focus)
6. Saves both to Google Docs
7. Sends an email notification with links to the drafts

This dashboard lets you:
- **Edit the email recipient** who receives digest notifications
- **Edit the Gmail search query** to control which emails are processed
- **Edit all AI prompts** (extraction, Substack, LinkedIn — both system and user prompts)
- **Trigger the workflow manually** with a "Run Digest Now" button
- **Authenticate with Firebase** so only authorized users can access settings

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** for styling
- **Firebase Auth** (email/password)
- **Firebase Firestore** for storing editable settings
- **n8n** workflow engine with webhook trigger

## Project Structure

```
AI-Digest/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with AuthProvider
│   │   ├── page.tsx                # Redirect to /login or /dashboard
│   │   ├── globals.css             # Tailwind imports
│   │   ├── login/page.tsx          # Login page
│   │   ├── dashboard/
│   │   │   ├── layout.tsx          # Auth guard + Navbar
│   │   │   └── page.tsx            # Main dashboard (settings + trigger)
│   │   └── api/trigger/route.ts    # Server-side proxy to n8n webhook
│   ├── lib/
│   │   ├── firebase.ts             # Firebase app initialization
│   │   ├── auth-context.tsx        # Auth state context + useAuth hook
│   │   ├── firestore.ts            # Firestore CRUD for WorkflowSettings
│   │   └── n8n.ts                  # Webhook trigger function
│   └── components/
│       ├── LoginForm.tsx            # Email/password login form
│       ├── Navbar.tsx               # Top nav with user email + logout
│       ├── SettingsPanel.tsx        # All editable settings fields
│       └── TriggerButton.tsx        # "Run Digest Now" button
├── n8n/
│   └── Daily_AI_Digest_Content_Engine_v2.json  # Modified workflow with webhook trigger
├── .env.local                       # Environment variables (gitignored)
├── .env.local.example               # Template for env vars
└── package.json
```

## Setup

### Prerequisites

- Node.js 18+
- A Firebase project
- An n8n instance (self-hosted or n8n Cloud)

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. **Enable Authentication**: Go to Build > Authentication > Sign-in method > Enable Email/Password
3. **Create a user**: Authentication > Users tab > Add user
4. **Create Firestore Database**: Build > Firestore Database > Create database (production mode)
5. **Set Firestore rules**:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /settings/{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
6. **Get config**: Project Settings > Your Apps > Web app > Copy config values

### 3. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/ai-digest-trigger
```

### 4. Import n8n Workflow

1. Open your n8n instance
2. Create a new workflow
3. Import `n8n/Daily_AI_Digest_Content_Engine_v2.json`
4. Configure credentials (Gmail OAuth2, OpenAI API, Google Docs OAuth2)
5. Activate the workflow
6. Copy the webhook URL and add it to `.env.local` as `N8N_WEBHOOK_URL`

### 5. Run

```bash
npm run dev
```

Visit `http://localhost:3000` and log in with your Firebase credentials.

## n8n Workflow (v2) Changes

The v2 workflow adds two new nodes compared to the original:

- **Webhook Trigger**: Accepts POST requests from the dashboard with settings payload
- **Load Config**: Normalizes settings from webhook payload with fallback defaults

Both the **Schedule Trigger** (24-hour auto) and **Webhook Trigger** (manual button) are kept, so the workflow runs automatically and can also be triggered on demand.

Modified nodes now read from the config instead of hardcoded values:
- Gmail Search query
- Extraction, Substack, and LinkedIn prompts (system + user)
- Email notification recipient

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add all `.env.local` variables in Vercel project settings
4. Deploy

## License

ISC
