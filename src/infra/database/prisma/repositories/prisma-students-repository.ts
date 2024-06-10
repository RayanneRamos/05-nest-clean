import { Injectable } from "@nestjs/common";
import { StudentsRepository } from "src/domain/forum/application/repositories/Students-repository";
import { PrismaService } from "../prisma.service";
import { Student } from "src/domain/forum/enterprise/entities/student";
import { PrismaStudentMapper } from "../mappers/prisma-student-mapper";

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!student) {
      return null;
    }

    return PrismaStudentMapper.toDomain(student);
  }

  async create(student: Student) {
    const data = PrismaStudentMapper.toPrisma(student);

    await this.prisma.user.create({
      data,
    });
  }
}
