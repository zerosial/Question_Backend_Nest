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
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

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

  // User API
  @ApiOperation({ summary: '모든 사용자 조회' })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: '건너뛸 레코드 수',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: '가져올 레코드 수',
  })
  @Get('users')
  async getUsers(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<UserModel[]> {
    return this.userService.users({ skip, take });
  }

  @ApiOperation({ summary: '사용자 생성' })
  @ApiResponse({ status: 201, description: '사용자 생성됨.' })
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

  @ApiOperation({ summary: '사용자 삭제' })
  @Delete('user/:email')
  async deleteUser(@Param('email') email: string): Promise<UserModel> {
    return this.userService.deleteUser({ email });
  }

  // Inquiry API
  @ApiOperation({ summary: '문의 생성' })
  @ApiResponse({ status: 201, description: '문의 생성됨.' })
  @Post('inquiry')
  async createInquiry(
    @Body() createInquiryDto: CreateInquiryDto,
  ): Promise<InquiryModel> {
    return this.inquiryService.createInquiry(createInquiryDto);
  }

  @ApiOperation({ summary: '모든 문의 조회' })
  @Get('inquiry')
  async getAllInquiries(): Promise<InquiryModel[]> {
    return this.inquiryService.getAllInquiries();
  }

  @ApiOperation({ summary: '이메일 기반 문의 조회' })
  @Get('inquiries/user')
  async getInquiriesByUserEmail(
    @Query() getInquiriesByEmailDto: GetInquiriesByEmailDto,
  ): Promise<InquiryModel[]> {
    return this.inquiryService.getInquiriesByUserEmail(
      getInquiriesByEmailDto.email,
    );
  }

  @ApiOperation({ summary: '문의 업데이트' })
  @Put('inquiry/:id')
  async updateInquiry(
    @Param('id') id: string,
    @Body() updateData: any,
  ): Promise<InquiryModel> {
    return this.inquiryService.updateInquiry(parseInt(id, 10), updateData);
  }

  @ApiOperation({ summary: '문의 삭제' })
  @Delete('inquiry')
  async deleteInquiry(
    @Body() deleteInquiryDto: DeleteInquiryDto,
  ): Promise<InquiryModel> {
    return this.inquiryService.deleteInquiry(deleteInquiryDto);
  }
}
