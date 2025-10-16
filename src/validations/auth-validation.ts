import z from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "email is required").email('please enter a valid email'),
    password: z.string().min(1, "password is required")
})

export type LoginForm = z.infer<typeof loginSchema>