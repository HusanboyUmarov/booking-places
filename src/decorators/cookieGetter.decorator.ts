import {
    UnauthorizedException, 
    ExecutionContext, 
    createParamDecorator
} from '@nestjs/common'

export const cookieGetter = createParamDecorator(
    async (data:string, context: ExecutionContext):Promise<string> =>{
        const request = context.switchToHttp().getRequest();
        const refreshToken = request.cookies[data];
        if(!refreshToken){
            throw new UnauthorizedException('token is not found')

        }
        return refreshToken
    }
)