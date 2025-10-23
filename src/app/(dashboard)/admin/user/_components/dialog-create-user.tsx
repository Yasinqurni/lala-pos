'use client'

import DynamicForm from "@/components/common/dynamic-form";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FIELD_USER_FORM, INITIAL_STATE_USER_FORM, INITIAL_USER_FORM } from "@/constants/user-constant";
import { userSchemaForm } from "@/validations/user-validation";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createUser } from "../action";

export default function DialogCreateUser({ onClose }: { onClose: () => void }) {
  const [createUserState, createUserAction, isPendingCreateUser] =
    useActionState(createUser, INITIAL_STATE_USER_FORM);

  const onSubmit = async (formData: FormData) => {
    startTransition(() => {
      createUserAction(formData);
    });
  };

  useEffect(() => {
    if (createUserState?.status === "error") {
      toast.error("Create User Failed", {
        description: createUserState.errors?._form?.[0],
      });
    }

    if (createUserState?.status === "success") {
      toast.success("Create User Success");
      onClose();
    }
  }, [createUserState, onClose]);

  return (
    <DialogContent className="sm:max-w-[425px]">
       <DialogTitle>Create User</DialogTitle> 
      <DynamicForm
        schema={userSchemaForm}
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
