import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity'

@Injectable()
export class MiddlewareService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,) {}
        async validateUser(username: string, pass: string){
        const user = await this.userRepository.findOne({where:{username}})
        if(user && user.password === pass){
            const {password, ...rest} = user;
            return rest;
        }
        return {message:"Something went wrong"};
    }

}
