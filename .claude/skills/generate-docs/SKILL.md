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
