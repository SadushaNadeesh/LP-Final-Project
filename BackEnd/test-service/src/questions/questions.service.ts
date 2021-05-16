import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Courses } from 'src/courses/courses.entity';
import { CoursesService } from 'src/courses/courses.service';
import { Repository } from 'typeorm';
import { createquestionsDTO } from './create-question.dto';
import { Questions } from './questions.entity';

@Injectable()
export class QuestionsService {
  constructor(@InjectRepository(Questions) private questionRepo: Repository<Questions>) { }

  async showAll() {
    return await this.questionRepo.find();
  }

  async create(question: createquestionsDTO, course: Courses): Promise<Questions> {
    //const questions = this.questionRepo.create(question);

    const newQuestion = await this.questionRepo.save(
      question
    );
    course.questions = [...course.questions, newQuestion];
    await course.save();
    return newQuestion;
  }

  async findByEmail(email: string): Promise<Questions> {
    return await this.questionRepo.findOne({
      where: {
        email: email,
      },
    });
  }

  async read(id: number) {
    return await this.questionRepo.findOne({ where: { id: id } });
  }

  async update(id: number, data: Partial<Questions>) {
    await this.questionRepo.update({ id }, data);
    return await this.questionRepo.findOne({ id });
  }

  async destroy(id: number) {
    await this.questionRepo.delete({ id });
    return { deleted: true };
  }


}
