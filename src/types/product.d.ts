export type ProductFormStateType = {
    status?: string;
    errors?: {
        name?: string[];
        sku?: string[];
        description?: string[];
        price?: string[];
        selling_price?: string[];
        is_active?: string[];
        _form?: string[];
    }
}