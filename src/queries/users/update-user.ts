
import { createClient } from "@/lib/supabase/server";
import { toast } from "sonner";

// eslint-disable-next-line
export async function updateUserQuery(id: string, data: any) {
  const supabase = await createClient();
    const { error } = await supabase
    .from('profiles')
    .update({
      name: data.name,
      role: data.role,
      avatar_url: data.avatar_url,
    })
    .eq('id', id);

  if (error) {
    console.log('ini error', error);
    toast.error('Update User Failed', { description: error.message });
    throw new Error(error.message);
  }

  return { error: null };
}
