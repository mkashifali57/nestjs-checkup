import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Venue } from './venue.model';
import { Model } from 'mongoose';


@Injectable()
export class VenueService {

    constructor(@InjectModel('Venue') private readonly venueModel: Model<Venue>) { }

    async addVenue(name: string, location: string) {
        try {
            const newVenue = new this.venueModel({
                name: name,
                location: location,
            })
            const result = await newVenue.save();
            return result;
        } catch (err) { return err }
    }

    async getVenue() {
        try {

            console.log(`getVenue`);
            const employee = await this.venueModel.find().exec();
            return employee.map(prod => ({
                id: prod.id,
                name: prod.name,
                location: prod.location,
            }));
        } catch (e) { return e; }
    }

    async getSingleVenue(venueId: string) {
        try {
            const venue = await this.venueModel.findById(venueId);
            if (!venue)
                throw new NotFoundException('Venue not found');
            return venue
        } catch (e) { return e }
    }

    async updateVenue(venueId: string, name: string, location: string) {
        try {
            const updatedVenue = await this.venueModel.findByIdAndUpdate(venueId, { name, location }, { new: true })
            if (!updatedVenue)
                throw new NotFoundException('Not found')
            return updatedVenue
        } catch (e) {
            return e
        }
    }

    async deleteVenue(venueId: string) {
        try {
            const deleteVenue = await this.venueModel.findByIdAndDelete(venueId)
            if (!deleteVenue)
                throw new NotFoundException('Venue not found')
            return deleteVenue
        } catch (e) { return e }

    }
}
