import { Module } from '@nestjs/common';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavouritesController } from './favourites.controller';
import { FavouritesRepository } from './favourites.repository';
import { FavouritesService } from './favourites.service';

@Module({
  imports: [TracksModule],
  providers: [FavouritesService, FavouritesRepository],
  controllers: [FavouritesController],
  exports: [FavouritesService],
})
export class FavouritesModule {}
