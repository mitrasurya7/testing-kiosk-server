import { ZodType, z } from 'zod';

export class DeviceValidation {
  static readonly Create: ZodType = z.object({
    name: z.string().min(1).max(100),
    deviceId: z.string().min(1).max(100),
    status: z.boolean().default(false).optional(),
    last_online: z.date().default(new Date()).optional(),
    last_offline: z.date().default(new Date()).optional(),
    locationId: z.number().min(1),
    templateId: z.number().min(1),
  });

  static readonly Update: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    status: z.boolean().default(false).optional(),
    last_online: z.date().default(new Date()).optional(),
    last_offline: z.date().default(new Date()).optional(),
    locationId: z.number().min(1).optional(),
    templateId: z.number().min(1).optional(),
  })
}
