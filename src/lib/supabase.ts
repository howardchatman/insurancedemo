import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our insurance database
export interface InsuranceLead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  preferred_contact: 'email' | 'phone' | 'text';
  source: 'contact_form' | 'chat' | 'phone' | 'quote' | 'lead_gate';
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  insurance_type?: string;
  created_at?: string;
}

export interface InsuranceQuote {
  id?: string;
  lead_id?: string;
  quote_type: 'auto' | 'home' | 'life' | 'health' | 'business' | 'bundle';
  coverage_amount?: number;
  monthly_premium?: number;
  annual_premium?: number;
  deductible?: number;
  coverage_details?: Record<string, unknown>;
  status: 'pending' | 'quoted' | 'accepted' | 'declined';
  created_at?: string;
}

export interface InsurancePolicyInquiry {
  id?: string;
  lead_id?: string;
  policy_type: string;
  inquiry_type: 'consultation' | 'info' | 'claim' | 'renewal';
  preferred_date?: string;
  notes?: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  created_at?: string;
}

export interface InsuranceChatConversation {
  id?: string;
  lead_id?: string;
  session_id: string;
  messages: {
    sender: 'user' | 'ai';
    text: string;
    timestamp: string;
  }[];
  created_at?: string;
  updated_at?: string;
}

// Database functions for insurance
export async function createInsuranceLead(lead: InsuranceLead) {
  const { data, error } = await supabase
    .from('insurance_leads')
    .insert([lead])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createInsuranceQuote(quote: InsuranceQuote) {
  const { data, error } = await supabase
    .from('insurance_quotes')
    .insert([quote])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createInsurancePolicyInquiry(inquiry: InsurancePolicyInquiry) {
  const { data, error } = await supabase
    .from('insurance_policy_inquiries')
    .insert([inquiry])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function saveInsuranceChatConversation(conversation: InsuranceChatConversation) {
  const { data, error } = await supabase
    .from('insurance_chat_conversations')
    .upsert([conversation], { onConflict: 'session_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getInsuranceLeadByEmail(email: string) {
  const { data, error } = await supabase
    .from('insurance_leads')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}
