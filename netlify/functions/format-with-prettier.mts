import type { Context } from '@netlify/functions';
import prettier from 'prettier';

export default async (req: Request, context: Context): Promise<Response> => {
  if (req.method !== 'POST') {
    return new Response('Only POST is supported', {
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

  const formatted = await format(body, { language });

  return new Response(formatted, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};

async function format(source: string, options: { language: unknown }) {
  return await prettier.format(source, {
    semi: false,
    parser: getParserBaseOnLanguage(options.language),
    singleQuote: true,
    tabWidth: 2,
    printWidth: 120,
    trailingComma: 'all',
  });
}

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
