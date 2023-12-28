import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ example: '답변 제목', description: '답변 제목' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: '답변 내용', description: '답변 내용' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
