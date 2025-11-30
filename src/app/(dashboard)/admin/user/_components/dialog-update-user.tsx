'use client';

import DynamicForm from "@/components/common/dynamic-form";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  FIELD_UPDATE_USER_FORM,
  INITIAL_STATE_USER_UPDATE_FORM,
  INITIAL_USER_FORM,
} from "@/constants/user-constant";
import {
  userUpdateSchemaFormValidation,
} from "@/validations/user-validation";
import {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { updateUserAction } from "@/actions/user/update-user-action";
import { getDetailUserQuery } from "@/queries/users/get-detail-user";
import { useQueryClient } from "@tanstack/react-query";

type UserFormData = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url?: string | File | undefined;
  old_avatar_url?: string | undefined;
};

type DialogUpdateUserProps = {
  onClose: () => void;
  userId: string;
  refetch: () => void;
};

export default function DialogUpdateUser({
  onClose,
  userId,
  refetch,
}: DialogUpdateUserProps) {
  const queryClient = useQueryClient();
  const [updateUserState, action, isPendingUpdateUser] =
    useActionState(updateUserAction, INITIAL_STATE_USER_UPDATE_FORM);

  const [userData, setUserData] = useState<UserFormData | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);

  const onSubmit = async (formData: FormData) => {
    formData.append("id", userId);
    startTransition(() => {
      action(formData);
    });
  };

  useEffect(() => {
    let ignore = false;

    const fetchDetail = async () => {
      setIsLoadingDetail(true);
      try {
        const res = await getDetailUserQuery(userId);
        if (!ignore) {
          setUserData({
            id: res.id,
            name: res.name,
            email: res.email,
            role: res.role,
            old_avatar_url: res.avatar_url,
            avatar_url: res.avatar_url,
          });
        }

        if (res.avatar_url) {
          const response = await fetch(res.avatar_url);
          const blob = await response.blob();

          const urlParts = res.avatar_url.split("/");
          const filenameFromUrl = urlParts[urlParts.length - 1] || "avatar.jpg";

          setUserData((prev) => prev ? { ...prev, avatar_url: new File([blob], filenameFromUrl, { type: blob.type }) } : null);
        }
      } catch (e) {
        if (!ignore) {
          toast.error('Get User Failed', { description: (e as Error).message });
          onClose();
        }
      } finally {
        if (!ignore) setIsLoadingDetail(false);
      }
    };

    fetchDetail();

    return () => {
      ignore = true;
    };
  }, [userId, onClose]);

  useEffect(() => {
    if (updateUserState?.status === "error") {
      toast.error("Update User Failed", {
        description: updateUserState.errors?._form?.[0],
      });
    }

    if (updateUserState?.status === "success") {
      toast.success("Update User Success");
      refetch()
      onClose();
    }
  }, [updateUserState, onClose, refetch, queryClient]);

  if (isLoadingDetail) {
    return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Update User</DialogTitle>
        <div className="py-6 text-center text-sm text-muted-foreground">
          Loading user detail...
        </div>
      </DialogContent>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogTitle>Update User</DialogTitle>
      <DynamicForm
        schema={userUpdateSchemaFormValidation}
        defaultValues={INITIAL_USER_FORM}
        fields={FIELD_UPDATE_USER_FORM}
        onSubmit={onSubmit}
        cancelButton
        onCancel={onClose}
        isPending={isPendingUpdateUser}
        submitText="Submit"
        type="update"
        data={userData}
      />
    </DialogContent>
  );
}
