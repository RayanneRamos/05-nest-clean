import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { ZodValidationPipe } from "src/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { FetchRecentQuestionsUseCase } from "src/domain/forum/application/use-cases/fetch-recent-questions";
import { QuestionPresenter } from "../presenters/question-presenter";

const pageQueryParamSchema = z.object({
  page: z
    .string()
    .optional()
    .default("1")
    .transform((val) => Number(val))
    .pipe(z.number().min(1)),
});

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = {
  page: number;
};

@Controller("/questions")
export class FetchRecentQuestionsController {
  constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase) {}

  @Get()
  async handle(
    @Query("page", queryValidationPipe) { page }: PageQueryParamSchema
  ) {
    const result = await this.fetchRecentQuestions.execute({
      page,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const questions = result.value.questions;

    console.log(questions);

    return { questions: questions.map(QuestionPresenter.toHTTP) };
  }
}
