import { createClient } from "@/lib/supabase/client";

export async function getDetailUserQuery(id: string) {
  const supabase = createClient();

  const query = supabase
    .from('profiles')
    .select('*')
    .filter('id', 'eq', id)
    .single();

  const result = await query;
  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}
