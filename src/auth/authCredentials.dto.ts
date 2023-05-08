export class AuthCredentialsDto{
    username: string;
    password: string;
}

export interface IPayload{
    "username": string,
    "userId": number,
}