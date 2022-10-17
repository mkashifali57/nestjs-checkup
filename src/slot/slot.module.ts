import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { SlotController } from './slot.controller';
import { SlotService } from './slot.service';
import { slotSchema } from './slot.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Slot', schema: slotSchema }])],
    controllers: [SlotController],
    providers: [SlotService],
})
export class EmployeeModule { }
