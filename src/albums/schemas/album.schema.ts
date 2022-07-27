import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  artistId: string | null; // refers to Artist
}
