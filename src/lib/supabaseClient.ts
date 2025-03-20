
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yjnlhofmchcvdfkuowlt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqbmxob2ZtY2hjdmRma3Vvd2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTg3MTYsImV4cCI6MjA1ODAzNDcxNn0.lCpXFnTz8QtcmiulyhNUS-StOXA-uO4kPulrc4vlqSU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
