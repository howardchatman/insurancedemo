import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const retellApiKey = process.env.RETELL_API_KEY;
    const agentId = process.env.NEXT_PUBLIC_RETELL_AGENT_ID;

    if (!retellApiKey || !agentId) {
      return NextResponse.json(
        { success: false, error: 'Retell API not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${retellApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create web call');
    }

    const data = await response.json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error creating web call:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create web call' },
      { status: 500 }
    );
  }
}
