'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FIELD_LOGIN_FORM, INITIAL_LOGIN_FORM, INITIAL_STATE_LOGIN_FORM } from "@/constants/auth-constant";
import { loginSchemaFormValidation } from "@/validations/auth-validation";
import { startTransition, useActionState, useEffect } from "react";
import { loginAction } from "@/actions/auth/login-action";
import { toast } from "sonner";
import DynamicForm from "@/components/common/dynamic-form";

export default function Login() {
  const [loginState, action, isPendingLogin] = useActionState(loginAction, INITIAL_STATE_LOGIN_FORM);

  const onSubmit = async (formData: FormData) => {
    startTransition(() => {
      action(formData);
    });
  };

  useEffect(() => {
    if (loginState?.status === "error") {
      toast.error("Login Failed", {
        description: loginState.errors?._form?.[0],
      });
      startTransition(() => {
        action(null);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState]);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">WELCOME</CardTitle>
        <CardDescription>your world imagination</CardDescription>
      </CardHeader>

      <CardContent>
        <DynamicForm
          schema={loginSchemaFormValidation}
          defaultValues={INITIAL_LOGIN_FORM}
          fields={FIELD_LOGIN_FORM}
          onSubmit={onSubmit}
          isPending={isPendingLogin}
          submitText={"Login"}
        />
      </CardContent>
    </Card>
  );
}
