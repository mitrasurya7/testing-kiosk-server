export class CreateDeviceRequest {
  id: string;
  name: string;
  locationId: number;
  usedLayout: number;
}

export class UpdateDeviceRequest {
  name?: string;
  status?: boolean;
  lastOnline?: Date;
  lastOffline?: Date;
  instalationDate?: Date;
  usedLayout?: number;
  locationId?: number;
}

export class DeviceResponse {
  id: string;
  name: string;
  status: boolean;
  lastOnline: Date;
  lastOffline: Date;
  instalationDate: Date;
  usedLayout: number;
  locationId: number;
}
