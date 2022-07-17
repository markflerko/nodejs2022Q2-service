import { forwardRef, Module } from '@nestjs/common';
import { FavouritesModule } from 'src/favourites/favourites.module';
import { AlbumsController } from './albums.controller';
import { AlbumsRepository } from './albums.repository';
import { AlbumsService } from './albums.service';

@Module({
  imports: [forwardRef(() => FavouritesModule)],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository],
  exports: [AlbumsService],
})
export class AlbumsModule {}
