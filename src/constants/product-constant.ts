import { DynamicFormField } from "@/components/common/dynamic-form";

export const INITIAL_PRODUCT_FORM = {
    name: '',
    sku: '',
    is_active: false,
    description: '',
    price: 0,
    selling_price: 0,
};

export const INITIAL_STATE_PRODUCT_FORM = {
    status: 'idle',
    errors: {
        name: [],
        sku: [],
        is_active: [],
        description: [],
        price: [],
    selling_price: [],
    _form: [],
    }
};


export const FIELD_PRODUCT_FORM: DynamicFormField[]  = [
    { name: "name", label: "Name", type: "text", placeholder: "please input name" },
    { name: "sku", label: "Sku", type: "text", placeholder: "please input sku" },
    { name: "is_active", label: "Status", type: "boolean", placeholder: "please input status active" },
    { name: "description", label: "Description", type: "text", placeholder: "please input description" },
    { name: "price", label: "Price", type: "number", placeholder: "please input price" },
    { name: "selling_price", label: "Selling Price", type: "number", placeholder: "please input selling price" },
]
