import { format } from '../prettier';
import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      body: 'Only POST is supported',
    };
  }

  const queryParams = event.queryStringParameters;
  if (!event.body || !queryParams) {
    return {
      statusCode: 400,
      body: 'ERROR!',
    };
  }

  const language = queryParams['language'];
  if (typeof language !== 'string' || language.length === 0) {
    return {
      statusCode: 400,
      body: 'Language is required',
    };
  }

  const formatted = await format(event.body, {
    language: queryParams['language'],
  });

  return {
    statusCode: 200,
    body: formatted,
    headers: {
      'Content-Type': 'text/plain',
    },
  };
};
