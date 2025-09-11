import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://pwxpxouatzzxvvvszdnx.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3eHB4b3VhdHp6eHZ2dnN6ZG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3OTU3MTAsImV4cCI6MjA3MTM3MTcxMH0.6o7Za904AOi-QwresK-Y1Z-ev83WyV_hjFDcvbOwjTo"

export const supabase = createClient(supabaseUrl, supabaseKey)

