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
