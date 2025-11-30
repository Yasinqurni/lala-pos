import z from "zod";

export const productSchemaFormValidation = z.object({
    name: z.string().min(1, "name is required"),
    sku: z.string().min(1, "sku is required"),
    description: z.string(),
    is_active: z.coerce.boolean(),
    price: z.coerce.number().min(1, "price is required"),
    selling_price: z.coerce.number().min(1, "selling price is required"),
})