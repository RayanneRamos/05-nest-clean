import { DomainEvents } from "src/core/events/domain-events";
import { StudentsRepository } from "src/domain/forum/application/repositories/students-repository";
import { Student } from "src/domain/forum/enterprise/entities/student";

export class InMemoryStudentRepository implements StudentsRepository {
  public items: Student[] = [];

  async findByEmail(email: string) {
    const Student = this.items.find((item) => item.email === email);

    if (!Student) {
      return null;
    }

    return Student;
  }

  async create(Student: Student) {
    this.items.push(Student);

    DomainEvents.dispatchEventsForAggregate(Student.id);
  }
}
