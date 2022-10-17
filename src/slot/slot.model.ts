import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const slotSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  venueId: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  status: {
    type: String,
    enum: {
      values: ['ALLOCATED', 'COMPLETE', 'CANCELLED'],
      message: '{VALUE} is not supported'
    },
    default: 'ALLOCATED',
    required: true
  },
  note: { type: String }
});




export enum AllowedStatus {
  ALLOCATED = "ALLOCATED",
  ALLOCATED_COMPLETED = "ALLOCATED COMPLETED",
  ALLOCATED_CANCELLED = "ALLOCATED CANCELLED",
}
export interface Slot extends Document {
  id: string;
  employeeId: string;
  venueId: string;
  scheduledAt: Date;
  status: AllowedStatus;
  note: String;
}
