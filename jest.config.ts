import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  transform: {
    "^.+\\.ts?$": "ts-jest", // Transform TypeScript files with ts-jest
  },
  testPathIgnorePatterns: ["/src/config/test.ts"],
  testRegex: "(/tests/.*\\.(int|spec))\\.ts$", // Include test files in the regex pattern ending with .int.ts or .spec.ts
  moduleFileExtensions: ["js", "ts", "json", "node"], // Include JavaScript and TypeScript file extensions
};
export default config;
