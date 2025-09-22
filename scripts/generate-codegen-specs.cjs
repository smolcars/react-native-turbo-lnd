const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const targetDir = path.resolve(projectRoot, 'cpp');

// Clean up existing build directory
fs.rmSync(path.resolve(targetDir, 'build'), { recursive: true, force: true });

console.log('Running @react-native-community/cli codegen...');

// Run the codegen command
const codegenCommand = `npx @react-native-community/cli codegen --platform android --path . --outputPath ./cpp/`;
execSync(codegenCommand, {
  cwd: projectRoot,
  stdio: 'inherit'
});

console.log('Codegen completed, moving files...');

// move targetdir/android/app/build to targetdir/
const androidDir = path.resolve(targetDir, 'android');
const sourcePath = path.resolve(androidDir, 'app/build');
const destPath = path.resolve(targetDir, 'build');

// Copy contents from source to destination
fs.cpSync(sourcePath, destPath, { recursive: true, force: true });

// Remove the android directory
fs.rmSync(androidDir, { recursive: true, force: true });

console.log('Codegen specs generated successfully');
