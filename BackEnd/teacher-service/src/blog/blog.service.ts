import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
    constructor(@InjectRepository(Blog) private readonly blogRepo: Repository<Blog>){}

    async showAll() {
        return await this.blogRepo.find();
      }

      async create(data: Blog) {
        const blog = this.blogRepo.create(data);
        await this.blogRepo.save(data);
        return blog;
      }

      async findByCourse(blogId: number): Promise<Blog> {
        return await this.blogRepo.findOne({
          where: {
            id: blogId,
          },
        });
      }

      async read(id: number) {
        return await this.blogRepo.findOne({ where: { id: id } });
      }

      async readname(name: string) {
        return await this.blogRepo.findOne({ where: { name: name } });
      }

      async update(id: number, data: Partial<Blog>) {
        await this.blogRepo.update({ id }, data);
        return await this.blogRepo.findOne({ id });
      }

      async destroy(id: number) {
        await this.blogRepo.delete({ id });
        return { deleted: true };
      }

      public async setCover(postid: number, coverUrl: string){
        console.log(coverUrl);
        this.blogRepo.update(postid, {cover: coverUrl});
    }
}
