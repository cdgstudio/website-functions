import type { Context } from '@netlify/functions';
import { format } from '../utils/format.mjs';

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

  try {
    const formatted = await format(body, { language });

    return new Response(formatted, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (e) {
    return new Response(body, {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
};
