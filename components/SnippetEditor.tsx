'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { generateTagsWithAI } from '@/app/actions/ai';
import { Sparkles } from 'lucide-react';

export default function SnippetEditor() {
  const [code, setCode] = useState('// Type your code here...\nconst hello = () => "world";');
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateTags = async () => {
    setIsLoading(true);
    try {
      const generatedTags = await generateTagsWithAI(code);
      setTags(generatedTags);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 border border-slate-800 rounded-xl bg-slate-900/80 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <h2 className="text-xl font-bold text-slate-100 tracking-wide">Interactive Editor</h2>
        
        <button
          onClick={handleGenerateTags}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-md disabled:opacity-50 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          {isLoading ? 'Analyzing...' : 'Generate AI Tags'}
        </button>
      </div>

      <div className="border border-slate-800 rounded-lg overflow-hidden pt-2 bg-[#1e1e1e]">
        <Editor
          height="280px"
          defaultLanguage="typescript"
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            padding: { top: 12 },
          }}
        />
      </div>

      {tags.length > 0 && (
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
          <span className="text-xs text-slate-400 font-medium">AI Suggested Tags:</span>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="text-xs bg-purple-950/80 border border-purple-700/50 text-purple-300 px-2.5 py-0.5 rounded-md font-mono">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}