const nextJest = require("next/jest");
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    "^@/src/(.*)": "<rootDir>/src/$1",
    "^@/generated/(.*)": "<rootDir>/_generated/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  testRegex: [".*test.[jt]sx?$"],
  reporters: ["default", "jest-junit"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/.next/**",
    "!**/coverage/**",
    "!./*.{js,jsx,ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
