import { forwardRef, Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { FavouritesModule } from 'src/favourites/favourites.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { ArtistsRepository } from './artists.repository';
import { ArtistsService } from './artists.service';

@Module({
  imports: [
    forwardRef(() => FavouritesModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsRepository],
  exports: [ArtistsService],
})
export class ArtistsModule {}
