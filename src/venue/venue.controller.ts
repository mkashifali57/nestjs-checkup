import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import { Venue } from './venue.model';

import { VenueService } from './venue.service';

@Controller('venue')
export class VenueController {
    constructor(private readonly productsService: VenueService) { }

    @Post()
    addVenue(
        @Body('name') name: string,
        @Body('location') location: string,
    ) {
        const generatedId = this.productsService.addVenue(
            name,
            location,

        );
        return { id: generatedId };
    }

    @Get()
    async getAllVenues() {
        const employee = await this.productsService.getVenue();
        return employee as any
    }

    @Get(':id')
    getVenue(@Param('id') venueId: string) {
        return this.productsService.getSingleVenue(venueId);
    }

    @Patch(':id')
    updateVenue(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('location') location: string,
    ) {
        this.productsService.updateVenue(id, name, location,);
        return null;
    }

    @Delete(':id')
    removeVenue(@Param('id') id: string) {
        this.productsService.deleteVenue(id);
        return null;
    }
}
