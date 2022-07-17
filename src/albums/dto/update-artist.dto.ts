import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  artistId: string | null;
}
