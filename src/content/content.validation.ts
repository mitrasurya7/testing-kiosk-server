import { ZodType, z } from "zod";

export class ContentValidation {
    static readonly Create: ZodType = z.object({
        name: z.string().min(3).max(100),
    })
}