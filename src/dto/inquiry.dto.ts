import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsIn,
} from 'class-validator';
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

  @ApiProperty({
    description: '문의 대분류',
    example: 'MEMBER_INFO',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['MEMBER_INFO', 'CAR_SHARING', 'VEHICLE_CONTROL', 'OTHER'])
  questionCategory: string;

  @ApiProperty({
    description: '문의 세부 분류',
    example: 'PERSONAL_INFO_CHANGE',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn([
    'PERSONAL_INFO_CHANGE',
    'AFFILIATION_CHANGE',
    'LICENSE_CARD_REGISTRATION',
    'RESERVATION_INQUIRY',
    'RETURN_INQUIRY',
    'PAYMENT_INQUIRY',
    'DOOR_CONTROL_INQUIRY',
    'OTHER',
  ])
  questionDetail: string;

  @ApiProperty({ example: 'user@example.com', description: '사용자 이메일' })
  @IsNotEmpty()
  @IsEmail()
  userEmail: string;
}

export class GetInquiriesByEmailDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '사용자 이메일로 문의 검색',
  })
  @IsEmail()
  email: string;
}

export class UpdateInquiryDto {
  @ApiProperty({
    example: '문의 제목',
    description: '문의 제목',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: '문의 내용',
    description: '문의 내용',
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description: '문의 대분류',
    example: 'MEMBER_INFO',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['MEMBER_INFO', 'CAR_SHARING', 'VEHICLE_CONTROL', 'OTHER'])
  questionCategory?: string;

  @ApiProperty({
    description: '문의 세부 분류',
    example: 'PERSONAL_INFO_CHANGE',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn([
    'PERSONAL_INFO_CHANGE',
    'AFFILIATION_CHANGE',
    'LICENSE_CARD_REGISTRATION',
    'RESERVATION_INQUIRY',
    'RETURN_INQUIRY',
    'PAYMENT_INQUIRY',
    'DOOR_CONTROL_INQUIRY',
    'OTHER',
  ])
  questionDetail?: string;

  @ApiProperty({
    example: 'user@example.com',
    description: '사용자 이메일',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  userEmail?: string;
}
