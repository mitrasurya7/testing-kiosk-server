import { ZodType, z } from 'zod';

export class DeviceValidation {
  static readonly Create: ZodType = z.object({
    id: z.string().min(1).max(100),
    name: z.string().min(1).max(100),
    status: z.boolean().default(false).optional(),
    lastOnline: z.date().default(new Date()).optional(),
    lastOffline: z.date().default(new Date()).optional(),
    instalationDate: z.date().default(new Date()).optional(),
    locationId: z.number().min(1),
  });

  static readonly Update: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    status: z.boolean().default(false).optional(),
    lastOnline: z.date().default(new Date()).optional(),
    lastOffline: z.date().default(new Date()).optional(),
    instalationDate: z.date().default(new Date()).optional(),
    locationId: z.number().min(1).optional(),
  })
}
