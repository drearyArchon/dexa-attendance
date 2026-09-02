import { Body, Controller, Get, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service.js';
import { Attendance } from './entities/attendance.model.js';

@Controller('attendance')
export class AttendanceController {
    constructor(private attendanceService: AttendanceService) {}

    @Get()
    getMonthlyAttendance(user_id: string, start: Date, end: Date): Attendance[] {
        return this.attendanceService.getUserAttendance(user_id, start, end);
    }

    @Post()
    addRecord(
        @Body('user_id') user_id: string, 
        @Body ('date') date: Date) {
            // insert into Images
    }

    @Post()
    finishDay(
        @Body('user_id') user_id: string, 
        @Body ('date') date: Date) {
            // insert into Images
            this.attendanceService.createDailyRecord(user_id, date);
    }
}
