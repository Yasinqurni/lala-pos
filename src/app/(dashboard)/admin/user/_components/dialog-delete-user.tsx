
import DialogDelete from '@/components/common/dialog-delete';
import { ProfileType } from '@/types/auth';
import { startTransition, useActionState, useEffect } from 'react';
import { deleteUserAction } from '@/actions/delete-user-action';
import { INITIAL_STATE_ACTION } from '@/constants/general-constant';
import { toast } from 'sonner';

interface DialogDeleteUserProps {
  refetch: () => void;
  currentData?: ProfileType;
  handleChangeAction: (open: boolean) => void;
}

export default function DialogDeleteUser({
  refetch,
  currentData,
  handleChangeAction,
}: DialogDeleteUserProps ) {
  const [deleteUserState, action, isPendingDeleteUser] =
    useActionState(deleteUserAction, INITIAL_STATE_ACTION);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('id', currentData!.id as string);
    formData.append('avatar_url', currentData!.avatar_url as string);
    startTransition(() => {
      action(formData);
    });
  };

  useEffect(() => {
    if (deleteUserState?.status === 'error') {
      toast.error('Delete User Failed', {
        description: deleteUserState.errors?._form?.[0],
      });
    }

    if (deleteUserState?.status === 'success') {
      toast.success('Delete User Success');
      handleChangeAction?.(false);
      refetch();
    }
  }, [deleteUserState, handleChangeAction, refetch]);

  return (
    <DialogDelete
      isLoading={isPendingDeleteUser}
      onSubmit={onSubmit}
      title="User"
      onCancel={() => handleChangeAction(false)}
    />
  );
}