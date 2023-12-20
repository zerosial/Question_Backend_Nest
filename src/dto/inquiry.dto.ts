import { IsNotEmpty, IsString, IsInt, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInquiryDto {
  @ApiProperty({ example: '문의 제목', description: '문의 제목' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: '문의 내용', description: '문의 내용' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 'MEMBER_INFO', description: '문의 대분류' })
  @IsNotEmpty()
  @IsString()
  questionCategory: string;

  @ApiProperty({
    example: 'PERSONAL_INFO_CHANGE',
    description: '문의 세부 분류',
  })
  @IsNotEmpty()
  @IsString()
  questionDetail: string;

  @ApiProperty({ example: 'user@example.com', description: '사용자 이메일' })
  @IsNotEmpty()
  @IsEmail()
  userEmail: string;
}

export class DeleteInquiryDto {
  @ApiProperty({ example: 1, description: '문의 ID' })
  @IsInt()
  id: number;
}

export class GetInquiriesByEmailDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '사용자 이메일로 문의 검색',
  })
  @IsEmail()
  email: string;
}
