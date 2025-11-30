'use client'

import DynamicForm from "@/components/common/dynamic-form";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createProductAction } from "@/actions/product/create-product-action";
import { productSchemaFormValidation } from "@/validations/product-validation";
import { FIELD_PRODUCT_FORM, INITIAL_PRODUCT_FORM, INITIAL_STATE_PRODUCT_FORM } from "@/constants/product-constant";

type DialogCreateProductProps = {
  onClose: () => void;
  refetch: () => void;
};

export default function DialogCreateProduct({ onClose, refetch }: DialogCreateProductProps) {
  const [createProductState, action, isPendingCreateProduct] =
    useActionState(createProductAction, INITIAL_STATE_PRODUCT_FORM);

  const onSubmit = async (formData: FormData) => {
    startTransition(() => {
      action(formData);
    });
  };

  useEffect(() => {
    if (createProductState?.status === "error") {
      toast.error("Create Product Failed", {
        description: createProductState.errors?._form?.[0],
      });
    }

    if (createProductState?.status === "success") {
      toast.success("Create Product Success");
      refetch();
      onClose();
    }
  }, [createProductState, onClose, refetch]);

  return (
    <DialogContent className="sm:max-w-[425px]">
       <DialogTitle>Create Product</DialogTitle>
      <DynamicForm
        schema={productSchemaFormValidation}
        defaultValues={INITIAL_PRODUCT_FORM}
        fields={FIELD_PRODUCT_FORM}
        onSubmit={onSubmit}
        cancelButton={true}
        onCancel={onClose}
        isPending={isPendingCreateProduct}
        submitText="Submit"
      />
    </DialogContent>
  );
}
