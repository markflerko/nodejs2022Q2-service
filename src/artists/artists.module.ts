import { forwardRef, Module } from '@nestjs/common';
import { FavouritesModule } from 'src/favourites/favourites.module';
import { ArtistsController } from './artists.controller';
import { ArtistsRepository } from './artists.repository';
import { ArtistsService } from './artists.service';

@Module({
  imports: [forwardRef(() => FavouritesModule)],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsRepository],
  exports: [ArtistsService],
})
export class ArtistsModule {}
