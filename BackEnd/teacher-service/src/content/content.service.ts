import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/subject/subject.entity';
import { Repository } from 'typeorm';
import { Content } from './content.entity';
import { createContentDTO } from './create-content.dto';

@Injectable()
export class ContentService {
    constructor(@InjectRepository(Content) private readonly contentRepo: Repository<Content>) { }

    async showAll() {
        return await this.contentRepo.find();
    }

    async create(contentData: createContentDTO, subject: Subject): Promise<Content> {

        const newContent = await this.contentRepo.save(
            contentData
        );
        subject.contents = [...subject.contents, newContent];
        await subject.save();
        return newContent;
    }

    async findByEmail(email: string): Promise<Content> {
        return await this.contentRepo.findOne({
            where: {
                email: email,
            },
        });
    }

    async read(id: number) {
        return await this.contentRepo.findOne({ where: { id: id } });
    }

    async update(id: number, data: Partial<Content>) {
        await this.contentRepo.update({ id }, data);
        return await this.contentRepo.findOne({ id });
    }

    async destroy(id: number) {
        await this.contentRepo.delete({ id });
        return { deleted: true };
    }

}
