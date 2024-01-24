module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['cash-dash/server/tests/'],
  setupFilesAfterEnv: ['cash-dash/server/tests/setupTests.ts'],
};
