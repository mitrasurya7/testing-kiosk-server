import { ZodType, z } from 'zod';

export class LayoutValidation {
  static readonly Create: ZodType = z.object({
    status: z.boolean().default(false).optional(),
    templateId: z.number().min(1),
    contentIds: z.array(z.number()).min(1),
    deviceId: z.string().min(1),
  });

  static readonly Update: ZodType = z.object({
    status: z.boolean().default(false).optional(),
    templateId: z.number().min(1).optional(),
    contentIds: z.array(z.number()).min(1).optional(),
    deviceId: z.string().min(1).optional(),
  });
}
