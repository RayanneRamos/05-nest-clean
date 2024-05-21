import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const authenticationBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticationBodySchema = z.infer<typeof authenticationBodySchema>;

@Controller("/sessions")
export class AutheticateControler {
  constructor(private jwt: JwtService, private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticationBodySchema))
  async handle(@Body() body: AuthenticationBodySchema) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException("User credentials do not match.");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("User credeentials do nor match.");
    }

    const accessToken = this.jwt.sign({ sub: user.id });

    const token = this.jwt.sign({ sub: "user-id" });

    return {
      access_token: accessToken,
    };
  }
}
