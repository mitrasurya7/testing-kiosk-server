import { ZodType, z } from "zod";

export class TemplateValidate {
    static readonly Create : ZodType = z.object({
        name: z.string().min(1).max(100),
        html_template: z.string().min(1).max(100000000)
    })
}