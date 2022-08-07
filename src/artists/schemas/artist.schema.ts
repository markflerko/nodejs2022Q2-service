import { Exclude } from 'class-transformer';
import { Album } from 'src/albums/schemas/album.schema';
import { Track } from 'src/tracks/schemas/tracks.schema';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist, {
    cascade: true,
  })
  @Exclude()
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist, { cascade: true })
  @Exclude()
  tracks: Track[];
}

export default Artist;
