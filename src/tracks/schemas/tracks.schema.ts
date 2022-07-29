import { Exclude } from 'class-transformer';
import { Album } from 'src/albums/schemas/album.schema';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  artistId: string | null; // refers to Artist

  @Column({ nullable: true })
  albumId: string | null; // refers to Album

  @Column()
  duration: number; // integer number

  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Exclude()
  album: Album;
}
