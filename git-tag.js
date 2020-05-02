import chalk from 'chalk';
import spawn from './spawn';
import { version } from './package.json';

/* run this with
  yarn update
    or
  node -r @babel/register git-tag.js
*/

async function checkReleaseSafety() {

  try {
    spawn(`git status`);
    spawn(`git add .`);
    spawn(`git commit -m '${process.env.MSG || 'update'}'`);
    spawn(`git push`);
    spawn('git status');
    spawn(`git tag v${version}-${process.platform} && git push origin v${version}-${process.platform}`);
    spawn(`npm --no-git-tag-version version patch`);
    // await websiteCheck();
  } catch (error) {
    console.log(
      chalk.whiteBright.bgRed.bold(error.message)
    );
    console.log(
      chalk.whiteBright.bgRed.bold(error.stack)
    );
    process.exit(2);
  }
  process.exit(0);
}

checkReleaseSafety();
