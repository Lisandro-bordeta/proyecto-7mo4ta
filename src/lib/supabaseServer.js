import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://pwxpxouatzzxvvvszdnx.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3eHB4b3VhdHp6eHZ2dnN6ZG54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTc5NTcxMCwiZXhwIjoyMDcxMzcxNzEwfQ.yxUsqm7eJ5bQmKAXuo9jzjsvzyB1k0IuUyDxDm2ST3o"

export const supabase = createClient(supabaseUrl, supabaseKey);