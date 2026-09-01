import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gnpcswrhcdueoyytagzo.supabase.co';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_ztk1LEhWOcqyzvCtbPpstA_uLOxcskZ';

export const supabase = createClient(supabaseUrl, supabaseKey);
