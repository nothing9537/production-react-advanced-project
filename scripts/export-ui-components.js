/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

const basePath = ['src', 'shared', 'ui'];
const componentsDirPath = path.resolve(...basePath);
const outputFileNamePath = path.resolve(...basePath, 'index.ts');

try {
  fs.rmSync(outputFileNamePath);
} catch (error) {
  console.log(error);
}

fs.readdir(componentsDirPath, { encoding: 'utf-8' }, async (err, dirs) => {
  if (err) {
    console.error('Error when reading Component dirs:', err);
    return;
  }

  const componentExports = ['\n'];
  const componentDirs = [];
  const componentNames = [];

  dirs.forEach((dirName) => {
    const cloned = [...basePath];

    if (!dirName.includes('index.ts')) {
      cloned.push(dirName);
    }

    componentDirs.push(path.resolve(...cloned));
  });

  componentDirs.forEach((path) => {
    const dirFiles = fs.readdirSync(path);

    dirFiles.forEach((files) => {
      const splitString = files.split('.');

      if (splitString.length === 2 && splitString[1] === 'tsx') {
        componentNames.push(splitString.join('.'));
      }
    });
  });

  componentNames.forEach((tsxFile) => {
    const component = path.basename(tsxFile, '.tsx');

    componentExports.push(`export { ${component} } from './${component}/${component}';`);
  });

  fs.writeFileSync(outputFileNamePath, componentExports.reverse().join('\n'), (err) => {
    if (err) {
      console.error('Error when writing index.ts:', err);
      return;
    }
    console.log('Components were successfully exported in index.ts');
  });
});
