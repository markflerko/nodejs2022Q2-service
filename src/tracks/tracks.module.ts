import { Module } from '@nestjs/common';
import { TracksRepository } from './track.repository';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
  exports: [TracksService],
})
export class TracksModule {}
