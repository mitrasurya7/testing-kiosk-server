export class CreateTemplateRequest {
  name: string;
  htmlCode: string;
  coverImage: string;
  totalContents: string;
}

export class UpdateTemplateRequest {
  name: string;
  htmlCode: string;
  coverImage: string;
  totalContents: string;
}

export class TemplateResponse {
  name: string;
  htmlCode: string;
  coverImage: string;
  totalContents: string;
}
