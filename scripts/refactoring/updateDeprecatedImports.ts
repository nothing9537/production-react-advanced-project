import { Project } from 'ts-morph';

const project = new Project();

// project.addSourceFilesAtPaths(['src/**/ArticleRating.tsx']);
project.addSourceFilesAtPaths(['src/**/*.ts', 'src/**/*.tsx']);

const files = project.getSourceFiles();

files.forEach((sourceFile) => {
  const sourceFileImportDeclarations = sourceFile.getImportDeclarations();

  sourceFileImportDeclarations.forEach((importDeclaration) => {
    const specifier = importDeclaration.getModuleSpecifierValue();

    if (specifier.startsWith('@/shared/ui')) {
      const importChunks = specifier.split('ui');

      const layer = importChunks[0];
      const component = importChunks[1];
      const newValue = `${layer}ui/deprecated${component}`;

      importDeclaration.setModuleSpecifier(newValue);
    }
  });
});

project.save();
