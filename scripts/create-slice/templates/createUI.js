/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const firstCharUpperCase = require('../firstCharUpperCase');
const componentTemplate = require('./componentTemplate');
const styleTemplate = require('./styleTemplate');
const storybookTemplate = require('./storybookTemplate');

module.exports = async (layer, slice) => {
  const resolveUIPath = (...segments) => resolveRoot('src', layer, slice, 'ui', ...segments);

  const createUIDir = async () => {
    try {
      await fs.mkdir(resolveUIPath());
    } catch (error) {
      console.log(`Error when making UI dir for ${slice} in ${layer}`, error);
    }
  };

  const createComponent = async () => {
    try {
      const componentName = firstCharUpperCase(slice);
      await fs.mkdir(resolveUIPath(componentName));
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.tsx`),
        componentTemplate(componentName),
      );

      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.module.scss`),
        styleTemplate(componentName),
      );

      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.stories.tsx`),
        storybookTemplate(componentName, layer),
      );
    } catch (error) {
      console.log(`Error when making component for ${slice} in ${layer}`, error);
    }
  };

  await createUIDir();
  await createComponent();
};
