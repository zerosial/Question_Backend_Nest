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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { InquiryService } from './inquiry.service';
import {
  User as UserModel,
  Inquiry as InquiryModel,
  Answer as AnswerModel,
} from '@prisma/client';
import { CreateUserDto } from './dto/user.dto';
import {
  CreateInquiryDto,
  GetInquiriesByEmailDto,
  UpdateInquiryDto,
} from './dto/inquiry.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAnswerDto } from './dto/answer.dto';
import { AnswerService } from './answer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly inquiryService: InquiryService,
    private readonly answerService: AnswerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiTags('User API')
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

  @ApiTags('User API')
  @ApiOperation({ summary: '사용자 생성' })
  @ApiResponse({ status: 201, description: '사용자 생성됨.' })
  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    const existingUser = await this.userService.user({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new HttpException(
        '이미 존재하는 이메일입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.createUser(createUserDto);
  }

  @ApiTags('User API')
  @ApiOperation({ summary: '사용자 삭제' })
  @Delete('user/:email')
  async deleteUser(@Param('email') email: string): Promise<UserModel> {
    const existingUser = await this.userService.user({
      email,
    });
    if (!existingUser) {
      throw new HttpException(
        '메일이 존제하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.deleteUser({ email });
  }

  @ApiTags('Inquiry API')
  @ApiOperation({ summary: '문의 생성' })
  @ApiResponse({ status: 201, description: '문의 생성됨.' })
  @Post('inquiry')
  async createInquiry(
    @Body() createInquiryDto: CreateInquiryDto,
  ): Promise<InquiryModel> {
    return this.inquiryService.createInquiry(createInquiryDto);
  }

  @ApiTags('Inquiry API')
  @ApiOperation({ summary: '모든 문의 조회' })
  @Get('inquiry')
  async getAllInquiries(): Promise<InquiryModel[]> {
    return this.inquiryService.getAllInquiries();
  }

  @ApiTags('Inquiry API')
  @ApiOperation({ summary: '이메일 기반 문의 조회' })
  @Get('inquiries/user')
  async getInquiriesByUserEmail(
    @Query() getInquiriesByEmailDto: GetInquiriesByEmailDto,
  ): Promise<InquiryModel[]> {
    const existingUser = await this.userService.user({
      email: getInquiriesByEmailDto.email,
    });
    if (!existingUser) {
      throw new HttpException(
        '메일이 존제하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.inquiryService.getInquiriesByUserEmail(
      getInquiriesByEmailDto.email,
    );
  }

  @ApiTags('Inquiry API')
  @ApiOperation({ summary: '문의 업데이트' })
  @Put('inquiry/:id')
  async updateInquiry(
    @Param('id') id: string,
    @Body() updateData: UpdateInquiryDto,
  ): Promise<InquiryModel> {
    const numId = parseInt(id, 10);
    const existingInquiry = await this.inquiryService.findInquiryById(numId);
    if (!existingInquiry) {
      throw new HttpException(
        '해당 문의사항의 존재하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.inquiryService.updateInquiry(numId, updateData);
  }

  @ApiTags('Inquiry API')
  @ApiOperation({ summary: '문의 삭제' })
  @Delete('inquiry/:id')
  async deleteInquiry(@Param('id') id: string): Promise<InquiryModel> {
    const numId = parseInt(id, 10);
    const existingInquiry = await this.inquiryService.findInquiryById(numId);
    const inquiryWithAnswer = existingInquiry as InquiryModel & {
      answer: AnswerModel | null;
    };

    if (!inquiryWithAnswer) {
      throw new HttpException(
        '해당 문의사항이 존재하지 않습니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (inquiryWithAnswer.answer) {
      throw new HttpException(
        '연관된 답변이 있는 문의사항은 삭제할 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log('existingInquiry', existingInquiry);
    return this.inquiryService.deleteInquiry(numId);
  }

  @ApiTags('Answer API')
  @ApiOperation({ summary: '답변 생성' })
  @ApiResponse({ status: 201, description: '답변 생성됨.' })
  @Post('answer/:id')
  async createAnswer(
    @Param('id') id: string,
    @Body() createAnswerDto: CreateAnswerDto,
  ): Promise<AnswerModel> {
    const numId = parseInt(id, 10);
    const existingInquiry = await this.inquiryService.findInquiryById(numId);
    if (!existingInquiry) {
      throw new HttpException(
        '해당 문의사항의 존재하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.answerService.createAnswer(numId, createAnswerDto);
  }
}
