import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async update(id: string, dto: UpdatePasswordDto) {
    const user = await this.findOne(id);

    if (user.password !== dto.oldPassowrd) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    await this.usersRepository.update(id, dto);

    if (user) {
      return user;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: string) {
    const user = await this.usersRepository.delete(id);
    if (user) {
      return null;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async findAll() {
    const users = await this.usersRepository.findAll();
    return users;
  }

  async create(dto: CreateUserDto) {
    const user = await this.usersRepository.create(dto);
    return user;
  }
}
