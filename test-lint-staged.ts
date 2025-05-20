// This file is used to test lint-staged and should be formatted and lint-clean
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function testLintStagedFunction(): void {
  // Variables are now properly used in the function
  const x = 5;
  const y = 10;

  // Using allowed console method
  console.info(`The sum is: ${x + y}`);

  return;
}
