/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const publicAPITemplate = require('./publicAPITemplate');

module.exports = async (layer, slice) => {
  try {
    await fs.writeFile(
      resolveRoot('src', layer, slice, 'index.ts'),
      publicAPITemplate(slice),
    );
  } catch (e) {
    console.log(`Error when making public api for ${slice} in ${layer}`);
  }
};
