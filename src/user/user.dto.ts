export class CreateUserDto{
    name: string;
    contact: string;
    address: string;
    username: string;
    password: string;
    image: string;
}

export class UpdateUserDto{
    name?: string;
    contact?: string;
    address?: string;
    username?: string;
    password?: string;
    image?: string;

}