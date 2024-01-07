import { Context } from '@netlify/functions';
import { highlight } from '../utils/highlight.mjs';
import { format } from '../utils/format.mjs';

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

  const formatted = await format(body, { language });
  const highlighted = highlight(formatted, { language });

  return new Response(highlighted, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
};
