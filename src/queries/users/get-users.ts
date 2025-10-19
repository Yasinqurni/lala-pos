import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export async function getUsers(limit :number, page: number) {
  const supabase = createClient();

  const result = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .range((page - 1) * limit, page * limit - 1)
    .order('created_at');

  if (result.error) {
    toast.error('Get Profile Failed', { description: result.error.message });
    throw new Error(result.error.message);
  }

  return result;
}
