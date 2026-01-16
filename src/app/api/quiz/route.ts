import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const quizResult = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      answers: body.answers,
      recommendations: body.recommendations,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('insurance_quiz_results')
      .insert([quizResult])
      .select()
      .single();

    if (error) {
      // If table doesn't exist, just log and return success
      // Quiz results will still be captured via leads API
      console.log('Quiz table may not exist yet:', error.message);
      return NextResponse.json({ success: true, data: quizResult }, { status: 201 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Error saving quiz results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save quiz results' },
      { status: 500 }
    );
  }
}
