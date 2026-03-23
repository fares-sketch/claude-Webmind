---
name: review
description: Performs a thorough code review checking for bugs, security vulnerabilities, performance issues, and style violations. Use when the user asks to review, audit, or check code quality.
argument-hint: "[file-or-directory]"
allowed-tools: Read, Grep, Glob
---

# Code Review Skill

Review the code at $ARGUMENTS. If no path is specified, review all staged changes using git diff --cached.

Review Checklist:

CRITICAL: Bugs and Security

Null/undefined access, off-by-one errors

Uncaught promise rejections, missing error handling

SQL injection, XSS, hardcoded secrets

Race conditions, resource leaks

WARNING: Performance

Queries inside loops (N+1 problem)

Unnecessary re-renders in React

Unbounded data fetches (missing pagination)

Heavy imports that could be lazy-loaded

WARNING: Error Handling

Empty catch blocks that swallow errors

Missing input validation at API boundaries

SUGGESTION: Maintainability

Functions longer than 50 lines

Nesting deeper than 3 levels

Magic numbers or unclear names

Duplicated logic

For each finding, show: the file and line, the problematic code, and the suggested fix. End with: "Review complete: X critical, Y warnings, Z suggestions across N files."

Usage:

/review src/api/auth.ts
/review src/components/
"Review the checkout flow for security issues" (Claude loads automatically)
