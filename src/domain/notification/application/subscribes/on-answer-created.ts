import { EventHandler } from "src/core/events/event-handler";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { QuestionsRepository } from "src/domain/forum/application/repositories/questions-repository";
import { DomainEvents } from "src/core/events/domain-events";
import { AnswerCreatedEvent } from "src/domain/forum/enterprise/events/answer-created-event";

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name
    );
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionRepository.findById(
      answer.questionId.toString()
    );

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em "${question.title
          .substring(0, 40)
          .concat("...")}"`,
        content: answer.excerpt,
      });
    }
  }
}
