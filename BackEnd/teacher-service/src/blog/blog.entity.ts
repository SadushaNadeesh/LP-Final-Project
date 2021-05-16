import {BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('blog')
export class Blog extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teacher_id: number;

    @Column()
    name: string;

    @Column()
    content: string;

    @Column()
    cover: string;

    @Column()
    date: Date;

    @Column()
    status: string;

}

export enum status{
    ACTIVE = 'ACTIVE',
    PENDING = 'PENDING',
    SUSPENDED = 'SUSPENDED'
}