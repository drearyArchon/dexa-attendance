import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { ImageModule } from './image/image.module.js';
import { AttendanceModule } from './attendance/attendance.module.js';
import { UserModule } from './user/user.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity.js';
import { Image } from './image/entities/image.entity.js';
import { ConfigModule } from '@nestjs/config';
import { Attendance } from './attendance/entities/attendance.model.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'dexa-attendance',
    }),
    ConfigModule.forRoot(),
    UserModule,
    ImageModule,
    AttendanceModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Image, Attendance],
      timezone: 'local',
      dateStrings: false,
      synchronize: true // TODO: Set false on PRD
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
