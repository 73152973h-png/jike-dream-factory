/**
 * Server-side API proxy — auto-detects base URL from env.
 */
import { NextRequest, NextResponse } from 'next/server';

const BASE = process.env.ARK_BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3';

export async function POST(req: NextRequest) {
  const apiKey = process.env.ARK_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'ARK_API_KEY not configured' },
      { status: 500 },
    );
  }

  const body = await req.json();
  const { endpoint, ...payload } = body;

  if (!endpoint) {
    return NextResponse.json({ error: 'endpoint is required' }, { status: 400 });
  }

  try {
    const res = await fetch(`${BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
