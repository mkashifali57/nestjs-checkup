import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const venueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
});





export interface Venue extends Document {
    id: string;
    name: string;
    location: string;
}
