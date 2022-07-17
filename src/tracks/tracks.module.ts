import { forwardRef, Module } from '@nestjs/common';
import { FavouritesModule } from 'src/favourites/favourites.module';
import { TracksRepository } from './track.repository';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [forwardRef(() => FavouritesModule)],
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
  exports: [TracksService],
})
export class TracksModule {}
