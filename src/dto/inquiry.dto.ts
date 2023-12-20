import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsEmail,
  IsOptional,
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
    example: [
      'MEMBER_INFO (회원 정보)',
      'CAR_SHARING (카셰어링)',
      'VEHICLE_CONTROL (차량 관제)',
      'OTHER (기타)',
    ],
  })
  @IsNotEmpty()
  @IsString()
  questionCategory: string;

  @ApiProperty({
    description: '문의 세부 분류',
    example: [
      'PERSONAL_INFO_CHANGE (개인정보 변경)',
      'AFFILIATION_CHANGE (소속 변경)',
      'LICENSE_CARD_REGISTRATION (면허/카드 등록)',
      'RESERVATION_INQUIRY (예약 문의)',
      'RETURN_INQUIRY (반납 문의)',
      'PAYMENT_INQUIRY (결제 문의)',
      'DOOR_CONTROL_INQUIRY (도어 제어 문의)',
      'OTHER (기타)',
    ],
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
    example: [
      'MEMBER_INFO (회원 정보)',
      'CAR_SHARING (카셰어링)',
      'VEHICLE_CONTROL (차량 관제)',
      'OTHER (기타)',
    ],
    required: false,
  })
  @IsOptional()
  @IsString()
  questionCategory?: string;

  @ApiProperty({
    description: '문의 세부 분류',
    example: [
      'PERSONAL_INFO_CHANGE (개인정보 변경)',
      'AFFILIATION_CHANGE (소속 변경)',
      'LICENSE_CARD_REGISTRATION (면허/카드 등록)',
      'RESERVATION_INQUIRY (예약 문의)',
      'RETURN_INQUIRY (반납 문의)',
      'PAYMENT_INQUIRY (결제 문의)',
      'DOOR_CONTROL_INQUIRY (도어 제어 문의)',
      'OTHER (기타)',
    ],
    required: false,
  })
  @IsOptional()
  @IsString()
  questionDetail?: string;

  @ApiProperty({
    example: 'Y/N',
    description: '답변/미답변 상태',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  questionState?: string;

  @ApiProperty({
    example: 'user@example.com',
    description: '사용자 이메일',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  userEmail?: string;
}
