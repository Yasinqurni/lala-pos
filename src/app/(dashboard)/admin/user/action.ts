'use server';

import { createClient } from '@/lib/supabase/server';
import { AuthFormState } from '@/types/auth';
import { userSchemaForm } from '@/validations/user-validation';

export async function createUser(
  prevState: AuthFormState,
  formData: FormData,
) {
  const validatedFields = userSchemaForm.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
    role: formData.get('role'),
    // avatar_url: formData.get('avatar_url'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    options: {
        data: {
            name: validatedFields.data.name,
            role: validatedFields.data.role,
            // avatar_url: validatedFields.data.avatar_url,
        }
    }
  });

  if (error) {
    return {
      status: 'error',
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return {
    status: 'success'
  }
}

