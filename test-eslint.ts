// Test file for ESLint with TypeScript rules
function badFunction(param: any): any {
  console.log('This should trigger ESLint errors');
  return param;
}
