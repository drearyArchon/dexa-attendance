import { Injectable } from '@nestjs/common';
import { Attendance } from './entities/attendance.model.js';

@Injectable()
export class AttendanceService {
    private attendanceRecord: Attendance[] = [];

    getUserAttendance(user_id: string, start: Date, end: Date): Attendance[] {
        // fetch from database given a range of one month
        return this.attendanceRecord;
    }

    getClockIn(user_id: string, date: Date): Date {
        // fetch from Database
        return new Date();
    }

    getClockOut(user_id: string, date: Date): Date {
        // fetch from database
        return new Date();
    }

    createDailyRecord(user_id: string, current_date: Date): Attendance {
        // Would you like to end the day?
        const clock_in: Date = this.getClockIn(user_id, current_date);
        const clock_out: Date = this.getClockOut(user_id, current_date);

        const attendance: Attendance = {
            user_id: user_id,
            date: current_date,
            in: clock_in,
            out: clock_out,
            total_hours: clock_out.getMinutes() - clock_in.getMinutes()
        }

        return attendance;
    }
}
