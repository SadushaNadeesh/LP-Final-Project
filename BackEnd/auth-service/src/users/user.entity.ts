import { type } from "os";
import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Roles } from "./roles.entity";
import { UserRoles } from "./user_roles.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    roles: string;

    @OneToMany(type => UserRoles, userroles => userroles.user)
    userroles: UserRoles[];
}

export enum user_roles{
    USER = 'USER',
    MODERATOR = 'MODERATOR',
    ADMIN = 'ADMIN'
}