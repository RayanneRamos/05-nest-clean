import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/infra/app.module";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import request from "supertest";

describe("Fetch Recent Question (E2E)", () => {
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

  it("[POST] /questions", async () => {
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
      },
    });

    const accessToken = jwt.sign({ sub: user.id });

    await prisma.question.createMany({
      data: [
        {
          title: "Question 01",
          slug: "question-01",
          content: "Question content",
          authorId: user.id,
        },
        {
          title: "Question 02",
          slug: "question-02",
          content: "Question content",
          authorId: user.id,
        },
        {
          title: "Question 03",
          slug: "question-03",
          content: "Question content",
          authorId: user.id,
        },
        {
          title: "Question 04",
          slug: "question-04",
          content: "Question content",
          authorId: user.id,
        },
      ],
    });

    const response = await request(app.getHttpServer())
      .post("/questions")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "New question",
        content: "Question content",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: "Question 01" }),
        expect.objectContaining({ title: "Question 02" }),
        expect.objectContaining({ title: "Question 03" }),
        expect.objectContaining({ title: "Question 04" }),
      ],
    });
  });
});
