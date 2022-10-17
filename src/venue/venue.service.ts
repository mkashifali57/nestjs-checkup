import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Venue } from './venue.model';
import { Model } from 'mongoose';


@Injectable()
export class VenueService {
    private employee: Venue[] = [];

    constructor(@InjectModel('Venue') private readonly venueModel: Model<Venue>) { }

    async addVenue(name: string, location: string) {

        const newVenue = new this.venueModel({
            name: name,
            location: location,
        })
        const result = await newVenue.save();
        console.log(result);
        return result;
    }

    async getVenue() {
        console.log(`getVenue`);
        const employee = await this.venueModel.find().exec();
        return employee.map(prod => ({
            id: prod.id,
            name: prod.name,
            location: prod.location,
        }));
    }

    getSingleVenue(venueId: string) {
        const product = this.findProduct(venueId)[0];
        return { ...product };
    }

    updateVenue(productId: string, name: string, location: string) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = { ...product };
        if (name) {
            updatedProduct.name = name;
        }

        if (location) {
            updatedProduct.location = location;
        }
        //  this.products[index] = updatedProduct;
    }

    deleteVenue(prodId: string) {
        const index = this.findProduct(prodId)[1];
        this.employee.splice(index, 1);
    }

    private findProduct(id: string): [Venue, number] {
        const productIndex = this.employee.findIndex(prod => prod.id === id);
        const product = this.employee[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex];
    }
}
