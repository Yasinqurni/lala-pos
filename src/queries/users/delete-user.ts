
import { createClient } from "@/lib/supabase/server";
import { toast } from "sonner";

 
export async function deleteUserQuery(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.admin.deleteUser(id);

  if (error) {
    toast.error('Delete User Failed', { description: error.message });
    throw new Error(error.message);
  }

  return { error: null };
}

