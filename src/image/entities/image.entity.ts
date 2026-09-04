import { Column, CreateDateColumn, Entity, ForeignKey, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity.js";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    image_id: string;

    @CreateDateColumn({ utc: true })
    timestamp: Date;

    @Column()
    url: string;

    @ManyToOne((type) => User)
    user: User;
}
