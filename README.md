# AutoReview: Senior Engineer As A Service

A scalable Micro-SaaS built on Next.js 15 App Router that automatically reviews GitHub Pull Requests using Anthropic's Claude 3.7 Sonnet.

## Architecture

1. **GitHub App Webhook:** Listens for `pull_request.opened` events.
2. **Cryptographic Verification:** Validates the `x-hub-signature-256` hash to prevent payload spoofing.
3. **Data Extraction:** Uses the Octokit SDK to fetch the raw `.diff` of the code changes.
4. **AI Processing:** Pipes the diff into Anthropic's Claude API with a strict, specialized prompt to catch security flaws, N+1 queries, and logic bugs, while explicitly defending against Prompt Injections embedded in the code.
5. **Automated Feedback:** Posts a formatted Markdown comment directly onto the user's GitHub PR within seconds.

## Database (Supabase)
To track installations and enforce monthly PR limits (5 on Free, 100 on Pro), run the SQL migrations in `src/lib/supabase/schema.sql` on your Supabase instance.

## Local Development

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run the Next.js server
npm run dev
```

## Deployment
This application is fully edge-compatible. Connect this repository to **Vercel** for zero-configuration deployments. Set the environment variables from `.env.example` in the Vercel dashboard.
