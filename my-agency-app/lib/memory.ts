/**
 * WorkflowMemory — Airtable-backed key/value store for n8n workflows.
 *
 * Table Airtable : "WorkflowMemory"
 * Champs requis  : key (single line), value (long text), workflow (single line), updatedAt (date+time)
 */

const BASE_URL = 'https://api.airtable.com/v0'
const BASE_ID  = process.env.AIRTABLE_BASE_ID!
const TABLE    = 'WorkflowMemory'

function headers() {
  return {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
  }
}

export interface MemoryRecord {
  key: string
  value: string        // JSON stringifié ou texte libre
  workflow?: string    // ex: "lead-engine", "call-engine"
  updatedAt: string
}

// ── Lire une entrée mémoire ─────────────────────────────────────────────────

export async function getMemory(key: string): Promise<MemoryRecord | null> {
  const filter = encodeURIComponent(`{key} = "${key}"`)
  const url    = `${BASE_URL}/${BASE_ID}/${TABLE}?filterByFormula=${filter}&maxRecords=1`

  const res  = await fetch(url, { headers: headers() })
  const data = await res.json()

  if (!data.records?.length) return null

  const fields = data.records[0].fields
  return {
    key:       fields.key,
    value:     fields.value,
    workflow:  fields.workflow,
    updatedAt: fields.updatedAt,
  }
}

// ── Écrire / mettre à jour une entrée mémoire ───────────────────────────────

export async function setMemory(
  key: string,
  value: string,
  workflow?: string,
): Promise<MemoryRecord> {
  // Cherche si l'enregistrement existe déjà
  const filter    = encodeURIComponent(`{key} = "${key}"`)
  const searchUrl = `${BASE_URL}/${BASE_ID}/${TABLE}?filterByFormula=${filter}&maxRecords=1`

  const search     = await fetch(searchUrl, { headers: headers() })
  const searchData = await search.json()
  const existing   = searchData.records?.[0]

  const fields = {
    key,
    value,
    workflow:   workflow ?? 'unknown',
    updatedAt:  new Date().toISOString(),
  }

  if (existing) {
    // PATCH — mise à jour
    const res = await fetch(`${BASE_URL}/${BASE_ID}/${TABLE}/${existing.id}`, {
      method:  'PATCH',
      headers: headers(),
      body:    JSON.stringify({ fields }),
    })
    const data = await res.json()
    return data.fields
  } else {
    // POST — création
    const res = await fetch(`${BASE_URL}/${BASE_ID}/${TABLE}`, {
      method:  'POST',
      headers: headers(),
      body:    JSON.stringify({ fields }),
    })
    const data = await res.json()
    return data.fields
  }
}

// ── Supprimer une entrée mémoire ────────────────────────────────────────────

export async function deleteMemory(key: string): Promise<boolean> {
  const filter    = encodeURIComponent(`{key} = "${key}"`)
  const searchUrl = `${BASE_URL}/${BASE_ID}/${TABLE}?filterByFormula=${filter}&maxRecords=1`

  const search     = await fetch(searchUrl, { headers: headers() })
  const searchData = await search.json()
  const existing   = searchData.records?.[0]

  if (!existing) return false

  await fetch(`${BASE_URL}/${BASE_ID}/${TABLE}/${existing.id}`, {
    method:  'DELETE',
    headers: headers(),
  })
  return true
}

// ── Lister toutes les entrées d'un workflow ─────────────────────────────────

export async function listMemory(workflow: string): Promise<MemoryRecord[]> {
  const filter = encodeURIComponent(`{workflow} = "${workflow}"`)
  const url    = `${BASE_URL}/${BASE_ID}/${TABLE}?filterByFormula=${filter}&sort[0][field]=updatedAt&sort[0][direction]=desc`

  const res  = await fetch(url, { headers: headers() })
  const data = await res.json()

  return (data.records ?? []).map((r: { fields: MemoryRecord }) => r.fields)
}
