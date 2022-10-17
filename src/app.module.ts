import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { VenueModule } from './venue/venue.module';

@Module({
  imports: [EmployeeModule, VenueModule, MongooseModule.forRoot('mongodb+srv://kashif-ali:kashifalidev57@cluster0.aaglpsm.mongodb.net/test'),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
