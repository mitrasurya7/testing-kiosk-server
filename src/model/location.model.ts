export class CreateLocationRequest {
    name: string
    parentId?: number
}

export class UpdateLocationRequest {
    name?: string
    parentId?: number
}

export class LocationResponse {
    name: string
    parentId?: number
}