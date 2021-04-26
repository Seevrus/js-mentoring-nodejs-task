import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');

export default (obj, fileName) => {
  if (!fileName) fileName = obj.name;

  fs.writeFile(`${fileName}.json`, 
    JSON.stringify(obj, null, 2), 
    err => {err ? console.log(err) : null});
}
