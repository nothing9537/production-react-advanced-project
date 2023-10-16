/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs/promises');
const firstCharUpperCase = require('../firstCharUpperCase');
const resolveRoot = require('../resolveRoot');
const reduxSliceTemplate = require('./reduxSliceTemplate');
const schemaTemplate = require('./schemaTemplate');

module.exports = async (layer = '', slice = '') => {
  const resolveModelPath = (...segments) => resolveRoot('src', layer, slice, 'model', ...segments);

  const createDirStructure = async () => {
    try {
      await fs.mkdir(resolveModelPath());
      await fs.mkdir(resolveModelPath('slices'));
      await fs.mkdir(resolveModelPath('types'));
      await fs.mkdir(resolveModelPath('selectors'));
      await fs.mkdir(resolveModelPath('services'));
    } catch (error) {
      console.log(`Error when making model segment for ${slice} in ${layer}`, error);
    }
  };

  const createReduxSlice = async () => {
    try {
      await fs.writeFile(
        resolveModelPath('slices', `${slice}Slice.ts`),
        reduxSliceTemplate(slice),
      );
    } catch (error) {
      console.log(`Error when making redux slice for ${slice} in ${layer}`, error);
    }
  };

  const createSchema = async () => {
    try {
      const upperCaseFirstCharSlice = firstCharUpperCase(slice);

      await fs.writeFile(
        resolveModelPath('types', `${slice}Schema.ts`),
        schemaTemplate(upperCaseFirstCharSlice),
      );
    } catch (error) {
      console.log(`Error when making schema for ${slice} in ${layer}`, error);
    }
  };

  await createDirStructure();
  await createReduxSlice();
  await createSchema();
};
