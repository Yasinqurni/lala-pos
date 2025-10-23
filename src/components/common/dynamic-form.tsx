/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { z, ZodType } from "zod";

export type DynamicFormField = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "select" | "textarea" | "file";
  options?: { label: string; value: string }[];
};

type DynamicFormProps<TSchema extends ZodType<any, any>> = {
  schema: TSchema;
  defaultValues: z.infer<TSchema>;
  fields: DynamicFormField[];
  onSubmit: (formData: FormData, data: z.infer<TSchema>) => void;
  isPending?: boolean;
  cancelButton?: boolean;
  onCancel?: () => void;
  submitText?: string;
};

export default function DynamicForm<TSchema extends ZodType<any, any>>({
  schema,
  defaultValues,
  fields,
  onSubmit,
  isPending = false,
  cancelButton = false,
  onCancel,
  submitText = "Submit",
}: DynamicFormProps<TSchema>) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema) as any,
    defaultValues,
  });

  const handleSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    onSubmit(formData, data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => {
          if (field.type === "select" && field.options) {
            return (
              <div key={field.name}>
                <label className="block mb-1 text-sm font-medium">{field.label}</label>
                <select
                  {...form.register(field.name as any)}
                  className="border rounded-md px-3 py-2 w-full"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt) => (
                    <option key={opt.label} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (field.type === "file") {
            return (
              <div key={field.name}>
                <label className="block mb-1 text-sm font-medium">{field.label}</label>
                <input
                  type="file"
                  {...form.register(field.name as any)}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </div>
            );
          }

          return (
            <FormInput
              key={field.name}
              form={form}
              name={field.name as Path<z.infer<TSchema>>}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type || "text"}
            />
          );
        })}

        <div className="flex justify-end gap-2 pt-2">
          {cancelButton && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset(defaultValues);
                onCancel?.();
              }}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : submitText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
