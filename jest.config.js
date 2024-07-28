module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    // axios: 'axios/dist/node/axios.cjs',
  },
  // setupFiles: ['./jest.setup.js', '@testing-library/jest-native/extend-expect'],
  setupFilesAfterEnv: [
    './jest.setup.js',
    '@testing-library/jest-native/extend-expect',
  ],
  testPathIgnorePatterns: ['__mocks__', '__utils__', 'node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
