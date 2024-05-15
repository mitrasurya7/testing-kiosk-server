import { ContentResponse } from './content.model';

export class CreateLayoutRequest {
  status: boolean;
  templateId: number;
  contentIds: number[];
  deviceId: string;
}

export class UpdateLayoutRequest {
  status?: boolean;
  templateId?: number;
  contentIds?: number[];
  deviceId?: string;
}

export class LayoutResponse {
  status: boolean;
  templateId: number;
  contentIds: number[];
  deviceId: string;
  contents: ContentResponse[];
}
