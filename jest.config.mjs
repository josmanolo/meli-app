import nextJest from 'next/jest.js'

 
const createJestConfig = nextJest({
  dir: './',
})
 
/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
}
 
export default createJestConfig(config)