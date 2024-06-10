import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common";
import { ZodValidationPipe } from "src/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { AuthenticateStudentUseCase } from "src/domain/forum/application/use-cases/authenticate-student";
import { WrongCredentialsError } from "src/domain/forum/application/use-cases/errors/wrong-credentials-error";
import { Public } from "src/infra/auth/public";

const authenticationBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticationBodySchema = z.infer<typeof authenticationBodySchema>;

@Controller("/sessions")
@Public()
export class AutheticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticationBodySchema))
  async handle(@Body() body: AuthenticationBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateStudent.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { accessToken } = result.value;

    return {
      access_token: accessToken,
    };
  }
}
