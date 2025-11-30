'use server'

import { environment } from "@/configs/environment";
import { createClient } from "@/lib/supabase/server"
import { toast } from "sonner";

export async function uploadFileQuery(
    bucket: string,
    path: string,
    file: File,
    prevPath?: string,
) {
    const supabase = await createClient();

    const newPath = `${path}/${Date.now()}-${file.name}`;

    if(prevPath) {
        const { error } = await supabase.storage.from(bucket).remove([prevPath])
        if (error) {
            return {
                errors: {
                    _form: [error.message]
                },

            }
        }
    }

    const { error } = await supabase.storage.from(bucket).upload(newPath, file)
    if (error) {
        return {
            errors: {
                _form: [error.message]
            },
            data: null,
        }
    }

    return {
        errors: null,
        data: {
            url: `${environment.SUPABASE_URL}/storage/v1/object/public/${bucket}/${newPath}`,
            path: newPath,
        }
    }
}

export async function deleteFileQuery(
    bucket: string,
    path: string,
) {
    const supabase = await createClient();

    const { error } = await supabase.storage.from(bucket).remove([path])
    if (error) {
        toast.error('Delete User Image Failed', { description: error.message });
    }

    return { error: null };
}