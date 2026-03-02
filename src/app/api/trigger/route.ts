import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const n8nUrl = process.env.N8N_WEBHOOK_URL;

  if (!n8nUrl) {
    return NextResponse.json(
      { error: "N8N_WEBHOOK_URL is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    const res = await fetch(n8nUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `n8n responded with status ${res.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to trigger workflow",
      },
      { status: 500 }
    );
  }
}
