import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    const webhookUrl = process.env.N8N_CONTACT_WEBHOOK

    if (!webhookUrl || webhookUrl.includes('your-n8n-instance')) {
        return Response.json({ error: 'N8N_CONTACT_WEBHOOK not configured' }, { status: 500 })
    }

    const body = await req.json()

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: body.name,
                email: body.email,
                company: body.company,
                message: body.message,
                submittedAt: new Date().toISOString(),
            }),
        })
    } catch (err) {
        console.error('[Contact] Webhook error:', err)
    }

    return Response.json({ ok: true })
}
