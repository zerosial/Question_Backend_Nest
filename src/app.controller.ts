import { AppService } from './app.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { InquiryService } from './inquiry.service';
import { User as UserModel, Inquiry as InquiryModel } from '@prisma/client';
import { CreateUserDto } from './dto/user.dto';
import {
  CreateInquiryDto,
  DeleteInquiryDto,
  GetInquiriesByEmailDto,
} from './dto/inquiry.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly inquiryService: InquiryService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // User 관련 라우트
  @Get('users')
  async getUsers(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<UserModel[]> {
    return this.userService.users({ skip, take });
  }

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    const existingUser = await this.userService.user({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new Error('이미 존재하는 이메일입니다.');
    }
    return this.userService.createUser(createUserDto);
  }

  @Delete('user/:email')
  async deleteUser(@Param('email') email: string): Promise<UserModel> {
    return this.userService.deleteUser({ email });
  }

  // Inquiry 관련 라우트
  @Post('inquiry')
  async createInquiry(
    @Body() createInquiryDto: CreateInquiryDto,
  ): Promise<InquiryModel> {
    return this.inquiryService.createInquiry(createInquiryDto);
  }

  @Get('inquiry')
  async getAllInquiries(): Promise<InquiryModel[]> {
    return this.inquiryService.getAllInquiries();
  }

  @Get('inquiries/user')
  async getInquiriesByUserEmail(
    @Query() getInquiriesByEmailDto: GetInquiriesByEmailDto,
  ): Promise<InquiryModel[]> {
    return this.inquiryService.getInquiriesByUserEmail(
      getInquiriesByEmailDto.email,
    );
  }

  @Put('inquiry/:id')
  async updateInquiry(
    @Param('id') id: string,
    @Body() updateData: any,
  ): Promise<InquiryModel> {
    return this.inquiryService.updateInquiry(parseInt(id, 10), updateData);
  }

  @Delete('inquiry')
  async deleteInquiry(
    @Body() deleteInquiryDto: DeleteInquiryDto,
  ): Promise<InquiryModel> {
    return this.inquiryService.deleteInquiry(deleteInquiryDto);
  }
}
