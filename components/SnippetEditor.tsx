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
    <div className="flex flex-col gap-4 p-5 border border-slate-800 rounded-xl bg-slate-900/80">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Interactive Editor</h2>
        <button
          onClick={handleGenerateTags}
          disabled={isLoading}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {isLoading ? 'Analyzing...' : 'Generate AI Tags'}
        </button>
      </div>

      <div className="border border-slate-800 rounded-lg overflow-hidden">
        <Editor
          height="250px"
          defaultLanguage="typescript"
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || '')}
        />
      </div>

      {tags.length > 0 && (
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs text-slate-400">AI Suggested Tags:</span>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="text-xs bg-purple-950/60 border border-purple-800/40 text-purple-300 px-2 py-0.5 rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}