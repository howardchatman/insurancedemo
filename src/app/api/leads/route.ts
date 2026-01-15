import { NextRequest, NextResponse } from 'next/server';
import { createInsuranceLead, InsuranceLead } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const lead: InsuranceLead = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      preferred_contact: body.preferredContact || 'email',
      source: body.source || 'contact_form',
      status: 'new',
      insurance_type: body.insuranceType,
    };

    const data = await createInsuranceLead(lead);

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
