import { supabase } from '../config/supabase.config';

export async function insertUserToDB(user: {
  id: string;
  email: string;
  username: string;
  created_by?: string;
}) {
  const { error } = await supabase.from('users').insert([user]);
  if (error) throw error;
}
