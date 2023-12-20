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

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly inquiryService: InquiryService,
  ) {}

  // User 관련 라우트
  @Get('user/:email')
  async getUser(@Param('email') email: string): Promise<UserModel | null> {
    return this.userService.user({ email });
  }

  @Get('users')
  async getUsers(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<UserModel[]> {
    return this.userService.users({ skip, take });
  }

  @Post('user')
  async createUser(@Body() userData: { email: string }): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('user/:email')
  async updateUser(
    @Param('email') email: string,
    @Body() updateData: { email: string },
  ): Promise<UserModel> {
    return this.userService.updateUser({ where: { email }, data: updateData });
  }

  @Delete('user/:email')
  async deleteUser(@Param('email') email: string): Promise<UserModel> {
    return this.userService.deleteUser({ email });
  }

  // Inquiry 관련 라우트
  @Post('inquiry')
  async createInquiry(@Body() inquiryData: any): Promise<InquiryModel> {
    return this.inquiryService.createInquiry(inquiryData);
  }

  @Get('inquiry/:id')
  async getInquiryById(@Param('id') id: number): Promise<InquiryModel | null> {
    return this.inquiryService.getInquiryById(id);
  }

  @Get('inquiries/user/:email')
  async getInquiriesByUserEmail(
    @Param('email') email: string,
  ): Promise<InquiryModel[]> {
    return this.inquiryService.getInquiriesByUserEmail(email);
  }

  @Put('inquiry/:id')
  async updateInquiry(
    @Param('id') id: number,
    @Body() updateData: any,
  ): Promise<InquiryModel> {
    return this.inquiryService.updateInquiry(id, updateData);
  }

  @Delete('inquiry/:id')
  async deleteInquiry(@Param('id') id: number): Promise<InquiryModel> {
    return this.inquiryService.deleteInquiry(id);
  }

  // 여기에 필요한 추가 라우트를 구현할 수 있습니다.
}
