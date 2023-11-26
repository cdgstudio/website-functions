import { describe, expect, it, test } from '@jest/globals';

describe('asd', () => {
  it('ok', async () => {
    const query = new URLSearchParams({
      language: 'typescript',
    });

    const response = await fetch(new URL(`http://localhost:8888/api/prettier/format?${query}`), {
      method: 'POST',
      body: `class A{
        constructor()  {  }
        }`,
    });

    const text = await response.text();

    expect(text).toMatchSnapshot();
  });
});
