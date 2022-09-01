import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import fs, { accessSync } from 'fs';
import chalk from 'chalk';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const copy = promisify(ncp);

export async function copyTemplateToTarget(options) {
  return await copy(options.templateDir, options.targetDir, {
    clobber: false,
  });
}

export default async function createSpaApp(options) {
  options = {
    ...options,
    targetDir: options.targetDir || process.cmd(),
  };

  const templateDir = path.resolve(
    __dirname,
    '../templates',
    options.template,
  );
  const targetDir = path.resolve(
    __dirname,
    '../../',
    options.targetDir,
  );

  options.templateDir = templateDir;
  options.targetDir = targetDir;

  console.log(targetDir, templateDir);

  try {
    accessSync(templateDir, fs.constants.F_OK);
  } catch (e) { 
    console.log('%s Invalid template names', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: 'Build template...',
      task: async () => await copyTemplateToTarget(options),
    },
    {
      title: 'Install dependencies...',
      task: async () => {
        await projectInstall({
          prefer: 'npm',
          cwd: options.targetDir,
        });
      },
      skip: () => options.install ? undefined : 'Pass --install to automatically install dependencies',
    }
  ]);

  await tasks.run();
  return true;
}