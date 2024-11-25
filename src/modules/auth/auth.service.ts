import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(account: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByAccount(account);
    const { password, ...result } = user;

    if (!user && !(await bcrypt.compare(pass, user.password))) {
      return null;
    }

    return result;
  }

  async login(user: any) {
    const payload = { username: user.account, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
