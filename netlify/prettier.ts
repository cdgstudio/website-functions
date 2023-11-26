import prettier from 'prettier';

export async function format(source: string, options: { language: unknown }) {
  return await prettier.format(source, {
    semi: false,
    parser: getParserBaseOnLanguage(options.language),
    singleQuote: true,
    tabWidth: 2,
    printWidth: 120,
    trailingComma: 'all',
  });
}

function getParserBaseOnLanguage(language: unknown): prettier.Options['parser'] {
  switch (language) {
    case 'angular':
      return 'angular';
    case 'php': // @ToDo: Install prettier for PHP
    case 'typescript':
      return 'typescript';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
      return 'scss';
    default:
      return undefined;
  }
}
