"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    roots: ["<rootDir>/dist"],
    transform: {
        "^.+\\.js$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.js$",
    moduleFileExtensions: ["js", "ts"],
};
exports.default = config;
