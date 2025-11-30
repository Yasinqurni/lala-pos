export type AuthFormStateType = {
    status?: string;
    errors?: {
        email?: string[];
        password?: string[];
        name?: string[];
        role?: string[];
        avatar_url?: string[];
        _form?: string[];
    }
}

export type ProfileType = {
    id?: string;
    name: string;
    avatar_url: string;
    role: string;
}

export type UpdateUserFormStateType = {
    status?: string;
    errors?: {
        email?: string[];
        name?: string[];
        role?: string[];
        avatar_url?: string[];
        _form?: string[];
    }
}
