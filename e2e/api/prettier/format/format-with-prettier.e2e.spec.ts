import { describe, expect, it, test } from '@jest/globals';

describe('/api/code/format', () => {
  it('should format the code', async () => {
    const query = new URLSearchParams({
      language: 'typescript',
    });

    const response = await fetch(new URL(`http://localhost:8888/api/code/format?${query}`), {
      method: 'POST',
      body: `class A{
        constructor()  {  }
        }`,
    });

    const text = await response.text();

    expect(text).toMatchSnapshot();
  });
});
