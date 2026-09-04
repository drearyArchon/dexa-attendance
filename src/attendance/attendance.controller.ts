import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Request } from '@nestjs/common';
import { AttendanceService } from './attendance.service.js';
import { Attendance } from './entities/attendance.model.js';
import { UserAccess } from '../auth/auth.constants.js';

@Controller('attendance')
export class AttendanceController {
    constructor(private attendanceService: AttendanceService) {}

    @UserAccess()
    @HttpCode(HttpStatus.OK)
    @Get()
    async getUserStatus(@Request() req: any) {
        // Returns last attendance status
        return await this.attendanceService.getUserStatus(req.user.user_id);
    }

    @UserAccess()
    @HttpCode(HttpStatus.CREATED)
    @Post()
    addRecord(
        @Body('user_id') user_id: string, 
        @Body('date') date: Date) {
            // insert into Images
    }

    @UserAccess()
    @HttpCode(HttpStatus.OK)
    @Get('/record')
    async getAttendanceRecord(@Request() req: any, @Query('start') start: Date, @Query('end') end: Date) {
        return this.attendanceService.getAttendanceRecord(req.user.user_id, start, end);
    }

    @HttpCode(HttpStatus.OK)
    @Get(':user_id')
    async getUserRecord(@Param() user_id: string, @Query('start') start: Date, @Query('end') end: Date) {
        return this.attendanceService.getAttendanceRecord(user_id, start, end);
    }
}
