import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from 'src/questions/questions.entity';
import { Repository } from 'typeorm';
import { Courses } from './courses.entity';

@Injectable()
export class CoursesService {
    constructor(@InjectRepository(Courses) private readonly courseRepo: Repository<Courses>){}

    async showAll() {
        return await this.courseRepo.find();
      }

      async create(data: Courses) {
        const course = this.courseRepo.create(data);
        await this.courseRepo.save(data);
        return course;
      }

      async findByTeacher(teacher_id: number): Promise<Courses> {
        return await this.courseRepo.findOne({
          where: {
            teacher_id: teacher_id,
          },
        });
      }

      async getCourseById(id: number){
        return await this.courseRepo.findOne(id, {relations: ['questions']});
      }

      // async getCourseAnswerById(id: number){
      //   return await this.questionRepo.findOne(id);
        
      // }

      async read(id: number) {
        return await this.courseRepo.findOne({ where: { id: id } });
      }

      async update(id: number, data: Partial<Courses>) {
        await this.courseRepo.update({ id }, data);
        return await this.courseRepo.findOne({ id });
      }

      async destroy(id: number) {
        await this.courseRepo.delete({ id });
        return { deleted: true };
      }

}
