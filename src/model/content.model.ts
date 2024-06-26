export class CreateContentRequest {
    name: string;
    // file: Express.Multer.File; // Assuming you're using Express with Multer
}


export class ContentResponse {
    id: number;
    name: string;
    url: string;
    type: string;
    templateId: number;
    userId: number;
}