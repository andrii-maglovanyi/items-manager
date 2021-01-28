import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<number | null> {
    const user = await this.usersService.findOne(email);
    const isMatch = user && (await bcrypt.compare(password, user.password));

    if (isMatch) {
      return user.id;
    }
    return null;
  }

  public getCookieWithJwtToken(id: number) {
    const token = this.jwtService.sign({ id });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    )}}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  public async getUserByToken(jwt: string): Promise<User> {
    const userData = this.jwtService.decode(jwt, {
      json: true,
    }) as User;
    return await this.usersService.findById(userData.id);
  }
}
