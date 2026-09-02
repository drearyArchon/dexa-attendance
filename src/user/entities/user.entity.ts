import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    EMPLOYEE = "employee"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: string;

    @Column("varchar", { 
        length: 255,
        unique: true
    })
    username: string;

    @Column("varchar", { length: 255})
    password: string;

    @Column({ 
        type: "enum",
        enum: UserRole,
        default: UserRole.EMPLOYEE 
    })
    role: UserRole;
}
