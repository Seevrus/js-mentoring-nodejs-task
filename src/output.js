import fs from 'fs';

export default (obj, fileName) => {
  if (!fileName) fileName = obj.name;

  fs.writeFileSync(`${fileName}.json`, 
    JSON.stringify(obj, null, 2), 
    err => {err ? console.log(err) : null});
}
