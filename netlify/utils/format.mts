import prettier from 'prettier';

export async function format(source: string, options: { language: unknown }) {
  const parser = getParserBaseOnLanguage(options.language);

  if (parser === undefined) {
    console.warn(`Parser not found for ${options.language}`);

    return source;
  }

  return await prettier.format(source, {
    parser,
    singleQuote: true,
    tabWidth: 2,
    printWidth: 120,
  });
}

function getParserBaseOnLanguage(language: unknown): prettier.Options['parser'] {
  switch (language) {
    case 'angular':
      return 'babel-ts';
    case 'php': // @ToDo: Install prettier for PHP
    case 'typescript':
      return 'typescript';
    case 'html':
    case 'xml':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
      return 'scss';
    default:
      return undefined;
  }
}
