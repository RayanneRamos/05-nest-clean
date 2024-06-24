import { Attachment as PrismaAttachmnent } from "@prisma/client";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { QuestionAttachment } from "src/domain/forum/enterprise/entities/question-attachment";
import { Slug } from "src/domain/forum/enterprise/entities/value-objects/slug";

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachmnent): QuestionAttachment {
    if (!raw.questionId) {
      throw new Error("Invalid attachment type.");
    }

    return QuestionAttachment.create(
      {
        questionId: new UniqueEntityID(raw.questionId),
        attachmentId: new UniqueEntityID(raw.id),
      },
      new UniqueEntityID(raw.id)
    );
  }
}
