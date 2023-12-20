import { QuestionCategory, QuestionDetail } from '@prisma/client';
import { IsNotEmpty, IsString, IsInt, IsEmail, IsEnum } from 'class-validator';

export class CreateInquiryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsEnum(QuestionCategory)
  questionCategory: QuestionCategory;

  @IsEnum(QuestionDetail)
  questionDetail: QuestionDetail;

  @IsNotEmpty()
  @IsEmail()
  userEmail: string;
}

export class DeleteInquiryDto {
  @IsInt()
  id: number;
}

export class GetInquiriesByEmailDto {
  @IsEmail()
  email: string;
}
