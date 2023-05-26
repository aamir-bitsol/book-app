import { Controller, Post, Body, Session } from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('signin')
  signIn(
    @Session() session: Record<string, any>,
    @Body() authCredentialsDto: AuthDTO,
  ): Promise<{ message: string }> {
    return this.authService.signIn(authCredentialsDto, session);
  }
}
