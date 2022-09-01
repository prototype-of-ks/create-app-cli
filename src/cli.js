import arg from 'arg';
import * as inquirer from 'inquirer';
import createSpaApp from './main';

export function parseArgsIntoOptions(rawArgs) {
  const args = arg({
    '--install': Boolean,
    '--help': Boolean,
    '-i': '--install',
    '-h': '--help',
  }, {
    argv: rawArgs.slice(2),
  });
  return {
    install: args['--install'] || false,
    template: args._[0],
  };
}

export async function promptForOptions(options) {
  const {
    template,
    install,
  } = options;
  const defaultTemplate = 'javascript';
  const defaultQuestions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'Please type your project name...',
    }
  ];
  const questions = [
    ...defaultQuestions
  ];

  if (!template) {
    const templateQuestion = {
      type: 'list',
      name: 'template',
      message: 'Please choose your template',
      choices: ['JavaScript', 'TypeScript'],
      default: defaultTemplate,
    };
    questions.push(templateQuestion);
  }

  if (!install) {
    const installQuestion = {
      type: 'confirm',
      name: 'install',
      message: 'Install dependencies?',
      default: false,
    };
    questions.push(installQuestion);
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    template: options.template || answers.template,
    install: options.install || answers.install,
    targetDir: options.targetDir || answers.projectName,
  };
}


export async function cli(args) {
  let options = parseArgsIntoOptions(args);
  options = await promptForOptions(options);
  createSpaApp(options);
}