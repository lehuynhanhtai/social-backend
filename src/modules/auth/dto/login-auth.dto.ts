import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @ApiProperty()
  account: string;

  @IsString()
  @ApiProperty()
  password: string;
}
