import printFolder from './src/printFolder.js';
import writeOutput from './src/output.js';

console.log('Enter a valid folder path (relative or absolute)');
process.stdin.on('data', (chunk) => {
  let path = chunk.toString('utf-8').trim();

  let ans = printFolder(path, 1);

  writeOutput(ans);

  process.exit();
})
