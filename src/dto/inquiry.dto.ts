import { IsNotEmpty, IsString, IsInt, IsEmail } from 'class-validator';

export class CreateInquiryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  questionTypeId: number;

  @IsNotEmpty()
  @IsString()
  questionCategory: string;

  @IsNotEmpty()
  @IsString()
  questionDetail: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}

export class DeleteInquiryDto {
  @IsInt()
  id: number;
}

export class GetInquiriesByEmailDto {
  @IsEmail()
  email: string;
}
