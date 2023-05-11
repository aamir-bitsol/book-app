export class AuthDTO{
    username: string;
    password: string;
}

export interface IPayload{
    "username": string,
    "userId": number,
}