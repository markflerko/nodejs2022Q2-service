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
import { CreateTrackDto } from './dto/create-track.dto';
import { IdParams } from './dto/id-param.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param() params: IdParams) {
    return this.tracksService.delete(params.id);
  }

  @Put('/:id')
  async update(@Param() params: IdParams, @Body() dto: UpdateTrackDto) {
    return this.tracksService.update(params.id, dto);
  }

  @Get('/:id')
  async findOne(@Param() params: IdParams) {
    return this.tracksService.findOne(params.id);
  }

  @Get()
  async findAll() {
    return this.tracksService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateTrackDto) {
    return this.tracksService.create(dto);
  }
}
