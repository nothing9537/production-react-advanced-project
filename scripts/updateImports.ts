import { Project } from 'ts-morph';

const project = new Project();

project.addSourceFilesAtPaths(['src/**/*.ts', 'src/**/*.tsx']);

const files = project.getSourceFiles();

function isAbsoluteImport(value: string) {
  const layers = ['app', 'shared', 'entities', 'widgets', 'features'];

  return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations();

  importDeclarations.forEach((importDeclaration) => {
    const importValue = importDeclaration.getModuleSpecifierValue();

    if (isAbsoluteImport(importValue)) {
      importDeclaration.setModuleSpecifier(`@/${importValue}`);
    }
  });
});

project.save();
