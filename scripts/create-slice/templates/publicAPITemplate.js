/* eslint-disable @typescript-eslint/no-var-requires */
const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = (slice) => {
  const componentName = firstCharUpperCase(slice);
  const schemaName = `${slice}Schema`;

  return `export { ${componentName} } from './ui/${componentName}/${componentName}';
  export { ${firstCharUpperCase(schemaName)} } from './model/types/${schemaName}';
  `;
};
