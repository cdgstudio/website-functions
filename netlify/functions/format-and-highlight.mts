import type { Context } from '@netlify/functions';
import prettier from 'prettier';
import hljs from 'highlight.js';

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') {
    return new Response('Only POST is supported', { status: 400 });
  }

  // const requestKey = req.headers.get('X-API-Key');
  // const apiKey = Netlify.env.get('MY_API_KEY');

  // if (requestKey !== apiKey) {
  //   return new Response('Sorry, no access for you.', { status: 401 });
  // }

  const { source, language } = await req.json();

  if (typeof source !== 'string') {
    return new Response(source);
  }

  let parsed = source;

  const parser = getParserBaseOnLanguage(language);
  if (parser !== undefined) {
    parsed = await prettier.format(source, {
      semi: false,
      parser: language,
      singleQuote: true,
      tabWidth: 2,
      printWidth: 120,
      trailingComma: 'all',
    });
  }

  if (isLanguageSupported(language)) {
    parsed = hljs.highlight(parsed, { language }).value;
  }

  return new Response(parsed, {
    headers: { 'Content-Type': 'text/html' },
  });
};

function getParserBaseOnLanguage(language: unknown): prettier.Options['parser'] {
  switch (language) {
    case 'angular':
      return 'angular';
    case 'php': // @ToDo: Install prettier for PHP
    case 'typescript':
      return 'typescript';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
      return 'scss';
    default:
      return undefined;
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
