import { NextRequest, NextResponse } from 'next/server';
import { createInsuranceQuote, InsuranceQuote } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Simple quote calculation logic (demo purposes)
    const baseRates: Record<string, number> = {
      auto: 89,
      home: 125,
      life: 45,
      health: 199,
      business: 299,
      bundle: 199, // Discounted bundle rate
    };

    const baseRate = baseRates[body.quoteType] || 150;

    // Age factor (simplified)
    const age = parseInt(body.age) || 35;
    const ageFactor = age < 25 ? 1.3 : age > 60 ? 1.2 : 1.0;

    const monthlyPremium = Math.round(baseRate * ageFactor);
    const annualPremium = monthlyPremium * 12;

    const quote: InsuranceQuote = {
      quote_type: body.quoteType,
      coverage_amount: body.coverageAmount || 500000,
      monthly_premium: monthlyPremium,
      annual_premium: annualPremium,
      deductible: body.deductible || 500,
      coverage_details: {
        zipCode: body.zipCode,
        age: body.age,
        calculatedAt: new Date().toISOString(),
      },
      status: 'quoted',
    };

    const data = await createInsuranceQuote(quote);

    return NextResponse.json({
      success: true,
      data: {
        ...data,
        monthlyPremium,
        annualPremium,
        potentialSavings: Math.round(monthlyPremium * 0.25), // 25% bundle savings
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating quote:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}
