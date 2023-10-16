/* eslint-disable @typescript-eslint/no-var-requires */
const createTemplate = require('./templates/createTemplate');

const layer = process.argv?.[2];
const sliceName = process.argv?.[3];

const layers = ['pages', 'features', 'entities'];

if (!layer || !layers.includes(layer)) {
  throw new Error(`Please, provide ${layers.join(' or ')} layer.`);
}

if (!sliceName) {
  throw new Error('Please provide a name');
}

createTemplate(layer, sliceName);
