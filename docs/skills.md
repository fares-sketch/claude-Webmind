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

---

Skill 3: Test Runner

Handles running tests with common patterns: single files, coverage reports, watch mode.

File: .claude/skills/run-tests/SKILL.md

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

---

Skill 4: Documentation Generator

Produces API documentation from your source code.

File: .claude/skills/generate-docs/SKILL.md

---
name: generate-docs
description: Generates API documentation from source code. Reads route handlers, extracts endpoints and response shapes, and produces structured markdown docs. Use when the user asks to document an API or generate docs.
argument-hint: "[source-directory] [output-file]"
allowed-tools: Read, Grep, Glob, Write, Edit
---

# API Documentation Generator

Generate API docs from the source code at $ARGUMENTS[0] and write to $ARGUMENTS[1].

If no output file is specified, write to docs/api-reference.md. If no source directory is specified, search for API routes in common locations like src/app/api/, src/pages/api/, or routes/.

For Each Endpoint, Document:





HTTP Method (GET, POST, PUT, DELETE)



Route Path



Request Parameters (path params, query params, request body)



Response Shape (success and error responses)



Whether authentication is required

Output Format: Group endpoints by resource/path prefix. Include a table of contents at the top. Add a timestamp comment at the top of the file.

Usage:

/generate-docs src/app/api/ docs/api.md
/generate-docs
"Document our API endpoints" (Claude loads automatically)

---

Skill 5: Database Migration

Creates, validates, and applies Supabase database migrations. Requires manual trigger because it changes your database.

File: .claude/skills/db-migrate/SKILL.md

---
name: db-migrate
description: Create and manage database migrations for Supabase. Generates migration SQL files, validates them, and optionally applies them.
disable-model-invocation: true
argument-hint: "[create|apply|status] [migration-name]"
allowed-tools: Bash(npx supabase *), Read, Write, Edit, Grep, Glob
---

# Database Migration Skill

Command: $ARGUMENTS[0]
Migration name (if creating): $ARGUMENTS[1]

create (name):





Read existing migrations in supabase/migrations/ to understand current schema



Generate a new migration file: npx supabase migration new $ARGUMENTS[1]



Write the SQL with safety best practices:





Use IF NOT EXISTS for CREATE TABLE



Use IF EXISTS for DROP operations



Enable Row Level Security on new tables



Include a commented-out rollback section at the bottom



Flag any destructive operations (DROP TABLE, DROP COLUMN) with a warning

apply:





Show pending migrations: npx supabase migration list



Ask the user to confirm before applying



Apply: npx supabase db reset (local) or npx supabase db push (remote)

status: Show which migrations have been applied and which are pending.

Safety Rules:





NEVER apply migrations to production without user confirmation



NEVER drop tables or columns without warning first



Always generate the file BEFORE applying so the user can review

Usage:

/db-migrate create add_user_profiles
/db-migrate apply
/db-migrate status
---

## New Claude Code Capabilities (2026)

### Loops
Short-term, recurring automation within the current session.
- Created with `cron create`, listed with `cron list`, removed with `cron delete`
- Session-bound — expires in 3 days, no catch-up on missed runs
- Best for: monitoring, polling, sprint-scoped automation

### Scheduled Tasks
Long-term persistent workflows that survive session restarts.
- Desktop app only — app must be running; does catch up on missed runs
- Best for: daily reports, weekly reviews, long-running automation

### Google Workspace Integration
Full access to Google Drive, Docs, Sheets via Google's open-source CLI.
- Replaces the previous limited integration
- Enables native document creation and collaboration-ready output

### Skills 2.0
Built-in skill evaluation and testing framework.
- Embed objective evaluation criteria directly in skills
- Enables data-driven iteration and faster skill quality improvements
- Supports brand memory and self-learning loops

### Cron Tool Reference

| Tool | Description |
|------|-------------|
| `cron create` | Creates a scheduled command/job |
| `cron list` | Lists all active scheduled commands |
| `cron delete` | Deletes a scheduled command/job |

---
name: strategy-advisor
description: |
  High-level strategic thinking and business decision guidance for planning and direction-setting.
  Use when: making strategic decisions, evaluating business options, setting direction, analyzing
  trade-offs, or when user mentions strategy, business planning, competitive analysis, or long-term planning.
license: MIT
metadata:
  author: awesome-llm-apps
  version: "1.0.0"
---

# Strategy Advisor

You are a strategic advisor who provides high-level thinking and business decision guidance.

## When to Apply

Use this skill when:
- Evaluating strategic options
- Making high-impact business decisions
Making competitive analysis
- Setting organizational direction
- Assessing market opportunities
- Planning long-term initiatives

## Strategic Thinking Framework

### 1. **Situational Analysis**
- Current state assessment
- Key stakeholders
- Market dynamics
- Competitive landscape
- Resources and constraints

### 2. **Option Generation**
- Brainstorm alternatives
- Consider unconventional approaches
- Evaluate trade-offs
- Assess risks and opportunities

### 3. **Decision Criteria**
- Strategic alignment
- Financial impact
- Resource requirements
- Risk tolerance
- Time horizon

### 4. **Recommendation**
- Preferred option with rationale
- Implementation considerations
- Success metrics
- Contingency plans

## Output Format

```markdown
## Strategic Question
[What decision needs to be made?]

## Situation Analysis
- **Current State**: [Where are we now?]
- **Objective**: [Where do we want to go?]
- **Constraints**: [What limits our options?]

## Options Evaluation

### Option 1: [Name]
**Pros**: [Benefits]
**Cons**: [Drawbacks]
**Risk**: [High/Med/Low]

### Option 2: [Name]
[Continue for each option...]

## Recommendation
[Preferred path with clear rationale]

## Implementation Roadmap
[High-level steps to execute]

## Success Metrics
[How to measure if this was the right choice]
```

---

*Created for strategic planning and high-level business decisions*
