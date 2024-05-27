import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { AutheticateController } from "./controllers/authenticate.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller";
import { PrismaService } from "../database/prisma/prisma.service";
import { DatabaseModule } from "../database/database.module";
import { PrismaAnswerAttachmentsRepository } from "../database/prisma/repositories/prisma-answer-attachments-repository";
import { PrismaAnswerCommentsRepository } from "../database/prisma/repositories/prisma-answer-comments-repository";
import { PrismaAnswerRepository } from "../database/prisma/repositories/prisma-answer-repository";
import { PrismaQuestionsRepository } from "../database/prisma/repositories/prisma-question-repository";
import { PrismaQuestionAttachmentsRepository } from "../database/prisma/repositories/prisma-question-attachments-repository";
import { PrismaQuestionCommentsRepository } from "../database/prisma/repositories/prisma-question-comments-repository";
import { CreateQuestionUseCase } from "src/domain/forum/application/use-cases/create-question";

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AutheticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  exports: [
    PrismaService,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerRepository,
    PrismaQuestionsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
  ],
  providers: [CreateQuestionUseCase],
})
export class HttpModule {}
