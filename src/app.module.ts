import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { SlotModule } from './slot/slot.module';
import { VenueModule } from './venue/venue.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    EmployeeModule, VenueModule, SlotModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGOURI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
