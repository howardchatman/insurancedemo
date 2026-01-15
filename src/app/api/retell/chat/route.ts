import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory } = body;

    // For demo purposes, return a simple response
    // In production, this would integrate with an LLM or Retell's chat API

    const insuranceResponses: Record<string, string> = {
      'quote': 'I can help you get a quote! Based on your profile, we offer competitive rates starting at $89/month for auto, $125/month for home, and $45/month for life insurance. Would you like me to calculate a personalized quote?',
      'coverage': 'We offer comprehensive coverage options including Auto, Home, Life, Health, and Business insurance. Our bundle packages can save you up to 25%. What type of coverage interests you most?',
      'claim': 'Filing a claim is easy with us! You can file online 24/7 or speak with a claims specialist. Most claims are processed within 48 hours. How can I assist with your claim?',
      'price': 'Our prices are very competitive! Auto insurance starts at $89/month, Home at $125/month, and Life at just $45/month. Bundle multiple policies to save up to 25%!',
      'default': 'I\'m ARIA, your AI insurance assistant. I can help you with quotes, coverage information, claims, and consultations. What would you like to know?',
    };

    let response = insuranceResponses.default;
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      response = insuranceResponses.quote;
    } else if (lowerMessage.includes('coverage') || lowerMessage.includes('plan')) {
      response = insuranceResponses.coverage;
    } else if (lowerMessage.includes('claim')) {
      response = insuranceResponses.claim;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('how much')) {
      response = insuranceResponses.price;
    }

    return NextResponse.json({
      success: true,
      data: { response }
    });
  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
