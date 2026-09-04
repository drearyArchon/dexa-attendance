import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller.js';
import { AttendanceService } from './attendance.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.model.js';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
  controllers: [AttendanceController],
  providers: [AttendanceService]
})
export class AttendanceModule {}
