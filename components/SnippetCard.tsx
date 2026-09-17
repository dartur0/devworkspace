interface SnippetProps {
  title: string;
  code: string;
  language: string;
  tags: string[];
}

export default function SnippetCard({ title, code, language, tags }: SnippetProps) {
  return (
    <div className="flex flex-col justify-between p-5 border border-slate-800 rounded-xl bg-slate-900/50">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg text-slate-100">{title}</h3>
          <span className="text-xs font-mono uppercase bg-slate-800 px-2 py-0.5 rounded text-slate-400">
            {language}
          </span>
        </div>
        <pre className="text-xs font-mono bg-slate-950 p-3 rounded-lg overflow-x-auto text-slate-300 border border-slate-900 mb-4">
          <code>{code}</code>
        </pre>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags?.map((tag) => (
          <span key={tag} className="text-xs bg-purple-950/60 border border-purple-800/40 text-purple-300 px-2 py-0.5 rounded-md">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}