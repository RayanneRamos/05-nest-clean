import { QuestionAttachmentsRepository } from "src/domain/forum/application/repositories/question-attachments-repository";
import { QuestionAttachment } from "src/domain/forum/enterprise/entities/question-attachment";

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = [];

  async findManyByQuestionId(questionId: string) {
    const questionAttachment = this.items.filter(
      (item) => item.questionId.toString() === questionId
    );

    return questionAttachment;
  }

  async createMany(attachments: QuestionAttachment[]) {
    this.items.push(...attachments);
  }

  async deleteMany(attachments: QuestionAttachment[]) {
    const questionAttachments = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item));
    });

    this.items = questionAttachments;
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() !== questionId
    );

    this.items = questionAttachments;
  }
}
