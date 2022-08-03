const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts(x)?',
    '!src/**/stories.tsx',
    '!src/pages/**/*.ts(x)?',
    '!src/styles/**/*.ts',
    '!src/utils/apollo.ts',
    '!src/utils/apolloCache.ts',
    '!src/utils/stripe/*.tsx',
    '!src/graphql/**/*.ts',
    '!src/**/mock.ts'
  ],
  modulePaths: ['<rootDir>/src/', '<rootDir>/.jest'],
  moduleNameMapper: {
    '^styled-components':
      '<rootDir>/node_modules/styled-components/dist/styled-components.browser.cjs.js'
  }
}

module.exports = createJestConfig(customJestConfig)
