import hljs from 'highlight.js';
import { Context } from '@netlify/functions';

export default async (req: Request, context: Context): Promise<Response> => {
  if (req.method !== 'POST') {
    new Response('Only POST is supported', {
      status: 400,
    });
  }

  const url = new URL(req.url);
  const body = await req.text();

  const language = url.searchParams.get('language');
  if (null === language) {
    return new Response(`Language is required`, {
      status: 400,
    });
  }

  const highlighted = highlight(body, { language });

  return new Response(highlighted, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
};

function highlight(source: string, opts: { language: string }) {
  if (isLanguageSupported(opts.language)) {
    const language = parseLanguageIntoLanguage(opts.language);
    return hljs.highlight(source, { language: language }).value;
  } else {
    return source;
  }
}

function isLanguageSupported(language: unknown): language is string {
  if (typeof language !== 'string') {
    return false;
  }

  if (language === 'plain') {
    return false;
  }

  return true;
}

function parseLanguageIntoLanguage(language: string): string {
  switch (language) {
    case 'angular': {
      return 'typescript';
    }
    default:
      return language;
  }
}
