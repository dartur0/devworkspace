import { createClient } from '@/lib/supabase';
import SnippetCard from '@/components/SnippetCard';

export const revalidate = 3600;

export default async function ExplorePage() {
  const supabase = await createClient();
  
  const { data: snippets } = await supabase
    .from('snippets')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Public Snippets & Prompts</h1>
        <p className="text-slate-400 text-sm">Pre-rendered with Next.js App Router and Supabase.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {snippets && snippets.length > 0 ? (
          snippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              title={snippet.title}
              code={snippet.code}
              language={snippet.language}
              tags={snippet.tags}
            />
          ))
        ) : (
          <p className="text-slate-500">No public snippets found.</p>
        )}
      </div>
    </main>
  );
}