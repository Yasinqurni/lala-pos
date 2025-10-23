import z from "zod";

export const loginSchemaForm = z.object({
    email: z.string().min(1, "email is required").email('please enter a valid email'),
    password: z.string().min(1, "password is required")
})