// Test file for ESLint with TypeScript rules
type TestParam = string | number | boolean;

// The function is deliberately not used to test no-unused-vars rule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function improvedFunction(param: TestParam): TestParam {
  // Using allowed console method
  console.info('This uses an allowed console method');
  return param;
}
