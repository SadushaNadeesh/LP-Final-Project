import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectService {
    constructor(@InjectRepository(Subject) private readonly subjectRepo: Repository<Subject>){}

    async showAll() {
        return await this.subjectRepo.find();
      }

      async create(data: Subject) {
        const subject = this.subjectRepo.create(data);
        await this.subjectRepo.save(data);
        return subject;
      }

      async findByTeacher(teacher_id: number): Promise<Subject> {
        return await this.subjectRepo.findOne({
          where: {
            teacher_id: teacher_id,
          },
        });
      }

      async getSubjectById(id: number){
        return await this.subjectRepo.findOne(id, {relations: ['contents']});
      }

      async read(id: number) {
        return await this.subjectRepo.findOne({ where: { id: id } });
      }

      async update(id: number, data: Partial<Subject>) {
        await this.subjectRepo.update({ id }, data);
        return await this.subjectRepo.findOne({ id });
      }

      async destroy(id: number) {
        await this.subjectRepo.delete({ id });
        return { deleted: true };
      }
}
