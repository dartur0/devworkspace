'use server';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateTagsWithAI(code: string): Promise<string[]> {
  if (!code || code.trim().length === 0) return [];

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Analyze the code and return ONLY a JSON array of 3-5 relevant lowercase tags (strings).',
        },
        { role: 'user', content: code },
      ],
      temperature: 0.2,
    });

    const rawContent = response.choices[0]?.message?.content || '[]';
    const cleanContent = rawContent.replace(/```json|```/g, '').trim();
    const tags: string[] = JSON.parse(cleanContent);
    return Array.isArray(tags) ? tags : ['code', 'snippet'];
  } catch (error) {
    console.error('AI Tag Generation Error:', error);
    return ['dev', 'snippet'];
  }
}