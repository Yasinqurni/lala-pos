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
    | 'boolean'
    | 'file';
  disabled?: boolean;
  options?: { label: string; value: string }[];
};

type FormMode = 'create' | 'update';

type DynamicFormProps<TSchema extends ZodType<any, any>> = {
  schema: TSchema;
  defaultValues: z.infer<TSchema>;
  data?: Partial<z.infer<TSchema>>;
  /** default 'create' */
  type?: FormMode;
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
  data,
  type = 'create',
  fields,
  onSubmit,
  isPending = false,
  cancelButton = false,
  onCancel,
  submitText,
}: DynamicFormProps<TSchema>) {

  const initialValues = (type === 'update'
    ? { ...defaultValues, ...data }
    : defaultValues) as z.infer<TSchema>;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema) as any,
    defaultValues: initialValues,
  });

  const [previews, setPreviews] = useState<
    Record<string, { file: File; displayUrl: string } | undefined>
  >({});

  useEffect(() => {
    const newValues =
      type === 'update'
        ? ({ ...defaultValues, ...data } as z.infer<TSchema>)
        : (defaultValues as z.infer<TSchema>);

    form.reset(newValues);

    const initialPreviews: Record<
      string,
      { file: File; displayUrl: string } | undefined
    > = {};

    fields.forEach((field) => {
      if (field.type !== 'file') return;

      const rawValue = (newValues as any)[field.name];

      if (rawValue instanceof File) {
        const url = URL.createObjectURL(rawValue);
        initialPreviews[field.name] = {
          file: rawValue,
          displayUrl: url,
        };
      }
    });

  setPreviews(initialPreviews);
}, [type, data, defaultValues, form, fields]);


  const handleSubmit = form.handleSubmit((values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === 'avatar_url') {
        const file = previews[key]?.file;
        if (file) {
          formData.append(key, file);
        }
      } else {
        formData.append(key, String(value ?? ''));
      }
    });
    onSubmit(formData, values);
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
                    <option key={opt.value} value={opt.value} disabled={field.disabled}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (field.type === "boolean") {
            return (
              <div key={field.name} className="flex items-center justify-between">
                <label className="block text-sm font-medium mr-4">
                  {field.label}
                </label>
          
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    {...form.register(field.name as any)}
                  />
                  <div
                    className="
                      w-11 h-6
                      bg-gray-200
                      peer-focus:outline-none
                      peer-focus:ring-2 peer-focus:ring-blue-500
                      rounded-full
                      peer
                      peer-checked:bg-blue-600
                      after:content-['']
                      after:absolute
                      after:top-[2px]
                      after:left-[2px]
                      after:bg-white
                      after:border
                      after:border-gray-300
                      after:rounded-full
                      after:h-5
                      after:w-5
                      after:transition-all
                      peer-checked:after:translate-x-5
                    "
                  />
                </label>
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
                disabled={field.disabled}
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
              disabled={field.disabled}
            />
          );
        })}

        <div className="flex justify-end gap-2 pt-2">
          {cancelButton && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const resetValues =
                  type === 'update'
                    ? ({ ...defaultValues, ...data } as z.infer<TSchema>)
                    : (defaultValues as z.infer<TSchema>);
                form.reset(resetValues);
                setPreviews({});
                onCancel?.();
              }}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              submitText ?? (type === 'update' ? 'Update' : 'Submit')
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
