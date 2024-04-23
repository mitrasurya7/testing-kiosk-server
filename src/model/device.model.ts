export class CreateDeviceRequest {
  id: string;
  name: string;
  locationId: number;
}

export class UpdateDeviceRequest {
  name?: string;
  status?: boolean;
  lastOnline?: Date;
  lastOffline?: Date;
  instalationDate?: Date;
  locationId?: number;
  activeTemplate?: number;
}

export class DeviceResponse {
  id: string;
  name: string;
  status: boolean;
  lastOnline: Date;
  lastOffline: Date;
  instalationDate: Date;
  locationId: number;
  activeTemplate?: number;
}
