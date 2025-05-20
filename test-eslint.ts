// Test file for ESLint with TypeScript rules
type TestParam = string | number | boolean;

/**
 * This function is intentionally unused as part of the ESLint testing process.
 * 
 * JUSTIFICATION FOR SUPPRESSION:
 * This is a test file specifically created to validate ESLint rule configurations.
 * The @typescript-eslint/no-unused-vars suppression is necessary here as this function
 * is deliberately defined but not used to test that the ESLint rule works correctly.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function improvedFunction(param: TestParam): TestParam {
  // Using allowed console method
  console.info('This uses an allowed console method');
  return param;
}
