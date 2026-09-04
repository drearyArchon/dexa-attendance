import { Column, CreateDateColumn, Entity, ForeignKey, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity.js";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    image_id: string;

    @CreateDateColumn({ utc: true })
    timestamp: Date;

    // TODO: Make this non-nullable in PRD
    @Column({ nullable: true })
    filename: string;

    @ManyToOne((type) => User)
    user: User;
}
