import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export async function getProductQuery(limit :number, page: number, search: string) {
  const supabase = createClient();

  const query = supabase
    .from('products')
    .select('*', { count: 'exact' })
    .range((page - 1) * limit, page * limit - 1)
    .order('created_at', { ascending: false });

  if (search !== '') {
    query.ilike('name', `%${search}%`)
  }

  const result = await query
  if (result.error) {
    toast.error('Get Product Failed', { description: result.error.message });
    throw new Error(result.error.message);
  }

  return result;
}
