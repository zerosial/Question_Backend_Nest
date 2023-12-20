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
