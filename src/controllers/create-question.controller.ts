import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";

const createQuestionBodySchema = z.object({});

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller("/questions")
@UseGuards(AuthGuard("jwt"))
export class CreateQuestionController {
  constructor() {}

  @Post()
  async handle() {
    return "ok";
  }
}
