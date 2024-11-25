import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { ProviderType } from 'src/enum';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUserByAccount(account: string) {
    return await this.userRepository.findOne({ where: { account } });
  }

  async createUser(body: CreateUserDto): Promise<User> {
    return await this.userRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const existingUser = await transactionalEntityManager
          .getRepository(User)
          .findOne({
            where: [{ account: body.account }, { email: body.email }],
          });

        if (existingUser) {
          throw new BadRequestException(
            existingUser.account === body.account
              ? 'Account already exists'
              : 'Email already exists',
          );
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newUser = transactionalEntityManager.getRepository(User).create({
          ...body,
          providerType: ProviderType.LOCAL,
          password: hashedPassword,
        });

        return await transactionalEntityManager
          .getRepository(User)
          .save(newUser);
      },
    );
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getOneUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return await this.userRepository.delete(id);
  }
}
