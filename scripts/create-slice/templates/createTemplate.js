/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs/promises');
const firstCharUpperCase = require('../firstCharUpperCase');
const resolveRoot = require('../resolveRoot');
const createModel = require('./createModel');
const createPublicAPI = require('./createPublicAPI');
const createUI = require('./createUI');

module.exports = async (layer = '', slice = '') => {
  try {
    await fs.mkdir(resolveRoot('src', layer, firstCharUpperCase(slice)));
  } catch (error) {
    console.log(`Error when making dir for slice ${slice} in ${layer}`);
  }

  await createModel(layer, slice);
  await createUI(layer, slice);
  await createPublicAPI(layer, slice);
};
