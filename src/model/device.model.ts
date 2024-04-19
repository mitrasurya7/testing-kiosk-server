export class CreateDeviceRequest {
  name: string;
  deviceId: string;
  locationId: number;
  templateId: number;
}

export class UpdateDeviceRequest {
  name?: string;
  deviceId?: string;
  locationId?: number;
  templateId?: number;
  status?: boolean;
  last_online?: Date;
  last_offline?: Date;
}

export class DeviceResponse {
  name: string;
  deviceId: string;
  locationId: number;
  status: boolean;
  last_online: Date;
  last_offline: Date;
  templateId: number;
}
