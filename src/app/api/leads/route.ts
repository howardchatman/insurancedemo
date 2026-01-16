import { NextRequest, NextResponse } from 'next/server';
import { createInsuranceLead, InsuranceLead } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate source - fallback to contact_form if source not supported yet in DB
    const validSources = ['contact_form', 'chat', 'phone', 'quote', 'lead_gate', 'quiz'];
    const source = validSources.includes(body.source) ? body.source : 'contact_form';

    const lead: InsuranceLead = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      preferred_contact: body.preferredContact || 'email',
      source: source,
      status: 'new',
      insurance_type: body.insuranceType,
    };

    const data = await createInsuranceLead(lead);

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating lead:', error);

    // Return more detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Failed to create lead';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
