'use server';

import { environment } from '@/configs/environment';
import { uploadFileQuery } from '@/queries/uploads/upload-storage';
import { updateUserQuery } from '@/queries/users/update-user';
import { UpdateUserFormStateType } from '@/types/auth';
import { userUpdateSchemaFormValidation } from '@/validations/user-validation';

export async function updateUserAction(
  prevState: UpdateUserFormStateType,
  formData: FormData,
) {
  const id = formData.get('id') as string;

  const validatedFields = userUpdateSchemaFormValidation.safeParse({
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

  const { error } = await updateUserQuery(id, {
    name: validatedFields.data.name,
    role: validatedFields.data.role,
    avatar_url: avatarUrl,
  })


  if (error) {
    return {
    status: 'error',
    errors: {
        ...prevState.errors,
        _form: [error],
    },
    };
  }

  return {
    status: 'success'
  }
}
