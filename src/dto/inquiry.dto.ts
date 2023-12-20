import { IsNotEmpty, IsString, IsInt, IsEmail } from 'class-validator';

export class CreateInquiryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  questionCategory: string;

  @IsNotEmpty()
  @IsString()
  questionDetail: string;

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
