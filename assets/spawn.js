import spawn from 'cross-spawn';
import chalk from 'chalk';

export default (command) => {
  console.log(`${chalk.dim('starting')} ${command}`);
  const spawnSync = spawn.sync(command, [], { shell: true, stdio: ['inherit', 'inherit', 'pipe'] });
  if (spawnSync.status) {
    const error = new Error(`${spawnSync.stderr.toString().trim()}`);
    throw error;
  } else if (process.env.DEBUG) {
    console.log(chalk.dim(`finished ${command}`));
  }
};
