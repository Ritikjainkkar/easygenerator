import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './schema/user.schema';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService : AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body(ValidationPipe) user: AuthCredentialsDto) {
    try {
      const token = await this.authService.validateUser(user);
      return {
        message: 'User login successfully',
        token,
      };
    } catch (err) {
      throw new BadRequestException({
        statusCode: 400,
        message: err.message,
        error: err,
        describe: 'Bad Request',
      });
    }
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body(ValidationPipe) user: UserDto) {
    try {
      await this.authService.registerUser(user);
      return {
        message: 'User added successfully',
      };
    } catch (err) {
      console.log(err)
      throw new BadRequestException({
        statusCode: 400,
        message: err.message,
        error: err,
        describe: 'Bad Request',
      });
    }
  }
}
