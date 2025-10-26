import { createClient } from "@/lib/supabase/server";

export type CreateUserModel = {
    email: string;
    password: string;
    name: string;
    role: string;
    avatar_url: string;
}

export async function CreateUserQuery(data: CreateUserModel) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                name: data.name,
                role: data.role,
                avatar_url: data.avatar_url,
            }
        }
    });


    if (error) {
        return {
            error
        }
    }

    return {
        error: null
    }
}