import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepo: Repository<User>) {

    }

    async create(data: any): Promise<User> {
        return this.usersRepo.save(data)

    }

    async findOne(condition: any): Promise<User> {
        return this.usersRepo.findOne(condition);
    }

    async showAll() {
        return await this.usersRepo.find();
    }

    async read(id: number) {
        return await this.usersRepo.findOne({ where: { id: id } });
    }

    async update(id: number, data: Partial<User>) {
        await this.usersRepo.update({ id }, data);
        return await this.usersRepo.findOne({ id });
    }

}
