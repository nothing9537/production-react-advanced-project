/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

const basePath = ['src', 'shared', 'assets', 'icons'];
const iconsDir = path.resolve(...basePath);
const outputFileName = path.resolve(...basePath, 'index.ts');

fs.readdir(iconsDir, { encoding: 'utf-8' }, async (err, files) => {
  if (err) {
    console.error('Error when reading svg files:', err);
    return;
  }

  fs.rmSync(outputFileName);

  const iconsExports = [];

  const textFiles = files.filter((f) => path.extname(f) === '.tsx');

  textFiles.forEach((tsxFile) => {
    const iconName = path.basename(tsxFile, '.tsx');
    iconsExports.push(`export { ${iconName}Icon } from './${iconName}';`);
  });

  fs.writeFile(outputFileName, iconsExports.join('\n'), (err) => {
    if (err) {
      console.error('Error when writing index.ts:', err);
      return;
    }
    console.log('Icons were successfully exported in index.ts');
  });
});
