import { Project } from 'ts-morph';
import path from 'path';

const project = new Project({});

project.addSourceFilesAtPaths(['src/**/*.ts', 'src/**/*.tsx']);

const files = project.getSourceFiles();

const sharedUIDir = project.getDirectory(path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui'));
const uiComponentDirs = sharedUIDir?.getDirectories();

function isAbsoluteImport(value: string) {
  const layers = ['app', 'shared', 'entities', 'widgets', 'features'];

  return layers.some((layer) => value.startsWith(layer));
}

uiComponentDirs?.forEach((dir) => {
  const indexFilePath = path.resolve(dir.getPath(), 'index.ts');
  const indexFile = dir.getSourceFile(indexFilePath);

  if (!indexFile) {
    const sourceCode = `export * from './${dir.getBaseName()}'`;
    const file = dir.createSourceFile(indexFilePath, sourceCode, { overwrite: true });

    file.save();
  }
});

files.forEach((sourceFile) => {
  const ImportDeclarations = sourceFile.getImportDeclarations();

  ImportDeclarations.forEach((sourceFileImportDeclaration) => {
    // import { Button } from // ! '@/shared/ui/Button/Button';
    const importValue = sourceFileImportDeclaration.getModuleSpecifierValue();

    const importValueWithoutAlias = importValue.replace('@/', '');

    // ['shared', 'ui', 'Button', 'Button'];
    const importSegments = importValueWithoutAlias.split('/');

    const isSharedLayer = importSegments?.[0] === 'shared';
    const isUISlice = importSegments?.[1] === 'ui';

    if (isAbsoluteImport(importValueWithoutAlias) && isSharedLayer && isUISlice) {
      const sourceCode = importValueWithoutAlias.split('/').slice(0, 3).join('/');
      sourceFileImportDeclaration.setModuleSpecifier(`@/${sourceCode}`);
    }
  });
});

project.save();
