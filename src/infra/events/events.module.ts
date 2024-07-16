import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { OnAnswerCreated } from "src/domain/notification/application/subscribes/on-answer-created";
import { OnQuestionBestAnswerChosen } from "src/domain/notification/application/subscribes/on-question-best-answer-chosen";
import { SendNotificationUseCase } from "src/domain/notification/application/use-cases/send-notification";

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosen,
    SendNotificationUseCase,
  ],
})
export class EventsModule {}
