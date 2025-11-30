'use server';

import { environment } from '@/configs/environment';
import { deleteFileQuery } from '@/queries/uploads/upload-storage';
import { deleteUserQuery } from '@/queries/users/delete-user';
import { AuthFormStateType } from '@/types/auth';

export async function deleteUserAction(prevState: AuthFormStateType, formData: FormData) {
  const avatar_url = formData.get('avatar_url')
  if (avatar_url) {
    const { error } = await deleteFileQuery(environment.SUPABASE_BUCKET, String(avatar_url));
    if (error) {
      return {
        status: 'error',
        errors: {
          ...prevState.errors,
          _form: [error],
        },
      };
    }
  }

  const id = formData.get('id')
  const { error } = await deleteUserQuery(String(id))
  if (error) {
    return {
      status: 'error',
      errors: {
        ...prevState.errors,
        _form: [error],
      },
    };
  }
  
  
   
    return { status: 'success' };
  }
  