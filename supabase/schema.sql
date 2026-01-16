-- Supabase Schema for Chatman Insurance Demo
-- Run this in your Supabase SQL Editor
-- Uses insurance_ prefix to share the same Supabase project with real estate demo

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insurance Leads table - captures all potential customers
CREATE TABLE IF NOT EXISTS insurance_leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT,
  preferred_contact VARCHAR(20) DEFAULT 'email' CHECK (preferred_contact IN ('email', 'phone', 'text')),
  source VARCHAR(50) DEFAULT 'contact_form' CHECK (source IN ('contact_form', 'chat', 'phone', 'quote', 'lead_gate', 'quiz')),
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted')),
  insurance_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insurance quote requests
CREATE TABLE IF NOT EXISTS insurance_quotes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id UUID REFERENCES insurance_leads(id) ON DELETE SET NULL,
  quote_type VARCHAR(50) NOT NULL CHECK (quote_type IN ('auto', 'home', 'life', 'health', 'business', 'bundle')),
  coverage_amount DECIMAL(12, 2),
  monthly_premium DECIMAL(10, 2),
  annual_premium DECIMAL(10, 2),
  deductible DECIMAL(10, 2),
  coverage_details JSONB,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'quoted', 'accepted', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insurance policy inquiries
CREATE TABLE IF NOT EXISTS insurance_policy_inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id UUID REFERENCES insurance_leads(id) ON DELETE SET NULL,
  policy_type VARCHAR(50) NOT NULL,
  inquiry_type VARCHAR(20) DEFAULT 'info' CHECK (inquiry_type IN ('consultation', 'info', 'claim', 'renewal')),
  preferred_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insurance chat conversations
CREATE TABLE IF NOT EXISTS insurance_chat_conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id UUID REFERENCES insurance_leads(id) ON DELETE SET NULL,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insurance phone calls - Retell.ai call logs
CREATE TABLE IF NOT EXISTS insurance_phone_calls (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id UUID REFERENCES insurance_leads(id) ON DELETE SET NULL,
  retell_call_id VARCHAR(255) UNIQUE,
  caller_phone VARCHAR(50),
  duration_seconds INTEGER,
  transcript TEXT,
  summary TEXT,
  sentiment VARCHAR(20),
  call_status VARCHAR(20) DEFAULT 'completed',
  inquiry_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insurance newsletter subscriptions
CREATE TABLE IF NOT EXISTS insurance_newsletter_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Insurance quiz results - stores personalized quiz answers and recommendations
CREATE TABLE IF NOT EXISTS insurance_quiz_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id UUID REFERENCES insurance_leads(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  answers JSONB NOT NULL,
  recommendations JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insurance claims - tracks customer claims
CREATE TABLE IF NOT EXISTS insurance_claims (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id UUID REFERENCES insurance_leads(id) ON DELETE SET NULL,
  claim_number VARCHAR(50) UNIQUE NOT NULL,
  claim_type VARCHAR(50) NOT NULL CHECK (claim_type IN ('auto', 'home', 'life', 'health', 'business')),
  description TEXT,
  date_submitted TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'review', 'adjuster', 'assessment', 'payment', 'resolved', 'denied')),
  estimated_amount DECIMAL(12, 2),
  approved_amount DECIMAL(12, 2),
  adjuster_name VARCHAR(255),
  adjuster_phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insurance claim updates - timeline events for claims
CREATE TABLE IF NOT EXISTS insurance_claim_updates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  claim_id UUID REFERENCES insurance_claims(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  is_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_insurance_leads_email ON insurance_leads(email);
CREATE INDEX IF NOT EXISTS idx_insurance_leads_status ON insurance_leads(status);
CREATE INDEX IF NOT EXISTS idx_insurance_leads_created_at ON insurance_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_insurance_quotes_lead_id ON insurance_quotes(lead_id);
CREATE INDEX IF NOT EXISTS idx_insurance_policy_inquiries_lead_id ON insurance_policy_inquiries(lead_id);
CREATE INDEX IF NOT EXISTS idx_insurance_chat_conversations_session_id ON insurance_chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_insurance_phone_calls_retell_call_id ON insurance_phone_calls(retell_call_id);
CREATE INDEX IF NOT EXISTS idx_insurance_quiz_results_email ON insurance_quiz_results(email);
CREATE INDEX IF NOT EXISTS idx_insurance_claims_claim_number ON insurance_claims(claim_number);
CREATE INDEX IF NOT EXISTS idx_insurance_claims_status ON insurance_claims(status);
CREATE INDEX IF NOT EXISTS idx_insurance_claim_updates_claim_id ON insurance_claim_updates(claim_id);

-- Enable Row Level Security (RLS)
ALTER TABLE insurance_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_policy_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_phone_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_claim_updates ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access (for the demo)
-- In production, you'd want more restrictive policies

CREATE POLICY "Allow anonymous insert on insurance_leads" ON insurance_leads
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on insurance_quotes" ON insurance_quotes
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on insurance_policy_inquiries" ON insurance_policy_inquiries
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous access to insurance_chat_conversations" ON insurance_chat_conversations
  FOR ALL TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on insurance_phone_calls" ON insurance_phone_calls
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on insurance_newsletter_subscriptions" ON insurance_newsletter_subscriptions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on insurance_quiz_results" ON insurance_quiz_results
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous read on insurance_claims" ON insurance_claims
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous insert on insurance_claims" ON insurance_claims
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous read on insurance_claim_updates" ON insurance_claim_updates
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous insert on insurance_claim_updates" ON insurance_claim_updates
  FOR INSERT TO anon WITH CHECK (true);

-- Function to update updated_at timestamp (reuse if exists)
CREATE OR REPLACE FUNCTION update_insurance_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_insurance_leads_updated_at
  BEFORE UPDATE ON insurance_leads
  FOR EACH ROW EXECUTE FUNCTION update_insurance_updated_at_column();

CREATE TRIGGER update_insurance_chat_conversations_updated_at
  BEFORE UPDATE ON insurance_chat_conversations
  FOR EACH ROW EXECUTE FUNCTION update_insurance_updated_at_column();

CREATE TRIGGER update_insurance_claims_updated_at
  BEFORE UPDATE ON insurance_claims
  FOR EACH ROW EXECUTE FUNCTION update_insurance_updated_at_column();
