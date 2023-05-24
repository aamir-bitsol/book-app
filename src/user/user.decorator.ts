import { createParamDecorator} from '@nestjs/common'

export const dUser = createParamDecorator(
    (data: string, req)=>{
       return req;
    },
);
