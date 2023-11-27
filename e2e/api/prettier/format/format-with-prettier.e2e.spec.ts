import { describe, expect, it } from '@jest/globals';

describe('/api/code/format', () => {
  it('should format typescript code', async () => {
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

  it('should format XML code', async () => {
    const query = new URLSearchParams({
      language: 'xml',
    });

    const response = await fetch(new URL(`http://localhost:8888/api/code/format?${query}`), {
      method: 'POST',
      body: `<button appTooltip="Hello from string">Tooltip as string</button>

      <svg [appTooltip]="templateForTooltip" >
        <!-- ... -->
      </svg>
      <ng-template #templateForTooltip> <strong>Hello</strong> from template </ng-template>`,
    });

    const text = await response.text();

    expect(text).toMatchSnapshot();
  });
});
