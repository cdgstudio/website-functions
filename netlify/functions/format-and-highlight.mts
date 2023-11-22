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

  const { source, parser } = await req.json();

  console.log(source);

  const formatted = await prettier.format(source, { parser: parser });
  const language = parserToLanguage(parser);
  const highlighted = language ? hljs.highlight(formatted, { language }) : hljs.highlightAuto(formatted);

  return new Response(highlighted.value, {
    headers: { 'Content-Type': 'text/html' },
  });
};

function parserToLanguage(parser: string): string {
  switch (parser) {
    case 'angular':
      return 'typescript';
    default:
      return '';
  }
}
