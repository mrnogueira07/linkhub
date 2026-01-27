import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vokjjkehfdulfavagvcb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8fP-74gw-KBk07qwsz5Msg_RgagW8F-';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
