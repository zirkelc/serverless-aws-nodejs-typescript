import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import fs from 'fs';
import JSON5 from 'json5';

// read tsconfig.json as JSON file and parse it with JSON5 to support comments
const tsconfigString = fs.readFileSync('./tsconfig.json', 'utf8');
const tsconfig = JSON5.parse(tsconfigString);

const jestConfig: JestConfigWithTsJest = {
  // https://kulshekhar.github.io/ts-jest/docs/getting-started/presets
  preset: 'ts-jest/presets/default',
  // https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping#jest-config-with-helper
  modulePaths: [tsconfig.compilerOptions.baseUrl],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' }),
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

export default jestConfig;
