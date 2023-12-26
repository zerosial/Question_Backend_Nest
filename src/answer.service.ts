import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Answer } from '@prisma/client';
import { CreateAnswerDto } from './dto/answer.dto';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async createAnswer(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.prisma.answer.create({
      data: {
        title: createAnswerDto.title,
        content: createAnswerDto.content,
        isAnswer: true,
        answeredDate: new Date(),
        inquiry: {
          connect: { id: createAnswerDto.inquiryId },
        },
      },
    });
  }
}
