import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { SlotController } from './slot.controller';
import { SlotService } from './slot.service';
import { slotSchema } from './slot.model';
import { employeeSchema } from 'src/employee/employee.model';
import { venueSchema } from 'src/venue/venue.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Slot', schema: slotSchema }]),
    MongooseModule.forFeature([{ name: 'Employee', schema: employeeSchema }]),
    MongooseModule.forFeature([{ name: 'Venue', schema: venueSchema }])
    ],
    controllers: [SlotController],
    providers: [SlotService],
})
export class SlotModule { }
