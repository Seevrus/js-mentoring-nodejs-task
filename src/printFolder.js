import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');

const printFolder = (path, depth = -1) => {
  let dirObj = {};

  let name;
  let lastSlash = path.lastIndexOf('/');
  lastSlash == - 1 ? name = path : name = path.substring(lastSlash+1);
  dirObj.name = name;
  dirObj.children = [];

  let openedDir = fs.opendirSync(path);
    
  let nextDir;
  while ((nextDir = openedDir.readSync()) !== null) {
    if (nextDir.isDirectory()) {
      let subFolderObj;
      if (depth != 0) {
        subFolderObj = printFolder(`${path}/${nextDir.name}`, depth-1);
      }
      else {
        subFolderObj = {};
        subFolderObj.name = nextDir.name;
        subFolderObj.children = [];
      }
      dirObj.children.push(subFolderObj);
    }
    else {
      let fileObj = {};
      let dot = nextDir.name.lastIndexOf('.');
      if (dot == -1) {
        fileObj.name = nextDir.name;
        fileObj.extension = '';
      }
      else {
        fileObj.name = nextDir.name.substring(0, dot);
        fileObj.extension = nextDir.name.substring(dot);
      }
      fileObj.size = fs.statSync(`${path}/${nextDir.name}`).size;
      dirObj.children.push(fileObj);
    }
  }

  openedDir.close();
  return dirObj;
}

export default printFolder;
