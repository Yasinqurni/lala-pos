/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { Path, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { z, ZodType } from 'zod';
import FormInput from '@/components/common/form-input';
import FormImage from '@/components/common/form-image';

export type DynamicFormField = {
  name: string;
  label: string;
  placeholder?: string;
  type?:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'select'
    | 'textarea'
    | 'file';
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
  submitText = 'Submit',
}: DynamicFormProps<TSchema>) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema) as any,
    defaultValues,
  });

  const [previews, setPreviews] = useState<
    Record<string, { file: File; displayUrl: string } | undefined>
  >({});

  const handleSubmit = form.handleSubmit((data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "avatar_url") {
        const file = previews[key]?.file;
        if (file) {
          formData.append(key, file);
        }
      } else {
        formData.append(key, String(value ?? ""));
      }
    });
    onSubmit(formData, data);
  });


  useEffect(() => {
    const subscription = form.watch((_, { name }) => {
      if (name && fields.some((f) => f.name === name && f.type === 'file')) {
        setPreviews((prev) => ({ ...prev, [name]: undefined }));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, fields]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => {
          if (field.type === 'select' && field.options) {
            return (
              <div key={field.name}>
                <label className="block mb-1 text-sm font-medium">
                  {field.label}
                </label>
                <select
                  {...form.register(field.name as any)}
                  className="border rounded-md px-3 py-2 w-full"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (field.type === 'file') {
            return (
              <FormImage
                key={field.name}
                form={form}
                name={field.name as Path<z.infer<TSchema>>}
                label={field.label}
                preview={previews[field.name]}
                setPreview={(preview) =>
                  setPreviews((prev) => ({ ...prev, [field.name]: preview }))
                }
              />
            );
          }

          return (
            <FormInput
              key={field.name}
              form={form}
              name={field.name as Path<z.infer<TSchema>>}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type || 'text'}
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
                setPreviews({});
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
