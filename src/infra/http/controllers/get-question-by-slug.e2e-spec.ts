import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/infra/app.module";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import request from "supertest";

describe("Get question by slug (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  it("[GET] /questions/:slug", async () => {
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
      },
    });

    const accessToken = jwt.sign({ sub: user.id });

    await prisma.question.create({
      data: {
        title: "Question 01",
        slug: "question-01",
        content: "Question content",
        authorId: user.id,
      },
    });

    const response = await request(app.getHttpServer())
      .post(`/questions/question-01`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "New question",
        content: "Question content",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      question: expect.objectContaining({ title: "Question 01" }),
    });
  });
});
