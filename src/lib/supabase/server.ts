import { environment } from "@/configs/environment";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export type createClientOptions = {
    isAdmin?: boolean;
}
export async function createClient({isAdmin= false}: createClientOptions = {}) {
    const cookiesStore = await cookies();

    const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_ACCESS_ROLE_KEY } = environment;
    return createServerClient(
        SUPABASE_URL!, 
        isAdmin ? SUPABASE_ACCESS_ROLE_KEY : SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookiesStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookiesStore.set(name, value, options)
                        })
                    } catch {
                        console.error('error set cookies', cookiesToSet)
                    }
                }
            }
        }
    )
} 