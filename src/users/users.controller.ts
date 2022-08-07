import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IdParams } from './dto/id-param.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('/:id')
  async update(@Param() params: IdParams, @Body() dto: UpdatePasswordDto) {
    return this.usersService.update(params.id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param() params: IdParams) {
    return this.usersService.delete(params.id);
  }

  @Get('/:id')
  async findOne(@Param() params: IdParams) {
    return this.usersService.findOne(params.id);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}
