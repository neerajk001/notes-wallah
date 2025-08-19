// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Load environment variables safely
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

// Ensure variables exist before creating client
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('❌ Missing Supabase environment variables in .env.local')
}

// Export Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
