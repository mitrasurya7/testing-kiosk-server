import { ZodType, z } from "zod";

export class TemplateValidate {
    static readonly Create : ZodType = z.object({
        name: z.string().min(1).max(100),
        htmlCode: z.string().min(1)
    })
    
    static readonly Update : ZodType = z.object({
        name: z.string().min(1).max(100),
        htmlCode: z.string().min(1)
    })
}