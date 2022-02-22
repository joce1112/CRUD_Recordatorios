import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cezwupsdtqfovnchmtbv.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlend1cHNkdHFmb3ZuY2htdGJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzNzczNTAsImV4cCI6MTk1OTk1MzM1MH0.Cls5w0rspIQNrCEPtMZpvBi1GbMkONU_lUdWjkk-DVE"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)