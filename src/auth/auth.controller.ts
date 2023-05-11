import { Controller, Post, Body } from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signin')
  signIn(
    @Body() authCredentialsDto: AuthDTO,
  ): Promise<{ message: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
