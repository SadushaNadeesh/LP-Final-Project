import { Subject } from "src/subject/subject.entity";
import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('content')
export class Content extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    content: string;

    @Column()
    materials: string;

    @Column()
    reference: string;

    @ManyToOne(() => Subject, subject => subject.contents)
    subject: Subject;


}

export enum status{
    ACTIVE = 'ACTIVE',
    PENDING = 'PENDING',
    SUSPENDED = 'SUSPENDED'
}