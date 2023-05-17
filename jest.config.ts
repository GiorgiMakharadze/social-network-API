import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["<rootDir>/dist"],
  transform: {
    "^.+\\.js$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.js$",
  moduleFileExtensions: ["js", "ts"],
};

export default config;
