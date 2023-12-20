import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Inquiry, Prisma } from '@prisma/client';
import { CreateInquiryDto, DeleteInquiryDto } from './dto/inquiry.dto';

@Injectable()
export class InquiryService {
  constructor(private prisma: PrismaService) {}

  async createInquiry(createInquiryDto: CreateInquiryDto): Promise<Inquiry> {
    return this.prisma.inquiry.create({
      data: {
        title: createInquiryDto.title,
        content: createInquiryDto.content,
        questionType: {
          connect: { id: createInquiryDto.questionTypeId },
        },
        user: {
          connect: { email: createInquiryDto.userEmail },
        },
      },
    });
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return this.prisma.inquiry.findMany();
  }

  async getInquiriesByUserEmail(email: string): Promise<Inquiry[]> {
    return this.prisma.inquiry.findMany({
      where: { userEmail: email },
    });
  }

  async updateInquiry(
    id: number,
    data: Prisma.InquiryUpdateInput,
  ): Promise<Inquiry> {
    return this.prisma.inquiry.update({
      where: { id },
      data,
    });
  }

  async deleteInquiry(deleteInquiryDto: DeleteInquiryDto): Promise<Inquiry> {
    return this.prisma.inquiry.delete({
      where: { id: deleteInquiryDto.id },
    });
  }
}
