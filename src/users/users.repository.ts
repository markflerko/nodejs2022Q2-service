import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  private readonly users: User[];

  constructor() {
    this.users = [];
  }

  update(id: string, dto: UpdatePasswordDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    let result: User | null;

    if (userIndex > -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...dto,
        version: this.users[userIndex].version + 1,
      };
      result = this.users[userIndex];
    } else {
      result = null;
    }

    return new Promise((res) => res(result));
  }

  delete(id: string) {
    const userIndex = this.users.findIndex((album) => album.id === id);

    let result: User | null;

    if (userIndex > -1) {
      return this.users.splice(userIndex, 1);
    } else {
      result = null;
    }

    return new Promise((res) => res(result));
  }

  findOne(id: string): Promise<User> {
    const user = this.users.find((item) => item.id === id);

    let result: User | null;

    if (user) {
      result = user;
    } else {
      result = null;
    }

    return new Promise((res) => res(result));
  }

  findAll() {
    return new Promise((res) => res(this.users));
  }

  create(dto: CreateUserDto) {
    const user = {
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...dto,
    };

    this.users.push(user);

    return new Promise((res) => res(user));
  }
}
