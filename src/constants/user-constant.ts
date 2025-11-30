import { DynamicFormField } from "@/components/common/dynamic-form";

export const INITIAL_USER_FORM = {
    email: '',
    password: '',
    name: '',
    role: '',
    avatar_url: '',
};


export const INITIAL_STATE_USER_FORM = {
    status: 'idle',
    errors: {
        email: [],
        password: [],
        name: [],
        role: [],
        avatar_url: [],
        _form: [],
    }
};

export const INITIAL_STATE_USER_UPDATE_FORM = {
    status: 'idle',
    errors: {
        email: [],
        name: [],
        role: [],
        avatar_url: [],
        _form: [],
    }
};

export const FIELD_USER_FORM: DynamicFormField[]  = [
    { name: "email", label: "Email", type: "email", placeholder: "please input email" },
    { name: "password", label: "Password", type: "password", placeholder: "please input password" },
    { name: "name", label: "Name", type: "text", placeholder: "please input name" },
    { name: "role", label: "Role", type: "select", placeholder: "please input role", options: [{label: 'Admin', value: 'admin'}, {label: 'User', value: 'user'}] },
    { name: "avatar_url", label: "Avatar", type: "file" },
]


export const FIELD_UPDATE_USER_FORM: DynamicFormField[]  = [
    { name: "email", label: "Email", type: "email", placeholder: "please input email", disabled: true },
    { name: "name", label: "Name", type: "text", placeholder: "please input name" },
    { name: "role", label: "Role", type: "select", placeholder: "please input role", options: [{label: 'Admin', value: 'admin'}, {label: 'User', value: 'user'}] },
    { name: "avatar_url", label: "Avatar", type: "file" },
]