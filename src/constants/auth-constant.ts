import { DynamicFormField } from "@/components/common/dynamic-form";

export const INITIAL_LOGIN_FORM = {
    email: '',
    password: '',
};


export const INITIAL_STATE_LOGIN_FORM = {
    status: 'idle',
    errors: {
        email: [],
        password: [],
        _form: [],
    }
};

export const INITIAL_PROFILE_STATE = {
    id: '',
    name: '',
    role: '',
    avatar_url: '',
};


export const FIELD_LOGIN_FORM: DynamicFormField[]  = [
    { name: "email", label: "Email", type: "email", placeholder: "please input email" },
    { name: "password", label: "Password", type: "password", placeholder: "please input password" },
]