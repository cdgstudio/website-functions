import { describe, expect, it } from '@jest/globals';

describe('/api/code/highlight', () => {
  it('should highlight the code', async () => {
    const query = new URLSearchParams({
      language: 'typescript',
    });

    const response = await fetch(new URL(`http://localhost:8888/api/code/highlight?${query}`), {
      method: 'POST',
      body: `class A {
        constructor() {}
      }`,
    });

    const text = await response.text();

    expect(text).toMatchSnapshot();
  });
});
