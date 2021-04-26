import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const prompt = require('prompt-sync')({sigint: true});

export default () => {
  const folder = prompt('Enter a valid folder path (relative or absolute)');
  return folder;
}
