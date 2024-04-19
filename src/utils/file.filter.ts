export class FileFilter {
    static imageFilter = (req: any, file: any, callback: any) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    };

    static videoFilter = (req: any, file: any, callback: any) => {
        if (!file.originalname.match(/\.(mp4)$/)) {
            return callback(new Error('Only video files are allowed!'), false);
        }
        callback(null, true);
    }
}