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
  const parser = getParserBaseOnLanguage(options.language);

  if (parser === undefined) {
    console.warn(`Parser not found for ${options.language}`);

    return source;
  }

  return await prettier.format(source, {
    parser,
    singleQuote: true,
    tabWidth: 2,
    printWidth: 120,
  });
}

function getParserBaseOnLanguage(language: unknown): prettier.Options['parser'] {
  switch (language) {
    case 'angular':
      return 'babel-ts';
    case 'php': // @ToDo: Install prettier for PHP
    case 'typescript':
      return 'typescript';
    case 'html':
    case 'xml':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
      return 'scss';
    default:
      return undefined;
  }
}
