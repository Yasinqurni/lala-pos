import { createClient } from "@/lib/supabase/server";

export type CreateProductModel = {
  name: string;
  sku: string;
  description: string;
  is_active: boolean;
  price: number;
  selling_price: number;
};

export async function CreateProductQuery(data: CreateProductModel) {
    console.log(data)
    const supabase = await createClient();

    const { data: insertData, error } = await supabase
        .from("products")
        .insert({
        name: data.name,
        sku: data.sku,
        is_active: data.is_active,
        description: data.description,
        price: data.price,
        selling_price: data.selling_price,
        })
        .select()
        .single();

    if (error) {
        return {
        data: null,
        error,
        };
    }

    return {
        data: insertData,
        error: null,
    };
}
