import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Inquiry, Prisma } from '@prisma/client';

@Injectable()
export class InquiryService {
  constructor(private prisma: PrismaService) {}

  async createInquiry(data: Prisma.InquiryCreateInput): Promise<Inquiry> {
    return this.prisma.inquiry.create({
      data,
    });
  }

  async getInquiryById(id: number): Promise<Inquiry | null> {
    return this.prisma.inquiry.findUnique({
      where: { id },
    });
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

  async deleteInquiry(id: number): Promise<Inquiry> {
    return this.prisma.inquiry.delete({
      where: { id },
    });
  }

  // 여기에 추가적인 1:1 문의 관련 메소드를 구현할 수 있습니다.
}
