'use client'

import DynamicForm from "@/components/common/dynamic-form";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FIELD_USER_FORM, INITIAL_STATE_USER_FORM, INITIAL_USER_FORM } from "@/constants/user-constant";
import { userSchemaFormValidation } from "@/validations/user-validation";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createUserAction } from "@/actions/user/create-user-action";
import { useQueryClient } from "@tanstack/react-query";

type DialogCreateUserProps = {
  onClose: () => void;
};

export default function DialogCreateUser({ onClose }: DialogCreateUserProps) {
  const queryClient = useQueryClient();

  const [createUserState, action, isPendingCreateUser] =
    useActionState(createUserAction, INITIAL_STATE_USER_FORM);

  const onSubmit = async (formData: FormData) => {
    startTransition(() => {
      action(formData);
    });
  };

  useEffect(() => {
    if (createUserState?.status === "error") {
      toast.error("Create User Failed", {
        description: createUserState.errors?._form?.[0],
      });
    }

    if (createUserState?.status === "success") {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Create User Success");
      onClose();
    }
  }, [createUserState, queryClient, onClose]);

  return (
    <DialogContent className="sm:max-w-[425px]">
       <DialogTitle>Create User</DialogTitle>
      <DynamicForm
        schema={userSchemaFormValidation}
        defaultValues={INITIAL_USER_FORM}
        fields={FIELD_USER_FORM}
        onSubmit={onSubmit}
        cancelButton={true}
        onCancel={onClose}
        isPending={isPendingCreateUser}
        submitText="Submit"
      />
    </DialogContent>
  );
}
