import { type } from "os";
import { Courses } from "src/courses/courses.entity";
import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('questions')
export class Questions extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @Column()
    option1: string;

    @Column()
    option2: string;

    @Column()
    option3: string;

    @Column()
    option4: string;

    @Column()
    answer: string;

    @Column()
    marks: number;

    @ManyToOne(() => Courses, course => course.questions)
    course: Courses;


}

export enum status{
    ACTIVE = 'ACTIVE',
    PENDING = 'PENDING',
    SUSPENDED = 'SUSPENDED'
}