import { Attachment as PrismaAttachmnent } from "@prisma/client";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { AnswerAttachment } from "src/domain/forum/enterprise/entities/answer-attachment";
import { Slug } from "src/domain/forum/enterprise/entities/value-objects/slug";

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttachmnent): AnswerAttachment {
    if (!raw.answerId) {
      throw new Error("Invalid attachment type.");
    }

    return AnswerAttachment.create(
      {
        answerId: new UniqueEntityID(raw.answerId),
        attachmentId: new UniqueEntityID(raw.id),
      },
      new UniqueEntityID(raw.id)
    );
  }
}
