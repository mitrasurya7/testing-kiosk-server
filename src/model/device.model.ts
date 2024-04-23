export class CreateDeviceRequest {
  id: string;
  name: string;
  locationId: number;
}

export class UpdateDeviceRequest {
  id?: string;
  name?: string;
  locationId?: number;
  status?: boolean;
  lastOnline?: Date;
  lastOffline?: Date;
  instalationDate?: Date;
}

export class DeviceResponse {
  id: string;
  name: string;
  locationId: number;
  status: boolean;
  lastOnline: Date;
  lastOffline: Date;
  instalationDate: Date;
}
