import { User as PrismaUser, Prisma } from "@prisma/client";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Question } from "src/domain/forum/enterprise/entities/question";
import { Student } from "src/domain/forum/enterprise/entities/student";
import { Slug } from "src/domain/forum/enterprise/entities/value-objects/slug";

export class PrismaStudentMapper {
  static toDomain(raw: PrismaUser): Student {
    return Student.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    };
  }
}
