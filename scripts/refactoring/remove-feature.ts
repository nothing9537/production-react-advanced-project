import { Node, Project, SyntaxKind } from 'ts-morph';

const deletableFeatureName = process.argv[2] as string; // isCounterEnabled
const featureState = process.argv[3] as 'on' | 'off'; // off\on

if (!deletableFeatureName) {
  throw new Error('Please provide an feature-flag name (isCounterEnabled)');
}

if (!featureState && (featureState !== 'on' && featureState !== 'off')) {
  throw new Error('Please provide an feature state (on|off)');
}

const project = new Project();

// project.addSourceFilesAtPaths(['src/**/*.ts', 'src/**/*.tsx']);
project.addSourceFilesAtPaths(['src/**/ArticleDetailsPage.tsx']);

const files = project.getSourceFiles();

function isNodeToggle(node: Node) {
  let isToggleFeatures = false;

  node.forEachChild((child) => {
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
}

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isNodeToggle(node)) {
      const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

      if (!objectOptions) return;

      const onFunctionProperty = objectOptions?.getProperty('on');
      const offFunctionProperty = objectOptions?.getProperty('off');

      const featureNameProperty = objectOptions?.getProperty('name');

      const onFunction = onFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
      );
      const offFunction = offFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
      );
      const featureName = featureNameProperty?.getFirstDescendantByKind(
        SyntaxKind.StringLiteral,
      )
        ?.getText()
        ?.slice(1, -1);

      if (featureName !== deletableFeatureName) return;

      if (featureState === 'on') {
        node.replaceWithText(onFunction?.getBody().getText() ?? '');
      }

      if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '');
      }
    }
  });
});

project.save();
