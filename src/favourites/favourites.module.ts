import { Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavouritesController } from './favourites.controller';
import { FavouritesRepository } from './favourites.repository';
import { FavouritesService } from './favourites.service';

@Module({
  imports: [TracksModule, AlbumsModule, ArtistsModule],
  providers: [FavouritesService, FavouritesRepository],
  controllers: [FavouritesController],
  exports: [FavouritesService],
})
export class FavouritesModule {}
