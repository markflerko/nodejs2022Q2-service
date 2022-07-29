import { Exclude } from 'class-transformer';
import { Album } from 'src/albums/schemas/album.schema';
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
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Exclude()
  albums: Album[];
}

export default Artist;
