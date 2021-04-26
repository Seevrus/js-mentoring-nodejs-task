import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');

const printFolder = (path, depth = -1) => {
  let dirObj = {};

  let name;
  let lastSlashInPath = path.lastIndexOf('/');
  lastSlashInPath == - 1 ? name = path : name = path.substring(lastSlashInPath+1);
  dirObj.name = name;
  dirObj.children = [];

  let openedDir = fs.opendirSync(path);
    
  let nextChild;
  while ((nextChild = openedDir.readSync()) !== null) {
    if (nextChild.isDirectory()) {
      let subFolderObj;
      if (depth != 0) {
        subFolderObj = printFolder(`${path}/${nextChild.name}`, depth-1);
      }
      else {
        subFolderObj = {};
        subFolderObj.name = nextChild.name;
        subFolderObj.children = [];
      }
      dirObj.children.push(subFolderObj);
    }
    else {
      let fileObj = {};
      let dot = nextChild.name.lastIndexOf('.');
      if (dot == -1) {
        fileObj.name = nextChild.name;
        fileObj.extension = '';
      }
      else {
        fileObj.name = nextChild.name.substring(0, dot);
        fileObj.extension = nextChild.name.substring(dot);
      }
      fileObj.size = fs.statSync(`${path}/${nextChild.name}`).size;
      dirObj.children.push(fileObj);
    }
  }

  openedDir.close();
  return dirObj;
}

export default printFolder;
