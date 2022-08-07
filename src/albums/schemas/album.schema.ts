import { Exclude } from 'class-transformer';
import Artist from 'src/artists/schemas/artist.schema';
import { Track } from 'src/tracks/schemas/tracks.schema';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Exclude()
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album, {
    cascade: true,
  })
  @Exclude()
  tracks: Track[];
}
