import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './schema/user.schema';
import { removePassword } from 'src/utils/util';
import { Request } from 'express';


@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService,
    private readonly authRepo : AuthRepository) {}

  async validateUser(signInUser: AuthCredentialsDto): Promise<string> {
    const password = signInUser.password;
    const email = signInUser.email;
    const user = await this.authRepo.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Invalid user or User not available');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: email,
      name: user.name,
    };
    return this.createToken(payload);
  }

  createToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  async registerUser(createUserDto: UserDto): Promise<User> {
    try {
      const isUserExist = await this.authRepo.findOne(createUserDto.email)
      if(isUserExist) {
        throw new Error("User already exist")
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = { ...createUserDto, password: hashedPassword };
      const res = await this.authRepo.createUser(user);
      return removePassword(res.toObject());
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }


  verifyToken(req: Request): { isValid: boolean, decoded?: any } {
    const tokenFromCookies = req.cookies?.authToken;
    if (!tokenFromCookies) {
      return { isValid: false }; // Return false immediately if no token is found
    }
    try {
      const decoded = this.jwtService.verify(tokenFromCookies);
      return { isValid: true, decoded };
    } catch (error) {
      console.error('Error verifying token from cookies:', error);
      return { isValid: false }; 
    }
  }
  
}
