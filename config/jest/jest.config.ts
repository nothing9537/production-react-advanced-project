/* eslint-disable */
import type { Config } from 'jest'
import path from 'path'
/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

const config: Config = {
  globals: {
    __IS_DEV__: true,
    __API__: '',
    __PROJECT__: 'jest',
  },
  verbose: true,
  testEnvironment: "jsdom",
  clearMocks: true,
  coveragePathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],
  moduleDirectories: [
    "node_modules"
  ],
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  rootDir: "../../",
  testMatch: [
    "<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)"
  ],
  modulePaths: [
    '<rootDir>src'
  ],
  setupFilesAfterEnv: ['<rootDir>/config/jest/jest-dom.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.svg': path.resolve(__dirname, 'jestMockSvg.tsx')
  },
  reporters: [
    'default',
    ["jest-html-reporters", {
      "publicPath": "<rootDir>/reports/unit",
      "filename": "report.html",
      "openReport": true
    }]
  ]
}

export default config