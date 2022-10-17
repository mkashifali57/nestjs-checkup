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
    async addVenue(
        @Body('name') name: string,
        @Body('location') location: string,
    ) {
        try {
            const venue = await this.productsService.addVenue(
                name,
                location,

            );
            return venue;
        } catch (err) {
            return err
        }
    }

    @Get()
    async getAllVenues(): Promise<Venue[]> {
        try {
            const venues = await this.productsService.getVenue();
            return venues as Venue[]
        } catch (err) { return err; }
    }

    @Get(':id')
    async getVenue(@Param('id') venueId: string) {
        try {
            const venue = await this.productsService.getSingleVenue(venueId);
            return venue
        } catch (err) { return err; }
    }

    @Patch(':id')
    async updateVenue(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('location') location: string,
    ) {
        try {
            const updatedVenue = await this.productsService.updateVenue(id, name, location,);
            return updatedVenue;
        } catch (err) { return err }
    }

    @Delete(':id')
    async removeVenue(@Param('id') id: string) {
        try {
            const deletedVenue = await this.productsService.deleteVenue(id);
            return deletedVenue;
        } catch (err) {
            return err
        }
    }
}
