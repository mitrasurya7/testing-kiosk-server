import { ZodType, z } from "zod";

export class UserValidate {
    static readonly Register : ZodType = z.object({
        username: z.string().min(1).max(100),
        email: z.string().email(),
        password: z.string().min(1).max(100),
        role: z.string().min(1).max(100),
        locationId: z.number()
    })

    static readonly Login : ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100)
    })
}