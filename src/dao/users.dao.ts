import { supabase } from '../config/supabase.config';

export const getUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Supabase getUsers error: ${error.message}`);
  }

  return data;
};
