/**
 * /api/memory — REST endpoint appelable par n8n via HTTP Request nodes.
 *
 * GET    /api/memory?key=xxx              → { key, value, workflow, updatedAt }
 * GET    /api/memory?workflow=lead-engine → [{ key, value, ... }, ...]
 * POST   /api/memory  { key, value, workflow? }  → upsert
 * DELETE /api/memory?key=xxx             → { ok: true }
 *
 * Sécurité : passe le header  x-api-key: <MEMORY_API_KEY>
 */

import { NextRequest } from 'next/server'
import { getMemory, setMemory, deleteMemory, listMemory } from '@/lib/memory'

function authorized(req: NextRequest): boolean {
  const secret = process.env.MEMORY_API_KEY
  if (!secret) return true                                   // pas de secret configuré → ouvert
  return req.headers.get('x-api-key') === secret
}

// ── GET ─────────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  if (!authorized(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const key      = searchParams.get('key')
  const workflow = searchParams.get('workflow')

  if (key) {
    const record = await getMemory(key)
    if (!record) return Response.json({ error: 'Not found' }, { status: 404 })
    return Response.json(record)
  }

  if (workflow) {
    const records = await listMemory(workflow)
    return Response.json(records)
  }

  return Response.json({ error: 'Provide ?key=xxx or ?workflow=xxx' }, { status: 400 })
}

// ── POST ────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!authorized(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { key, value, workflow } = body

  if (!key || value === undefined) {
    return Response.json({ error: '`key` and `value` are required' }, { status: 400 })
  }

  const record = await setMemory(key, typeof value === 'string' ? value : JSON.stringify(value), workflow)
  return Response.json(record, { status: 201 })
}

// ── DELETE ───────────────────────────────────────────────────────────────────

export async function DELETE(req: NextRequest) {
  if (!authorized(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key')

  if (!key) return Response.json({ error: '`key` is required' }, { status: 400 })

  const deleted = await deleteMemory(key)
  return Response.json({ ok: deleted })
}
