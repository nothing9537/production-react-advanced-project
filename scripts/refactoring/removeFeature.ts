import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

const deletableFeatureName = process.argv[2] as string; // isCounterEnabled
const featureState = process.argv[3] as 'on' | 'off'; // off\on

const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

if (!deletableFeatureName) {
  throw new Error('Please provide an feature-flag name (isCounterEnabled)');
}

if (!featureState && (featureState !== 'on' && featureState !== 'off')) {
  throw new Error('Please provide an feature state (on|off)');
}

const project = new Project();

project.addSourceFilesAtPaths(['src/**/*.ts', 'src/**/*.tsx']);
// project.addSourceFilesAtPaths(['src/**/ArticleDetailsPage.tsx']);

const files = project.getSourceFiles();

function isNodeToggleFunction(node: Node) {
  let isToggleFeatures = false;

  node.forEachChild((child) => {
    if (
      child.isKind(SyntaxKind.Identifier)
      && child.getText() === toggleFunctionName
    ) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
}

function isNodeToggleComponent(node: Node) {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

  return identifier?.getText() === toggleComponentName;
}

function replaceToggleFunction(node: Node) {
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

function getNodeAttributeByName(jsxAttributes: JsxAttribute[], name: string) {
  return jsxAttributes.find((attribute) => {
    return attribute.getNameNode().getText() === name;
  });
}

function getReplacedComponent(attribute?: JsxAttribute) {
  const value = attribute
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression()
    ?.getText();

  if (value?.startsWith('(')) {
    return value.slice(1, -1);
  }

  return value;
}

function replaceToggleComponent(node: Node) {
  const nodeAttributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const featureNameAttribute = getNodeAttributeByName(nodeAttributes, 'name');
  const onAttribute = getNodeAttributeByName(nodeAttributes, 'on');
  const offAttribute = getNodeAttributeByName(nodeAttributes, 'off');

  const featureName = featureNameAttribute?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    ?.slice(1, -1);

  if (featureName !== deletableFeatureName) return;

  const onValueText = getReplacedComponent(onAttribute);
  const offValueText = getReplacedComponent(offAttribute);

  if (featureState === 'on' && onValueText) {
    node.replaceWithText(onValueText);
  }

  if (featureState === 'off' && offValueText) {
    node.replaceWithText(offValueText);
  }
}

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isNodeToggleFunction(node)) {
      replaceToggleFunction(node);
    }

    if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isNodeToggleComponent(node)) {
      replaceToggleComponent(node);
    }
  });
});

project.save();
