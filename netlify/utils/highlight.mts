import hljs from 'highlight.js';

export function highlight(source: string, opts: { language: string }) {
  if (isLanguageSupported(opts.language)) {
    const language = parseLanguageIntoLanguage(opts.language);
    return hljs.highlight(source, { language: language }).value;
  } else {
    return source;
  }
}

function isLanguageSupported(language: unknown): language is string {
  if (typeof language !== 'string') {
    return false;
  }

  if (language === 'plain') {
    return false;
  }

  return true;
}

function parseLanguageIntoLanguage(language: string): string {
  switch (language) {
    case 'angular': {
      return 'typescript';
    }
    default:
      return language;
  }
}
