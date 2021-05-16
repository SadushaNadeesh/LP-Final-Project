import { Content } from "src/content/content.entity";
import {BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('subject')
export class Subject extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teacher_id: number;

    @Column()
    name: string;

    @Column()
    grade: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @OneToMany(() => Content, content => content.subject)
    contents: Content[];

}

export enum status{
    ACTIVE = 'ACTIVE',
    PENDING = 'PENDING',
    SUSPENDED = 'SUSPENDED'
}