import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity.js";
import { Image } from "../../image/entities/image.entity.js";

export enum AttendanceStatus {
    IN = "in",
    OUT = "out"
}

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    attendance_id: string;

    @Column()
    date: Date;

    @Column()
    timestamp: Date;

    @Column({
        type: "enum",
        enum: AttendanceStatus,
    })
    status: AttendanceStatus;

    @ManyToOne(() => User)
    user: User;

    @OneToOne(() => Image)
    @JoinColumn()
    image: Image;
}
