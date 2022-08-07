import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavouritesController } from './favourites.controller';
import { FavouritesService } from './favourites.service';
import { Favourites } from './schemas/favs.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favourites]),
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
  ],
  providers: [FavouritesService],
  controllers: [FavouritesController],
  exports: [FavouritesService],
})
export class FavouritesModule {}
