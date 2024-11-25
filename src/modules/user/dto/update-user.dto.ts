import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  role?: string;

  @IsString()
  @ApiProperty()
  nickName?: string;

  @IsString()
  @ApiProperty()
  email?: string;

  @IsString()
  @ApiProperty()
  account?: string;

  @IsString()
  @ApiProperty()
  avatarImage?: string;

  @IsString()
  @ApiProperty()
  backgroundImage?: string;

  @IsDate()
  @ApiProperty()
  birthDay?: Date;

  @IsString()
  @ApiProperty()
  gender?: string;

  @IsString()
  @ApiProperty()
  slogan?: string;
}
