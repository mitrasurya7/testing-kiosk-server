export class CreateTemplateRequest {
    name: string;
    htmlCode: string;
    deviceId: string;
}

export class UpdateTemplateRequest {
    name: string;
    htmlCode: string;
    deviceId: string;
}

export class TemplateResponse {
    name: string;
    htmlCode: string;
    status: boolean;
    deviceId: string;
}