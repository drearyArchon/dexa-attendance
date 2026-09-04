import { Injectable } from '@nestjs/common';
import { Attendance } from './entities/attendance.model.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        private attendanceRepository: Repository<Attendance>
    ) {}

    async getUserStatus(user_id: string) {
        return await this.attendanceRepository
            .createQueryBuilder('attendance')
            .where('userUserId = :id', { id: user_id})
            .orderBy("timestamp", "DESC")
            .getOne();
    }

    async getAttendanceRecord(user_id: string, start: Date, end: Date) {
        return await this.attendanceRepository
            .createQueryBuilder('attendance')
            .where('userUserId = :id', { id: user_id})
            .andWhere('timestamp BETWEEN :start AND :end', { start: start, end: end })
            .orderBy("timestamp", "DESC")
            .getOne();
    }

    async addAttendanceRecord() {
        
    }
}
