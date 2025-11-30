import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface FormInputProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
  }

export default function FormInput<T extends FieldValues>(
  {
    form,
    name,
    label,
    placeholder,
    type = 'text',
    disabled = false,
  }: FormInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: {...rest} }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === 'textarea' ? (
              <Textarea
              {...rest}
              placeholder={placeholder}
              autoComplete="off"
              disabled={disabled}
            />
            ) : (
              <Input
              {...rest}
              type={name}
              placeholder={placeholder}
              autoComplete="off"
              disabled={disabled}
            />
            )}

          </FormControl>
          <FormMessage className="text-xs"/>
        </FormItem>
      )} />
  )

}