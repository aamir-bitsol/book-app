import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from './authCredentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ message: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
