import { ZodType, z } from "zod";

export class LocationValidate {
    static readonly Create: ZodType = z.object({
        name: z.string().min(1),
        parentId: z.number().min(1),
    });

    static readonly Update: ZodType = z.object({
        name: z.string().optional(),
        parentId: z.number().optional(),
    })
}