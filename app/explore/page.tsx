import { createClient } from '@/lib/supabase';
import SnippetCard from '@/components/SnippetCard';

// Принудительно запрашиваем данные при каждом визите
export const dynamic = 'force-dynamic';

export default async function ExplorePage() {
  const supabase = await createClient();
  
  const { data: snippets, error } = await supabase
    .from('snippets')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-red-500 mb-2">Supabase Error</h1>
        <pre className="bg-slate-900 p-4 rounded text-xs text-slate-300 font-mono">
          {JSON.stringify(error, null, 2)}
        </pre>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Public Snippets & Prompts</h1>
        <p className="text-slate-400 text-sm">Real-time data from Supabase.</p>
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
          <div className="p-4 border border-slate-800 rounded bg-slate-900/50">
            <p className="text-slate-400 text-sm">No public snippets found in database.</p>
            <p className="text-xs text-slate-500 mt-1">Fetched items count: {snippets?.length ?? 0}</p>
          </div>
        )}
      </div>
    </main>
  );
}