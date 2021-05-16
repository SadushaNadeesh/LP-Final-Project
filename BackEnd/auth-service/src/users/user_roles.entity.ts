import { type } from "os";
import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import { User } from "./user.entity";

@Entity('user_roles')
export class UserRoles {
    @PrimaryColumn()
    roleId: number;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.userroles)
    user: User;
    
}