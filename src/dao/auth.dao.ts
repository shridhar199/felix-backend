import { supabase } from '../config/supabase.config';

export async function insertUserToDB(user: {
  id: string;
  email: string;
  full_name: string;
  created_by?: string;
}) {
  const { error } = await supabase.from('users').insert([user]);
  if (error) throw error;
}
