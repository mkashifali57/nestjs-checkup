import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { VenueController } from './venue.controller';
import { VenueService } from './venue.service';
import { venueSchema } from './venue.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Venue', schema: venueSchema }])],
    controllers: [VenueController],
    providers: [VenueService],
})
export class VenueModule { }
