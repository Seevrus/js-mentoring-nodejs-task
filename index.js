import pathReader from './src/pathReader.js';
import printFolder from './src/printFolder.js';
import writeOutput from './src/output.js';

// module for file reader
let path = pathReader();

// module for interface
let ans = printFolder(path, 1);

// module for output
writeOutput(ans);
