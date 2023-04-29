module.exports = {
  testPathIgnorePatterns: ['__tests__/CosmosDB-test.tsx'],
  verbose: true,
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    "uuid": require.resolve('uuid'),
  },
  preset: 'react-native',
}