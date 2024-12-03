import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async validateUser(
    email: string,
    plainPassword: string,
  ): Promise<User | null> {

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }


    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}