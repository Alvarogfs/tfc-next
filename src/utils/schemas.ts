import {z} from "zod"
export const emailSchema = z.string().trim().email()
export const formSchema = z.object({
    name : z.string().min(4).max(20).trim(),
    email: emailSchema,
    password: z.string().min(8).max(16).trim().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, "Must contain uppercase, lowercase and number")
})