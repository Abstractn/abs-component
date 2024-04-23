const fse = require('fs-extra');
const { globSync } = require('glob');

const sourceDir = process.argv[2];
const destinationDir = process.argv[3];

const files = globSync(sourceDir);
files.forEach((file) => {
  const fileName = file.split('/').pop();
  fse.copySync(file, `${destinationDir}/${fileName}`);
});