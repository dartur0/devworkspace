# DevWorkspace

DevWorkspace is a web-based code snippet manager and AI prompt repository. It features an interactive editor, automatic AI-based code tagging, and a public directory for shared snippets.

## Tech Stack

* **Framework:** Next.js 15 (App Router, Server Actions)
* **Language:** TypeScript
* **Database:** Supabase (PostgreSQL, Row Level Security)
* **Editor:** Monaco Editor
* **AI Integration:** OpenAI API
* **Styling:** Tailwind CSS, Lucide Icons
* **Deployment:** Vercel

## Key Features

* **Interactive Code Editor:** Monaco Editor integration with syntax highlighting.
* **AI Auto-Tagging:** Automated code analysis and tag generation via Server Actions.
* **Public Catalog:** Server-side fetched public code snippet feed from PostgreSQL.
* **Security:** Table protection managed through Supabase Row Level Security (RLS).

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/dartur0/devworkspace.git](https://github.com/dartur0/devworkspace.git)
   cd devworkspace

2. **Install dependencies:**
   ```bash
   npm install
   
3. **Configure environment variables:**
Create a .env.local file in the root directory and add the following keys:
   ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_SUPABASE_ANON_KEY=your_supabase_anon_key
    OPENAI_API_KEY=your_openai_api_key

4. **Run the development server:**
   ```bash
    npm run dev
