const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const buildPath = process.env.BUILD_PATH || 'build';

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp(buildPath),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appSrc: resolveApp('src'),
  appPackageJson: resolveApp('package.json'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  appIndexJs: resolveApp('src/index.ts'),
};
