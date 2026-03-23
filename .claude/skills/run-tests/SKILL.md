---
name: run-tests
description: Run tests with various configurations -- single file, coverage, watch mode, or CI mode. Use when the user asks to run tests, check coverage, or verify tests pass.
argument-hint: "[file-or-pattern] [--coverage] [--watch] [--ci]"
allowed-tools: Bash(npx jest ), Bash(npx vitest ), Bash(npm test ), Bash(npm run ), Read, Grep, Glob
---

# Test Runner Skill

Run tests based on the provided arguments: $ARGUMENTS

Determine the Test Framework -- Check package.json for vitest or jest. If both exist, prefer vitest.

Parse Arguments and Run:

No args: Run all tests

A filename: Run that single test file

A word like "auth": Run tests matching that pattern

--coverage: Run with coverage report

--watch: Run in watch mode

--ci: Run in CI mode with verbose output

Analyze Results:

If all pass: Report count and time. If coverage was requested, flag files below 80%.

If tests fail: Show each failure with the expected vs. actual result, read the source code, and suggest the most likely fix.

Usage:

/run-tests
/run-tests src/api/auth.test.ts
/run-tests --coverage
"Can you run the auth tests and show me coverage?" (Claude loads automatically)
