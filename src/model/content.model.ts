export class CreateContentRequest {
  name: string;
  // file: Express.Multer.File; // Assuming you're using Express with Multer
}

export class ContentResponse {
  id: number;
  title: string;
  url: string;
  type: string;
  userId: number;
}
