'use server';

import { CreateProductQuery } from '@/queries/products/create-product';
import { ProductFormStateType } from '@/types/product';
import { productSchemaFormValidation } from '@/validations/product-validation';

export async function createProductAction(
  prevState: ProductFormStateType,
  formData: FormData,
) {
  const validatedFields = productSchemaFormValidation.safeParse({
    name: formData.get('name'),
    sku: formData.get('sku'),
    description: formData.get('description'),
    is_active: formData.get('is_active'),
    price: formData.get('price'),
    selling_price: formData.get('selling_price'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  const { error } = await CreateProductQuery({
    name: validatedFields.data.name,
    sku: validatedFields.data.sku,
    is_active: validatedFields.data.is_active,
    description: validatedFields.data.description,
    price: validatedFields.data.price,
    selling_price: validatedFields.data.selling_price,
  })

  if (error) {
    return {
    status: 'error',
    errors: {
        ...prevState.errors,
        _form: [error.message],
    },
    };
  }

  return {
    status: 'success'
  }
}

