export class CreateDeviceRequest {
  id: string;
  name: string;
  locationId?: number;
  templateId: number;
}

export class UpdateDeviceRequest {
  name?: string;
  status?: boolean;
  lastOnline?: Date;
  lastOffline?: Date;
  instalationDate?: Date;
  locationId?: number;
  templateId?: number;
}

export class DeviceResponse {
  id: string;
  name: string;
  status: boolean;
  lastOnline: Date;
  lastOffline: Date;
  instalationDate: Date;
  locationId: number;
  templateId: number;
}
