import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const slotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true },
  venueId: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  status: {
    type: String,
    enum: ['ALLOCATED', 'COMPLETE', 'CANCELLED'],
    default: 'ALLOCATED',
    required: true
  },
  note: { type: String }
});





export interface Slot extends Document {
  id: string;
  employeeId: string;
  venueId: string;
  scheduledAt: Date;
  status: String;
  note: String;
}
