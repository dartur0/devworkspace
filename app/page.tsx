import SnippetEditor from '@/components/SnippetEditor';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-100 mb-3">DevWorkspace</h1>
        <p className="text-slate-400 text-sm mb-6">Manage code snippets & AI prompts.</p>
        <Link href="/explore" className="inline-block bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-4 py-2 rounded-lg border border-slate-700">
          View Public Catalog (SSG Page) →
        </Link>
      </div>
      <SnippetEditor />
    </main>
  );
}