const fs = require('fs-extra');
const path = require('path');
const testFileTemplate = require('./testFileTemplate');
const inputFileTemplate = require('./inputFileTemplate');
const scriptFileTemplate = require('./scriptFileTemplate');
const dayComponentFileTemplate = require('./dayComponentFileTemplate');

const year = process.argv[2];
const day = process.argv[3];
console.log(day,' ',year)
// const config = readConfig();
const outputDir = 'src/days';

const dirPath = path.join(outputDir, year, 'day'+ day);
createDay(outputDir);

async function createDay( outputDir) {
  // fs.removeSync(outputDir);
  if (!fs.existsSync(dirPath)){
  fs.mkdirsSync(dirPath, { recursive: true });
  }
  const createdFileNames = await Promise.all(
    [
      [`day`+day+`.spec.js`,testFileTemplate],
      [`day`+day+`input.ts`,inputFileTemplate],
      [`day`+day+`script.ts`,scriptFileTemplate],
      [`Day`+day+`.svelte`,dayComponentFileTemplate],
  
  ].map(([filename,template]) => processFile(filename, template, year, day)),
  );

  console.log('\x1b[36m%s\x1b[0m', createdFileNames.join('\r\n'));
  // console.log(
  //   '\x1b[32m',
  //   'Auto Sled Test Generator created ',
  //   // specFilesCount,
  //   ' test suites totalling ',
  //   // itCount,
  //   ' tests.',
  // );
}

async function processFile(filename, template, year, day) {
  try {
    if (!filename || !template) {
      throw new Error('Missing file data');
    }
    const componentCode = template({
      year,day
    });
    fs.writeFileSync(path.join(dirPath, filename), componentCode, 'utf-8');
  } catch (err) {
    console.error(`Failed to generate ${filename}. Error: ${err}`);
  }

  return filename;
}

function readConfig() {
  const filePath = path.resolve('sled/testGenerator/generatorConfig');
  const json = `${filePath}.json`;
  if (fs.existsSync(json)) {
    const buff = fs.readFileSync(json);
    return JSON.parse(buff.toString());
  }
}
