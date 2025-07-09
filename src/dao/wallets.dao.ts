import { supabase } from '../config/supabase.config';

export const getWallets = async () => {
  const { data, error } = await supabase
    .from('wallets')
    .select('*')

  if (error) {
    throw new Error(`Supabase getWallets error: ${error.message}`);
  }

  return data;
};
