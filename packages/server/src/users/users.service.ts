import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findById(id: number): Promise<User | undefined> {
    return this.userModel.findByPk(id);
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { email } });
  }

  async create(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hash = await bcrypt.hash(password, 10);

    const userData = {
      fullName: `${firstName} ${lastName}`,
      email,
      password: hash,
    };

    return await this.userModel.create<User>(userData);
  }
}
