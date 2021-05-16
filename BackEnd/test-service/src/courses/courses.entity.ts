import { type } from "os";
import { Questions } from "src/questions/questions.entity";
import {BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('courses')
export class Courses extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teacher_id: number;

    @Column()
    name: string;

    @Column()
    grade: string;

    @Column()
    marks: number;

    @Column()
    status: string;

    @OneToMany(() => Questions, questions => questions.course)
    questions: Questions[];

}

export enum status{
    ACTIVE = 'ACTIVE',
    PENDING = 'PENDING',
    SUSPENDED = 'SUSPENDED'
}