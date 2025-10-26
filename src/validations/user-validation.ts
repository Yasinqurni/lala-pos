import z from "zod";

export const userSchemaFormValidation = z.object({
    email: z.email('please enter a valid email').min(1, "email is required"),
    password: z.string().min(1, "password is required"),
    name: z.string().min(1, "name is required"),
    role: z.string().min(1, "name is required"),
    avatar_url: z.union([z.string().min(1, "avatar_url is required"), z.instanceof(File)]),
})