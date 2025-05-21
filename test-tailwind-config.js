#!/usr/bin/env node

// Test script to verify Tailwind v4 configuration
const fs = require('fs');
const path = require('path');

console.log('Testing Tailwind v4 Configuration...\n');

// Check for config files
const configFiles = [
  'tailwind.config.ts',
  'tailwind.config.js',
  'tailwind.config.css',
  'app/tailwind.css',
  'app/globals.css',
];

console.log('Checking for configuration files:');
configFiles.forEach((file) => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`  ${file}: ${exists ? '✓' : '✗'}`);
});

// Check package.json for Tailwind version
const packageJson = require('./package.json');
console.log('\nTailwind CSS version:', packageJson.devDependencies.tailwindcss);

// Check if globals.css has the correct imports
const globalsContent = fs.readFileSync(path.join(process.cwd(), 'app/globals.css'), 'utf8');
console.log('\nChecking globals.css:');
console.log('  Has @import: ', globalsContent.includes('@import'));
console.log('  Has @theme: ', globalsContent.includes('@theme'));
console.log('  Has bitcoin-orange: ', globalsContent.includes('bitcoin-orange'));

// Check if any tsx files use bg-bitcoin-orange
const searchDir = (dir, pattern) => {
  const files = fs.readdirSync(dir);
  const matches = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      matches.push(...searchDir(filePath, pattern));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes(pattern)) {
        matches.push(filePath);
      }
    }
  });

  return matches;
};

console.log('\nFiles using bg-bitcoin-orange:');
const matches = searchDir(process.cwd(), 'bg-bitcoin-orange');
matches.forEach((file) => console.log('  ', file));

console.log('\nDone.');
