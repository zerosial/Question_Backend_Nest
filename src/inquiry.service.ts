import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Inquiry, Prisma } from '@prisma/client';
import { CreateInquiryDto } from './dto/inquiry.dto';

@Injectable()
export class InquiryService {
  constructor(private prisma: PrismaService) {}

  async createInquiry(createInquiryDto: CreateInquiryDto): Promise<Inquiry> {
    return this.prisma.inquiry.create({
      data: {
        title: createInquiryDto.title,
        content: createInquiryDto.content,
        questionCategory: createInquiryDto.questionCategory,
        questionDetail: createInquiryDto.questionDetail,
        user: {
          connect: { email: createInquiryDto.userEmail },
        },
      },
    });
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return this.prisma.inquiry.findMany({
      include: {
        answer: {
          select: {
            id: true,
            isAnswer: true,
            title: true,
            content: true,
            answeredDate: true,
          },
        },
      },
      orderBy: {
        registeredDate: 'asc',
      },
    });
  }

  async getInquiriesByUserEmail(email: string): Promise<Inquiry[]> {
    return this.prisma.inquiry.findMany({
      where: {
        user: {
          email: email,
        },
      },
      include: {
        answer: {
          select: {
            isAnswer: true,
            title: true,
            content: true,
            answeredDate: true,
          },
        },
      },
      orderBy: {
        registeredDate: 'asc',
      },
    });
  }

  async updateInquiry(
    inquiryId: number,
    data: Prisma.InquiryUpdateInput,
  ): Promise<Inquiry> {
    return this.prisma.inquiry.update({
      where: { id: inquiryId },
      data,
    });
  }

  async deleteInquiry(inquiryId: number): Promise<Inquiry> {
    return this.prisma.inquiry.delete({
      where: { id: inquiryId },
    });
  }

  async findInquiryById(id: number): Promise<Inquiry | null> {
    return this.prisma.inquiry.findUnique({
      where: { id },
      include: {
        answer: {
          select: {
            isAnswer: true,
            title: true,
            content: true,
            answeredDate: true,
          },
        },
      },
    });
  }
}
