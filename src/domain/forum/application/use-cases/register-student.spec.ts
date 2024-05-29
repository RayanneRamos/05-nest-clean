import { it, describe, expect } from "vitest";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { RegisterStudentUseCase } from "./register-student";
import { InMemoryStudentRepository } from "test/repositories/in-memory-students-repositoty";
import { FakeHasher } from "test/cryptography/fake-hasher";

let inMemoryStudentRepository: InMemoryStudentRepository;
let fakeHasher: FakeHasher;

let sut: RegisterStudentUseCase;

describe("Register Student", () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterStudentUseCase(inMemoryStudentRepository, fakeHasher);
  });

  it("should be able to regiter a new student", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "jhondoe@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      student: inMemoryStudentRepository.items[0],
    });
  });

  it("should hash student password upon registration", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "jhondoe@example.com",
      password: "123456",
    });

    const hashedPassword = fakeHasher.hash("123456");

    expect(result.isRight()).toBe(true);
    expect(inMemoryStudentRepository.items[0].password).toEqual(hashedPassword);
  });
});
