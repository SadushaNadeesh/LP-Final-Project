import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Results } from './results.entity';

@Injectable()
export class ResultsService {
    constructor(@InjectRepository(Results) private readonly resultRepo: Repository<Results>){}

    async showAll() {
        return await this.resultRepo.find();
      }

      async create(data: Results) {
        const results = this.resultRepo.create(data);
        await this.resultRepo.save(data);
        return results;
      }

      async findByCourse(course_id: number): Promise<Results> {
        return await this.resultRepo.findOne({
          where: {
            courseId: course_id,
          },
        });
      }

      async read(id: number) {
        return await this.resultRepo.findOne({ where: { id: id } });
      }

      async update(id: number, data: Partial<Results>) {
        await this.resultRepo.update({ id }, data);
        return await this.resultRepo.findOne({ id });
      }

      async destroy(id: number) {
        await this.resultRepo.delete({ id });
        return { deleted: true };
      }

}
