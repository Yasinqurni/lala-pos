'use server'

import { COOKIE_CONSTANTS } from "@/constants/cookie-constant";
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function signOutAction() {
    const supabase = await createClient();
    const cookiesStore = await cookies();
    await supabase.auth.signOut();

    cookiesStore.delete(COOKIE_CONSTANTS.auth_cookies);

    revalidatePath('/', 'layout');
    redirect('/login');
}