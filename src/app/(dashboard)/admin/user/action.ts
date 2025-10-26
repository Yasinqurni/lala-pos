'use server';

import { environment } from '@/configs/environment';
import { uploadFileQuery } from '@/queries/uploads/upload-storage';
import { CreateUserQuery } from '@/queries/users/create-user';
import { AuthFormStateType } from '@/types/auth';
import { userSchemaFormValidation } from '@/validations/user-validation';

export async function createUserAction(
  prevState: AuthFormStateType,
  formData: FormData,
) {
  const validatedFields = userSchemaFormValidation.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
    role: formData.get('role'),
    avatar_url: formData.get('avatar_url'),
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

  let avatarUrl = "";
  const avatarData = validatedFields.data.avatar_url;

  if (avatarData instanceof File) {
    const { data, errors } = await uploadFileQuery(
      environment.SUPABASE_BUCKET, 
      'user', 
      avatarData,
    )

    if (errors) {
      return {
        status: 'error',
        errors: {
          ...prevState.errors,
          _form: errors._form,
        },
      }
    }

    avatarUrl = data.url;
  } else if (typeof avatarData === "string") {
    avatarUrl = avatarData;
  }

  const { error } = await CreateUserQuery({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    name: validatedFields.data.name,
    role: validatedFields.data.role,
    avatar_url: avatarUrl,
  })


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

