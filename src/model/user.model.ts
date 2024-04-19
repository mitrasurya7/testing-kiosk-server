export class RegisterUserRequest {
    username  : string;
    email     : string;
    password   : string;
    role        : string;
    locationId  : number;
}

export class UserResponse {
    username: string;
    email: string;
    token?: string;
}

export class LoginUserRequest {
    username: string;
    password: string;
}