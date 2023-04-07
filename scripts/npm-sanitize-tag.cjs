/* eslint-disable no-console */

const branch = process.env.BRANCH ?? process.argv.find(x => /^--branch/.test(x))?.split('=')?.[1] ?? '';
const sanitizedBranch = branch.replace(/\//g, '-');

console.log(sanitizedBranch);
