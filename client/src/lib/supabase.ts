import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fqvhytxfbdxnabqsfapk.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxdmh5dHhmYmR4bmFicXNmYXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NzQ3MzAsImV4cCI6MjA5MTI1MDczMH0.vHGMG--KjBJvVAJMWQ65ywEAP_igSUmIFhO_k_KAIrs';

export const supabase = createClient(supabaseUrl, supabaseKey);
