import path from 'path';
import { Project, SyntaxKind } from 'ts-morph';

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

      if (!component.includes('deprecated') && !component.includes('redesigned')) {
        const newValue = `${layer}ui/deprecated${component}`;

        importDeclaration.setModuleSpecifier(newValue);
      }
    }
  });
});

const deprecatedSharedUIDir = project.getDirectory(path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui', 'deprecated'));
const uiComponentDirs = deprecatedSharedUIDir?.getDirectories();

uiComponentDirs?.forEach((dir) => {
  const dirSourceFiles = dir.getSourceFiles();

  dirSourceFiles.forEach((sourceFile) => {
    if (sourceFile.getBaseName().includes('.stories.')) {
      const variableStatements = sourceFile.getFirstDescendantByKind(SyntaxKind.VariableStatement);

      const variableDeclarationsList = variableStatements
        ?.getFirstDescendantByKind(SyntaxKind.VariableDeclarationList)
        ?.getDeclarations();

      variableDeclarationsList?.forEach((variableDeclaration) => {
        const initializer = variableDeclaration.getInitializer();

        const properties = initializer?.getDescendantsOfKind(SyntaxKind.PropertyAssignment);

        properties?.forEach((property) => {
          const propertyInitializer = property.getFirstDescendantByKind(SyntaxKind.StringLiteral);

          if (propertyInitializer?.getText()) {
            const isPropertySharedLayer = propertyInitializer
              ?.getText()
              ?.slice(1, -1)
              ?.includes('shared');

            if (isPropertySharedLayer) {
              const valueChunks = propertyInitializer
                ?.getText()
                ?.slice(1, -1)
                ?.split('/');

              const newValue = `'${valueChunks[0]}/deprecated/${valueChunks[1]}'`;
              propertyInitializer.replaceWithText(newValue);
            }
          }
        });
      });
    }
  });
});

project.save();
