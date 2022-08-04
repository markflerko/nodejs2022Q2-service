import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async update(id: string, dto: UpdatePasswordDto) {
    const user = await this.findOne(id);

    if (user.password !== dto.oldPassowrd) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    await this.usersRepository.update(id, {
      password: dto.newPassword,
    });

    const updatedUser = await this.usersRepository.findOne({
      where: { id },
    });

    if (updatedUser) {
      return updatedUser;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: string) {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findByLogin(login: string) {
    const user = await this.usersRepository.findOne({ where: { login } });
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async create(dto: CreateUserDto) {
    const user = await this.usersRepository.create(dto);
    await this.usersRepository.save(user);
    return user;
  }
}
