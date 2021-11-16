export default {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/*.ts',
    'src/report/*.ts',
    '!src/error/',
    'src/error/index.ts',
    'src/utils/*.ts',
    '!src/utils/client.ts',
  ],
  // coveragePathIgnorePatterns: ['/node_modules/', '/utils/', '!/error/index.ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
}
