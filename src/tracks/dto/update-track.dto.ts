import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  artistId: string | null;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  @IsOptional()
  duration: number;
}
