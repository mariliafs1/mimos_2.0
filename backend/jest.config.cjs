module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  testEnvironment: 'node',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};